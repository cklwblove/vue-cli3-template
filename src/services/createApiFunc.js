import Vue from 'vue';

/**
 * 再次进行封装， api 异步action
 * @param func 请求API方法
 * @param payload
 * @returns {Promise<*>}
 */
async function createApiFunc(func, payload = {}) {
  try {
    const res = await Vue.prototype.$services[func](payload);
    if (res) {
      return res;
    }
    return null;
  } catch (e) {
    return e;
  }
}

export default createApiFunc;
