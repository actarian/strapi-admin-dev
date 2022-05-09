import { Box } from '@strapi/design-system/Box';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { LinkButton } from '@strapi/design-system/LinkButton';
import Pencil from '@strapi/icons/Pencil';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

function PagesSettingsHeader(metaComponent) {
  const { formatMessage } = useIntl();
  return (
    <Box background="neutral100">
      <BaseHeaderLayout
        title={ formatMessage({ id: getTrad('page.header.title'), defaultMessage: 'Pages' }) }
        subtitle={ formatMessage({ id: getTrad('page.header.subtitle'), defaultMessage: 'Edit your Pages content types' }) }
        as="h2"
        secondaryAction={ metaComponent ? null : (
          <LinkButton to="/plugins/content-type-builder/component-categories/page/page.meta" variant="tertiary" startIcon={ <Pencil /> }>
            { formatMessage({ id: getTrad('page.header.button.edit-component'), defaultMessage: 'Edit Pages component' }) }
          </LinkButton>
        ) } />
    </Box>
  );
};

export default PagesSettingsHeader;
