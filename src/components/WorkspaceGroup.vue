<template>
  <div class="workspace-group">
    <p class="menu-label">
      workspace
    </p>
    <ul class="menu-list">
      <li v-for="item in collections" :key="item.id">
        <router-link
          :to="{ name: 'collection-page', params: { collectionId: item.id}}"
          active-class="is-active">
          {{ item.title}}
        </router-link>
      </li>
      <li>
        <button class="button is-success is-outlined is-borderless"
          style="font-weight: 600"
          @click="addNewCollection">
          <span class="icon is-small">
            <font-awesome-icon icon="plus-circle"/>
          </span>
          <span>add collection</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceGroup',
  computed: {
    collections() {
      return this.$store.state.collections;
    },
  },
  methods: {
    addNewCollection() {
      this.$store.dispatch('addNewCollection');
    },
  },
};
</script>
