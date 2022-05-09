import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import React from 'react';
import { useIntl } from 'react-intl';
import { Illo } from '../../../Icons/Illo';
import { getTrad } from '../../../utils';

function EmptyComponentLayout() {
  const { formatMessage } = useIntl();
  return (
    <Box padding={ 8 } background="neutral100">
      <EmptyStateLayout icon={ <Illo /> } content={ formatMessage({ id: getTrad('page.emptyComponentLayout.no-component'), defaultMessage: "You don't have any Meta component yet" }) } />
    </Box>
  );
};

export default EmptyComponentLayout;
