<template>
  <p class="commit-date">
    Latest commit:
    <span class="commit-date__date"><slot /></span>
  </p>
</template>

<script>
export default {
  props: ['commitDate'],
};
</script>

<style scoped>
.commit-date {
  font-size: 12px;
  align-self: center;
  color: #47494e;
}

.commit-date__date {
  font-size: 12px;
  font-weight: bold;
  color: black;
}
</style>
