<template>
  <div class="activity-tracker-tabs mt-20">
    <OpusTabs
      :tabs="[{ name: 'Accounts', key: 'accounts' }]"
      v-model="tabActiveName"
    ></OpusTabs>
  </div>
</template>

<script>
import OpusTabs from '../UIComponents/OpusTabs.vue';

export default {
  name: 'ActivityTabs',
  components: { OpusTabs },
  props: [
    'accountCount',
    'userCount',
    'loginActCount',
    'resetSearch',
    'activeItem'
  ],
  data() {
    return {
      tabActiveName: 'accounts'
    };
  },
  methods: {
    tabClicked(tab) {
      this.$emit('selectedMenu', tab.name);
    }
  },
  watch: {
    activeItem() {
      this.tabActiveName = this.activeItem;
    }
  }
};
</script>
