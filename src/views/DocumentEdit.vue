<template>
  <div class="document-edit-page">
    <h2 class="title is-2">New document</h2>
    <div class="editor-wrapper" ref="wrapper">
      <markdown-editor ref="editor" :value="textValue" style="height: 100%;"></markdown-editor>
      <footer ref="footer">
        <button-group class="buttons-group">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </button-group>
      </footer>
    </div>
  </div>
</template>

<script>
import _ from 'underscore';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';
import { getWindowBoundingRect } from '@/util';

export default {
  name: 'DocumentEdit',
  components: {
    MarkdownEditor,
    ButtonGroup,
  },
  data() {
    return {
      value: '# input',
      textValue: '# input',
    };
  },
  mounted() {
    this.refreshLayout();

    this.optimizedRefreshLayout = _.debounce(this.refreshLayout, 100);
    window.addEventListener('resize', this.optimizedRefreshLayout);
  },
  beforeRouteLeave(to, from, next) {
    // eslint-disable-next-line
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  methods: {
    refreshLayout() {
      const wrapperRect = this.$refs.wrapper.getBoundingClientRect();
      const windowRect = getWindowBoundingRect();

      const footerRect = this.$refs.footer.getBoundingClientRect();
      let editorHeight = windowRect.height - wrapperRect.top - footerRect.height - 15;
      editorHeight = Math.max(editorHeight, 400);
      this.$refs.wrapper.style.height = `${editorHeight}px`;
      this.$refs.editor.refresh();
    },
  },
};
</script>

<style lang="scss">
  .document-edit-page {
    display: flex;
    flex-flow: column;
  }

  .buttons-group {
    margin-top: 0.5rem;
    margin-left: 1px;
    margin-right: 1px;
  }
</style>
