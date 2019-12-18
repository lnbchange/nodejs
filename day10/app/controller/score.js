const Controller=require('egg').Controller;
const moment=require('moment')

class scoreController extends Controller{
    /**
     * 录入成绩
     * post /api/schoolgrades
     * 必传参数 username,theory,skill,students_number
     * 成功code 2
     * 失败code 4
     */
    async schoolgrades(){
        const {ctx,service}=this;
        let {username,theory,skill,student_number}=ctx.request.body;
        let time=ctx.helper.timer()
        if(username&&theory&&skill&&student_number){
            let {roleId}=ctx.info;
            if(roleId==1||roleId==2){//有权限
                try{
                    await service.score.schoolgrades(username,theory,skill,time,student_number);
                    ctx.body={
                        code:2,
                        msg:'录入成功'
                    }
                }catch(error){
                    ctx.body={
                        code:4,
                        error
                    }
                }
            }else{//没有权限
                ctx.body={
                    code:4,
                    msg:'没有权限'
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
     * 获取当天成绩列表
     * get /api/gradeslist
     * 成功code 2
     * 失败code 4
     */
    async gradeslist(){
        const {ctx,service}=this;
        let time=ctx.helper.timer();
        try{
            let list=await service.score.gradeslist(time);
            ctx.body={
                code:2,
                list
            }
        }catch(error){
            ctx.body={
                code:4,
                error
            }
        }
    }

    /**
     * 修改成绩
     * post  /api/gradesedit
     * 必须传递参数 username,theory,skill,student_number
     * 成功code 2
     * 失败code 4
     */
    async gradesedit(){
        const {ctx,service}=this;
        let {username,theory,skill,student_number}=ctx.request.body;
        let {roleId}=ctx.info;
        let time=ctx.helper.timer();
        if(username&&theory&&skill&&student_number){
            if(roleId==1||roleId==2){
                try{//通过学号找到当前时间要修改的
                    await service.score.gradesedit(student_number,theory,skill,time);
                    ctx.body={
                        code:2,
                        msg:'修改成功'
                    }
                }catch(error){
                    ctx.body={
                        code:4,
                        error
                    }
                }
            }else{
                ctx.body={
                    code:4,
                    msg:'权限不足'
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
     * 模糊搜索接口
     * get  /api/search
     * 必须传递参数 keyword
     * 成功code 2
     * 失败code 4
     */
    async search(){
        const {ctx,service}=this;
        let {keyword}=ctx.query;
        let time=ctx.helper.timer()
        if(keyword){//关键字
            try{
                let searchdata=await service.score.search(keyword,time)
                ctx.body={
                    code:2,
                    searchdata
                }
            }catch(error){
                ctx.body={
                    code:4,
                    error
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'缺失参数'
            }
        }
    }

    /**
     * 删除学生当天成绩
     * post  /api/delete
     * 必传项 student_number
     */
    async delete(){
        const {ctx,service}=this;
        let {student_number}=ctx.request.body;
        let time=ctx.helper.timer();
        if(student_number){
            try{
                await service.score.delete(student_number,time);
                ctx.body={
                    code:2,
                    msg:'删除成功'
                }
            }catch(error){
                ctx.body={
                    code:4,
                    error
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'缺少参数'
            }
        }
    }

    /**
     *  获取个人本月理论技能成绩
     *  get /api/personslist
     *  必传参数 student_number 学号
     */
    async personslist(){
        //理论成绩 []  技能成绩[]  日期 []
        let {ctx,service} = this;
        let {student_number} = ctx.query;
        if(student_number){
           let result = await service.score.personslist(student_number);
        //    console.log(result);
           let theoryArr = []; //理论成绩
           let skillArr = []; //技能成绩
           let timeArr = [];  //时间

           result.forEach(item => {
                theoryArr.push(item.theory);
                skillArr.push(item.skill);
                timeArr.push(`${new Date(item.time).getMonth()+1}-${new Date(item.time).getDate()}`)
           })
        //    console.log(timeArr)
            ctx.body = {
                code:2,
                data:{
                    theoryArr,
                    skillArr,
                    timeArr
                }
            }
        }else{
            ctx.body = {
                code:4,
                msg:'丢失参数'
            }
        }
    }


    /**
     * 获取当天成绩分布图
     * get  /api/distribution
     * 
     */    
    async distribution(){
        let {ctx,service} = this;
        let arr = ['0-70','71-80','81-90','91-100'];
        // console.log(22)
        let source = [
            ['0-70'],
            ['71-80'],
            ['81-90'],
            ['91-100']
        ]

        for(let i = 0;i<arr.length;i++){
            console.log("===获取当天成绩分布图")
            let thoeryCount = await service.score.distribution('theory',arr[i]);
            let skillCount = await service.score.distribution('skill',arr[i]);
            console.log("thoeryCount",thoeryCount,"skillCount",skillCount);
            source[i].push(thoeryCount[0]['count(*)']);
            source[i].push(skillCount[0]['count(*)']);
        }
        // console.log(source)
        ctx.body = {
            code:2,
            data:source
        }
        
    }

    /**
     * 获取学生当天的个人成绩
     * get  api/student
     * 必传参数 student_number
     */
    async student(){
        const {ctx,service}=this;
        let {student_number}=ctx.query;
        let time=ctx.helper.timer();
        if(student_number){
            try{
                let data= await service.score.student(student_number,time);
                ctx.body={
                    code:2,
                    data
                }
            }catch(error){
                ctx.body={
                    code:4,
                    error
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
     * 柄图 
     * get  /api/success
     */
    async success(){
        let{ctx}=this
        try{
            let list = await ctx.service.score.success()
            ctx.body={
                code:2,
                list
            }
        }catch(error){
            ctx.body={
                code:4,
                error
            }
        }
    }

    /**
     * 获取本月成材率 折线图
     * get  /api/monthsuccess
     */
    async monthsuccess() {
        let { ctx,service } = this;
        let result = await service.score.every(); // 找所有记录
        let count = await service.score.cunt()  //查长度     
        let timeArr = [];  
        for (let i = 0; i < result.length; i++) {           
            timeArr.push(moment(result[i].time).format('YYYY-MM-DD'))
        }
        
        let arr = [...new Set(timeArr)]  // 去重        
        let a = []  //理论成绩
        let b=[] //技能成绩
        let time=[] //时间
        for (let j = 0; j < arr.length; j++) {
           
            let theoryArr = await service.score.AllTheory(arr[j])//理论成绩
           
            let skillArr = await service.score.AllSkill(arr[j])//技能成绩
  
            a.push(theoryArr)
            b.push(skillArr)         
           
            time.push(`${new Date(arr[j]).getMonth() + 1}-${new Date(arr[j]).getDate()}`)
       
            ctx.body = {
                code: 2,
                theory:a,
                skill:b,
                count: count[0]["count(*)"],
                time            
            }
        }
    }
}
module.exports=scoreController;