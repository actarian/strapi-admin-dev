import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';
import { SeoCheckerContext } from '../../../Summary';
import SEOAccordion from '../SEOAccordion';






const MetaDescriptionCheck = ({ description, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('checks.descriptionCheck.default'),
      defaultMessage: 'A Meta Description has been found!',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(description) || _.isEmpty(description)) {
      status = {
        message: formatMessage({
          id: getTrad('checks.descriptionCheck.not-found'),
          defaultMessage: 'No Meta Description has been found.',
        }),
        color: 'danger',
      };
    } else if (description.length > 160) {
      status = {
        message: formatMessage({
          id: getTrad('titleSettings.description-too-long'),
          defaultMessage: 'Meta Description is too long',
        }),
        color: 'warning',
      };
    } else if (description.length < 50) {
      status = {
        message: formatMessage({
          id: getTrad('titleSettings.description-too-short'),
          defaultMessage: 'Meta Description is too short',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.description))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'description' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Meta description"
      status={checks.description}
      label={formatMessage({
        id: getTrad('titleSettings.description-tooltip'),
        defaultMessage:
          'A meta description is an HTML tag used to describe the content of a web page.\n This description appears below the title and URL of your page as it appears in search engine results.\n For it to remain visible in Google, it must not exceed 140-160 characters.',
      })}
      component={
        description && (
          <Box padding={2}>
            <Typography variant="omega">
              {description} ({description.length}/160)
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default MetaDescriptionCheck;
