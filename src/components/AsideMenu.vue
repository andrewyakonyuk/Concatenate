<template>
  <aside class="menu aside-menu" >
    <hamburger-button @hb-click="toggleDrawer" />
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
  name: 'AsideMenu',
  components: {
    HamburgerButton,
    WorkspaceGroup,
  },
  methods: {
    toggleDrawer(to) {
      this.$store.commit({
        type: 'ui/toggleDrawer',
        to,
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/bulma.scss";

.aside-menu {
  text-align: left;
  background-color: #363636;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  padding-left: 0.8rem;
  color: whitesmoke;
  min-height: 100vh;

  .button {
    border-radius: 2px 0 0 2px;
  }

  .hamburger-button {
    margin-top: .4rem;
  }

  .menu-list {
    a {
      transition: background-color .2s ease-in-out, border-color .2s ease-in-out;
      border-radius: 4px 0 0 4px;
    }

    .button {
      padding-top: calc(0.375em - 1px);
      padding-bottom: calc(0.375em - 1px);
      text-align: left;
      width: 100%;
      display: inline-block;
    }
  }

  .menu-label {
    margin-top: 1em;
    margin-bottom: 1rem;
    margin-left: .75rem;

    &:not(:last-child) {
      margin-bottom: .25rem;
    }
  }
}

@media(min-width: $tablet) {
  .aside-menu {
    padding-top: 0.8rem;

     .hamburger-button {
       display: none;
     }
  }
}

</style>
