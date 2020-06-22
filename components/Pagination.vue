<template>
  <div class="pagination-container">
    <ul class="pagination__list">
      <li class="pagination__item">
        <pagination-btn
          theme="transparent"
          size="content"
          @click.native="setFirstPageGroup"
          :disabled="firstDisabled"
          >First
        </pagination-btn>
      </li>
      <li class="pagination__item">
        <pagination-btn
          theme="transparent"
          direction="left"
          @click.native="previousPageGroup"
        ></pagination-btn>
      </li>
    </ul>

    <ul class="pagination__list">
      <li class="pagination__item" v-for="index in pages" :key="index">
        <nuxt-link :to="{ name: '', query: { p: index } }">
          <pagination-btn
            :active="index === currentPage"
            @click.native="changeCurrentPage(index)"
          >
            {{ index }}
          </pagination-btn>
        </nuxt-link>
      </li>
    </ul>

    <ul class="pagination__list">
      <li class="pagination__item">
        <pagination-btn
          theme="transparent"
          direction="right"
          @click.native="nextPageGroup"
        ></pagination-btn>
      </li>
      <li class="pagination__item">
        <pagination-btn
          theme="transparent"
          size="content"
          @click.native="setLastPageGroup"
          :disabled="finalDisabled"
          >Last
        </pagination-btn>
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
      currentPage: 1,
      startIndex: 1,
    };
  },

  computed: {
    pagesCount() {
      return 20;
    },

    btnsQuantity() {
      if (process.browser) {
        if (window.innerWidth <= 600) {
          return 1;
        }
        if (window.innerWidth <= 768) {
          return 3;
        } else {
          return 5;
        }
      }
    },

    finalIndex() {
      return this.startIndex + this.btnsQuantity - 1;
    },

    pages() {
      const arrToReturn = [];
      for (let i = this.startIndex; i <= this.finalIndex; i++) {
        arrToReturn.push(i);
      }
      console.log(arrToReturn);
      return arrToReturn;
    },
    //дизейбл "первая", если мы и так на первой странице пагинации
    firstDisabled() {
      return this.currentPage === 1;
    },
    //дизейбл "последняя", если мы и так на первой странице пагинации
    finalDisabled() {
      return this.currentPage === this.pagesCount;
    },
  },

  methods: {
    changeCurrentPage(index) {
      this.currentPage = index;
      // console.log(this.currentPage);
      // console.log('index', index);
      // console.log(this.$route.query.p);

      this.$router.push({ query: { p: index } });
      this.$route.query.p = index;

      this.$store.dispatch('repositories/fetchRepositories', {
        // page: this.currentPage,
        page: this.$route.query.p,
      });
    },
    nextPageGroup() {
      this.startIndex = this.startIndex + this.btnsQuantity;
    },
    //получить предыдущую пачку кнопок навигации
    previousPageGroup() {
      this.startIndex = this.startIndex - this.btnsQuantity;
    },
    //уйти на первую страницу
    setFirstPageGroup() {
      this.startIndex = 1;
      this.changeCurrentPage(1);
    },
    //уйти на последнюю страницу
    setLastPageGroup() {
      this.startIndex = this.pagesCount - this.btnsQuantity + 1;
      this.changeCurrentPage(this.pagesCount);
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
</style>
