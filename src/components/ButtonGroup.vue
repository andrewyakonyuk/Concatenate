<template>
  <div class="buttons-group" ref="group">
    <div class="buttons is-right" ref="buttons">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isElementInViewport } from '@/util';
import _ from 'underscore';


export default {
  name: 'ButtonGroup',
  methods: {
    managePosition() {
      const $group = this.$refs.group;
      const $buttons = this.$refs.buttons;
      const groupRect = $group.getBoundingClientRect();
      const doStick = !isElementInViewport(groupRect);
      const groupOffset = {
        top: groupRect.top + document.body.scrollTop,
        left: groupRect.left + document.body.scrollLeft,
      };

      if (doStick) {
        $buttons.classList.add('is-sticked');
        $buttons.style.width = `${groupRect.width}px`;
        $buttons.style.left = `${groupOffset.left}px`;
      } else {
        $buttons.classList.remove('is-sticked');
        $buttons.style.width = '';
        $buttons.style.left = '';
      }
    },
  },
  mounted() {
    this.managePosition();

    this.debounceManagePosition = _.debounce(this.managePosition, 250);
    document.addEventListener('scroll', this.debounceManagePosition);
    window.addEventListener('resize', this.debounceManagePosition);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.debounceManagePosition);
    window.removeEventListener('resize', this.debounceManagePosition);
    this.debounceManagePosition = null;
  },
};
</script>

<style lang="scss">
  .buttons-group {
    min-height: 44px;
    padding: 0px 5px;
  }

  .buttons {

    &.is-sticked {
      position: fixed;
      bottom: 0;
      padding: 5px;
      z-index: 80;

        &:before {
          background: #fff;
          content: '';
          opacity: 0.85;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
        }
    }
  }
</style>
