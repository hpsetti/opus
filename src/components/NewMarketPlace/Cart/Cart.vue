<template>
  <div class="col-xs-12 cart-wrapper">
    <!-- Purchase Sections -->
    <div class="col-xs-12 plr-25 mb-30">
      <ul class="crumb-trail">
        <li
          class="col-xs-3 p-0"
          v-for="(slide, index) in slidesInfo"
          :key="index"
          :class="{
            'is-active-slide': currentSlider === index,
            completed_slide: currentSlider > index
          }"
        >
          <div class="crumb">
            <img
              v-if="currentSlider > index"
              src="/static/images/icons/circle_check.svg"
              class="breadcrumb-img"
            />
            <span class="ml-5">{{ slide.title }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- Items in Cart -->
    <div
      class="col-xs-12 p-0"
      v-if="cartDetails.cart_items && cartDetails.cart_items.length"
    >
      <template v-if="currentSlider === 0">
        <div
          class="col-xs-12"
          v-for="cartItem in cartDetails.cart_items"
          :key="cartItem.cart_id"
        >
          <training-details
            type="cart"
            @setSelectedTrainingItem="setSelectedTrainingItem"
            :trainingDetails="cartItem"
            @setCartInfo="setCartInfo"
          ></training-details>
        </div>
      </template>
      <!-- Billing Info -->
      <template v-if="currentSlider === 1">
        <payment-options
          :paymentModes="
            userData.role_id === 13 ? cwPaymentModes : paymentModes
          "
          @paymentOpts="paymentOptions"
          :totalPrice="totalPrice"
          @uID="uID"
        ></payment-options>
      </template>
      <template v-if="currentSlider === 2">
        <div class="col-xs-12">
          <billing-info
            :countriesList="countriesList"
            :billingData="billingData"
            :purchaseOrder="payment_option === 3"
            ref="billingInfo"
          ></billing-info>
        </div>
      </template>
      <template v-if="currentSlider === 3">
        <confirmation
          :isCreditCardPurchase="isCreditCardPurchase"
          :cartDetails="cartDetails"
          :billingInfo="billingInfo"
          :totalPrice="totalPrice"
        ></confirmation>
      </template>
    </div>
    <div
      class="col-xs-12 text-center no-data-text font-22 fw-700 mt-20"
      v-if="
        cartDetails.cart_items &&
        !cartDetails.cart_items.length &&
        !loaderStatus
      "
    >
      Your cart is empty
    </div>
    <!-- Cart Footer -->
    <div class="row p-20 d-flex col-gap-10 justify-content-end cart-footer">
      <BaseButton
        variant="secondary"
        v-if="!isCreditCardPurchase"
        @click="navigateToMarketPlace"
        >Cancel</BaseButton
      >
      <div v-if="payment_option === 1 && currentSlider === 1">
        <OpusPopoverToolTip position="top">
          <template #content>
            <p class="mt-10 break-word">
              Please scroll down on credit page and click on <b>COMPLETE</b> to
              complete the payment.
            </p>
          </template>
          <BaseButton
            :disabled="
              !(cartDetails.cart_items && cartDetails.cart_items.length) ||
              (payment_option === 1 && currentSlider !== 3)
            "
            @click="navigateToNextSlide"
            >{{ currentSlider === 3 ? 'Complete' : 'Continue' }}</BaseButton
          >
        </OpusPopoverToolTip>
      </div>
      <div v-else>
        <BaseButton
          :disabled="
            !(cartDetails.cart_items && cartDetails.cart_items.length) ||
            (payment_option === 1 && currentSlider !== 3)
          "
          @click="navigateToNextSlide"
          >{{ currentSlider === 3 ? 'Complete' : 'Continue' }}</BaseButton
        >
      </div>
    </div>
    <info-modal
      :loader="loaderStatus"
      :trainingInfo="selectedTraining"
      :userId="userId"
      :accountId="accountId"
      @setCartInfo="setCartInfo"
    ></info-modal>
    <error-modal :errorMessage="errorMessage"></error-modal>
    <add-remove-cart-popup
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
    <preview-modal :trainingInfo="videoInfo"></preview-modal>
    <documents-info
      :loader="loaderStatus"
      :templateInfo="selectedDocument"
      :userId="userId"
      @setCartInfo="setCartInfo"
    ></documents-info>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import $ from 'jquery';
import EventBus from '../../../utils/event-bus';
import PreviewModal from '../../Training/previewModal.vue';
import InfoModal from '../../Training/InfoModal.vue';
import ErrorModal from '../../Common/ErrorModal.vue';
import trainingDetails from '../Trainings/TrainingDetails.vue';
import AddRemoveCartPopup from '../Modals/AddRemoveCartPopup.vue';
import PaymentOptions from './PaymentOptions.vue';
import BillingInfo from './BillingInfo.vue';
import Confirmation from './Confirm.vue';
import Loader from '../../UIComponents/Loader.vue';
import DocumentsInfo from '../../UIComponents/Modals/DocumentsMoreInfo.vue';
import OpusPopoverToolTip from '../../UIComponents/OpusPopoverToolTip.vue';
import { getAllCountries } from '../../../apis/countriesList';
import { getPaymentDetails } from '../../../apis/chasePaymentAPI';
import { purchaseCartItems } from '../../../apis/cart';
import {
  getBillingInfo,
  getCCBillingInfo,
  updateBillingInfo,
  postBillingInfo
} from '../../../apis/lmsTraining';
import cartMixin from '../Mixins/shared';
import BaseButton from '../../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../../apis/marketo';

export default {
  props: ['cartDetails', 'accountId', 'userId'],
  mixins: [cartMixin],
  data() {
    return {
      videoInfo: {},
      isCreditCardPurchase: false,
      selectedDocument: {},
      selectedTraining: {},
      countriesList: [],
      billingData: {},
      errorMessage: '',
      cartInfo: {},
      cartListItems: [],
      selectedCartId: null,
      loaderStatus: false,
      totalPrice: 0,
      currentSlider: 0,
      slidesInfo: [
        {
          title: 'View your Cart'
        },
        {
          title: 'Payment method'
        },
        {
          title: 'Billing Info'
        },
        {
          title: 'Confirmation'
        }
      ],
      billingInfo: {},
      paymentModes: [
        {
          id: 1,
          mode: 'Credit',
          display: true
        },
        {
          id: 2,
          mode: 'Invoice',
          display: true
        },
        {
          id: 3,
          mode: 'Purchase Order',
          display: true
        }
      ],
      cwPaymentModes: [
        {
          id: 1,
          mode: 'Credit',
          display: true
        },
        {
          id: 2,
          mode: 'Invoice',
          display: false
        },
        {
          id: 3,
          mode: 'Purchase Order',
          display: false
        }
      ],
      payment_option: '',
      uIDVal: '',
      paymentStatus: false,
      paymentId: '',
      orderId: '',
      txnId: '',
      userData: null,
      newOperation: null
    };
  },
  components: {
    AddRemoveCartPopup,
    BillingInfo,
    Confirmation,
    DocumentsInfo,
    ErrorModal,
    Loader,
    InfoModal,
    PaymentOptions,
    PreviewModal,
    trainingDetails,
    BaseButton,
    OpusPopoverToolTip
  },
  watch: {
    cartDetails: {
      handler() {
        this.cartListItems = this.cartDetails.cart_items;
        this.totalPrice = this.cartDetails.total_price;
      },
      immediate: true
    }
  },

  async created() {
    this.loaderStatus = true;
    const billingDetails = await getBillingInfo();
    this.billingData = billingDetails || {};
    this.countriesList = await getAllCountries();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.loaderStatus = false;
    window.addEventListener('successClick', this.savePurchasedList);
    this.emitter.emit('fetchCartList');
  },

  methods: {
    async savePurchasedList() {
      window.removeEventListener('successClick', this.savePurchasedList);
      this.loaderStatus = true;
      await this.getPaymentInfo(true);
      if (this.errorMessage === '') {
        await this.purchaseAllCartItems(true);
        this.currentSlider += 2;
      }
      this.loaderStatus = false;
    },
    async getPaymentInfo(isFromChasePayment = false) {
      const resp = await getPaymentDetails(this.uIDVal);
      this.paymentId = resp.id;
      this.orderId = resp.order_id;
      this.txnId = resp.txn_ref;
      this.billingInfo = await getCCBillingInfo(resp.order_id);
      if (this.paymentId && resp.customer_ref_num) {
        // this.loaderStatus = false;
        this.paymentStatus = true;
        if (!isFromChasePayment) this.currentSlider += 2;
        this.errorMessage = '';
      } else {
        // this.loaderStatus = false;
        this.errorMessage =
          'Payment processing/failed with the selected method. Please wait or try again';
        $('#ErrorMsgModal').modal('show');
      }
    },
    paymentOptions(values) {
      this.payment_option = values;
    },

    uID(value) {
      this.uIDVal = value;
    },
    async navigateToNextSlide() {
      if (this.currentSlider === 1 && !this.payment_option) {
        this.errorMessage = 'Please select any payment method';
        $('#ErrorMsgModal').modal('show');
      } else if (this.currentSlider === 1 && this.payment_option === 1) {
        this.loaderStatus = true;
        await this.getPaymentInfo();
        this.loaderStatus = false;
      } else if (this.currentSlider === 2) {
        this.$refs.billingInfo.v$.$touch();
        if (this.$refs.billingInfo.v$.$invalid) return;
        this.billingInfo = { ...this.$refs.billingInfo.v$.userData.$model };
        this.currentSlider += 1;
        const marketoForm = {
          email: JSON.parse(localStorage.getItem('userData')).email,
          Last_Interest: 'Human Factors Research & Design',
          page_urlextended: window.location.href,
          page_urlreferral_extended: document.referrer,
          form_control: 'Purchase',
          customer_comments: this.cartListItems
            .map((item) => {
              if (item.type) {
                return `${item.plan_type}:${item.type}:${item.plan_name}`;
              }
              return `${item.plan_type}:${item.plan_name}`;
            })
            .join('; ')
        };
        postMarketoFormData(marketoForm);
      } else if (this.currentSlider === 3) {
        if (!this.isCreditCardPurchase) {
          this.loaderStatus = true;
          await this.purchaseAllCartItems();
          this.loaderStatus = false;
        } else this.navigateToMarketPlace();
      } else this.currentSlider += 1;
    },

    navigateToMarketPlace() {
      this.$router.push('/market-place');
      this.emitter.emit('fetchCartList');
    },
    async purchaseAllCartItems(isFromChasePayment = false) {
      // this.loaderStatus = true;
      if (this.payment_option !== 1) {
        await this.AddOrUpdateBillingInfo();
      }
      const date = new Date();
      if (this.payment_option === 2 || this.payment_option === 3) {
        this.newOperation = 5;
      } else {
        this.newOperation = 6;
      }
      const payLoad = {
        account_id: this.accountId,
        operation: this.newOperation,
        order_id: this.orderId || '', // optional chase payment
        payment_id: this.paymentId || '', // optional chase payment
        payment_mode: this.payment_option,
        purchase_order: this.billingInfo.purchase_order || '',
        txn_ref: this.txnId || '', // optional chase payment
        user_id: this.userId,
        valid_from: dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        valid_until: dayjs(date)
          .add(5, 'years')
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      };
      const res = await purchaseCartItems(payLoad);
      // this.loaderStatus = false;
      if (res.status_code === 200) {
        $("#custom-notification-bottom").addClass("custom-notification-bottom-80");
        this.emitter.emit('cart-items-updated');
        this.$notify({
          type: res.message,
          title: 'Success',
          text: res.data
        });
        this.isCreditCardPurchase = isFromChasePayment;
        this.emitter.emit('get-notification-count');
        setTimeout(() => {
            $("#custom-notification-bottom").removeClass("custom-notification-bottom-80");
          }, 10000);
        if (!isFromChasePayment) this.navigateToMarketPlace();
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Please try again later!'
        });
      }
    },
    async AddOrUpdateBillingInfo() {
      let res = {};
      if (Object.keys(this.billingData).length) {
        res = await updateBillingInfo(this.billingInfo);
      } else {
        res = await postBillingInfo(this.billingInfo);
      }
      if (res.status_code !== 200) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: res.data
        });
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('successClick', this.savePurchasedList);
  }
};
</script>

<style scoped>
.cart-wrapper {
  padding-bottom: 90px;
}

/* Cart Footer */
.cart-footer {
  position: fixed;
  background: #ffffff;
  box-shadow: 4px 0px 10px rgb(0 0 0 / 25%);
  border-radius: 0px;
  bottom: 0;
  z-index: 2;
  width: calc(100% - 250px);
}

@media screen and (max-width: 1024px) {
  .cart-footer {
    width: 100%;
  }
}
/* Cart Footer */

/* Crumb */
@media (width: 768px) {
  .crumb > .breadcrumb-img {
    vertical-align: middle;
    margin-right: 2px;
    height: 18px;
    width: 18px;
  }
  .crumb-trail > li > .crumb {
    font-size: 15px;
    padding: 20px 5px 20px 28px;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .crumb-trail > li > .crumb {
    font-size: 16px;
    padding: 20px 0px 20px 28px;
  }
}
@media screen and (max-width: 1024px) {
  /* .crumb-trail > li:not(:first-child) > .crumb:after {
    left: -11px;
  } */
  .crumb-trail > li.is-active-slide > .crumb {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  /* .crumb-trail > li:not(:first-child) > .crumb:before {
    left: -1px;
  } */
}
@media screen and (max-width: 767px) {
  .completed_slide > .crumb > .breadcrumb-img {
    margin-right: 0px;
    height: 30px;
    width: 30px;
  }
  .crumb-trail > li.completed_slide > .crumb {
    padding: 8px;
  }
  .crumb-trail > li:not(:first-child).completed_slide > .crumb {
    padding: 8px 0px 8px 0px;
    text-align: right;
  }
  .crumb-trail > li > .crumb {
    /* font-size: 0px; */
    padding: 12px;
  }
  .crumb-trail > li.is-active-slide > .crumb {
    font-size: 16px;
  }
  .crumb-trail > li.is-active-slide + li > .crumb:after {
    border-left-color: #0b3c61;
  }
  .crumb-trail > li:not(:first-child) > .crumb:after {
    border-top: 22px solid transparent;
    border-bottom: 24px solid transparent;
    border-left: 16px solid #f3f5fb;
  }
  .crumb-trail > li:not(:first-child) > .crumb:before {
    border-top: 22px solid transparent;
    border-bottom: 25px solid transparent;
    border-left: 16px solid #fff;
  }
}
.crumb-trail {
  margin-top: 20px;
  list-style: none;
  padding: 0px;
}
.p-0 {
  padding: 0px;
}
.completed_slide > .crumb > .breadcrumb-img {
  display: inline;
}
.breadcrumb-img {
  vertical-align: top;
  margin-right: 6px;
  height: 23px;
  width: 23px;
  display: none;
}
.crumb {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #828282;
  padding: 20px;
  position: relative;
  cursor: pointer;
  /* background: #f3f5fa; */
  background: rgba(11, 60, 97, 0.1);
  text-align: center;
}
.is-active-slide > .crumb {
  /* background: #0b3c61; */
  background: #4c9e45;
  color: #ffffff;
}
.crumb-trail > li.is-active-slide + li > .crumb:after {
  border-left-color: #4c9e45;
}
.pull-left {
  float: left;
}
.crumb-trail > li:first-child > .crumb {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
.crumb-trail > li:last-child > .crumb {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}
.crumb-trail > li:not(:first-child) > .crumb {
  margin-left: 10px;
}
li:not(:first-child) > .crumb:after {
  content: '';
  border-top: 30px solid transparent;
  border-bottom: 33px solid transparent;
  border-left: 24px solid rgba(11, 60, 97, 0.1);
  position: absolute;
  left: -10px;
  top: 0;
  z-index: 1;
}
li:not(:first-child) > .crumb:before {
  content: '';
  border-top: 30px solid transparent;
  border-bottom: 33px solid transparent;
  border-left: 24px solid #fff;
  position: absolute;
  left: 0;
  top: 0;
}

/* Crumb */

.no-data-text {
  color: #d3d6d9;
}

button[disabled] {
  opacity: 0.5;
}
</style>
