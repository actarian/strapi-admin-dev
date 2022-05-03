import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';
import { SeoCheckerContext } from '../../../Summary';
import SEOAccordion from '../SEOAccordion';






const CanonicalUrlCheck = ({ canonicalUrl, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('checks.canonicalUrlCheck.found'),
      defaultMessage: 'A canonical URL has been found.',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(canonicalUrl)) {
      status = {
        message: formatMessage({
          id: getTrad('checks.canonicalUrlCheck.default'),
          defaultMessage: 'No Canonical URL has been found.',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.canonicalUrl))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'canonicalUrl' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Canonical URL"
      status={checks.canonicalUrl}
      label={formatMessage({
        id: getTrad('checks.canonicalUrlCheck.label'),
        defaultMessage: 'This will check if you have a canonical URL.',
      })}
      component={
        canonicalUrl && (
          <Box padding={2}>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('checks.canonicalUrlCheck.url'),
                defaultMessage: 'Canonical URL:',
              })}{' '}
              {canonicalUrl}
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default CanonicalUrlCheck;
