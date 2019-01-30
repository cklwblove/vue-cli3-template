/**
 *
 * @authors liwb (lwbhtml@163.com)
 * @date    2019-01-29 16:58
 * @description
 */
'use strict';

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

exports.resolve = (...file) => path.resolve(__dirname, ...file);
exports.log = (message) => console.log(chalk.green(`${message}`));
exports.successLog = (message) => console.log(chalk.blue(`${message}`));
exports.errorLog = (error) => console.log(chalk.red(`${error}`));

// 递归创建目录
exports.mkdirs = function (directory, callback) {
  var exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    exports.mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory);
      callback();
    });
  }
};

exports.dotExistDirectoryCreate = function (directory) {
  return new Promise((resolve) => {
    exports.mkdirs(directory, function () {
      resolve(true);
    });
  });
};

exports.generateFile = function(path, data) {
  if (fs.existsSync(path)) {
    exports.errorLog(`${path}文件已存在`);
    return;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (err) => {
      if (err) {
        exports.errorLog(err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// 大写每个单词的首字母
exports.capitalizeEveryWord = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase());

// 转换驼峰字符串
exports.fromCamelCase = (str, separator = '-') =>
  str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();

// 转换为驼峰格式
exports.toCamelCase = (str) => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
