import request from '@/utils/request'
export default {

    //添加小节
    addVideo(video) {
        return request({
            url: `/api/eduVideo/addVideo`,
            method: 'post',
            data: video
          })
    },
    
    //删除小节
    deleteVideo(id) {
        return request({
            url: `/api/eduVideo/`+id,
            method: 'delete'
          })
    },
    //删除视频
    deleteAliyunvod(id) {
        return request({
            url: `/api/video/removeAlyVideo/`+id,
            method: 'delete'
          })
    }

}