import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import { BubbleMenu, EditorContent } from '@tiptap/react';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { AiOutlineDelete, AiOutlineDeleteColumn, AiOutlineDeleteRow, AiOutlineInsertRowAbove, AiOutlineInsertRowBelow, AiOutlineInsertRowLeft, AiOutlineInsertRowRight, AiOutlineMergeCells, AiOutlineSplitCells } from 'react-icons/ai';
import MediaLib from "../MediaLib";
import Wrapper from './styles.js';
import { Toolbar } from "./Toolbar";

const TableMenuBar = (editor) => {
  return (
    <Fragment key="tableMenubar">
      <IconButtonGroup className="button-group">
        <IconButton
          icon={ <AiOutlineInsertRowBelow /> }
          label="Insert row below"
          onClick={ () => editor.chain().focus().addRowAfter().run() }
        />
        <IconButton
          icon={ <AiOutlineInsertRowAbove /> }
          label="Insert row above"
          onClick={ () => editor.chain().focus().addRowBefore().run() }
        />

        <IconButton
          icon={ <AiOutlineInsertRowLeft /> }
          label="Insert Column to the left"
          onClick={ () => editor.chain().focus().addColumnBefore().run() }
        />

        <IconButton
          icon={ <AiOutlineInsertRowRight /> }
          label="Insert Column to the right"
          onClick={ () => editor.chain().focus().addColumnAfter().run() }
        />
      </IconButtonGroup>

      <IconButtonGroup className="button-group">
        <IconButton
          icon={ <AiOutlineDeleteRow /> }
          label="Delete row"
          onClick={ () => editor.chain().focus().deleteRow().run() }
        />
        <IconButton
          icon={ <AiOutlineDeleteColumn /> }
          label="Delete column"
          onClick={ () => editor.chain().focus().deleteColumn().run() }
        />
      </IconButtonGroup>

      <IconButtonGroup className="button-group">
        <IconButton
          icon={ <AiOutlineMergeCells /> }
          label="Merge cells"
          onClick={ () => editor.chain().focus().mergeCells().run() }
        />
        <IconButton
          icon={ <AiOutlineSplitCells /> }
          label="Split cells"
          onClick={ () => editor.chain().focus().splitCell().run() }
        />
      </IconButtonGroup>

      <IconButtonGroup className="button-group">
        <IconButton
          icon={ <AiOutlineDelete /> }
          label="Delete table"
          onClick={ () => {
            if (window.confirm('Are you sure you want to delete the table?')) {
              editor.chain().focus().deleteTable().run()
            }
          } }
        />
      </IconButtonGroup>
    </Fragment>
  )
}


// Floating bubble menu for table
const BubbleMenuComponent = ({ editor, toggleMediaLib }) => {
  if (editor) {
    let menuBars = []

    if (editor.isActive('table')) {
      menuBars.push(TableMenuBar(editor))
    }

    return (
      <BubbleMenu editor={ editor } tippyOptions={ { zIndex: 2, maxWidth: '450px' } }>
        { menuBars.length ? (
          <Flex padding={ 2 } className="menu-bar floating" style={ { flexWrap: 'wrap' } }>
            {/* Render menu bars */ }
            { menuBars }
          </Flex>
        ) : null }
      </BubbleMenu>
    )
  }
  return null
}

const Editor = ({ onChange, name, value, editor, disabled, settings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [forceInsert, setForceInsert] = useState(false);

  const onMediaLibToggle = () => setIsOpen(prev => !prev);

  const onMediaLibChange = (assets) => {
    if (!forceInsert && editor.isActive('image')) {
      assets.map(asset => {
        if (asset.mime.includes('image')) {
          editor.chain().focus().setImage({ src: asset.url }).run()
        }
      })
    } else {
      assets.map(asset => {
        if (asset.mime.includes('image')) {
          editor.commands.setImage({ src: asset.url, alt: asset.alt })
        }
      });
    }
    setForceInsert(false);
    onMediaLibToggle();
  };

  // Wait till we have the settings before showing the editor
  if (!editor || !settings) {
    return null
  }

  return (
    <Wrapper>
      <Box hasRadius={ true } overflow={ 'hidden' } borderWidth="1px" borderStyle="solid" borderColor="neutral200">
        <Toolbar editor={ editor } toggleMediaLib={ onMediaLibToggle } settings={ settings } />
        <BubbleMenuComponent editor={ editor } toggleMediaLib={ onMediaLibToggle } />
        <Box padding={ 2 } background="neutral0" maxHeight={ '600px' } style={ { resize: 'vertical', overflow: 'auto' } }>
          <EditorContent editor={ editor } />
        </Box>
      </Box>
      <MediaLib isOpen={ isOpen } onChange={ onMediaLibChange } onToggle={ onMediaLibToggle } />
    </Wrapper>
  );
};

Editor.defaultProps = {
  value: '',
  disabled: false
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  editor: PropTypes.object.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  settings: PropTypes.object
};

export default Editor;
