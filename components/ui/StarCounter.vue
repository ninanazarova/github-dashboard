<template>
  <div class="star-container">
    <span class="star-container__counter">{{ starsCount }}</span>
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
}

.star-container__star {
  width: 22px;
  margin-right: 8px;
  height: auto;
}

.star-container__counter {
  font-size: 20px;
}

.star-container__counter::before {
  content: url(../../static/icons/star.svg);
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
</style>
