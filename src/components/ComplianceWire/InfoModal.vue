/** * @author Hemanth Alluddla * @email 85761@global.ul.com * @Info Video modal */
<template>
  <div>
    <div id="modal_video" class="modal" role="dialog">
      <div class="modal-dialog modal-lg request-modal">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20" v-if="displayData">
          <div class="modal-header">
            <div class="col-xs-12 p-0 text-start header d-flex align-items-center col-gap-26">
              <img src="/static/images/icons/lms/info-modal-training-icon.svg" class="lms-training-icon" />
              <span>Training</span>
            </div>
          </div>

          <div class="modal-body col-xs-12 text-start">
            <div class="col-xs-12 p-0 training-type mb-5">{{ displayData.training_type }}</div>
            <div class="col-xs-8 p-0">
              <div class="col-xs-12 p-0 training-title mb-5">
                {{ displayData.title }}
              </div>
              <div class="col-xs-11 p-0 font-14 mb-10">
                {{ displayData.description }}
              </div>
            </div>
            <div class="col-xs-4 p-0" v-if="displayData.training_type !== 'Consulting'">
              <div class="col-xs-12 course-contents p-0">
                {{ displayData.training_type === 'Certificate' ? 'Courses' : 'Contents' }}
              </div>
              <div class="col-xs-12 p-0 mt-10">
                <ul>
                  <li class="font-14" v-for="(content, index) in displayData.content_list" :key="index">
                    {{ content }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xs-12 p-0 mt-15" v-if="displayData.training_type !== 'Consulting'">
              <div class="col-xs-12 p-0 mt-15">{{ displayData.course_count }} {{ displayData.course_count > 1 ? 'courses' : 'course' }}</div>
              <div class="col-xs-12 p-0 pt-10">
                <div v-if="displayData.training_type === 'Certificate'">{{ displayData.duration_minutes / 60 }} hours</div>
                <div v-else>{{ displayData.duration_minutes }} minutes</div>
              </div>
              <div class="col-xs-12 pr-0 purchase-info-main mt-10">
                <div class=" col-xs-10 purchase-info p-0 font-18 font-bold pr-10">
                  {{ getPurchaseStatus(displayData.included) }}
                </div>
                <div class="col-xs-2 font-18 font-bold text-right p-0 pr-10">${{ displayData.price }}</div>
              </div>
            </div>
            <div class="col-xs-12 p-0">
              <loader :loadingStatus="loaderStatus"></loader>
            </div>
          </div>
          <div class="footer col-xs-12 flex-wrapper align-items-center xs-flex-column col-gap-20 p-0">
            <BaseButton data-dismiss="modal" variant="secondary">
              Cancel
            </BaseButton>
            <div v-if="trainingInfo.training_type === 'Certificate' && trainingInfo.enrolled">
              <!-- No data as Certificate is created from OPUS. -->
            </div>
            <template v-else-if="displayData.enrolled">
              <a :href="displayData.deep_link" target="_blank">
                <img class="play-icon" src="/static/images/icons/lms/play.svg" alt />
                <span>Play</span>
              </a>
            </template>
            <div v-else>
              <BaseButton
                class="br-20"
                :has-icon="displayData.cart_status.purchase_status === 'REMOVE_FROM_CART'"
                :class="{
                  'primary': displayData.cart_status.purchase_status === 'ADD_TO_CART',
                  'secondary': displayData.cart_status.purchase_status === 'REMOVE_FROM_CART',
                }"
                @click="addRemoveCart(displayData.cart_status, displayData.plan_id)"
              >
                <img src="/static/images/newMarketplace/trash.svg" v-if="displayData.cart_status.purchase_status === 'REMOVE_FROM_CART'" alt="" />
                {{ cartStatus[trainingInfo.cart_status.purchase_status] }}
              </BaseButton>
            </div>
            <!-- <div class="col-md-4 col-sm-4 submit-button">
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Loader from '../UIComponents/Loader.vue';
import { cartStatus } from '../../utils/constants';
import { addToCart } from '../../apis/cart';
import BaseButton from '../UIComponents/BaseButton.vue';
import EventBus from '../../utils/event-bus';

export default {
  props: ['trainingInfo', 'userId', 'accountId', 'loader'],

  data() {
    return {
      displayData: null,
      paramId: '',
      cartStatus,
      loaderStatus: false,
    };
  },

  components: {
    Loader,
    BaseButton,
  },

  watch: {
    trainingInfo() {
      this.displayData = this.trainingInfo;
    },
    loader() {
      this.loaderStatus = this.loader;
    },
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
    addToAccount() {
      this.paramId = this.displayData.course_id;
      this.$router.push({ path: `/market-place/add-service/${this.paramId}` });
    },
    async addRemoveCart(cartItemStatus, planId) {
      if (cartItemStatus.purchase_status === 'ADD_TO_CART') {
        this.loaderStatus = true;
        const body = {
          user_id: this.userId,
          plan_id: planId,
        };
        if (this.displayData.plan_type === 'eLearning') body.plan_id = planId;
        const res = await addToCart(body);
        this.loaderStatus = false;
        if (res.data && res.data.status_code === 200) {
          const cartInfo = {
            type: 'add',
            body: '',
          };
          this.$emit('setCartInfo', {
            cartInfo,
            item: this.trainingInfo,
          });
          this.emitter.emit('cart-items-updated');
        }
      } else if (cartItemStatus.purchase_status === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?',
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: this.trainingInfo,
        });
      }
    },
    reset() {
      $('#modal_video').modal('hide');
    },
  },
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
  height: 60px;
}
.play-icon {
  height: 35px;
  padding-right: 10px;
}
.modal-body {
  padding-left: 9px;
  padding-right: 0px;
  padding-bottom: 15px;
}
.course-contents {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 25px;
  font-weight: 700;
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
