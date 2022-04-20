// const { trim } = require('lodash');
const fs = require('fs');

const SOURCE = `/node_modules/@strapi/admin/admin/src/content-manager/components/Inputs/index.js`;
const FIND = `type={inputType}`;
const REPLACE = `type={(fieldSchema.customFieldConfig || {}).fieldRenderer || inputType}`;

function customFieldRenderer(enable) {
  const fileToModify = `${process.cwd()}${SOURCE}`;
  if (fs.existsSync(fileToModify)) {
    const sourceContent = fs.readFileSync(fileToModify, 'utf-8');
    const FROM = enable ? FIND : REPLACE;
    const TO = enable ? REPLACE : FIND;
    if (sourceContent.indexOf(TO) !== -1) {
      console.log('already patched');
    } else if (sourceContent.indexOf(FROM) !== -1) {
      const newContent = sourceContent.replace(FROM, TO);
      fs.writeFileSync(fileToModify, newContent, { encoding: 'utf-8' });
    } else {
      throw Error('Unable to patch because original code base has change.');
    }
  }
}

module.exports = customFieldRenderer;
