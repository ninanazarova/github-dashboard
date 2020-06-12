<template>
  <panel class="repo-container">
    <h3 class="repo-container__name">Repository Name</h3>
    <star-counter />
    <p class="repo-container__commit-date">Latest commit: 20.02.20</p>
    <a class="github-link" href="https://github.com">GitHub</a>
  </panel>
</template>

<script>
import Panel from '@/components/Panel';
import StarCounter from '@/components/ui/StarCounter';
export default {
  components: {
    panel: Panel,
    'star-counter': StarCounter,
  },
};
</script>

<style scoped>
.repo-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
</style>
