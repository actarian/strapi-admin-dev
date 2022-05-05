

import { ModalHeader } from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import React from 'react';
import { getMessage } from '../../../../utils';

export const NavigationItemPopupHeader = ({ isNewItem }) => {
  return (
    <ModalHeader>
      <Typography variant="omega" fontWeight="bold" textColor="neutral800" as="h2" id="asset-dialog-title">
        { getMessage(`popup.item.header.${isNewItem ? 'new' : 'edit'}`) }
      </Typography>
    </ModalHeader>
  );
};
