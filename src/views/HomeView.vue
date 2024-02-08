
<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the Home page</p>
    <button @click="goToDaybook" class="btn btn-primary">boton</button>
    <button @click="goToDaybook" class="btn btn-secondary">boton</button>
    <button @click="goToDaybook" class="btn btn-success">boton</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry'});
    },
  },
};
</script>