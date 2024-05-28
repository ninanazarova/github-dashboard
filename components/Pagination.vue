<template>
  <div class="pagination-container">
    <ul class="pagination__list">
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: route.query.search, p: currentPage } }"
        >
          <PaginationBtn
            :disabled="currentPage === 1"
            @click="changeCurrentPage(1)"
            >First</PaginationBtn
          >
        </nuxt-link>
      </li>
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: route.query.search, p: currentPage } }"
        >
          <pagination-btn
            :disabled="currentPage === 1"
            direction="left"
            @click="changeCurrentPage(prevPage)"
          ></pagination-btn>
        </nuxt-link>
      </li>
    </ul>

    <ul class="pagination__list">
      <li class="pagination__item" v-for="index in pages" :key="index">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: route.query.search, p: index } }"
        >
          <pagination-btn
            :active="index === currentPage"
            @click="changeCurrentPage(index)"
            >{{ index }}</pagination-btn
          >
        </nuxt-link>
      </li>
    </ul>

    <ul class="pagination__list">
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: route.query.search, p: currentPage } }"
        >
          <pagination-btn
            direction="right"
            :disabled="currentPage === pagesCount"
            @click="changeCurrentPage(nextPage)"
          ></pagination-btn>
        </nuxt-link>
      </li>
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: route.query.search, p: currentPage } }"
        >
          <PaginationBtn
            :disabled="currentPage === pagesCount"
            @click="changeCurrentPage(pagesCount)"
            >Last</PaginationBtn
          >
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import PaginationBtn from '@/components/ui/PaginationBtn.vue';
import { useNuxtApp } from '#app';
import { useRepositoriesStore } from '~/store';
import { ref, computed } from 'vue';
const store = useRepositoriesStore();
const route = useRoute();
const router = useRouter();
const { $viewport } = useNuxtApp();

const currentPage = ref(parseInt(route.query.p) || 1);
const pagesCount = ref(50);
const pageRange = ref(5);

watch(
  $viewport.breakpoint,
  (newBreakpoint) => {
    if ($viewport.isLessThan('tablet')) {
      pageRange.value = 3;
    } else {
      pageRange.value = 5;
    }
  },
  { immediate: true }
);

const pages = computed(() => {
  const arrToReturn = [];
  for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
    arrToReturn.push(i);
  }
  return arrToReturn;
});

const rangeStart = computed(() => {
  const start = currentPage.value - Math.floor(pageRange.value / 2);
  return start > 0 ? start : 1;
});
const rangeEnd = computed(() => {
  const end = pageRange.value + rangeStart.value - 1;
  return end < pagesCount.value ? end : pagesCount.value;
});

const nextPage = computed(() =>
  currentPage.value < pagesCount.value
    ? currentPage.value + 1
    : pagesCount.value
);
const prevPage = computed(() =>
  currentPage.value > 1 ? currentPage.value - 1 : 1
);

async function changeCurrentPage(index) {
  currentPage.value = index;
  router.push({
    query: { p: index, search: route.query.search },
  });
  await useAsyncData('repositories', () => {
    store.fetchRepositories({
      page: index,
      search: route.query.search,
    });
  });
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  flex-wrap: wrap;
  margin: 40px auto;
  justify-content: center;
}
.pagination__list {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
}
.pagination__link {
  text-decoration: none;
}
</style>
