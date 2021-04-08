import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/api/eduCourse/addCourseInfo',
            method: 'post',
            data:courseInfo
          })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/api/eduTeacher/findAll',
            method: 'get'
          })
    },
    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/api/eduCourse/getCourseInfo/'+id,
            method: 'get'
          })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/api/eduCourse/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },
    //课程确认信息显示
    getPublihCourseInfo(id) {
        return request({
            url: '/api/eduCourse/getPublishCourseInfo/'+id,
            method: 'get'
          })
    },
    //课程最终发布
    publihCourse(id) {
        return request({
            url: '/api/eduCourse/publishCourse/'+id,
            method: 'post'
          })
    },
    //TODO 查询讲师所授课程
    getListCourse() {
        return request({
            url: '/eduservice/course',
            method: 'get'
          })
    }

}
