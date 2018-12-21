module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['prismjs', {
      languages: [
        'javascript',
        'css',
        'markup',
        'graphql',
        'csharp',
        'json',
        'sql',
        'yaml',
        'diff',
        'markdown',
        'http',
      ],
      plugins: ['line-numbers'],
      theme: 'tomorrow',
      css: true,
    }],
  ],
};
