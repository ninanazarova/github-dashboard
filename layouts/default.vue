<template>
  <div>
    <main-header />
    <nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header';
export default {
  components: {
    'main-header': Header,
  },
};
</script>

<style>
html {
  font-family: 'Jet Brains', monospace;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

input {
  font-family: inherit;
}
button {
  font-family: inherit;
}
</style>
