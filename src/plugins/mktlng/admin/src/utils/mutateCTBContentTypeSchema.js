import { get, has, omit } from 'lodash';
import LOCALIZED_FIELDS from './localizedFields';

const localizedPath = ['pluginOptions', 'mktlng', 'localized'];

const addLocalisationToFields = attributes =>
  Object.keys(attributes).reduce((p, current) => {
    const currentAttribute = attributes[current];
    if (LOCALIZED_FIELDS.includes(currentAttribute.type)) {
      const mktlng = { localized: true };
      const pluginOptions = currentAttribute.pluginOptions ? { ...currentAttribute.pluginOptions, mktlng } : { mktlng };
      p[current] = { ...currentAttribute, pluginOptions };
      return p;
    }
    console.log(currentAttribute);
    p[current] = currentAttribute;
    return p;
  }, {});

const disableAttributesLocalisation = attributes =>
  Object.keys(attributes).reduce((p, current) => {
    p[current] = omit(attributes[current], 'pluginOptions.mktlng');
    return p;
  }, {});

const mutateCTBContentTypeSchema = (nextSchema, prevSchema) => {
  console.log('mutateCTBContentTypeSchema');
  // Don't perform mutations components
  if (!has(nextSchema, localizedPath)) {
    return nextSchema;
  }
  const isNextSchemaLocalized = get(nextSchema, localizedPath, false);
  const isPrevSchemaLocalized = get(prevSchema, ['schema', ...localizedPath], false);
  // No need to perform modification on the schema, if the mktlng feature was not changed
  // at the ct level
  if (isNextSchemaLocalized && isPrevSchemaLocalized) {
    return nextSchema;
  }
  if (isNextSchemaLocalized) {
    const attributes = addLocalisationToFields(nextSchema.attributes);
    return { ...nextSchema, attributes };
  }
  // Remove the mktlng object from the pluginOptions
  if (!isNextSchemaLocalized) {
    const pluginOptions = omit(nextSchema.pluginOptions, 'mktlng');
    const attributes = disableAttributesLocalisation(nextSchema.attributes);
    return { ...nextSchema, pluginOptions, attributes };
  }
  return nextSchema;
};

export default mutateCTBContentTypeSchema;
export { addLocalisationToFields, disableAttributesLocalisation };
