<template>
  <div id="app">
    <div class="pages">
      <!--断网处理-->
      <NoNet v-if="netStatus" />
      <router-view v-if="isRouterAlive" />
    </div>
  </div>
</template>

<script>
import { NoNet } from '@/components';

export default {
  components: {
    NoNet,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      netStatus: false,
      isRouterAlive: true,
    };
  },
  mounted() {
    this.$eventBus.$on('isBrokenNetwork', (status) => {
      this.netStatus = status;
    });
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less">
@import '~@/assets/less/app.less';

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
