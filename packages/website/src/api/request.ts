import axios from 'axios'

const baseURL = 'https://api.bgm.tv'
export const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_ROOT as string,
  // import.meta无法通过jest https://github.com/facebook/jest/issues/4842 可能需要改一下jest配置
  baseURL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error:any) => {
  console.log(error)

  return Promise.reject(error)
}

request.interceptors.request.use(config => {
  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  return response
}, errorHandler)
