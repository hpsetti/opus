<template>
  <div class="content-wrappper training-main">
    <div class="col-xs-12 mt-20 mb-20">
      <div class="col-xs-12 pl-10 catalog-header fw-300">
        Explore our consulting services
      </div>
      <div class="col-xs-12 pl-0 d-flex" style="flex-wrap: wrap">
        <div class="col-xs-12 col-sm-7 col-md-7 pl-0">
          <div
            class="col-xs-12 mt-15 fw-300 text-light-black catalog-description"
          >
            Emergo by UL’s Human Factors Research & Design is a highly
            experienced HF consulting team that specializes in user research,
            usability testing, and product and user interface design for medical
            technology. We would be pleased to support your HFE project or
            provide personalized coaching to advance your team’s HFE skills.
          </div>
          <div
            class="col-xs-12 mt-20 fw-300 text-light-black catalog-description"
          >
            Browse our top services below to learn more about how we can
            collaborate with your team at each step of the HFE process. Get in
            touch with our consulting team by selecting “Request quote” and
            completing the form.
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-5 col-md-5 pl-0 d-flex align-items-center justify-content-center mb-30"
        >
          <img src="/static/images/icons/consultings_header.svg" />
        </div>
        <div class="col-xs-12 pl-10">
          <purchased-consultings
            :consultings="purchasedConsultings"
            @request-quote="requestQuote"
          />
        </div>
        <div class="col-xs-12 pl-10 mt-30">
          <marketplace-consultings
            ref="marketPlaceConsultings"
            :userId="userId"
            @request-quote="requestQuote"
          />
        </div>
      </div>
    </div>
    <div id="consulting_page_modal" class="modal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content p-0">
          <div class="content">
            <request-quote
              v-if="modalComponent === 'requestQuote'"
              @close="closeModal"
              :consulting="modalData.consulting"
              @submit="handleQuoteSubmit"
            />
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../UIComponents/Loader.vue';
import PurchasedConsultings from './PurchasedConsultings.vue';
import MarketplaceConsultings from './MarketplaceConsultings.vue';
import { fetchPurchasedConsultings } from '../../apis/consultings';
import RequestQuote from './RequestQuote.vue';

export default {
  props: ['account_id', 'userId'],
  data() {
    return {
      loaderStatus: false,
      purchasedConsultings: [],
      // MODAL
      isModalActive: false,
      modalComponent: null,
      modalData: null
    };
  },
  components: {
    Loader,
    RequestQuote,
    PurchasedConsultings,
    MarketplaceConsultings
  },
  async created() {
    await this.getAllConsultingsData();
  },
  methods: {
    async getAllConsultingsData() {
      this.loaderStatus = true;
      await this.getPurchasedConsultings();
      this.loaderStatus = false;
    },
    async getPurchasedConsultings() {
      this.purchasedConsultings = await fetchPurchasedConsultings({
        userId: this.userId
      });
    },
    requestQuote(consulting) {
      this.openModal('requestQuote', { consulting });
    },
    // MODAL
    openModal(component, data) {
      this.modalData = data;
      this.modalComponent = component;
      $('#consulting_page_modal').modal('show');
    },
    closeModal() {
      this.modalComponent = '';
      $('#consulting_page_modal').modal('hide');
    },
    handleQuoteSubmit() {
      this.closeModal();
      this.getAllConsultingsData();
      this.$refs.marketPlaceConsultings.setupMarketPlaceConsultings();
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Your request has been successfully sent'
      });
    }
  }
};
</script>
<style scoped>
.catalog-header {
  font-size: 36px;
  line-height: 49px;
  color: #0b3c61;
}
.catalog-description {
  text-align: left;
}

.learning-header {
  line-height: 33px;
  color: #333333;
}

@media screen and (min-width: 769px) {
  .sm-pl-30 {
    padding-left: 30px;
  }
}

@media screen and (min-width: 1025px) {
  .lg-pl-0 {
    padding-left: 0px;
  }
}

#consulting_page_modal .modal-dialog {
  width: 60vw;
  background: transparent;
}

#consulting_page_modal .modal-content .content {
  /* max-height: 85vh; */
  overflow: hidden;
}
@media screen and (max-width: 768px) {
  .content-wrapper-container {
    flex-direction: column-reverse;
  }

  #consulting_page_modal .modal-dialog {
    width: 90vw;
    background: transparent;
  }
}
</style>
<style>
#consulting_page_modal .modal-content .content .content {
  max-height: calc(85vh - 165px);
  overflow-y: auto;
  scrollbar-width: thin !important;
  padding-right: 10px;
}

/* scrollbar */
#consulting_page_modal .modal-content .content .content::-webkit-scrollbar {
  width: 8px;
  height: 5px;
}

#consulting_page_modal
  .modal-content
  .content
  .content::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.3);
  -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
}
</style>
