let jwt=require('jsonwebtoken');
module.exports=()=>{//鉴权
    return async (ctx,next)=>{
        let writeform=['/api/login','/api/register'];
        if(writeform.includes(ctx.path)){
            await next()
        }else{
           try{
            let token=ctx.get('token');
            ctx.info=jwt.verify(token,'relic');
            await next()
           }catch(error){
               if(error.name==='JsonWebTokenError' || error.name==='TokenExpiredError'){                   
                    ctx.body={
                        code:4,
                        error
                    }
                     ctx.status=401;
               }else{
                   ctx.body={
                       code:0,
                       error
                   }
               }
           }
        }
    }
}
