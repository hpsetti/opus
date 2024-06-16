<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" class="o-icon">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0a1 1 0 0 0-1 1v22a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1Zm19.171 6.937a1.5 1.5 0 0 0-2.342-1.874l-6.953 8.691L8.06 10.94a1.5 1.5 0 1 0-2.122 2.122l5.185 5.185L20.17 6.938Z" fill="currentColor"/>
  </svg>
</template>

<script>
export default {
  name: 'CheckboxChecked',
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
