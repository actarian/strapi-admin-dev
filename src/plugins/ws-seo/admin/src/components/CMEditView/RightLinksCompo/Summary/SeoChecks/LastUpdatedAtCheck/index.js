import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';
import { SeoCheckerContext } from '../../../Summary';
import SEOAccordion from '../SEOAccordion';






const LastUpdatedAtCheck = ({ updatedAt, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('Schecks.lastUpdatedAtCheck.default'),
      defaultMessage:
        'This content was modified over a year ago! Search engines love fresh content.',
    }),
    color: 'danger',
  };

  useEffect(() => {
    if (_.isNull(updatedAt)) {
      status = {
        message: formatMessage({
          id: getTrad('checks.lastUpdatedAtCheck.save-content'),
          defaultMessage: 'You must save this entry first.',
        }),
        color: 'warning',
      };
    } else {
      const oneYearAgo = Date.parse(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
      );
      if (Date.parse(updatedAt) >= oneYearAgo) {
        status = {
          message: formatMessage({
            id: getTrad('checks.lastUpdatedAtCheck.success'),
            defaultMessage:
              'Awesome! This content was last modified in less than an year ago!',
          }),
          color: 'success',
        };
      }
    }
    if (!_.isEqual(status, checks.lastUpdatedAt))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'lastUpdatedAt' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Last updated at"
      label={formatMessage({
        id: getTrad('checks.lastUpdatedAtCheck.label'),
        defaultMessage:
          'Search engines love fresh content. This will check if your entry was last modified in less than an year ago.',
      })}
      status={checks.lastUpdatedAt}
      component={
        updatedAt && (
          <Box padding={2}>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad('checks.lastUpdatedAtCheck.last"'),
                defaultMessage: 'Last updated at:',
              })}{' '}
              {updatedAt}
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default LastUpdatedAtCheck;
