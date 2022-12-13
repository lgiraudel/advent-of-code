const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'Create day',
    defaultCase: '(pascalCase)',
    entry: {
      folderPath: './tools/templates/',
    },
    stringReplacers: [
      { question: 'Year?', slot: '__year__'},
      { question: 'Day?', slot: '__day__'},
    ],
    output: {
      path: './__year__/__day__/',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: true,
    },
  },
]);