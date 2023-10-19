// 封装axios
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://project.x-zd.net:3001/apis',
  timeout: 3000
})
// 利用axios的拦截器 (请求 响应) 处理返回的数据
request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default request
