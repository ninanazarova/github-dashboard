<template>
  <main class="repository">
    <panel class="repository__panel">
      <h1 class="repository__name">
        <github-link
          class="repository__name-link"
          :githubLink="repository.html_url"
          >{{ repository.name }}</github-link
        >
      </h1>
      <div class="flex-container">
        <div class="flex-container_column_left">
          <div class="repository__information">
            <h2 class="title">Description</h2>

            <p class="repository__description">{{ repository.description }}</p>

            <commit-date class="repository__commit-date">{{
              repository.pushed_at
            }}</commit-date>

            <star-counter
              class="repository__star-container"
              :starsCount="repository.stargazers_count"
            />
            <h2 class="title">Top languages</h2>
            <ul class="repository__lang-list lang-list">
              <li
                v-for="language in languages"
                :key="language.id"
                class="lang-list__item"
              >
                <svg
                  class="octicon"
                  :style="`color:${colorsOfLanguages[`${language}`].color}`"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                {{ language }}
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
                    :src="contributor.avatar_url"
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
          <github-link
            class="repository__owner-link"
            :githubLink="repository.owner.html_url"
            >GitHub</github-link
          >
        </div>
      </div>
    </panel>
  </main>
</template>

<script>
import Panel from '@/components/Panel';
import Link from '@/components/ui/Link';
import StarCounter from '@/components/ui/StarCounter';
import CommitDate from '@/components/ui/CommitDate';

export default {
  components: {
    panel: Panel,
    'github-link': Link,
    'star-counter': StarCounter,
    'commit-date': CommitDate,
  },

  computed: {
    repository() {
      return this.$store.getters['repositories/getRepository'];
    },

    languages() {
      return this.$store.getters['languages/getLanguages'];
    },

    colorsOfLanguages() {
      console.log(this.$store.getters['languages/getColors']);
      return this.$store.getters['languages/getColors'];
    },

    contributors() {
      return this.$store.getters['contributors/getContributors'];
    },
  },

  created() {
    this.$store.dispatch('languages/fetchLanguages', {
      fullName: this.repository.full_name,
    });
    this.$store.dispatch('contributors/fetchContributors', {
      fullName: this.repository.full_name,
    });
  },

  async fetch({ store, route, error }) {
    await store
      .dispatch('repositories/fetchRepository', {
        fullName: route.path,
      })
      .catch(e => {
        error({ statusCode: 404, message: 'Post not found' });
      });
    await store.dispatch('languages/fetchcColorsOfLanguages');
  },
};
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

.repository__name-link {
  font-size: 28px;
  font-weight: 900;
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

.repository__owner-link {
  margin-top: 8px;
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
