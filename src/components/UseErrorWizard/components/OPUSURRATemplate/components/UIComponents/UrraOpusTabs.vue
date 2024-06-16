<template>
  <div class="UrraOpusTabs">
    <div class="urraTabs--container">
      <ul class="tabItem--container d-flex">
        <li
          class="tabItem"
          :class="tabSelected === tab ? 'active' : ''"
          v-for="(tab, i) in tabs"
          :key="i"
          @click="tabClicked"
        >
          {{ tab }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UrraOpusTabs',
  props: ['tabs'],
  data() {
    return {
      tabSelected: 'Instructions + Tips'
    };
  },
  watch: {
    tabs(e) {
      const [item1] = e;
      this.tabSelected = item1;
      this.$emit('tabClickedEvent', this.tabSelected);
    }
  },
  methods: {
    tabClicked(e) {
      this.tabSelected = e.target.innerText;
      this.$emit('tabClickedEvent', this.tabSelected);
    }
  }
};
</script>
<style scoped>
.urraTabs--container ul {
  position: relative;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 0;
}
.urraTabs--container ul::after {
  position: absolute;
  content: '';
  z-index: 0;
  border-bottom: 0.5px solid #bdbdbd;
  width: 100%;
  bottom: 4px;
  left: 0;
}
.tabItem {
  list-style: none;
}

.tabItem:hover {
  cursor: pointer;
}
.urraTabs--container ul li {
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

.urraTabs--container ul li.active {
  font-weight: 700;
  color: #000000;
}

.urraTabs--container ul li.active::after {
  position: absolute;
  content: '';
  top: 8px;
  border-bottom: 8px solid #4c9e45;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
}
</style>
