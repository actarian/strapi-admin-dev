const contentTypeBuilderDataManagerProvider2 = {
  name: 'content-type-builder-data-manager-provider-2',
  source: `/node_modules/@strapi/plugin-content-type-builder/admin/src/components/DataManagerProvider/index.js`,
  find: /* javascript */`await request(requestURL, { method, body }, true);`,
  replace: /* javascript */`console.log(requestURL, method, body);
    await request(requestURL, { method, body }, true) /* patched */;
  `,
};

module.exports = contentTypeBuilderDataManagerProvider2;
