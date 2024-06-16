<template>
  <div :id="id" class="dashboard-card">
    <div class="d-flex justify-content-between">
      <div
        v-if="screenWidth <= 620"
        class="d-flex justify-content-between align-items-center controls-xs"
      >
        <div class="heading">
          <div class="d-flex align-items-center">
            <img :src="heading.path" class="opus-icon" />
            <span class="pl-15 blue-1 text-h4">{{ heading.text }}</span>
          </div>
        </div>
        <div class="my-auto left-btn-container">
          <button
            type="button"
            class=""
            :disabled="!canScrollLeft"
            @click="scrollLeft"
          >
            <img
              src="/static/images/icons/insights_left_icon.svg"
              class="opus-icon"
              :class="{ 'cursor-pointer': canScrollLeft }"
            />
          </button>
        </div>
        <div class="my-auto">
          <button
            type="button"
            class="mr-15 ml-15"
            :disabled="!canScrollRight"
            @click="scrollRight"
          >
            <img
              src="/static/images/icons/insights_right_icon.svg"
              class="opus-icon"
              :class="{ 'cursor-pointer': canScrollRight }"
            />
          </button>
        </div>
      </div>

      <div v-if="screenWidth > 620" class="heading">
        <div class="d-flex align-items-center">
          <img :src="heading.path" class="opus-icon" />
          <span class="pl-15 blue-1 text-h4">{{ heading.text }}</span>
        </div>
      </div>
      <div v-if="screenWidth > 620" class="my-auto left-btn-container">
        <button
          type="button"
          class=""
          :disabled="!canScrollLeft"
          @click="scrollLeft"
        >
          <img
            src="/static/images/icons/insights_left_icon.svg"
            class="opus-icon"
            :class="{ 'cursor-pointer': canScrollLeft }"
          />
        </button>
      </div>
      <div
        class="content d-flex opus-scrollbar hide-scrollbar"
        :class="heading.text === 'HFE Process' ? 'hfe-grid' : ''"
      >
        <div v-for="item in items" :key="item.id">
          <div
            class="content-item d-flex flex-direction-column align-items-center"
            @click="clickable ? $emit('click', item.id) : null"
            :class="clickable ? 'cursor-pointer' : ''"
          >
            <img :src="item.path" />
            <span class="text-subtitle-2 blue-1 mt-10">{{ item.text }}</span>
          </div>
        </div>
      </div>
      <div v-if="screenWidth > 620" class="my-auto">
        <button
          type="button"
          class="mr-15 ml-15"
          :disabled="!canScrollRight"
          @click="scrollRight"
        >
          <img
            src="/static/images/icons/insights_right_icon.svg"
            class="opus-icon"
            :class="{ 'cursor-pointer': canScrollRight }"
          />
        </button>
      </div>
    </div>
    <div class="text-right pb-10 pr-15">
      <span
        class="text-subtitle-1 blue-3 cursor-pointer"
        @click="$emit('view-all')"
        >View All
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    /**
     * Heading text
     */
    heading: {
      type: Object,
      required: true
    },
    /**
     * List of items. Need id, text and path (i.e. icon path)
     */
    items: {
      type: Array,
      required: true
    },
    /**
     * Unique id of the card instance
     */
    id: {
      type: String,
      required: true
    },
    /**
     * Whether the items in the card are clickable?
     */
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // Item width is 100, gap between items is 75
      itemWidth: 175,
      containerWidth: 0,
      scrollPos: 0,
      scrollableWidth: 0,
      screenWidth: 0
    };
  },
  watch: {
    items: {
      handler() {
        this.setContainerWidth();
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.setContainerWidth);
    this.updateScreenWidth();
    this.onScreenResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.setContainerWidth);
  },
  computed: {
    canScrollLeft() {
      return this.scrollPos > 0;
    },
    canScrollRight() {
      // The scroll movement may not be accurate where display scaling is enabled
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
      return this.scrollableWidth - this.scrollPos > 10;
    }
  },
  methods: {
    setContainerWidth() {
      const sideBarVisible = Boolean(window.innerWidth > 768);
      const availableWidthOffset =
        (sideBarVisible ? 250 : 0) + // Side bar width
        24 + // dashboard container left padding
        56 + // this card left and right padding
        220 + // this card title width
        2 * 24; // this card's two controller's width
      const availableWidth = window.innerWidth - availableWidthOffset;
      this.containerWidth =
        Math.floor(availableWidth / this.itemWidth) * this.itemWidth;
      this.scrollableWidth =
        this.items.length * this.itemWidth - this.containerWidth;
    },
    scrollRight() {
      let scrollWidthMultiple = 1;
      if (this.screenWidth <= 1200) {
        scrollWidthMultiple = 8;
      }
      document
        .getElementById(this.id)
        .getElementsByClassName('content')[0]
        .scrollBy(this.itemWidth * scrollWidthMultiple, 0); // for right scroll
      this.scrollPos += this.itemWidth * scrollWidthMultiple;
    },
    scrollLeft() {
      let scrollWidthMultiple = 1;
      if (this.screenWidth <= 1200) {
        scrollWidthMultiple = 8;
      } else if (this.screenWidth < 520) {
        scrollWidthMultiple = 12;
      }
      document
        .getElementById(this.id)
        .getElementsByClassName('content')[0]
        .scrollBy(-this.itemWidth * scrollWidthMultiple, 0); // for left scroll
      this.scrollPos -= this.itemWidth * scrollWidthMultiple;
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped>
.dashboard-card {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 20px 0;
}
.dashboard-card .heading {
  padding-left: 24px;
  padding-top: 32px;
  width: 170px;
}
.dashboard-card button:disabled {
  opacity: 0.3;
}
.left-btn-container {
  padding-left: 15px;
  padding-right: 15px;
}
.dashboard-card .content {
  column-gap: 75px;
  /* display: grid; */
  /* grid-template-columns: repeat(5, 1fr); */
  padding-right: 75px;
  overflow-x: hidden;
}
.dashboard-card .content-item {
  width: 100px;
  text-align: center;
  padding-top: 36px;
  padding-bottom: 36px;
}
.dashboard-card .content-item img {
  width: 62px;
  height: 62px;
}

.controls-xs {
  padding-top: 32px;
}

.controls-xs .heading {
  padding-top: 0;
}

@media screen and (max-width: 1200px) {
  .dashboard-card .content {
    column-gap: 18.5%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding-right: 75px;
    overflow-x: hidden;
  }

  .dashboard-card .hfe-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 700px) {
  .dashboard-card .content {
    column-gap: 15%;
  }
}
@media screen and (max-width: 620px) {
  /* .dashboard-card .content {
    column-gap: 15%;
  } */
  .dashboard-card > div {
    flex-direction: column;
    margin-left: 20px;
  }

  .dashboard-card .content {
    column-gap: 20%;
  }
}

@media screen and (max-width: 500px) {
  /* .dashboard-card .content {
    column-gap: 15%;
  } */

  .dashboard-card > div {
    margin-left: 0px;
  }

  .dashboard-card .content {
    column-gap: 12%;
  }
}

@media screen and (max-width: 400px) {
  .dashboard-card > div {
    margin-left: 0px;
  }
  .dashboard-card .content {
    column-gap: 5.5%;
  }
}

@media screen and (max-width: 360px) {
  .dashboard-card > div {
    /* flex-direction: column; */
    margin-left: 0px;
  }
}

@media screen and (max-width: 340px) {
  .dashboard-card .content {
    column-gap: 0%;
  }
}
</style>
