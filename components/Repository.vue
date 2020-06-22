<template>
  <transition name="fade" mode="out-in" appear>
    <panel class="repo-container">
      <div class="repo-container__column repo-container__column_left">
        <nuxt-link :to="repositoryFullName" class="repo-container__link"
          ><span class="repo-container__name"> {{ repositoryTitle }}</span>
        </nuxt-link>
        <a
          class="repo-container__github-link"
          :href="githubLink"
          target="_blank"
          >GitHub</a
        >
      </div>

      <div class="repo-container__column repo-container__column_right">
        <star-counter
          class="repo-container__star-count"
          :starsCount="starsCount"
        />
        <commit-date class="repo-container__commit-date">{{
          commitDate
        }}</commit-date>
      </div>
    </panel>
  </transition>
</template>

<script>
import Panel from '@/components/Panel';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';
export default {
  props: [
    'repositoryTitle',
    'repositoryFullName',
    'githubLink',
    'starsCount',
    'commitDate',
  ],

  components: {
    panel: Panel,
    'star-counter': StarCounter,
    'commit-date': CommitDate,
  },
};
</script>

<style scoped>
.repo-container {
  display: flex;
  justify-content: space-between;

  border: 4px solid #00000008;
  border-radius: 8px;
  background-color: #00000008;
  transition: opacity 0.3s linear;
  color: #47494e;
}

.repo-container a {
  color: #47494e;
  font-weight: bold;
  text-decoration: none;
}

.repo-container a:hover {
  color: #d1a209;
}

.repo-container__name {
  line-height: normal;
}
.repo-container__column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.repo-container__column_left {
  max-width: 60%;
}
.repo-container__column_right {
  max-width: 32%;
}

.repo-container__link {
  cursor: pointer;
  line-height: 25px;
  font-size: 20px;
}

.repo-container__github-link::before {
  content: url(../static/icons/github-image.svg);
  width: 16px;
  height: 16px;
  position: relative;
  margin-right: 8px;
}

.repo-container__github-link {
  line-height: 20px;
  font-size: 16px;

  margin-top: 12px;
}

.repo-container__star-count {
  line-height: 25px;
  font-size: 20px;
}

.repo-container__commit-date {
  line-height: 18px;
  font-size: 14px;
  margin-top: 12px;
}
</style>
