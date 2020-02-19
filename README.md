# [vue-cli3-template](https://github.com/cklwblove/vue-cli3-template)

[![license](https://img.shields.io/badge/vue-2.5.17-brightgreen.svg)](https://github.com/vuejs/vue)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/cklwblove/vue-cli3-template/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/cklwblove/vue-cli3-template.svg?branch=master)](https://travis-ci.org/cklwblove/vue-cli3-template)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcklwblove%2Fvue-cli3-template.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcklwblove%2Fvue-cli3-template?ref=badge_shield)

基于 vue-cli3 搭建的前端模板，fork 或 clone 本仓库(持续更新中...)

**🛎️ 不建议用此作为项目的基础模板**

**🚀 结合 vue-cli3 的 preset 搭建基于 git repo 的前端项目模板，可以移步 [vue-preset](https://github.com/cklwblove/vue-preset)**

## 特性

- CSS 预编译语言：[less](http://lesscss.org/)

- Ajax: [axios](https://github.com/axios/axios)，做了一定的封装，详见 `src/services/request.js`

- SVG 雪碧图：[vue-svgicon](https://github.com/MMF-FE/vue-svgicon)

- 移动 web 的适配方案：引入了 `postcss-pxtorem` 及 `lib-flexible`，可以自由地用 px 去开发

- 常用的 js 工具类： [cloud-utils](https://cklwblove.github.io/cloud-utils/)

- 引用 `style-resources-loader`：全局注入相关的`less`文件，如通用的 `variable`及 `mixins`等

- 常用的 Less 的 mixins 集合：[magicless](https://github.com/cklwblove/magicless)

- 支持根据 `npm scripts`，自动生成 `component` 和 `view` 功能

- 支持采用`TinyPNG node.js API` 进行在线压缩`.jpg`或`.png`格式图片，并且转换`Webp`格式文件

- 支持**断网处理**

- 支持将 `webpack watch mode` 编译后文件自动上传至指定服务器，并在终端打印入口页面地址及生成二维码(**灵感来源：[@nutui/upload](https://www.npmjs.com/package/@nutui/upload)**)
  - 运行 `vue-cli-service build`，以监听模式（watch mode）启动编译，并将编译后的文件**自动上传**到内网服务器 *(解决手动上传不便的问题)*
  - 终端（命令行界面）打印出页面入口地址和二维码，手机扫码即可访问 *（解决手机录入地址不便的问题）*
  - 监听文件，一旦保存修改，增量编译 *（解决全量编译速度慢的问题）*
  - 将编译后且有变化的文件增量上传到内网服务器 *（解决全量上传速度慢的问题）*
  - 在手机上刷新页面或重新扫码即可看到变化

- 支持 `skeleton`，**骨架屏注入**

- 支持**开发模式**下，终端打印入口页面地址及生成二维码，**依赖Wifi热点，手机设备和PC必须处在同一局域网**([vue-cli-plugin-qrcode](https://github.com/cklwblove/vue-cli-plugin-qrcode))

- 引入 [plop](https://plopjs.com/),执行脚本 `npm run new` 自动生成 `view` 或者 `component` 模板文件(**灵感来源：[New](https://panjiachen.github.io/vue-element-admin-site/zh/feature/script/new.html)**)。

- 支持根据 `views` 路径自动生成 `vue-router` 的路由（src/router/.invoke/router.js），且支持**热更新**。(**灵感来源**：[vue-router-invoke-webpack-plugin](https://github.com/cklwblove/vue-router-invoke-webpack-plugin))

- 支持 `PWA`

- ~~引用 [vue-cli-plugin-dll](https://www.npmjs.com/package/@liwb/vue-cli-plugin-dll)，支持 `webpack` 的 `Dll`、`DllReference`，加快**编译**速度。~~目前使用了 `CDN` 来加速

- 生产环境移除 `console.log`(https://github.com/cklwblove/vue-cli3-template/issues/12)
## 目录介绍

```
.
├── build              # 生成压缩包
├── public             # 静态资源，不需要 webpack 处理
├── scripts            # npm scripts
└── src
    ├── assets
    │   ├── fonts      # 字体文件
    │   ├── img
    │   ├── js         # 不经过 npm 或 yarn 下载的第三方依赖包
    │   └── less       # reset 样式，及定义的常量文件等
    ├── components
    │   ├── SendCode   # tree shaking 组件
    │   └── global     # 全局注册组件
    ├── filters        # 全局过滤器
    ├── icons          # svg 文件
    │   └── svg
    ├── router         # 路由及拦截器
    ├── services       # 统一的服务接口请求处理
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

# 自动生成 view or component
yarn run new

# 压缩图片
yarn run compress

# 生成 webp
yarn run webp

# css,less 文件代码检测
yarn run lint:style

# 骨架屏注入
yarn run skeleton

```

浏览器访问 http://localhost:3000

## 其他
```

# --analyz 基于 webpack-bundle-analyzer 插件分析打包的文件构成及大小(vue ui 界面上的分析不习惯)
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

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fcklwblove%2Fvue-cli3-template.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fcklwblove%2Fvue-cli3-template?ref=badge_large)
