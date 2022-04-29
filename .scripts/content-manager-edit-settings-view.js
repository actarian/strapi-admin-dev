const contentManagerEditSettingsView = {
  name: 'content-manager-edit-settings-view',
  source: `/node_modules/@strapi/admin/admin/src/content-manager/pages/EditSettingsView/index.js`,
  find: /* javascript */`const entryTitleOptions = Object.keys(attributes).filter(attr => {
    const type = get(attributes, [attr, 'type'], '');

    return (
      ![
        'dynamiczone',
        'json',
        'text',
        'relation',
        'component',
        'boolean',
        'date',
        'media',
        'richtext',
        'timestamp',
      ].includes(type) && !!type
    );
  });`,
  replace: /* javascript */`const entryTitleOptions = Object.keys(attributes).filter(attr => {
    const type = get(attributes, [attr, 'type'], '');

    return (
      ![
        'dynamiczone',
        // 'json',
        'text',
        'relation',
        'component',
        'boolean',
        'date',
        'media',
        'richtext',
        'timestamp',
      ].includes(type) && !!type
    );
  });`,
};

module.exports = contentManagerEditSettingsView;

