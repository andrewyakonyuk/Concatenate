<template>
  <div class="markdown-reader">
    <div class="content"  v-html="compiledMarkdown">
    </div>
  </div>
</template>

<script>
import marked from 'marked';

const renderer = new marked.Renderer();

// Overriding default heading token by adding an embedded anchor tag like on GitHub.
let headerCount = 1;
renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  const headerName = `${escapedText}-${headerCount += 1}`;
  return `
          <h${level}>
            <a name="${headerName}" class="anchor" href="#${headerName}">
              <span class="bd-anchor-link">#</span>
            </a>
            ${text}
          </h${level}>`;
};

export default {
  name: 'MarkdownReader',
  props: {
    content: String,
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitize: true, renderer });
    },
  },
};
</script>
