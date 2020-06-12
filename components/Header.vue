<template>
  <header class="header">
    <nuxt-link to="/" v-if="$route.path !== '/'" class="header__logo">github-dashboard</nuxt-link>
    <h1 v-else class="header__logo">github-dashboard</h1>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  padding: 28px;
  border-bottom: 4px solid #000;
}
.header__logo {
  font-size: 36px;
  font-weight: 800;
  color: black;
  text-decoration: none;
}
</style>
