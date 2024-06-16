<template>
  <div class="col-xs-12">
    <template v-if="cartDetails && cartDetails.cart_items">
      <div
        class="col-xs-12 pl-0 pr-0 pb-10 d-flex confirmation-header justify-content-between"
      >
        <div class="font-18 text-secondary">
          {{ isCreditCardPurchase ? 'Purchased' : 'Selected' }}
        </div>
        <div class="font-22 fw-700 pr-20">
          Total: ${{ cartDetails.total_price }}
        </div>
      </div>
      <div
        class="col-xs-12 p-0 mt-20"
        v-for="cartItem in cartDetails.cart_items"
        :key="cartItem.cart_id"
      >
        <div
          class="col-sm-10 col-xs-12 p-0 d-flex flex-direction-column word-break"
        >
          <div class="plan-name mb-5">{{ cartItem.plan_name }}</div>
          <template v-if="cartItem.is_documents || cartItem.is_tools">
            <div v-html="cartItem[cartItem.plan_type].description"></div>
          </template>
          <template v-else>
            <div>{{ cartItem[cartItem.plan_type].description }}</div>
          </template>
        </div>
        <div
          class="col-xs-12 col-sm-2 pr-20 d-flex flex-direction-column align-items-end"
        >
          <div class="mb-10">Price</div>
          <div>${{ cartItem.price }}</div>
        </div>
      </div>
    </template>
    <template v-if="isCreditCardPurchase">
      <div
        class="col-xs-12 confirmation-message p-0 mt-15 pt-15 pb-15 font-18 font-bold text-emergo-green"
      >
        Credit card payment successful!
      </div>
      <div class="col-xs-12 p-0 mt-20">
        <div
          class="col-xs-12 p-0 payment-info pb-10 d-flex justify-content-between font-18"
        >
          <div class="font-bold">Payment Method</div>
          <div>Credit Card</div>
        </div>
      </div>
    </template>
    <template v-if="isBillingInfoAvailable">
      <div
        class="col-xs-12 pl-0 mt-30 confirmation-header pb-10 font-18 text-secondary mb-10"
      >
        Billing Info
      </div>
      <p class="pt-10 mt-10">
        {{ billingInfo.first_name }} {{ billingInfo.last_name }}
      </p>
      <p>{{ billingInfo.email_address }}</p>
      <p>{{ billingInfo.phone_number }}</p>
      <p class="billing-address">
        {{ decodeURIComponent(billingInfo.address) }}
      </p>
      <p>{{ billingInfo.state }}</p>
      <p>{{ billingInfo.country }}</p>
      <p>{{ billingInfo.zipcode }}</p>
    </template>
  </div>
</template>
<script>
export default {
  props: ['billingInfo', 'totalPrice', 'cartDetails', 'isCreditCardPurchase'],
  data() {
    return {};
  },
  computed: {
    isBillingInfoAvailable() {
      if (this.billingInfo && Object.keys(this.billingInfo).length > 0)
        return true;
      return false;
    }
  }
};
</script>

<style scoped>
.billing-address {
  word-break: break-all;
}
.total-price {
  font-size: 24px;
  font-weight: 600;
}

.confirmation-header {
  border-bottom: 1px solid #ccc;
}

.plan-name {
  font-weight: 600;
  font-size: 24px;
  line-height: 25px;
  color: #0b3c61;
}

.price {
  font-size: 24px;
}

.confirmation-message {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

/* .payment-info {
  border-bottom: 1px solid #ccc;
} */
</style>
