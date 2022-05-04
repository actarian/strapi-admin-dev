'use strict';

const { getService } = require('../utils');
const { DEFAULT_LOCALE } = require('../locale/locale');

// disable mktlng on CT -> Delete all entities that are not in the default locale
async function disable({ oldContentTypes, contentTypes }) {
  const { hasLocalizedContentType } = getService('contentTypes');
  const { getDefaultLocale } = getService('locales');
  if (!oldContentTypes) {
    return;
  }
  // console.log('disable mktlng', Object.keys(contentTypes));
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    // if i18N is disabled remove non default locales before sync
    if (hasLocalizedContentType(oldContentType) && !hasLocalizedContentType(contentType)) {
      const defaultLocale = (await getDefaultLocale()) || DEFAULT_LOCALE.code;
      await strapi.db
        .queryBuilder(uid)
        .delete()
        .where({ locale: { $ne: defaultLocale } })
        .execute();
    }
  }
};

// if mktlng enabled set default locale
async function enable({ oldContentTypes, contentTypes }) {
  const { hasLocalizedContentType } = getService('contentTypes');
  const { getDefaultLocale } = getService('locales');
  if (!oldContentTypes) {
    return;
  }
  // console.log('enable mktlng', Object.keys(contentTypes));
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    if (!hasLocalizedContentType(oldContentType) && hasLocalizedContentType(contentType)) {
      const defaultLocale = (await getDefaultLocale()) || DEFAULT_LOCALE.code;
      await strapi.db
        .queryBuilder(uid)
        .update({ locale: defaultLocale })
        .where({ locale: null })
        .execute();
    }
  }
};

module.exports = {
  disable,
  enable,
};
