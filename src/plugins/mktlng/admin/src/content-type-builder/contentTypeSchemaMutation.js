import { get } from 'lodash';
import { LOCALIZED_FIELDS } from '../utils/localizedFields';

export function contentTypeSchemaMutation(next, prev) {
  console.log('contentTypeSchemaMutation', next);

  // # attributes custom fields
  const attributes = Object.keys(next.attributes).reduce((p, key) => {
    let attribute = next.attributes[key];
    if (LOCALIZED_FIELDS.includes(attribute.type)) {
      attribute = { ...attribute };
      // console.log('contentTypeSchemaMutation.attribute', attribute);
      const useLocales = get(attribute, ['pluginOptions', 'mktlng', 'locales'], false);
      if (useLocales) {
        attribute.customField = {
          type: 'localizedText',
          forType: attribute.customField ? attribute.customField.forType : attribute.type,
        };
        // !!! leaving original type
        // attribute.type = 'text';
      } else if (attribute.customField) {
        // !!! leaving original type
        // attribute.type = attribute.customField.forType;
        delete attribute.customField;
      } else {
        delete attribute.customField;
      }
      // console.log('contentTypeSchemaMutation.attribute', attribute);
    }
    p[key] = attribute;
    return p;
  }, {});

  // # markets
  delete attributes.markets;
  const useMarkets = get(next, ['pluginOptions', 'mktlng', 'markets'], false);
  if (useMarkets) {
    attributes.markets = {
      type: 'json',
      configurable: true, // !!! configurable false cause problems
      customField: {
        type: 'marketSelector',
        forType: 'text',
      },
    };
  }
  // console.log('contentTypeSchemaMutation', next.displayName, 'useMarkets', useMarkets, attributes.markets);

  const schema = { ...next, attributes };
  console.log('contentTypeSchemaMutation', schema);
  return schema;
};
