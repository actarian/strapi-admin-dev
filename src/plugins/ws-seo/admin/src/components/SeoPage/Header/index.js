import { Box } from '@strapi/design-system/Box';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { LinkButton } from '@strapi/design-system/LinkButton';
import Pencil from '@strapi/icons/Pencil';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../utils';

const Header = (metaComponent) => {
  const { formatMessage } = useIntl();
  return (
    <Box background="neutral100">
      <BaseHeaderLayout secondaryAction={ metaComponent ? null : (
        <LinkButton to="/plugins/content-type-builder/component-categories/page/page.meta" variant="tertiary" startIcon={ <Pencil /> }>
          { formatMessage({ id: getTrad('page.header.button.edit-component'), defaultMessage: 'Edit SEO component' }) }
        </LinkButton>
      )
      } title={ formatMessage({ id: getTrad('page.header.title'), defaultMessage: 'SEO' }) }
        subtitle={ formatMessage({ id: getTrad('page.header.subtitle'), defaultMessage: 'Optimize your content to be SEO friendly' }) }
        as="h2"
      />
    </Box>
  );
};

export default Header;
