<template>
  <input
    class="input"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :required="required"
    :value="modelValue"
    @input="updateValue"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps([
  'type',
  'placeholder',
  'name',
  'required',
  'modelValue',
]);
const emits = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emits('update:modelValue', event.target.value);
};
</script>

<style scoped>
.input {
  font-size: 24px;
  line-height: 1.75;
  border: 2px solid #000;
  border-right: 0;
  padding: 10px;
  min-width: 40%;
  outline: none;
}

.input::placeholder {
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
}
</style>
