<template>
  <div id="document">
    <header>
    </header>
    <markdown-reader :content="document"></markdown-reader>
    <footer></footer>
  </div>
</template>

<script>
import axios from 'axios';
import MarkdownReader from '@/components/MarkdownReader.vue';

export default {
  name: 'DocumentPage',
  props: {
    documentId: String,
  },
  components: {
    MarkdownReader,
  },
  data() {
    return {
      document: '',
      loading: false,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios
        .get(`/data/${this.documentId}.md`)
        .then(response => (this.document = response.data))
        .catch(response => (this.document = 'Not found :('));
    },
  },
};
</script>

