<template>
  <div class="tabs">
    <OpusTabs :tabs="tabs" showTabCount v-model="tabName"></OpusTabs>
  </div>
</template>

<script>
import OpusTabs from '../UIComponents/OpusTabs.vue';

export default {
  props: ['tabs'],
  components: {
    OpusTabs
  },
  data() {
    return {
      tabName: 'general'
    };
  },
  watch: {
    tabName: {
      handler(value) {
        this.$emit('tab-click', value);
      },
      immediate: true
    }
  }
};
</script>
<style scoped>
.tabs {
  margin-left: 35px;
  margin-right: 35px;
}
</style>
