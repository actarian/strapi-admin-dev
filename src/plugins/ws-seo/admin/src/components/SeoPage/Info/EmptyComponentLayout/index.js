import { Box } from '@strapi/design-system/Box';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../utils';
import { Illo } from './illo';

const EmptyComponentLayout = () => {
  const { formatMessage } = useIntl();
  return (
    <Box padding={ 8 } background="neutral100">
      <EmptyStateLayout icon={ <Illo /> } content={ formatMessage({ id: getTrad('SEOPage.empty-component-layout.no-component'), defaultMessage: "You don't have any SEO component yet" }) }
      />
    </Box>
  );
};

export default EmptyComponentLayout;
