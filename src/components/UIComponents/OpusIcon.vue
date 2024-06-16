<template>
  <component
    :is="icon"
    :width="size"
    :height="size"
    class="op-icon"
  >
  </component>
</template>

<script>
import CheckboxChecked from './icons/system/checkbox-checked.vue';
import CheckboxUnchecked from './icons/system/checkbox-unchecked.vue';
import CheckboxIndeterminate from './icons/system/checkbox-indeterminate.vue';

/**
 * @name OpusIcon
 * @summary A helper component to render svg files using svg vue components
 * @notes
 * - Icon naming convention
 *    - name{-qualifier1}(up|down){-qualifier2}(up|down){-variant}(sm|lg){-count}(1|2|3).vue
 * - A new icon with small/large variants is to created only when it can't be
 * rendered via font-scaling prop on an existing icon.
 * @example
 * - checkbox-checked.vue
 * - checkbox-unchecked.vue
 * - chevron-up-sm.vue
 * - chevron-left-lg.vue
 * - chevron-down-lg-2.vue
 * - alert-triangle.vue
 * - indicator.vue
 * - indicator-disabled.vue
 * @links
 * - https://github.com/zmts/beauty-vuejs-boilerplate/tree/master/src/components/icons
 * - https://github.com/shubhamjain/svg-loader
 * - https://v2.vuejs.org/v2/cookbook/editable-svg-icons.html
 * - https://medium.com/js-dojo/making-svg-icon-component-in-vue-cb7fac70e758
 * - https://bootstrap-vue.org/docs/icons#variants
 * - https://css-tricks.com/svg-sprites-use-better-icon-fonts/
 * - https://forum.vuejs.org/t/import-all-components-from-a-specific-folder/9980
 * @todo
 * - Create a generic component that can load any svg file by file name
 * - Add support for changing size, color, shades, event listeners on svg
 * - Ensure each svg file is loaded only once and then cached
 * - Investigate if svg sprite makes sense for all the opus icons
 * - Finalize the icon naming format and document it in a markdown file
 * - Document an icon making guidelines that can work with this component
 * - Remove opus-icon class from ul-styles.css
 * - Dynamically import svg icon component based on input value
 */
export default {
  name: 'OpusIcon',
  components: {
    CheckboxChecked,
    CheckboxUnchecked,
    CheckboxIndeterminate,
  },
  props: {
    /**
     * Name of the icon to load.
     */
    icon: {
      type: String,
      required: true,
    },
    /**
     * Set the size of the svg during rendering
     */
    fontScale: {
      type: [String, Number],
      default: 1,
    },
  },
  computed: {
    size() {
      return `${this.fontScale * 1}em`;
    },
  },
};
</script>

<style>
svg.op-icon {
  display: inline-block;
  overflow: visible;
  vertical-align: -0.15em;
}
</style>
