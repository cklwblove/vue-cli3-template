/**
 *
 * @authors liwb (you@example.org)
 * @date    2020/6/6 10:52
 * @description
 * 在开发中，经常会遇到接口重复请求导致的各种问题。
 对于重复的get请求，会导致页面更新多次，发生页面抖动的现象，影响用户体验。
 对于重复的post请求，会导致在服务端生成两次记录（例如生成两条订单记录）。
 如果当前页面请求还未响应完成，就切换到了下一个路由，那么这些请求直到响应返回才会中止。
 无论从用户体验或者从业务严谨方面来说，取消无用的请求确实是需要避免的。

 取消请求主要有两个场景：
 当请求方式method，请求路径url，请求参数（get为params，post为data）都相同时，可以视为同一个请求发送了多次，需要取消之前的请求
 当路由切换时，需要取消上个路由中未完成的请求
 */

import axios from 'axios';
import Qs from 'qs';
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();

/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
  // 保持 url 的唯一性
  const url = [
    config.method,
    config.url,
    Qs.stringify(config.params),
    config.data,
  ].join('&');
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};

/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [
    config.method,
    config.url,
    Qs.stringify(config.params),
    config.data,
  ].join('&');
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

export { addPending, removePending, clearPending };
