<template>
  <a
    :class="['github-link', `${classname}`, `repository__${elem}-link`]"
    target="_blank"
    :href="githubLink"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: ['githubLink', 'classname', 'elem'],
};
</script>

<style scoped>
.github-link {
  color: black;
  cursor: pointer;
  text-decoration: none;
}

.github-link:hover {
  text-decoration: underline;
}

.github-link::before {
  content: '';
  background-image: url(../../public/icons/github-image.svg);
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 4px;
  display: inline-block;
  position: relative;
}

.repo-container__github-link {
  font-size: 14px;
  line-height: 20px;
}

.repo-container__github-link::before {
  width: 12px;
  height: 12px;
  top: 1px;
  left: 0;
}

.repository__name-link {
  font-size: 28px;
  font-weight: 900;
}

.repository__name-link::before {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  top: 2px;
  left: 0;
}

.repository__owner-link {
  margin-top: 8px;
}

.repository__owner-link::before {
  width: 16px;
  height: 16px;
  top: 2px;
  left: 0;
}
</style>
