const strapiAppConfigurationsThemes = {
  name: 'strapi-app-configurations-themes',
  source: `/node_modules/@strapi/admin/admin/src/StrapiApp.js`,
  find: /* javascript */`if (this.customConfigurations?.theme) {
      merge(this.configurations.themes.light, this.customConfigurations.theme.light);
    }`,
  replace: /* javascript */`if (this.customConfigurations?.theme) {
    if (this.customConfigurations?.theme?.light && this.customConfigurations?.theme?.dark) {
      merge(this.configurations.themes.light, this.customConfigurations.theme.light);
      merge(this.configurations.themes.dark, this.customConfigurations.theme.dark);
    } else {
      merge(this.configurations.themes.light, this.customConfigurations.theme);
    }
  }`,
};

module.exports = strapiAppConfigurationsThemes;
