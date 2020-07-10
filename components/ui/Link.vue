<template>
  <a class="github-link" target="_blank" :href="githubLink">
    <slot />
  </a>
</template>

<script>
export default {
  props: ['githubLink'],
};
</script>

<style scoped>
.github-link {
  font-size: 14px;
  font-weight: normal;
  color: black;
  cursor: pointer;
  text-decoration: none;
}

.github-link:hover {
  text-decoration: underline;
}

.github-link::before {
  content: url(../../static/icons/github-image.svg);
  width: 14px;
  height: 14px;
  position: relative;
  margin-right: 4px;
}
</style>
