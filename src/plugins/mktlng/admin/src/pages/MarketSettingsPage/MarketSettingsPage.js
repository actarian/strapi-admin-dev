import { useRBAC } from '@strapi/helper-plugin';
import React from 'react';
import permissions from '../../permissions';
import MarketPage from './MarketPage';

const MarketSettingsPage = () => {
  const { isLoading, allowedActions: { canRead, canUpdate, canCreate, canDelete } } = useRBAC(permissions);
  if (isLoading) {
    return null;
  }
  return (
    <MarketPage canRead={ canRead } canCreate={ canCreate } canUpdate={ canUpdate } canDelete={ canDelete } />
  );
};

export default MarketSettingsPage;
