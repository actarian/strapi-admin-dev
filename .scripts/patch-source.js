// const { trim } = require('lodash');
const fs = require('fs');

function patchSource(item, enable) {
  const source = `${process.cwd()}${item.source}`;
  if (fs.existsSync(source)) {
    const content = fs.readFileSync(source, 'utf-8');
    const FROM = enable ? item.find : item.replace;
    const TO = enable ? item.replace : item.find;
    if (content.indexOf(TO) !== -1) {
      console.log(`PATCH > ${item.name} already ${enable ? 'enabled' : 'disabled'} - ${source}`);

    } else if (content.indexOf(FROM) !== -1) {
      const patchedContent = content.replace(FROM, TO);
      fs.writeFileSync(source, patchedContent, { encoding: 'utf-8' });
      console.log(`PATCH > ${item.name} successfully ${enable ? 'enabled' : 'disabled'} - ${source}`);

    } else {
      throw Error(`ERROR > unable to patch ${item.name}`);
    }
  }
}

module.exports = patchSource;
