import get from 'lodash/get';

const hasMarketPermission = (permissions, marketCode) => {
  if (permissions) {
    const hasPermission = permissions.some(permission =>
      get(permission, 'properties.markets', []).includes(marketCode)
    );
    if (hasPermission) {
      return true;
    }
  }
  return false;
};

const getFirstMarket = permissions => {
  if (permissions && permissions.length > 0) {
    const firstAuthorizedNonDefaultMarket = get(permissions, [0, 'properties', 'markets', 0], null);
    if (firstAuthorizedNonDefaultMarket) {
      return firstAuthorizedNonDefaultMarket;
    }
  }
  return null;
};

/**
 * Entry point of the module
 */
const getDefaultMarket = (ctPermissions, markets = []) => {
  const defaultMarket = markets.find(market => market.isDefault);
  if (!defaultMarket) {
    return null;
  }
  const readPermissions = ctPermissions['plugin::content-manager.explorer.read'];
  const createPermissions = ctPermissions['plugin::content-manager.explorer.create'];
  if (hasMarketPermission(readPermissions, defaultMarket.code)) {
    return defaultMarket.code;
  }
  if (hasMarketPermission(createPermissions, defaultMarket.code)) {
    return defaultMarket.code;
  }
  // When the default market is not authorized, we return the first authorized market
  const firstAuthorizedForReadNonDefaultMarket = getFirstMarket(readPermissions);
  if (firstAuthorizedForReadNonDefaultMarket) {
    return firstAuthorizedForReadNonDefaultMarket;
  }
  return getFirstMarket(createPermissions);
};

export default getDefaultMarket;
