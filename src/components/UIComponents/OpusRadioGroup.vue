<template>
  <div class="opus-radio-group" :id="groupName">
    <OpusRadio
      v-for="(item, index) in items"
      :key="index"
      v-model="state"
      :id="`opus-radio-${groupId}-${index}`"
      :name="`opus-radio-${groupId}-${index}`"
      :text="item[textField]"
      :value="item[valueField]"
      :disabled="item[disabledField]"
      :stacked="stacked"
      @input="$emit('input', state)"
    ></OpusRadio>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import OpusRadio from './OpusRadio.vue';
import { getRandomInt } from '../../utils/common';

/**
 * @name OpusRadio
 * @summary Shows multiple radio buttons to select only one item among them
 */
export default {
  name: 'OpusRadioGroup',
  components: {
    OpusRadio,
  },
  model: {
    event: 'input',
    prop: 'checked',
  },
  props: {
    /**
     * An unique id to represent this radio group
     */
    id: {
      type: String,
    },
    /**
     * A unique name to represent this radio group
     */
    name: {
      type: String,
    },
    /**
     * v-model prop
     */
    checked: {
      required: true,
    },
    /**
     * Array of options for each radio input
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * Disable the entire radio group?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Show the radio buttons in stacked mode?
     */
    stacked: {
      type: Boolean,
      default: false,
    },
    /**
     * Text field of the element in options array
     */
    textField: {
      type: String,
      default: 'text',
    },
    /**
     * Value field of the element in options array
     */
    valueField: {
      type: String,
      default: 'value',
    },
    /**
     * Value field of the element in options array
     */
    disabledField: {
      type: String,
      default: 'disabled',
    },
  },
  computed: {
    groupId() {
      return this.id ? this.id : this.getRandomInt(10000);
    },
    groupName() {
      return this.name ? this.name : `opus-radio-group-${this.groupId}`;
    },
  },
  data() {
    return {
      items: [],
      state: null,
    };
  },
  watch: {
    options: {
      handler() {
        this.transform();
      },
      immediate: true,
      deep: true,
    },
    checked: {
      handler() {
        this.state = this.checked;
      },
      immediate: true,
    },
  },
  methods: {
    getRandomInt,
    transform() {
      this.items = this.options.map((option) => this.transformOption(option));
    },
    transformOption(option) {
      let item = {};
      if (typeof option === 'string') {
        item[this.textField] = option;
        item[this.valueField] = option;
      } else {
        item = cloneDeep(option);
      }
      item[this.disabledField] = Boolean(option[this.disabledField] === true || this.disabled);
      if (option[this.textField] === undefined) item[this.textField] = item[this.valueField];
      return item;
    },
  },
};
</script>
<style scoped>
.opus-radio-group {
  display: block;
}
</style>
