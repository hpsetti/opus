<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" class="op-icon">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 1.5v21h21v-21h-21ZM1 0a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1Z" fill="currentColor"/>
  </svg>
</template>

<script>
export default {
  name: 'CheckboxUnchecked',
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
