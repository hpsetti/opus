<template>
  <div class="content-wrappper mt-10" v-if="expiryCount > 0">
    <div class="release-note-container">
      <div class="release-note-heading">
        <div
          class="expiry-list-title-container cursor-pointer collapsed"
          data-toggle="collapse"
          data-target="#expiry-list"
        >
          <p
            class="text-button-label black-2 opus-error-light-bg pt-5 pb-10 mb-0 pl-10"
          >
          {{ expiryCount }} Resources expiring soon and/or expired
          </p>
        </div>
      </div>
      <div id="expiry-list" class="release-note-collapse collapse">
        <div
          class="expiry-body"
          v-for="(category, categoryName) in expiryListObj"
          :key="categoryName"
        >
          <div class="text-h4 text-primary pb-10">{{ categoryName }}</div>
          <div
            class="list-container justify-content-between col-xs-12 p-10"
            v-for="plan in category"
            :key="plan.plan_id"
          >
            <div
              class="col-xs-12 col-sm-12 col-md-5 p-0 d-flex align-items-center name-container"
            >
              <img
                class="training-img"
                v-if="plan.plan_type === 'Tool'"
                src="/static/images/tools/tool_available.svg"
                alt="Tools"
              />
              <img
                class="training-img"
                v-else
                :src="getImageUrl(plan)"
                :alt="plan.plan_type"
              />
              <div
                class="col-xs-12 col-sm-12 flex-direction-column training-title"
              >
                <div class="text-regular-large text-primary mb-5">
                  {{ plan.plan_type }}
                </div>
                <div class="text-subtitle-1 text-primary mb-5 white-space">
                  <span>{{ plan.plan_name }}</span>
                </div>
              </div>
            </div>
            <div class="training-detail-actions">
              <div class="col-xs-12 col-sm-12 col-md-12">
                <div>
                  <div v-if="plan.expired">
                    <div class="pl-15">
                      <p class="text-regular-large red-bg1 white-1 expiry-box text-center">
                        Expired
                      </p>
                    </div>
                  </div>
                  <div v-else>
                    <div>
                      <div class="pl-15" v-if="plan.expiry_in_days > 90">
                        <p class="text-regular-large">
                          Expires:
                          {{ formatPurchaseDate(plan.expiry_date_time) }}
                        </p>
                      </div>
                      <div
                        class="pl-15"
                        v-else-if="
                          plan.expiry_in_days <= 90 && plan.expiry_in_days > 10
                        "
                      >
                        <p class="text-regular-large orange-bg2 expiry-box">
                          Expires: {{ plan.expiry_in_days }} days
                        </p>
                      </div>
                      <div
                        class="pl-15"
                        v-else-if="
                          plan.expiry_in_days <= 10 && plan.expiry_in_days > 1
                        "
                      >
                        <p
                          class="text-regular-large red-bg1 expiry-box white-1"
                        >
                          Expires: {{ plan.expiry_in_days }} days
                        </p>
                      </div>
                      <div
                        class="pr-15 pb-10"
                        v-else-if="plan.expiry_in_days == 1"
                      >
                        <p
                          class="text-regular-large red-bg1 expiry-box white-1"
                        >
                          Expires: {{ plan.expiry_in_days }} day
                        </p>
                      </div>
                    </div>
                  </div>
                  <BaseButton
                    variant="primary"
                    class="float-r"
                    @click="addToCartAfterExpiry(plan)"
                    v-if="plan.expired && !cartIds.includes(plan.plan_id)"
                  >
                    Add to cart
                  </BaseButton>
                  <BaseButton
                    variant="primary"
                    class="float-r"
                    @click="renewServices"
                    v-else-if="!cartIds.includes(plan.plan_id)"
                  >
                    Renew
                  </BaseButton>
                  <BaseButton
                    variant="tertiary"
                    class="float-r"
                    @click="goToCart"
                    v-else
                    has-icon
                  >
                    <img
                      src="/static/images/newMarketplace/goto_arrow.svg"
                      alt=""
                      class="preview-svg"
                    />
                    Go To Cart
                  </BaseButton> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      :isRenew="true"
    ></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import moment from 'moment';
import Loader from '../UIComponents/Loader.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import { getExpiryList, addToCartRenew, getCartList, addToCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';

export default {
  data() {
    return {
      isExpiringResources: true,
      expiryCount: null,
      expiryList: {},
      expiryListObj: {},
      loaderStatus: false,
      addedToCart: false,
      cartList: {},
      arePlanIdsPresent: null,
      expiryIds: [],
      cartIds: [],
      cartInfo: {},
      updatedCartList: [],
    };
  },
  components: {
    Loader,
    BaseButton,
    AddRemoveCartPopup
  },

  async created() {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    await this.allList();
  },
  methods: {
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return moment(formattedDateArray).format('D MMM YYYY');
      }
      return '';
    },
    async allList() {
      this.cartList = await getCartList(this.userId);
      await this.getExpiryList();
      this.getCommonList();
    },
    async addToCartAfterExpiry(plan) {
      this.cartInfo = plan;
      const body = {
          user_id: this.userId,
          plan_id: plan.plan_id,
        };
      const res = await addToCart(body);
      if (res.data && res.data.status_code === 200) {
          $('#addRemoveCartPopup').modal({
            backdrop: 'static',
            keyboard: false
          });
        }
    },
    async closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      await this.allList();
    },
    getCommonList() {
      this.cartIds = this.cartList.cart_items.map((item) => item.plan_id);
      this.expiryIds = Object.values(this.expiryList.expiry_dash_board_map)
        .flat()
        .map((item) => item.plan_id);
    },
    getImageUrl(expiry) {
      const filePath = expiry.image_path;
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    async renewServices() {
      const arrayOfObjects = Object.keys(
        this.expiryList.expiry_dash_board_map
      ).flatMap((categoryName) =>
        this.expiryList.expiry_dash_board_map[categoryName].map((item) => ({
          category: categoryName,
          ...item
        }))
      );
      const filteredArray = arrayOfObjects.filter(
        (item) => !this.cartIds.includes(item.plan_id)
      );
      const filteredFinalArray = filteredArray.filter(
        (item) => !item.expired
      );
      const payload = filteredFinalArray.map((plan) => {
        return {
          user_id: this.userId,
          plan_id: plan.plan_id,
          is_for_renew: true,
          ilt_slot_id: 0
        };
      });
      const res = await addToCartRenew(payload);
      if (res.data && res.data.status_code === 200) {
        this.addedToCart = true;
        this.$router.push('/market-place/cart');
        EventBus.$emit('cart-items-updated');
      }
    },
    async goToCart() {
      this.$router.push('/market-place/cart');
    },
    async getExpiryList() {
      this.loaderStatus = true;
      this.expiryList = await getExpiryList();
      this.expiryCount = this.expiryList.expiry_notification_count;
      this.expiryListObj = this.expiryList.expiry_dash_board_map;
      this.updatedCartList = this.cartList.cart_items.map(item => item.plan_id);
      this.loaderStatus = false;
    }
  }
};
</script>

<style scoped>
.expiry-list-title-container {
  width: 100%;
  position: relative;
}
.expiry-list-title-container:after {
  content: '\e6e0';
  font-family: 'element-icons';
  float: right;
  display: block;
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  color: black;
  font-weight: bolder;
  top: 5px;
  right: 10px;
  position: absolute;
}

.expiry-list-title-container.collapsed:after {
  content: '\e6e0';
  font-family: 'element-icons';
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  color: black;
  font-weight: bolder;
}
.expiry-body {
  padding-top: 0px;
  padding-left: 12px;
  display: grid;
  padding-bottom: 20px;
}

.list-container {
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-bottom: 10px;
  align-items: stretch;
  word-wrap: break-word;
}
.training-img {
  border-radius: 5px;
  height: 85px;
  width: 85px;
}
.training-detail-actions {
  align-self: flex-end;
  margin-bottom: 2px;
}

@media screen and (max-width: 850px) {
  .training-detail-actions {
    justify-content: flex-end;
  }
}
</style>
