let Koa=require('koa')
let app=new Koa()
let static=require('koa-static')

// app.use(async (ctx,next)=>{
//     console.log('第一层')
//     console.log(ctx.url)
//     console.log(ctx.path)
//     await next()
//     console.log('第一层结束')
// })
// app.use(async (ctx,next)=>{
//     console.log('第二层')
//     await next()
//     console.log('第二层结束')
// })
// function layout(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve('======')
//         })
//     })
// }
// app.use(async (ctx,next)=>{
//     console.log('第三层')
//    let info= await layout()
//    console.log(info)
//     console.log('第三层结束')
// })

// app.listen(9090,()=>{
//     console.log('启动成功')
// })
app.use(static(process.cwd()))
module.exports=app