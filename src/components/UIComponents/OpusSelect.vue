<template>
  <multiselect
    class="opus-multiselect"
    :class="[size]"
    :showLabels="false"
    :close-on-select="closeOnSelect"
    :maxHeight="maxHeight"
    :optionHeight="height[size]"
    @select="onSelect($event)"
    @remove="onRemove($event)"
    :searchable="searchable"
    v-bind="$attrs"
    :allow-empty="allowEmpty"
  >
    <template  slot="caret" slot-scope="{ toggle }">
      <img v-show="!$attrs.loading" @mousedown.prevent.stop="toggle()" class="icon" src="/static/images/icons/chevron_down_new.svg"/>
    </template>
    <template v-if="hasMultiple" slot="selection" slot-scope="{ values }">
      <span class="multiselect__single" v-if="values.length && !showOptions"
        >{{ values.length === items.length ? 'All' : values.length }} selected</span
      >
      </template
    >
    <template v-if="hasMultiple" slot="option" slot-scope="props">
      <OpusCheckbox
        v-if="isOptionSimple"
        :checked="selectedItems.includes(props.option)"
        :text="props.option"
        @click.native.prevent
      ></OpusCheckbox>
      <OpusCheckbox
        v-else
        :checked="selectedItems.includes(props.option[$attrs.trackBy])"
        :text="props.option[$attrs.label]"
        @click.native.prevent
      ></OpusCheckbox>
    </template>
  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect';
import cloneDeep from 'lodash/cloneDeep';
import OpusCheckbox from './OpusCheckbox.vue';

/**
 * @name OpusSelect
 * @summary A wrapper component around vue multiselect library following OPUS
 * designs.
 * @notes
 * - Modify the component only when the multiselect component doesn't implement
 * it natively.
 * @todo
 * - Check for corner cases for inputs
 * @fixme
 * - The placeholder text is not rendered exactly as input placeholder
 * - Remove the important keyword in css when the multiselect component is
 * replaced by this component across the app.
 */
export default {
  name: 'OpusSelect',
  inheritAttrs: false,
  components: {
    Multiselect,
    OpusCheckbox,
  },
  props: {
    /**
     * Size of the multiselect small/large
     * 'sm'/'lg' can be used for single selection
     * 'lg' can be used for multiple selection
     */
    size: {
      type: String,
      default: 'sm',
      validator: (t) => ['sm', 'lg'].includes(t),
    },
    /**
     * Show all selected options in the input box?
     * Otherwise shows a simple summary of selections.
     */
    showOptions: {
      type: Boolean,
      default: false,
    },
    allowEmpty : {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      // Option Height for small/large variants
      height: {
        sm: 36,
        lg: 44,
      },
      selectedItems: [],
    };
  },
  computed: {
    // Show 5 dropdown items atmost
    maxHeight() {
      return this.height[this.size] * 5;
    },
    // Do not close on select when multiple option is provided
    closeOnSelect() {
      return !this.hasMultiple;
    },
    hasMultiple() {
      return Boolean(this.$attrs.multiple === '');
    },
    isOptionSimple() {
      return Boolean(!this.$attrs.trackBy || this.$attrs.trackBy === '');
    },
    searchable() {
      return this.$attrs.searchable === '' || this.$attrs.searchable === true;
    },
  },
  created() {
    if (this.hasMultiple) {
      if (this.$attrs.value && Array.isArray(this.$attrs.value)) {
        this.selectedItems.push(...this.$attrs.value);
      }
    } else {
      this.selectedItems = cloneDeep(this.$attrs.value);
    }
  },
  methods: {
    onSelect(option) {
      if (this.hasMultiple) {
        const idx = this.selectedItems.findIndex((item) => (
          this.isOptionSimple
            ? item === option
            : item === option[this.$attrs.trackBy]
        ));
        if (idx === -1) {
          this.selectedItems.push(
            this.isOptionSimple ? option : option[this.$attrs.trackBy],
          );
        } else {
          this.selectedItems.splice(idx, 1);
        }
      } else {
        this.selectedItems = option;
      }
    },
    onRemove(option) {
      if (this.hasMultiple) {
        const idx = this.selectedItems.findIndex((item) => (
          this.isOptionSimple
            ? item === option
            : item === option[this.$attrs.trackBy]
        ));
        if (idx !== -1) {
          this.selectedItems.splice(idx, 1);
        }
      } else {
        this.selectedItems = null;
      }
    },
  },
};
</script>

<style>
/*
** Input bar styling
**/
.opus-multiselect.multiselect,
.opus-multiselect.multiselect.sm {
  height: 36px;
  min-height: unset;
}
.opus-multiselect.multiselect.lg {
  /* min-height: 44px; */
  height: auto;
}
.opus-multiselect .multiselect__tags {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 0.5px solid #000;
}
.opus-multiselect.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-top-left-radius: 3px !important;
  border-top-right-radius: 3px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border: 0.5px solid #000;
  border-bottom: unset;
}
.opus-multiselect.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-left-radius: 3px !important;
  border-bottom-right-radius: 3px !important;
  border: 0.5px solid #000;
  border-top: unset;
}
.opus-multiselect.sm .multiselect__tags {
  padding: 6px 40px 6px 7px;
  height: 36px;
  min-height: unset;
}
.opus-multiselect.lg .multiselect__tags {
  padding: 10px 40px 10px 7px;
  min-height: 44px;
}
.opus-multiselect.multiselect--disabled .multiselect__tags,
.opus-multiselect.multiselect--disabled .multiselect__tags .multiselect__single {
  background-color: #F2F2F2;
}
.opus-multiselect .multiselect__tags:has(input[disabled='disabled']) {
  background-color: #F2F2F2;
}
.opus-multiselect .multiselect__tags .multiselect__input {
  margin: 0;
  line-height: 24px;
}
.opus-multiselect .multiselect__tags .multiselect__single {
  color: #333333;
  font-family: Nunito;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  font-weight: 300;
  margin: 0;
}

/*
** Placeholder styling
**/
.opus-multiselect .multiselect__tags input::placeholder {
  font-family: Nunito;
  font-style: normal;
  font-size: 14px;
  line-height: 24px;
  font-weight: 300;
}
.opus-multiselect .multiselect__placeholder {
  font-size: 14px;
  color: #828282;
  margin-bottom: unset;
  padding-top: unset;
  font-family: Nunito;
  font-style: normal;
  line-height: 24px;
  padding-left: 5px;
  font-weight: 300;
}

/*
** Drop down styling
**/
.opus-multiselect .multiselect__content-wrapper {
  border-right: 0.5px solid #000;
  border-left: 0.5px solid #000;
  border-bottom: 0.5px solid #000;
  border-top: unset;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.opus-multiselect.multiselect--above .multiselect__content-wrapper {
  border-top: 0.5px solid #000;
  border-bottom: unset;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
/* Draw truncated border between input and dropdown */
.opus-multiselect.multiselect--active .multiselect__tags::before {
  content: "";
  background: #000;
  position: absolute;
  bottom: 0;
  right: 2%;
  height: 0.5px;
  width: 96%;
  z-index: 51;
}
.opus-multiselect.multiselect--active.multiselect--above .multiselect__tags::before {
  content: "";
  background: #000;
  position: absolute;
  top: 0;
  right: 2%;
  height: 0.5px;
  width: 96%;
  z-index: 51;
}
/*
** Dropdown option styling
*/
.opus-multiselect .multiselect__option span {
  line-height: 24px;
}
/* Wrap long option content */
.opus-multiselect .multiselect__option {
  white-space: normal;
}
.opus-multiselect.sm .multiselect__option {
  min-height: 36px;
  padding: 6px 12px;
}
.opus-multiselect.lg .multiselect__option {
  min-height: 44px;
  padding: 10px 12px;
}
.opus-multiselect .multiselect__option.multiselect__option--selected {
  background: rgba(67, 180, 228, 0.25);
  color: rgba(0, 0, 0, 0.7);
  font-weight: 700;
}
.opus-multiselect .multiselect__option.multiselect__option--highlight,
.opus-multiselect .multiselect__option:hover {
  background: rgba(67, 180, 228, 0.15);
  color: #333333;
}

/*
** Caret (dropdown) icon style
 */
.opus-multiselect .icon {
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  cursor: pointer;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.opus-multiselect.multiselect--active .icon {
  transform: rotate(180deg);
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
/*
** Tags styling
**/
.opus-multiselect .multiselect__tag {
  background-color: rgba(255, 198, 47, 0.3) !important;
  border-color: #e9e9eb !important;
  color: #333333 !important;
  border-radius: 2px !important;
}
.opus-multiselect .multiselect__tag-icon:hover {
  color: #333333 !important;
  background: rgba(251, 191, 24, 0.6) !important;
}
/*
** Scrollbar design
 */
.opus-multiselect .multiselect__content-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.opus-multiselect .multiselect__content-wrapper::-webkit-scrollbar-track {
  border-radius: 6px;
}
.opus-multiselect .multiselect__content-wrapper::-webkit-scrollbar-thumb {
  background: #D9D9D9;
  border-radius: 18px;
}
.opus-multiselect .multiselect__content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #D9D9D9;
}
/*
** Spinner design
 */
.opus-multiselect .multiselect__spinner {
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0px;
  margin: auto 0;
  width: 24px;
  height: 24px;
  background: #fff;
  display: block;
}

.opus-multiselect .multiselect__spinner:before,
.opus-multiselect .multiselect__spinner:after {
  position: absolute;
  content: "";
  margin: -12px -12px;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border-color: #000 transparent transparent;
  border-style: solid;
  border-width: 1px;
}
</style>
