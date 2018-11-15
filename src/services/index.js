import Vue from 'vue';
import request from './request';
import urls from './RESTFULLURL';

let FUNS = {};

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return request(urls[key], options);
  }
});

// 将services挂载到vue的原型上
// views引用的方法：this.$services.接口名（小驼峰）
Object.defineProperty(Vue.prototype, '$services', {value: FUNS});

export default FUNS;
