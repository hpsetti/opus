<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 p-0">
        <div class="col-xs-12 d-flex align-items-center mb-10 p-0">
          <img
            @click="navigateToTools"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />
          <div class="welcome-common-header pl-25 fw-300">
            Root Cause Analysis (RCA) Wizard<span
              class="free-button"
              v-if="!isPurchased"
              >Free version</span
            >
          </div>
        </div>
        <div class="col-xs-12 pl-40">
          <div class="col-xs-12 col-md-10 col-lg-10 pl-0 font-18 fw-700 mb-5">
            Identify potential root causes for usability test findings
          </div>
          <div class="col-xs-12 pl-0 col-md-10 col-lg-7 font-14">
            Apply filters to view matching root causes, review the results, then
            copy or download the root cause text for use as a starting point in
            your report.
          </div>
        </div>
      </div>
      <div
        class="col-xs-12 col-sm-4 col-md-4 col-lg-3 p-0 mt-10 xs-pl-40 md-pl-40 action-options"
      >
        <div
          class="col-xs-12 mb-15 d-flex align-items-center p-0 cursor-pointer"
          @click="openPerformModal"
        >
          <img src="/static/images/dashboard/ask_question.svg" alt="" />
          <span class="pl-15">How to perform RCA?</span>
        </div>
        <div
          class="col-xs-12 mb-15 d-flex align-items-center p-0 cursor-pointer"
          @click="openRCAExampleModal"
        >
          <img src="/static/images/icons/document_white.svg" alt="" />
          <span class="pl-15">View example RCA write up</span>
        </div>
        <div
          class="col-xs-12 mb-15 d-flex align-items-center p-0 cursor-pointer"
          @click="openSuggestModal"
        >
          <img src="/static/images/icons/edit.svg" alt="" />
          <span class="pl-15">Suggest a root cause</span>
        </div>
      </div>
    </div>
    <div class="col-xs-12 pt-0 pl-20 pr-20">
      <Root-cause-content :userId="userId" />
    </div>
    <RCAPerformModal
      :trainingInfo="trainingInfo"
      :userId="userId"
      @setCartInfo="setCartInfo"
      :loaderPopup="loaderStatus"
    />
    <SuggestRootCauseModal />
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../../UIComponents/Loader.vue';
import RootCauseContent from './RootCauseContent.vue';
import RCAPerformModal from './PerformModal.vue';
import SuggestRootCauseModal from './SuggestRootCause.vue';
import { getTrainingData } from '../../../apis/lmsTraining';
import { getRcaWriteupPDF } from '../../../apis/rootCauseAnalysis';
import { getToolsPurchaseData } from '../../../apis/designRecommendationLibrary';
import { removeFromCart } from '../../../apis/cart';
import AddRemoveCartPopup from '../../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import { getResourcesListById } from '../../../apis/marketPlaceResources';
import EventBus from '../../../utils/event-bus';
import postMarketoFormData from '../../../apis/marketo';

export default {
  props: ['userId'],
  data() {
    return {
      loaderStatus: false,
      trainingInfo: null,
      cartInfo: {},
      isPurchased: 1
    };
  },
  components: {
    Loader,
    RootCauseContent,
    RCAPerformModal,
    SuggestRootCauseModal,
    AddRemoveCartPopup
  },
  async created() {
    await Promise.all([this.getToolData(), this.getTrainings()]);
  },

  methods: {
    async getTrainings() {
      this.loaderStatus = true;
      const response = await getTrainingData();
      this.trainingList = response.lms_user_course_list.filter(
        (item) => item.course_id === 7
      );
      this.loaderStatus = false;
    },
    async getToolData() {
      const [purchasedData, toolsData] = await Promise.all([
        getToolsPurchaseData(+this.userId),
        getResourcesListById(1, this.userId)
      ]);
      this.toolsData = toolsData;
      // this.toolsData = await getResourcesListById(1, this.userId);
      // const purchasedData = await getToolsPurchaseData(+this.userId);
      this.isPurchased = purchasedData[1].enrolled;
    },
    closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.getTrainings();
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
        this.getTrainings();
        this.emitter.emit('cart-items-updated');
      }
    },
    navigateToTools() {
      this.$router.push('/tools');
    },
    navigateToContactUs() {
      this.$router.push('/contact');
    },
    openPerformModal() {
      this.trainingInfo = this.trainingList;
      const finalData = this.trainingInfo.map((item) => {
          if (item.cart_status && item.cart_status.purchase_status === 'REMOVE_FROM_CART') {
            item.cart_status.purchase_status = 'GO_TO_CART';
          }
          return item;
        });
        this.trainingInfo = finalData;
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'View',
        form_control_details: 'How to perform RCA'
      };
      postMarketoFormData(marketoForm);
      $('#modal_video').modal('show');
    },
    async openRCAExampleModal() {
      this.loaderStatus = true;
      const response = await getRcaWriteupPDF();
      this.loaderStatus = false;
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'View',
        form_control_details: 'View Sample RCA Writeup'
      };
      postMarketoFormData(marketoForm);
      this.$router.push({
        name: 'RootCausePdfViewer',
        params: {
          pdfPath: response,
          pdfName: 'View example RCA write up',
          id: 1
        }
      });
    },
    openSuggestModal() {
      $('#suggest-root-cause').modal('show');
    }
  }
};
</script>

<style scoped>
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
  vertical-align: middle;
  text-align: center;
  color: #333333;
  margin-left: 10px;
  margin-top: -5px;
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
