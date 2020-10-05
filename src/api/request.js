import axios from "axios";
// import store from '../store'
// import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  // api的base_url
  // baseURL: "https://byheartapitest.luciditv.org/wordpress/"
  baseURL: "https://appapi.bwbyheart.org//wordpress/"
  // timeout: 10000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
