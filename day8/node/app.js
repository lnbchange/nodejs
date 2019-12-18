const Koa=require('koa');
const static=require('koa-static');
const router=require('koa-router')();
const path=require('path');
const bodyparser=require('koa-bodyparser');
let query=require('./db/connection');
// let bodyparser=require('./milldewear/bodyparser');

let app=new Koa();

app.use(static(path.join(__dirname,'public')));
app.use(bodyparser());
app.use(router.routes());

router.get('/api/lookover',async (ctx,next)=>{//查看
    let {user}=ctx.query;
    try{
        let listdata=await query(`select * from userlist where user=?`,[user])
        ctx.body={
            code:0,
            msg:'页面启动成功',
            listdata
        }
    }
    catch(err){
        ctx.body={
            code:1,
            msg:'页面启动失败',
            err
        }
    }
})

router.post('/api/register',async (ctx,next)=>{//注册
    let {user,pwd,age}=ctx.request.body;
    let username=await query('select * from userlist where user=?',[user]);
    if(username.length){//存在
        ctx.body={
            code:1,
            msg:'用户已存在'
        }
    }else{
        try{
            await query('insert into userlist (user,pwd,age) values (?,?,?)',[user,pwd,age]);
            ctx.body={
                code:0,
                msg:'注册成功'
            }
        }
        catch(err){
            ctx.body={
                code:1,
                msg:'注册失败',
                err
            }
        }
    }
})

router.post('/api/login',async (ctx,next)=>{//登录
    let {user,pwd}=ctx.request.body;
    try{
        let userobj=await query('select * from userlist where user=? and pwd=?',[user,pwd]);
        if(userobj.length){
            ctx.body={
                code:0,
                msg:'登录成功',
                userobj
            }
        }else{
            ctx.body={
                code:1,
                msg:'登录失败'
            }
        }
    }
    catch(err){
        ctx.body={
            code:1,
            msg:'登录失败',
            err
        }
    }
})

router.post('/api/alter',async (ctx,next)=>{//修改密码
    let {oldpwd,curpwd,id}=ctx.request.body;
    try{
        // let oldpassword=await query('select * from userlist where pwd=? and id=?',[oldpwd,id]);
        // if(oldpassword.length){//原密码存在
            await query('update userlist set pwd=? where id=? and pwd=?',[curpwd,id,oldpwd]);
            ctx.body={
                code:0,
                msg:'密码修改成功'
            }
        }
        
    // }
    catch(err){
        ctx.body={
            code:1,
            msg:'密码修改失败',
            err
        }
    }

})

router.post('/api/delete',async (ctx,next)=>{//删除用户
    let {id}=ctx.request.body;
   if(id){//id存在
        try{
            await query('delete from userlist where id=?',[id]);
            ctx.body={
                code:0,
                msg:'删除成功'
            }
        }
        catch(err){
            ctx.body={
                code:1,
                msg:'删除失败',
                err
            }
        }
   }else{
       ctx.body={
           code:1,
           msg:'缺失参数'
       }
   }
})

router.post('/api/message',async (ctx,next)=>{//修改个人信息
    let {user,age,id}=ctx.request.body;
    try{
        await query('update userlist set user=?,age=? where id=?',[user,age,id]);
        ctx.body={
            code:0,
            msg:'修改成功'
        }
    }
    catch(err){
        ctx.body={
            code:1,
            msg:'修改个人信息失败',
            err
        }
    }
})


app.listen(9090,()=>{
    console.log('服务启动成功')
})