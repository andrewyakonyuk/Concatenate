<template>
  <div>
    <h2 class="title is-2">New document</h2>
    <div class="editor-wrapper">
      <div class="">
        <markdown-editor :initial-content="textValue"></markdown-editor>
      </div>
      <div class="buttons is-right" style="margin-top: 15px;">
        <button class="button is-success">Save changes</button>
        <button class="button is-info">Save and continue</button>
        <button class="button is-danger">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor.vue';

export default {
  name: 'DocumentEdit',
  components: {
    MarkdownEditor,
  },
  watch: {
    textValue(newValue) {
      console.log(newValue);
    },
  },
  data() {
    return {
      value: '# input',
      textValue: '# input',
    };
  },
};
</script>

<style lang="scss">
  .editor-wrapper {
    max-width: 768px;
  }
</style>
