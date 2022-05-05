import { Flex } from '@strapi/design-system/Flex';
import React from 'react';


const NavigationContentHeader = ({ startActions, endActions }) => {
  return (
    <Flex justifyContent="space-between" width="100%">
      <Flex alignItems="space-between">
        { startActions }
      </Flex>
      <Flex alignItems="space-between">
        { endActions }
      </Flex>
    </Flex>
  );
}

export default NavigationContentHeader;
