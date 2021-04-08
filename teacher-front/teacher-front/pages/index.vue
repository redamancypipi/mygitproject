<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/">登录</a>
    </div>
    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        
        <el-form-item class="input-prepend" prop="tel" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div >
            <el-input type="text" placeholder="请输入手机号码" v-model="user.tel"/>
            
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="请输入密码" v-model="user.password"/>
            
          </div>
        </el-form-item>

        <!-- <a href="#" style="margin-right: 5px;"> 忘记密码</a> -->
        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="submitLogin()">
        </div>
      </el-form>
      
    </div>

  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'

import cookie from 'js-cookie'
import loginApi from '@/api/login'



export default {
    layout: 'sign',

    data () {
      return {
        //封装登录手机号和密码对象
        user:{
          tel:'',
          password:'',
        },
        //用户信息
        loginInfo:{}
      }
    },
   
    methods: {
      //登录的方法
      submitLogin() {
        //第一步 调用接口进行登录，返回token字符串
        loginApi.submitLoginUser(this.user) 
           .then(response => {
             console.log(response.data)
             if(response.data.code == 200){
                
                cookie.set('mini_token',response.data.data.token,{domain: 'localhost'})
                loginApi.getLoginUserInfo()
                .then(response => {
                  console.log(response)
                  if(response.data.code == 200){
                    
                    cookie.set('mini_user',response.data.data.item,{domain: 'localhost'})
                    window.location.href = "/cooperate/course";
                  }
   
                })

             }else{
                this.$message({
                 type: "error",
                message: "登录失败",
               });
             }
           }
          )
      },
      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }

    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }

</style>

