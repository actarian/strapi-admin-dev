import { request, useNotification } from '@strapi/helper-plugin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOLVE_MARKETS } from '../constants';

async function fetchMarketsList(toggleNotification) {
  try {
    const data = await request('/mktlng/markets', { method: 'GET' });
    return data;
  } catch (error) {
    toggleNotification({ type: 'warning', message: { id: 'notification.error' } });
    return error;
  }
}

function useMarkets() {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const markets = useSelector(state => state.mktlng_markets.markets);
  const isLoading = useSelector(state => state.mktlng_markets.isLoading);
  useEffect(() => {
    fetchMarketsList(toggleNotification).then(markets =>
      dispatch({ type: RESOLVE_MARKETS, markets })
    );
  }, [dispatch, toggleNotification]);
  return { markets, isLoading };
}

export default useMarkets;
