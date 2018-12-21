import container from 'markdown-it-container';

function createContainer(name, defaultTitle, klass) {
  return [container, name, {
    render(tokens, idx) {
      const token = tokens[idx];
      const info = token.info.trim().slice(name.length).trim();

      if (token.nesting === 1) {
        return `<div class="notification is-${klass}"><p class="notification-title">${info || defaultTitle}</p>\n`;
      }
      return '</div>\n';
    },
  }];
}

function containers(md) {
  md
    .use(...createContainer('tip', 'TIP', 'primary'))
    .use(...createContainer('warning', 'WARNING', 'warning'))
    .use(...createContainer('danger', 'WARNING', 'danger'))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens, idx) => (tokens[idx].nesting === 1
        ? '<div v-pre>\n'
        : '</div>\n'),
    })
    .use(container, 'vue', {
      render: (tokens, idx) => (tokens[idx].nesting === 1
        ? '<pre class="vue-container"><code>'
        : '</code></pre>'),
    });
}

export default containers;
