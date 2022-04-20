const patchSource = require('./patch-source');
const customFieldRenderer = require('./custom-field-renderer');
const editViewHeaderTitle = require('./edit-view-header-title');
const contentTypeBuilderListRow = require('./content-type-builder-list-row');

const flags = {
  customFieldRenderer: true,
  editViewHeaderTitle: true,
  contentTypeBuilderListRow: true,
};

patchSource(customFieldRenderer, flags.customFieldRenderer);
patchSource(editViewHeaderTitle, flags.editViewHeaderTitle);
patchSource(contentTypeBuilderListRow, flags.contentTypeBuilderListRow);
