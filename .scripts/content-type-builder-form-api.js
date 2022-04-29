const contentTypeBuilderFormApi = {
  name: 'content-type-builder-form-api',
  source: `/node_modules/@strapi/plugin-content-type-builder/admin/src/utils/formApi.js`,
  find: /* javascript */`contentTypeSchemaMutations: [],
  addContentTypeSchemaMutation(cb) {
    this.contentTypeSchemaMutations.push(cb);
  },
  extendContentType({ validator, form: { advanced, base } }) {
    const { contentType } = this.types;

    contentType.validators.push(validator);
    contentType.form.advanced.push(advanced);
    contentType.form.base.push(base);
  },
  extendFields(fields, { validator, form: { advanced, base } }) {
    const formType = this.types.attribute;

    fields.forEach(field => {
      if (!formType[field]) {
        formType[field] = {
          validators: [],
          form: {
            advanced: [
              /* cb */
            ],
            base: [
              /* cb */
            ],
          },
        };

        formType[field].validators.push(validator);
        formType[field].form.advanced.push(advanced);
        formType[field].form.base.push(base);
      }
    });
  },
  getAdvancedForm(target, props = null) {
    const sectionsToAdd = get(this.types, [...target, 'form', 'advanced'], []).reduce(
      (acc, current) => {
        const sections = current(props);

        return [...acc, ...sections];
      },
      []
    );

    return sectionsToAdd;
  },

  makeValidator(target, initShape, ...args) {
    const validators = get(this.types, [...target, 'validators'], []);

    const pluginOptionsShape = validators.reduce((acc, current) => {
      const pluginOptionShape = current(args);

      return { ...acc, ...pluginOptionShape };
    }, {});

    return initShape.shape({ pluginOptions: yup.object().shape(pluginOptionsShape) });
  },
  mutateContentTypeSchema(data, initialData) {
    let enhancedData = cloneDeep(data);

    const refData = cloneDeep(initialData);

    this.contentTypeSchemaMutations.forEach(cb => {
      enhancedData = cb(enhancedData, refData);
    });

    return enhancedData;
  },`,
  replace: /* javascript */`contentTypeSchemaMutations: [],
  addContentTypeSchemaMutation(cb) {
    this.contentTypeSchemaMutations.push(cb);
  },
  componentSchemaMutations: [],
  addComponentSchemaMutation(cb) {
    this.componentSchemaMutations.push(cb);
  },
  extendContentType({ validator, form: { advanced, base } }) {
    const { contentType } = this.types;
    contentType.validators.push(validator);
    contentType.form.advanced.push(advanced);
    contentType.form.base.push(base);
  },
  extendFields(fields, { validator, form: { advanced, base } }) {
    const formType = this.types.attribute;
    fields.forEach(field => {
      if (!formType[field]) {
        formType[field] = {
          validators: [],
          form: {
            advanced: [
              /* cb */
            ],
            base: [
              /* cb */
            ],
          },
        };
        formType[field].validators.push(validator);
        formType[field].form.advanced.push(advanced);
        formType[field].form.base.push(base);
      }
    });
  },
  getAdvancedForm(target, props = null) {
    const sectionsToAdd = get(this.types, [...target, 'form', 'advanced'], []).reduce(
      (acc, current) => {
        const sections = current(props);
        return [...acc, ...sections];
      },
      []
    );
    return sectionsToAdd;
  },
  makeValidator(target, initShape, ...args) {
    const validators = get(this.types, [...target, 'validators'], []);
    const pluginOptionsShape = validators.reduce((acc, current) => {
      const pluginOptionShape = current(args);
      return { ...acc, ...pluginOptionShape };
    }, {});
    return initShape.shape({ pluginOptions: yup.object().shape(pluginOptionsShape) });
  },
  mutateContentTypeSchema(data, initialData) {
    let enhancedData = cloneDeep(data);
    const refData = cloneDeep(initialData);
    this.contentTypeSchemaMutations.forEach(cb => {
      enhancedData = cb(enhancedData, refData);
    });
    return enhancedData;
  },
  mutateComponentSchema(data, initialData) {
    let enhancedData = cloneDeep(data);
    const refData = cloneDeep(initialData);
    this.componentSchemaMutations.forEach(cb => {
      enhancedData = cb(enhancedData, refData);
    });
    return enhancedData;
  },`,
};

module.exports = contentTypeBuilderFormApi;
