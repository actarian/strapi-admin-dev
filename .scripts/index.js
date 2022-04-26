const patchSource = require('./patch-source');
const contentManagerConfigurationAttributes = require('./content-manager-configuration-attributes');
const contentManagerDisplayableAttributes = require('./content-manager-displayable-attributes');
const contentTypeBuilderDataManagerProvider = require('./content-type-builder-data-manager-provider');
const contentTypeBuilderFormApi = require('./content-type-builder-form-api');
const contentTypeBuilderListRow = require('./content-type-builder-list-row');
const customFieldRenderer = require('./custom-field-renderer');
const editViewHeaderTitle = require('./edit-view-header-title');
const strapiAppConfigurationsThemes = require('./strapi-app-configurations-themes');

const flags = {
  contentManagerConfigurationAttributes: true,
  contentManagerDisplayableAttributes: true,
  contentTypeBuilderDataManagerProvider: true,
  contentTypeBuilderFormApi: true,
  contentTypeBuilderListRow: false,
  customFieldRenderer: true,
  editViewHeaderTitle: true,
  strapiAppConfigurationsThemes: true,
};

patchSource(contentManagerConfigurationAttributes, flags.contentManagerConfigurationAttributes);
patchSource(contentManagerDisplayableAttributes, flags.contentManagerDisplayableAttributes);
patchSource(contentTypeBuilderDataManagerProvider, flags.contentTypeBuilderDataManagerProvider);
patchSource(contentTypeBuilderFormApi, flags.contentTypeBuilderFormApi);
patchSource(contentTypeBuilderListRow, flags.contentTypeBuilderListRow);
patchSource(customFieldRenderer, flags.customFieldRenderer);
patchSource(editViewHeaderTitle, flags.editViewHeaderTitle);
patchSource(strapiAppConfigurationsThemes, flags.strapiAppConfigurationsThemes);
