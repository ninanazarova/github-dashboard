<template>
  <input
    class="input"
    :type="type"
    :placeholder="placeholder"
    :name="name"
    :required="required"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['type', 'placeholder', 'name', 'required', 'input'],
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
