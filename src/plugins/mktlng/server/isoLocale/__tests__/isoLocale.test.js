'use strict';

const { getInitLocale } = require('../isoLocale');

describe('getInitLocale', () => {
  describe('getInitLocale', () => {
    test('The init locale is english by default', () => {
      expect(getInitLocale()).toStrictEqual({
        code: 'en',
        name: 'English (en)',
      });
    });

    test('The init locale can be configured by an env var', () => {
      process.env.STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE = 'fr';
      expect(getInitLocale()).toStrictEqual({
        code: 'fr',
        name: 'French (fr)',
      });
    });

    test('Throws if env var code is unknown in iso list', () => {
      process.env.STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE = 'zzzzz';
      expect(() => getInitLocale()).toThrow();
    });
  });
});

const { getIsoLocales } = require('../isoLocale.service');

describe('getIsoLocales', () => {
  test('getIsoLocales', () => {
    const locales = getIsoLocales();
    expect(locales).toMatchSnapshot();
  });
});

const { listIsoLocales } = require('../isoLocale.controller')

describe('listIsoLocales', () => {
  test('listIsoLocales', () => {
    const isoLocales = [{ code: 'af', name: 'Afrikaans (af)' }];
    const getIsoLocales = jest.fn(() => isoLocales);
    global.strapi = {
      plugins: {
        mktlng: {
          services: {
            'iso-locales': {
              getIsoLocales,
            },
          },
        },
      },
    };

    const ctx = {};
    listIsoLocales(ctx);

    expect(ctx.body).toMatchObject(isoLocales);
  });
});
