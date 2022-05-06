
const contentTypeBuilderBaseForm = {
  name: 'content-type-builder-base-form',
  source: `/node_modules/@strapi/plugin-content-type-builder/admin/src/components/FormModal/attributes/baseForm.js`,
  find: /* javascript */`.filter(({ type }) => ['string', 'text'].includes(type))`,
  replace: /* javascript */`.filter((attribute) => ['string', 'text'].includes(attribute.type) || (attribute.pluginOptions && attribute.pluginOptions.mktlng && attribute.pluginOptions.mktlng.locales))`,
};

module.exports = contentTypeBuilderBaseForm;
