import request from '@/utils/request'

export default {
    //1 课程分类列表
    getSubjectList() {
        return request({
            url: '/api/eduSubject/getSubject/list',
            method: 'get'
          })
    },
    //上传封面
    publishAvatar(file){
        return request({
            url:`/api/oss/uploadAvatar`,
            method:'post',
            data:file
        })
    }
}
