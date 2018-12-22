<template>
<div :class="{ 'panel-is-open': isOpen }">
  <aside class="aside-panel">
    <header>
      <button class="button is-icon" @click="togglePanel(false)">
        <span class="icon is-small">
          <font-awesome-icon icon="times" />
          <font-awesome-icon icon="arrow-left" />
        </span>
      </button>
    </header>
    <div class="panel-content">
    </div>
  </aside>
  <div class="panel-catcher" @click="togglePanel(false)"></div>
</div>
</template>

<script>
export default {
  name: 'AsidePanel',
  computed: {
    isOpen() {
      return this.$store.state.ui.panel.isOpen;
    },
  },
  methods: {
    togglePanel(to) {
      this.$store.dispatch({
        type: 'ui/togglePanel',
        to,
      });
    },
  },
  watch: {
    $route() {
      this.togglePanel(false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/bulma.scss';
$drawerMenuWidth: 18rem;

.aside-panel {
  padding: .4rem .8rem;
  text-align: left;
  position: fixed;
  width: 100%;
  z-index: 110;
  top: 0;
  border-right: 1px solid #eaecef;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform .2s ease;
  will-change: transform;
  box-shadow: inset -1px 0 0 rgba(0,0,0,.1);
  background-color: whitesmoke;

  .fa-times {
    display: none;
  }

  .fa-arrow-left {
    display: inline;
  }
}

.panel-catcher {
  position: fixed;
  z-index: 75;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: none;
}

.panel-is-open {
  .aside-panel {
    transform: translateX(0);
  }
}

@media(min-width: $tablet) {
  .aside-panel {
    padding: .8rem .4rem;
    width: $drawerMenuWidth;
    transform: translateX(-100%);
    z-index: 90;

    .fa-times {
      display: inline;
    }

    .fa-arrow-left {
      display: none;
    }
  }

  .panel-is-open {
    .aside-panel {
      transform: translateX($drawerMenuWidth);
    }

    .panel-catcher {
      display: block;
    }
  }
}
</style>
