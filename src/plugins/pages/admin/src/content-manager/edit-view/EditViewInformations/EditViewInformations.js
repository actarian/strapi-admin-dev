import { Box } from '@strapi/design-system/Box';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import React from 'react';
import Summary from './Summary/Summary';

function EditViewInformations() {
  const { modifiedData } = useCMEditViewDataManager();
  if (modifiedData.hasOwnProperty('meta')) {
    return (
      <Box as="aside" aria-labelledby="additional-informations" background="neutral0" borderColor="neutral150" hasRadius paddingBottom={ 4 } paddingLeft={ 4 } paddingRight={ 4 } paddingTop={ 6 } shadow="tableShadow">
        <Summary />
      </Box>
    );
  }
  return <></>;
};

export default EditViewInformations;
