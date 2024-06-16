<template>
  <div :id="label" class="mt-20 mb-20 opus-tab-pane" role="tabpanel">
    <slot></slot>
  </div>
</template>

<script>
/**
 * @name OpusTabPane
 * @summary An empty slot component that allows user to specify arbitrary
 * content under a tab component.
 */
export default {
  name: 'OpusTabPane',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
