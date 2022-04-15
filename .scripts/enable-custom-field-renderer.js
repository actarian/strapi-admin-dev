// const { trim } = require('lodash');
const fs = require('fs');

const ORIGINAL_ = `<GenericInput
      attribute={fieldSchema}
      autoComplete="new-password"
      intlLabel={{ id: label, defaultMessage: label }}
      // in case the default value of the boolean is null, attribute.default doesn't exist
      isNullable={inputType === 'bool' && [null, undefined].includes(fieldSchema.default)}
      description={description ? { id: description, defaultMessage: description } : null}
      disabled={shouldDisableField}
      error={error}
      labelAction={labelAction}
      contentTypeUID={currentContentTypeLayout.uid}
      customInputs={{
        json: InputJSON,
        uid: InputUID,
        media: fields.media,
        wysiwyg: Wysiwyg,
        ...fields,
      }}
      multiple={fieldSchema.multiple || false}
      name={keys}
      onChange={onChange}
      options={options}
      placeholder={placeholder ? { id: placeholder, defaultMessage: placeholder } : null}
      required={fieldSchema.required || false}
      step={step}
      type={inputType}
      // validations={validations}
      value={inputValue}
      withDefaultValue={false}
    />`;

const REPLACEMENT_ = `
    <GenericInput
      attribute={fieldSchema}
      autoComplete="new-password"
      intlLabel={{ id: label, defaultMessage: label }}
      description={description ? { id: description, defaultMessage: description } : null}
      disabled={shouldDisableField}
      error={errorId}
      labelAction={labelAction}
      contentTypeUID={currentContentTypeLayout.uid}
      customInputs={{
        json: InputJSON,
        uid: InputUID,
        media: fields.media,
        wysiwyg: Wysiwyg,
        ...fields,
      }}
      multiple={fieldSchema.multiple || false}
      name={keys}
      onChange={onChange}
      options={options}
      placeholder={placeholder ? { id: placeholder, defaultMessage: placeholder } : null}
      required={fieldSchema.required || false}
      step={step}
      /** HACKYCODE for custom field render by sinh nguyen */
      type={(fieldSchema.customFieldConfig || {}).fieldRenderer || inputType}
      /** HACKYCODE for custom field render by sinh nguyen */
      // validations={validations}
      value={inputValue}
      withDefaultValue={false}
    />`;

const ORIGINAL = `type={inputType}`;
const REPLACEMENT = `type={(fieldSchema.customFieldConfig || {}).fieldRenderer || inputType}`;

function enableCustomFieldRenderer() {
  const fileToModify = `${process.cwd()}/node_modules/@strapi/admin/admin/src/content-manager/components/Inputs/index.js`;
  if (fs.existsSync(fileToModify)) {
    const sourceContent = fs.readFileSync(fileToModify, 'utf-8');
    // console.log('sourceContent', sourceContent);
    if (sourceContent.indexOf(REPLACEMENT) !== -1) {
      console.log('already patched');
    } else if (sourceContent.indexOf(ORIGINAL) !== -1) {
      const newContent = sourceContent.replace(ORIGINAL, REPLACEMENT);
      fs.writeFileSync(fileToModify, newContent, { encoding: 'utf-8' });
    } else {
      throw Error('Unable to enable custom-field-renderer because original code base has change.');
    }
    /*
    const firstIndex = sourceContent.indexOf('<GenericInput');
    if (firstIndex !== -1) {
      const lastIndex = sourceContent.indexOf('/>', firstIndex + 1);
      if (lastIndex > 0) {
        const strToReplace = sourceContent.substring(firstIndex, lastIndex + 2);
        const newContent = sourceContent.replace(
          strToReplace,
          trim(REPLACEMENT, '\n').trim(),
        );
        fs.writeFileSync(fileToModify, newContent, { encoding: 'utf-8' });
      }
    } else {
      throw Error('Unable to enable custom-field-renderer because original code base has change.');
    }
    */
  }
}

module.exports = enableCustomFieldRenderer;
