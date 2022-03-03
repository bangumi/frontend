import axios from 'axios'

const baseURL = 'https://api.bgm.tv'
export const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_ROOT as string,
  // import.meta无法通过jest https://github.com/facebook/jest/issues/4842 可能需要改一下jest配置
  baseURL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = async (error: any): Promise<never> => {
  console.log(error)

  return await Promise.reject(error)
}

const underscodeToCamelcase = (data: any): string | any[] => {
  if (Array.isArray(data)) {
    data.forEach((value) => {
      value = underscodeToCamelcase(value)
    })
  } else if (data !== null && typeof data === 'object') {
    for (const key in data) {
      const newKey = underscodeToCamelcase(key) as string
      if (key !== newKey) {
        data[newKey] = data[key]
        delete data?.key
      }
      if (typeof data[key] === 'object') data[key] = underscodeToCamelcase(data[key])
    }
  } else if (typeof data === 'string') {
    data = data.replace(/_[a-z]/g, (str: string): string => {
      const char = str[1]
      return char.toUpperCase()
    })
  }
  return data
}

request.interceptors.request.use(config => {
  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  response.data = underscodeToCamelcase(response.data)
  return response
}, errorHandler)
