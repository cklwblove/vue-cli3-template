'use strict';

const {fromCamelCase} = require('./utils');

module.exports = {
  // 页面模板
  viewTemplate: (componentName) => {
    return `<template>
  <div class="page-${fromCamelCase(componentName)}">
    ${componentName} 页面
  </div>
</template>

<script>
  export default {
    mixins: [],
  
    components: {},
  
    data() {return {}},
  
    computed: {},
  
    watch: {},
  
    created() {},
  
    mounted() {},
  
    destroyed() {},
  
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "./style.less";
</style>
`;
  },
  styleTemplate: (componentName) => {
    return `@import "~variable";
@import "~mixins";

.page-${fromCamelCase(componentName)} {

}`;
  },
  // 组件模板
  componentTemplate: (componentName) => {
    return `<template>
  <div class="comp-${fromCamelCase(componentName)}">
    ${componentName} 组件
  </div>
</template>

<script>
  export default {
    name: '${componentName}',
    
    mixins: [],
  
    components: {},
  
    data() {return {}},
  
    computed: {},
  
    watch: {},
  
    created() {},
  
    mounted() {},
  
    destroyed() {},
  
    methods: {}
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "~variable";
  @import "~mixins";
  
  .comp-${fromCamelCase(componentName)} {

  }
</style>
`;
  }
};
