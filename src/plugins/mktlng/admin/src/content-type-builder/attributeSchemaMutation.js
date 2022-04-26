import { LOCALIZED_FIELDS } from '../utils/localizedFields';

export function attributeSchemaMutation(attributes) {
  // # attributes custom fields
  return Object.keys(attributes).reduce((p, key) => {
    let attribute = attributes[key];
    if (LOCALIZED_FIELDS.includes(attribute.type)) {
      attribute = { ...attribute };
      // console.log('attributeSchemaMutation.attribute', attribute);
      const locales = attribute.pluginOptions && attribute.pluginOptions.mktlng && attribute.pluginOptions.mktlng.locales;
      if (locales) {
        attribute.customField = {
          type: 'localizedText',
          forType: attribute.customField ? attribute.customField.forType : attribute.type,
        };
        // !!! leaving original type
        attribute.type = 'json';
      } else if (attribute.customField) {
        // !!! leaving original type
        attribute.type = attribute.customField.forType;
        delete attribute.customField;
      } else {
        delete attribute.customField;
      }
      // console.log('attributeSchemaMutation.attribute', attribute);
    }
    p[key] = attribute;
    return p;
  }, {});
};
