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

const underscoreToCamelcase = (data: any): string | any[] => {
  if (Array.isArray(data)) {
    data.forEach((value) => {
      value = underscoreToCamelcase(value)
    })
  } else if (data !== null && typeof data === 'object') {
    for (const key in data) {
      const newKey = underscoreToCamelcase(key) as string
      if (key !== newKey) {
        data[newKey] = data[key]
        delete data?.key
      }
      if (typeof data[key] === 'object') data[key] = underscoreToCamelcase(data[key])
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
  response.data = underscoreToCamelcase(response.data)
  return response
}, errorHandler)
