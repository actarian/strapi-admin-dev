module.exports = {
  'mktlng': { enabled: true, resolve: './src/plugins/mktlng' },
  'pages': { enabled: true, resolve: './src/plugins/pages' },
  'wysiwyg': { enabled: true, resolve: './src/plugins/wysiwyg' },

  'custom-fields': { enabled: false, resolve: './src/plugins/_custom-fields' },
  'localized-text': { enabled: false, resolve: './src/plugins/_localized-text' },
  'react-editorjs': { enabled: false, resolve: './src/plugins/_react-editorjs' },
  'wysiwyg-tui-editor': { enabled: false, resolve: './src/plugins/_wysiwyg-tui-editor' },
};
