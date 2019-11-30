#! /usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
let data=require('./number.json');
let fs=require('fs')

program
    .version('1.0.0')
    .option('-a,--add')
    .option('-r,--remove')
    .option('--add-file')
    .option('login')
    .action((path, cmd) => {
        if (process.argv[2] === 'login') {
            inquirer.prompt(promptList).then(answers => {
                // console.log(answers); // 返回的结果
               let flag=data.some(v=>v.number===answers.number);
               if(!flag){
                   data.push(answers);
                   data=data;
                   fs.writeFileSync('./number.json',JSON.stringify(data))
               }else{
                   console.log('身份信息已存在')
               }
                // let flag=user.some(v=>v.name===answers.name&&v.pwd===answers.pwd);
                // if(flag){
                //     console.log('登录成功')
                // }else{
                //     console.log('登录失败')
                // }

            })
        }

    })

    const promptList=[
        {
            type:'input',
            message:'请输入姓名:',
            name:'name'
        },
        {
            type:'input',
            message:'请输入身份证号:',
            name:'number',
            // validate:function(val){
                // if(!val.match(/^\d{18}$/)){
                //     return '请输入正确的身份信息'
                // }
               
            // }
        }
    ]

//登录
// let user=[{
//     name:"zyj",
//     pwd:'123456'
// }]
// const promptList = [{
//     type: 'input',
//     message: '设置一个用户名:',
//     name: 'name',
//     default: "test_user" // 默认值
// }, {
//     type: 'password',
//     message: '输入密码:',
//     name: 'pwd'
// }
// ];


program.parse(process.argv)


if (program.add) console.log('add somthing')
if (program.remove) console.log('remove something')
if (program.addFile) console.log('张玉静 撒')

// console.log('你好')
