'use strict';

const metricsLoader = require('../metrics');
const { isLocalizedContentType } = require('../content-types')();

describe('Metrics', () => {
  test('sendDidInitializeEvent', async () => {
    global.strapi = {
      contentTypes: {
        withMktlng: {
          pluginOptions: {
            mktlng: {
              localized: true,
            },
          },
        },
        withoutMktlng: {
          pluginOptions: {
            mktlng: {
              localized: false,
            },
          },
        },
        withNoOption: {
          pluginOptions: {},
        },
      },
      plugins: {
        mktlng: {
          services: {
            ['content-types']: {
              isLocalizedContentType,
            },
          },
        },
      },
      telemetry: {
        send: jest.fn(),
      },
    };

    const { sendDidInitializeEvent } = metricsLoader({ strapi });

    await sendDidInitializeEvent();

    expect(strapi.telemetry.send).toHaveBeenCalledWith('didInitializeMktlng', {
      numberOfContentTypes: 1,
    });
  });

  test('sendDidUpdateMktlngLocalesEvent', async () => {
    global.strapi = {
      contentTypes: {
        withMktlng: {
          pluginOptions: {
            mktlng: {
              localized: true,
            },
          },
        },
        withoutMktlng: {
          pluginOptions: {
            mktlng: {
              localized: false,
            },
          },
        },
        withNoOption: {
          pluginOptions: {},
        },
      },
      plugins: {
        mktlng: {
          services: {
            locales: {
              count: jest.fn(() => 3),
            },
          },
        },
      },
      telemetry: {
        send: jest.fn(),
      },
    };

    const { sendDidUpdateMktlngLocalesEvent } = metricsLoader({ strapi });

    await sendDidUpdateMktlngLocalesEvent();

    expect(strapi.telemetry.send).toHaveBeenCalledWith('didUpdateMktlngLocales', {
      numberOfLocales: 3,
    });
  });
});
