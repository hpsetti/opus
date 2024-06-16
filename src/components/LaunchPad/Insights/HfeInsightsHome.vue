<template>
  <div class="content-wrappper">
    <div class="row m-0">
      <div class="mt-20 pr-20 pl-20">
        <div
          class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 p-0"
        >
          <img
            @click="navigateToLaunchPad"
            class="back-img cursor-pointer"
            src="/static/images/icons/back_arrow.svg"
            alt=""
          />
          <router-link class="text-subtitle-2 blue-1" to="/launchpad"
            >Launchpad</router-link
          >
        </div>
        <div class="text-h3">HFE Insights</div>
      </div>
      <HFEGrid></HFEGrid>
    </div>
  </div>
</template>
<script>
import HFEGrid from './HFEGrid.vue';

export default {
  name: 'AdminHFEHome',
  components: {
    HFEGrid
  },
  data() {
    return {
      allCategoryList: [],
      getAvailableTags: []
    };
  },
  methods: {
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    }
  }
};
</script>
