<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0">
        <div class="col-xs-12 d-flex align-items-center mb-10 p-0">
          <img
            @click="navigateToTools"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />
          <div class="welcome-common-header pl-25 fw-300">
            Design Recommendation Library<span
              class="free-button"
              v-if="!isPurchased"
              >Free version</span
            >
          </div>
        </div>
        <div class="col-xs-12 pl-40">
          <div class="col-xs-12 col-md-10 col-lg-10 pl-0 font-18 fw-700 mb-5">
            Identify potential user interface design recommendations
          </div>
          <div class="col-xs-6 pl-0 font-14">
            Apply filters to view matching recommendations, review the results,
            then leverage the text descriptions and illustrations to inform the
            design of your product.
          </div>
          <div
            class="col-xs-6 mb-15 cursor-pointer align-right"
            @click="openSuggestModal"
          >
            <BaseButton variant="secondary" has-icon @click="exploreLibrary">
              <img
                class="pr-10"
                src="/static/images/icons/goto_right.svg"
                alt=""
              />Skip and explore library now
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 pt-20 pl-30">
      <p class="text-h4 pl-30 pb-20">Popular searches</p>
      <div class="row w-90 pl-30 pb-20">
        <div v-for="(card, index) in finalList" :key="index">
          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-4 cursor-pointer"
            :class="
              !isPurchased &&
              !['Software', 'Hardware'].includes(card.sub_category_name)
                ? 'disable-filters'
                : 'not-disable-filters'
            "
            @click="viewSelectedFilter(card.subcategory_ids)"
          >
            <div class="popular-card mt-10">
              <div class="popular-background" :style="setBg(card.icon)">
                <img
                  class="pr-10 pt-10"
                  :src="getImageUrl(card.background_image)"
                  alt=""
                />
              </div>
              <p class="text-button-label m-15">{{ card.sub_category_name }}</p>
              <p class="m-10 pb-10">{{ card.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import { removeFromCart } from '../../../apis/cart';
import {
  getToolsPurchaseData,
  getPopularSearch
} from '../../../apis/designRecommendationLibrary';
import { getResourcesListById } from '../../../apis/marketPlaceResources';
import EventBus from '../../../utils/event-bus';

export default {
  props: ['userId'],
  data() {
    return {
      loaderStatus: false,
      trainingInfo: null,
      cartInfo: {},
      isPurchased: 1,
      finalList: {},
      staticFilterList: {
        Hardware: true,
        Software: true,
        Instructions: true,
        Packaging: true,
        'Labeling + On-device markings': true,
        'Alarms + Warnings': true
      }
    };
  },
  components: {
    Loader,
    BaseButton
  },
  async created() {
    await Promise.all([
      this.getFilters(),
      this.getToolData()
    ]);
  },

  methods: {
    setBg(path) {
      const imagePath = this.getImageUrl(path);
      return {
        backgroundImage: `url('${imagePath}')`,
        backgroundRepeat: 'round'
      };
    },
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}/${filePath}`;
      }
      return null;
    },
    async getFilters() {
      this.finalList = await getPopularSearch();
    },
    viewSelectedFilter(id) {
      this.$router.push({
        name: 'DesignRecommendationContent',
        query: {
          id
        }
      });
    },
    async getToolData() {
      const [purchasedData, toolsData] = await Promise.all([
        getToolsPurchaseData(+this.userId),
        getResourcesListById(1, this.userId)
      ]);
      // const purchasedData = await getToolsPurchaseData(+this.userId);
      this.toolsData = toolsData;
      // this.toolsData = await getResourcesListById(1, this.userId);
      this.isPurchased = purchasedData[0].enrolled;
    },
    closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
    },
    setCartInfo(cartDetails) {
      this.cartInfo = { ...cartDetails.cartInfo };
      this.selectedCartItem = cartDetails.item;
      if ($('#modal_video').hasClass('in') && this.cartInfo.type === 'add') {
        $('#modal_video').modal('hide');
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async exploreLibrary() {
      this.$router.push({
        path: '/tools/design-recommendation-library/library'
      });
    },

    async removeFromCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const res = await removeFromCart(
        this.selectedCartItem.cart_status.cart_id
      );
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if ($('#modal_video').hasClass('in')) {
          $('#modal_video').modal('hide');
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        this.emitter.emit('cart-items-updated');
      }
    },
    navigateToTools() {
      this.$router.push('/tools');
    },
    navigateToContactUs() {
      this.$router.push('/contact');
    },
    openSuggestModal() {
      $('#suggest-root-cause').modal('show');
    }
  }
};
</script>

<style scoped>
.disable-filters {
  opacity: 0.4;
  pointer-events: none;
  cursor: not-allowed;
}
.popular-card {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  height: 300px;
}

.popular-background {
  height: 134px;
  text-align: center;
}
.overlay {
  background: #4c9e45;
  opacity: 0.7;
}
.welcome-banner {
  padding: 30px 15px 24px 40px !important;
  margin-bottom: 0 !important;
}
.free-button {
  display: inline-block;
  padding: 1px 8px;
  background: #ffc62f;
  border-radius: 2px;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #333333;
  margin-left: 10px;
  margin-top: -5px;
  vertical-align: middle;
}
@media screen and (min-width: 1024px) {
  .md-pl-40 {
    padding-left: 40px;
  }
}

@media screen and (max-width: 767px) {
  .xs-pl-40 {
    padding-left: 40px;
  }
}

@media only screen and (min-width: 1026px) and (max-width: 1229px) {
  .action-options {
    padding-left: 0px !important;
  }
}
</style>
