<template>
  <div class="opus-table-container opus-scrollbar" :class="[responsive]">
    <table :id="id" class="opus-table" :class="[tableBorderStyle, fixed]">
      <thead>
        <tr :class="[ size ]">
          <th v-if="isSelectable" class="first-col" :class="[ { 'sticky': sticky }, parseClasses(thClasses) ]">
            <OpusCheckbox
              :checked="allSelected"
              :indeterminate="isSelectionPartial"
              @input="selectAll()"
            ></OpusCheckbox>
          </th>
          <th
            v-for="(item, colIndex) in header"
            :key="item.key"
            :class="[
              { 'first-col': isFirstCol(colIndex) },
              { 'last-col': isLastCol(colIndex) },
               parseClasses(thClasses),
            ]"
            :style="item.thStyle"
            @click="item.sortable ? setSortBy(item.key) : null"
          >
            {{ item.label }}
            <span
              v-if="item.sortable"
              class="sort-key"
              :class="getSortKey(item.key)"
            ></span>
          </th>
          <th v-if="hasMenu" class="last-col" :class="[ { 'sticky': sticky }, parseClasses(thClasses) ]"><span></span></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in body"
          :key="rowIndex"
          :class="{
            [`${size}`]: size,
            'first-row': rowIndex === 0,
            'last-row': rowIndex === body.length - 1,
            selected: selectedItems.includes(rowIndex) || allSelected,
            [`${row.trClass}`]: row.trClass
          }"
          @click="$emit('row-clicked', { item: body[rowIndex], index: rowIndex, $event })"
        >
          <td v-if="isSelectable" class="first-col" :class="[{ 'sticky': sticky }, parseClasses(tdClasses) ]">
            <OpusCheckbox
              :checked="selectedItems.includes(rowIndex) ? rowIndex : ''"
              name="opus-table-checkbox"
              :value="rowIndex"
              :uncheckedValue="rowIndex"
              @input="selectRow(rowIndex)"
            ></OpusCheckbox>
          </td>
          <td
            v-for="(col, colIndex) in header"
            :key="col.key"
            :class="[
              { 'first-col': isFirstCol(colIndex) },
              { 'last-col': isLastCol(colIndex) },
               parseClasses(tdClasses),
            ]"
            @click="isSelectable ? selectRow(rowIndex) : null"
          >
            <slot :name="`cell(${col.key})`" :index="rowIndex" :item="body[rowIndex]" :field="col.key" :select="selectRow" :value="body[rowIndex][col.key]" v-if="col.html">
              <span v-html="body[rowIndex][col.key]"></span>
            </slot>
            <slot :name="`cell(${col.key})`" :index="rowIndex" :item="body[rowIndex]" :field="col.key" :select="selectRow" :value="body[rowIndex][col.key]" v-else>
              <span>{{ body[rowIndex][col.key] }}</span>
            </slot>
          </td>
          <td v-if="hasMenu && showMenu" class="last-col" :class="[ { 'sticky': sticky }, parseClasses(tdClasses) ]">
            <div
              class="pr-20 pl-20 text-end align-right"
              :class="[menuPosition(rowIndex)]"
            >
              <OpusDropdown
                :id="`${id}-menu-${rowIndex}`"
                :position="menuPosition(rowIndex)"
                align="right"
                :menuOptions="menuOptions"
                :item="body[rowIndex]"
              >
              </OpusDropdown>
            </div>
          </td>
        </tr>
        <tr v-if="isEmpty" class="text-center">
          <td colspan="100%">
            <slot v-if="filter" name="emptyfiltered" emptyFilteredText="No results found!"><div class="text-body-1">No results found!</div></slot>
            <slot v-else name="empty" emptyText="No records found!"><div class="text-body-1">No records found!</div></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { orderBy, cloneDeep } from 'lodash';
import OpusCheckbox from './OpusCheckbox.vue';
import OpusDropdown from './OpusDropdown.vue';
import { parseClasses, capitalize } from '../../utils/common';

/**
 * @name OpusTable
 * @notes
 * - items holds raw input data as input prop (readonly)
 * - filteredItems holds items after transformation and filtering the data
 * - body holds data of the current page when local pagination is applied
 * @todo
 * - Calculate classList for rows/columns to simplify template
 * - Support box shadow around left sticky column
 * - Support card with sort functionality
 * - Support multi-column sort functionality
 * - Dropup/Dropdown to be improved for smaller tables wrt UI and behaviour and
 * when vertical scrolling is applicable.
 * - Check for all scrollable conditions for making tables responsive
 * - Check pagination when it is not set
 * @fixme
 * - Fix the z-index issues with dropdown menu with content
 * - Change sticky background on hover
 * - Use only value props of filterIncludedFields while filtering
 */
export default {
  name: 'OpusTable',
  components: {
    OpusCheckbox,
    OpusDropdown,
  },
  props: {
    /**
     * Unique id of the table element
     */
    id: {
      type: String,
      default: 'opus-table'
    },
    /**
     * Table record data
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Table field (i.e. row, col) definitions
     */
    fields: {
      type: Array,
      default: () => []
    },
    /**
     * Table Layout simple/default/card
     * Simple - Show table in a very simple way
     * Default - Has sorting, customization features.
     * Card - Has cards instead of rows
     */
    layout: {
      type: String,
      default: 'default',
      validator: (t) => ['simple', 'default', 'card'].includes(t)
    },
    /**
     * Shows the last column with a three dots menu with a drop down
     * Drop down menu options
     */
    menuOptions: {
      type: Array,
      default: () => []
    },
    /**
     * Identify the name of the field key that uniquely identifies the row.
     * Uses table index when not specified
     */
    primaryKey: {
      type: String
    },
    /**
     * Row size variant small(default)/large
     */
    size: {
      type: String,
      default: 'sm',
      validator: (t) => ['sm', 'lg'].includes(t)
    },
    /**
     * Select one or more rows
     */
    selectable: {
      type: Boolean,
      default: false
    },
    // To show / hide menu
    showMenu: {
      type: Boolean,
      default: true
    },
    /**
     * Set table cell border style
     */
    tableBorderStyle: {
      type: String,
      default: 'default',
      validator: (t) =>
        ['default', 'bordered', 'borderless', 'outline'].includes(t)
    },
    /**
     * Make all columns fixed width irrespective of content size
     * Faster render time.
     */
    fixed: {
      type: Boolean,
      default: false,
    },
    /**
     * Enable first-col, last-col when enabled sticky.
     * The columns are sticky when horizontal scrolling is enabled
     */
    sticky: {
      type: Boolean,
      default: false,
    },
    /**
     * List of classes to applied on td elements
     */
    tdClasses: {
      type: String,
      default: '',
    },
    /**
     * List of classes to applied on th elements
     */
    thClasses: {
      type: String,
      default: '',
    },
    /**
     * Filter string or a custom filter function that takes items as input
     */
    filter: {
      type: [String, Function],
      default: () => '',
    },
    /**
     * List of fields to search within when filter prop is set
     */
    filterIncludedFields: {
      type: Array,
      default: () => [],
    },
    /**
     * Number of items to be shown at a time
     * 0 disables pagination and shows all items
     * Can be linked with opus-pagination component
     */
    perPage: {
      type: Number,
      default: 0,
    },
    /**
     * Which page within the current items to be shown
     * Can be linked with opus-pagination component
     */
    currentPage: {
      type: Number,
      default: 1,
    },
    /**
     * Enable overflow classes when responsive prop is set
     */
    responsive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isEmpty() {
      return this.body.length === 0;
    },
    isSimpleTable() {
      return this.layout === 'simple';
    },
    hasMenu() {
      return !this.isSimpleTable && this.menuOptions.length > 0;
    },
    isSortable() {
      return this.layout !== 'simple';
    },
    isSelectable() {
      return this.layout !== 'simple' && this.selectable;
    },
    allSelected() {
      return this.selectedItems.length === this.items.length;
    },
    isSelectionPartial() {
      return (
        this.selectedItems.length < this.items.length
        && this.selectedItems.length > 0
      );
    },
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.perPage);
    },
  },
  watch: {
    selectedItems: {
      handler(value) {
        const items = this.body.filter((row, index) => value.includes(index));
        this.$emit('row-selected', items);
        if (value.length === this.items.length) {
          this.$emit('all-selected');
        }
      }
    },
    fields: {
      handler(value) {
        this.header = value.map((field) => {
          let header = {};
          if (typeof field === 'string') {
            header.key = field;
            header.label = this.capitalize(field);
          } else {
            header = cloneDeep(field);
          }
          return header;
        });
        this.populateSortOptions();
      },
      immediate: true
    },
    items: {
      handler: 'itemHandler',
      immediate: true,
    },
    currentPage: {
      handler() {
        this.itemHandler(this.items);
      },
    },
    perPage: {
      handler() {
        this.itemHandler(this.items);
      },
    },
  },
  data() {
    return {
      // List of header objects with all metadata
      header: [],
      // List of body objects with all metadata
      body: [],
      // Sort columns by
      // TODO Make sortBy, sortDesc bi-directional sync
      sortBy: 'name',
      // Sort columns in asc/desc order
      sortDesc: false,
      // Store sort order status of each column
      sortOptions: {},
      // List of items selected by user
      selectedItems: [],
      // List of items that are left after filtering before pagination
      filteredItems: [],
    };
  },
  methods: {
    parseClasses,
    capitalize,
    isFirstCol(colIndex) {
      return colIndex === 0 && !this.isSelectable;
    },
    isLastCol(colIndex) {
      return colIndex === this.header.length - 1 && !this.hasMenu;
    },
    itemHandler(value) {
      const items = cloneDeep(value);
      if (this.filter === '') {
        this.filteredItems = items;
      } else if (typeof this.filter === 'string') {
        this.filteredItems = items.filter((item) => {
          const str = {};
          this.filterIncludedFields.forEach((field) => {
            str[field] = item[field];
          });
          return JSON.stringify(str).includes(this.filter);
        });
      } else if (this.filter && typeof this.filter === 'function') {
        this.filteredItems = items.filter(this.filter);
      }
      if (this.perPage === 0) {
        this.body = this.filteredItems;
      } else {
        const page = this.currentPage;
        if (page < 0 && page > this.totalPages) {
          this.body = [];
        }
        this.body = this.filteredItems.slice((page - 1) * this.perPage, page * this.perPage);
      }
    },
    // Populate initial sort options based on sortable fields
    populateSortOptions() {
      let key;
      let foundFirst = false;
      this.header.forEach((element) => {
        if (element.sortable) {
          this.sortOptions[element.key] = false;
          if (!foundFirst) {
            key = element.key;
            foundFirst = true;
          }
        }
      });
      if (key) this.sortOptions[key] = true;
    },
    getSortKey(key) {
      let classes = '';
      classes += this.sortOptions[key] ? 'asc' : 'desc';
      classes += this.sortBy === key ? ' active' : ' ';
      return classes;
    },
    /**
     * Sort by single column
     * TODO Implement multi-column sorting
     * Check for sorting null, undefined values
     */
    setSortBy(type) {
      this.sortBy = type;
      this.sortOptions[type] = !this.sortOptions[type];
      this.sortDesc = this.sortOptions[type];
      this.body = orderBy(this.body, [type], [this.sortDesc ? 'desc' : 'asc']);
      this.$emit('sort-changed', { sortBy: this.sortBy, sortDesc: this.sortDesc });
    },
    selectRow(value) {
      const index = this.selectedItems.findIndex((item) => item === value);
      if (index === -1) {
        this.selectedItems.push(value);
      } else {
        this.selectedItems.splice(index, 1);
      }
    },
    selectAll() {
      if (!this.allSelected) {
        this.selectedItems = this.body.map((item) => item.id);
      } else {
        this.selectedItems = [];
      }
    },
    /**
     * Show the bottom few menus in dropup fashion
     * Assumption is height of menu option is less than row height
     */
    menuPosition(index) {
      if (this.body.length <= 4) return 'dropdown';
      return index + this.menuOptions.length + 1 >= this.body.length
        ? 'dropup'
        : 'dropdown';
    }
  }
};
</script>

<style scoped>
.opus-table-container {
  margin-left: 20px;
  margin-right: 20px;
}
.opus-table-container.responsive {
  overflow-y: auto;
}
.opus-table {
  width: 100%;
}

/* START :: Table border */
.opus-table thead tr,
.opus-table.bordered thead,
.opus-table.default thead {
  border-bottom: 1px dashed rgba(11, 60, 97, 0.25);
}

.opus-table.borderless thead tr,
.opus-table.borderless tbody tr {
  border-bottom: unset;
}
.opus-table tbody tr,
.opus-table.default tbody tr,
.opus-table.outline tbody tr {
  border-bottom: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.outline thead tr,
.opus-table.bordered thead tr {
  border-top: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.bordered thead tr th.first-col,
.opus-table.bordered tbody tr td.first-col,
.opus-table.outline thead tr th.first-col,
.opus-table.outline tbody tr td.first-col {
  border-left: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.outline thead tr th.last-col,
.opus-table.outline tbody tr td.last-col {
  border-right: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.bordered thead tr th,
.opus-table.bordered tbody tr td {
  border-right: 1px solid rgba(11, 60, 97, 0.1);
}
/* END :: Table border */

/* START :: Table spacing */
.opus-table thead tr th,
.opus-table tbody tr td {
  padding-left: 15px;
  padding-right: 15px;
}
/* Small rows */
.opus-table tr td,
.opus-table tr th,
.opus-table tr.sm th,
.opus-table tr.sm td {
  height: 40px;
}
/* Large rows */
.opus-table tr.lg th,
.opus-table tr.lg td {
  height: 60px;
}
/* END :: Table spacing */

/* START :: Table content */
.opus-table thead tr th {
  color: #0b3c61;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  /* cursor: pointer; */
}
.opus-table tbody tr td {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #333333;
}
.opus-table tbody td .sub-text {
  color: #828282;
}
.opus-table tbody td > a {
  color: rgba(0, 0, 0, 0.7);
}
/* START :: Table content */

/* START :: Table background */
.opus-table tbody tr.selected {
  background-color: #D0ECF8;
}
.opus-table tbody tr:hover {
  background-color: #E3F4FB
}
/* END :: Table background */

/* START :: Table sticky */
.opus-table thead {
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
}
.opus-table thead tr th.first-col.sticky,
.opus-table tbody tr td.first-col.sticky {
  position: sticky;
  left: 0;
  background: white;
  z-index: 1;
}
.opus-table thead tr th.last-col.sticky,
.opus-table tbody tr td.last-col.sticky {
  position: sticky;
  right: 0;
  background: white;
  z-index: 1;
}
/* END :: Table sticky */

/* START :: Table column size */
.opus-table.fixed {
  table-layout: fixed;
}
.opus-table th.fixed-sm,
.opus-table td.fixed-sm {
  width: 8%;
}
.opus-table th.fixed-md,
.opus-table td.fixed-md {
  width: 12%;
}
.opus-table th.fixed-lg,
.opus-table td.fixed-lg {
  width: 24%;
}
/* END :: Table column size */

/* START :: Table drop down menu */
.opus-table .dropdown-menu {
  width: max-content;
  /* margin-top: 10px; */
  /* margin-right: 10px; */
}
.opus-table .dropdown .dropdown-menu-right::before {
  height: 16px;
  width: 16px;
  background-color: white;
  color: white;
  content: '.';
  text-align: center;
  display: inline-block;
  right: 11%;
  position: absolute;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(45deg);
  top: -9px;
  border-radius: 2px 0 0 0;
}
.opus-table .dropup .dropdown-menu-right::before {
  height: 16px;
  width: 16px;
  background-color: white;
  color: white;
  content: '.';
  text-align: center;
  display: inline-block;
  right: 11%;
  position: absolute;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(135deg);
  top: calc(100% - 8px);
  border-radius: 2px 0 0 0;
}
.opus-table .opus-table-menu {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61;
}
.opus-table .opus-table-menu.error {
  color: #b00505;
}
.opus-table .opus-table-menu-container {
  padding-right: 15px;
  height: 40px;
  min-width: 180px;
}
.opus-table .opus-table-menu-container:hover {
  background: rgba(0, 0, 0, 0.05);
}
/* END :: Table drop down menu */

/* START :: Table sort icon */
.sort-key.desc:before {
  content: url('/static/images/icons/caret_up_light.svg');
  position: relative;
  top: -3px;
  left: 2px;
}
.sort-key.asc:before {
  content: url('/static/images/icons/caret_up_light.svg');
  display: inline-block;
  transform: rotate(180deg);
  position: relative;
  top: 1px;
  left: 2px;
}
.sort-key.active:before {
  content: url('/static/images/icons/caret_up.svg');
}
/* END :: Table sort icon */
</style>
