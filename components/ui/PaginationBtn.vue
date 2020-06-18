<template>
  <transition name="fade" mode="out-in" appear>
    <button
      :class="[
        'pagination-btn',
        `pagination-btn_theme_${theme}`,
        `pagination-btn_size_${size}`,
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
    theme: {
      type: String,
      default: 'default',
    },
    size: {
      type: String,
      default: 'l',
    },
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
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  outline: none;
  justify-content: center;
  transition: all 0.2s linear;
}

.pagination-btn_theme_default {
  background-color: #fbfbfb;
}
.pagination-btn_theme_default:hover {
  cursor: pointer;
  background-color: #f4f4f4;
}
.pagination-btn_theme_transparent {
  background-color: transparent;
}
.pagination-btn_theme_transparent:hover {
  opacity: 0.8;
}

.pagination-btn_size_l {
  width: 58px;
  height: 58px;
  line-height: 58px;
}
.pagination-btn_size_m {
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.pagination-btn_size_content {
  width: initial;
  height: initial;
  margin: auto;
}

.pagination-btn_direction_right {
  background-image: url(../../static/icons/right-arrow.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 22px;
  height: 22px;
}

.pagination-btn_direction_left {
  background-image: url(../../static/icons/left-arrow.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 22px;
  height: 22px;
}
</style>
