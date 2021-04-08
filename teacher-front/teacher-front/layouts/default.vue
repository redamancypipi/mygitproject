<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header>
      <div class="top_bg">
        <section class="container">
          <h1 id="logo">
            <a href="#" title="mini课堂">
              <img src="~/assets/img/logo4.png" width="70%" alt="mini课堂">
            </a>
          </h1>
          <div class="h-r-nsl">
            <ul class="h-r-login">
              <!-- <li v-if="!loginInfo.id" id="no-login">
                <a href="/login" title="登录">
                    <em class="icon18 login-icon">&nbsp;</em>
                    <span class="vam ml5">登录</span>
                </a>
              </li> -->
              
              <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
                <a title :href="'information/'+loginInfo.id">
                  <img
                      :src="loginInfo.avatar"
                      width="50"
                      height="50"
                      class="vam picImg"
                      alt
                      >
                  <span id="userName" class="vam disIb">{{ loginInfo.name }}</span>
                </a>
                <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
              </li>
              <!--登录后显示第2，3 li -->
          </ul>
          </div>
            <aside class="mw-nav-btn">
              <div class="mw-nav-icon"></div>
            </aside>
            <div class="clear"></div>
          </section>
        </div>
      </header>
      <!-- /公共头引入 -->
    
      <nuxt/>

      <!-- 公共底引入 -->
      <footer id="footer">
        <section class="container">
          <div class>
            <h4 class="hLh30">
              <span class="fsize18 f-fM c-999">友情链接</span>
            </h4>
            <ul class="of flink-list">
              <li>
                <a href="#" title="mini课堂" target="_blank">mini课堂</a>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="b-foot">
            <section class="fl col-7">
              <section class="mr20">
                <section class="b-f-link">
                  <a href="#" title="关于我们" target="_blank">关于我们</a>|
                  <a href="#" title="联系我们" target="_blank">联系我们</a>|
                  <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                  <a href="#" title="资源下载" target="_blank">资源下载</a>|
                  <span>服务热线：1526875951</span>
                  <span>Email：sicnu@chengdu.com</span>
                </section>
                <section class="b-f-link mt10">
                  <span>©所有课程最终解释权归mini课堂所有</span>
                </section>
              </section>
            </section>
            <aside class="fl col-3 tac mt15">
              <section class="gf-tx">
                <span>
                  <img src="~/assets/img/wx-icon.png" alt>
                </span>
              </section>
              <section class="gf-tx">
                <span>
                  <img src="~/assets/img/wb-icon.png" alt>
                </span>
              </section>
            </aside>
            <div class="clear"></div>
          </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";

import cookie from 'js-cookie'
import userApi from '@/api/login'
export default {
  data() {
    return {
       token: '',
        loginInfo: {
          id: '',
          avatar: '',
          name: '',
          tel:'',
        }
    }
  },
  created() {
    this.showInfo()
  },
  methods: {
    showInfo() {
      //debugger
      //从cookie中获取用户信息
      var jsonStr = cookie.get("mini_user");
      //alert(jsonStr)
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr)
      }
    },
//退出
    logout() {
      cookie.set('mini_user', "", {domain: 'localhost'})
      cookie.set('mini_token', "", {domain: 'localhost'})

      //跳转页面
      window.location.href = "/"
    }
  }
};
</script>

<style scoped>
/* *{
  padding: 0;margin: 0;
} */
.top_bg{
  background-color: #706897;
  width: 100%;
  height: 60px;
}
#logo{
  margin-left: 8px;
  
}
</style>