import * as contentTypes from '../services/content-types';
import * as coreAPI from '../services/core-api';
import * as entityServiceDecorator from '../services/entity-service-decorator';
import * as ISOLocales from '../services/iso-locales';
import * as ISOMarkets from '../services/iso-markets';
import * as locales from '../services/locales';
import * as localizations from '../services/localizations';
import * as markets from '../services/markets';
import * as metrics from '../services/metrics';
import * as permissions from '../services/permissions';

type S = {
  permissions: typeof permissions;
  metrics: typeof metrics;
  locales: typeof locales;
  markets: typeof markets;
  localizations: typeof localizations;
  ['iso-locales']: typeof ISOLocales;
  ['iso-markets']: typeof ISOMarkets;
  ['content-types']: typeof contentTypes;
  ['entity-service-decorator']: typeof entityServiceDecorator;
  ['core-api']: typeof coreAPI;
};

export function getService<T extends keyof S>(name: T): ReturnType<S[T]>;
