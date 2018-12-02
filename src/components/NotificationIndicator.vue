<template>
  <div class="badge is-danger">
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
