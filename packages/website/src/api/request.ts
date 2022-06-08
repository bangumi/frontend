import axios from 'axios'

const baseURL = (import.meta.env.VITE_APP_ROOT as string) ?? 'https://api.bgm.tv'

export const request = axios.create({
  baseURL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = async (error: any): Promise<never> => {
  console.log(error)

  return await Promise.reject(error)
}

request.interceptors.request.use(config => {
  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  return response
}, errorHandler)

export const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_ROOT
})

privateRequest.interceptors.response.use((response) => {
  return response
})
