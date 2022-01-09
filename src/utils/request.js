import axios from 'axios'
import { Toast, Notify } from 'vant'
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 60000 // request timeout
})

service.interceptors.request.use(
  config => {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true
    })
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    if (res.retCode !== '1') {
      Notify({ type: 'danger', message: res.retMsg || 'Error' })
      return Promise.reject(new Error(res.retMsg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Toast.clear()
    if (error.response && parseInt(error.response.status) !== 200) {
      Notify({ type: 'danger', message: error.response })
    }
    return Promise.reject(error)
  }
)

export default service
