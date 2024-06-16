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
        <div class="welcome-common-header fw-300 pl-20">Consulting</div>
      </div>
      <div class="col-xs-12 tools-desc col-xs-12 col-sm-6 font-14 fw-400 pl-30">
        Emergo by UL’s Human Factors Research & Design is a highly experienced
        HF team that specializes in user research, usability testing, and
        product and user interface design for medical technology.
      </div>
    </div>
    <div
      v-if="featuredConsultings && featuredConsultings.length"
      class="col-xs-12 p-30 mb-10 subscription-options content-padding mb-10"
    >
      <div class="col-xs-12 featured-title pl-20 font-w600">Featured</div>
      <div class="col-xs-12 col-sm-6 pl-20 mb-15 font-14">
        Receive personalized coaching on moderating formative usability tests to
        uncover insightful findings and actionable design recommendations.
      </div>
      <template v-if="featuredConsultings">
        <div
          class="col-xs-12 pl-20"
          v-for="(consulting, index) in featuredConsultings"
          :key="`${consulting.consulting_id}-${index}`"
        >
          <consulting
            class="mt-10"
            :consulting="consulting"
            @request-quote="requestQuote"
          />
        </div>
      </template>
    </div>
    <div class="col-xs-12 content-padding">
      <div class="col-xs-12 p-0 d-flex flex-wrap col-gap-30 consulting-desc-section">
        <div class="col-xs-4 p-0 pl-20 content-header-img-container">
          <img
            class="content-header-img"
            :src="`/static/images/marketplace/consulting_client_discussion.svg`"
            alt=""
          />
        </div>
        <div class="col-xs-6 p-0 content-container">
          <div class="header-main mb-20">
            Collaborate with our HFE experts to develop safe medical products
          </div>
          <div class="fw-300 text-secondary">
            We take a user-centered approach to our work, helping our clients
            during all stages of product development to ensure that their
            products are safe, effective, and satisfying to use. We help reduce
            the safety risks associated with using critical products, and help
            mitigate our clients’ regulatory and business risks. We view
            ourselves as part of the solution for making products safer and more
            effective, while also helping clients achieve their commercial
            goals. Browse our top services below to learn more about how we can
            collaborate with your team at each step of the HFE process.
          </div>
        </div>
      </div>
    </div>
    <!-- Tabs List -->
    <div class="col-xs-12 pl-30 pb-20">
      <marketplace-consultings
        screen="marketplace"
        :userId="userId"
        ref="marketPlaceConsultings"
        @request-quote="requestQuote"
      />
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
    <loader :loadingStatus="loaderStatus" />
  </div>
</template>

<script>
import $ from 'jquery';
import Loader from '../../UIComponents/Loader.vue';
import MarketplaceConsultings from '../../Consulting/MarketplaceConsultings.vue';
import Consulting from '../../Consulting/Consulting.vue';
import RequestQuote from '../../Consulting/RequestQuote.vue';
import { getResourcesListById } from '../../../apis/marketPlaceResources';

export default {
  props: ['userId'],
  data() {
    return {
      loaderStatus: false,
      featuredConsultings: [],
      // MODAL
      isModalActive: false,
      modalComponent: null,
      modalData: null
    };
  },
  async created() {
    await this.setupMarketPlaceConsultings();
  },

  watch: {
    activeTabName() {
      this.setListForSelectedTab();
    }
  },
  components: {
    MarketplaceConsultings,
    RequestQuote,
    Consulting,
    Loader
  },
  methods: {
    async setupMarketPlaceConsultings() {
      this.loaderStatus = true;
      const consultingData = await getResourcesListById(4, this.userId);
      this.featuredConsultings = consultingData.featured_list.map(
        (c) => c.Consulting
      );
      this.loaderStatus = false;
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
      this.setupMarketPlaceConsultings();
      this.$refs.marketPlaceConsultings.setupMarketPlaceConsultings();
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Your request has been successfully sent'
      });
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

.flex-50 {
  flex: 0 0 50%;
}

.no-data-text {
  color: #d3d6d9;
}
.content-header-img {
  width: 100%;
}
.header-main {
  margin-top: -10px;
}

@media screen and (min-width: 757px) {
  .sm-pl-50 {
    padding-left: 50px;
  }

  
}

@media screen and (max-width: 757px) {

  .consulting-desc-section {
    flex-direction: column;
    row-gap: 30px;
    align-items: center;
  }

  .content-header-img-container {
    width: 260px;
    padding-left: 0;
  }
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .content-padding {
    padding: 30px 15px 24px 30px;
  }
  .content-container {
    width: 260px;
  }
}

#consulting_page_modal .modal-dialog {
  width: 60vw;
  background: transparent;
}

#consulting_page_modal .modal-content .content {
  /* max-height: 85vh; */
  overflow-x: hidden;
  overflow-y: auto;
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
  max-height: 60vh;
  overflow-y: auto;
}
</style>
