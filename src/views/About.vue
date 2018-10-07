<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  asyncData({ store, route, progressBar }) {
    console.log({ store, route, progressBar });
    const promise = new Promise(((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }));

    return promise;
  },
};
</script>

