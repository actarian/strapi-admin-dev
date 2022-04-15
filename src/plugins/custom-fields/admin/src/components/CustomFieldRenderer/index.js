import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
import React, { useState } from 'react';
import useLocales from '../../hooks/useLocales';

const DEFAULT_LANG = 'en';

const Field = (props) => {
  const { name, value, attribute, onChange } = props;

  const { locales } = useLocales();
  const defaultLang = locales.length ? locales[0].code : DEFAULT_LANG;
  const [lang, setLang] = useState(defaultLang);

  // All our custom field config are here
  const { placeholder, label, hint } = attribute.customFieldConfig || {};

  console.log('CustomFieldRenderer', props, attribute.customFieldConfig, locales);

  const serialize = (value) => {
    return JSON.stringify(value);
  };

  const deserialize = (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return {};
    }
  };

  const deserializedValue = deserialize(value);

  const getValue = () => {
    return deserializedValue[lang] || '';
  };

  const setValue = (value) => {
    deserializedValue[lang] = value;
    return serialize(deserializedValue);
  };


  const getIconButtonStyle = (locale) => ({
    color: locale.code === lang ? 'red' : 'white'
  });

  return (
    <>
      <TextInput
        id={ name } name={ name } label={ label || name }
        placeholder={ placeholder } hint={ hint } value={ getValue() }
        onChange={ event => {
          const change = {
            target: {
              name,
              value: setValue(event.target.value),
            },
          };
          onChange(change);
        } }
      />
      { false && locales.map(locale => (
        <Button key={ locale.id } onClick={ () => alert('hello' + locale.id) } title={ locale.name }>{ locale.code }</Button>
      )) }
      {
        <Box paddingTop={ 1 }>
          <IconButtonGroup>
            { locales.map(locale => (
              <IconButton key={ locale.id } onClick={ () => setLang(locale.code) } label={ locale.name } icon={ <Typography variant="sigma" style={ getIconButtonStyle(locale) }> { locale.code } </Typography> } />
            )) }
          </IconButtonGroup>
        </Box>
      }
    </>
  );
}

export default Field;
