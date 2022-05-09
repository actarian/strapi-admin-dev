import { Box } from '@strapi/design-system/Box';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';
import { ContentBox } from '@strapi/helper-plugin';
import InformationSquare from '@strapi/icons/InformationSquare';
import React from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';
import PagesList from './PagesList/PagesList';

export default function Pages() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout
          title={ formatMessage({ id: getTrad('page.header.title'), defaultMessage: 'Pages' }) }
          subtitle={ formatMessage({ id: getTrad('page.header.subtitle'), defaultMessage: 'Edit your Pages content types' }) }
          as="h2" />
      </Box>
      { false &&
        <Box paddingLeft={ 8 } paddingRigth={ 8 }>
          <ContentBox
            title={ formatMessage({ id: 'Information', defaultMessage: 'Information' }) }
            subtitle={ formatMessage({ id: getTrad('page.info.information'), defaultMessage: "When adding your Meta component, make sure to name it 'meta' and to include it in the root of your Content-Type." }) }
            icon={ <InformationSquare /> }
            iconBackground="primary100"
          />
        </Box>
      }
      <Box padding={ 10 }>
        <PagesList />
      </Box>
    </>
  );
};
