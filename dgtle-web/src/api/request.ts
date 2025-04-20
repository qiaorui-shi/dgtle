import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建axios实例
const instance = axios.create({
  baseURL: '/api', // 从环境变量获取基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 1.添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 1.文件二进制数据则直接返回
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res.data
    }
    // 2.token失效
    if (res.data.code === 401) {
      
    }
    return Promise.resolve(res.data)
  },
  error => {
    return Promise.reject(error)
  }
)

// 封装通用请求方法
export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance(config)
    return response.data
  } catch (error) {
    throw error
  }
}
