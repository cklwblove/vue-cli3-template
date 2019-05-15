/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-03-19 16:38
 * @version event bus
 * 让在Vue中使用的EventBus也有生命周期
 * 在使用中经常最容易忽视，又必然不能忘记的东西，那就是:清除事件总线 eventBus。

 不手动清除，它是一直会存在，这样当前执行时，会反复进入到接受数据的组件内操作获取数据，原本只执行一次的获取的操作将会有多次操作。本来只会触发并只执行一次，变成了多次，这个问题就非常严重。
 当不断进行操作几分钟后，页面就会卡顿，并占用大量内存。
 所以一般在vue生命周期 beforeDestroy或者 destroyed中，需要用vue实例的 $off方法清除 eventBus
 可当你有多个 eventBus时，就需要重复性劳动 $off销毁这件事儿。这时候封装一个 eventBus就是更佳的解决方案。
 */
import Vue from 'vue';

class EventBus {
  constructor(vue) {
    if (!this.handles) {
      Object.defineProperty(this, 'handles', {
        value: {},
        enumerable: false
      });
    }
    this.Vue = vue;
    // _uid和EventName的映射
    this.eventMapUid = {};
  }

  setEventMapUid(uid, eventName) {
    if (!this.eventMapUid[uid]) this.eventMapUid[uid] = [];
    this.eventMapUid[uid].push(eventName); // 把每个_uid订阅的事件名字push到各自uid所属的数组里
  }

  $on(eventName, callback, vm) {
    // vm是在组件内部使用时组件当前的this用于取_uid
    if (!this.handles[eventName]) this.handles[eventName] = [];
    this.handles[eventName].push(callback);
    if (vm instanceof this.Vue) this.setEventMapUid(vm._uid, eventName);
  }

  $emit() {
    let args = [...arguments];
    let eventName = args[0];
    let params = args.slice(1);
    if (this.handles[eventName]) {
      let len = this.handles[eventName].length;
      for (let i = 0; i < len; i++) {
        this.handles[eventName][i](...params);
      }
    }
  }

  $offVmEvent(uid) {
    let currentEvents = this.eventMapUid[uid] || [];
    currentEvents.forEach((event) => {
      this.$off(event);
    });
  }

  $off(eventName) {
    delete this.handles[eventName];
  }
}

// 写成Vue插件形式，直接引入然后Vue.use($EventBus)进行使用
let $EventBus = {};

$EventBus.install = (Vue) => {
  window.$eventBus = new EventBus(Vue);
  Vue.prototype.$eventBus = new EventBus(Vue);
  Vue.mixin({
    beforeDestroy() {
      // 拦截beforeDestroy钩子自动销毁自身所有订阅的事件
      this.$eventBus.$offVmEvent(this._uid);
    }
  });
};

Vue.use($EventBus);

// 组件中使用
// created () {
//   let text = Array(1000000).fill('xxx').join(',')
//   this.$eventBus.$on('home-on', (...args) => {
//     console.log('home $on====>>>', ...args)
//     this.text = text
//   }, this) // 注意第三个参数需要传当前组件的this，如果不传则需要手动销毁
// },
// mounted () {
//   setTimeout(() => {
//     this.$eventBus.$emit('home-on', '这是home $emit参数', 'ee')
//   }, 1000)
// },
// beforeDestroy () {
//   // 这里就不需要手动的off销毁eventBus订阅的事件了
// }
