import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Stack } from '@strapi/design-system/Stack';
import { TabPanel } from '@strapi/design-system/Tabs';
import React from 'react';
import KeywordCheck from '../../BrowserPreview/KeywordCheck/KeywordCheck';
import MetaChecks from '../../BrowserPreview/MetaChecks/MetaChecks';
import FacebookPreview from '../FacebookPreview';
import TwitterPreview from '../TwitterPreview';

const TabContent = ({ item, keywords }) => {
  return (
    <TabPanel>
      <Stack size={ 2 }>
        <Box paddingTop={ 6 } paddingBottom={ 6 }>
          { item.image && (
            <Flex alignItems="center" justifyContent="center">
              { item.type === 'Facebook' ? (
                <FacebookPreview title={ item.title } description={ item.description } image={ item.image } />
              ) : (
                <TwitterPreview title={ item.title } description={ item.description } image={ item.image } />
              ) }
            </Flex>
          ) }
        </Box>
        <MetaChecks item={ item.title } max={ 60 } label="title" />
        <MetaChecks item={ item.description } max={ item.type === 'Facebook' ? 65 : 125 } label="description" />
        { keywords && (
          <>
            { item.title && (
              <KeywordCheck item={ item.title } keywords={ keywords } label="title" />
            ) }
            { item.description && (
              <KeywordCheck item={ item.description } keywords={ keywords } label="description" />
            ) }
          </>
        ) }
      </Stack>
    </TabPanel>
  );
};

export default TabContent;
