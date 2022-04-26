// const { trim } = require('lodash');
const fs = require('fs');
const chalk = require('chalk');

function patchSource(item, enable) {
  const source = `${process.cwd()}${item.source}`;
  if (fs.existsSync(source)) {
    const content = fs.readFileSync(source, 'utf-8');
    const FROM = enable ? item.find : item.replace;
    const TO = enable ? item.replace : item.find;
    if (FROM.indexOf(TO) !== -1 || TO.indexOf(FROM) !== -1) {
      return console.log(`${chalk.red(`ERROR > invalid patch ${item.name}`)} ${chalk.green(source)}`);
    }
    if (content.indexOf(TO) !== -1) {
      console.log(`${chalk.cyan(`PATCH > ${item.name} already ${enable ? 'enabled' : 'disabled'}`)} ${chalk.green(source)}`);
    } else if (content.indexOf(FROM) !== -1) {
      const patchedContent = content.replace(FROM, TO);
      fs.writeFileSync(source, patchedContent, { encoding: 'utf-8' });
      console.log(`${chalk.green(`PATCH > ${item.name} successfully ${enable ? 'enabled' : 'disabled'}`)} ${chalk.green(source)}`);
    } else {
      console.log(`${chalk.red(`ERROR > unable to patch ${item.name}`)} ${chalk.green(source)}`);
    }
  }
}

module.exports = patchSource;
