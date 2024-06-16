<template>
  <div class="row mr-0">
    <!-- Header -->
    <div class="col-xs-12 welcome-banner mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
        <div class="welcome-common-header fw-300">Welcome to Marketplace</div>
      </div>
      <div class="col-xs-12 pl-10 font-18 fw-700 mb-5">
        Purchase resources and subscriptions
      </div>
      <div class="col-xs-12 tools-desc col-xs-12 col-lg-6 font-14 fw-400 pl-10">
        Developed by HFE experts at Emergo by UL, OPUS offers HFE education and
        productivity features that help medical technology companies meet
        regulatory expectations the first time.
      </div>
    </div>
    <!-- Subscription Options -->
    <div class="col-xs-12 p-30 subscription-options content-padding mb-10">
      <div class="col-xs-12 header-main fw-400 mb-20">
        Get full access to OPUS
      </div>
      <div
        class="col-xs-12 d-flex col-gap-50 align-items-center xs-flex-column"
      >
        <div>
          <img src="/static/images/newMarketplace/desktop.svg" alt="" />
        </div>
        <div class="flex-grow">
          <div
            class="subscription-card col-xs-12 mb-15"
            v-for="subscription in subscriptions"
            :key="subscription.id"
          >
            <div
              class="col-xs-12 p-0 mb-15 d-flex justify-content-between"
              :class="[
                windowWidth <= 500 ? 'justify-content-center' : '',
                windowWidth <= 500 ? 'text-center' : ''
              ]"
            >
              <div class="subscription-type">{{ subscription.title }}</div>
              <div v-if="windowWidth > 500" class="font-18 fw-700">
                {{ subscription.duration_text }}
              </div>
            </div>
            <div
              class="col-xs-12 pr-0 d-flex justify-content-between align-items-end xs-flex-column"
              :class="[
                windowWidth <= 500 ? 'align-items-center' : '',
                windowWidth <= 500 ? 'pl-15' : 'pl-30'
              ]"
            >
              <ul>
                <li
                  class="font-18 text-secondary fw-300 lh-25"
                  v-for="(info, index) in subscription.info"
                  :key="index"
                >
                  {{ info }}
                </li>
              </ul>
              <div>
                <div
                  v-if="windowWidth <= 500"
                  class="font-18 fw-700 text-center"
                >
                  {{ subscription.duration_text }}
                </div>
                <BaseButton
                  @click="requestQuote(subscription)"
                  class="mb-10"
                  :class="windowWidth > 500 ? 'margin-left-auto' : 'mt-10'"
                >
                  Request a quote
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- OPUS Resources -->
    <opus-resources :resources="resources.slice(0, 3)"></opus-resources>
    <div
      v-if="consultingData"
      class="col-xs-12 consulting-info d-flex justify-space-around flex-wrap xs-flex-column"
    >
      <div class="col-xs-12 p-0">
        <p class="consulting-title">{{ consultingData.title }}</p>
      </div>
      <div
        style="flex: 0 0 30%"
        :style="{ alignSelf: windowWidth <= 1200 ? 'center' : '' }"
      >
        <img
          :src="`/static/images/consulting/consulting.svg`"
          :style="{ width: windowWidth >= 1200 ? '100%' : 'unset' }"
        />
      </div>
      <div style="flex: 0 0 66%; margin-top: -6px">
        <p
          style="
            font-weight: 300;
            font-size: 24px;
            line-height: 33px;
            color: #00518a;
          "
        >
          Our Human Factors Research &amp; Design Practice
        </p>
        <p
          style="
            font-weight: 300;
            font-size: 18px;
            line-height: 25px;
            text-align: justify;
            color: rgba(0, 0, 0, 0.7);
          "
        >
          We would be pleased to support your HFE project. Our HFR&D consulting
          team members have decades of experience in all phases of HFE and have
          worked on a wide range of medical products that serve important and
          often life-critical purposes.
        </p>
        <p
          style="
            font-weight: 300;
            font-size: 18px;
            line-height: 25px;
            text-align: justify;
            color: rgba(0, 0, 0, 0.7);
          "
        >
          Our staff members have advanced degrees in HFE and related fields,
          teach at leading universities, and have authored numerous books on
          special topics in HFE.
        </p>
      </div>
      <div class="col-xs-12 p-0" :class="windowWidth > 1200 ? 'mt-50' : ''">
        <div class="subscription-card col-xs-12 mb-15">
          <div class="col-xs-12 p-0 mb-15 d-flex justify-content-between">
            <div
              class="subscription-type consulting"
              :class="windowWidth <= 500 ? 'text-center' : ''"
            >
              Explore consulting services
            </div>
            <div v-if="windowWidth > 500" class="font-18 fw-700">
              Full-service support
            </div>
          </div>
          <div
            class="col-xs-12 pr-0 d-flex flex-wrap justify-content-between align-items-end xs-flex-column xs-consulting-card"
            :class="[
              windowWidth <= 500 ? 'pl-15' : 'pl-30',
              windowWidth <= 500 ? 'align-items-center' : ''
            ]"
          >
            <ul>
              <li
                class="text-secondary subscription-point fw-300 lh-25"
                v-for="(subscriptionPoint, index) in consultingData.info"
                :key="subscriptionPoint + '_' + index"
              >
                {{ subscriptionPoint }}
              </li>
            </ul>
            <div>
              <div v-if="windowWidth <= 500" class="font-18 fw-700 text-center">
                Full-service support
              </div>

              <BaseButton
                class="mb-10"
                @click="goToConsultings"
                :class="windowWidth > 500 ? 'margin-left-auto' : 'mt-10'"
              >
                {{ consultingData.button_text }}
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Need more support -->
    <div class="col-xs-12 p-50 support-note">
      <div class="col-xs-12 pl-30 font-32 mb-15 support-text">
        Have questions or feedback?
      </div>
      <div class="col-xs-12 pl-30 font-18">
        It would make our day to hear from you. Email us at
        <b>opushelp@ul.com</b> with questions about OPUS or HFE in general.
      </div>
    </div>
    <subscription-popup
      @closeSubscriptionPopup="closeSubscriptionPopup"
      :userId="userId"
      :selectedSubscription="selectedSubscription"
    ></subscription-popup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import OpusResources from './OpusResources.vue';
import Loader from '../UIComponents/Loader.vue';
import { emergoContactLink } from '../../utils/constants';
import SubscriptionPopup from './Modals/SubscriptionPopup.vue';
import {
  getResources,
  getMarketplaceSubscriptions
} from '../../apis/marketPlaceResources';
import BaseButton from '../UIComponents/BaseButton.vue';

// import { subscriptions } from './content';

export default {
  props: ['userId'],
  data() {
    return {
      subscriptions: [],
      loaderStatus: false,
      resources: [],
      selectedSubscription: {},
      consultingData: {},
      windowWidth: window.innerWidth
    };
  },
  components: {
    Loader,
    OpusResources,
    SubscriptionPopup,
    BaseButton
  },
  async created() {
    this.loaderStatus = true;
    const [resources, subscriptions] = await Promise.all([
      getResources(),
      getMarketplaceSubscriptions()
    ]);
    // const resources = await getResources();
    this.subscriptions = subscriptions;
    this.resources = resources.slice(0, 3);
    if (resources.length > 3) {
      // eslint-disable-next-line prefer-destructuring
      this.consultingData = resources[3];
    }
    // this.subscriptions = await getMarketplaceSubscriptions();
    this.loaderStatus = false;
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    navigateToCart() {
      this.$router.push(`${this.$route.path}/cart`);
    },
    goToConsultings() {
      this.$router.push({
        name: 'Resources',
        params: {
          name: 'consulting',
          id: 1
        }
      });
    },
    closeSubscriptionPopup() {
      $('#subscription-popup').modal('hide');
    },
    requestQuote(subscription) {
      this.selectedSubscription = { ...subscription };
      $('#subscription-popup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    redirectToEmergoConsulting() {
      window.open(emergoContactLink, '_blank');
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
  padding: 30px 30px 24px 40px;
}

.subscription-options,
.other-info {
  background: #ecf7fc;
}

.subscription-card {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgb(0 0 0 / 25%);
  border-radius: 5px;
  padding: 15px 20px 15px 20px;
}

.subscription-type {
  font-size: 24px;
  color: #00518a;
  font-weight: 600;
}

.subscription-card ul {
  align-self: flex-start;
}

.consulting-info {
  padding: 30px 75px 70px 70px;
  column-gap: 4%;
  background: rgba(67, 180, 228, 0.1);
}
.consulting-title {
  font-weight: 300;
  font-size: 32px;
  line-height: 44px;
  color: #0b3c61;
  padding-left: 5px;
}
.consulting-info-list {
  list-style-position: outside;
  padding-left: 30px;
  margin-top: 20px;
}
.consulting-info-list-item {
  font-weight: 300;
  font-size: 18px;
  margin-top: 5px;
  color: rgba(0, 0, 0, 0.7);
}
.consulting-subscription-text {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.7);
}
.consulting-subscription-text {
  padding-top: 40px;
  margin: 0;
}
.consulting-learn-more-container {
  padding-top: 30px;
}
.subscription-type.consulting {
  font-weight: 600;
  line-height: 33px;
}
.subscription-point {
  font-size: 16px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
}

.flex-grow {
  flex-grow: 1;
}

.flex-item {
  flex: 0 0 30%;
}

.flex-50 {
  flex: 0 0 50%;
}

.flex-36 {
  flex: 0 0 36%;
}

.other-info-text {
  font-size: 24px;
  color: #00518a;
  line-height: 33px;
}

.column-gap-50 {
  column-gap: 50px;
}

.align-self-start {
  margin-top: auto;
  align-self: flex-start;
}

.justify-space-around {
  justify-content: space-between;
}

.lh-25 {
  line-height: 25px;
}

.p-50 {
  padding: 50px;
}

.support-note {
  background: #4c9e45;
  color: #ffffff;
  padding: 35px 50px 35px 50px;
}

.support-text {
  line-height: 44px;
}

.align-items-center {
  align-items: center;
}

@media only screen and (max-width: 1200px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 40px;
  }

  .consulting-info {
    padding-left: 40px;
    padding-right: 35px;
  }

  .xs-consulting-card {
    padding-left: 15px;
  }
}
</style>
