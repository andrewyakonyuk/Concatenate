<template>
  <header class="app-header">
    <hamburger-button @hb-click="toggleDrawer"></hamburger-button>
    <div class="search-box boxed">
      <p class="control">
        <input class="search-input input" type="search" placeholder="Find a document">
      </p>
    </div>
    <router-link to="/docs/new" class="new-document boxed button is-success">
      <span class="icon is-small is-left">
        <font-awesome-icon icon="plus-circle" />
      </span>
      <span>New</span>
    </router-link>
    <bulma-dropdown class="user-info boxed is-right">
      <template slot="trigger">
        <figure class="image is-32x32">
          <img src="https://avatars0.githubusercontent.com/u/1595380?s=40&amp;v=4">
        </figure>
        <notification-indicator></notification-indicator>
      </template>
      <template slot="content">
        <div class="dropdown-item">
          <p>You can insert <strong>any type of content</strong> within the dropdown menu.</p>
        </div>
        <hr class="dropdown-divider">
        <div class="dropdown-item">
          <p>You simply need to use a <code>&lt;div&gt;</code> instead.</p>
        </div>
        <hr class="dropdown-divider">
        <a href="#" class="dropdown-item">
          This is a link
        </a>
      </template>
    </bulma-dropdown>
  </header>
</template>

<script>
import HamburgerButton from '@/components/HamburgerButton.vue';
import BulmaDropdown from '@/components/Bulma/Dropdown.vue';
import NotificationIndicator from '@/components/NotificationIndicator.vue';

export default {
  name: 'AppHeader',
  components: {
    HamburgerButton,
    BulmaDropdown,
    NotificationIndicator,
  },
  methods: {
    toggleDrawer(to) {
      this.$store.dispatch({
        type: 'ui/toggleDrawer',
        to,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/bulma.scss";

.app-header {
  padding: .4rem 1.4rem;
  display: flex;

  .hamburger-button {
    margin-left: -.7rem;
    margin-right: .4rem;
  }

  .search-box {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: center;

    .control {
      display: flex;
      justify-content: center;
    }

    .search-input {
      background-color: whitesmoke;
      padding: 0 1.5em;

      &:focus, &:active {
        background-color: transparent;
      }
    }
  }

  .boxed {
    margin-right: 0.8rem;

    &:last-child {
      margin-right: 0;
    }
  }
}

@media(min-width: $tablet) {
  .hamburger-button {
    display: none;
  }

  .app-header {
    padding-top: .8rem;
    padding-bottom: .8rem;
  }

  .app-actions {
    display: block;
  }

  .search-input {
      max-width: 380px;
  }
}

</style>
