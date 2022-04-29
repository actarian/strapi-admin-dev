const contentManagerDisplayableAttributes = {
  name: 'content-manager-displayable-attributes',
  source: `/node_modules/@strapi/admin/admin/src/content-manager/utils/checkIfAttributeIsDisplayable.js`,
  find: /* javascript */`return !['json', 'dynamiczone', 'richtext', 'password'].includes(type) && !!type;`,
  replace: /* javascript */`return !['dynamiczone', 'richtext', 'password'].includes(type) && !!type;`,
};

module.exports = contentManagerDisplayableAttributes;
