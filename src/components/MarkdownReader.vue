<template>
  <div class="markdown-reader">
    <div class="content" v-html="compiledMarkdown">
    </div>
  </div>
</template>

<script>
import markdown from '@/util/markdown';

export default {
  name: 'MarkdownReader',
  props: {
    content: String,
  },
  computed: {
    compiledMarkdown() {
      return markdown.render(this.content);
    },
  },
};
</script>
