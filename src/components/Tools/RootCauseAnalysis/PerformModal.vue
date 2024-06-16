<template>
  <div>
    <div id="modal_video" class="modal" role="dialog">
      <div class="modal-dialog modal-lg request-modal">
        <!-- Modal content-->
        <div
          class="modal-content col-xs-12 p-20"
          v-for="training in displayData"
          :key="training.plan_id"
        >
          <div class="modal-header">
            <div
              class="col-xs-12 p-0 text-start header d-flex align-items-center col-gap-26"
            >
              <img
                src="/static/images/icons/lms/info-modal-training-icon.svg"
                class="lms-training-icon"
              />
              <span>Training</span>
            </div>
          </div>
          
          <div class="modal-body col-xs-12 text-start">
            <div class="col-xs-12 p-0 training-type mb-5">
              {{ training.training_type }}
            </div>
            <div class="col-xs-8 p-0">
              <div class="col-xs-12 p-0 training-title mb-5">
                {{ training.title }}
              </div>
              <div class="col-xs-11 p-0 font-14 mb-10">
                {{ training.description }}
              </div>
              <div class="fw-700 font-14 validity-text text-secondary pr-15">
            Validity - {{ training.validity_months }} days access
          </div>
            </div>
            <div
              class="col-xs-4 p-0"
              v-if="training.training_type !== 'Consulting'"
            >
              <div class="col-xs-12 course-contents p-0">
                {{
                  training.training_type === 'Certificate'
                    ? 'Courses'
                    : 'Contents'
                }}
              </div>
              <div class="col-xs-12 p-0 mt-10">
                <ul>
                  <li
                    class="font-14"
                    v-for="(content, index) in training.content_list"
                    :key="index"
                  >
                    {{ content }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-xs-12 p-0 mt-15"
              v-if="training.training_type !== 'Consulting'"
            >
              <div class="col-xs-12 p-0 course-contents mt-15">
                {{ training.course_count }}
                {{ training.course_count > 1 ? 'courses' : 'course' }}
              </div>
              <div class="col-xs-12 p-0 course-contents pt-10">
                <div v-if="training.training_type === 'Certificate'">
                  {{ training.duration_minutes / 60 }} hours
                </div>
                <div v-else>{{ training.duration_minutes }} minutes</div>
              </div>
              <div class="col-xs-12 pr-0 purchase-info-main mt-10">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <div class="purchase-info p-0 font-18 font-bold pr-10">
                      {{ getPurchaseStatus(training.included) }}
                    </div>
                    <div
                      class="pl-15 pb-15"
                      v-if="training.previous_purchase_date"
                    >
                      <p class="text-regular-large orange-bg2 expiry-box">
                        Previously purchased: {{
                          formatPurchaseDate(training.previous_purchase_date)
                        }}
                      </p>
                    </div>
                    <div
                      class="pl-15 pb-15"
                      v-if="training.expiry_days > 90"
                    >
                      <p class="text-regular-large">
                        Expires:
                        {{ formatPurchaseDate(training.expiry_date) }}
                      </p>
                    </div>
                    <div
                      class="pl-15 pb-15"
                      v-else-if="
                        training.expiry_days <= 90 &&
                        training.expiry_days > 10
                      "
                    >
                      <p class="text-regular-large orange-bg2 expiry-box">
                        Expires: {{ training.expiry_days }} days
                      </p>
                    </div>
                    <div class="pl-15 pb-15" v-else-if="training.expiry_days <= 10 && training.expiry_days > 1">
                      <p class="text-regular-large red-bg1 expiry-box white-1">
                        Expires: {{ training.expiry_days }} days
                      </p>
                    </div>
                    <div class="pr-15 pb-15" v-else-if="training.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ training.expiry_days }} day</p>
          </div>
                  </div>
                  <div class="col-xs-2 font-18 font-bold text-right p-0 pr-10">
                    ${{ training.price }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0">
              <loader :loadingStatus="loaderStatus"></loader>
            </div>
          </div>
          <div
            class="footer col-xs-12 flex-wrapper align-items-center xs-flex-column col-gap-20"
          >
            <BaseButton data-dismiss="modal" variant="secondary">
              Cancel
            </BaseButton>
            <div
              v-if="
                training.training_type === 'Certificate' && training.enrolled
              "
            >
              <!-- No data as Certificate is created from OPUS. -->
            </div>
            <template v-else-if="training.enrolled">
              <!-- <a :href="training.deep_link" target="_blank">
                <img class="play-icon" src="/static/images/icons/lms/play.svg" alt />
                <span>Play</span>
              </a> -->
              <BaseButton has-icon @click="playTraining(training)">
                <img
                  class="preview-svg"
                  src="/static/images/icons/play.svg"
                  alt
                />
                <span>Play course</span>
              </BaseButton>
            </template>
            <div v-else>
              <BaseButton
                class="br-20"
                :class="{
                  primary:
                    training.cart_status.purchase_status === 'ADD_TO_CART',
                  secondary:
                    training.cart_status.purchase_status === 'REMOVE_FROM_CART',
                    tertiary:
                  training.cart_status.purchase_status ===
                  'GO_TO_CART'
                }"
                :has-icon="
                  training.cart_status.purchase_status === 'REMOVE_FROM_CART'
                "
                @click="addRemoveCart(training.cart_status, training.plan_id)"
                :disabled="training.disable_as_bundle_added_to_cart"
              >
              <img
                src="/static/images/newMarketplace/goto_arrow.svg"
                v-if="
                  training.cart_status.purchase_status ===
                  'GO_TO_CART'
                "
                alt=""
                class="preview-svg"
              />
                <img
                  src="/static/images/newMarketplace/trash.svg"
                  v-if="
                    training.cart_status.purchase_status === 'REMOVE_FROM_CART'
                  "
                  alt="Remove from cart"
                  class="preview-svg"
                />
                {{ cartStatus[training.cart_status.purchase_status] }}
              </BaseButton>
            </div>
          </div>
        </div>
        <loader :loadingStatus="loaderStatus || loaderPopup"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import moment from 'moment';
import Loader from '../../UIComponents/Loader.vue';
import { cartStatus } from '../../../utils/constants';
import { addToCart } from '../../../apis/cart';
import EventBus from '../../../utils/event-bus';
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  props: ['trainingInfo', 'userId', 'accountId', 'loader', 'loaderPopup'],

  data() {
    return {
      displayData: null,
      paramId: '',
      cartStatus,
      loaderStatus: false
    };
  },

  components: {
    Loader,
    BaseButton
  },

  watch: {
    trainingInfo() {
      this.displayData = this.trainingInfo;
    }
  },

  methods: {
    getPurchaseStatus(purchansed) {
      switch (purchansed) {
        case 'yes':
          return 'Included In Trial';
        default:
          return 'Price';
      }
    },
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return moment(formattedDateArray).format('D MMM YYYY');
      }
      return '';
    },
    async addRemoveCart(cartItemStatus, planId) {
      if (cartItemStatus.purchase_status === 'ADD_TO_CART') {
        this.loaderStatus = true;
        const body = {
          user_id: this.userId,
          plan_id: planId
        };
        const res = await addToCart(body);
        this.loaderStatus = false;
        if (res.data && res.data.status_code === 200) {
          const cartInfo = {
            type: 'add',
            body: ''
          };
          this.$emit('setCartInfo', {
            cartInfo,
            item: this.trainingInfo[0]
          });
          EventBus.$emit('cart-items-updated');
        }
      } else if (cartItemStatus.purchase_status === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?'
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: this.trainingInfo[0]
        });
      }else if (cartItemStatus.purchase_status === 'GO_TO_CART') {
        this.$router.push('/market-place/cart');
      }
    },
    playTraining(training) {
      if (training.deep_link) {
        window.open(training.deep_link, '_blank');
      }
      this.reset();
    },
    reset() {
      $('#modal_video').modal('hide');
    }
  }
};
</script>

<style scoped>
.w-180 {
  width: 230px;
  height: 36px;
}

.header {
  background: #43b4e4;
  padding: 5px 0px 5px 15px;
  color: #ffffff;
  border-radius: 5px;
  font-size: 32px;
}
.play-icon {
  height: 35px;
  padding-right: 10px;
}
.modal-body {
  padding-left: 0px;
  padding-bottom: 50px;
}
.course-contents {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 19px;
}

li {
  list-style-type: none;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
}

li:before {
  content: '\00b7';
  font-size: 30px;
  vertical-align: sub;
}

@media (min-width: 375px) and (max-width: 1200px) {
  .request-modal {
    width: 75%;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
}

.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}

.modal-footer {
  background: #fff;
  border-top: none;
}

.mt-15 {
  margin-top: 15px;
}

.modal-body {
  background: #fff;
}

.training-details {
  font-weight: 400;
  color: #000000;
  font-size: 18px;
  margin-bottom: 15px;
}

.text-start {
  text-align: start;
}

.course-info {
  text-align: justify;
  margin-top: 10px;
  padding-right: 15px;
}

.save-button {
  border: 1px solid #4c9e45;
  background-color: #4c9e45;
  color: #f2f2f2;
}
.save-button:hover {
  color: #f2f2f2;
}

/* .footer-btn-common-properties {
  border-radius: 20px;
  line-height: 21px;
  font-size: 18px;
  font-weight: 500;
} */

/* .cancel-button {
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  text-align: center;
  color: #0b3c61;
}
.cancel-button:hover {
  color: #0b3c61;
} */

.flex-wrapper {
  display: flex;
  justify-content: flex-end;
}

ul {
  padding-left: 10px;
}

.training-type {
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #00518a;
}

.training-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}

.purchase-info {
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
}
.purchase-info-main {
  padding: 15px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.col-gap-26 {
  column-gap: 26px;
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }
}

@media (min-width: 768px) {
  .modal-dialog {
    margin: 80px auto !important;
  }
}
</style>
