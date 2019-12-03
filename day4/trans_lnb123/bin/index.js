#! /usr/bin/env node

const inquirer=require('inquirer')
const program=require('commander')
const axios=require('axios')
let { version } =require('../package.json')//获取版本号
const superagent=require('superagent')
let word=process.argv[2]
let prolist=[{
    type:'input',
    message:'请输入单词',
    name:'name'
}]

program
    .version(version)
    .action(()=>{
        inquirer.prompt(prolist).then(res=>{
            let val=res.name;
            superagent
            .get('http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1')
            .query({q:val})
            .end((err,res)=>{
                console.log(res.body.translation[0])
            })
        })
    })


program.parse(process.argv)

// if(program.version){//输出版本号
//     console.log(version)
// }