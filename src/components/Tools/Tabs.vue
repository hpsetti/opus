<template>
  <ul class="horizontal-tabs d-flex p-0 mt-10">
    <li
      @click="setTab('all')"
      class="cursor-pointer"
      :class="{ active: value === 'all' }"
    >
      All({{ tabCount.all || 0 }})
    </li>
    <li
      @click="setTab(key)"
      class="cursor-pointer"
      v-for="(tabName, key) in tabs"
      :key="key"
      :class="{ active: value === key }"
    >
      {{ tabName }} ({{ tabCount[key] || 0 }})
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
    tabCount: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    setTab(tab) {
      if (this.value !== tab) {
        this.$emit('input', tab);
      }
    }
  }
};
</script>

<style scoped></style>
