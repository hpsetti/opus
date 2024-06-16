<template>
  <div class="content-wrappper p-20">
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 col-sm-8">
        <div class="col-xs-12 p-0 mb-20 text-primary module-header fw-300">
          Discover OPUS tools
        </div>
        <div class="col-xs-12 col-sm-9 p-0">
          <p>
            OPUS provides productivity tools to support your analysis, design,
            evaluation, and validation efforts.
          </p>
          <p>
            Our complimentary tools help with key HFE decisions, like defining
            an appropriate scope for an HFE project or usability test, or
            choosing the right text size. Our premium tool – the RCA Wizard –
            enhances your RCA skills by providing immediate access to hundreds
            of common root causes.
          </p>
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 xs-hide-650">
        <img
          class="mt-10"
          src="/static/images/icons/tools_not_selected.svg"
          alt=""
        />
      </div>
    </div>
    <div>
      <div class="col-xs-12 mb-30">
        <available-tools
          :loader="loaderStatus"
          :userId="userId"
        ></available-tools>
      </div>
      <!-- <div class="col-xs-12 market-place-header mt-10 mb-10">Marketplace</div> -->
      <div class="col-xs-12">
        <market-place-tools
          :loader="loaderStatus"
          :userId="userId"
          :purchasedList="purchasedDocsList"
        ></market-place-tools>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import marketPlaceTools from './marketPlaceTools.vue';
import AvailableTools from './AvailableTools.vue';
import Loader from '../UIComponents/Loader.vue';
import getToolsData from '../../apis/opusTools';

export default {
  props: ['userId'],
  data() {
    return {
      loaderStatus: false,
      purchasedDocsList: [],
      availableDocsList: []
    };
  },
  async created() {
    await this.getAllDocuments();
  },
  components: {
    AvailableTools,
    Loader,
    marketPlaceTools
  },
  methods: {
    async getAllDocuments() {
      this.loaderStatus = true;
      this.availableDocsList = await getToolsData();
      this.loaderStatus = false;
    }

    /* async fetchNewList() {
      await this.getAllDocuments();
    }, */
  }
};
</script>

<style scoped>
.module-header {
  font-size: 36px;
  line-height: 49px;
}

.module-content {
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}

.market-place-header {
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  color: #333333;
}

@media screen and (max-width: 650px) {
  .xs-hide-650 {
    display: none;
  }
}
</style>
