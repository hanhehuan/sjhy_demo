import axios from 'axios'
import store from '../store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' //  基础路径
})

//  请求拦截器
request.interceptors.request.use(function (config) {
  const {user} = store.state;
  if (user){
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
},function (error) {
  return Promise.reject(error)
});
//  响应拦截器拦截器

//  导出
export default request
