const Controller = require('egg').Controller;
const jwt=require('jsonwebtoken')

class UserController extends Controller {
    /**
     * 注册用户
     * post  /api/registry
     * 必传参数 username,password
     * code 2 成功
     * code 4 失败
     */
    async registry(){
        const {ctx,service}=this;
        let {username,password}=ctx.request.body;
        if(username&&password){
            let newPwd=ctx.helper.hex(password);
            let userinfo=await service.user.selectUser(username,newPwd);            
            if(userinfo.length){//判断用户存不存在
                ctx.body={
                    code:4,
                    msg:'用户已存在'
                }
            }else{
                try{                   
                    await service.user.registry(username,newPwd);
                    ctx.body={
                        code:2,
                        msg:'注册成功'
                    }
                }catch(error){
                    ctx.body={
                        code:4,
                        error
                    }
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'参数缺失'
            }
        }
    }

    /**
     * 登录用户
     * post /api/login
     * 必传参数 username,password
     * code 2 成功
     * code 4 失败
     */
    async login(){
        const {ctx,service}=this;
        let {username,password}=ctx.request.body;
        if(username&&password){
            let newPwd=ctx.helper.hex(password);
            let user=await service.user.login(username,newPwd);
            console.log('user',user)           
            if(user.length){
                let token=jwt.sign({username,id:user[0].id},'rich',{expiresIn:60*60})
                ctx.body={
                    code:2,
                    msg:'登录成功',
                    token
                }
            }else{
                ctx.body={
                    code:4,
                    msg:'登录失败'
                }
            }
        }else{
            ctx.body={
                code:4,
                msg:'参数缺失'
            }
        }
    }
}

module.exports = UserController;
