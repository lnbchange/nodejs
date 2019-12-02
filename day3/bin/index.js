#! /usr/bin/env node

let app=require('../server/app')
let argv=process.argv.slice(2);

let {version}=require('../package.json')
let address=8080;

if(argv[0]==='-v'||argv[0]==='--version'){
    console.log(version)
}else{
    address=argv[0]?argv[1]:8080;
    app.listen(address,()=>{
        console.log('服务启动')
    })
}