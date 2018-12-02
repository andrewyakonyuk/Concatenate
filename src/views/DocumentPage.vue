<template>
  <div id="document">
    Hero title {{ this.id }}
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  name: 'DocumentPage',
};
</script>

