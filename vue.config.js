'use strict'

const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = (dir) => {
  return path.join(__dirname, './', dir)
}

const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

const genPlugins = () => {
  const plugins = [];

  if (isProd()) {
    plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$',
        ),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      })
    )
  }

  // HtmlWebpackIncludeAssetsPlugin
  // 为静态资源文件添加 hash，防止缓存
  plugins.push(
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['config.local.js'],
      append: false,
      hash: true
    })
  )

  return plugins;
}

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#baseurl
   */
  baseUrl: './',
  assetsDir: 'static',
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
      errors: true
    }
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
    modules: false
  },
  configureWebpack: () => ({
    name: 'vue-cli3-template',
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
        'services': resolve('src/services'),
        'variable': resolve('src/assets/less/variable.less'),
        'utils': resolve('node_modules/@liwb/cloud-utils/dist/cloud-utils.esm'),
        'mixins': resolve('node_modules/magicless/magicless.less')
      }
    },
    plugins: genPlugins()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // module
    // svg
    config
      .module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config
      .module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    // plugin
    // webpack-html-plugin
    config
      .plugin('html')
      .tap(args => {
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
          minifyURLs: true
        }
        return args
      })

    // optimization
    // https://imweb.io/topic/5b66dd601402769b60847149
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
          config
            .optimization
            .splitChunks({
              chunks: 'all',
              cacheGroups: {
                vendors: {
                  name: 'chunk-vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可自定义拓展你的规则
                  minChunks: 3, // 最小公用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run analyz`
    config
      .when(process.env.IS_ANALYZ,
        config => config
          .plugin('webpack-bundle-analyzer')
          .use(BundleAnalyzerPlugin, [{
            analyzerPort: 8888,
            generateStatsFile: false
          }])
      )

    // `npm run build --generate_report`
    config
      .when(process.env.npm_config_generate_report,
        config => config
          .plugin('webpack-bundle-analyzer-report')
          .use(BundleAnalyzerPlugin, [{
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false
          }])
      )
  }
};
