import { attributeSchemaMutation } from './attributeSchemaMutation';

export function componentSchemaMutation(next, prev) {
  const attributes = attributeSchemaMutation(next.attributes);
  // console.log('componentSchemaMutation', attributes, next);
  const schema = { ...next, attributes };
  // console.log('componentSchemaMutation', schema);
  // return next;
  return schema;
};
