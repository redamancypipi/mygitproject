import request from '@/utils/request'

export default {
  //老师详细信息
  getTeacherInfo(id){
    return request({
      url:`/api/eduTeacher/getTeacherById/`+id,
      method:'get'
    })
  },
    //课程详情的方法
  getCourseInfo(id) {
    return request({
      url: '/api/eduCourse/getCourseInfo/'+id,
      method: 'get'
    })
  },

    //查询讲师所授课程
    getTeacherCourse(){
      return request({
        url: `/api/teacher/getCourseList`,
        method: 'get'
        }
      )
    },
    //查询学生名单
    getStudentList(courseId){
      return request({
        url: `/api/teacher/getMemberList/`+courseId,
        method: 'get'
        }
      )
    },
    //讲师上传作业
    publishWork(id,task){
      return request({
        url:`/api/teacher/postTask/`+id,
        method:'post',
        data:task
        }
      )
    },
    //讲师查询作业列表
    getTaskList(id){
      return request({
        url:`/api/teacher/getTaskList/`+id,
        method:'get'
      })
    },
    //讲师查询资源列表
    getfileList(id){
      return request({
        url:`/api/teacher/getFileList/`+id,
        method:'get'
      })
    },
    //上传资源
    publishFile(courseId,FormData){
      return request({
        url:'/api/teacher/uploadFile/'+courseId,
        method:'post',
        data:FormData
      })
    },
    //查看评论
    getCommentList(id){
      return request({
        url:`/api/eduComment/getCommentList/`+id,
        method:'get'
      })
    },
    //添加评论
    publishComment(comment){
      return request({
        url:`/api/eduComment/postComment`,
        method:'post',
        data:comment
      })
    },
    //删除课程
    deleteCourse(id){
      return request({
        url:`/api/eduCourse/removeCourseInfo/`+id,
        method:'delete'
      })
    },
    //根据课程id获取章节和小节数据列表
    getChapterList(courseId) {
      return request({
          url: `/api/eduChapter/getChapterVideo/`+courseId,
          method: 'get'
        })
    },
   
    //添加章节
    addchapterInfo(chapterInfo){
      return request({
        url:`/api/eduChapter/addChapter`,
        method:'post',
        data:chapterInfo
      })
    },
    //删除章节
    
    deleteChapter(chapterId) {
      return request({
          url: `/api/eduChapter/removeChapter/`+chapterId,
          method: 'delete'
        })
  },
    //查询章节
    getchapterInfo(chapterId){
      return request({
        url:`/api/eduChapter/getChapter/`+chapterId,
        method:'get'
      })
      
    },
    //讲师修改信息
    updateTeacherInfo (teacherInfo) {
      return request({
        url:`/api/eduTeacher/update`,
        method:'post',
        data:teacherInfo
      })
    }

}