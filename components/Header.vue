<template>
  <header class="header">
    <nuxt-link
      to="/"
      v-if="route.path !== '/'"
      class="header__logo header__logo_link"
      >github-dashboard</nuxt-link
    >
    <h1 v-else class="header__logo">github-dashboard</h1>
  </header>
</template>

<script setup>
const route = useRoute();
</script>

<style scoped>
.header {
  padding: 28px;
  border-bottom: 4px solid #000;
}
.header__logo {
  font-size: 40px;
  font-weight: 900;
  color: black;
  text-decoration: none;
}
.header__logo_link:hover {
  text-decoration: underline;
}
</style>
