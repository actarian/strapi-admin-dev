const strapiAppConfigurationsThemes = {
  name: 'strapiAppConfigurationsThemes',
  source: `/node_modules/@strapi/admin/admin/src/StrapiApp.js`,
  find: /* javascript */`merge(this.configurations.themes.light, this.customConfigurations.theme);`,
  replace: /* javascript */`merge(this.configurations.themes.light, this.customConfigurations.theme.light);
  merge(this.configurations.themes.dark, this.customConfigurations.theme.dark);`,
};

module.exports = strapiAppConfigurationsThemes;
