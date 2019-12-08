const mysql=require('mysql');

module.exports=(sql,params=[])=>{
    let connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'circle'
    })
    connection.connect((error)=>{
        if(error){
            console.log('数据库链接失败')
        }else{
            console.log('数据库链接成功')
        }
    })
    return new Promise((reslove,reject)=>{
        connection.query(sql,params,(error,resluts)=>{
            if(error){
                reject(error)
            }else{
                reslove(resluts)
            }
            connection.end()
        })
    })
}
