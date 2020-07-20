<template>
  <div class="pagination-container">
    <ul class="pagination__list">
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: $route.query.search, p: currentPage } }"
        >
          <pagination-btn :disabled="currentPage === 1" @click.native="changeCurrentPage(1)">First</pagination-btn>
        </nuxt-link>
      </li>
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: $route.query.search, p: currentPage } }"
        >
          <pagination-btn
            :disabled="currentPage === 1"
            direction="left"
            @click.native="changeCurrentPage(prevPage)"
          ></pagination-btn>
        </nuxt-link>
      </li>
    </ul>

    <ul class="pagination__list">
      <li class="pagination__item" v-for="index in pages" :key="index">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: $route.query.search, p: index } }"
        >
          <pagination-btn
            :active="index === currentPage"
            @click.native="changeCurrentPage(index)"
          >{{ index }}</pagination-btn>
        </nuxt-link>
      </li>
    </ul>

    <ul class="pagination__list">
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: $route.query.search, p: currentPage } }"
        >
          <pagination-btn
            direction="right"
            :disabled="currentPage === pagesCount"
            @click.native="changeCurrentPage(nextPage)"
          ></pagination-btn>
        </nuxt-link>
      </li>
      <li class="pagination__item">
        <nuxt-link
          class="pagination__link"
          :to="{ query: { search: $route.query.search, p: currentPage } }"
        >
          <pagination-btn
            :disabled="currentPage === pagesCount"
            @click.native="changeCurrentPage(pagesCount)"
          >Last</pagination-btn>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import PaginationBtn from '@/components/ui/PaginationBtn.vue';
export default {
  components: {
    'pagination-btn': PaginationBtn,
  },

  data() {
    return {
      startIndex: 1,
      pageRange: 5,
    };
  },

  computed: {
    pages() {
      const arrToReturn = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        arrToReturn.push(i);
      }
      return arrToReturn;
    },

    currentPage() {
      return Number(this.$route.query.p);
    },

    rangeStart() {
      if (window.innerWidth < 768) {
        this.pageRange = 3;
      }
      if (window.innerWidth < 560) {
        this.pageRange = 1;
      }

      const start = this.currentPage - this.pageRange + 1;
      return start > 0 ? start : 1;
    },

    rangeEnd() {
      const end = this.pageRange + this.rangeStart - 1;
      return end < this.pagesCount ? end : this.pagesCount;
    },

    pagesCount() {
      return 50;
    },

    nextPage() {
      return this.currentPage + 1;
    },

    prevPage() {
      return this.currentPage - 1;
    },
  },

  methods: {
    changeCurrentPage(index) {
      this.currentPage = index;
      console.log(index);
      this.$router.push({
        query: { p: index, search: this.$route.query.search },
      });

      this.$store.dispatch('repositories/fetchRepositories', {
        page: index,
        search: this.$route.query.search,
      });
    },
  },
};
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
