import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { ModalBody, ModalFooter, ModalHeader, ModalLayout } from '@strapi/design-system/ModalLayout';
import { Stack } from '@strapi/design-system/Stack';
import { Switch } from '@strapi/design-system/Switch';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Illo } from '../../../../../Icons/Illo';
import { getTrad } from '../../../../../utils';
import KeywordCheck from './KeywordCheck/KeywordCheck';
import MetaChecks from './MetaChecks/MetaChecks';
import Serp from './Serp/Serp';
import SerpMobile from './SerpMobile/SerpMobile';

const BrowserPreview = ({ modifiedData, setIsVisible }) => {
  const { formatMessage } = useIntl();
  const [checked, setChecked] = useState(false);
  const meta = _.get(modifiedData, 'meta', null);
  const title = _.get(meta, 'title', null);
  const description = _.get(meta, 'description', null);
  const keywords = _.get(meta, 'keywords', null);
  return (
    <ModalLayout onClose={ () => setIsVisible((prev) => !prev) } labelledBy="title" >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">Page</Typography>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={ 2 } paddingBottom={ 4 } paddingLeft={ 4 }>
          <Typography variant="beta">{ formatMessage({ id: getTrad('button.browserPreview'), defaultMessage: 'Browser Preview', }) }</Typography>
          <Box paddingTop={ 4 }>
            <Divider />
          </Box>
        </Box>
        { meta ? (
          <Stack size={ 2 } padding={ 4 }>
            <div style={ { backgroundColor: '#ffffff' } }>
              <Box padding={ 6 }>
                <Box paddingBottom={ 4 }>
                  <Switch label="Preview" offLabel="Web" onLabel="Mobile" visibleLabels={ true } selected={ checked } onChange={ () => setChecked((s) => !s) } />
                </Box>
                { checked ? (
                  <SerpMobile title={ title } description={ description } />
                ) : (
                  <Serp title={ title } description={ description } />
                ) }
              </Box>
            </div>
            { title && (
              <MetaChecks item={ title } max={ 60 } label="title" />
            ) }
            { description && (
              <MetaChecks item={ description } max={ 160 } label="description" minLimit={ true } />
            ) }
            { keywords && (
              <>
                { title && (
                  <KeywordCheck item={ title } keywords={ keywords } label="title" />
                ) }
                { description && (
                  <KeywordCheck item={ description } keywords={ keywords } label="description" />
                ) }
              </>
            ) }
          </Stack>
        ) : (
          <Box paddingLeft={ 4 }>
            <EmptyStateLayout icon={ <Illo /> } content={ formatMessage({ id: getTrad('modal.metaComponentEmpty'), defaultMessage: 'Your Meta component is empty...' }) } />
          </Box>
        ) }
      </ModalBody>
      <ModalFooter startActions={
        <Button variant="tertiary" onClick={ () => setIsVisible((prev) => !prev) } >
          { formatMessage({ id: getTrad('modal.cancel'), defaultMessage: 'Cancel' }) }
        </Button>
      } />
    </ModalLayout>
  );
};

export default BrowserPreview;
