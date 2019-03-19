<template>
  <div id="app">
    <div class="pages">
      <!--断网处理-->
      <NoNet v-if="netStatus"/>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import {NoNet} from '@/components';

  export default {
    components: {
      NoNet
    },
    data() {
      return {
        netStatus: false
      };
    },
    mounted() {
      window.EventBus.$on('isBrokenNetwork', (status) => {
        this.netStatus = status;
      });
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "~@/assets/less/app.less";

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
