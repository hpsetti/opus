<template>
  <div>
    <vue-slider
      :height="8"
      :dotSize="24"
      :contained="true"
      :dotStyle="dotStyle"
      :processStyle="bg[variant].process"
      :railStyle="bg[variant].rail"
      :tooltipStyle="bg[variant].tooltip"
      :labelStyle="bg[variant].label"
      v-bind="$attrs"
      @change="onChange"
      @error="onError"
    ></vue-slider>
    <div class="mt-20">
      <span class="red-1 text-regular-small">{{ errorMsg }}</span>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';

/**
 * @name OpusSlider
 * @summary A wrapper component on top of vue-slider component
 * @todo
 * - Support multiple dot slider as per requirement
 * @fixme
 * - contained prop is not working as expected
 */
export default {
  name: 'OpusSlider',
  inheritAttrs: false,
  components: { VueSlider },
  props: {
    /**
     * Initial value of the slider
     * v-model prop
     */
    value: {
      type: Number,
      default: 0,
    },
    /**
     * Theme of the slider
     */
    variant: {
      type: String,
      default: 'primary',
    },
  },
  created() {
    this.selected = this.value;
  },
  computed: {
    dotStyle() {
      const bg = this.selected !== null
        ? this.bg[this.variant].dot.selected
        : this.bg[this.variant].dot.unselected;
      return { background: bg };
    },
  },
  data() {
    return {
      selected: null,
      errorMsg: '',
      bg: {
        primary: {
          dot: {
            selected: '#4C9E45',
            unselected: '#BAE0B7',
          },
          tooltip: { backgroundColor: '#4C9E45', borderColor: '#4C9E45', fontFamily: 'Nunito' },
          process: { background: '#4C9E45' },
          rail: { background: '#BAE0B7' },
          label: {
            'font-family': 'Nunito',
            'font-weight': 400,
            'font-size': '14px',
          },
        },
        error: {
          dot: {
            selected: '#B00505',
            unselected: '#FFEBEB',
          },
          tooltip: { backgroundColor: '#B00505', borderColor: '#B00505', fontFamily: 'Nunito' },
          process: { background: '#B00505' },
          rail: { background: '#FFEBEB' },
          label: {
            'font-family': 'Nunito',
            'font-weight': 400,
            'font-size': '14px',
          },
        },
      },
    };
  },
  methods: {
    onChange(range) {
      this.selected = range;
      this.$emit('input', range);
    },
    onError(type, msg) {
      this.errorMsg = msg;
    },
  },
};
</script>
