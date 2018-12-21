<template>
  <div class="collection-page" :class="{ 'document-opened' : isDocumentOpened }">
    <h1 class="title">
      <router-link :to="{ name: 'collection-page', params: { collectionId }}">
        <span class="icon">
          <font-awesome-icon icon="arrow-left"/>
        </span>
        <span>
        {{ collectionTitle }}
        </span>
      </router-link>
    </h1>
    <div class="viewport">
      <nav class="document-list">
        <router-link
          v-for="item in documents"
          :key="item.id"
          class="list-item"
          active-class="is-active"
          :to="{ name: 'document-page', params: { documentId: item.id }}">
          {{ item.title }}
        </router-link>
      </nav>
      <div class="document-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionPage',
  props: {
    collectionId: String,
  },
  data() {
    return {
      isDocumentOpened: false,
      documents: [
        {
          id: 'example',
          title: 'example',
        },
        {
          id: 'amp',
          title: 'amp',
        },
        {
          id: 'graphql',
          title: 'graphql',
        },
        {
          id: 'releasenotes',
          title: 'release notes',
        },
        {
          id: '4',
          title: 'jgthms.github.io',
        },
      ],
    };
  },
  // then, in the parent component,
  // watch the `$route` to determine the transition to use
  watch: {
    $route(to) {
      this.isDocumentOpened = to.name === 'document-page';
    },
  },
  computed: {
    collectionTitle() {
      const collection = this.$store.getters.getCollectionById(this.collectionId);
      if (collection) { return collection.title; }
      return 'Nothing';
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/_all.sass";

  .title {
    margin-bottom: 1.3rem;

    a {
      color: inherit;
    }

    .svg-inline--fa {
      height: inherit;
    }
  }

  .document-list {
    display: block;
    margin-right: -.75rem;
    margin-left: -.75rem;
    line-height: 20px;
  }

  .list-item {
    display: flex;
    justify-content: flex-start;
    padding: 0.5em 0.75em;
    border-radius: 4px;
    transition: background-color .2s ease-in-out, border-color .2s ease-in-out;

     &.is-active {
      background-color: #3273dc;
      color: #fff;
    }
  }

  .document-view {
    display: none;
  }

  .document-opened {
    .document-list {
      display: none;
    }

    .document-view {
      display: block;
    }
  }

  @media(min-width: $desktop) {
    .viewport {
      display: flex;
    }

    .document-list {
      flex: none;
      width: 33%;
      margin-right: .8rem;
      display: block;
    }

    .document-view {
      display: block;
      flex: none;
      width: 66.6665%;
    }

    .document-opened {
      .document-list, .document-view {
        display: block;
      }
    }
  }
</style>
