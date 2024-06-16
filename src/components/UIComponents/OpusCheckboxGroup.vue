<template>
  <div class="opus-checkbox-group" :id="groupName">
    <OpusCheckbox
      v-for="(option, index) in items"
      :key="index"
      :id="`opus-checkbox-${groupId}-${index}`"
      :name="`opus-checkbox-${groupId}-${index}`"
      :text="option[textField]"
      :checked="selectedItems.includes(option[valueField]) ? option[valueField] : ''"
      :value="option[valueField]"
      :uncheckedValue="option[valueField]"
      :disabled="option[disabledField]"
      :stacked="stacked"
      @input="onChange"
    >
    </OpusCheckbox>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import OpusCheckbox from './OpusCheckbox.vue';
import { getRandomInt } from '../../utils/common';

/**
 * @name OpusCheckboxGroup
 * @todo
 * - Fix the name and id attribute definition
 * - Update styleguide with this component usage e.g. tables
 * @fixme
 * - Stack layout is not proper
 */
export default {
  name: 'OpusCheckboxGroup',
  components: {
    OpusCheckbox
  },
  model: {
    event: 'input',
    prop: 'checked',
  },
  props: {
    /**
     * An unique id to represent this checkbox group
     */
    id: {
      type: String
    },
    /**
     * A unique name to represent this checkbox group
     */
    name: {
      type: String,
    },
    /**
     * v-model prop
     */
    checked: {
      type: Array,
      required: true,
    },
    /**
     * Array of options for each checkbox input
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * Disable the entire checkbox group?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Show the checkboxes in stacked mode?
     */
    stacked: {
      type: Boolean,
      default: false,
    },
    /**
     * text field of the element in options array
     */
    textField: {
      type: String,
      default: 'text',
    },
    /**
     * value field of the element in options array
     */
    valueField: {
      type: String,
      default: 'value',
    },
    /**
     * disabled field of the element in options array
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
      return this.name ? this.name : `opus-checkbox-group-${this.groupId}`;
    },
  },
  data() {
    return {
      // List of options selected by user. Linked to v-model checked prop
      selectedItems: [],
      items: [],
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
        this.selectedItems = this.checked;
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
    onChange(value) {
      const index = this.selectedItems.findIndex((item) => item === value);
      if (index === -1) {
        this.selectedItems.push(value);
      } else {
        this.selectedItems.splice(index, 1);
      }
      this.$emit('input', this.selectedItems);
    },
  },
};
</script>
