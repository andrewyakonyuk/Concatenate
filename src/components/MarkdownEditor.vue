<template>
  <textarea ref="textarea"></textarea>
</template>

<script>
import CodeMirror from 'codemirror';
import '../../node_modules/codemirror/mode/gfm/gfm.js';
import '../../node_modules/codemirror/mode/javascript/javascript.js';
import '../../node_modules/codemirror/mode/htmlmixed/htmlmixed.js';
import '../../node_modules/codemirror/mode/css/css.js';
import '../../node_modules/codemirror/mode/clike/clike.js';

export default {
  name: 'MarkdownEditor',
  props: {
    initialContent: String,
  },
  watch: {
    content(newContent) {
      this.handerCodeChange(newContent);
    },
  },
  mounted() {
    this.codeMirror = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: false,
      lineWrapping: true,
      viewportMargin: Infinity,
      mode: {
        name: 'gfm',
        tokenTypeOverrides: {
          emoji: 'emoji',
        },
      },
    });

    if (this.initialContent) {
      this.codeMirror.setValue(this.initialContent);
    }

    this.codeMirror.on('change', (cm) => {
      this.content = cm.getValue();
      if (this.$emit) {
        this.$emit('input', this.content);
      }
    });

    this.$emit('ready', this.codemirror);
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.codeMirror.refresh();
      });
    },
    destroy() {
      // garbage cleanup
      const element = this.codeMirror.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
    },
    handerCodeChange(newVal) {
      const cmValue = this.codeMirror.getValue();
      if (newVal !== cmValue) {
        const scrollInfo = this.codeMirror.getScrollInfo();
        this.codeMirror.setValue(newVal);
        this.content = newVal;
        this.codeMirror.scrollTo(scrollInfo.left, scrollInfo.top);
      }
    },
  },
};
</script>

<style lang="scss">
  @import '~codemirror/lib/codemirror.css';
  @import '~codemirror/theme/idea.css';
  @import '~bulma/sass/utilities/initial-variables.sass';
  @import '~bulma/sass/utilities/derived-variables.sass';

  $minEditorHeight: 400px;

  .CodeMirror {
    border: 1px solid #dbdbdb;
    padding: 15px;
    height: auto;
    font-family: inherit;
    min-height: $minEditorHeight;

    .cm-header {
      color: black;
    }

    .cm-header-1 {
      font-size: 2em;
    }

    .cm-header-2 {
      font-size: 1.8em;
    }

    .cm-header-3 {
      font-size: 1.6em;
    }

    .cm-header-4 {
      font-size: 1.4em;
    }

    .cm-header-5 {
      font-size: 1.2em;
    }

    .cm-header-6 {
      font-size: 1em;
    }

    .cm-def,
    .cm-variable-1,
    .cm-variable-2,
    .cm-variable-3 {
      color: black;
    }

    .cm-tag {
      color: #800000;
    }

    .cm-attribute {
      color: #ff0000;
    }

    .cm-string {
      color: #0000ff;
    }
  }

  .CodeMirror-code {
    min-height: $minEditorHeight;
    height: auto;
  }

  .CodeMirror-focused {
    border-color: $link;
    box-shadow: 0 0 0 0.125em rgba($link, 0.25);
  }
</style>
