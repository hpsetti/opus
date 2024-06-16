<template>
  <div
    class="details-wrapper col-xs-12 p-10 mb-10 d-flex xs-flex-column"
    v-if="selectedTrainingInfo"
    :class="{
      'cart-item': type === 'cart' || (!selectedTrainingInfo.enrolled && selectedTrainingInfo.cart_status.purchase_status === 'REMOVE_FROM_CART'),
      'gray-out': trainingDetails && selectedTrainingInfo.disable_as_bundle_added_to_cart,
      'cursor-pointer': selectedTrainingInfo.enrolled,
    }"
  >
    <div class="col-xs-12 col-sm-8 col-md-7 p-0 d-flex col-gap-20 align-items-center xs-flex-column">
      <img class="training-img" :src="getImageUrl(trainingDetails.blob_course_icon_url)" alt="" />
      <div class="d-flex flex-direction-column col-xs-12 p-0">
        <!-- Plan type -->
        <div class="fw-300 text-primary mb-5 d-flex justify-content-between xs-flex-column">
          <div>
            {{ trainingDetails.plan_type }}
          </div>
        </div>
        <!-- Title -->
        <div class="fw-700 font-18 text-primary mb-10 d-flex justify-content-between xs-flex-column">
          <div :class="{ 'flex-50': selectedTrainingInfo.enrolled && trainingDetails.is_trainings && trainingDetails.type !== 'Certificate' }">
            {{ trainingDetails.title }}
          </div>
        </div>
        <!-- For ITL -->
        <div class="d-flex col-gap-30 xs-flex-column">
          <div class="d-flex align-items-center">
            <img class="pr-10" src="/static/images/icons/lms/location.svg" alt="" />
            <span class="font-14 fw-300">Online</span>
          </div>
          <div class="d-flex align-items-center">
            <img class="preview-svg" src="/static/images/newMarketplace/clock.svg" alt="" />
            <span class="time-text">{{ selectedTrainingInfo.duration_hours }} {{ selectedTrainingInfo.duration_hours > 1 ? 'hours' : 'hour' }}</span>
          </div>
          <div class="d-flex align-items-center">
            <img class="pr-10" src="/static/images/icons/lms/calender.svg" alt="" />
            <div v-if="!selectedTrainingInfo.enrolled">
              {{ getDateList(selectedTrainingInfo.all_available_time_slots)}} {{ getTimeList(selectedTrainingInfo.all_available_time_slots)}}
            </div>
            <div v-else>More dates coming soon</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Action Section -->
    <div class="col-xs-12 col-sm-4 col-md-5 p-0 d-flex flex-direction-column justify-content-center">
      <div class="col-xs-12 pl-0 pr-0 justify-end col-gap-20" v-if="trainingDetails.plan_type === 'ComplianceWire Training' || !selectedTrainingInfo.enrolled">
        <div>
          <div class="col-xs-12 d-flex pl-0 pr-0 justify-end mb-10 col-gap-20">
            <span class="font-18 fw-700">Price</span>
            <span class="font-18 price-text">${{ trainingDetails.price }}</span>
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0 d-flex col-gap-20 xs-flex-column justify-content-end align-items-center pl-0 cursor-pointer price">
        <span v-if="!selectedTrainingInfo.enrolled || trainingDetails.plan_type === 'ComplianceWire Training'" class="cursor-pointer font-18 fw-600" @click="setSelectedTraining()">View Details</span>
        <!-- For All Non Purchased items -->
        <template v-if="!selectedTrainingInfo.enrolled">
          <div>
            <BaseButton
              class="br-20 d-flex align-items-center col-gap-10"
              :variant="btnVariant"
              :has-icon="selectedTrainingInfo.cart_status.purchase_status === 'REMOVE_FROM_CART'"
              @click="addRemoveCart(selectedTrainingInfo, trainingDetails.plan_id)"
            >
              <img src="/static/images/newMarketplace/trash.svg" v-if="selectedTrainingInfo.cart_status.purchase_status === 'REMOVE_FROM_CART'" alt="" class="preview-svg"/>
              <span>{{ cartStatus[selectedTrainingInfo.cart_status.purchase_status] }}</span>
            </BaseButton>
          </div>
        </template>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { cartStatus } from '../../utils/constants';
import Loader from '../UIComponents/Loader.vue';
import downloadZipFile from '../UIComponents/mixins/documentsMixin';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  mixins: [downloadZipFile],
  props: {
    trainingDetails: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    userId: {
      type: Number,
    },
  },

  data() {
    return {
      statusMap: {
        'Not Started': 'Enrolled',
        Incomplete: 'In progress',
      },
      loaderStatus: false,
      notEnrolled: 'Not Enrolled',
      cartInfo: {},
      cartStatus,
      selectedTrainingInfo: null,
    };
  },

  computed: {
    isILT() {
      return this.trainingDetails.plan_type === 'Instructor Led';
    },
    isPreRecCourse() {
      return (
        this.trainingDetails.plan_type === 'Instructor Led'
        && this.trainingDetails.type === 'Pre-recorded course'
      );
    },
    btnVariant() {
      if (this.selectedTrainingInfo.cart_status.purchase_status === 'ADD_TO_CART') return 'primary';
      if (this.selectedTrainingInfo.cart_status.purchase_status === 'REMOVE_FROM_CART') return 'secondary';
      return '';
    },
    slotMoreOptions() {
      const slotCount = this.selectedTrainingInfo;
      if (slotCount <= 1) return '';
      if (slotCount === 2) return ' + 1 more option';
      return ` + ${slotCount - 1} more options`;
    },
  },

  components: {
    Loader,
    BaseButton,
  },
  watch: {
    trainingDetails: {
      handler(newvlaue) {
        if (newvlaue) {
          this.selectedTrainingInfo = this.trainingDetails;
        }
      },
      immediate: true,
    },
  },
  methods: {
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    formatedDate(value) {
      if (value) {
        const [year, month] = value;
        const actualDate = dayjs(`${year}-${month}`).format('MMM YYYY');
        return actualDate;
      }
      return '';
    },
    formatToLocalDate(value) {
      if (value) {
        return dayjs
          .utc(`${value}`)
          .local()
          .format('ddd MMM DD , YYYY');
      }
      return '';
    },
    dateConvert(time) {
      const newTime = dayjs.utc(`${time.slot_start_time}`).format('MMM DD');
      const newTime2 = dayjs.utc(`${time.slot_end_time}`).format('MMM DD');
      const newTime3 = dayjs.utc(`${time.slot_end_time}`).format('YYYY');
      const fullTime = `${newTime}-${newTime2}, ${newTime3}`;
      return fullTime;
    },
    timeConvert(time) {
      const newTime4 = dayjs.utc(`${time.slot_start_time}`).format('hh A');
      const newTime5 = dayjs.utc(`${time.slot_end_time}`).format('hh A');
      const fullTime = `${newTime4} to ${newTime5} ET`;
      return fullTime;
    },
    getDateList(time) {
      return this.dateConvert(time[0]);
    },
    getTimeList(time) {
      return this.timeConvert(time[0]);
    },

    setSelectedTraining() {
      const { plan_type: planType } = this.trainingDetails;
      const details = this.trainingDetails;
      if (planType === 'ComplianceWire Training') {
        const urlName = details.title.replace(/®/g, '').replace(/ /g, '-').toLowerCase();
        localStorage.setItem('scheduleTrainingId', JSON.stringify(details.course_id));
        localStorage.setItem('schedulePlanId', JSON.stringify(details.plan_id));
        const planId = details.plan_id;
        this.$router.push({
          path: `/compliancewire-marketplace/details/${urlName}`,
          query: { planId, userId: this.userId },
        });
      }
    },
    async addRemoveCart(itemSelected) {
      const { purchase_status: purchaseStatus } = itemSelected.cart_status;
      if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?',
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: this.trainingDetails,
          // item: this.trainingDetails,
        });
      } else if (purchaseStatus === 'ADD_TO_CART') {
        this.$emit('onShowTimeSlots', this.trainingDetails);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'add_to_cart_button_click',
          add_to_cart_type: itemSelected.plan_type,
          add_to_cart_title: itemSelected.title,
        });
      }
    },
  },
};
</script>

<style scoped>
.details-wrapper {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.training-img {
  height: 85px;
  /* width: 125px; */
  object-fit: cover;
  border-radius: 5px;
}

.price,
.preview-text {
  color: #00518a;
}

.price-text {
  min-width: 60px;
  text-align: right;
}

.time-text {
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
}

.flex-title {
  flex: 0 0 50%;
}

.cart-item {
  border: 3px solid #4c9e45;
}

.align-self-center {
  align-self: center;
}

.flex-50 {
  flex: 0 0 65%;
}

.gray-out {
  opacity: 0.5;
  pointer-events: none;
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .training-img {
    width: 100%;
    height: 100%;
  }

  .flex-title {
    flex: 0 0 100%;
  }
}
</style>
