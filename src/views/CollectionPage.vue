<template>
  <div class="collection-page">
    <h1 class="title">
      Hero title {{ this.collectionId }}
    </h1>
    <div class="viewport">
      <nav class="document-list panel">
        <a class="panel-block is-active">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          bulma
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          marksheet
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          minireset.css
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-book" aria-hidden="true"></i>
          </span>
          jgthms.github.io
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-code-branch" aria-hidden="true"></i>
          </span>
          daniellowtw/infboard
        </a>
        <a class="panel-block">
          <span class="panel-icon">
            <i class="fas fa-code-branch" aria-hidden="true"></i>
          </span>
          mojs
        </a>
      </nav>
      <div class="document-view">
        <header>
        </header>
        <div class="content" v-html="compiledMarkdown">
        </div>
        <footer></footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import marked from 'marked';

const renderer = new marked.Renderer();

// Overriding default heading token by adding an embedded anchor tag like on GitHub.
let headerCount = 1;
renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
  const headerName = `${escapedText}-${headerCount++}`;
  return `
          <h${level}>
            <a name="${headerName}" class="anchor" href="#${headerName}">
              <span class="bd-anchor-link">#</span>
            </a>
            ${text}
          </h${level}>`;
};


export default {
  props: {
    collectionId: String,
  },
  data() {
    return {
      section: {},
      content: '',
    };
  },
  asyncData() {
    console.log(`async data ${this}`);
  },
  name: 'CollectionPage',
  beforeRouteUpdate(to, from, next) {
    next();
  },
  mounted() {
    console.log('mounted');
    axios
      .get('/data/example.md')
      .then(response => (this.content = response.data));
  },
  computed: {
    compiledMarkdown() {
      return marked(this.content, { sanitize: true, renderer });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";

  .document-list {
    display: block;
    width: 100%;
    margin-right: .8rem;
  }

  .document-view {
    display: none;
  }

  @media(min-width: $desktop) {
    .viewport {
      display: flex;
    }

    .document-list {
      flex: none;
      width: 33%;
      margin-right: .8rem;
    }

    .document-view {
      display: block;
      flex: none;
      width: 65.6666%;
    }
  }
</style>
