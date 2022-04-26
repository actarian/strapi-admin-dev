import { attributeSchemaMutation } from './attributeSchemaMutation';

export function contentTypeSchemaMutation(next, prev) {
  // console.log('contentTypeSchemaMutation', next);
  const attributes = attributeSchemaMutation(next.attributes);
  // # markets
  delete attributes.markets;
  const markets = next.pluginOptions && next.pluginOptions.mktlng && next.pluginOptions.mktlng.markets;
  if (markets) {
    attributes.markets = {
      type: 'json',
      configurable: true, // !!! configurable false cause problems
      customField: {
        type: 'marketSelector',
        forType: 'text',
      },
    };
  }
  const schema = { ...next, attributes };
  // console.log('contentTypeSchemaMutation', schema);
  return schema;
};
