import axios from 'axios'
import cookie from 'js-cookie'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://dmbw68.natappfree.cc', // api的base_urlhttp://localhost:8002//
  timeout: 20000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
  config => {
  //debugger
  //判断cookie里面是否有mini_token数据
  if (cookie.get('mini_token')) {
    //把获取cookie值放到header里面
    config.headers['token'] = cookie.get('mini_token');
  }
    return config
  },
  err => {
  return Promise.reject(err);
})
export default service