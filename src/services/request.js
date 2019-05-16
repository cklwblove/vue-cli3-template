/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description https://github.com/mzabriskie/axios
 * 安卓4.4.3一下的手机还是不支持Promise的,需要引入npm install babel-polyfill和npm install babel-runtime，在入口文件上加上即可
 * import 'babel-polyfill';
 */

import Qs from 'qs';
import axios from 'axios';
import autoMatchBaseUrl from './autoMatchBaseUrl';
import {TIMEOUT, HOME_PREFIX} from '../constant';

// 添加一个请求拦截器 （于transformRequest之前处理）
axios.interceptors.request.use((config) => {
  // 以下代码，鉴权token,可根据具体业务增删。
  // demo示例:
  if (~config['url'].indexOf('operatorQry')) {
    config.headers['accessToken'] = 'de4738c67e1bb450be71b660f0716aa4675860cec1ff9bc23d800efb40519cf3';
  }
  return config;
}, function (error) {
  // 当出现请求错误是做一些处理
  return Promise.reject(error);
});

// 添加一个返回拦截器 （于transformResponse之后处理）
// 返回的数据类型默认是json，若是其他类型（text）就会出现问题，因此用try,catch捕获异常
axios.interceptors.response.use((response) => {
  window.$eventBus.$emit('isBrokenNetwork', false);
  return checkStatus(response);
}, function (error) {
  const {response, code} = error;
  // 接口请求异常统一处理
  if (code === 'ECONNABORTED') {
    // Timeout error
    console.log('Timeout error', code);
  }
  if (response) {
    // 请求已发出，但是不在2xx的范围
    // 对返回的错误进行一些处理
    return Promise.reject(checkStatus(error));
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    console.log('断网了~');
    window.$eventBus.$emit('isBrokenNetwork', true);
  }
});

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    // -1000 自己定义，连接错误的status
    const status = response.status || -1000;
    if ((status >= 200 && status < 300) || status === 304) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    } else {
      let errorInfo = '';
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试';
          break;
        case 400:
          errorInfo = '400: 错误请求';
          break;
        case 401:
          errorInfo = '401: 访问令牌无效或已过期';
          break;
        case 403:
          errorInfo = '403: 拒绝访问';
          break;
        case 404:
          errorInfo = '404：资源不存在';
          break;
        case 405:
          errorInfo = '405: 请求方法未允许';
          break;
        case 408:
          errorInfo = '408: 请求超时';
          break;
        case 500:
          errorInfo = '500：访问服务失败';
          break;
        case 501:
          errorInfo = '501：未实现';
          break;
        case 502:
          errorInfo = '502：无效网关';
          break;
        case 503:
          errorInfo = '503: 服务不可用';
          break;
        default:
          errorInfo = `连接错误${status}`;
      }
      return {
        status,
        msg: errorInfo
      };
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 */
export default function request(url, {
  method = 'post',
  timeout = TIMEOUT,
  prefix = HOME_PREFIX,
  data = {},
  headers = {},
  dataType = 'json'
}) {
  const baseURL = autoMatchBaseUrl(prefix);
  
  headers = Object.assign({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers);

  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    data: data,
    timeout,
    headers,
    responseType: dataType
  };

  if (method === 'get') {
    delete defaultConfig.data;
    // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
    if (data !== undefined) {
      defaultConfig.params = Object.assign(defaultConfig.params, {_t: (new Date()).getTime()})
    } else {
      defaultConfig.params = {_t: (new Date()).getTime()}
    }
  } else {
    delete defaultConfig.params;

    const contentType = headers['Content-Type'];

    if (typeof contentType !== 'undefined') {
      if (~contentType.indexOf('multipart')) {
        // 类型 `multipart/form-data;`
        defaultConfig.data = data;
      } else if (~contentType.indexOf('json')) {
        // 类型 `application/json`
        // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
        defaultConfig.data = JSON.stringify(data);
      } else {
        // 类型 `application/x-www-form-urlencoded`
        // 服务器收到的raw body(原始数据) name=homeway&key=nokey
        defaultConfig.data = Qs.stringify(data);
      }
    }
  }

  return axios(defaultConfig);
}

// 上传文件封装
export const uploadFile = (url, formData) => {
  return request(url, {
    method: 'post',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  });
};
