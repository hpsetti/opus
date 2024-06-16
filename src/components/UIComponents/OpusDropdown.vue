<template>
  <div class="opus-menu" :class="position">
    <slot>
      <img
        :id="id"
        src="/static/images/icons/more-horizontal.svg"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        class="opus-icon d-inline-block cursor-pointer dropdown-toggle"
      />
    </slot>
    <ul
      class="dropdown-menu pb-10 pt-10"
      :aria-labelledby="id"
      :id="id"
      :class="[{ 'no-arrow': noArrow }, menuAlign]"
    >
      <li
        v-for="menu in menuOptions"
        :key="menu.key"
        :class="[
          {
            'menu-container d-flex align-items-center': menu.role !== 'divider',
          },
          { disabled: typeof menu.disabled === 'function' ? menu.disabled(item) : menu.disabled },
          menu.role,
          parseClasses(menu.classes),
        ]"
        :role="menu.role"
        @click="menu.fn && !(typeof menu.disabled === 'function' ? menu.disabled(item) : menu.disabled) ? menu.fn(item) : null"
      >
        <template v-if="menu.role !== 'divider'">
          <img v-if="menu.icon" :src="menu.icon" class="opus-icon sm icon-align" />
          <span
            :class="parseClasses(menu.contentClasses)"
            class="text-body-light menu-content"
            >{{ typeof menu.name === 'function' ? menu.name(item) : menu.name }}</span
          >
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { parseClasses } from '../../utils/common';

/**
 * @name OpusDropdown
 * @fixme
 * - Request for UX Team's input on boxshadow for various menu positions
 */
export default {
  name: 'OpusDropdown',
  props: {
    /**
     * Unique id of the menu
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Position of the menu up/down
     */
    position: {
      type: String,
      default: 'dropdown',
      validator: (t) => ['dropup', 'dropdown'].includes(t),
    },
    /**
     * menu alignment with respect to the parent element
     */
    align: {
      type: String,
      default: 'right',
      validator: (t) => ['left', 'right'].includes(t),
    },
    /**
     * Drop down menu options
     * @type Array
     * @param {String} key Unique id of the menu item
     * @param {String|Function} name Name to be displayed.
     * @param {String} icon icon to be displayed as prefix
     * @param {Function} fn function to be called when user clicks on the menu
     * @param {Boolean|Function} disabled disable the menu option
     * @param {String} role set as divider to show a divider in the menu list
     * @param {String|Array} classes set classes to the menu container
     * @param {String|Array} contentClasses set classes to the menu content
     */
    menuOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * The object to be passed to all functions (fn/name) defined in menuOptions
     */
    item: {
      type: Object,
      default: () => {},
    },
    /**
     * Do not show arrow indicators
     */
    noArrow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    menuAlign() {
      return this.align === 'right'
        ? 'dropdown-menu-right'
        : 'dropdown-menu-left';
    },
  },
  methods: {
    parseClasses,
  },
};
</script>

<style scoped>
.opus-menu {
  display: inline-block;
}
.opus-menu .dropdown-menu {
  width: max-content;
  border: none;
  border-radius: 10px;
  min-width: 180px;
}
.opus-menu .dropdown-menu {
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
}
/* FIXME Check with UX team on box shadows */
/* .opus-menu.dropdown .dropdown-menu-left {
  box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.25);
}
.opus-menu.dropdown .dropdown-menu-right {
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.25);
}
.opus-menu.dropup .dropdown-menu-left {
  box-shadow: -2px -4px 10px rgba(0, 0, 0, 0.25);
}
.opus-menu.dropup .dropdown-menu-right {
  box-shadow: 2px -4px 10px rgba(0, 0, 0, 0.25);
} */
.opus-menu .dropdown-menu-left {
  left: -6px;
}
.opus-menu .dropdown-menu-right {
  right: -6px;
}
.opus-menu.dropup .dropdown-menu.dropdown-menu-left::before,
.opus-menu.dropup .dropdown-menu.dropdown-menu-right::before,
.opus-menu.dropdown .dropdown-menu.dropdown-menu-left::before,
.opus-menu.dropdown .dropdown-menu.dropdown-menu-right::before {
  height: 12px;
  width: 12px;
  background-color: white;
  color: white;
  content: '.';
  text-align: center;
  display: inline-block;
  position: absolute;
  transform: rotate(45deg);
  border-radius: 2px 0 0 0;
}
.opus-menu.dropdown .dropdown-menu-right::before {
  right: 12px;
  top: -6px;
  border-top: 1px solid rgba(0, 0, 0, 0.075);
  border-left: 1px solid rgba(0, 0, 0, 0.075);
}
.opus-menu.dropup .dropdown-menu-right::before {
  right: 12px;
  top: calc(100% - 6px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  border-right: 1px solid rgba(0, 0, 0, 0.075);
}
.opus-menu.dropdown .dropdown-menu-left::before {
  left: 12px;
  top: -6px;
  border-top: 1px solid rgba(0, 0, 0, 0.075);
  border-left: 1px solid rgba(0, 0, 0, 0.075);
}
.opus-menu.dropup .dropdown-menu-left::before {
  left: 12px;
  top: calc(100% - 6px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  border-right: 1px solid rgba(0, 0, 0, 0.075);
}
.opus-menu.dropdown .dropdown-menu.no-arrow::before,
.opus-menu.dropup .dropdown-menu.no-arrow::before {
  display: none;
}
.opus-menu .menu-content {
  color: #0b3c61;
}
/* .opus-menu .error.menu-content,
.opus-menu .error.menu-content:focus,
.opus-menu .error.menu-content:hover {
  color: #b00505;
}
.opus-menu .error.menu-container,
.opus-menu .error.menu-container:focus,
.opus-menu .error.menu-container:hover {
  background-color: #ffebeb;
} */
.opus-menu .disabled.menu-container,
.opus-menu .disabled.menu-container:focus,
.opus-menu .disabled.menu-container:hover {
  background-color: rgba(0, 0, 0, 0.03);
  color: #333;
  cursor: not-allowed;
}
.opus-menu .menu-container {
  padding-right: 20px;
  padding-left: 20px;
  height: 40px;
}
.opus-menu .menu-container:focus,
.opus-menu .menu-container:hover {
  background: #e3f4fb;
}
.icon-align {
  margin-right: 21px;
  margin-top: -3px;
}
</style>
