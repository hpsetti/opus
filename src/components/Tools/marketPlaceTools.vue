<template>
  <div class="col-xs-12 p-0">
    <tabs v-model="activeTabName" :tabs="availableTabs" :tabCount="availableTabCount"></tabs>
    <div v-if="this.$route.path === '/tools'" class="opus-tools-header d-flex justify-content-between align-items-center xs-flex-column">
      <h2 class="text-h3 mb-0">Marketplace</h2>
      <div style="" class="xs-width-100-650 opus-tools-select">
    <OpusSelect class="opusToolsSelect" v-model="activeTabName.available" :options="trainingsData.available" trackBy="id" :custom-label="customLabel"/>
        

      </div>
      
    </div>
    <template v-if="toolsData && toolsData.length">
      <div
        class="col-xs-12 p-0"
        v-for="documentDetails in toolsData"
        :key="`${documentDetails.plan_id}`"
      >
        <training-details
          @setSelectedTrainingItem="setSelectedTrainingItem"
          @setCartInfo="setCartInfo($event, 'tools')"
          :userId="userId"
          :trainingDetails="documentDetails"
          @removeFromCart="removeFromCart"
        ></training-details>
      </div>
    </template>
    <template v-else-if="toolsData && !toolsData.length && !loaderStatus">
      <div
        class="col-xs-12 col-xs-12 text-center no-data-text font-22 fw-700 mt-20 mb-20"
      >
        You have purchased all the tools
      </div>
    </template>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
    <documents-info
      :isRca="true"
      :loader="loaderStatus"
      :templateInfo="selectedCartItem"
      :userId="userId"
      @setCartInfo="setCartInfo"
      :moduleType="'tools'"
    ></documents-info>
  </div>
</template>

<script>
import $ from 'jquery';
import Tabs from './Tabs.vue';
import cloneDeep from 'lodash/cloneDeep';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
// import DocumentDetails from './DocumentDetails.vue';
import DocumentsInfo from '../UIComponents/Modals/DocumentsMoreInfo.vue';
import Loader from '../UIComponents/Loader.vue';
import TrainingDetails from './TrainingDetails.vue';
import { getResourcesListById } from '../../apis/marketPlaceResources';
import { removeFromCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';

export default {
  props: {
    loader: {
      type: Boolean
    },
    userId: {
      type: Number,
      required: true
    },
    // TODO Make type as number rather than string form serverside.
    toolName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loaderStatus: false,
      toolsData: {},
      cartInfo: {},
      documentInfo: {},
      selectedCartItem: {},
      activeTabName: {
        available: {
          id: 0,
          name: 'View all',
          no_of_documents: 0,
          sequence: 0
        }
      },
      trainingsData: {
        available: [{
          id: 0,
          name: 'View all',
          no_of_documents: 0,
          sequence: 0
        }]
      },
      filteredList: [],
      availableTabs: {},
      availableTabCount: {
        all: 0
      }
    };
  },

  components: {
    AddRemoveCartPopup,
    // DocumentDetails,
    OpusSelect,
    DocumentsInfo,
    TrainingDetails,
    Loader,
    Tabs,
  },
  created() {
    this.getList();
  },

  methods: {
    closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.getList();
    },
    async removeFromCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const res = await removeFromCart(
        this.selectedCartItem.cart_status.cart_id
      );
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if ($('#document-more-info').hasClass('in')) {
          $('#document-more-info').modal('hide');
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        this.getList();
        this.emitter.emit('cart-items-updated');
      }
    },
    setSelectedTrainingItem(trainingInfo) {
      this.selectedCartItem = trainingInfo.item;
      $('#document-more-info').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    setCartInfo(cartDetails) {
      this.cartInfo = { ...cartDetails.cartInfo };
      this.selectedCartItem = cartDetails.item;
      if (
        $('#document-more-info').hasClass('in') &&
        this.cartInfo.type === 'add'
      ) {
        $('#document-more-info').modal('hide');
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async getList() {
      this.loaderStatus = true;
      this.toolsData = await getResourcesListById(1, this.userId);
      const tools = this.toolsData.item_list.filter((item) => {
        if (!this.toolName) return true;
        return item.plan_name === this.toolName;
      });
      this.toolsData = tools;
      const finalFilteredData = cloneDeep(this.toolsData);
      const finalData = finalFilteredData.map((item) => {
        if (item.Tool.cart_status.purchase_status === 'REMOVE_FROM_CART') {
          item.Tool.cart_status.purchase_status = 'GO_TO_CART';
        }
        return item;
      });
      this.toolsData = finalData;
      this.setCountForTabs();
      this.loaderStatus = false;
    },
    setCountForTabs() {
      const count = this.toolsData?.length || 0;
      this.availableTabCount = {
        all: count
      };
    },
    navigateToMarketplace() {
      this.$router.push('/market-place');
    },
    openMoreInfoPopup(details) {
      this.documentInfo = details;
      $('#document-more-info').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    customLabel(option) {
      // if (option.name === 'View all') return option.name;
      return `${option.name} (${this.availableTabCount.all})`;
    }
  }
};
</script>

<style scoped>
.opus-tools-header {
  margin-top: 25px;
  margin-bottom: 25px;
}

.opus-tools-select {
  margin-top: 15px;
  width: 375px; 
  max-width: 100%;
  align-self: center;
}

@media screen and (max-width: 757px) {
  .xs-width-100-650 >>> .opus-multiselect.multiselect, .xs-width-100-650 >>> .opus-multiselect.multiselect.sm {
    max-width: 100%;
    
  }
  .opus-tools-header {
 align-items: flex-start;
}
}

@media screen and (max-width: 650px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .opus-tools-select {
  align-self: unset;
}
}
</style>
