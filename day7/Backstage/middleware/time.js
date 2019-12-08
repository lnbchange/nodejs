let fs = require('fs');
let path = require('path');
module.exports = () => {
    return async (ctx, next) => {
        let startTime = new Date().getTime(); //开始时间
        await next();
        let endTime = new Date().getTime();   //结束时间
        let timer = endTime - startTime;      //一共请求的耗时

        let url = ctx.request.path;      //当前路径
        let method = ctx.request.method;  //当前方式
        let status = ctx.response.status  //响应的状态
        fs.appendFileSync(path.join(__dirname, '日志.log'), `${url}-${method}-${status}-${timer}`)
    }
}