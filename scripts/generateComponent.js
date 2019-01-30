'use strict';

const fs = require('fs');
const {
  log,
  errorLog,
  resolve,
  dotExistDirectoryCreate,
  successLog,
  generateFile,
  capitalizeEveryWord
} = require('./utils');
const {componentTemplate} = require('./template');

log('请输入要生成的组件名称、如需生成全局组件，请加 global/ 前缀');

let componentName = '';
process.stdin.on('data', async (chunk) => {
  const inputName = capitalizeEveryWord(String(chunk).trim().toString());

  // 组件目录路径
  const componentDirectory = resolve('../src/components', inputName);

  // vue组件路径
  const componentVueName = resolve(componentDirectory, 'index.vue');

  const hasComponentDirectory = fs.existsSync(componentDirectory);
  if (hasComponentDirectory) {
    errorLog(`${inputName}组件目录已存在，请重新输入`);
    return;
  } else {
    log(`正在生成 component 目录 ${componentDirectory}`);
    await dotExistDirectoryCreate(componentDirectory);
    // fs.mkdirSync(componentDirectory);
  }
  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log(`正在生成 vue 文件 ${componentVueName}`);
    await generateFile(componentVueName, componentTemplate(componentName));
    successLog('生成成功');
  } catch (e) {
    errorLog(e.message);
  }

  process.stdin.emit('end');
});
process.stdin.on('end', () => {
  log('exit');
  process.exit();
});
