<template>
  <aside class="menu aside-menu" >
    <hamburger-button @hamburger-click="$emit('hamburger-click')"></hamburger-button>

    <ul class="menu-list is-block-mobile" style="display: none">
      <li><router-link active-class="is-active" to="/docs" exact>All</router-link></li>
      <li><router-link active-class="is-active" to="/docs/published">Published</router-link></li>
      <li><router-link active-class="is-active" to="/docs/drafts">Drafts</router-link></li>
      <li><router-link active-class="is-active" to="/docs/deleted">Deleted</router-link></li>
      <li>
        <router-link to="/docs/new" class="button is-success">
          New
        </router-link>
      </li>
    </ul>

    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><router-link active-class="is-active" to="/" exact>Home</router-link></li>
      <li><router-link active-class="is-active" to="/about">About</router-link></li>
    </ul>
    <p class="menu-label">
      Administration
    </p>
    <ul class="menu-list">
      <li><a>Team Settings</a></li>
      <li>
        <a>Manage Your Team</a>
        <ul>
          <li><a>Members</a></li>
          <li><a>Plugins</a></li>
          <li><a>Add a member</a></li>
        </ul>
      </li>
      <li><a>Invitations</a></li>
      <li><a>Cloud Storage Environment Settings</a></li>
      <li><a>Authentication</a></li>
    </ul>
    <p class="menu-label">
      Transactions
    </p>
    <ul class="menu-list">
      <li><a>Payments</a></li>
      <li><a>Transfers</a></li>
      <li><a>Balance</a></li>
    </ul>
  </aside>
</template>

<script>
import HamburgerButton from '@/components/HamburgerButton.vue';

export default {
  name: 'Sidebar',
  components: {
    HamburgerButton,
  },
};
</script>

<style lang="scss" scoped>

</style>
