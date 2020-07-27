'use strict';

const path = require('path');
const { formatDate } = require('@liwb/cloud-utils');
const pkg = require('./package');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const Carefree = require('@liwb/carefree-webpack-plugin');
const {
  host,
  port,
  source,
  username,
  password,
  target,
} = require('./carefree');
const VueRouterInvokeWebpackPlugin = require('@liwb/vue-router-invoke-webpack-plugin');
const SizePlugin = require('size-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const routesConfig = require('./router-config');

const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

const isCarefree = () => {
  return process.env.NODE_ENV === 'carefree';
};

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/less/variable.less'),
        path.resolve(__dirname, 'node_modules/magicless/magicless.less'),
      ],
      injector: 'prepend',
    });
}

// cdn
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: [],
    js: [
      'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.6/vue-router.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.1/vuex.min.js',
    ],
  },
};

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'axios',
};

const genPlugins = () => {
  const plugins = [
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
    }),
    new VueRouterInvokeWebpackPlugin({
      dir: 'src/views',
      // must set the alias for the dir option which you have set
      alias: '@/views',
      mode: 'hash',
      routerDir: 'src/router',
      ignore: ['images', 'components'],
      redirect: [
        {
          redirect: '/hello',
          path: '/',
        },
      ],
    }),
    // 为静态资源文件添加 hash，防止缓存
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/config.local.js'),
        hash: true,
      },
      {
        filepath: path.resolve(__dirname, './public/console.js'),
        hash: true,
      },
    ]),
    // bannerPlugin
    new webpack.BannerPlugin({
      banner: `Current version ${pkg.version} and build time ${formatDate(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      )}`,
    }),
    new DuplicatePackageCheckerPlugin(),
  ];

  if (isProd()) {
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
        cache: true,
      }),
      // 在每次执行打包命令后打印出本次构建的资源体积并和上次构建结果进行对比
      new SizePlugin(),
      // 预加载
      new PrerenderSPAPlugin({
        staticDir: resolve('dist'),
        routes: Object.keys(routesConfig),
        postProcess(ctx) {
          ctx.route = ctx.originalRoute;
          ctx.html = ctx.html.split(/>[\s]+</gim).join('><');
          ctx.html = ctx.html.replace(
            /<title>(.*?)<\/title>/gi,
            `<title>${
              routesConfig[ctx.route].title
            }</title><meta name="keywords" content="${
              routesConfig[ctx.route].keywords
            }" /><meta name="description" content="${
              routesConfig[ctx.route].description
            }" />`
          );
          if (ctx.route.endsWith('.html')) {
            ctx.outputPath = path.join(__dirname, 'dist', ctx.route);
          }
          return ctx;
        },
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true,
        },
        renderer: new Renderer({
          // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
          inject: {
            foo: 'bar',
          },
          headless: false,
          // 视图组件是在API请求获取所有必要数据后呈现的，因此我们在dom中存在“data view”属性后创建页面快照
          renderAfterDocumentEvent: 'render-event',
        }),
      })
    );
  }

  if (isCarefree()) {
    plugins.push(
      new Carefree({
        qrcodeUrl: `http://www.example.com/${pkg.name}/index.html`,
        devtool: 'true',
        ssh: {
          host,
          port,
          source,
          username,
          password,
          target: `${target}${pkg.name}`,
        },
      })
    );
  }

  return plugins;
};

// const getOptimization = () => {
//   let optimization = {};
//   if (isProd()) {
//     optimization = {
//       // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
//       minimizer: [
//         new TerserPlugin({
//           terserOptions: {
//             // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
//             compress: {
//               warnings: false,
//               drop_console: true,
//               drop_debugger: true,
//               pure_funcs: ['console.log'],
//             },
//           },
//         }),
//       ],
//     };
//   }
//   return optimization;
// };

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   */
  publicPath: './',

  assetsDir: isCarefree() ? './' : 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,

  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin', // 是否打开浏览器
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false, // 热更新
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true,
    },
    // 代理配置
    // 假设mock接口为https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets/1
    // proxy: {
    //   '/api': {
    //     target:
    //       'https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets', // 目标代理接口地址
    //     secure: false,
    //     changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
    //     // ws: true, // 是否启用 websocket
    //     pathRewrite: {
    //       '^/api': '/',
    //     },
    //   },
    // },
  },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {},
  },

  configureWebpack: () => ({
    name: `${pkg.name}`,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@less': resolve('src/assets/less'),
        '@js': resolve('src/assets/js'),
        '@components': resolve('src/components'),
        '@mixins': resolve('src/mixins'),
        '@filters': resolve('src/filters'),
        '@store': resolve('src/store'),
        '@views': resolve('src/views'),

        // 文件别名
        services: resolve('src/services'),
        variable: resolve('src/assets/less/variable.less'),
        utils: resolve('node_modules/@liwb/cloud-utils/dist/cloud-utils.esm'),
        mixins: resolve('node_modules/magicless/magicless.less'),
      },
    },
    plugins: genPlugins(),
    externals: isProd() ? externals : {},
    // 生产环境去掉 console.log
    // https://github.com/cklwblove/vue-cli3-template/issues/12
    // optimization: getOptimization()
  }),

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test
    // module

    // style-resources-loader
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );

    // svg
    // exclude icons
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('url-loader')
      .loader('url-loader')
      .end();

    config.when(process.env.NODE_ENV === 'development', (config) =>
      config.devtool('cheap-eval-source-map')
    );

    // webpack-html-plugin
    config.plugin('html').tap((args) => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      };
      // 添加CDN参数到htmlWebpackPlugin配置中
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build;
      }

      return args;
    });

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // optimization
    // https://imweb.io/topic/5b66dd601402769b60847149
    config.when(process.env.NODE_ENV === 'production', (config) => {
      // vue-cli4
      // https://cli.vuejs.org/migrating-from-v3/#vue-cli-service
      // config.optimization.minimizer('terser').tap((args) => {
      //   args[0].terserOptions.compress.drop_console = true;
      //   return args;
      // });
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();

      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // 只打包初始时依赖的第三方
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可自定义拓展你的规则
            minChunks: 3, // 最小公用次数
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk('single');
    });
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },
};
