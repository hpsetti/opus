<template>
  <div class="opus-tabs">
    <ul class="d-flex" :id="id">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :id="`tab-${index}`"
        class="cursor-pointer"
        :class="{ active: isActive(index) }"
        :data-testid="isSimple ? tab : tab[trackBy]"
        role="tab"
        :tabindex="isActive(index) ? 0 : -1"
        :aria-selected="isActive(index)"
        @click="setTab(isSimple ? tab : tab[trackBy])"
      >
        {{ isSimple ? tab : tab[label]  }} <span v-if="showTabCount">({{ tab[count] || 0 }})</span>
      </li>
    </ul>
    <div class="opus-tab-content" :id="`opus-tab-content-${id}`">
      <slot :selected="currentTab"></slot>
    </div>
  </div>
</template>

<script>
/**
 * @name OpusTabs
 * @summary Show tabs horizontally
 * @notes
 * - Shows tabs horizontally across the width available
 * - Shows horizontal scroll bar when content exceeds width available
 * - Tabs can be selected via url query params also
 * @todo
 * - Add support for vertical tabs
 * - Add chevrons instead of horizontal scrollbar to avoid UX issues
 * @fixme
 * - The border bottom is truncated beyond the initial render when the content
 * is beyond the width available
 */
export default {
  name: 'OpusTabs',
  model: {
    event: 'tab-selected',
    prop: 'value',
  },
  props: {
    /**
     * Unique id to represent a tab instance
     */
    id: {
      type: String,
    },
    /**
     * Select the initial tab or a key in the tabs object
     * v-model prop
     */
    value: {
      type: [String, null],
      default: null,
    },
    /**
     * Array of available tabs to be shown
     * Takes an array of strings or objects
     * @example ['tab1', 'tab2']
     * @example [{name: 'Tab1', key: 'tab1', count: 2}, {name: 'Tab2', key: 'tab2', count: 2}]
     */
    tabs: {
      type: Array,
      required: true,
    },
    /**
     * Open tabs with query params
     * ${BASE_URL}/notifications?tabId=id&trackBy=general
     * Triggers router navigations that are logged in history
     */
    hasRouterParams: {
      type: Boolean,
      default: false
    },
    /**
     * Show tab count adjacent to tab name?
     * Ensure count prop is also set
     */
    showTabCount: {
      type: Boolean,
      default: false,
    },
    /**
     * key from tabs object to be displayed in the tab
     */
    label: {
      type: String,
      default: 'name',
    },
    /**
     * key from tabs object to uniquely identify an item
     */
    trackBy: {
      type: String,
      default: 'key',
    },
    /**
     * key in tabs object to show count adjacent to label prop
     */
    count: {
      type: String,
      default: 'count',
    },
  },
  computed: {
    // Is tabs an array of strings
    isSimple() {
      if (this.tabs.length === 0) return true;
      return (typeof this.tabs[0] === 'string');
    },
    keys() {
      return this.tabs.map((item) => item[this.trackBy]);
    },
  },
  watch: {
    $route(to) {
      if (this.hasRouterParams && to.query[this.trackBy]) {
        this.setTabUsingQuery(to.query.tabId, to.query[this.trackBy]);
      }
    }
  },

  data() {
    return {
      currentTab: null
    };
  },
  created() {
    const query = this.$route.query[this.trackBy];
    if (this.isSimple) {
      this.currentTab = this.value;
    } else if (this.hasRouterParams && query && this.keys.includes(query)) {
      this.setTabUsingQuery(this.id, query);
    } else if (this.keys.includes(this.value)) {
      this.currentTab = this.value;
    } else {
      this.currentTab = this.tabs[0][this.trackBy];
    }
  },
  mounted() {
    this.showTabPane();
  },
  methods: {
    isActive(index) {
      if (this.isSimple && this.currentTab === this.tabs[index]) return true;
      return (!this.isSimple && this.keys[index] === this.currentTab);
    },
    setTab(tab) {
      if (this.currentTab !== tab) {
        this.currentTab = tab;
        if (this.hasRouterParams) {
          this.$router.push({
            query: { tabId: this.id, trackBy: tab },
            params: { savePosition: true },
          });
        }
        this.showTabPane();
        this.emitter.emit('tabSelected', tab);
      }
    },
    /**
     * Show relevant pane based on current tab selection
     * If panes are not defined ignore
     */
    showTabPane() {
      this.keys.every((key) => {
        const node = document.querySelector(`#opus-tab-content-${this.id} #${key}`);
        if (!node) return false;
        if (key === this.currentTab) {
          node.style.display = 'block';
        } else {
          node.style.display = 'none';
        }
        return true;
      });
    },
    setTabUsingQuery(tabId, query) {
      if (this.id === tabId && this.keys.includes(query)) {
        this.currentTab = query;
        this.emitter.emit('tab-selected', this.currentTab);
      }
    },
  },
};
</script>

<style scoped>
.opus-tabs ul {
  position: relative;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 0;
}
.opus-tabs ul li {
  position: relative;
  list-style: none;
  white-space: nowrap;
  margin-right: 32px;
  height: 38px;
  font-size: 18px;
  font-weight: 300;
  color: #333333;
  line-height: 25px;
}
.opus-tabs ul li.active {
  font-weight: 700;
  color: #000000;
}
.opus-tabs ul li.active::after {
  position: absolute;
  content: '';
  top: 8px;
  border-bottom: 8px solid #4c9e45;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.opus-tabs ul::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}
.opus-tabs ul::after {
  position: absolute;
  content: '';
  z-index: 0;
  border-bottom: 0.5px solid #bdbdbd;
  width: 100%;
  bottom: 4px;
  left: 0;
}
</style>
