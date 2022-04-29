const contentManagerAttributeFilter = {
  name: 'content-manager-attribute-filter',
  source: `/node_modules/@strapi/admin/admin/src/content-manager/components/AttributeFilter/hooks/useAllowedAttributes.js`,
  find: /* javascript */`const NOT_ALLOWED_FILTERS = ['json', 'component', 'media', 'richtext', 'dynamiczone', 'password'];`,
  replace: /* javascript */`const NOT_ALLOWED_FILTERS = [/* 'json', */ 'component', 'media', 'richtext', 'dynamiczone', 'password'];`,
};

module.exports = contentManagerAttributeFilter;
