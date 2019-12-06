const Koa=require('koa');//引入 koa
const static=require('koa-static'); //静态资源
const router=require('koa-router')(); //引入
const bodyParser=require('koa-bodyparser');

let app=new Koa();
let path=require('path');
let query=require('./db/connection')

app.use(static(path.join(__dirname,'publick')));
app.use(bodyParser());
app.use(router.routes());

router.get('/list',async (ctx,next)=>{//查看
    // console.log(ctx.query) get
    // console.log(ctx.request.body) post
    try{
    let list=  await query('select * from userlist')
        ctx.body={
            code:0,
            msg:'成功',
            data:list
        }
    }catch(res){
        ctx.body={
            code:1,
            msg:'失败',
            err:res
        }
    }
})

router.post('/add',async (ctx,next)=>{//添加
    let {username,password,anther}=ctx.request.body;
   if(username&&password){
    try{
        let list=await query('select * from userlist where username=?',[username]);
        if(list.length){//容错
            ctx.body={
                code:2,
                msg:'此用户已存在,请重新填写'
            }
        }else{
            await query('insert into userlist (username,password,anther) values (?,?,?)',[username,password,anther]);
            ctx.body={
                code:0,
                msg:'用户注册成功'
            }
        }
    }
    catch(e){
        ctx.body={
            code:2,
            msg:'添加失败'
        }
    }
   }
})

router.get('/delete',async (ctx,next)=>{//删除
    let {id}=ctx.query;   
    let sqlid=await query('select * from userlist where id=?',[id])
        if(sqlid.length){//库有的id才能删
          try{
              await query('delete from userlist where id=?',[id])
              ctx.body={
                  code:0,
                  msg:'删除成功'
              }
          }
          catch(err){
              ctx.body={
                  code:2,
                  msg:'删除失败',
                  err
              }
          }            
        }else{
            ctx.body={
                code:2,
                msg:'此id数据库不存在'
            }
        }  
})

app.listen(9090,()=>{
    console.log('服务启动')
})