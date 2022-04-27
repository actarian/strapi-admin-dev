import * as contentTypes from '../contentType/contentType.service';
import * as coreAPI from '../coreAPI/coreApi.service';
import * as entityService from '../entity/entity.service';
import * as isoCountries from '../isoCountry/isoCountry.service';
import * as isoLocales from '../isoLocale/isoLocale.service';
import * as isoMarkets from '../isoMarket/isoMarket.service';
import * as locales from '../locale/locale.service';
import * as localizations from '../localization/localization.service';
import * as markets from '../market/market.service';
import * as metrics from '../metric/metric.service';
import * as permissions from '../permission/permission.service';

type S = {
  contentTypes: typeof contentTypes;
  coreAPI: typeof coreAPI;
  entityService: typeof entityService;
  isoCountries: typeof isoCountries;
  isoLocales: typeof isoLocales;
  isoMarkets: typeof isoMarkets;
  locales: typeof locales;
  localizations: typeof localizations;
  markets: typeof markets;
  metrics: typeof metrics;
  permissions: typeof permissions;
};

export function getService<T extends keyof S>(name: T): ReturnType<S[T]>;
