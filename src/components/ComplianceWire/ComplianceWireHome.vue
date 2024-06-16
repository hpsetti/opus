<template>
  <div class="content-wrappper row mr-0">
    <div
      class="col-xs-12 pl-30 pr-30 cart-section d-flex justify-content-between"
      v-if="
        !loaderStatus && cartDetails.cart_items && cartDetails.cart_items.length
      "
    >
      <div class="d-flex col-gap-30">
        <div class="p-relative">
          <img src="/static/images/newMarketplace/basket.svg" alt="" />
          <span class="cart-count">{{ cartDetails.total_items }}</span>
        </div>
        <div class="cart-items">{{ cartDetails.total_items }} Item(s)</div>
      </div>
      <div class="d-flex col-gap-30 align-items-center" v-if="isCartPath">
        <div class="d-flex cart-items">
          Total <span class="pl-10">${{ cartDetails.total_price }}</span>
        </div>
        <img
          @click="navigateToMarketplace"
          class="img-20 cursor-pointer"
          src="/static/images/icons/close_icon.svg"
          alt=""
        />
      </div>
      <div class="d-flex col-gap-30 align-items-center" v-else>
        <div class="cart-items">${{ cartDetails.total_price }}</div>
        <BaseButton @click="navigateToCart">View Cart</BaseButton>
      </div>
    </div>
    <div
      class="col-xs-12 welcome-banner mr-0"
      :class="{
        'pt-100': cartDetails.cart_items && cartDetails.cart_items.length
      }"
    >
      <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
        <div class="welcome-common-header fw-300">Welcome to Marketplace</div>
      </div>
    </div>
    <!-- Purchased trainings -->
    <div class="col-xs-12 col-md-12 mt-30 pl-5">
      <purchased-list
        :ilt="ilts.purchased"
        :userId="userId"
        :account_id="account_id"
      />
    </div>
    <!-- Available Trainings -->
    <div class="col-xs-12 col-md-12 mt-30 pl-5">
      <compliance-wire-marketplace-list
        :userId="userId"
      ></compliance-wire-marketplace-list>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import Loader from '../UIComponents/Loader.vue';
import ComplianceWireMarketplaceList from './ComplianceWireMarketplaceList.vue';
import PurchasedList from './PurchasedList.vue';
import { getCartList } from '../../apis/cart';
import {
  getAllILTCourses,
  getILTtrainingLatestActivity
} from '../../apis/instructorLedTraining';
import EventBus from '../../utils/event-bus';
import BaseButton from '../UIComponents/BaseButton.vue';
import { getTrainingData } from '../../apis/lmsTraining';

export default {
  props: ['userId', 'account_id'],
  data() {
    return {
      loaderStatus: false,
      availableTrainings: [],
      purchasedELearnings: [],
      cartDetails: {},
      ilts: {
        purchased: [],
        available: []
      }
    };
  },
  components: {
    Loader,
    ComplianceWireMarketplaceList,
    PurchasedList,
    BaseButton
  },
  async created() {
    this.loaderStatus = true;
    await this.getELearnings();
    await this.getiltLatestActivity();
    this.isCartPath = this.$route.path === '/market-place/cart';
    await this.getCartList();
    this.emitter.on('fetchCartList', async () => {
      await this.getCartList();
    });
    this.loaderStatus = false;
  },
  watch: {
    $route() {
      this.isCartPath = this.$route.path === '/market-place/cart';
    }
  },
  methods: {
    async getELearnings() {
      const response = await getTrainingData();
      this.eLearningProgress = response.lms_course_progress;
      // this.eLearningLatesActivity = this.eLearningProgress.latest_activity;// || response.lms_user_course_list[0];
      this.purchasedELearnings = response.lms_user_course_list.filter(
        (course) => course.course_status !== 'Not Enrolled'
      );
    },
    async getiltLatestActivity() {
      // const iltList = await getInstructorTrainingList();
      const allILTs = await getAllILTCourses(this.userId);
      // const iltList = [...allILTs.bundle, ...allILTs.online_ilt];
      const iltList = [...allILTs.online_ilt, ...allILTs.pre_recorded_il_t];
      // this.purchasedIlts = iltList.filter((course) => course.course_status !== 'Not Enrolled');
      // this.ilts.purchased = iltList.filter((course) => course.course_status !== 'Not Enrolled');
      this.ilts.purchased = iltList.filter((course) => course.enrolled);
      // this.ilts.available = iltList.filter((course) => course.course_status !== 'Enrolled');
      this.ilts.available = iltList.filter((course) => !course.enrolled);
      this.iltProgress = await getILTtrainingLatestActivity();
      // this.iltLatestActivity = this.iltProgress.latest_activity;
    },
    navigateToCart() {
      this.$router.push('/market-place/cart');
    },
    checkIsResourcesExist() {
      if (
        this.$route.params.id &&
        ![1, 2, 3].includes(+this.$route.params.id)
      ) {
        this.navigateToMarketplace();
      }
    },
    async getCartList() {
      this.loaderStatus = true;
      this.cartDetails = await getCartList(this.userId);
      this.loaderStatus = false;
    },
    navigateToMarketplace() {
      this.$router.push('/market-place');
    }
  },
  beforeUnmount() {
    this.emitter.off('fetchCartList');
  }
};
</script>

<style scoped>
.p-relative {
  position: relative;
}
.welcome-banner {
  padding: 30px 40px 24px 40px;
  background: url('/static/images/newMarketplace/welcomebanner.svg') no-repeat;
  background-size: cover;
  color: #ffffff;
  margin-top: -6px;
  margin-bottom: -15px;
  margin-left: -13px;
  min-height: 106px;
}

.img-20 {
  height: 20px;
  width: 20px;
}

.pt-100 {
  padding-top: 100px;
}

.cart-count {
  position: absolute;
  background: #43b4e4;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  text-align: center;
}

.cart-items {
  font-weight: 600;
  font-size: 24px;
}

.cart-section {
  position: fixed;
  top: 80px;
  width: calc(100% - 250px);
  z-index: 2;
  background: #ffffff;
  padding-top: 20px;
  padding-bottom: 10px;
  box-shadow: 4px 4px 10px rgb(0 0 0/25%);
}

@media screen and (max-width: 1024px) {
  .cart-section {
    width: 100%;
    position: sticky;
  }
}

@media screen and (max-width: 500px) {
  .cart-items {
    display: none;
  }
}
</style>
