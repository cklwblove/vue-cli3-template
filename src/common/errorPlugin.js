/**
 * 优雅的处理vue项目异常
 * 增加全局异常处理有助于
   提高代码健壮性
   减少崩溃
   快速定位bug
 * // https://juejin.im/post/5cf72029f265da1b5f264334
 */
import Vue from 'vue';

/**
 * 全局异常处理
 * @param error
 * @param vm
 * @param info
 */
const errorHandler = (error, vm, info) => {
  console.error('抛出全局异常');
  console.error(vm);
  console.error(error);
  console.error(info);
};

const globalError = {
  install: (Vue) => {
    Vue.config.errorHandler = errorHandler;
    Vue.mixin({
      beforeCreate() {
        const methods = this.$options.methods || {};
        Object.keys(methods).forEach((key) => {
          let fn = methods[key];
          this.$options.methods[key] = function(...args) {
            let ret = fn.apply(this, args);
            if (
              ret &&
              typeof ret.then === 'function' &&
              typeof ret.catch === 'function'
            ) {
              return ret.catch(errorHandler);
            } else {
              // 默认错误处理
              return ret;
            }
          };
        });
      },
    });
    Vue.prototype.$throw = errorHandler;
  },
};

Vue.use(globalError);
