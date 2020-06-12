<template>
  <div class="star-container">
    <img src="../../static/icons/star (1).svg" class="star-container__star" />
    <span class="star-container__counter">100500</span>
  </div>
</template>

<script>
import Panel from '@/components/Panel';
export default {
  components: {
    panel: Panel,
  },
};
</script>

<style scoped>
.star-container {
  display: flex;
  align-items: center;
}

.star-container__star {
  width: 20px;
  height: auto;
}

.star-container__counter {
  padding-left: 8px;
}
</style>
