import produce from 'immer';
import set from 'lodash/set';
import pluginId from '../pluginId';
import { ADD_LOCALE, ADD_MARKET, DELETE_LOCALE, DELETE_MARKET, RESOLVE_LOCALES, RESOLVE_MARKETS, UPDATE_LOCALE, UPDATE_MARKET } from './constants';

export const initialState = {
  isLoading: true,
  locales: [],
  markets: [],
};

const localeReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case RESOLVE_LOCALES: {
      draftState.isLoading = false;
      draftState.locales = action.locales;
      break;
    }
    case ADD_LOCALE: {
      if (action.newLocale.isDefault) {
        draftState.locales.forEach(locale => {
          locale.isDefault = false;
        });
      }
      draftState.locales.push(action.newLocale);
      break;
    }
    case DELETE_LOCALE: {
      const locales = draftState.locales.filter(locale => locale.id !== action.id);
      set(draftState, 'locales', locales);
      break;
    }
    case UPDATE_LOCALE: {
      if (action.editedLocale.isDefault) {
        draftState.locales.forEach(locale => {
          locale.isDefault = false;
        });
      }
      const indexToEdit = draftState.locales.findIndex(
        locale => locale.id === action.editedLocale.id
      );
      set(draftState.locales, indexToEdit, action.editedLocale);
      break;
    }
    default:
      return draftState;
  }
  return draftState;
});

const marketReducer = produce((draftState = initialState, action) => {
  switch (action.type) {
    case RESOLVE_MARKETS: {
      draftState.isLoading = false;
      draftState.markets = action.markets;
      break;
    }
    case ADD_MARKET: {
      if (action.newMarket.isDefault) {
        draftState.markets.forEach(market => {
          market.isDefault = false;
        });
      }
      draftState.markets.push(action.newMarket);
      break;
    }
    case DELETE_MARKET: {
      const markets = draftState.markets.filter(market => market.id !== action.id);
      set(draftState, 'markets', markets);
      break;
    }
    case UPDATE_MARKET: {
      if (action.editedMarket.isDefault) {
        draftState.markets.forEach(market => {
          market.isDefault = false;
        });
      }
      const indexToEdit = draftState.markets.findIndex(
        market => market.id === action.editedMarket.id
      );
      set(draftState.markets, indexToEdit, action.editedMarket);
      break;
    }
    default:
      return draftState;
  }
  return draftState;
});

const reducers = {
  [`${pluginId}_locales`]: localeReducer,
  [`${pluginId}_markets`]: marketReducer,
};

export default reducers;
