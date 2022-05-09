import { useRBAC } from '@strapi/helper-plugin';
import React from 'react';
import permissions from '../../permissions';
import LanguagePage from './LanguagePage';

const LanguageSettingsPage = () => {
  const { isLoading, allowedActions: { canRead, canUpdate, canCreate, canDelete } } = useRBAC(permissions);

  if (isLoading) {
    return null;
  }

  return (
    <LanguagePage canRead={ canRead } canCreate={ canCreate } canUpdate={ canUpdate } canDelete={ canDelete } />
  );
};

export default LanguageSettingsPage;
