let qs=require('querystring');

function postParams(ctx){//管道流的方式处理post请求的数据
    return new Promise((resolve,reject)=>{
        let str='';
        ctx.req.on('data',(chunk)=>{
            str+=chunk;
        })
        ctx.req.on('end',()=>{
            resolve(qs.parse(str));
        })       
    })
}

module.exports=()=>{
    return async (ctx,next)=>{
        ctx.request.body=await postParams(ctx);
        await next()
    }
}