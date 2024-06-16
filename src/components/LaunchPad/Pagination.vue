<template>
  <div class="box-wrapper">
    <ul class="pagination">
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          aria-label="Go to previous page"
          class="side-navigation"
        >
          <img
            class="left-transform"
            src="/static/images/icons/chevron_right.svg"
          />
        </button>
      </li>
      <li class="pagination-item">
        <button
          v-if="totalPages > maxVisibleButtons && currentPage > 2"
          @click="onClickPage(1)"
          type="button"
          :aria-label="`Go to page number ${1}`"
        >
          1
        </button>
      </li>
      <li v-if="totalPages > maxVisibleButtons + 1 && currentPage > 3">
        <img
          src="/static/images/icons/pagination_dots.svg"
          class="pagination_dots"
        />
      </li>
      <li
        v-for="(page, index) in pages"
        :key="index"
        class="pagination-item"
        :class="{ active: isPageActive(page.name) }"
      >
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :aria-label="`Go to page number ${page.name}`"
        >
          {{ page.name }}
        </button>
      </li>
      <li v-if="dotsVisible">
        <img
          src="/static/images/icons/pagination_dots.svg"
          class="pagination_dots"
        />
      </li>
      <li
        v-if="validateLastPage"
        class="pagination-item"
        :class="{ active: isPageActive(totalPages) }"
      >
        <button
          type="button"
          @click="onClickPage(totalPages)"
          :aria-label="`Go to page number ${totalPages}`"
        >
          {{ totalPages }}
        </button>
      </li>
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          aria-label="Go to next page"
          class="side-navigation"
        >
          <img src="/static/images/icons/chevron_right.svg" />
        </button>
      </li>
    </ul>
    <div class="dis-inline fs-16 fw-normal">
      <span>{{ currentRecords }}</span>
      <span>of</span>
      <span>{{ total }}</span>
      <span>Records</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 6
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentRecords() {
      let records = this.currentPage * this.perPage;
      if (this.perPage > this.total) {
        records = this.total;
      }
      if (this.currentPage * this.perPage > this.total) {
        records = this.total;
      }
      return records;
    },
    startPage() {
      if (this.currentPage === 1 || this.totalPages < this.maxVisibleButtons) {
        return 1;
      }
      if (
        this.currentPage === this.totalPages &&
        this.totalPages > this.maxVisibleButtons
      ) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      if (this.totalPages - this.currentPage < this.maxVisibleButtons - 2) {
        const range = this.totalPages - this.maxVisibleButtons + 1;
        return range < 1 ? 1 : range;
      }
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      const maxRange =
        this.startPage < 2
          ? this.startPage + this.maxVisibleButtons
          : this.startPage + this.maxVisibleButtons - 1;
      const pagesRange =
        this.totalPages < this.maxVisibleButtons
          ? this.totalPages + 1
          : maxRange;
      for (let i = this.startPage; i < pagesRange; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }
      if (range.length === 0 && this.totalPages === 1) {
        range.push({
          name: 1,
          isDisabled: this.currentPage === 1
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    dotsVisible() {
      let validate = false;
      const range = this.totalPages - this.pages[0].name;
      if (
        this.totalPages > this.maxVisibleButtons + 1 &&
        range >= this.maxVisibleButtons
      ) {
        validate = true;
      }
      return validate;
    },
    validateLastPage() {
      let validate = false;

      if (
        this.totalPages > this.maxVisibleButtons &&
        this.pages[this.pages.length - 1].name < this.totalPages
      ) {
        validate = true;
      }
      return validate;
    }
  },
  methods: {
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>
<style scoped>
.box-wrapper {
  text-align: center;
  font-family: Roboto;
  font-style: normal;
  line-height: 21px;
}
.left-transform {
  transform: rotate(-180deg);
}
.pagination_dots {
  vertical-align: sub;
}
.pagination-item > button {
  background-color: white;
  border: 0px;
  padding: 5px 5px;
  color: #0b3c61;
  font-size: 18px;
}
.pagination-item > button:focus {
  outline: 0px;
}
.pagination-item > button[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
.pagination-item.active > button {
  opacity: 1;
  font-weight: bolder;
  font-size: 18px;
  line-height: 16px;
}
.pagination-item > button > img,
.pagination-item > button > img:focus {
  width: 25px;
  height: 30px;
  border: 0px;
}
.pagination-item > button.side-navigation {
  padding: 0px;
}
.pagination-item {
  vertical-align: middle;
  margin: 0 5px;
}
.pagination-item.active {
  border-bottom: 4px solid #4c9e45;
  padding-top: 6px;
}
span {
  vertical-align: middle;
  margin-left: 10px;
}
.dis-inline {
  display: inline;
}
.fs-16 {
  font-size: 16px;
}
.fw-normal {
  font-weight: normal;
}
</style>
