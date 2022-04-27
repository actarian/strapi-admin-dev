import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('*/mktlng/iso-markets', (req, res, ctx) => {
    const defaultLocales = [
      {
        code: 'af',
        name: 'Afrikaans (af)',
      },
      {
        code: 'en',
        name: 'English (en)',
      },
      {
        code: 'fr',
        name: 'French (fr)',
      },
    ];

    return res(ctx.json(defaultLocales));
  }),
  rest.get('*/mktlng/markets', (req, res, ctx) => {
    const defaultLocales = [
      {
        code: 'en',
        name: 'English (en)',
        id: 2,
        isDefault: true,
      },
    ];

    return res(ctx.json(defaultLocales));
  })
);

export default server;
