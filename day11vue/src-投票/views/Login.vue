<template>
    <div class="login">
        <header>
            登录
        </header>
        <main>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
            
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button> <a href="/registry">去注册</a>
            </el-form>
        </main>
    </div>
</template>

<script>
import http from '../utils/request.js'
import { constants } from 'fs';
export default {
     data() {
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
            username: '',
            password: ''          
        },
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
        submitForm(aa){
           http.post('/api/login',aa).then(res=>{              
               if(res.data.code===2){                  
                    alert(res.data.msg);                         
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('userinfo',JSON.stringify({...aa,uid:res.data.uid}))
                    this.$router.push('/home')              
               }
           })
        }
    }
}
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    header{
        width: 100%;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: skyblue;
        color: #fff;
        font-size: 20px;
    }
    main{
        width: 100%;
        flex: 1;
    }
    .demo-ruleForm{
        width: 90%;
        height: 50%;
        margin: 80px auto;
    }
</style>
