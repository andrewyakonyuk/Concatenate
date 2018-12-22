<template>
  <div ref="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'MarkdownEditor',
  props: {
    value: String,
  },
  data() {
    return {
      content: '',
    };
  },
  watch: {
    content(newContent) {
      this.handerContentChange(newContent);
    },
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.editor, {
      value: [
        this.value,
      ].join('\n'),
      language: 'markdown',
      formatOnPaste: true,
      renderWhitespace: 'boundary',
      wordWrap: 'on',
    });
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.editor.layout();
      });
    },
    destroy() {
      // garbage cleanup
      this.editor.dispose();
    },
    handerContentChange(newVal) {
      const oldValue = this.editor.getValue();
      if (newVal !== oldValue) {
        this.editor.setValue(newVal);
      }
    },
  },
};
</script>
