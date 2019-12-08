const mysql=require('mysql');

module.exports=(sql,params=[])=>{
    let connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'address'
    })
    connection.connect((error)=>{
        if(error){
            console.log('数据库链接失败')
        }else{
            console.log('数据库链接成功')
        }
    })
    return new Promise((reslove,reject)=>{
        connection.query(sql,params,(err,results)=>{
            if(err){
                reject(err)
            }else{
                reslove(results)
            }
         connection.end()
        })
    })
}