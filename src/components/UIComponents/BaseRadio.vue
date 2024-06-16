<template>
  <label class="radio d-flex" :class="{ disabled: disabled }">
    <input
      type="radio"
      class="radio__input"
      :value="option.value"
      @change="onchange"
      :checked="this.checked || option.value === this.value"
      :disabled="disabled"
    />
    <div
      class="radio__radio"
      :class="[{ disabled: disabled, thick: thick }, size ? size : '']"
    ></div>
    <div class="radio__text" :class="disabled ? 'disabled' : size">
      {{ option.name }}
    </div>
  </label>
</template>

<script>
export default {
  props: {
    // If the radio button should show 2px radio button instead of default 1px
    thick: {
      type: Boolean,
      required: false,
      default: false
    },
    // Enable/Disable the radio button
    disabled: {
      type: Boolean,
      default: false
    },
    // value prop to be used in v-model
    value: {
      type: Number
    },
    // option object with keys name and value
    option: {
      type: Object,
      required: true
    },
    // Size of the radio button
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['large', 'medium', 'small'].includes(value);
      }
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onchange() {
      if (!this.disabled) {
        this.$emit('input', this.option.value);
      }
    }
  }
};
</script>

<style scoped>
.radio {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
}
.radio.disabled {
  cursor: default;
}
.radio__input {
  display: none;
}
.radio__radio {
  width: 1.25em;
  height: 1.25em;
  border: 1px solid #0b3c61;
  border-radius: 50%;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 2px;
  transition: transform 0.15s;
}
.radio__radio.small {
  width: 1em;
  height: 1em;
  padding: 1px;
}
.radio__radio.thick {
  border: 2px solid #0b3c61;
}
.radio__radio.disabled {
  opacity: 0.3;
}
.radio__radio::after {
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  background: #0b3c61;
  border-radius: 50%;
  transform: scale(0);
}
.radio__input:checked + .radio__radio::after {
  transform: scale(1);
}
.radio .radio__text {
  font-weight: 400;
}
.radio .radio__text.large {
  font-size: 18px;
  line-height: 24px;
}
.radio .radio__text.medium {
  font-size: 14px;
  line-height: 19px;
}
.radio .radio__text.small {
  font-size: 8px;
  line-height: 11px;
}
.radio .radio__text.disabled {
  opacity: 0.3;
  color: #000000;
}
</style>
