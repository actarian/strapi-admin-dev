import { useRBAC } from '@strapi/helper-plugin';
import React from 'react';
import mktlngPermissions from '../../permissions';
import MarketPage from './MarketPage';

const MarketSettingsPage = () => {
  const { isLoading, allowedActions: { canRead, canUpdate, canCreate, canDelete } } = useRBAC(mktlngPermissions);
  if (isLoading) {
    return null;
  }
  return (
    <MarketPage canRead={ canRead } canCreate={ canCreate } canUpdate={ canUpdate } canDelete={ canDelete } />
  );
};

export default MarketSettingsPage;
