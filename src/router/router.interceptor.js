/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description 定义路由拦截器模块，比如登录鉴权逻辑等
 */

import router from './index';

router.beforeEach((to, from, next) => {
  next();
});
