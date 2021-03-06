import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../../../../../utils';
import { SeoCheckerContext } from '../../Summary';
import SEOAccordion from '../SEOAccordion';






const WordCountCheck = ({ wordCount, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('checks.wordCountCheck.default'),
      defaultMessage:
        'You have more than 300 words. The word counter is not a direct ranking factor. But your content should be as high quality as possible, with relevant and unique information. To meet these conditions, your content requires a minimum of paragraphs, and therefore of words.',
    }),
    color: 'success',
  };

  useEffect(() => {
    if (_.isNull(wordCount)) {
      status = {
        message: formatMessage({
          id: getTrad('checks.wordCountCheck.not-found'),
          defaultMessage: 'No Richtext content have been found.',
        }),
        color: 'danger',
      };
      return;
    } else if (wordCount < 300) {
      status = {
        message: formatMessage({
          id: getTrad('checks.wordCountCheck.300'),
          defaultMessage:
            'Your 1st level Richtext contents have less than 300 words.',
        }),
        color: 'danger',
      };
    }
    if (!_.isEqual(status, checks.wordCount))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'wordCount' },
      });
  }, []);

  return (
    <SEOAccordion
      title="Word Counter"
      status={ checks.wordCount }
      label={ formatMessage({
        id: getTrad('checks.wordCountCheck.label'),
        defaultMessage:
          'Your content should be as high quality as possible, with relevant and unique information. You entry requires a minimum of paragraphs, and therefore of words.',
      }) }
      component={
        _.isNumber(wordCount) && (
          <Box padding={ 2 }>
            <Typography variant="omega">
              { formatMessage({
                id: getTrad('checks.wordCountCheck.words'),
                defaultMessage: 'Words:',
              }) }{ ' ' }
              { wordCount }
            </Typography>
          </Box>
        )
      }
    />
  );
};

export default WordCountCheck;
