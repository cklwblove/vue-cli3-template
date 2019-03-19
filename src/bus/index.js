/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-03-19 16:38
 * @version event bus
 */
import Vue from 'vue';

const Bus = {
  install(Vue) {
    const EventBus = new Vue({});
    Vue.prototype.$bus = EventBus;
    Vue.EventBus = EventBus;
    window.EventBus = EventBus;
  }
};

Vue.use(Bus);
