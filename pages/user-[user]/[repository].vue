<template>
  <main class="repository">
    <div v-if="repoLoad">Loading...</div>
    <Panel class="repository__panel">
      <template v-if="repoErr">
        <h1 class="repository__name">{{ route.params.repository }}</h1>
        <div>{{ repoErr }}</div>
      </template>

      <h1 v-else class="repository__name">
        <Link :elem="'name'" :githubLink="repository.html_url">{{
          repository.name
        }}</Link>
      </h1>

      <div v-if="!repoLoad && !repoErr" class="flex-container">
        <div class="flex-container_column_left">
          <div class="repository__information">
            <h2 class="title">Description</h2>

            <p class="repository__description">{{ repository.description }}</p>

            <CommitDate class="repository__commit-date">
              {{ repository.pushed_at }}
            </CommitDate>

            <StarCounter
              class="repository__star-container"
              :starsCount="repository.stargazers_count"
            />
            <h2 class="title">Top languages</h2>
            <span v-if="Object.keys(languages).length === 0"
              >There is no data</span
            >
            <ul v-else class="repository__lang-list lang-list">
              <li
                v-for="(value, key, i) in languages"
                :key="i"
                class="lang-list__item"
              >
                <svg
                  v-if="key in colors"
                  class="octicon"
                  :style="`color:${colors[key].color}`"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <svg
                  v-else
                  class="octicon"
                  :style="`color:black`"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                {{ key }}
              </li>
            </ul>
          </div>

          <div class="repository__contributors">
            <h2 class="title">Contributors</h2>
            <ul class="repository__contributors-list">
              <li
                v-for="contributor in contributors"
                :key="contributor.id"
                class="repository__contributor"
              >
                <a
                  class="repository__contributor-link"
                  :href="contributor.html_url"
                >
                  <img
                    class="repository__contributor-photo"
                    :src="contributor.avatar_url || null"
                    :alt="contributor.login"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex-container_column_right repository__owner">
          <h2 class="title">Owner</h2>
          <img
            class="repository__owner-photo"
            :src="repository.owner.avatar_url"
          />
          <p class="repository__owner-name">{{ repository.owner.login }}</p>
          <Link :elem="'owner'" :githubLink="repository.owner.html_url"
            >GitHub</Link
          >
        </div>
      </div>
    </Panel>
  </main>
</template>

<script setup>
import Panel from '@/components/Panel';
import Link from '@/components/ui/Link';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';
import {
  useRepositoriesStore,
  useContributorsStore,
  useLanguagesStore,
} from '~/store';

const route = useRoute();
const name = computed(() => `${route.params.user}/${route.params.repository}`);

const repositoriesStore = useRepositoriesStore();
const contributorsStore = useContributorsStore();
const languagesStore = useLanguagesStore();

const {
  repository,
  loading: repoLoad,
  error: repoErr,
} = storeToRefs(repositoriesStore);
const { contributors } = storeToRefs(contributorsStore);
const { languages, colors } = storeToRefs(languagesStore);

await useAsyncData(`repository-${route.params.repository}`, async () => {
  await Promise.all([
    repositoriesStore.fetchRepository(name.value),
    contributorsStore.fetchContributors(name.value),
    languagesStore.fetchLanguages(name.value),
    languagesStore.fetchColors(),
  ]).then(() => true);
});
</script>

<style scoped>
.title {
  font-size: 24px;
  line-height: 1;
  margin-bottom: 12px;
}

.repository__panel {
  max-width: 984px;
  margin: 80px auto;
}

.repository__name {
  margin-bottom: 40px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
}

.flex-container_column_left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: auto;
}

.flex-container_column_right {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.repository__information {
  max-width: 80%;
}

.repository__description {
  margin-bottom: 20px;
}

.repository__star-container {
  margin-bottom: 12px;
}

.repository__commit-date {
  font-size: 16px;
  line-height: 1;
  font-weight: normal;
  margin-bottom: 12px;
}

.repository__lang-list {
  display: flex;
  align-items: center;
}

.lang-list {
  list-style: none;
  padding: 0;
  margin-bottom: 12px;
}

.lang-list__item {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.octicon {
  fill: currentColor;
}

.repository__owner-photo {
  width: 280px;
  max-height: auto;
}

.repository__owner-name {
  margin-top: 8px;
  font-size: 20px;
  font-weight: bold;
}

.repository__contributors-list {
  list-style: none;
  padding: 0;
  display: flex;
}

.repository__contributor {
}

.repository__contributor-link {
}

.repository__contributor-photo {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 4px;
}
</style>
