<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : null"
    class="button"
    :class="{
      'has-icon': hasIcon,
      [`${variant}`]: variant,
      [`${size}`]: size,
      'full-width': block
    }"
    :disabled="disabled"
    v-bind="$attrs"><span><slot></slot></span
  ></component>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    /**
     * Renders 100% of its parent container
     */
    block: {
      type: Boolean,
      default: false
    },
    /**
     * Disables all user actions
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Enables settings if the button label has icon in it
     */
    'has-icon': {
      type: Boolean,
      default: false
    },
    /**
     * Select sm or lg button sizes
     */
    size: {
      type: String,
      default: 'sm',
      validator: (t) => ['sm', 'lg'].includes(t)
    },
    /**
     * Render the button as button or a tag
     */
    tag: {
      type: String,
      default: 'button'
    },
    /**
     * Set the type of button action. valid only for button tag
     */
    type: {
      type: String,
      default: 'button',
      validator: (t) => ['button', 'submit', 'reset'].includes(t)
    },
    /**
     * Choose primary or secondary variant
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (t) =>
        ['primary', 'secondary', 'tertiary', 'error'].includes(t)
    }
  }
};
</script>

<style scoped>
.button {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  border-radius: 5px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  min-width: 100px;
  white-space: nowrap;
  font-family: 'Nunito' !important;
}
.button.primary {
  color: #FFFFFF !important;
  background: #4C9E45 !important;
  border: 1px solid #4C9E45 !important;
}
.button.primary.hover,
.button.primary:hover {
  background: #42883b !important;
  box-shadow: none;
}
.button.primary.active,
.button.primary:active {
  background: #1e5632 !important;
}
.button.primary.active > span,
.button.primary:active > span {
  opacity: 0.5;
}
.button.primary.disabled > span,
.button.primary:disabled > span {
  opacity: 0.5;
}
.button.primary.disabled,
.button.primary:disabled {
  opacity: 0.5;
  box-shadow: none;
  background: #4c9e45 !important;
}
.button.secondary {
  color: #0B3C61 !important;
  background: #FFFFFF !important;
  border: 1px solid #0B3C61 !important;
}
.button.secondary.hover,
.button.secondary:hover {
  background: #d3d6d9 !important;
  box-shadow: none;
}
.button.secondary.active,
.button.secondary:active {
  background: #b4b4b4 !important;
}
.button.secondary.active span,
.button.secondary:active span {
  opacity: 0.5;
}
.button.secondary.disabled span,
.button.secondary:disabled span {
  opacity: 0.5;
}
.button.secondary.disabled,
.button.secondary:disabled {
  opacity: 0.5;
  box-shadow: none;
  background: #ffffff !important;
}
.button.tertiary {
  color: #FFFFFF !important;
  background: #0B3C61 !important;
  border: 1px solid #0B3C61 !important;
}
.button.tertiary.hover,
.button.tertiary:hover {
  background: #00518a !important;
  box-shadow: none;
}
.button.tertiary.active,
.button.tertiary:active {
  background: #0b3c61 !important;
}
.button.tertiary.active > span,
.button.tertiary:active > span {
  opacity: 0.5;
}
.button.tertiary.disabled > span,
.button.tertiary:disabled > span {
  opacity: 0.5;
}
.button.tertiary.disabled,
.button.tertiary:disabled {
  opacity: 0.5;
  box-shadow: none;
  background: #0b3c61 !important;
}
.button.error {
  color: #ffffff !important;
  background: #b00505 !important;
  border: 1px solid #b00505 !important;
}
.button.error.hover,
.button.error:hover {
  background: #b00505 !important;
  box-shadow: none;
}
.button.error.active,
.button.error:active {
  background: #b00505 !important;
}
.button.error.active > span,
.button.error:active > span {
  opacity: 0.5;
}
.button.error.disabled > span,
.button.error:disabled > span {
  opacity: 0.5;
}
.button.error.disabled,
.button.error:disabled {
  opacity: 0.5;
  box-shadow: none;
  background: #b00505 !important;
}
.button.sm {
  padding: 5px 32px;
}
.button.lg {
  padding: 9px 32px;
}
.button.sm.has-icon {
  padding: 5px 16px;
}
.button.lg.has-icon {
  padding: 9px 16px;
}
</style>
