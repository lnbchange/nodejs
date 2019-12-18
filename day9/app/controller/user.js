'use strict';

const Controller = require('egg').Controller;
const jwt=require('jsonwebtoken');

class UserController extends Controller {
  /**
   * 登录接口
   * post /api/login
   * 
   */
  async login(){
      let {ctx,service}=this;
      let {user,pwd}=ctx.request.body;
      if(user&&pwd){
        let hexPwd=ctx.helper.hem(pwd);//加密
        let data= await service.user.login(user,hexPwd);
       if(data.length){
            let token=jwt.sign({user,roleId:data[0].role},'lnb',{expiresIn:60*60});//生成token
            ctx.body={
                code:0,
                msg:'登录成功',
                token
            }
       }

      }else{
          ctx.body={
              code:2,
              msg:'缺少参数'
          }
      }
  }

  /**
   * 注册接口
   * post /api/register
   */
  async register(){
      let {ctx,service}=this;
      let {user,pwd,num,role=3}=ctx.request.body;
      if(user&&pwd&&num){
          //查找数据库存不存在
         let olduser=await service.user.find(user);
         if(olduser.length){//有
           ctx.body={
               code:2,
               msg:'用户已存在'
           }
         }else{//没有
            let hexpwd=ctx.helper.hem(pwd);//加密
            try{               
              await service.user.register(user,hexpwd,role,num);
              ctx.body={
                  code:0,
                  msg:'注册成功'
              }
            }
            catch(err){
                ctx.body={
                    code:1,
                    msg:err
                }
            }
         }

      }else{
          ctx.body={
              code:2,
              msg:'缺少参数'
          }
      }
  }

  /*
  *删除接口
  *post /api/delete
  */
 async remove(){
     const {ctx,service}=this;
     let {id}=ctx.query;
     let {roleId}=ctx.info;
     if(id){
        if(roleId!=1){
            ctx.body={
                code:1,
                msg:'权限不足'
            }
        }else{
            try{
                await service.user.remove(id);
                ctx.body={
                    code:0,
                    msg:'删除成功'
                }
            }catch(err){
                ctx.body={
                    code:1,
                    msg:err
                }
            }
        }
     }else{
         ctx.body={
             code:1,
             msg:'缺少参数'
         }
     }
 }
 
}

module.exports = UserController;
