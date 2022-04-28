// const { trim } = require('lodash');
const fs = require('fs');
const chalk = require('chalk');

function getSourceLink(filepath, text, fragment) {
  if (filepath) {
    if (text && fragment) {
      const rx = new RegExp(`\n`, 'gm');
      const searchText = text.substr(0, text.indexOf(fragment));
      // console.log(filepath, fragment);
      const lineNumber = searchText.match(rx).length + 1;
      return `${chalk.green(filepath)}:${lineNumber}`;
    } else {
      return `${chalk.green(filepath)}`;
    }
  } else {
    return '';
  }
}

function customLog(type, name, message, filepath, text, fragment) {
  if (type === 'ERROR') {
    console.log(`${chalk.red(type)} ${name} ${chalk.cyan(message)} ${getSourceLink(filepath, text, fragment)}`);
  } else if (type === 'PATCH') {
    console.log(`${chalk.cyan(type)} ${name} ${chalk.cyan(message)} ${getSourceLink(filepath, text, fragment)}`);
  }
}

function patchSource(item, enable) {
  const source = `${process.cwd()}${item.source}`;
  if (fs.existsSync(source)) {
    const content = fs.readFileSync(source, 'utf-8');
    const FROM = enable ? item.find : item.replace;
    const TO = enable ? item.replace : item.find;
    if (content.indexOf(FROM) !== -1 && (FROM.indexOf(TO) !== -1 || TO.indexOf(FROM) !== -1)) {
      return customLog('ERROR', item.name, `invalid patch`, source, content, FROM);
      // return console.log(`${chalk.red(`ERROR > invalid patch ${item.name}`)} ${getSourceLink(source, content, FROM)}`);
    }
    if (content.indexOf(TO) !== -1) {
      return customLog('PATCH', item.name, `already ${enable ? 'enabled' : 'disabled'}`, source, content, TO);
      // return console.log(`${chalk.cyan(`PATCH > ${item.name} already ${enable ? 'enabled' : 'disabled'}`)} ${getSourceLink(source, content, TO)}`);
    } else if (content.indexOf(FROM) !== -1) {
      const patchedContent = content.replace(FROM, TO);
      fs.writeFileSync(source, patchedContent, { encoding: 'utf-8' });
      return customLog('PATCH', item.name, `successfully ${enable ? 'enabled' : 'disabled'}`, source);
      // return console.log(`${chalk.green(`PATCH > ${item.name} successfully ${enable ? 'enabled' : 'disabled'}`)} ${getSourceLink(source, patchedContent, TO)}`);
    } else {
      return customLog('ERROR', item.name, `unable to patch`, source, patchedContent, TO);
      // return console.log(`${chalk.red(`ERROR > unable to patch ${item.name}`)} ${chalk.green(source)}`);
    }
  }
}

module.exports = patchSource;
