<template>
  <div
    class="catalog-list-card col-xs-12 pr-0 xs-pl-0"
    :class="{
      'gray-out':
        mainTab === 'eLearning' && trainingInfo.disable_as_bundle_added_to_cart
    }"
  >
    <div class="col-xs-12 col-sm-8 col-md-9 flex-center pl-0">
      <div v-if="mainTab === 'eLearning'" class="RL_background_img">
        <img
          class="learning-type-image"
          :src="getImageUrl(trainingInfo.image_path)"
          alt=""
        />
      </div>
      <div v-else class="RL_background_img">
        <img
          class="learning-type-image"
          :src="getImageUrl(trainingInfo.blob_course_icon_url)"
          alt=""
        />
      </div>
      <div class="training-details sm-pl-30">
        <div class="catalog-header">
          {{ trainingInfo.training_type }}
        </div>
        <div
          class="RL_tile_header"
          :class="{ 'RL_mb-8': mainTab === 'eLearning' }"
        >
          {{ trainingInfo.title }}
        </div>
        <div
          v-if="mainTab !== 'eLearning'"
          class="flex-wrap RL_mb-8 text-light-black fw-300 font-12"
        >
          <span
            class="mr-10 tags mt-10"
            v-for="(tag, index) in trainingInfo.tags"
            :key="index"
            :style="{ background: tag.color, color: 'rgba(0, 0, 0, 0.7)' }"
            >{{ tag.tag_name }}</span
          >
        </div>
        <div class="catalog-text RL_mb-8 text-light-black">
          {{
            trainingInfo.description.length > 300
              ? trainingInfo.description.slice(0, 299) + '...'
              : trainingInfo.description
          }}
        </div>
        <div class="catalog-text col-xs-12 p-0" v-if="mainTab !== 'eLearning'">
          <div class="flex-align-center text-light-black font-14 fw-300">
            <img
              class="pr-10"
              src="/static/images/icons/lms/location.svg"
              alt=""
            />
            <span>{{ trainingInfo.training_location }}</span>
            <div class="pl-20 flex-align-center">
              <img
                class="mt-5"
                src="/static/images/icons/lms/calender.svg"
                alt=""
              />
              <div
                class="pl-10"
                v-if="
                  trainingInfo.enrolled ||
                  (trainingInfo.cart_status && trainingInfo.cart_status.cart_id)
                "
              >
                {{
                  formatToLocalDate(trainingInfo.booked_time_slot &&
                  trainingInfo.booked_time_slot.slot_start_time)
                }}
              </div>
              <div
                v-else-if="
                  !trainingInfo.enrolled && trainingInfo.upcoming_time_slot
                "
              >
                {{
                  formatToLocalDate(trainingInfo.upcoming_time_slot.slot_start_time)
                }}
              </div>
              <div class="pl-10" v-else>More dates coming soon</div>
            </div>
          </div>
        </div>
        <div class="catalog-text" v-if="mainTab === 'eLearning'">
          {{ trainingInfo.course_count }}
          {{ trainingInfo.course_count > 1 ? 'courses' : 'course' }}
        </div>
        <div class="catalog-text" v-if="mainTab === 'eLearning'">
          <div v-if="trainingInfo.training_type === 'Certificate'">
            {{ trainingInfo.duration_minutes / 60 }} hours
          </div>
          <div v-else>{{ trainingInfo.duration_minutes }} minutes</div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-3 pr-0">
      <div class="mb-10 center">
        <div class="purchase-info" v-if="trainingInfo.included">
          <p class="purchase-text">Included in Trial</p>
          <p class="purchase-amount">${{ trainingInfo.price }}</p>
        </div>
        <div class="purchase-info" v-else-if="trainingInfo.enrolled">
          <p class="purchase-text">Purchased</p>
          <p class="purchase-amount">${{ trainingInfo.price }}</p>
        </div>
        <div class="purchase-info" v-else>
          <p class="purchase-text">Price</p>
          <p class="purchase-amount">${{ trainingInfo.price }}</p>
        </div>
      </div>
      <div class="col-xs-12 header-buttons center mb-10">
        <button
          class="btn emergo-white-button br-20 mb-10 w-180"
          @click="openInfo(trainingInfo.course_id, trainingInfo.title)"
        >
          More Info / Details
        </button>
      </div>
      <div
        class="col-xs-12 header-buttons center mb-10"
        v-if="
          trainingInfo.training_type !== 'Certificate' &&
          mainTab === 'eLearning'
        "
      >
        <button
          class="btn emergo-white-button br-20 mb-10 w-180"
          @click="openPreview()"
        >
          <img
            src="/static/images/icons/lms/preview.svg"
            class="preview-svg"
            alt=""
          />
          <span>Preview</span>
        </button>
      </div>
      <div class="col-xs-12 center">
        <div
          v-if="
            trainingInfo.enrolled &&
            mainTab === 'eLearning' &&
            trainingInfo.training_type !== 'Certificate'
          "
        >
          <a :href="trainingInfo.deep_link" target="_blank">
            <img
              class="play-icon"
              src="/static/images/icons/lms/play.svg"
              alt
            />
            <span>Play course</span>
          </a>
        </div>
        <div>
          <button
            v-if="!trainingInfo.enrolled && trainingInfo.cart_status"
            :disabled="trainingInfo.enrolled && mainTab !== 'eLearning'"
            class="br-20 mb-10 w-180"
            :class="{
              'emergo-green-button':
                trainingInfo.cart_status.purchase_status === 'ADD_TO_CART',
              'emergo-white-button':
                trainingInfo.cart_status.purchase_status === 'REMOVE_FROM_CART'
            }"
            @click="addRemoveCart(trainingInfo, trainingInfo.plan_id)"
          >
            <img
              src="/static/images/newMarketplace/trash.svg"
              v-if="
                trainingInfo.cart_status.purchase_status === 'REMOVE_FROM_CART'
              "
              alt=""
            />
            {{ cartStatus[trainingInfo.cart_status.purchase_status] }}
          </button>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import Loader from '../UIComponents/Loader.vue';
import { cartStatus } from '../../utils/constants';
import { addToCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';

export default {
  props: ['mainTab', 'userId', 'trainingInfo', 'keyValue'],

  data() {
    return {
      cartInfo: {},
      cartStatus,
      loaderStatus: false
    };
  },

  components: {
    Loader
  },
  methods: {
    async addRemoveCart(cartItemStatus, planId) {
      const { purchase_status: purchaseStatus } = cartItemStatus.cart_status;
      if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?'
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: cartItemStatus
        });
      } else if (
        purchaseStatus === 'ADD_TO_CART' &&
        this.mainTab === 'eLearning'
      ) {
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
            item: cartItemStatus
          });
          this.emitter.emit('cart-items-updated');
        }
      } else if (
        purchaseStatus === 'ADD_TO_CART' &&
        this.mainTab !== 'eLearning'
      ) {
        this.openTimeSlotSelectionPopup(cartItemStatus);
      }
    },

    openAddRemoveConfirmationPopup() {
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    showToasterNotification(res) {
      this.$notify({
        type: res.data.message,
        title: res.data.message,
        text: res.data.data
      });
    },
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },

    openTimeSlotSelectionPopup(selectedCourse) {
      this.$emit('setSelectedIltTraining', selectedCourse);
      $('#training-signup-modal').modal('show');
    },

    openInfo(courseId, title) {
      if (this.mainTab === 'eLearning') {
        this.$emit('setSelectedTraining', this.trainingInfo);
        $('#modal_video').modal('show');
      } else this.openInstructorCourseInfo(courseId, title);
    },

    openInstructorCourseInfo(courseId, title) {
      const urlName = title.replace(/ /g, '-').toLowerCase(); // Making url more understandable for publically publishing url's
      localStorage.setItem('scheduleTrainingId', JSON.stringify(courseId));
      this.$router.push({
        path: `/trainings/schedule-training/${urlName}`,
        query: { courseId }
      });
    },
    openPreview() {
      this.$emit('setSelectedPreview', this.trainingInfo);
      $('#preview_video').modal('show');
    }
  }
};
</script>
<style scoped>
.flex-center {
  display: flex;
}

.tags {
  margin-right: 10px;
  padding: 0px 10px 0px 10px;
  border-radius: 5px;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex-align-center {
  display: flex;
  align-items: center;
}

.w-180 {
  width: 230px;
  height: 36px;
}
.catalog-list-card {
  padding-top: 20px;
  border-bottom: 1px solid #bdbdbd;
  padding-bottom: 20px;
}
.purchase-info {
  display: inline-flex;
}

.purchase-text {
  font-size: 16px;
  font-weight: 700;
}

.purchase-amount {
  font-size: 16px;
  font-weight: 400;
  padding-left: 20px;
}

.catalog-text {
  font-size: 14px;
  font-weight: 300;
}
.catalog-header {
  font-size: 18px;
  color: #0b3c61;
  font-weight: 300;
}
.play-icon {
  height: 30px;
  width: 30px;
  margin-right: 10px;
}
/* common classes need to be cleaned up and added to style.css */
.catalog-image {
  border-radius: 5px;
  height: 203px;
}

.gray-out {
  opacity: 0.5;
  pointer-events: none;
}

@media screen and (max-width: 768px) and (min-width: 560px) {
  .learning-type-image {
    width: 110px;
    height: 70px;
  }
}

@media screen and (max-width: 767px) {
  .flex-center {
    flex-direction: column;
  }
}

@media screen and (max-width: 1024px) {
  .xs-pl-0 {
    padding-left: 0px;
  }
}

@media screen and (min-width: 768px) {
  .sm-pl-30 {
    padding-left: 30px;
  }
}
</style>
