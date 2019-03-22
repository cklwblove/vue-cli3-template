'use strict';

const webpack = require('webpack');
const chalk = require('chalk');
const webpackSkeletonConfig = require('../src/skeleton/webpack.skeleton.config');

webpack(webpackSkeletonConfig, function (err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    const info = stats.toJson();
    console.error('\n');
    console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'));
    console.error(chalk.magenta('具体错误信息如下 \n'));
    console.error(chalk.red(`${err}.\n`));
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'));
});
