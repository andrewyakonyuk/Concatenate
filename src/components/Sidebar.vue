<template>
  <aside class="menu aside-menu" >
    <div class="aside-menu-header">
      <hamburger-button @hamburger-click="$emit('hamburger-click')"></hamburger-button>
    </div>
    <ul class="menu-list is-block-mobile" style="display: none">
      <li><router-link active-class="is-active" to="/docs" exact>All</router-link></li>
      <li><router-link active-class="is-active" to="/docs/published">Published</router-link></li>
      <li><router-link active-class="is-active" to="/docs/drafts">Drafts</router-link></li>
      <li><router-link active-class="is-active" to="/docs/deleted">Deleted</router-link></li>
      <li>
        <router-link to="/docs/new" class="button is-success is-outlined is-borderless">
          <span class="icon is-small">
            <font-awesome-icon icon="feather-alt"/>
          </span>
          <span>New</span>
        </router-link>
      </li>
    </ul>
    <ul class="menu-list">
      <li><router-link active-class="is-active" to="/" exact>Home</router-link></li>
      <li><router-link active-class="is-active" to="/about">About</router-link></li>
    </ul>
    <workspace-group></workspace-group>
  </aside>
</template>

<script>
import HamburgerButton from '@/components/HamburgerButton.vue';
import WorkspaceGroup from '@/components/WorkspaceGroup.vue';

export default {
  name: 'Sidebar',
  components: {
    HamburgerButton,
    WorkspaceGroup,
  },
};
</script>

<style lang="scss" scoped>

</style>
