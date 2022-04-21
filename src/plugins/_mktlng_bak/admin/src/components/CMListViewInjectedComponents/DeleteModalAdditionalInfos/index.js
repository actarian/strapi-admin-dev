import { Typography } from '@strapi/design-system/Typography';
import React from 'react';
import { useIntl } from 'react-intl';
import useHasMktlng from '../../../hooks/useHasMktlng';
import { getTrad } from '../../../utils';

const DeleteModalAdditionalInfos = () => {
  const hasMktlngEnabled = useHasMktlng();
  const { formatMessage } = useIntl();

  if (!hasMktlngEnabled) {
    return null;
  }

  return (
    <Typography textColor="danger500">
      { formatMessage(
        {
          id: getTrad('settings.list.actions.deleteAdditionalInfos'),
          defaultMessage:
            'This will delete the active locale versions <em>(from Markets & Languages)</em>',
        },
        {
          em: chunks => (
            <Typography fontWeight="semiBold" textColor="danger500">
              { chunks }
            </Typography>
          ),
        }
      ) }
    </Typography>
  );
};

export default DeleteModalAdditionalInfos;
