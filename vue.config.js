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
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './public/config.local.js'),
      hash: true,
    }),
    // bannerPlugin
    new webpack.BannerPlugin({
      banner: 'Build time ' + formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }),
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
      new SizePlugin()
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
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true,
    },
  },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
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
    // optimization: {
    //   // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
    //         compress: {
    //           warnings: false,
    //           drop_console: true,
    //           drop_debugger: true,
    //           pure_funcs: ['console.log'],
    //         },
    //       }
    //     })
    //   ],
    // },
  }),

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // module

    // style-resources-loader
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type))
    );

    config.when(process.env.NODE_ENV === 'development', (config) =>
      config.devtool('cheap-eval-source-map')
    );

    // runtime.js 内联的形式嵌入
    config.plugin('preload').tap((args) => {
      args[0].fileBlacklist.push(/runtime\./);
      return args;
    });

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
      return args;
    });

    // optimization
    // https://imweb.io/topic/5b66dd601402769b60847149
    config.when(process.env.NODE_ENV === 'production', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ]);
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
    dll: {
      entry: {
        vendor: ['vue', 'vue-router'],
      },
    },
  },
};
