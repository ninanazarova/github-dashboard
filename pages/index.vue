<template>
  <main class="container">
    <panel class="container__search">
      <search />
      <nxt-button :theme="'light'" :block="'container'">search</nxt-button>
    </panel>
    <h2 class="container__title">Most popular repositories:</h2>
    <ul class="container__repository-list repository-list">
      <li class="repository-list__item">
        <repository />
      </li>
      <li>
        <repository />
      </li>
      <li>
        <repository />
      </li>
      <li>
        <repository />
      </li>
      <li>
        <repository />
      </li>
    </ul>
  </main>
</template>

<script>
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Panel from '@/components/Panel';
import Repository from '@/components/Repository';
export default {
  components: {
    search: Input,
    'nxt-button': Button,
    panel: Panel,
    repository: Repository,
  },
};
</script>

<style scoped>
.container {
  max-width: 1184px;
  margin: 80px auto 0;
}

.container__search {
  display: flex;
  justify-content: center;
}

.container__title {
  text-align: center;
  margin: 40px 0;
}

.container__repository-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.repository-list {
  list-style: none;
  padding: 0;
}
</style>
