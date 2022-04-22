import * as contentTypes from '../services/contentTypes';
import * as coreAPI from '../services/coreApi';
import * as entityService from '../services/entityService';
import * as isoLocales from '../services/isoLocales';
import * as isoMarkets from '../services/isoMarkets';
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
  isoLocales: typeof isoLocales;
  isoMarkets: typeof isoMarkets;
  contentTypes: typeof contentTypes;
  entityService: typeof entityService;
  coreAPI: typeof coreAPI;
};

export function getService<T extends keyof S>(name: T): ReturnType<S[T]>;
