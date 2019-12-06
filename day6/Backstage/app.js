let Koa=require('koa');
let app=new Koa();
let bodyparser=require('koa-bodyparser');
let static=require('koa-static');
let router=require('koa-router')();
let path=require('path');
let query=require('./db/connection.js')


app.use(static(path.join(__dirname,'public')));
app.use(bodyparser());
app.use(router.routes());

router.get('/api/list',async (ctx,next)=>{//分页
    let {pageNum=1,limit=3}=ctx.query;
    let start=(pageNum-1)*limit;
    let total=await query('select count(*) from userfrom')
    try{
        let list=await query(`select * from userfrom limit ${start},${limit}`)
        ctx.body={
            code:1,
            msg:'成功',
            data:list,
            total:total[0]['count(*)']
        }
    }
    catch(err){
        ctx.body={
            code:1,
            msg:'失败',
            err
        }
    }
})

router.post('/api/add',async (ctx,next)=>{//添加
    let {username,password,phone}=ctx.request.body;
    let list=await query('select * from userfrom where username=?',[username]);
    if(list.length){
        ctx.body={
            code:1,
            msg:'此用户已存在，请勿重新添加'
        }
    }else{
        try{
            await query('insert into userfrom (username,password,phone) values (?,?,?)',[username,password,phone])
            ctx.body={
                code:0,
                msg:'添加成功'
            }
        }
        catch(err){
            ctx.body={
                code:1,
                msg:'添加失败',
                err
            }
        }
    }
})

router.get('/api/delete',async (ctx,next)=>{//删除
    let {id}=ctx.query;
    let exist=await query('select * from userfrom where id=?',[id]);
    if(exist.length){//删除项存不存在 存在
        try{
            await query('delete from userfrom where id=?',[id])
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
            msg:'删除项不存在'
        }
    }
})

router.post('/api/edit',async (ctx,next)=>{
    let {username,password,phone,id}=ctx.request.body;
    let exist=await query('select * from userfrom where id=?',[id]);
    if(exist.length){//修改项存不存在 存在
        try{
            await query('update userfrom set username=?,password=?,phone=? where id=?',[username,password,phone,id]);
            ctx.body={
                code:0,
                msg:'修改成功'
            }
        }
        catch(err){
            ctx.body={
                code:1,
                msg:'修改失败',
                err
            }
        }
    }

})

app.listen(9090,()=>{
    console.log('服务启动成功')
})
