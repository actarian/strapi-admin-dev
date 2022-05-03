import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';
import { SeoCheckerContext } from '../../../Summary';
import SEOAccordion from '../SEOAccordion';






const MetaTitleCheck = ({ title, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('checks.titleCheck.default'),
      defaultMessage: 'A Meta Title has been found!',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(title) || _.isEmpty(title)) {
      status = {
        message: formatMessage({
          id: getTrad('checks.titleCheck.not-found'),
          defaultMessage: 'No Meta Description has been found.',
        }),
        color: 'danger',
      };
    } else if (title.length > 60) {
      status = {
        message: formatMessage({
          id: getTrad('titleSettings.titleTooLong'),
          defaultMessage: 'Meta Title is too long',
        }),
        color: 'warning',
      };
    }
    if (!_.isEqual(status, checks.title))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'title' },
      });
  }, []);

  return (
    <>
      <SEOAccordion
        title="Meta title"
        status={checks.title}
        label={formatMessage({
          id: getTrad('titleSettings.titleTooltip'),
          defaultMessage:
            'The title tag is the clickable title of a webpage that appears with the result on the SERP (search engine page results page).\n You should aim to make your SEO titles around 60 characters long. Clear title tags will go a long way towards making your website easy to read and understand.',
        })}
        component={
          title && (
            <Box padding={2}>
              <Typography variant="omega">
                {title} ({title.length}/60)
              </Typography>
            </Box>
          )
        }
      />
    </>
  );
};

export default MetaTitleCheck;
