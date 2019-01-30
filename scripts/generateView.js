'use strict';

const fs = require('fs');
const {
  log,
  errorLog,
  resolve,
  dotExistDirectoryCreate,
  successLog,
  generateFile,
  toCamelCase
} = require('./utils');
const {viewTemplate, styleTemplate} = require('./template');

log('请输入要生成的页面名称、会生成在 views/目录下');
let componentName = '';

process.stdin.on('data', async (chunk) => {
  const inputName = toCamelCase(String(chunk).trim().toString());

  // vue 页面目录路径
  const viewDirectory = resolve('../src/views', inputName);

  // vue 页面路径
  const viewName = resolve(viewDirectory, 'index.vue');

  const hasViewDirectory = fs.existsSync(viewDirectory);
  if (hasViewDirectory) {
    errorLog(`${inputName}组件目录已存在，请重新输入`);
    return;
  } else {
    log(`正在生成 view 目录 ${viewDirectory}`);
    await dotExistDirectoryCreate(viewDirectory);
    // fs.mkdirSync(componentDirectory);
  }

  try {
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log(`正在生成 view 文件 ${viewName}`);
    await generateFile(viewName, viewTemplate(componentName));
    log(`正在生成 style 文件 ${viewDirectory}/style.less`);
    await generateFile(`${viewDirectory}/style.less`, styleTemplate(componentName));
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
