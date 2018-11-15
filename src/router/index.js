/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2018/6/5 上午10:43
 * @description 定义路由模块
 */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const loadView = (view) => () => import(`@views/${view}/index.vue`);

const routes = [
  {
    path: '/',
    name: 'hello',
    component: loadView('hello')
  },
  {
    path: '/home',
    name: 'home',
    component: loadView('home')
  },
  {
    path: '*', redirect: '/'
  }
];

const router = new Router({
  mode: 'hash',
  routes
});

export default router;
