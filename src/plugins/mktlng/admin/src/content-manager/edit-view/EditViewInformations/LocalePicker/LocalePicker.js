import { Box } from '@strapi/design-system/Box';
import { Divider } from '@strapi/design-system/Divider';
import { Option, Select } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { stringify } from 'qs';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { getTrad } from '../../../../utils';
import { CopyLocale } from '../CopyLocale/CopyLocale';
import { Bullet } from './Bullet';
import { createLocalesOption } from './utils';

export function LocalePicker(props) {
  const { appLocales, createPermissions, currentEntityId, currentLocaleStatus, hasDraftAndPublishEnabled,
    isSingleType, localizations, query, readPermissions, setQuery, slug } = props;

  const { formatMessage } = useIntl();

  const currentLocale = get(query, 'plugins.mktlng.locale', false);

  const { push } = useHistory();

  const handleChange = value => {
    if (value === currentLocale) {
      return;
    }

    const nextLocale = options.find(option => {
      return option.value === value;
    });

    const { status, id } = nextLocale;

    let defaultParams = {
      plugins: {
        ...query.plugins,
        mktlng: { ...query.plugins.mktlng, locale: value },
      },
    };

    if (currentEntityId) {
      defaultParams.plugins.mktlng.relatedEntityId = currentEntityId;
    }

    if (isSingleType) {
      setQuery(defaultParams);
      return;
    }

    if (status === 'did-not-create-locale') {
      push({
        pathname: `/content-manager/collectionType/${slug}/create`,
        search: stringify(defaultParams, { encode: false }),
      });
      return;
    }

    push({
      pathname: `/content-manager/collectionType/${slug}/${id}`,
      search: stringify(defaultParams, { encode: false }),
    });
  };

  const options = createLocalesOption(appLocales, localizations).filter(({ status, value }) => {
    if (status === 'did-not-create-locale') {
      return createPermissions.find(({ properties }) =>
        get(properties, 'locales', []).includes(value)
      );
    }
    return readPermissions.find(({ properties }) => get(properties, 'locales', []).includes(value));
  });

  const filteredOptions = options.filter(({ value }) => value !== currentLocale);
  const currentLocaleObject = appLocales.find(({ code }) => code === currentLocale);

  const value = options.find(({ value }) => {
    return value === currentLocale;
  }) || { value: currentLocaleObject.code, label: currentLocaleObject.name };

  if (!currentLocale) {
    return null;
  }

  return (
    <Box paddingTop={ 6 }>
      <Typography variant="sigma" textColor="neutral600">
        { formatMessage({ id: getTrad('plugin.name'), defaultMessage: 'Markets & Languages' }) }
      </Typography>
      <Box paddingTop={ 2 } paddingBottom={ 6 }>
        <Divider />
      </Box>
      <Stack spacing={ 2 }>
        <Box>
          <Select label={ formatMessage({ id: getTrad('settings.locales.modal.locales.label') }) } value={ value?.value } onChange={ handleChange }>
            <Option value={ value?.value } disabled startIcon={ hasDraftAndPublishEnabled ? <Bullet status={ currentLocaleStatus } /> : null }>
              { value?.label }
            </Option>
            { filteredOptions.map(option => {
              return (
                <Option key={ option.value } value={ option.value } startIcon={ hasDraftAndPublishEnabled ? <Bullet status={ option.status } /> : null }>
                  { option.label }
                </Option>
              );
            }) }
          </Select>
        </Box>
        <Box>
          <CopyLocale appLocales={ appLocales } currentLocale={ currentLocale } localizations={ localizations } readPermissions={ readPermissions } />
        </Box>
      </Stack>
    </Box>
  );
};

LocalePicker.defaultProps = {
  createPermissions: [],
  currentEntityId: null,
  currentLocaleStatus: 'did-not-create-locale',
  isSingleType: false,
  localizations: [],
  query: {},
  readPermissions: [],
};

LocalePicker.propTypes = {
  appLocales: PropTypes.array.isRequired,
  createPermissions: PropTypes.array,
  currentEntityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentLocaleStatus: PropTypes.string,
  hasDraftAndPublishEnabled: PropTypes.bool.isRequired,
  isSingleType: PropTypes.bool,
  localizations: PropTypes.array,
  query: PropTypes.object,
  readPermissions: PropTypes.array,
  setQuery: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};
