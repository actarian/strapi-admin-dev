const customFieldRenderer = {
  name: 'custom-field-renderer',
  source: `/node_modules/@strapi/admin/admin/src/content-manager/components/Inputs/index.js`,
  find: /* javascript */`type={inputType}`,
  replace: /* javascript */`type={(fieldSchema.customField || {}).type || inputType}`,
};

module.exports = customFieldRenderer;
