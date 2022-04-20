
const contentTypeBuilderListRow = {
  name: 'contentTypeBuilderListRow',
  source: `/node_modules/@strapi/plugin-content-type-builder/admin/src/components/ListRow/index.js`,
  find: /* javascript */`const ico = ['integer', 'biginteger', 'float', 'decimal'].includes(type) ? 'number' : type;`,
  replace: /* javascript */`const ico = ['integer', 'biginteger', 'float', 'decimal'].includes(type) ? 'number' : type;
  console.log('ListRow',
  'editTarget', editTarget,
  'targetUid', secondLoopComponentUid || firstLoopComponentUid || targetUid,
  'name', name,
  'type', type,
  'contentTypes', contentTypes,
  'configurable', configurable,
  'target', target);
  `,
};

module.exports = contentTypeBuilderListRow;
