<template>
  <main class="index">
    <form class="index__form" @submit.prevent="searchRepositories">
      <Input
        :placeholder="'search repo'"
        :type="'text'"
        :name="'search'"
        :required="'required'"
        v-model="search"
      />
      <Button
        :name="'clear'"
        type="button"
        :role="'clear'"
        :block="'index'"
        @click.native="clearSearch"
        >clear</Button
      >
      <Button :name="'submit'" type="submit" :role="'search'" :block="'index'"
        >search</Button
      >
    </form>

    <h2
      class="index__title"
      v-if="route.query.search && store.getRepositories.total_count !== 0"
    >
      Search results by {{ route.query.search }}
    </h2>
    <h2
      class="index__title"
      v-if="route.query.search && store.getRepositories.total_count == 0"
    >
      Search results by {{ route.query.search }} not found
    </h2>
    <h2 class="index__title" v-if="!route.query.search">
      Most popular repositories
    </h2>

    <ul class="index__repository-list repository-list">
      <li
        v-for="repository in store.getRepositories.items"
        :key="repository.id"
        class="repository-list__item"
      >
        <Repository
          :repositoryTitle="repository.owner.login + ' / ' + repository.name"
          :repositoryFullName="repository.full_name"
          :githubLink="repository.html_url"
          :starsCount="repository.stargazers_count"
          :commitDate="repository.pushed_at"
        />
      </li>
    </ul>

    <Pagination v-if="store.getRepositories.total_count !== 0" />
  </main>
</template>

<script setup>
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Repository from '@/components/Repository';
import Pagination from '@/components/Pagination';
import { useRepositoriesStore } from '~/store';
import { ref } from 'vue';

const store = useRepositoriesStore();
const router = useRouter();
const route = useRoute();
const search = ref();

await useAsyncData('repositories', () => {
  if (route.query.p) {
    route.query.p = 1;
  }
  store.fetchRepositories({
    page: route.query.p ? route.query.p : 1,
    search: search.value ? search.value : '',
  });
});

function clearSearch() {
  if (search.value) {
    search.value = '';
    // route.query.p = 1;
    router.replace({ path: '/?p=1' });
    store.fetchRepositories({ page: route.query.p });
  }
}

function searchRepositories() {
  console.log('first:  ', search.value);
  router.push({ query: { p: 1, search: search.value } });
  store.fetchRepositories({ page: route.query.p, search: search.value });
}
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
