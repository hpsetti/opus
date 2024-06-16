<template>
  <div class="row mr-0">
    <div class="col-xs-12 welcome-banner mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
        <img
          @click="navigateToMarketplace"
          class="cursor-pointer"
          src="/static/images/icons/chevron_left_white.svg"
          alt=""
        />
        <div class="welcome-common-header fw-300 pl-20">Tools</div>
      </div>
      <div class="col-xs-12 tools-desc col-xs-12 col-sm-6 font-14 fw-400 pl-30">
        Take the guesswork out of your HFE activities by leveraging OPUS tools
        that help with project scoping, human factors analysis, and user
        interface design. Download the results to support internal conversations
        about HFE decisions.
      </div>
    </div>
    <div
      class="col-xs-12 p-30 mb-10 subscription-options content-padding mb-10"
    >
      <div class="col-xs-12 featured-title pl-20">Featured Tool</div>
      <div class="col-xs-12 col-sm-6 pl-20 mb-15">
        Leverage the Root Cause Analysis Wizard to save time identifying and
        writing root causes for usability test findings. Go to the Tools page to
        try it for free.
      </div>
      <template v-if="toolsData.featured_list">
        <div
          class="col-xs-12 pl-20"
          v-for="documentDetails in toolsData.featured_list"
          :key="`${documentDetails.plan_id}-tools
        `"
        >
          <div class="purchased-tiles--container pl-10">
            <div
              v-if="windowWidth > 850"
              class="col-xs-12 d-flex mb-10 mt-15 pl-0 pr-0 dashed-border"
            >
              <div
                class="col-xs-10 xs-flex-column p-0 d-flex align-items-center pl-15"
              >
                <span class="text-primary cursor-pointer pr-10 sort-label">
                  Name
                </span>
              </div>
              <div
                class="col-xs-2 p-0 xs-flex-column d-flex align-items-center date--filter justify-content-end"
                v-if="documentDetails.purchase_date"
              >
                <span class="text-primary cursor-pointer pr-10"
                  >Purchased date</span
                >
              </div>
            </div>
            <training-details
              @setSelectedTrainingItem="setSelectedTrainingItem"
              @setCartInfo="setCartInfo($event, 'tools')"
              :userId="userId"
              :trainingDetails="documentDetails"
            ></training-details>
          </div>
        </div>
      </template>
    </div>
    <div class="col-xs-12 content-padding">
      <div
        class="col-xs-12 sm-pl-50 mb-20 d-flex column-gap-10p xs-flex-column"
      >
        <img
          class="flex-desktop"
          src="/static/images/newMarketplace/tools_desktop.svg"
          alt=""
        />
        <div class="d-flex flex-direction-column flex-50">
          <div class="header-main mt-10 mb-20">
            Complimentary and premium tools
          </div>
          <div class="fw-300 text-secondary pr-15">
            OPUS provides productivity tools to support your analysis, design,
            evaluation, and validation efforts. Our complimentary tools help
            with key HFE decisions, like defining an appropriate scope for an
            HFE project or usability test, or choosing the right text size. Our
            premium tool – the RCA Wizard – enhances your RCA skills by putting
            hundreds of root causes at your fingertips.
          </div>
          <div class="fw-300 text-secondary pr-15">
            Validity - 1 year access
          </div>
        </div>
      </div>
      <tabs
        v-model="activeTabName"
        :tabs="availableTabs"
        :tabCount="availableTabCount"
      ></tabs>
      <template v-if="toolsData.item_list && toolsData.item_list.length">
        <div
          class="col-xs-12 p-0 pr-20"
          v-for="documentDetails in toolsData.item_list"
          :key="`${documentDetails.plan_id}
        `"
        >
          <training-details
            @setSelectedTrainingItem="setSelectedTrainingItem"
            @setCartInfo="setCartInfo($event, 'tools')"
            :userId="userId"
            :trainingDetails="documentDetails"
          ></training-details>
        </div>
      </template>
      <template
        v-else-if="
          toolsData.item_list && !toolsData.item_list.length && !loaderStatus
        "
      >
        <div class="col-xs-12 mt-20 mb-20">
          <div
            class="col-xs-12 col-sm-10 col-md-8 d-flex col-gap-10 align-items-start"
          >
            <img src="/static/images/purchased_resources.svg" alt="" />
            <div class="col-xs-12 d-flex flex-direction-column row-gap-10">
              <span class="fw-400 purchased-text"
                >You currently have full access to all available resources</span
              >
              <span class="fw-300 font-18"
                >We will notify you of any new resources as they become
                available for purchase</span
              >
            </div>
          </div>
        </div>
      </template>
    </div>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart('tools')"
    ></add-remove-cart-popup>
    <documents-info
      :moduleType="'tools'"
      :loader="loaderStatus"
      :templateInfo="selectedDocument"
      :userId="userId"
      @setCartInfo="setCartInfo($event, 'tools')"
    />
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import TrainingDetails from '../Trainings/TrainingDetails.vue';
import Loader from '../../UIComponents/Loader.vue';
import DocumentsInfo from '../../UIComponents/Modals/DocumentsMoreInfo.vue';
import AddRemoveCartPopup from '../Modals/AddRemoveCartPopup.vue';
import Tabs from '../../NewDocuments/Tabs.vue';
import { getResourcesListById } from '../../../apis/marketPlaceResources';
import cartMixin from '../Mixins/shared';

export default {
  props: ['userId'],
  mixins: [cartMixin],
  data() {
    return {
      cartInfo: {},
      selectedDocument: {},
      availableTabs: {},
      availableTabCount: {
        all: 0
      },
      activeTabName: 'all',
      loaderStatus: false,
      windowWidth: window.innerWidth,
      toolsData: {}
    };
  },
  components: {
    DocumentsInfo,
    AddRemoveCartPopup,
    Loader,
    Tabs,
    TrainingDetails
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loaderStatus = true;
      const resId = this.$route.params.id ? Number(this.$route.params.id) : 1;
      this.toolsData = await getResourcesListById(resId, this.userId);
      const finalFilteredData = cloneDeep(this.toolsData);
      const finalData = finalFilteredData.item_list.map((item) => {
        if (item.Tool.cart_status.purchase_status === 'REMOVE_FROM_CART') {
          item.Tool.cart_status.purchase_status = 'GO_TO_CART';
        }
        return item;
      });
      const finalFeaturedData = finalFilteredData.featured_list.map((item) => {
        if (item.Tool.cart_status) {
          if (item.Tool.cart_status.purchase_status === 'REMOVE_FROM_CART') {
            item.Tool.cart_status.purchase_status = 'GO_TO_CART';
          }
        }
        return item;
      });
      this.toolsData.item_list = finalData;
      this.toolsData.featured_list = finalFeaturedData;
      this.setCountForTabs();
      this.loaderStatus = false;
    },
    setCountForTabs() {
      const count = this.toolsData.item_list?.length || 0;
      this.availableTabCount = {
        all: count
      };
    },
    navigateToMarketplace() {
      this.$router.push('/market-place');
    }
  }
};
</script>

<style scoped>
.welcome-banner {
  background: url('/static/images/newMarketplace/welcomebanner.svg') no-repeat;
  background-size: cover;
}

.content-padding {
  padding: 30px 15px 24px 50px;
}

.subscription-options,
.other-info {
  background: #ecf7fc;
}

.column-gap-10p {
  column-gap: 10%;
}

.no-data-text {
  color: #d3d6d9;
}

.flex-50 {
  flex: 0 0 50%;
}

.pr-15 {
  padding-right: 15px;
}

@media screen and (min-width: 757px) {
  .sm-pl-50 {
    padding-left: 50px;
  }
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .content-padding {
    padding: 30px 15px 24px 30px;
  }
}
</style>
