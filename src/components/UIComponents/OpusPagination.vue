<template>
  <div class="opus-pagination">
    <ul class="page-controls m-0">
      <li class="page-item">
        <button
          type="button"
          @click="prevPage"
          :disabled="inFirstPage || disabled"
          title="Go to previous page"
        >
          <img src="/static/images/icons/chevron_left_icon.svg" />
        </button>
      </li>
      <li
        v-for="page in pageBreak"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <button
          type="button"
          :disabled="disabled"
          @click="setPage(page)"
          :title="`Go to page number ${page}`"
        >
          {{ page }}
        </button>
      </li>
      <li v-if="showPageBreak" class="page-item">
        <button type="button" disabled>...</button>
      </li>
      <li
        v-for="page in lastPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <button
          type="button"
          @click="setPage(page)"
          :disabled="disabled"
          :title="`Go to page number ${page}`"
        >
          {{ page }}
        </button>
      </li>
      <!-- <li v-if="dotsVisible">
        <img src="/static/images/icons/pagination_dots.svg" class="pagination_dots" />
      </li> -->
      <li class="page-item">
        <button
          type="button"
          @click="nextPage"
          :disabled="inLastPage || disabled"
          aria-label="Go to next page"
          class="side-navigation"
        >
          <img src="/static/images/icons/chevron_right_icon.svg" />
        </button>
      </li>
    </ul>
    <div class="d-flex align-items-center">
      <div v-if="showPerPageControl" class="per-page-control">
        <OpusSelect
          :options="perPageCounts"
          v-model="pageCount"
          :allow-empty="false"
          :disabled="disabled"
        ></OpusSelect>
      </div>
      <div class="text-body-light text-secondary">
        <span>{{
          `${itemRange.start} - ${itemRange.end} of ${this.total} Records`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import OpusSelect from './OpusSelect.vue';

/**
 * @name OpusPagination
 * @fixme
 * - Improve UX when there are large number of pages to be shown and selected
 * page is at the middle
 */
export default {
  name: 'OpusPagination',
  components: {
    OpusSelect,
  },
  props: {
    /**
     * Total number of items in the list
     */
    total: {
      type: Number,
      required: true
    },
    /**
     * Number of items to be shown per page by default
     * Ensure this number is in perPageCounts array
     * Supports .sync modifier
     */
    perPage: {
      type: Number,
      default: 10
    },
    /**
     * Current page number that is being displayed
     * Supports .sync modifier
     */
    currentPage: {
      type: Number,
      default: 1
    },
    /**
     * Maximum number of pages to be shown explicitly
     * Beyond this we will show a page break in the middle
     * When set to 0 show all pages
     */
    maxPages: {
      type: Number,
      default: 5
    },
    /**
     * Disable pagination controls?
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Show per page dropdown for end user to select
     * Hide the control when empty
     */
    perPageCounts: {
      type: Array,
      default: () => [10, 20, 50],
    },
    /**
     * Show per page control by default?
     */
    showPerPageControl: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    numPages() {
      return Math.ceil(this.total / this.pageCount);
    },
    isValidPage() {
      return this.currentPage <= this.numPages;
    },
    inFirstPage() {
      return this.currentPage === 1;
    },
    inLastPage() {
      return this.currentPage === this.numPages || this.numPages <= 0;
    },
    showPageBreak() {
      return this.maxPages && this.maxPages < this.numPages;
    },
    itemRange() {
      return {
        start: (this.currentPage - 1) * this.pageCount + 1,
        end: this.inLastPage ? this.total : this.currentPage * this.pageCount,
      };
    },
    pageBreak() {
      if (!this.showPageBreak) return this.numPages;
      return this.numPages <= this.maxPages
        ? this.numPages
        : Math.ceil(this.maxPages / 2);
    },
    lastPages() {
      const pages = [];
      for (let i = 1; i <= this.numPages; i += 1) {
        if (i > this.pageBreak) {
          pages.push(i);
        }
      }
      return pages.slice(0 - (this.maxPages - this.pageBreak));
    }
  },
  data() {
    return {
      pageCount: 0,
    };
  },
  watch: {
    perPage: {
      handler(value) {
        this.pageCount = value || this.perPageCounts[0] || 10;
      },
      immediate: true,
    },
    pageCount(value) {
      this.setPage(1);
      this.$emit('update:perPage', value);
    },
  },
  methods: {
    setPage(page) {
      this.$emit('pagechanged', page);
      this.$emit('update:currentPage', page);
    },
    prevPage() {
      const page = this.inFirstPage ? 1 : this.currentPage - 1;
      this.setPage(page);
    },
    nextPage() {
      const page = this.inLastPage ? this.numPages : this.currentPage + 1;
      this.setPage(page);
    },
  },
};
</script>

<style>
.opus-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}
.opus-pagination .page-controls {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  column-gap: 32px;
  align-items: flex-start;
  text-decoration: none;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
}
.opus-pagination .per-page-control {
  padding-right: 24px;
}
.opus-pagination .page-item {
  min-width: 16px;
  text-align: center;
}
.opus-pagination .page-item img {
  width: 18px;
  height: 18px;
}
.opus-pagination .page-item.active {
  border-bottom: 2px solid #4c9e45;
}
.opus-pagination .page-item > button:disabled {
  opacity: 0.3;
}
/*
** Show the controls and statistics in the center of the page for small screens
**/
@media screen and (max-width: 768px) {
  .opus-pagination .page-controls {
    position: unset;
    left: unset;
    transform: unset;
  }
  .opus-pagination {
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    justify-content: center;
  }
}
</style>
