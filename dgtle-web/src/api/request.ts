import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from "antd-mobile";

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_ENV === "dev" ? "/api" : import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json"
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 1.添加token
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 1.文件二进制数据则直接返回
    if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
      return res.data;
    }
    if (res.data.code !== 200) {
      // 2.token失效
      if (res.data.code === 401) {
        Toast.show("登录已过期，请重新登录");
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        // 3.其他错误
        Toast.show(res.data.message || "服务器错误");
      }
      return Promise.reject(res.data);
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装通用请求方法
// 移除默认的 any 类型，让调用者必须显式指定类型
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await instance(config);
  return response.data;
};
