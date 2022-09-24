"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "http://localhost:8080",
  timeout: 10000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);


//请求拦截器
_axios.interceptors.request.use(
  //发送前回调函数
  function (config) {
    // 是否需要设置 token
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    let user = localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      config.headers['token'] = user.token
    }
    // Do something before request is sent
    return config;
  },
  //请求发生错误时的回调函数
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.msg == '无token， 请重新登录') {
      Vue.prototype.$message.error('无token， 请先登录！')
      window.location.href = "/user/login"
    }
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
