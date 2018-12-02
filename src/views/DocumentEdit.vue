<template>
  <div>
    <h2 class="title is-2">New document</h2>
    <div class="editor-wrapper">
      <div>
        <markdown-editor :initial-content="textValue"></markdown-editor>
      </div>
      <button-group class="buttons-group">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </button-group>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import ButtonGroup from '@/components/ButtonGroup.vue';

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
  beforeRouteLeave(to, from, next) {
    // eslint-disable-next-line
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style lang="scss">
  .editor-wrapper {
    max-width: 768px;
  }

  .buttons-group {
    margin-top: 0.5rem;
    margin-left: 1px;
    margin-right: 1px;
  }
</style>
