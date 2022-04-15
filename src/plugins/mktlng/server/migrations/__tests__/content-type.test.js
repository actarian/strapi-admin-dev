'use strict';

const enable = require('../content-type/enable');
const disable = require('../content-type/disable');
const ctService = require('../../services/content-types')();

const createQueryBuilderMock = () => {
  const obj = {
    delete: jest.fn(() => obj),
    update: jest.fn(() => obj),
    where: jest.fn(() => obj),
    execute() {},
  };

  return jest.fn(() => obj);
};

describe('mktlng - Migration - enable/disable localization on a CT', () => {
  beforeAll(() => {
    global.strapi = {
      db: {},
      plugins: {
        mktlng: {
          services: {
            'content-types': ctService,
            locales: {
              getDefaultLocale: jest.fn(() => 'default-locale'),
            },
          },
        },
      },
    };
  });

  describe('enable localization on a CT', () => {
    describe('Should not migrate', () => {
      test('non mktlng => non mktlng', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = {};
        const definition = {};

        await enable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });

        expect(strapi.db.queryBuilder).not.toHaveBeenCalled();
      });

      test('mktlng => non mktlng', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = { pluginOptions: { mktlng: { localized: true } } };
        const definition = {};

        await enable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });

        expect(strapi.db.queryBuilder).not.toHaveBeenCalled();
      });

      test('mktlng => mktlng', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = { pluginOptions: { mktlng: { localized: true } } };
        const definition = { pluginOptions: { mktlng: { localized: true } } };

        await enable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });

        expect(strapi.db.queryBuilder).not.toHaveBeenCalled();
      });
    });

    describe('Should migrate', () => {
      test('non mktlng => mktlng ', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = {};
        const definition = { pluginOptions: { mktlng: { localized: true } } };

        await enable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });

        expect(strapi.plugins.mktlng.services.locales.getDefaultLocale).toHaveBeenCalled();
        expect(strapi.db.queryBuilder).toHaveBeenCalled();
      });
    });
  });

  describe('disable localization on a CT', () => {
    describe('Should not migrate', () => {
      test('non mktlng => non mktlng', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = {};
        const definition = {};

        await disable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });
        expect(strapi.db.queryBuilder).not.toHaveBeenCalled();
      });

      test('non mktlng => mktlng', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = {};
        const definition = { pluginOptions: { mktlng: { localized: true } } };

        await disable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });
        expect(strapi.db.queryBuilder).not.toHaveBeenCalled();
      });

      test('mktlng => mktlng', async () => {
        strapi.db.queryBuilder = createQueryBuilderMock();

        const previousDefinition = { pluginOptions: { mktlng: { localized: true } } };
        const definition = { pluginOptions: { mktlng: { localized: true } } };

        await disable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });
        expect(strapi.db.queryBuilder).not.toHaveBeenCalled();
      });
    });

    describe('Should migrate', () => {
      test('mktlng => non mktlng - pg', async () => {
        const previousDefinition = {
          pluginOptions: { mktlng: { localized: true } },
        };
        const definition = {};

        await disable({
          oldContentTypes: { test: previousDefinition },
          contentTypes: { test: definition },
        });

        expect(strapi.plugins.mktlng.services.locales.getDefaultLocale).toHaveBeenCalled();
        expect(strapi.db.queryBuilder).toHaveBeenCalled();
      });
    });
  });
});
