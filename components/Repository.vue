<template>
  <panel class="repo-container">
    <h3 class="repo-container__name">Repository Name</h3>
    <star-counter />
    <commit-date />
    <a class="github-link" href="https://github.com">GitHub</a>
  </panel>
</template>

<script>
import Panel from '@/components/Panel';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';
export default {
  components: {
    panel: Panel,
    'star-counter': StarCounter,
    'commit-date': CommitDate,
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
