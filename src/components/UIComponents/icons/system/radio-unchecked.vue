<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" class="op-icon">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 12c0 5.799 4.701 10.5 10.5 10.5S22.5 17.799 22.5 12 17.799 1.5 12 1.5 1.5 6.201 1.5 12ZM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Z" fill="currentColor"/>
  </svg>
</template>

<script>
export default {
  name: 'RadioUnchecked',
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
