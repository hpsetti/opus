<template>
  <div class="UseErrorOpusUrra">
    <OpusUrraNavbar
      @activeTabName="activeSubTabNameSelected"
      :activeParentTab="activeParentTab"
      :useErrorContent="useErrorContent"
      :key="activeParentTab"
      :paid="paid"
    />
    <OpusUrraMainContent
      :activeParentTab="activeParentTab"
      :paid="paid"
      :subTabName="activeSubTab"
      :useErrorContent="useErrorContent"
    />
  </div>
</template>
<script>
import OpusUrraNavbar from './OpusUrraNavbar.vue';
import OpusUrraMainContent from './components/OpusUrraMainContent.vue';

export default {
  name: 'UseErrorOpusUrra',
  props: ['paid', 'activeParentTab', 'useErrorContent'],
  components: {
    OpusUrraNavbar,
    OpusUrraMainContent
  },
  data() {
    return {
      activeSubTab: 'Risk ID',
      tabTypes: [
        {
          name: 'Instructions + Tips',
          key: 'Instructions + Tips'
        },
        {
          name: 'Practice',
          key: 'Practice'
        }
      ]
    };
  },
  watch: {
    activeParentTab(e) {
      if (this.activeParentTab === e) {
        this.activeSubTab = 'Risk ID';
      }
    }
  },
  methods: {
    activeSubTabNameSelected(e) {
      this.activeSubTab = e;
    }
  }
};
</script>
<style scoped></style>
