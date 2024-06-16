<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" class="op-icon">
    <rect x="1" y="1" width="22" height="22" rx=".5" fill="currentColor" stroke="currentColor"/>
    <rect x="7.5" y="7.5" width="9" height="9" rx=".5" fill="#fff" stroke="#fff"/>
  </svg>
</template>

<script>
export default {
  name: 'CheckboxIndeterminate',
  props: {
    width: {
      type: [String, Number],
      default: '1em',
    },
    height: {
      type: [String, Number],
      default: '1em',
    },
  },
};
</script>
