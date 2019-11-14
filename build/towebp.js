/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-03-12 10:47
 * @description 转换 webp 格式文件
 */

'use strict';

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const chalk = require('chalk');

const fileSrc = './src/assets/img/*.{jpeg,jpg,png,JPEG,JPG,PNG}';
const fileOut = 'src/assets/img/webp';

imagemin([fileSrc], fileOut, {
  use: [imageminWebp({ autoFilter: true, overrideExtension: false })],
}).then((ret) => {
  console.log(chalk.green(`webp转换已完成～`));
});
