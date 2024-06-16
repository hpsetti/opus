<template>
  <div class="OpusUrraNavbar d-flex justify-content-between">
    <div
      class="nav-arrow nav-left d-flex align-items-center justify-content-center"
      :class="[
        disableLeftScroll ? 'disableBtn' : '',
        disableScroll ? 'hideScrollBtns' : ''
      ]"
      @click="scrollLeft"
    >
      <img src="/static/images/icons/insights_left_icon.svg" />
    </div>
    <div class="nav-container d-flex">
      <div
        v-for="tabName in urraTabs"
        :key="tabName.id"
        class="tab"
        :class="[
          tabSelected === tabName ? 'active' : '',
          paid || tabName === 'Risk ID' || tabName === 'Use scenarios'
            ? 'paidTab'
            : ''
        ]"
        @click="optionSelected"
      >
        <span class="tabitem">{{ tabName }}</span>
      </div>
    </div>

    <div
      class="nav-arrow nav-right d-flex align-items-center justify-content-center"
      :class="[
        disableRightScroll ? 'disableBtn' : '',
        disableScroll ? 'hideScrollBtns' : ''
      ]"
      @click="scrollRight"
    >
      <img src="/static/images/icons/insights_right_icon.svg" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'OpusUrraNavbar',
  props: ['paid', 'activeParentTab', 'useErrorContent'],
  data() {
    return {
      urraTabs: [],
      tabSelected: 'Risk ID',
      disableRightScroll: false,
      disableLeftScroll: true,
      disableScroll: false
    };
  },
  watch: {
    useErrorContent() {},
    activeParentTab(e) {
      this.activeParentTab = e;
      if (e !== 'Overview') {
        this.urraTabs = Object.keys(this.useErrorContent[e]);
      }
      this.tabSelected = 'Risk ID';
      // console.dir(document.querySelector('.nav-container'));
      const navBarDOMElement = document.querySelector('.nav-container');
      if (navBarDOMElement.clientWidth === navBarDOMElement.scrollWidth) {
        this.disableScroll = true;
      } else {
        this.disableScroll = false;
      }
    }
  },
  created() {
    if (this.activeParentTab !== 'Overview') {
      this.urraTabs = Object.keys(this.useErrorContent[this.activeParentTab]);
    }
  },
  mounted() {
    const navBarDOMElement = document.querySelector('.nav-container');
    if (navBarDOMElement.clientWidth === navBarDOMElement.scrollWidth) {
      this.disableScroll = true;
    } else {
      this.disableScroll = false;
    }
  },
  methods: {
    optionSelected(e) {
      this.tabSelected = e.target.innerText;
      this.$emit('activeTabName', this.tabSelected);
    },
    scrollRight() {
      const navBarDOMElement = document.querySelector('.nav-container');
      if (
        navBarDOMElement.scrollWidth - navBarDOMElement.scrollLeft !==
        navBarDOMElement.clientWidth
      ) {
        this.disableRightScroll = false;
        this.disableLeftScroll = false;

        navBarDOMElement.scrollBy(200, 0);
      } else {
        this.disableRightScroll = true;
      }
    },
    scrollLeft() {
      const navBarDOMElement = document.querySelector('.nav-container');
      if (navBarDOMElement.scrollLeft !== 0) {
        this.disableRightScroll = false;
        this.disableLeftScroll = false;
        navBarDOMElement.scrollBy(-200, 0);
      } else {
        this.disableLeftScroll = true;
      }
    }
  }
};
</script>
<style scoped>
.nav-arrow {
  width: 44px;
}
.disableBtn {
  opacity: 0.5;
}

.hideScrollBtns {
  visibility: hidden;
}
.nav-container {
  overflow-x: scroll;
  scrollbar-width: none;
  width: 100%;
}
.tab {
  padding: 5.5px 16px;
  background: #f2f2f2;
  opacity: 0.6;
  border: 1px solid rgba(130, 130, 130, 0.6);
  border-radius: 5px;
  margin-left: 8px;
  margin-right: 8px;
  height: 36px;
  white-space: nowrap;
}

.tab.active {
  background-color: #fff;
  border: 1px #fff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border-bottom-right-radius: unset;
  border-bottom-left-radius: unset;
  color: #333333;
  font-weight: 600;
  opacity: 1;
}

.tab:hover {
  cursor: pointer;
}

.paidTab {
  opacity: 1;
}

::-webkit-scrollbar {
  display: none;
}
</style>
