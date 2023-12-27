import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    console.log(response)
    ElMessage({
      showClose: true,
      message: response.data.message || '服务异常',
      type: 'error'
    })
    return Promise.reject(response.data.message)
  },
  (error) => {
    ElMessage({
      showClose: true,
      message: error.response.message || '服务异常',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
