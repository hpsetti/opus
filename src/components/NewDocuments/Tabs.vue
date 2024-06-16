<template>
  <ul class="horizontal-tabs d-flex p-0 mt-10">
    <li
      @click="setTab('all')"
      class="cursor-pointer"
      :class="{ active: value === 'all' }"
    >
      {{ allTabsLabel }}
      <span v-if="showTabCount">({{ tabCount.all || 0 }})</span>
    </li>
    <li
      @click="setTab(key)"
      class="cursor-pointer"
      v-for="(tabName, key) in tabs"
      :key="key + '_' + (tabCount[key] || 0)"
      :class="{ active: value === key }"
    >
      {{ tabName }} <span v-if="showTabCount">({{ tabCount[key] || 0 }})</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'all'
    },
    tabs: {
      type: Object,
      default: () => {}
    },
    isUrlWithQuery: {
      type: Boolean,
      default: false
    },
    tabCount: {
      type: Object,
      default: () => {}
    },
    showTabCount: {
      type: Boolean,
      default: true
    },
    allTabsLabel: {
      type: String,
      default: 'View All'
    }
  },

  created() {
    const queryName = this.$route.query?.name;
    if (queryName && this.isUrlWithQuery) {
      this.setTabNameFromQuery(queryName);
    }
  },

  watch: {
    $route(to) {
      if (to.query?.name && this.isUrlWithQuery) {
        this.setTabNameFromQuery(to.query.name);
      }
    }
  },

  methods: {
    setTab(tab) {
      if (this.isUrlWithQuery && this.value !== tab) {
        this.$router.push({
          query: { name: tab },
          params: { savePosition: true }
        });
      } else if (this.value !== tab) {
        this.$emit('input', tab);
      }
    },

    setTabNameFromQuery(queryName) {
      let currentTab = '';
      const possibleDocTypes = Object.keys(this.tabs);
      if (possibleDocTypes.includes(queryName)) {
        currentTab = queryName;
      } else {
        currentTab = 'all';
        // this.$emit('setIsFromQuery');
      }
      this.$emit('input', currentTab);
    }
  }
};
</script>

<style scoped></style>
