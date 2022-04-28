import { request, useNotification } from '@strapi/helper-plugin';
import get from 'lodash/get';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTrad } from '../../utils';
import { ADD_MARKET } from '../constants';

async function addMarket({ code, name, countries, languages, isDefault }, toggleNotification) {
  const data = await request(`/mktlng/markets`, { method: 'POST', body: { code, name, countries, languages, isDefault } });
  toggleNotification({ type: 'success', message: { id: getTrad('settings.markets.modal.create.success') } });
  return data;
}

function useAddMarket() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const persistMarket = async market => {
    setLoading(true);
    try {
      const newMarket = await addMarket(market, toggleNotification);
      dispatch({ type: ADD_MARKET, newMarket });
    } catch (error) {
      const message = get(error, 'response.payload.message', null);
      if (message && message.includes('already exists')) {
        toggleNotification({ type: 'warning', message: { id: getTrad('settings.markets.modal.create.alreadyExist') } });
      } else {
        toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { isAdding: isLoading, addMarket: persistMarket };
}

export default useAddMarket;
