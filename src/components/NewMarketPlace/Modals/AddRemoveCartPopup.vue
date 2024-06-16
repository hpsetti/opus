<template>
  <div id="addRemoveCartPopup" class="modal" role="dialog">
    <div class="modal-dialog modal-md request-modal">
      <div class="modal-content col-xs-12">
        <div
          class="modal-header pl-0 pb-10 mb-10"
          :class="{ 'border-bottom': cartInfo.type === 'remove' }"
        >
          <div
            class="d-flex justify-content-between"
            v-if="!isRenew && cartInfo.type === 'remove'"
          >
            <div class="font-32 title">Remove item from cart</div>
            <img
              data-dismiss="modal"
              class="cursor-pointer"
              src="/static/images/icons/close_icon.svg"
              alt=""
            />
          </div>
          <div v-else class="d-flex justify-content-between">
            <div class="d-flex col-gap-15">
              <img
                class="pl-10"
                src="/static/images/newMarketplace/success_check.svg"
                alt=""
              />
              <div class="d-flex flex-direction-column">
                <div class="added-to-cart-text">Item added to cart</div>
                <div>Visit Marketplace to view cart and check out.</div>
              </div>
            </div>
            <img
              @click="closeAddRemoveCart"
              class="cursor-pointer"
              src="/static/images/icons/close_icon.svg"
              alt=""
            />
          </div>
        </div>
        <div
          class="modal-body col-xs-12 mb-20 font-18 text-start d-flex justify-content-center"
          v-if="cartInfo.type === 'remove'"
        >
          {{ cartInfo.body }}
        </div>
        <div class="footer col-xs-12 mb-30">
          <div
            class="col-xs-12 p-0 d-flex justify-content-end col-gap-15"
            v-if="!isRenew && cartInfo.type === 'remove'"
          >
            <BaseButton data-dismiss="modal" variant="secondary" size="lg"
              >No</BaseButton
            >
            <BaseButton @click="removeFromCart" size="lg">Yes</BaseButton>
          </div>
          <div class="col-xs-12 p-0 text-right" v-else>
            <BaseButton @click="navigateToCart">Checkout now</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../../utils/event-bus';
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  props: {
    cartInfo: {
      type: Object,
      default: () => {}
    },
    isRenew: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    closeAddRemoveCart() {
      this.emitter.emit('getDynimicCartdetails');
      this.$emit('closeAddRemoveCart');
    },
    navigateToCart() {
      this.$router.push('/market-place/cart');
    },
    removeFromCart() {
      this.$emit('removeFromCart');
    }
  }
};
</script>

<style scoped>
.modal-header {
  background: #ffffff;
  color: #333333;
  border: none;
}

.border-bottom {
  border-bottom: 1px solid #bdbdbd;
}

#addRemoveCartPopup {
  z-index: 1060;
}

.title {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}

.added-to-cart-text {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #4c9e45;
}
</style>
