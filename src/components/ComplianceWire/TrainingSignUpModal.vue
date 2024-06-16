/** * @author Rajesh Bodapati * @email rajesh.bodapati@ul.com * @create date 2022-02-07 17:39:51 * @modify date 2022-02-07 17:39:51 * @desc [description] */
<template>
  <div id="compliance-signup-modal" class="modal" role="dialog">
    <div class="modal-dialog modal-lg request-modal">
      <!-- Modal content-->
      <div class="modal-content col-xs-12 p-20">
        <div class="modal-header" v-if="courseDetails">
          <div class="col-xs-12 p-0 text-start header">
            <img src="/static/images/icons/lms/info-modal-training-icon.svg" class="lms-training-icon" />
            {{ courseDetails.title }}
            <img src="/static/images/icons/close_icon.svg" class="close-icon" @click="closeModal" />
          </div>
        </div>
        <div class="modal-body">
          <div class="col-xs-12 course-time">Select your course time</div>
          <div class="col-xs-9 text-regular-small text-secondary mb-20">
            Select a course time from the available list below. Once you select your course time and click on Add to account, you will be redirected to complete your purchase.
          </div>
          <div class="row col-xs-12" v-for="(timeSlot, index) in availableTimeSlots" :key="index">
            <div class="col-xs-12 p-0 slot-card mb-15" :class="{ 'selected-slot': selectedSlotId === timeSlot.slot_id }">
              <label class="radio">
                <input type="radio" class="radio__input" :value="timeSlot.slot_id" v-model="selectedSlotId" />
                <div class="radio__radio"></div>
                <div class="pl-20">
                  <div>{{ getDateList(timeSlot) }}</div>
                  <div>{{ gettimeList(timeSlot) }}</div>
                </div>
              </label>
            </div>
          </div>
          <div class="col-xs-12 no-data-text text-center font-18 fw-700" v-if="!availableTimeSlots.length && !this.loaderStatus">
            More dates coming soon
          </div>
        </div>
        <div class="footer col-xs-12 p-0 flex-wrapper">
          <BaseButton @click="closeModal" variant="secondary">
            Cancel
          </BaseButton>
          <BaseButton class="br-20 ml-20" :disabled="eventsNone" @click="addCartOrUpdateSlot">
            {{ operations.type === 'select' ? 'Add to cart' : 'Update Slot' }}
          </BaseButton>
        </div>
        <loader :loadingStatus="loaderStatus"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import Loader from '../UIComponents/Loader.vue';
import { addToCart } from '../../apis/cart';
import { updateTimeSlot } from '../../apis/instructorLedTraining';
import BaseButton from '../UIComponents/BaseButton.vue';
import EventBus from '../../utils/event-bus';
import { getSlotDate, getSlotTimeRange } from '../../utils/common';

export default {
  props: ['listView', 'timeSlotsList', 'userId', 'operations'],

  data() {
    return {
      courseDetails: {},
      loaderStatus: false,
      selectedSlotId: null,
      availableTimeSlots: [],
    };
  },

  components: {
    Loader,
    BaseButton,
  },

  computed: {
    eventsNone() {
      if (this.operations.type === 'select') return !this.selectedSlotId;
      return this.selectedSlotId === this.operations.selectedSlotId;
    },
  },

  watch: {
    courseDetails() {
      if (this.listView && this.courseDetails) {
        this.getTimeSlotsList();
      }
    },
    operations: {
      handler(operations) {
        if (operations.type === 'select') {
          this.setCourseDetails();
        } else if (operations.type === 'edit') {
          this.setSelectedDetails();
        }
      },
      deep: true,
    },
    timeSlotsList(newValue) {
      if (newValue) {
        this.availableTimeSlots = newValue;
      }
    },
  },

  methods: {
    getSlotDate,
    getSlotTimeRange,
    formatToLocalDate(timeSlot) {
      if (timeSlot) {
        return dayjs
          .utc(`${timeSlot.slot_start_time}`)
          .local()
          .format('ddd MMM D, YYYY');
      }
      return '';
    },

    formatToLocalTime(timeSlot) {
      if (timeSlot) {
        const startTime = dayjs
          .utc(`${timeSlot.slot_start_time}`)
          .local()
          .format('h:mma');
        const endTime = dayjs
          .utc(`${timeSlot.slot_end_time}`)
          .local()
          .format('h:mma');
        return `${startTime} - ${endTime}`;
      }
      return '';
    },
    async getTimeSlotsList() {
      this.loaderStatus = true;
      const availableApiTimeSlots = this.courseDetails.all_available_time_slots;
      this.availableTimeSlots = availableApiTimeSlots?.length > 4 ? availableApiTimeSlots.slice(0, 4) : availableApiTimeSlots;
      this.loaderStatus = false;
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
      return this.dateConvert(time);
    },
    gettimeList(time) {
      return this.timeConvert(time);
    },

    setSelectedDetails() {
      const { courseDetails, selectedSlotId, timeSlotsList } = this.operations;
      this.courseDetails = { ...courseDetails };
      this.availableTimeSlots = [...timeSlotsList];
      this.selectedSlotId = selectedSlotId;
    },

    setCourseDetails() {
      const { courseDetails, listView, timeSlotsList } = this.operations;
      this.courseDetails = { ...courseDetails };
      if (listView && courseDetails) {
        this.getTimeSlotsList();
      } else {
        this.availableTimeSlots = [...timeSlotsList];
      }
    },

    closeModal() {
      this.selectedSlotId = null;
      if (this.listView) this.availableTimeSlots = [];
      $('#compliance-signup-modal').modal('hide');
    },
    async addCartOrUpdateSlot() {
      if (this.operations.type === 'select') {
        const body = {
          user_id: this.userId,
          plan_id: this.courseDetails.plan_id,
          ilt_slot_id: this.selectedSlotId,
        };
        this.loaderStatus = true;
        const res = await addToCart(body);
        this.loaderStatus = false;
        if (res.data && res.data.status_code === 200) {
          this.closeModal();
          const cartInfo = {
            type: 'add',
            body: '',
          };
          this.$emit('setCartInfo', {
            cartInfo,
            item: this.courseDetails,
          });
          this.emitter.emit('cart-items-updated');
        }
      } else if (this.operations.type === 'edit') {
        this.loaderStatus = true;
        const body = {
          cart_id: this.courseDetails.cart_status.cart_id,
          course_id: this.courseDetails.course_id,
          new_slot_id: this.selectedSlotId,
          user_id: this.userId,
        };
        const response = await updateTimeSlot(body);
        this.loaderStatus = false;
        this.$emit('refreshAllInfo', response);
      }
    },
  },
};
</script>

<style scoped>
.modal-open .modal {
  overflow-y: hidden;
}

.flex-align-center {
  display: flex;
  align-items: center;
}

.slot-card {
  border: 1px solid #e0e0e0;
  padding: 10px 10px 10px 30px;
  background: #ffffff;
  border-radius: 8px;
}

.footer-btn {
  font-weight: 600;
  font-size: 18px !important;
  padding: 9px 32px;
}

.modal-dialog {
  vertical-align: baseline;
}
.w-180 {
  width: 230px;
  height: 36px;
}
.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}
.header {
  background: #43b4e4;
  padding: 5px 0px 5px 15px;
  color: #ffffff;
  border-radius: 5px;
}
.close-icon {
  float: right;
  padding-top: 10px;
  padding-right: 10px;
  cursor: pointer;
}
.modal-body {
  max-height: 50vh;
  overflow-y: auto;
  margin-bottom: 20px;
}
.course-time {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}
.course-info {
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}
.date-prop {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.7);
  padding-top: 5px;
}
.flex-wrapper {
  display: flex;
  justify-content: flex-end;
}
.cancel-button {
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  text-align: center;
  color: #0b3c61;
}
.cancel-button:hover {
  color: #0b3c61;
}

input[type='radio'] {
  border: 1px solid #0b3c61;
  box-sizing: border-box;
}
.radio input[type='radio'],
.radio-inline input[type='radio'] {
  margin-top: 20px;
}
.date-border {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 5px;
}
.selected-slot {
  border: 3px solid #4c9e45;
}
@media screen and (max-width: 1024px) {
  .flex-wrapper {
    padding-right: 15px;
  }
  .w-180 {
    width: 170px;
  }
}
.default-label {
  font-size: 20px;
  line-height: 17px;
}

.modal {
  padding-right: 0px !important;
}

.radio {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
}
.radio__input {
  display: none;
}
.radio__radio {
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #0b3c61;
  border-radius: 50%;
  margin-right: 10px;
  box-sizing: border-box;
  padding: 2px;
  transition: transform 0.15s;
}
.radio__radio::after {
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  background: #0b3c61;
  border-radius: 50%;
  transform: scale(0);
}
.radio__input:checked + .radio__radio::after {
  transform: scale(1);
}
</style>
