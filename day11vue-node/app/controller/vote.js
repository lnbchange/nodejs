const Controller = require('egg').Controller;

class VoteController extends Controller {
    /**
     * 发起投票
     * post /api/addvote
     * 必传参数 title,uid,descri,choiceType,end_time
     * 参数描述 标题 ,用户id,描述,选择类型,截止时间
     */
    async addvote(){
        const {ctx,service}=this;
        let {title,uid,descri,choiceType,isitanonymous,end_time,voteitems}=ctx.request.body;
        if(title&&uid&&descri&&choiceType&&end_time){
            let itemArr=voteitems.split(',');//投票的选项
            let create_time=new Date()
            try{                
                let {insertId}=await service.vote.addvote(title,descri,choiceType,isitanonymous,end_time,uid,create_time);       
                for(let i=0;i<itemArr.length;i++){//遍历投票的选项，把每一项和用户id，放入表中
                    await this.service.vote.addItems(itemArr[i],insertId)
                }
                ctx.body={
                    code:2,
                    msg:'投票成功'                    
                }
            }catch(err){
                ctx.body={
                    code:4,
                    msg:'投票失败',
                    err
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'参数缺失'
            }
        }

    }
    /**
     * 获取投票的列表
     * get /api/getvote
     * 必传参数 type
     * 非必传参数 pageNum,limit
     * type为1时是进行中的
     * type为2时是结束的
     * pageNum 起始下标
     * limit 一页多少条数据
     */
    async getvote(){
        const {ctx,service}=this;
        let {type,pageNum=1,limit=2}=ctx.query;
        // if(type){
            try{
              let votelist= await service.vote.getvote(type,pageNum,limit);
              let total=await service.vote.total(type);
              ctx.body={
                  code:2,
                  votelist,
                  total:total[0]['count(*)']
              }

            }catch(err){
                ctx.body={
                    code:4,
                    err
                }
            }
        // }else{
        //     ctx.body={
        //         code:4,
        //         msg:'参数缺失'
        //     }
        // }
    }
    /**
     * 获取投票选项
     * get /api/getitems
     */
    async getitems(){
        const {ctx,service}=this;
        let {uid}=ctx.query;
        if(uid){
            try{
                let items=await service.vote.getitems(uid);
                ctx.body={
                    code:2,
                    items
                }
            }catch(err){
                ctx.body={
                    code:4,
                    err
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'参数缺失'
            }
        }
    }
    /**
     * 投票
     * post /api/vote
     * 必传项 ids
     * ids 每个选项的id
     */
    async vote(){
        const {ctx,service}=this;
        let {ids}=ctx.request.body;
        if(ids){
            try{
                let idsArr=(ids+',').split(',');
                for(let i=0;i<idsArr.length;i++){
                    await service.vote.vote(idsArr[i])
                }
                ctx.body={
                    code:2,
                    msg:'投票成功'
                }
            }catch(err){
                ctx.body={
                    code:4,
                    err
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'参数缺失'
            }
        }
    }
    /**
     * 获取我的投票列表
     * get /api/getMyVote
     */
    async getMyVote(){
        const {ctx,service}=this;
        let votelist=await service.vote.getMyVote(ctx.info.uid);
        for(let i=0;i<votelist.length;i++){
            let textArr=[];
            let countArr=[];
            let items=await service.vote.getitems(votelist[i].id);            
            votelist[i].items=items;
            items.forEach((v,i)=>{
                textArr.push(v.text);
                countArr.push(v.count);
            })
            votelist[i].textArr=textArr;
            votelist[i].countArr=countArr;            
        }
        ctx.body={
            code:2,
            data:votelist
        }
    }
}

module.exports = VoteController;