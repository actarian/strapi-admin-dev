import { Box } from '@strapi/design-system/Box';
import { ContentBox, LoadingIndicatorPage, useAutoReloadOverlayBlocker } from '@strapi/helper-plugin';
import InformationSquare from '@strapi/icons/InformationSquare';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';
import { createSeoComponent, fetchContentTypes, fetchSeoComponent } from '../../utils/api';
import PagesHeader from './PagesHeader/PagesHeader';
import PagesTabs from './PagesTabs/PagesTabs';

function Pages() {
  const { formatMessage } = useIntl();
  const { lockAppWithAutoreload, unlockAppWithAutoreload } = useAutoReloadOverlayBlocker();
  const [isLoading, setIsLoading] = useState(true);
  const [shouldEffect, setShouldEffect] = useState(false);
  const metaComponent = useRef({});
  const contentTypes = useRef({});

  const fetchData = async () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    metaComponent.current = await fetchSeoComponent();
    contentTypes.current = await fetchContentTypes();
    if (!metaComponent.current) {
      try {
        lockAppWithAutoreload();
        await createSeoComponent();
      } catch (error) {
        console.log(error);
      } finally {
        unlockAppWithAutoreload();
        setShouldEffect(true);
      }
    }
    setIsLoading(false);
  };

  // Fetching the Meta component & Content-Types
  useEffect(async () => {
    await fetchData();
  }, [shouldEffect]);

  // Displaying the LoadingIndicatorPage while it fetches the data
  if (isLoading) {
    return <LoadingIndicatorPage />;
  }

  return (
    <>
      <PagesHeader metaComponent={ metaComponent.current } />
      { false &&
        <Box paddingLeft={ 8 } paddingRigth={ 8 }>
          <ContentBox
            title={ formatMessage({ id: 'Information', defaultMessage: 'Information' }) }
            subtitle={ formatMessage({ id: getTrad('page.info.information'), defaultMessage: "When adding your Meta component, make sure to name it 'meta' and to include it in the root of your Content-Type." }) }
            icon={ <InformationSquare /> }
            iconBackground="primary100"
          />
        </Box>
      }
      <PagesTabs contentTypes={ contentTypes.current } />
    </>
  );
};

export default memo(Pages);
