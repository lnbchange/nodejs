const Koa=require('koa');
const static=require('koa-static');
const router=require('koa-router')();
let app=new Koa();
let path=require('path');
let getTime=require('./middleware/time');
let bodyparser=require('./middleware/bodyparser');
let power=require('./middleware/power');
let query=require('./db/connection')

app.use(getTime());    //本次请求日志
app.use(power());      //权限
app.use(static(path.join(__dirname,'public')));
app.use(bodyparser()); //中间件bodyparser 
app.use(router.routes());

router.get('/api/list',async (ctx,next)=>{//查
    let {pageSize=1,limit=3}=ctx.query;
    let start=(pageSize-1)*limit;
    let total=await query('select count(*) from addresslist');
    try{
        let list =await query(`select * from addresslist limit ${start},${limit}`);
        ctx.body={
            code:0,
            msg:'成功',
            list,
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
router.post('/api/add',async (ctx,next)=>{//增加
    let {name,city,phone}=ctx.request.body;
    let exist=await query('select * from addresslist where name=?',[name]);
    if(exist.length){//存在
        ctx.body={
            code:1,
            msg:'添加失败，用户已存在'
        }
    }else{
        try{
            await query('insert into addresslist (name,city,phone) values (?,?,?)',[name,city,phone]);
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

router.post('/api/edit',async (ctx,next)=>{//修改
    let {name,city,phone,id}=ctx.request.body;
    let curid=await query('select * from addresslist where id=?',[id]);
    if(curid.length){//id
        try{
            await query('update addresslist set name=?,phone=?,city=? where id=?',[name,city,phone,id]);
            ctx.body={
                code:0,
                msg:'修改成功'
            }
        }
        catch(err){
            ctx.body={
                code:1,
                msg:'修改失败'
            }
        }
    }
})

app.listen(9090,()=>{
    console.log('服务启动成功')
})