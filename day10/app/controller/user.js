const Controller=require('egg').Controller;
const jwt=require('jsonwebtoken');

class userController extends Controller{
    /**
     * 注册接口
     * post /api/register
     * 成功code 2
     * 失败code 4
     * 必传参数 username,password,student_number
     */
    async register(){
        const {ctx,service}=this;
        let {username,password,role=3,student_number}=ctx.request.body;
        if(username&&password&&student_number){//参数必须传递            
            let oldnum=await service.user.selectUser(student_number);//学号存不存在
            if(oldnum.length){
                ctx.body={
                    code:4,
                    msg:'学号已被注册'
                }
            }else{               
                try{
                    let hexPwd=ctx.helper.hex(password);
                    await service.user.register(username,hexPwd,role=3,student_number);
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
                msg:'缺少参数'
            }
        }

    }

    /**
     * 登录接口
     * post /api/login
     * 必须传递参数 student_number,password
     * 返 token
     * 成功code 2
     * 失败code 4
     */
    async login(){
        const {ctx,service}=this;
        let {student_number,password}=ctx.request.body;
        if(student_number&&password){//参数必须传递
            try{
                let hexPwd=ctx.helper.hex(password);//加密
                let logindata= await service.user.login(student_number,hexPwd);//登录
                let token=jwt.sign({student_number,password,roleId:logindata[0].role},'relic',{expiresIn:80*80});//token
               if(logindata.length){//登录
                    ctx.body={
                        code:2,
                        msg:'登录成功',
                        token,
                        roleId:logindata[0].role,
                        username:logindata[0].username
                    }
               }
            }catch(error){
                ctx.body={
                    code:4,
                    error
                }
            }

        }else{
            ctx.body={
                code:4,
                msg:'缺少参数'
            }
        }
    }

    /**
     * 获取所有学生
     * get /api/students
     * 成功code 2
     * 失败code 4
     */
    async students(){
        const {ctx,service}=this;      
        try{      
            let studentlist=await service.user.students();     
            ctx.body={
                code:2,
                data:studentlist    
            }
        }catch(error){
            ctx.body={
                code:4,
                error
            }
        }
    }

    /**
     * 获取当天所有没有录入成绩的学生
     * get /api/noevery
     * 成功code 2
     * 失败code 4
     */
    async noevery(){
        const {ctx,service}=this;
        let time=ctx.helper.timer();
        try{
            let studentlist=await service.user.noevery(time);
            ctx.body={
                code:2,
                data:studentlist
            }
        }catch(error){
            ctx.body={
                code:4,
                error
            }
        }
    }

    /**
     * 删除学生
     * post  /api/remove
     * 必传参数 student_number
     * 成功code 2 
     * 失败code 4    
     */
     async remove(){
         const {ctx,service}=this;
         let {student_number}=ctx.request.body;
         let {roleId}=ctx.info;
         if(student_number){
            if(roleId!=1){
                ctx.body={
                    code:4,
                    msg:'权限不够'
                }
            }else{
                try{
                    await service.user.remove(student_number);
                    ctx.body={
                        code:2,
                        msg:'删除成功'
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
                 msg:'缺失参数'
             }
         }
     }

     /**
      * 修改学生信息
      * post  /api/editstudent
      * 必传参数 student_number
      * 成功code 2
      * 失败code 4 
      */
     async editstudent(){
        const {ctx,service}=this;
        let {username,role,student_number,id}=ctx.request.body;
        let {roleId}=ctx.info;
        if(username&&role&&student_number&&id){
           if(roleId==1){
            try{
                await service.user.editstudent(username,role,student_number,id);
                ctx.body={
                    code:2,
                    msg:'修改成功'
                }
            }catch(error){
                ctx.body={
                    code:4,
                    error
                }
            }
           }else{
              ctx.body={
                  code:4,
                  msg:'权限不足'
              }
           }
        }else{
            ctx.body={
                code:4,
                msg:'缺少参数'
            }
        }
     }

     /**
      * 传递页面
      * get  /api/menu
      * code 2
      * code 4
      */
     async menu(){
         const {ctx,service}=this;
         let {roleId}=ctx.info;
         try{
             let router=await service.user.menu(roleId);
             ctx.body={
                code:2,
                router
             }
         }catch(error){
             ctx.body={
                 code:4,
                 error
             }
         }
     }
}
module.exports=userController;