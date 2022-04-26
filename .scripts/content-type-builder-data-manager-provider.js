const contentTypeBuilderDataManagerProvider = {
  name: 'contentTypeBuilderDataManagerProvider',
  source: `/node_modules/@strapi/plugin-content-type-builder/admin/src/components/DataManagerProvider/index.js`,
  find: /* javascript */`body.component = formatMainDataType(modifiedData.component, true);`,
  replace: /* javascript */`body.component = apis.forms.mutateComponentSchema(
    formatMainDataType(modifiedData.component, true),
    initialData.component
  );`,
};

module.exports = contentTypeBuilderDataManagerProvider;
