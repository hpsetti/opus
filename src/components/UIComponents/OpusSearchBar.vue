<template>
  <div>
    <div v-if="hasExpand" class="cursor-pointer" :class="isActive ? 'search-container-expand' : 'search-container'">
      <img class="image-search" src="/static/images/icons/search_icon.svg" alt="Search" @click="makeBarExpand" />
        <input
          v-if="isActive"
          type="text"
          class="search-bar p-10"
          :placeholder="placeholder"
          v-model="searchText"
          @keydown.enter="search"
        />
    </div>
    <div v-else class="search-container-expand pl-10 pr-10 cursor-pointer">
      <img class="image-search" src="/static/images/icons/search_icon.svg" @click="search" alt="Search" />
        <input
          type="text"
          class="search-bar p-10"
          :placeholder="placeholder"
          v-model="searchText"
          @keydown.enter="search"
        />
        <!-- @keyup="search" -->
        <img
          v-if="searchText"
          @click="clear"
          src="/static/images/icons/danger_close_icon.svg"
          alt="Clear search query"
        />
    </div>
  </div>
</template>

<script>
// import { debounce } from 'lodash/debounce';

/**
 * @name OpusSearchBar
 * @todo
 * - Update the UI to match OPUS design while showing search dropdown results
 * - Implement debounce functionality
 * @fixme
 * - Search as you type with debounce is not working as expected
 */
export default {
  name: 'OpusSearchBar',
  props: {
    /**
     * Search event is emitted on clicking search button or enter key
     * debounce is not applied
     */
    searchOnEnter: {
      type: Boolean,
      default: false,
    },
    hasExpand: {
      type: Boolean,
      default: false,
    },
    /**
     * Debounce time period in ms
     */
    debounce: {
      type: Number,
      default: 5000,
    },
    /**
     * Placeholder text
     */
    placeholder: {
      type: String,
      default: 'Search',
    },
  },
  data() {
    return {
      searchText: '',
      isActive: false,
    };
  },
  /* created() {
    this.search = debounce(this.search, this.debounce);
  }, */
  methods: {
    makeBarExpand() {
      this.isActive = !this.isActive;
    },
    search() {
      this.$emit('search', this.searchText);
    },
    /* searchAfterDebounce() {
      console.log(this.searchText);
      // this.search();
      // if (!this.searchOnEnter) {
      debounce(this.search, this.debounce);
      // }
    }, */
    /* debouncedSearch() {
      // eslint-disable-next-line
      debounce(this.search, this.debounce);
    }, */
    clear() {
      this.searchText = '';
      this.$emit('search', '');
    }
  }
};
</script>
<style scoped>
.search-container {
  border: 1px solid rgba(0, 0, 0);
  border-radius: 22px;
  display: flex;
  height: 40px;
  width: 40px;
  float: right;
}
.image-search {
  width: 24px;
  height: 24px;
  margin-left: 8px;
  margin-top: 8px;
}
.search-container-expand {
  border: 0.5px solid rgba(0, 0, 0);
  border-radius: 22px;
  display: flex;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
.search-bar {
  flex: 1;
}
.search-bar::placeholder {
  color: rgba(0, 0, 0, 0.5);
}
.search-bar:focus::placeholder {
  color: #333;
}
.search-bar::-webkit-input-placeholder {
  /* Edge */
  color: rgba(0, 0, 0, 0.5);
}
.search-bar:focus::-webkit-input-placeholder {
  /* Edge */
  color: #333;
}
.search-bar,
.search-bar:focus {
  border: none;
  width: auto;
  outline: none;
}
</style>
