let mysql=require('mysql');

module.exports=(sql,params=[])=>{
    let conection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'list'
    })
    conection.connect((err)=>{
        if(err){
            console.log('数据库链接失败')
        }else{
            console.log('数据库链接成功')
        }
    })

    return new Promise((resolve,reject)=>{
        conection.query(sql,params,(err,results)=>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
            conection.end()
        })
    })

   
}