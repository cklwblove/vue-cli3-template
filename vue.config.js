const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
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

  return plugins;
}

module.exports = {
  baseUrl: './',
  configureWebpack: () => ({
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
        'utils': resolve('node_modules/cloud-utils/dist/cloud-utils.esm'),
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

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin, [{
          analyzerPort: 8888,
          generateStatsFile: false
        }])
    }

    // `npm run build --generate_report`
    if (process.env.npm_config_generate_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static',
          reportFilename: 'bundle-report.html',
          openAnalyzer: false
        }])
    }

  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false
  }
};
