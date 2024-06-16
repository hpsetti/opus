<template>
  <div class="opus-dots">
    <span
      v-for="index in count"
      :key="index"
      class="opus-dot"
      :class="{
        active: position === index,
        [`${variant}`]: variant,
      }"
    ></span>
  </div>
</template>

<script>
export default {
  name: 'OpusDots',
  props: {
    /**
     * Number of items/dots to be indicated
     */
    count: {
      type: Number,
      required: true
    },
    /**
     * The dot to be highlighted \
     * Numbering starts from 1
     */
    position: {
      type: Number,
      required: true,
    },
    /**
     * Choose the variant of the dots
     */
    variant: {
      type: String,
      default: 'blue',
      validator: (t) => ['blue', 'white'].includes(t),
    },
  },
};
</script>

<style>
.opus-dots {
  display: flex;
  column-gap: 8px;
}
.opus-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  float: none;
  background: transparent;
}
.opus-dot.blue {
  border: 0.5px solid #0b3c61;
}
.opus-dot.white {
  border: 0.5px solid #fff;
}
.opus-dot.active.blue {
  background: #0b3c61;
}
.opus-dot.active.white {
  background: #fff;
}
</style>
