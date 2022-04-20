const editViewHeaderTitle = {
  name: 'editViewHeaderTitle',
  source: `/node_modules/@strapi/admin/admin/src/content-manager/pages/EditView/Header/index.js`,
  find: /* javascript */`title = initialData[currentContentTypeMainField] || currentContentTypeName;`,
  replace: /* javascript */`const parseLocale = () => {
    const rawValue = initialData[currentContentTypeMainField];
    if (rawValue) {
      const attribute = layout.attributes[currentContentTypeMainField];
      const hasLocales = get(attribute, 'pluginOptions.mktlng.locales', false);
      // console.log('hasLocales', hasLocales);
      if (hasLocales) {
        try{
          const json = JSON.parse(rawValue);
          const keys = Object.keys(json);
          // console.log('keys', keys, 'json', json);
          if (keys.length > 0) {
            return json[keys[0]];
          }
        } catch(error) {
          console.log('error', error);
          return rawValue;
        }
      }
      return rawValue;
    }
    return currentContentTypeName;
  };
  title = parseLocale();
  // console.log(currentContentTypeMainField, title, initialData, layout);`,
};

module.exports = editViewHeaderTitle;
