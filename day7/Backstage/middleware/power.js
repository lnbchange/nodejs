module.exports=()=>{
   return async (ctx,next)=>{//需要设置权限的
        let arr=['/api/add','/api/delete','/api/edit'];
        if(arr.includes(ctx.path)){//需要校验
            if(ctx.request.header.admin&&ctx.request.header.admin==='root'){//携带头信息 && 必须是admin:root
                await next()
            }else{
                ctx.body={
                    code:4,
                    msg:'没有权限查阅'
                }
            }
        }else{
            await next()
        }
   }
}