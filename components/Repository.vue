<template>
  <transition name="fade" mode="out-in" appear>
    <panel class="repo-container">
      <nuxt-link :to="repositoryFullName" class="repo-container__link">
        <h3 class="repo-container__name">{{ repositoryFullName }}</h3>
      </nuxt-link>
      <star-counter :starsCount="starsCount" />
      <a class="repo-container__github-link" :href="githubLink" target="_blank"
        >GitHub</a
      >
      <commit-date>{{ commitDate }}</commit-date>
    </panel>
  </transition>
</template>

<script>
import Panel from '@/components/Panel';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';
export default {
  props: ['repositoryFullName', 'githubLink', 'starsCount', 'commitDate'],

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
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  border: 4px solid #00000008;
  border-radius: 8px;
  background-color: #00000008;
  transition: opacity 0.3s linear;
}

.repo-container__link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.repo-container__link::before {
  content: url(../static/icons/book.svg);
  width: 16px;
  height: 16px;
  position: relative;
  margin-right: 8px;
}

.repo-container__link:hover {
  color: #ffc007;
}

.repo-container__name {
}
.repo-container__github-link {
  display: flex;
  align-items: center;
  line-height: 30px;
  font-size: 16px;
  text-decoration: none;
  color: #47494e;
  margin: 0 0 auto 0;
}
.repo-container__github-link:hover {
  color: #ffc007;
}
.repo-container__github-link::before {
  content: url(../static/icons/github-image.svg);
  width: 22px;
  height: 22px;
  position: relative;
  margin-right: 8px;
}
</style>
