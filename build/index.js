'use strict';

const { run } = require('runjs')
const chalk = require('chalk')
const rawArgv = process.argv.slice(2)
const args = rawArgv.join(' ')

// 便于捕捉 build 之后的错误，然后进行自定义处理
// 配合 jenkins 执行 job
run(`vue-cli-service build ${args}`, {
  async: true,
  stdio: 'inherit'
}).then((output) => {
  // console.log(chalk.cyan(output));
}).catch((err) => {
  console.error('\n');
  console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'))
  console.error(chalk.magenta('具体错误信息如下 \n'))
  console.error(chalk.red(`${err}.\n`))
  console.log(chalk.red('  Build failed with errors.\n'))
  process.exit(1)
})