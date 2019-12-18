const jwt=require('jsonwebtoken');
module.exports=()=>{
    return async (ctx,next)=>{//鉴权
        let writelist=['/api/login','/api/register'];//白名单
        if(writelist.includes(ctx.path)){//包含白名单的继续向下执行
            await next()
        }else{//不包含的 拿token校验
            try{
                let token=ctx.get('token');
                ctx.info=jwt.verify(token,'lnb');
                await next()
            }
            catch(err){
                ctx.body={
                    code:1,
                    msg:err
                }
            }
        }
    }
}