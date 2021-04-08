import request from '@/utils/request'
export default {
    //1 根据课程id获取章节和小节数据列表
    getAllChapterVideo(courseId) {
        return request({
            url: `/api/eduChapter/getChapterVideo/`+courseId,
            method: 'get'
          })
    },
    //添加章节
    addChapter(chapter) {
        return request({
            url: `/api/eduChapter/addChapter`,
            method: 'post',
            data: chapter
          })
    },
    //根据id查询章节
    getChapter(chapterId) {
        return request({
            url: `/api/eduChapter/getChapter/`+chapterId,
            method: 'get'
          })
    },
    //修改章节
    updateChapter(chapter) {
        return request({
            url: `/api/eduChapter/updateChapter`,
            method: 'post',
            data: chapter
          })
    },
    //删除章节
    deleteChapter(chapterId) {
        return request({
            url: `/api/eduChapter/removeChapter/`+chapterId,
            method: 'delete'
          })
    },
}