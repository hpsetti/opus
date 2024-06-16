<template>
  <div
    class="opus-switch"
    :class="{
      on: value,
      off: !value,
      [`${size}`]: size,
    }"
  >
    <div class="d-flex align-items-center">
      <div class="switch-container cursor-pointer" @click="onClick">
        <div class="circle"></div>
      </div>
      <span v-if="hasLabels" class="switch-text text-secondary">
        <span>{{ value ? labels.on : labels.off }}</span>
      </span>
    </div>
  </div>
</template>

<script>
/**
 * @name OpusSwitch
 */
export default {
  name: 'OpusSwitch',
  props: {
    /**
     * Size of the switch button
     */
    size: {
      type: String,
      default: 'sm',
      validator: (t) => ['sm', 'lg'].includes(t),
    },
    /**
     * Show labels for on/off \
     * e.g. { on: 'On', off: 'Off' }
     */
    labels: {
      type: Object,
      default: () => ({
        on: '',
        off: '',
      }),
    },
    /**
     * Initial value
     * v-model prop
     */
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasLabels() {
      return this.labels.on !== '' && this.labels.off !== '';
    },
  },
  methods: {
    onClick() {
      this.$emit('input', !this.value);
    },
  },
};
</script>

<style scoped>
.opus-switch {
  display: block;
  transition: all 0.5s ease-in 0s;
}
.opus-switch .switch-container {
  border-radius: 42px;
  display: block;
}
.opus-switch.sm .switch-container {
  width: 70px;
  height: 36px;
}
.opus-switch.lg .switch-container {
  width: 96px;
  height: 44px;
}
.opus-switch .circle {
  background-color: #fff;
  display: block;
  position: relative;
}
.opus-switch.sm .circle {
  border-radius: 32px;
  width: 32px;
  height: 32px;
}
.opus-switch.lg .circle {
  border-radius: 38px;
  width: 38px;
  height: 38px;
}
.opus-switch.sm.on .circle {
  margin-left: 36px;
  top: 2px;
}
.opus-switch.lg.on .circle {
  margin-left: 56px;
  top: 3px;
}
.opus-switch.sm.off .circle {
  margin-left: 2px;
  top: 2px;
}
.opus-switch.lg.off .circle {
  margin-left: 3px;
  top: 3px;
}
.opus-switch.on .switch-container {
  background: #4c9e45;
}
.opus-switch.off .switch-container {
  background-color: #d3d6d9;
}
.opus-switch .switch-text {
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
}
.opus-switch.sm .switch-text {
  padding-left: 10px;
}
.opus-switch.lg .switch-text {
  padding-left: 13px;
}
</style>
