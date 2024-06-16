<template>
  <div>
    <div class="opus-crumb">
      <div
        class="d-flex align-items-center cursor-pointer"
        @click="$emit('click')"
      >
        <img :src="images[variant]" />
        <span
          :class="
            variant === 'sm' ? 'text-subtitle-2 blue-1' : 'text-h2 black-2'
          "
        >
          <slot></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpusBreadCrumb',
  props: {
    variant: {
      type: String,
      default: 'sm',
      validator: (t) => ['sm', 'lg'].includes(t)
    }
  },
  data() {
    return {
      images: {
        sm: '/static/images/icons/chevron_left_blue.svg',
        lg: '/static/images/icons/chevron_left_icon.svg'
      }
    };
  }
};
</script>

<style>
.opus-crumb {
  margin-top: 16px;
  margin-left: 20px;
  display: inline-block;
}
.opus-crumb img {
  margin-right: 12px;
}
</style>
