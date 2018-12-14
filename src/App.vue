<template>
  <div id="app">
    <drawer>
      <template slot="aside">
        <aside-menu />
      </template>
      <template slot="content">
        <aside-panel />
        <div>
          <app-header />
          <main>
            <router-view />
          </main>
        </div>
      </template>
    </drawer>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer.vue';
import AsideMenu from '@/components/AsideMenu.vue';
import AsidePanel from '@/components/AsidePanel.vue';
import HamburgerButton from '@/components/HamburgerButton.vue';
import AppHeader from '@/components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    Drawer,
    AppHeader,
    AsideMenu,
    AsidePanel,
    HamburgerButton,
  },
};
</script>

<style lang="scss">
@import './styles/default.scss';

main {
  margin: 0 auto;
  padding: .8rem 1.4rem;
}

@media(min-width: $tablet) {
  main {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
