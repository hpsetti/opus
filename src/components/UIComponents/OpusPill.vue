<template>
  <div
    class="opus-pill text-subtitle-1 cursor-pointer"
    :class="[selected ? 'selected black-2' : 'blue-1', disabled ? 'disabled' : '']"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OpusPill',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    onClick() {
      this.selected = !this.selected;
    },
  },
};
</script>

<style scoped>
.opus-pill {
  display: inline-block;
  padding: 9px 24px;
  background: #FFFFFF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
}
.opus-pill.selected {
  background: #FFC62F;
  box-shadow: unset;
  transition: 0.5ms all;
}
.opus-pill.disabled {
  opacity: 0.4;
}
</style>
