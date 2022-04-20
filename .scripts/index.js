const customFieldRenderer = require('./custom-field-renderer');

const flags = {
  ENABLE_CUSTOM_FIELD_RENDER: true,
}

/**
 * Enable custom field renderer
 */
if (flags.ENABLE_CUSTOM_FIELD_RENDER) {
  console.log('custom-field-renderer: ENABLED');
  customFieldRenderer();
} else {
  console.log('custom-field-renderer: DISABLED');
}
