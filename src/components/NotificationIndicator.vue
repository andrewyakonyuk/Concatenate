<template>
  <div class="notification-indicator">
    {{ count }}
  </div>
</template>

<script>
export default {
  name: 'NotificationIndicator',
  data() {
    return {
      count: 50,
    };
  },
};
</script>


<style lang="scss" scoped>
  .notification-indicator{
    position: absolute;
    z-index: 100;
    top: -.5em;
    left: 110%;
    margin: 0 0 0 -1.5em !important;
    background-color: #db2828;
    text-transform: none;
    font-weight: 700;
    padding: .1em .4em;
    border-radius: .28571429rem;
    color: white;
    font-size: .8em;
  }
</style>

