<template>
    <div>
        <div >
            <div style="margin:0 auto;width:100px;margin-top:50px;"><h3>个人信息</h3></div>
            <div style="margin:0 auto;width:1000px;margin-top:50px;">
                <el-form ref="teacherInfov" :model="teacherInfo" label-width="80px">
                <el-form-item label="教师ID">
                  <el-input v-model="teacherInfo.id" readonly style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="教师姓名">
                  <el-input v-model="teacherInfo.name" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="teacherInfo.tel" readonly style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="教师简介">
                  <el-input type="textarea" v-model="teacherInfo.intro"></el-input>
                </el-form-item>
                <el-form-item label="详细介绍">
                  <el-input type="textarea" v-model="teacherInfo.career"></el-input>
                </el-form-item>
                <!-- 头像 -->
                <el-form-item label="讲师头像">

                    <el-upload
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        action="http://dmbw68.natappfree.cc/api/oss/uploadAvatar"
                        class="avatar-uploader">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </el-form-item>
                <!-- 头像 -->

                <el-form-item >
                 
                  <el-popover
                    placement="top-start"
                    title="请注意"
                    width="200"
                    trigger="hover"
                    content="修改信息后退出重新登陆方可显示信息。">
                    <el-button slot="reference" type="primary" @click="updateTeacher">提交修改</el-button>
                  </el-popover>
                  
                  <router-link to="/cooperate/course">
                     <el-button>返回</el-button>
                  </router-link>
                  
                </el-form-item>
              </el-form>
            </div>
        </div>
        
    </div>
</template>
<script>
import course from '@/api/course'

  export default {
    asyncData({params,error}){
    console.log(params.id)
    return {
      teacherId:params.id
    };   
  },
    data() {
      return {
       
        teacherInfo:{
          id:'',
          name:'',
          tel:'',
          intro:'',
          career:'',
          avater:''
        },
        
        imageUrl:''
      }
    },
    created() {
      this.getTeacherInfo()
    },
    methods: {
      //获取讲师信息
      getTeacherInfo(){
        course.getTeacherInfo(this.teacherId)
          .then(response =>{
            this.teacherInfo=response.data.data
            console.log(this.teacherInfo)
            this.imageUrl = this.teacherInfo.avatar
          })
      },
      
      //上传头像成功调用的方法
         handleAvatarSuccess(res){
             this.teacherInfo.avatar=res.data.url
             this.imageUrl = this.teacherInfo.avatar
             console.log(this.teacherInfo.avatar)
         },
        //上传之前调用的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            
            return isJPG && isLt2M
        },
        //修改讲师信息
      updateTeacher(){
        course.updateTeacherInfo(this.teacherInfo)
          .then(response =>{
            console.log(response)
          })
        this.getTeacherInfo()
        this.$router.push({ path: '/cooperate/course'})
      }
    }
  }
</script>