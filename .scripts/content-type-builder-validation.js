
const contentTypeBuilderValidation = {
  name: 'content-type-builder-validation',
  source: `/node_modules/@strapi/plugin-content-type-builder/server/controllers/validation/types.js`,
  find: /* javascript */`Object.keys(attributes).filter(key =>
              VALID_UID_TARGETS.includes(_.get(attributes[key], 'type'))
            )`,
  replace: /* javascript */`Object.keys(attributes).filter(key =>
    VALID_UID_TARGETS.includes(_.get(attributes[key], 'type')) ||
    (attributes[key].pluginOptions && attributes[key].pluginOptions.mktlng && attributes[key].pluginOptions.mktlng.locales)
  )`,
};

module.exports = contentTypeBuilderValidation;
