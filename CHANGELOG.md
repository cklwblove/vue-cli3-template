<a name="0.1.28"></a>
## [0.1.28](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.27...v0.1.28) (2020-05-10)


### Bug Fixes

* **svg:** 打包构建时，src/icons 里的 .svg 文件不被识别的问题 ([3c2a657](https://github.com/cklwblove/vue-cli3-template/commit/3c2a657))


### Features

* 以一个文件的方式使用解析好的 webpack 配置 ([a7d2cc9](https://github.com/cklwblove/vue-cli3-template/commit/a7d2cc9))
* **code:** 增加 vconsole 的配置开关 ([161b103](https://github.com/cklwblove/vue-cli3-template/commit/161b103))
* **npm scripts:** 增加 fix-memory-limit scripts ([1bdf9a3](https://github.com/cklwblove/vue-cli3-template/commit/1bdf9a3))



<a name="0.1.27"></a>
## [0.1.27](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.19...v0.1.27) (2019-11-06)


### Bug Fixes

* **eventBus:** 修复bug,及get请求增加时间戳，避免从缓存中拿数据。 ([ab249a9](https://github.com/cklwblove/vue-cli3-template/commit/ab249a9))
* **webpack-bundle-analyzer-report:** 更改 npm scripts ([9a6daf5](https://github.com/cklwblove/vue-cli3-template/commit/9a6daf5))
* vue-cli4 版本，解决终端控制台里的 warning ([1dcf7e1](https://github.com/cklwblove/vue-cli3-template/commit/1dcf7e1))
* windows环境下，npm run zip 异常情况 ([1b4808f](https://github.com/cklwblove/vue-cli3-template/commit/1b4808f))


### Features

* 增加 mixins(派发与广播—— dispatch 和 broadcast 方法) ([d5157c0](https://github.com/cklwblove/vue-cli3-template/commit/d5157c0))
* 增加 nginx 部署示例 ([bd4e469](https://github.com/cklwblove/vue-cli3-template/commit/bd4e469))
* 增加 pwa 的支持 ([6a182e4](https://github.com/cklwblove/vue-cli3-template/commit/6a182e4))
* 增加 组件通信方法集锦 ([090ba15](https://github.com/cklwblove/vue-cli3-template/commit/090ba15))
* 增加在 WebStorm 中，配置能够识别 Vue CLI 3 创建的项目的别名 alias @ ([821abf6](https://github.com/cklwblove/vue-cli3-template/commit/821abf6))
* 支持开发模式下，终端打印入口页面地址及生成二维码 ([568b043](https://github.com/cklwblove/vue-cli3-template/commit/568b043))
* 支持根据 views 文件格式自动生成 vue-router 的路由 ([f24e3ec](https://github.com/cklwblove/vue-cli3-template/commit/f24e3ec))
* **plugin:** 引用 [vue-cli-plugin-dll](https://www.npmjs.com/package/[@liwb](https://github.com/liwb)/vue-cli-plugin-dll)，支持 `we ([bf4a9b4](https://github.com/cklwblove/vue-cli3-template/commit/bf4a9b4))
* 替换自动生成view 或 component，脚本，引入 plop 依赖 ([7c79b39](https://github.com/cklwblove/vue-cli3-template/commit/7c79b39))
* 生产环境去除 config.log ([d89d3c1](https://github.com/cklwblove/vue-cli3-template/commit/d89d3c1))
* 生产环境移除 config.log 功能总结 ([7f71ff9](https://github.com/cklwblove/vue-cli3-template/commit/7f71ff9))


### Performance Improvements

* **eventBus:** eventBus封装,让其也有生命周期 ([a765a4f](https://github.com/cklwblove/vue-cli3-template/commit/a765a4f))



<a name="0.1.19"></a>
## [0.1.19](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.18...v0.1.19) (2019-03-22)


### Features

* 增加新的功能，支持骨架屏注入功能 ([941fb39](https://github.com/cklwblove/vue-cli3-template/commit/941fb39))



<a name="0.1.18"></a>
## [0.1.18](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.17...v0.1.18) (2019-03-20)


### Features

* 增加 stylelint 插件，规划样式文件的编写 ([70c3854](https://github.com/cklwblove/vue-cli3-template/commit/70c3854))
* 增加断网处理 ([b84253d](https://github.com/cklwblove/vue-cli3-template/commit/b84253d))
* 增加断网检测及相关处理 ([6ef80c8](https://github.com/cklwblove/vue-cli3-template/commit/6ef80c8))
* 引入 style-resources-loader，实现全局注入 less 相关定义，如变量，函数等 ([fb1cd50](https://github.com/cklwblove/vue-cli3-template/commit/fb1cd50))
* 添加 event bus 事件总线定义 ([2ca0ae9](https://github.com/cklwblove/vue-cli3-template/commit/2ca0ae9))
* 自动上传服务器，并在控制台生成二维码，便于真机调试 ([2835ffa](https://github.com/cklwblove/vue-cli3-template/commit/2835ffa))
* 采用`TinyPNG node.js API` 进行在线压缩`.jpg`或`.png`格式图片，并且转换`Webp`格式文件 ([ba4879c](https://github.com/cklwblove/vue-cli3-template/commit/ba4879c))



<a name="0.1.16"></a>
## [0.1.16](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.15...v0.1.16) (2019-03-08)


### Features

* 增加 stylelint 功能 ([455889d](https://github.com/cklwblove/vue-cli3-template/commit/455889d))



<a name="0.1.15"></a>
## [0.1.15](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.14...v0.1.15) (2019-02-25)


### Features

* 增加 progress-bar-webpack-plugin 插件 ([8ecb718](https://github.com/cklwblove/vue-cli3-template/commit/8ecb718))



<a name="0.1.14"></a>
## [0.1.14](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.13...v0.1.14) (2019-01-30)


### Features

* 增加全局组件注册功能 ([2fd5cd0](https://github.com/cklwblove/vue-cli3-template/commit/2fd5cd0))
* 支持自动生成component,及view 功能 ([d61adf7](https://github.com/cklwblove/vue-cli3-template/commit/d61adf7))
* 数据请求超时处理 ([3217696](https://github.com/cklwblove/vue-cli3-template/commit/3217696))
* 针对上传文件做统一封装 ([58327eb](https://github.com/cklwblove/vue-cli3-template/commit/58327eb))



<a name="0.1.13"></a>
## [0.1.13](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.12...v0.1.13) (2019-01-25)


### Bug Fixes

* 修复执行 npm run lint 出现的异常 ([01f259a](https://github.com/cklwblove/vue-cli3-template/commit/01f259a))



<a name="0.1.12"></a>
## [0.1.12](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.11...v0.1.12) (2019-01-17)



<a name="0.1.11"></a>
## [0.1.11](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.10...v0.1.11) (2019-01-08)



<a name="0.1.10"></a>
## [0.1.10](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.9...v0.1.10) (2019-01-08)



<a name="0.1.9"></a>
## [0.1.9](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.8...v0.1.9) (2019-01-08)



<a name="0.1.8"></a>
## [0.1.8](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.7...v0.1.8) (2019-01-04)



<a name="0.1.7"></a>
## [0.1.7](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.6...v0.1.7) (2019-01-04)



<a name="0.1.6"></a>
## [0.1.6](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.5...v0.1.6) (2019-01-04)



<a name="0.1.5"></a>
## [0.1.5](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.4...v0.1.5) (2019-01-02)


### Features

* vue-cli-service build 回调处理，可以配合一些自动构建的job退出，如jenkins等 ([b6bf223](https://github.com/cklwblove/vue-cli3-template/commit/b6bf223))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.3...v0.1.4) (2019-01-02)


### Features

* 添加环境变量文件，增加webpack相关插件，vue.config.js更新，添加新特性 ([a561fb2](https://github.com/cklwblove/vue-cli3-template/commit/a561fb2))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.2...v0.1.3) (2018-12-13)


### Features

* 添加网页适配IPhoneX的处理 ([7b98447](https://github.com/cklwblove/vue-cli3-template/commit/7b98447))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/cklwblove/vue-cli3-template/compare/v0.1.1...v0.1.2) (2018-11-21)



