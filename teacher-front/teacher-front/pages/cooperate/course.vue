<template >
  <div style="background:#eee">
    <div class="Ccourse">
      <div class="Cdiv4">
        <router-link to="/course/info/1">
          <el-button type="success">新建课程</el-button>
        </router-link>
      </div>
      <!-- <div class="Cdiv3">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input class="name" v-model="courseList.title" placeholder="课程名字"/>
          </el-form-item>
          <el-button type="success" icon="el-icon-search" @click="getCourse()">查询</el-button>
        </el-form>
      </div> -->
    </div>
    <section class="container">
      <header class="comm-title" style="background:#fff;">
        <h2 class="tac" style="height:50px;line-height:50px;padding-left:10px">
          <span class="c-666" style="font-size:20px">课程列表</span>
        </h2>
      </header>
      <div>
      <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <a :href="'work/'+course.id">
                      <img
                      :src="course.cover"
                      class="img-responsive"
                      :alt="course.title"
                      style="width:300px;"
                      >
                    </a>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'work/'+course.id" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="Number(course.price) === 0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fr jgTag bg-green" v-else>
                      <i class="c-fff fsize12 f-fA"> ￥{{ course.price }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }} 人学习</i>
                      <i class="c-999 f-fA">{{ course.viewCount }} 人浏览</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
          <div class="clear"></div>
        </article>
      </div>
    </section>
    <br>
    <br>
  </div>
</template>
<script>
import course from '@/api/course'
import cookie from 'js-cookie'
export default {
  data() { //定义变量和初始值
        return {
          courseList:[],
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
      //页面渲染之前执行，一般调用methods定义的方法
      //调用
      this.getCourse()
    },
    methods:{  
      
     //获取讲师所讲课程   
    getCourse(){
      //从cookie中获取用户信息
      var jsonStr = cookie.get("mini_user");
      //alert(jsonStr)
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr)
      }
      course.getTeacherCourse()
        .then(response => {
          this.courseList = response.data.data
        })
    }
  }
}
</script>
<style scoped>
.name >>> .el-input__inner {
  -web-kit-appearance: none;
  -moz-appearance: none;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid #68cb9b;
  color: #6a6f77;
  outline: 0;
}
</style>