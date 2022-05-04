import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import {
  ModalBody, ModalFooter, ModalHeader, ModalLayout
} from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import _ from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';
import { Illo } from '../../../../../Icons/Illo';
import { getTrad } from '../../../../../utils';
import { getRichTextCheck } from '../../../../utils';
import AlternativeTextCheck from './AlternativeTextCheck';
import CanonicalUrlCheck from './CanonicalUrlCheck';
import KeywordDensityCheck from './KeywordDensityCheck';
import LastUpdatedAtCheck from './LastUpdatedAtCheck';
import MetaDescriptionCheck from './MetaDescriptionCheck';
import MetaRobotCheck from './MetaRobotCheck';
import MetaSocialCheck from './MetaSocialCheck';
import MetaTitleCheck from './MetaTitleCheck';
import StructuredDataCheck from './StructuredDataCheck';
import WordCountCheck from './WordCountCheck';

const SeoChecks = ({
  modifiedData,
  components,
  contentType,
  checks,
  setIsVisible,
}) => {
  const { formatMessage } = useIntl();

  const { wordCount, keywordsDensity, emptyAltCount } = getRichTextCheck(
    modifiedData,
    components,
    contentType
  );

  const meta = _.get(modifiedData, 'meta', null);

  return (
    <ModalLayout labelledBy="title" onClose={ () => setIsVisible((prev) => !prev) }>
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">Page</Typography>
      </ModalHeader>
      <ModalBody>
        <Box paddingTop={ 2 } paddingBottom={ 4 } paddingLeft={ 4 }>
          <Typography variant="beta">
            { formatMessage({ id: getTrad('button.metaAnalyze'), defaultMessage: 'SEO Analyze' }) }
          </Typography>
          <Box paddingTop={ 4 }>
            <Divider />
          </Box>
        </Box>
        { meta ? (
          <Box padding={ 4 }>
            <MetaTitleCheck checks={ checks } title={ _.get(modifiedData, 'meta.title', null) } />
            <MetaDescriptionCheck checks={ checks } description={ _.get(modifiedData, 'meta.description', null) } />
            <WordCountCheck checks={ checks } wordCount={ wordCount } />
            <KeywordDensityCheck checks={ checks } keywordsDensity={ keywordsDensity } />
            <MetaSocialCheck checks={ checks } metaSocial={ _.get(modifiedData, 'meta.metaSocial', null) } />
            <CanonicalUrlCheck checks={ checks } canonicalUrl={ _.get(modifiedData, 'meta.canonicalURL', null) } />
            <StructuredDataCheck checks={ checks } structuredData={ _.get(modifiedData, 'meta.structuredData', null) } />
            <MetaRobotCheck checks={ checks } robots={ _.get(modifiedData, 'meta.robots', null) } />
            <AlternativeTextCheck checks={ checks } intersections={ _.get(emptyAltCount, 'intersections', null) } richTextAlts={ _.get(emptyAltCount, 'richTextAlts', null) } altTexts={ _.get(emptyAltCount, 'altTexts', null) } />
            <LastUpdatedAtCheck checks={ checks } updatedAt={ _.get(modifiedData, 'updatedAt', null) } />
          </Box>
        ) : (
          <Box paddingLeft={ 4 }>
            <EmptyStateLayout icon={ <Illo /> } content={ formatMessage({ id: getTrad('modal.metaComponentEmpty'), defaultMessage: 'Your Meta component is empty...' }) } />
          </Box>
        ) }
      </ModalBody>
      <ModalFooter
        startActions={
          <Button
            onClick={ () => setIsVisible((prev) => !prev) }
            variant="tertiary"
          >
            { formatMessage({
              id: getTrad('modal.cancel'),
              defaultMessage: 'Cancel',
            }) }
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default SeoChecks;
