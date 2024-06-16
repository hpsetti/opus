<template>
  <svg :width="width" :height="height" viewBox="8 8 24 24" class="op-icon">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C10 25.5228 14.4772 30 20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20ZM20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8Z" fill="currentColor"/>
    <rect x="14" y="14" width="12" height="12" rx="6" fill="currentColor" stroke="currentColor" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: 'RadioChecked',
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
