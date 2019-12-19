let jwt=require('jsonwebtoken')
module.exports=()=>{
    return async (ctx,next)=>{
        let writeArr=['/api/login','/api/registry'];
        if(writeArr.includes(ctx.path)){
            await next()
        }else{
            try{
                let token=ctx.get('token');
                ctx.info=jwt.verify(token,'rich');
                await next()
            }catch(error){
                if(error.name==='TokenExpiredError'||error.name==='JsonWebTokenError'){                    
                    ctx.body={
                        code:4,
                        error
                    }
                    ctx.status=401;
                }else{
                    ctx.body={
                        code:4,
                        error
                    }
                }               
            }
        }
    }
}