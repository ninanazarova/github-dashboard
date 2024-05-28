<template>
  <div class="star-container">
    {{ starsCount }}
  </div>
</template>

<script>
import Panel from '@/components/Panel';
export default {
  props: ['starsCount'],
  components: {
    panel: Panel,
  },
};
</script>

<style scoped>
.star-container {
  display: flex;
  align-items: flex-start;
  line-height: 25px;
  font-size: 20px;
}

.star-container__counter {
}

.star-container::before {
  content: url(../../public/icons/star.svg);
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
