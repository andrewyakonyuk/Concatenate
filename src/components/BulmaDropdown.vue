<template>
  <div class="dropdown" :class="{ 'is-active': isOpened }" @click="toggle">
    <div class="dropdown-trigger">
      <slot name="trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
          <span>{{ title || 'Content' }}</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </slot>
    </div>
    <div class="dropdown-menu" id="dropdown-menu2" role="menu">
      <div class="dropdown-content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BulmaDropdown',
  props: {
    title: String,
  },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

