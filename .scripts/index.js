const patchSource = require('./patch-source');
const contentManagerAttributeFilter = require('./content-manager-attribute-filter');
const contentManagerConfigurationAttributes = require('./content-manager-configuration-attributes');
const contentManagerDisplayableAttributes = require('./content-manager-displayable-attributes');
const contentManagerEditSettingsView = require('./content-manager-edit-settings-view');
const contentTypeBuilderBaseForm = require('./content-type-builder-base-form');
const contentTypeBuilderDataManagerProvider = require('./content-type-builder-data-manager-provider');
const contentTypeBuilderDataManagerProvider2 = require('./content-type-builder-data-manager-provider-2');
const contentTypeBuilderFormApi = require('./content-type-builder-form-api');
const contentTypeBuilderListRow = require('./content-type-builder-list-row');
const contentTypeBuilderValidation = require('./content-type-builder-validation');
const customFieldRenderer = require('./custom-field-renderer');
const editViewHeaderTitle = require('./edit-view-header-title');
const helperPluginGetFilterList = require('./helper-plugin-get-filter-list');
const strapiAppConfigurationsThemes = require('./strapi-app-configurations-themes');

const flags = {
  contentManagerAttributeFilter: true,
  contentManagerConfigurationAttributes: true,
  contentManagerDisplayableAttributes: true,
  contentManagerEditSettingsView: true,
  contentTypeBuilderBaseForm: true,
  contentTypeBuilderDataManagerProvider: true,
  contentTypeBuilderDataManagerProvider2: true,
  contentTypeBuilderFormApi: true,
  contentTypeBuilderListRow: false,
  contentTypeBuilderValidation: true,
  customFieldRenderer: true,
  editViewHeaderTitle: true,
  helperPluginGetFilterList: true,
  strapiAppConfigurationsThemes: true,
};

patchSource(contentManagerAttributeFilter, flags.contentManagerAttributeFilter);
patchSource(contentManagerConfigurationAttributes, flags.contentManagerConfigurationAttributes);
patchSource(contentManagerDisplayableAttributes, flags.contentManagerDisplayableAttributes);
patchSource(contentManagerEditSettingsView, flags.contentManagerEditSettingsView);
patchSource(contentTypeBuilderBaseForm, flags.contentTypeBuilderBaseForm);
patchSource(contentTypeBuilderDataManagerProvider, flags.contentTypeBuilderDataManagerProvider);
patchSource(contentTypeBuilderDataManagerProvider2, flags.contentTypeBuilderDataManagerProvider2);
patchSource(contentTypeBuilderFormApi, flags.contentTypeBuilderFormApi);
patchSource(contentTypeBuilderListRow, flags.contentTypeBuilderListRow);
patchSource(contentTypeBuilderValidation, flags.contentTypeBuilderValidation);
patchSource(customFieldRenderer, flags.customFieldRenderer);
patchSource(editViewHeaderTitle, flags.editViewHeaderTitle);
patchSource(helperPluginGetFilterList, flags.helperPluginGetFilterList);
patchSource(strapiAppConfigurationsThemes, flags.strapiAppConfigurationsThemes);
