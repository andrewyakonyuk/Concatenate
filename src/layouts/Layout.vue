<template>
  <div id="app"
    :class="{ 'aside-menu-open': isSidebarOpen }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <sidebar @hamburger-click="toggleSidebar"></sidebar>

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>

    <main id="main">
      <header class="app-header">
        <hamburger-button @hamburger-click="toggleSidebar"></hamburger-button>
        <div class="search-box boxed">
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="search" placeholder="Find a document">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="search" />
              </span>
            </p>
          </div>
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
      <div class="main-content">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
import HamburgerButton from '@/components/HamburgerButton.vue';
import BulmaDropdown from '@/components/BulmaDropdown.vue';
import NotificationIndicator from '@/components/NotificationIndicator.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    HamburgerButton,
    BulmaDropdown,
    NotificationIndicator,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
  },
};
</script>
