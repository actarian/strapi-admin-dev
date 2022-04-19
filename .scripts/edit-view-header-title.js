const fs = require('fs');

const ORIGINAL = `title = initialData[currentContentTypeMainField] || currentContentTypeName;`;
const REPLACEMENT = `title = initialData[currentContentTypeMainField] || currentContentTypeName;`;

function editViewHeaderTitle() {
  const fileToModify = `${process.cwd()}/node_modules/@strapi/admin/admin/src/content-manager/pages/EditView/Header/index.js`;
  if (fs.existsSync(fileToModify)) {
    const sourceContent = fs.readFileSync(fileToModify, 'utf-8');
    if (sourceContent.indexOf(REPLACEMENT) !== -1) {
      console.log('already patched');
    } else if (sourceContent.indexOf(ORIGINAL) !== -1) {
      const newContent = sourceContent.replace(ORIGINAL, REPLACEMENT);
      fs.writeFileSync(fileToModify, newContent, { encoding: 'utf-8' });
    } else {
      throw Error('Unable to enable editViewHeaderTitle because original code base has changed.');
    }
  }
}

module.exports = enableCustomFieldRenderer;
