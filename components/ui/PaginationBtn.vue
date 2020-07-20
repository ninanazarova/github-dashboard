<template>
  <transition name="fade" mode="out-in" appear>
    <button
      :class="[
        'pagination-btn',
        `pagination-btn_direction_${direction}`,
        { 'pagination-btn_active': active },
      ]"
      :disabled="disabled"
    >
      <slot></slot>
    </button>
  </transition>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.pagination-btn {
  display: flex;
  border: none;
  cursor: pointer;
  font-weight: 300;
  font-size: 18px;
  outline: none;
  justify-content: center;
  align-items: center;
  min-width: 70px;
  min-height: 48px;
  background-color: #fff;
}

.pagination-btn_direction_right {
  background-image: url(../../static/icons/right-arrow.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
}

.pagination-btn_direction_left {
  background-image: url(../../static/icons/left-arrow.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
}

.pagination-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pagination-btn_active {
  background-color: black;
  color: #fff;
}
.pagination-btn_active:hover {
  background-color: black;
  color: #fff;
}
</style>
