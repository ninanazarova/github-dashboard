<template>
  <button
    :class="['button', `${block}__button`, `button_type_${role}`]"
    :name="`${name}`"
  >
    <slot>some button</slot>
  </button>
</template>

<script>
export default {
  props: ['role', 'block', 'name'],
};
</script>

<style scoped>
.button {
  cursor: pointer;
  padding: 0 16px;
  box-sizing: border-box;
  outline: none;
  font-weight: 400;
}

.button_type_search {
  font-size: 20px;

  min-width: 10%;
  background-color: black;
  color: white;
  border: 2px solid black;
}

.button_type_search:hover {
  background-color: white;
  color: black;
}

.button_type_clear {
  font-size: 12px;
  background-color: white;
  color: black;
  border: 2px solid black;
  border-right: none;
  border-left: none;
}
</style>
