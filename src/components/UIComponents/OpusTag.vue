<template>
  <span
    v-if="show"
    class="opus-tag"
    :class="{
      'text-button-label lg': size === 'lg',
      'text-regular-small sm': size === 'sm',
      'text-regular-xsmall xs': size === 'xs',
      [`${variant}`]: variant
    }"
    :style="{ background: bg }"
    :variant="variant"
  >
    <slot></slot>
    <slot name="close" :dismissible="dismissible" :dismiss="dismiss">
      <img
        v-if="dismissible"
        src="/static/images/icons/close_icon.svg"
        class="close-tag cursor-pointer"
        alt="Close Tag"
        @click="dismiss"
      />
    </slot>
  </span>
</template>

<script>
/**
 * @name OpusTag
 * @todo
 * - Add hover effects on close slot
 */
export default {
  name: 'OpusTag',
  props: {
    /**
     * Select sm or lg tag sizes
     */
    size: {
      type: String,
      default: 'xs',
      validator: (t) => ['xs', 'sm', 'lg'].includes(t)
    },
    /**
     * Is it dismissible?
     */
    dismissible: {
      type: Boolean,
      default: false
    },
    /**
     * Set background color explicitly
     * e.g. rgb(255, 255, 255)
     */
    bg: {
      type: String
    },
    /**
     * Set variant
     */
    variant: {
      type: String,
      validator: (t) => ['green', 'blue', 'yellow', 'orange'].includes(t)
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    dismiss() {
      this.show = false;
      this.$emit('dismiss');
    }
  }
};
</script>

<style scoped>
.opus-tag {
  display: block;
}
.opus-tag.sm,
.opus-tag.xs {
  padding: 2px 8px;
  border-radius: 2px;
}
.opus-tag.lg {
  padding: 5px 19px;
  border-radius: 5px;
}
.opus-tag.lg:has(img) {
  padding: 5px 12px;
}
.opus-tag.green {
  background-color: rgba(76, 158, 69, 0.3);
}
.opus-tag.blue {
  background-color: rgba(67, 180, 228, 0.3);
}
.opus-tag.yellow {
  background-color: rgba(255, 211, 98, 0.3);
}
.opus-tag.orange {
  background-color: rgba(236, 141, 37, 0.3);
}

.opus-tag.xs .close-tag,
.opus-tag.sm .close-tag {
  margin-left: 8px;
  height: 12px;
}
.opus-tag.lg .close-tag {
  margin-left: 10px;
  height: 18px;
}
</style>
