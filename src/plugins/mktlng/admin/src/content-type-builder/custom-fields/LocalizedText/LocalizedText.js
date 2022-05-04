import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import { Textarea } from '@strapi/design-system/Textarea';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
import React, { useState } from 'react';
import useLocales from '../../../hooks/useLocales/useLocales';

const DEFAULT_LANG = 'en';

export function LocalizedText(props) {
  const { name, value, attribute, onChange } = props;

  const { locales } = useLocales();
  const defaultLocale = locales.find(x => x.isDefault);
  const defaultLang = defaultLocale ? defaultLocale.code : DEFAULT_LANG;
  const [lang, setLang] = useState(defaultLang);

  // All our custom field config are here
  const customField = attribute.customField || {};
  const { placeholder, label, hint, forType } = customField;

  // console.log('LocalizedText', props, customField, locales);

  const serialize = (value) => {
    return JSON.stringify(value);
  };

  const deserialize = (value) => {
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return {};
      }
    }
    return {};
  };

  const deserializedValue = deserialize(value);

  const getLocale = () => {
    return deserializedValue[lang] || '';
  };

  const setLocale = (value) => {
    deserializedValue[lang] = value;
    return serialize(deserializedValue);
  };

  const getTextColor = (locale) => {
    return locale.code === lang ? 'primary600' : 'neutral800';
  }

  const localizedValue = getLocale();

  const onValidate = () => {
    return undefined;
    // return localizedValue.length < 5 ? 'Content is too short' : undefined
  }

  const onValues = (event) => {
    const change = {
      target: {
        name,
        value: setLocale(event.target.value),
      },
    };
    onChange(change);
  };

  return (
    <>
      { forType === 'string' ? <TextInput
        id={ name } name={ name } label={ label || name }
        placeholder={ placeholder } hint={ hint } error={ onValidate() } value={ localizedValue } onChange={ onValues }
      /> : <Textarea
        id={ name } name={ name } label={ label || name }
        placeholder={ placeholder } hint={ hint } error={ onValidate() } value={ getLocale() } onChange={ onValues }>{ localizedValue }</Textarea> }
      { false && locales.map(locale => (
        <Button key={ locale.id } onClick={ () => setLang(locale.code) } title={ locale.name }>{ locale.code }</Button>
      )) }
      {
        <Box paddingTop={ 1 }>
          <IconButtonGroup>
            { locales.map(locale => (
              <IconButton key={ locale.id } onClick={ () => setLang(locale.code) } label={ locale.name } icon={ <Typography variant="sigma" textColor={ getTextColor(locale) }> { locale.code } </Typography> } />
            )) }
          </IconButtonGroup>
        </Box>
      }
    </>
  );
}
