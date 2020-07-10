<template>
  <main class="index">
    <form class="index__form" @submit.prevent="searchRepositories">
      <nxt-input
        :placeholder="'search repo'"
        :type="'text'"
        :name="'search'"
        :required="'required'"
        v-model="search"
      />
      <nxt-button :theme="'light'" :block="'index'">search</nxt-button>
    </form>

    <h2
      class="index__title"
      v-if="$route.query.search && repositories.total_count !== 0"
    >
      Search results by {{ $route.query.search }}
    </h2>
    <h2
      class="index__title"
      v-if="$route.query.search && repositories.total_count == 0"
    >
      Search results by {{ $route.query.search }} not found
    </h2>
    <h2 class="index__title" v-if="!$route.query.search">
      Most popular repositories
    </h2>

    <ul class="index__repository-list repository-list">
      <li
        v-for="repository in repositories.items"
        :key="repository.id"
        class="repository-list__item"
      >
        <repository
          :repositoryTitle="repository.owner.login + ' / ' + repository.name"
          :repositoryFullName="repository.full_name"
          :githubLink="repository.html_url"
          :starsCount="repository.stargazers_count"
          :commitDate="repository.pushed_at"
        />
      </li>
    </ul>

    <pagination v-if="!$route.query.search && repositories.total_count !== 0" />
  </main>
</template>

<script>
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Panel from '@/components/Panel';
import Repository from '@/components/Repository';
import Pagination from '@/components/Pagination';

export default {
  components: {
    'nxt-input': Input,
    'nxt-button': Button,
    panel: Panel,
    repository: Repository,
    pagination: Pagination,
  },

  computed: {
    repositories() {
      let repositories = this.$store.getters['repositories/getRepositories'];
      return repositories;
    },
  },

  data() {
    return {
      search: this.$route.query.search,
    };
  },

  created() {
    if (!this.$route.query.p) {
      this.$route.query.p = 1;
    }
    this.$store.dispatch('repositories/fetchRepositories', {
      page: this.$route.query.p,
      search: this.$route.query.search,
    });
  },

  methods: {
    searchRepositories() {
      this.$router.push({ query: { search: this.search } });
      this.$route.query.p = 1;
      this.$store.dispatch('repositories/fetchRepositories', {
        search: this.search,
        page: this.$route.query.p,
      });
    },
  },
};
</script>

<style scoped>
.index {
  max-width: 984px;
  margin: 80px auto;
}

.index__form {
  display: flex;
  justify-content: center;
}

.index__title {
  text-align: center;
  margin: 40px 0 20px;
  font-size: 28px;
  font-weight: 800;
}

.index__repository-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}

.repository-list {
  list-style: none;
  padding: 0;
}

.repository-list__item {
  width: 100%;
  min-height: 130px;
  margin-bottom: 24px;
}

.repository-list__item:last-child {
  margin-bottom: none;
}
</style>
