/**
 * 由于 Vue CLI 3 不再使用传统的 webpack 配置文件，故 WebStorm 无法识别别名
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
 * */
const resolve = (dir) => require('path').join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      'services': resolve('src/services'),
      'variable': resolve('src/assets/less/variable.less'),
      'utils': resolve('node_modules/@liwb/cloud-utils/dist/cloud-utils.esm'),
      'mixins': resolve('node_modules/magicless/magicless.less')
    }
  }
};