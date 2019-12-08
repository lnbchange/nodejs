let querystring=require('querystring');

function post(ctx){
    return new Promise((reslove,reject)=>{
        let str='';
        ctx.req.on('data',chunk=>{
            str+=chunk;
        })
        ctx.req.on('end',()=>{
            reslove(querystring.parse(str))
        })
    })
}

module.exports=()=>{
    return async (ctx,next)=>{
        ctx.request.body=await post(ctx);
        await next();
    }
}