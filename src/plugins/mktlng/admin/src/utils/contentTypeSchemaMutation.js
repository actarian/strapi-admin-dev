import { get } from 'lodash';
import LOCALIZED_FIELDS from './localizedFields';

const contentTypeSchemaMutation = (next, prev) => {
  console.log('contentTypeSchemaMutation', next);

  const useMarkets = get(next, ['pluginOptions', 'mktlng', 'markets'], false);
  if (useMarkets) {
    console.log('contentTypeSchemaMutation', next.displayName, 'useMarkets', useMarkets);
  }

  const attributes = Object.keys(next.attributes).reduce((p, key) => {
    let attribute = next.attributes[key];
    if (LOCALIZED_FIELDS.includes(attribute.type)) {
      attribute = { ...attribute };
      console.log('contentTypeSchemaMutation.attribute', attribute);
      const useLocales = get(attribute, ['pluginOptions', 'mktlng', 'locales'], false);
      if (useLocales) {
        attribute.customFieldConfig = {
          fieldRenderer: 'customFieldRenderer',
        };
      } else {
        attribute.customFieldConfig = {};
      }
      console.log('contentTypeSchemaMutation.attribute', attribute);
    }
    p[key] = attribute;
    return p;
  }, {});

  return { ...next, attributes };
};

export default contentTypeSchemaMutation;

