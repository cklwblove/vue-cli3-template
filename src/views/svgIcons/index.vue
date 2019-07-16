<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <div v-for="item of iconsMap" :key="item" :title="generateIconCode(item)">
        <div class="icon-item">
          <svg-icon :name="item" class-name="disabled" />
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '@/icons/requireIcons';

export default {
  name: 'Icons',
  data() {
    return {
      iconsMap: icons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon name="${symbol}" />`;
    },
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.icons-container {
  margin: 15px;
  overflow: hidden;

  .icons-wrapper {
    margin: 0 auto;
  }

  .icon-item {
    float: left;
    width: 110px;
    height: 110px;
    margin: 20px;
    font-size: 30px;
    color: #24292e;
    text-align: center;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 24px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
