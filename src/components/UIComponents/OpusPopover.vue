<template>
  <el-popover
    effect="light"
    width="330"
    popper-class="tooltip-popper opus-popover"
    v-bind="$attrs"
  >
    <slot name="content">
      <div class="content">
        <div class="title blue-1">{{ title }}</div>
        <hr/>
        <div class="text-regular-small blue-1">{{ content }}</div>
      </div>
    </slot>
    <span slot="reference">
      <slot name="default"></slot>
    </span>
  </el-popover>
</template>

<script>
/**
 * A wrapper component on el-popover.
 * Wrapping a bootstrap popover is prone to issues.
 * TODO
 * 1. Check if all properties are satisfied properly
 */
export default {
  name: 'OpusPopover',
  props: {
    /**
     * Title of the popover
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Content of the popover
     */
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.opus-popover .title {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.opus-popover .content hr {
  margin-top: 7px;
  margin-bottom: 7px;
}
</style>
