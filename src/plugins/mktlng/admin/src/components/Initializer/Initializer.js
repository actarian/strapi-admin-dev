/**
 *
 * Initializer
 *
 */

import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import useLocales from '../../hooks/useLocales/useLocales';
import useMarkets from '../../hooks/useMarkets/useMarkets';
import pluginId from '../../pluginId';

const Initializer = ({ setPlugin }) => {
  const ul = useLocales();
  const um = useMarkets();
  const ref = useRef();
  ref.current = setPlugin;

  useEffect(() => {
    if (!ul.isLoading && ul.locales.length > 0 &&
      !um.isLoading && um.markets.length > 0) {
      ref.current(pluginId);
    }
  }, [ul.isLoading, ul.locales, um.isLoading, um.markets]);

  return null;
};

Initializer.propTypes = {
  setPlugin: PropTypes.func.isRequired,
};

export default Initializer;
