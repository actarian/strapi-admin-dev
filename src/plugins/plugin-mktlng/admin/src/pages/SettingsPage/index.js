import { useRBAC } from '@strapi/helper-plugin';
import React from 'react';
import mktlngPermissions from '../../permissions';
import LocaleSettingsPage from './LocaleSettingsPage';

const ProtectedLocaleSettingsPage = () => {
  const {
    isLoading,
    allowedActions: { canRead, canUpdate, canCreate, canDelete },
  } = useRBAC(mktlngPermissions);

  if (isLoading) {
    return null;
  }

  return (
    <LocaleSettingsPage
      canReadLocale={canRead}
      canCreateLocale={canCreate}
      canUpdateLocale={canUpdate}
      canDeleteLocale={canDelete}
    />
  );
};

export default ProtectedLocaleSettingsPage;
