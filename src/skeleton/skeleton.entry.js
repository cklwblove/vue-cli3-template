import Vue from 'vue';
import Skeleton from './skeleton.vue';
import SkeletonComp from '../components/skeleton/index';

Vue.use(SkeletonComp);

export default new Vue({
  components: {
    Skeleton
  },
  template: '<skeleton />'
});
