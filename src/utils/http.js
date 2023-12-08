// axios基础封装
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/user"
import router from "@/router"

// 创建axios实例
const httpInstance = axios.create({
  // 请求地址
  baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  // 超时时间
  timeout:5000
})

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //1,从pinia里面获取数据
  const userStore = useUserStore()
  //2，按照后端的要求拼接数据
  const token = userStore.userInfo.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
},e=>Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  // 统一错误提示
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  // 401 token失效处理
  // 1, 清楚本地用户信息
  if(e.response.status === 401){
    userStore.clearUserInfo()
  }
  // 2， 跳转登录页
  router.push('/login')
  return Promise.reject(e)
})

export default httpInstance
