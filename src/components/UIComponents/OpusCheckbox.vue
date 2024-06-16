<template>
  <label class="opus-checkbox" :class="{ 'disabled': disabled, 'stacked': stacked }">
    <div class="d-flex" :class="{ 'align-items-center': textCenterAlign }">
      <input
        type="checkbox"
        @change="onChange"
        :name="name"
        :disabled="disabled"
      />
      <checkbox-indeterminate v-if="indeterminate" width="24" height="24" :class="classes"
      ></checkbox-indeterminate>
      <checkbox-checked v-else-if="state" width="24" height="24" :class="classes"
      ></checkbox-checked>
      <checkbox-unchecked v-else width="24" height="24" :class="classes"
      ></checkbox-unchecked>
      <span v-if="$slots.default"><slot></slot></span>
      <span v-else-if="html" v-html="html"></span>
      <span v-else-if="text">{{ text }}</span>
    </div>
  </label>
</template>

<script>
import CheckboxChecked from './icons/system/checkbox-checked.vue';
import CheckboxUnchecked from './icons/system/checkbox-unchecked.vue';
import CheckboxIndeterminate from './icons/system/checkbox-indeterminate.vue';

/**
 * @name OpusCheckbox
 * @summary A checkbox input type
 * @todo
 * - Support for multiple sizes instead of fixed heights
 * @fixme
 * - The span is not center aligned vertically
 */
export default {
  name: 'OpusCheckbox',
  components: {
    CheckboxChecked,
    CheckboxUnchecked,
    CheckboxIndeterminate,
  },
  model: {
    event: 'click',
    prop: 'checked',
  },
  props: {
    // Enable/Disable the checkbox button
    disabled: {
      type: Boolean,
      default: false
    },
    // Size of the checkbox button
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
      default: true,
    },
    /**
     * The value to be emitted when not checked
     */
    uncheckedValue: {
      default: false,
    },
    /**
     * Is the checkbox in indeterminate state
     */
    indeterminate: {
      type: Boolean,
      default: false,
    },
    /**
     * Text value to be displayed
     */
    text: {
      type: String,
    },
    /**
     * Html value to be displayed
     */
    html: {
      type: String,
    },
    /**
     * Name of the checkbox button
     * All checkboxes should have same name within a group
     */
    name: {
      type: String,
    },
    /**
     * Vertically stack the checkbox elements
     */
    stacked: {
      type: Boolean,
      default: false,
    },
    textCenterAlign: {
      type: Boolean,
      default: false
    }
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
      if (this.disabled) return;
      if (ev.target.checked) {
        this.state = true;
        this.$emit('click', this.value);
      } else {
        this.state = false;
        this.$emit('click', this.uncheckedValue);
      }
    }
  }
};
</script>

<style scoped>
.opus-checkbox {
  position: relative;
  margin-bottom: 0;
}
.opus-checkbox.stacked {
  display: block;
  margin-bottom: 6px;
}
.opus-checkbox.disabled {
  cursor: default;
}
/* Hide the browser's default checkbox */
.opus-checkbox input {
  position: absolute;
  height: 0;
  width: 0;
}
.opus-checkbox svg {
  min-width: 24px;
  cursor: pointer;
}
.opus-checkbox span {
  margin: auto 12px;
  line-height: 24px;
  /* line-height: 24px;
  vertical-align: middle; */
}
</style>
