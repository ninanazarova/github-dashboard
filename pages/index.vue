<template>
  <main class="index">
    <panel class="index__search">
      <search />
      <nxt-button @btnClick="alert('yo')" :theme="'light'" :block="'index'"
        >search</nxt-button
      >
    </panel>

    <h2 class="index__title">Most popular repositories</h2>
    <ul class="index__repository-list repository-list">
      <li
        v-for="repository in repositories"
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

    <pagination />
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
    search: Input,
    'nxt-button': Button,
    panel: Panel,
    repository: Repository,
    pagination: Pagination,
  },

  computed: {
    repositories() {
      let repositories = this.$store.getters['repositories/getRepositories']
        .items;

      return repositories;
    },
  },
  created() {
    if (!this.$route.query.p) {
      this.$route.query.p = 1;
    }
    this.$store.dispatch('repositories/fetchRepositories', {
      page: this.$route.query.p,
    });
  },
};
</script>

<style scoped>
.index {
  max-width: 1184px;
  margin: 80px auto;
}

.index__search {
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
  margin-bottom: 16px;
}

.repository-list__item:last-child {
  margin-bottom: none;
}
</style>
