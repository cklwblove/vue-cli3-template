<template>
  <div class="page page-net">
    <div class="box-center">
      <p class="dec">网络未连接/网络不给力</p>
      <div class="btn">
        <div class="content" @click="refresh">
          <svg-icon name="refresh"></svg-icon>
          <span>刷新</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  inject: ['reload'],
  methods: {
    refresh() {
      this.reload();
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import 'style.less';
</style>
