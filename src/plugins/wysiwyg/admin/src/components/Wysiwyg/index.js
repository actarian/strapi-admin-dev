import { Box } from '@strapi/design-system/Box';
import { FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Extension } from '@tiptap/core';
import { Color as ColorExtension } from '@tiptap/extension-color';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import TableExtension from '@tiptap/extension-table';
import TableCellExtension from '@tiptap/extension-table-cell';
import TableHeaderExtension from '@tiptap/extension-table-header';
import TableRowExtension from '@tiptap/extension-table-row';
import TextAlignExtension from '@tiptap/extension-text-align';
import TextStyleExtension from '@tiptap/extension-text-style';
import UnderlineExtension from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getSettings } from "../../../../utils/api";
import Editor from '../Editor';

const Wysiwyg = ({ name, onChange, value, intlLabel, labelAction, disabled, error, description, required }) => {
  const { data: settings, isLoading } = useQuery('settings', getSettings);

  if (isLoading) {
    return null;
  }

  return (
    <WysiwygContent
      name={ name }
      onChange={ onChange }
      value={ value }
      intlLabel={ intlLabel }
      labelAction={ labelAction }
      disabled={ disabled }
      error={ error }
      description={ description }
      required={ required }
      settings={ settings }
    />
  )
}

const CSSColumnsExtension = Extension.create({
  name: 'cssColumns',
  addOptions() {
    return {
      types: [],
      columnTypes: [2, 3],
      defaultColumnType: 'two',
    };
  },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        cssColumns: {
          default: 1,
          renderHTML: attributes => {
            return {
              style: `column-count: ${attributes.cssColumns}`,
            }
          },
          parseHTML: element => element.style.columnCount || 1,
        },
      },
    }];
  },
  addCommands() {
    return {
      toggleColumns: (columnType) => ({ commands, editor }) => {
        if (!editor.isActive({ 'cssColumns': columnType })) return this.options.types.every((type) => commands.updateAttributes(type, { cssColumns: columnType }))
        return this.options.types.every((type) => commands.resetAttributes(type, 'cssColumns'))
      },
      unsetColumns: (columnType) => ({ commands }) => {
        return this.options.types.every((type) => commands.resetAttributes(type, 'cssColumns'))
      },
    };
  }
})


const WysiwygContent = ({ name, onChange, value, intlLabel, labelAction, disabled, error, description, required, settings }) => {
  const { formatMessage } = useIntl();
  const [mergedSettings, setMergedSettings] = useState(null);

  const editor = useEditor({
    extensions: [
      // Text
      StarterKit.configure({
        gapcursor: true,
        code: settings.code,
        codeBlock: settings.code,
        blockquote: settings.blockquote,
      }),
      UnderlineExtension,
      TextAlignExtension.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyleExtension,
      settings.color ? ColorExtension : null,

      // Links
      settings.links.enabled ? LinkExtension.configure({
        autolink: settings.links.autolink,
        openOnClick: settings.links.openOnClick,
        linkOnPaste: settings.links.linkOnPaste,
      }) : null,

      // Images
      settings.image.enabled ? ImageExtension.configure({
        inline: settings.image.inline,
        allowBase64: settings.image.allowBase64,
      }) : null,

      // Table
      settings.table ? TableExtension.configure({
        allowTableNodeSelection: true,
      }) : null,
      settings.table ? TableRowExtension : null,
      settings.table ? TableCellExtension : null,
      settings.table ? TableHeaderExtension : null,

      // CSS Columns
      CSSColumnsExtension.configure({
        types: ['paragraph']
      }),
    ],
    content: value,
    onUpdate(ctx) {
      onChange({ target: { name, value: ctx.editor.getHTML() } })
    },
  });

  useEffect(() => {
    return () => {
      console.log('WysiwygContent.cleanup');
      if (editor && editor.view) {
        editor.view.destroy();
      }
    };
  }, [editor]);

  if (editor === null) {
    return null
  }

  // Update content if value is changed outside (Mainly for i18n)
  if (editor !== null && editor.getHTML() !== value) {
    editor.commands.setContent(value)
  }

  return (
    <>
      <Stack spacing={ 1 }>
        <Box>
          <FieldLabel action={ labelAction } required={ required }> { formatMessage(intlLabel) }</FieldLabel>
        </Box>
        <Editor key="editor" name={ name } editor={ editor } settings={ settings } disabled={ disabled } value={ value } onChange={ onChange } />
        { error &&
          <Typography variant="pi" textColor="danger600">
            { formatMessage({ id: error, defaultMessage: error }) }
          </Typography>
        }
        { description &&
          <Typography variant="pi">
            { formatMessage(description) }
          </Typography>
        }
      </Stack>
    </>
  )
}

Wysiwyg.defaultProps = {
  description: '',
  disabled: false,
  error: undefined,
  intlLabel: '',
  required: false,
  value: '',
  settings: {}
};

Wysiwyg.propTypes = {
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  labelAction: PropTypes.object,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  settings: PropTypes.object
};

export default Wysiwyg;
