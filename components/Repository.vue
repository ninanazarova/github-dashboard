<template>
  <transition name="fade" mode="out-in" appear>
    <Panel class="repo-container">
      <div class="repo-container__column repo-container__column_left">
        <NuxtLink
          :to="`/user-${repositoryUser}/${repositoryName}`"
          class="repo-container__link"
        >
          <span class="repo-container__name">{{
            repositoryUser + ' / ' + repositoryName
          }}</span>
        </NuxtLink>
        <Link :classname="'repo-container__github-link'" :href="githubLink"
          >GitHub</Link
        >
      </div>

      <div class="repo-container__column repo-container__column_right">
        <StarCounter
          class="repo-container__star-count"
          :starsCount="starsCount"
        />
        <commitDate class="repo-container__commit-date">
          {{ commitDate }}
        </commitDate>
      </div>
    </Panel>
  </transition>
</template>

<script setup>
import Panel from '@/components/Panel';
import Link from '@/components/ui/Link';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';
import { defineProps } from 'vue';

const props = defineProps([
  'repositoryUser',
  'repositoryName',
  'githubLink',
  'starsCount',
  'commitDate',
]);
</script>

<style scoped>
.repo-container {
  display: flex;
  justify-content: space-between;
  background-color: #00000008;
  transition: opacity 0.3s linear;
  color: black;
  min-height: 128px;
  font-weight: 300;
}

.repo-container__name {
  line-height: normal;
  font-size: 20px;
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
  color: black;
  text-decoration: none;
}

.repo-container__link:hover {
  text-decoration: underline;
}

.repo-container__commit-date {
  line-height: 18px;
  font-size: 14px;
  margin-top: 12px;
}
</style>
