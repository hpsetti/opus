<template>
  <label class="opus-radio" :class="{ 'disabled': disabled, 'stacked': stacked }">
    <div class="d-flex align-items-center">
      <input
        type="radio"
        @change="onChange"
        :name="name"
        :disabled="disabled"
      />
      <radio-checked v-if="state" width="24" height="24" :class="classes"
      ></radio-checked>
      <radio-unchecked v-else width="24" height="24" :class="classes"
      ></radio-unchecked>
      <span v-if="$slots.default"><slot></slot></span>
      <span v-else>{{ text }}</span>
    </div>
  </label>
</template>

<script>
import RadioChecked from './icons/system/radio-checked.vue';
import RadioUnchecked from './icons/system/radio-unchecked.vue';

/**
 * @name OpusRadio
 * @summary A Radio button
 * @todo
 * - Support for multiple sizes instead of fixed heights
 * @fixme
 * - The span is not center aligned vertically
 */
export default {
  name: 'OpusRadio',
  components: {
    RadioChecked,
    RadioUnchecked,
  },
  model: {
    event: 'input',
    prop: 'checked',
  },
  props: {
    // Enable/Disable the radio button
    disabled: {
      type: Boolean,
      default: false,
    },
    // Size of the radio button
    size: {
      type: String,
      default: 'md',
      validator(value) { return ['lg', 'md', 'sm'].includes(value); },
    },
    /**
     * v-model prop
     */
    checked: {
      required: true,
    },
    /**
     * The value to be emitted when checked
     */
    value: {
      required: true,
    },
    /**
     * Text value to be displayed
     */
    text: {
      type: String,
    },
    /**
     * Name of the radio button
     * All radios should have same name within a group
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Vertically stack the radio elements
     */
    stacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return this.disabled ? 'black-3' : 'blue-1';
    },
  },
  watch: {
    checked: {
      handler() {
        this.state = Boolean(this.checked === this.value);
      },
      immediate: true,
    },
  },
  data() {
    return {
      state: false,
    };
  },
  methods: {
    onChange(ev) {
      if (!this.disabled && ev.target.checked) {
        this.state = true;
        this.$emit('input', this.value);
      }
    },
  },
};
</script>

<style scoped>
.opus-radio-symbol {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}
.opus-radio {
  display: inline-flex;
  position: relative;
  cursor: pointer;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 0;
}
.opus-radio.stacked {
  display: block;
  margin-bottom: 6px;
}
.opus-radio.disabled {
  cursor: default;
}
/* Hide the browser's default radio */
.opus-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.opus-radio span {
  margin: auto 12px;
  line-height: 24px;
}
</style>
