const mysql=require('mysql');


module.exports=(sql,params=[])=>{
//1.创建链接
    let connecttion=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'list'
    });
    connecttion.connect((err)=>{
        // console.log(err)
        if(err){
            console.log('数据连接失败')
        }else{
            console.log('数据连接成功')
        }
    })
//增删改查
    return new Promise((resolve,reject)=>{
        connecttion.query(sql,params,(error, results)=>{
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
//关闭
    connecttion.end()
}