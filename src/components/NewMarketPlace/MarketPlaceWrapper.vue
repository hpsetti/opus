<template>
  <div class="content-wrappper">
    <div class="col-xs-12 pl-0 pr-0">
      <router-view
        :cartDetails="cartDetails"
        :accountId="account_id"
        :userId="userId"
      ></router-view>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import Loader from '../UIComponents/Loader.vue';
import { getCartList } from '../../apis/cart';
import EventBus from '../../utils/event-bus';

export default {
  props: ['userId', 'account_id'],
  data() {
    return {
      path: '',
      loaderStatus: false,
      cartDetails: {}
    };
  },
  components: {
    Loader,
  },

  async created() {
    this.isCartPath = this.$route.path === '/market-place/cart';
    await this.getCartList();
    this.emitter.on('fetchCartList', async () => {
      await this.getCartList();
    });
  },
  watch: {
    async $route() {
      this.isCartPath = this.$route.path === '/market-place/cart';
      if (this.$route.path === '/market-place') {
        await this.getCartList();
      }
    }
  },
  methods: {
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
      this.emitter.emit('fetchCartList');
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
