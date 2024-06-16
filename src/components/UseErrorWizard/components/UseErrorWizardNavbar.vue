<template>
  <div class="UseErrorWizardNavbar opus-bg-green-1 d-flex">
    <div
      class="tab"
      :class="tabSelected === 'Overview' ? 'active' : ''"
      @click="optionSelected"
    >
      Overview
    </div>
    <div
      v-for="(navItem, i) in tabs"
      :key="i"
      class="tab"
      :class="tabSelected === navItem ? 'active' : ''"
      @click="optionSelected"
    >
      {{ navItem }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'UseErrorWizardNavbar',
  props: ['tabs'],
  data() {
    return {
      tabSelected: 'Overview'
    };
  },
  methods: {
    optionSelected(e) {
      this.tabSelected = e.target.innerText;
      this.$emit('activeTabName', this.tabSelected);
    }
  }
};
</script>
<style scoped>
.UseErrorWizardNavbar {
  max-width: 1000px;
  width: 100%;
}

.tab:first-child {
  margin-left: 60px;
}

.tab {
  padding: 8px 20px;
}

.tab:hover {
  cursor: pointer;
}
.tab.active {
  border-top: 3px solid #4c9e45;
  background-color: #fff;
}
</style>
