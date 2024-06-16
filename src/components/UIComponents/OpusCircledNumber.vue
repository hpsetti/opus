<template>
  <div class="opus-circled-number">
    <div class="circle" :class="{ 'selected': selected }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * TODO
 * 1. See if we can support large numbers i.e. > 9 with larger radius
 * or reduced font size
 */
export default {
  name: 'OpusCircledNumber',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.opus-circled-number .circle {
  width: 32px;
  height: 32px;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #333333;
  border: 4px solid #d3d6d9;
  border-radius: 50%;
  box-shadow: 1.62px 1.62px 4px rgba(0, 0, 0, 0.25);
}
.opus-circled-number .circle.selected {
  border: 4px solid #4c9e45;
}
</style>
