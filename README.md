# [vue-cli3-template](https://github.com/cklwblove/vue-cli3-template)

[![license](https://img.shields.io/badge/vue-2.5.17-brightgreen.svg)](https://github.com/vuejs/vue) 
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/cklwblove/vue-cli3-template/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/cklwblove/vue-cli3-template.svg?branch=master)](https://travis-ci.org/cklwblove/vue-cli3-template) 

基于 vue-cli3 搭建的前端模板，fork 或 clone 本仓库，即可搭建完成一个新项目的基础模板

## 特性

- CSS 预编译语言：[less](http://lesscss.org/)

- Ajax: [axios](https://github.com/axios/axios)，做了一定的封装，详见 `src/services/request.js`

- SVG 雪碧图：采用 `webpack` 插件 `svg-sprite-loader`,及 `svg` 精简压缩工具 `svgo`

- 移动 web 的适配方案：引入了 `postcsspostcss-pxtorem` 及 `lib-flexible`，可以自由地用 px 去开发

- 常用的 js 工具类： [cloud-utils](https://cloud-templates.github.io/cloud-utils/)

- 常用的 Less 的 mixins 集合：[magicless](https://github.com/cklwblove/magicless)


## 目录介绍

```
.
├── build            # 生成压缩包
├── public           # 静态资源，不需要 webpack 处理
└── src
    ├── assets
    │   ├── fonts    # 字体文件
    │   ├── img
    │   ├── js       # 不经过 npm 或 yarn 下载的第三方依赖包
    │   └── less     # reset 样式，及定义的常量文件等
    ├── components
    │   └── SvgIcon  # svg 雪碧图
    ├── filters      # 全局过滤器
    ├── icons        # svg 文件
    │   └── svg
    ├── router       # 路由及拦截器
    ├── services     # 统一的服务接口请求处理
    └── views
        └── hello
```


## 开发及发布
```
# 克隆项目
git clone git@github.com:cklwblove/vue-cli3-template.git

# 安装依赖
yarn install

# 可以通过如下操作解决 yarn 下载速度慢的问题
yarn install --registry=https://registry.npm.taobao.org

# 启动服务
yarn run serve

# 构建生产环境
yarn run build

# 压缩 dist 文件夹，生成 zip 包
yarn run deploy

```

浏览器访问 http://localhost:3000

## 其他
```
# --svgo svg精简压缩
yarn run svgo

# --analyz 基于 webpack-bundle-analyzer 插件分析打包的文件构成及大小(vue ui 界面上的分析不习惯 :stuck_out_tongue_winking_eye:)
yarn run analyz

# --report 生成静态报告文件
yarn run report

```

## 相关链接

- [vue-cli3官方文档](https://cli.vuejs.org/zh/)
- [vue-cli 3.0 配置](https://blog.csdn.net/qq_35844177/article/details/81099492)
- [chainWebpack](https://github.com/neutrinojs/webpack-chain#getting-started)
- [[Vue CLI 3] 配置 webpack-bundle-analyzer 插件](https://segmentfault.com/a/1190000016247872)
## License

[MIT](https://github.com/cklwblove/vue-cli3-template/blob/master/LICENSE)
