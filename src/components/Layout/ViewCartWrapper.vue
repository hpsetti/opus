<template>
    <div class="content-wrappper" 
         :class="{'pb-custom': cartDetails.cart_items && cartDetails.cart_items.length}">
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
        <div class="d-flex col-gap-30 align-items-center" v-if="isCartPath === '/market-place/cart'">
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
        class="col-xs-12 pl-0 pr-0"
        :class="{
          'pt-62': cartDetails.cart_items && cartDetails.cart_items.length
        }"
      >
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </template>
  
  <script>
  import Loader from '../UIComponents/Loader.vue';
  import { getCartList } from '../../apis/cart';
  import EventBus from '../../utils/event-bus';
  import BaseButton from '../UIComponents/BaseButton.vue';
  
  export default {
    data() {
      return {
        path: '',
        loaderStatus: false,
        cartDetails: {},
        userId: '',
      };
    },
    components: {
      Loader,
      BaseButton
    },
  
    async created() {
      this.userId = JSON.parse(localStorage.getItem('userId'));
      this.isCartPath = this.$route.path;
      await this.getCartList();
    },
    mounted() {
      this.emitter.on('fetchCartList', () => {
        this.getCartList();
      });
      this.emitter.on('getDynimicCartdetails', () => {
        this.getCartList();
      });
      window.addEventListener('message', this.handleMessageEvent, false);
    },
    unmounted() {
      window.removeEventListener('message', this.handleMessageEvent);
    },
    watch: {
      async $route() {
        this.isCartPath = this.$route.path;
        await this.getCartList();
      }
    },
    methods: {
      navigateToCart() {
        this.$router.push('/market-place/cart');
      },
      /**
       * This is a global message event listener function on window object
       * Allow only PHP sent messages to process
       * window.postMessage() allows you to send 'message' event
       */
      async handleMessageEvent(e) {
        if (e.origin !== import.meta.env.VITE_VUE_APP_RS_URL) {
          return null;
        }
        const msg = JSON.parse(e.data);
        if (msg.channel === 'hfe' && msg.event === 'cart-items-updated') {
          await this.getCartList();
        }
        return null;
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
        this.emitter.emit('fetchCartList');
      }
    },
    beforeUnmount() {
      this.emitter.off('fetchCartList');
    }
  };
  </script>
  
  <style scoped>
  .pb-custom {
    padding-bottom: 70px !important;
  }
  .p-relative {
    position: relative;
  }
  
  .img-20 {
    height: 20px;
    width: 20px;
  }
  
  .pt-62 {
    padding-top: 62px;
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
    margin-top: 10px;
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
  