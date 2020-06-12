<template>
  <button :class="['button', `${block}__button`,`button_theme_${theme}`]">
    <slot>some button</slot>
  </button>
</template>

<script>
export default {
  props: ['theme', 'block'],
};
</script>

<style scoped>
.button {
  font-size: 20px;
  cursor: pointer;
  padding: 12px;
  box-sizing: border-box;
  min-width: 10%;
}

.container__button {
}

.button_theme_light {
  background-color: black;
  color: white;
  border: 2px solid black;
}

.button_theme_light:hover {
  background-color: white;
  color: black;
}

.button_theme_dark {
  background-color: black;
  color: white;
  border: 2px solid white;
}

.button_theme_dark:hover {
  background-color: white;
  color: black;
}
</style>
