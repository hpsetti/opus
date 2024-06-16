<template>
  <div id="training-selection-modal" class="modal" role="dialog">
    <div class="modal-dialog modal-lg request-modal">
      <!-- Modal content-->
      <div class="modal-content col-xs-12 p-20">
        <div class="modal-header" v-if="courseDetails">
          <div class="col-xs-12 p-0 text-start header">
            <img
              src="/static/images/icons/lms/info-modal-training-icon.svg"
              class="lms-training-icon"
            />
            {{ courseDetails.title }}
            <img
              src="/static/images/icons/close_icon.svg"
              class="close-icon"
              @click="closeModal"
            />
          </div>
        </div>
        <div class="modal-body">
          <div class="text-h5 blue-1">
            <img
              v-if="steps[step].back"
              @click="updateStep(true)"
              class="preview-svg cursor-pointer"
              src="/static/images/icons/chevron_left_blue_2.svg"
              alt=""
            />
            <span>{{ steps[step].title }}</span>
          </div>
          <div class="text-regular-small black-5 mb-20 card-left-spacing">
            <span>{{ steps[step].desc }}</span>
          </div>
          <div
            class="d-flex justify-content-center col-gap-35"
            v-if="step === 'type'"
          >
            <CourseSelectionCard
              type="live"
              :price="399"
              has-shadow
              :selected="selectedOption === 'live'"
              @selected="setSelected"
            ></CourseSelectionCard>
            <CourseSelectionCard
              type="prerec"
              :price="199"
              has-shadow
              :selected="selectedOption === 'prerec'"
              @selected="setSelected"
            ></CourseSelectionCard>
            <CourseSelectionCard
              type="bundle"
              :price="499"
              has-shadow
              :selected="selectedOption === 'bundle'"
              @selected="setSelected"
            ></CourseSelectionCard>
          </div>
          <div v-else-if="step === 'time'" class="card-left-spacing">
            <div
              class="row col-xs-12"
              v-for="(timeSlot, index) in availableTimeSlots"
              :key="index"
            >
              <div
                class="col-xs-12 p-0 slot-card mb-15"
                :class="{
                  'selected-slot': selectedSlotId === timeSlot.slot_id
                }"
              >
                <label class="radio">
                  <input
                    type="radio"
                    class="radio__input"
                    :value="timeSlot.slot_id"
                    v-model="selectedSlotId"
                  />
                  <div class="radio__radio"></div>
                  <div class="pl-20">
                    <div>{{ getSlotDate(timeSlot) }}</div>
                    <div>{{ getSlotTimeRange(timeSlot) }}</div>
                  </div>
                </label>
              </div>
            </div>
            <div
              class="col-xs-12 no-data-text text-center font-18 fw-700"
              v-if="!availableTimeSlots.length && !this.loaderStatus"
            >
              More dates coming soon
            </div>
          </div>
          <div v-else class="card-left-spacing">
            <div class="course-review mb-15">
              <div
                v-for="item in Object.keys(review)"
                :key="item"
                class="row m-0 mb-20"
              >
                <div class="text-button-label black-3 col-xs-3 p-0">
                  {{ `${item}:` }}
                </div>
                <div
                  class="text-button-label blue-1 col-xs-9 p-0"
                  v-html="review[item]"
                ></div>
              </div>
            </div>
            <div
              class="text-body-light black-2"
              v-if="steps[step].footer"
              v-html="steps[step].footer[selectedOption]"
            ></div>
          </div>
        </div>
        <hr />
        <div class="footer col-xs-12 p-0 flex-wrapper">
          <BaseButton
            @click="updateStep(true)"
            variant="secondary"
            v-if="steps[step].back"
            class="margin-right-auto"
          >
            Back
          </BaseButton>
          <BaseButton @click="closeModal" variant="secondary">
            Cancel
          </BaseButton>
          <!-- <BaseButton class="br-20 ml-20" :disabled="eventsNone" @click="addCartOrUpdateSlot">
            {{ operations.type === 'select' ? 'Add to cart' : 'Update Slot' }}
          </BaseButton> -->
          <BaseButton
            class="br-20 ml-20"
            :disabled="!isNextEnabled"
            @click="updateStep(false)"
            >{{ steps[this.step].btnTitle }}</BaseButton
          >
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
import {
  getTimeSlotByCourseIdForUser,
  updateTimeSlot
} from '../../apis/instructorLedTraining';
import BaseButton from '../UIComponents/BaseButton.vue';
import EventBus from '../../utils/event-bus';
import CourseSelectionCard from './CourseSelectionCard.vue';
import { getSlotDate, getSlotTimeRange } from '../../utils/common';

export default {
  props: ['listView', 'timeSlotsList', 'userId', 'operations'],

  data() {
    return {
      courseDetails: {},
      loaderStatus: false,
      selectedSlotId: null,
      availableTimeSlots: [],
      options: ['live', 'prerec', 'bundle'],
      steps: {
        type: {
          title: 'Select your course method',
          desc: 'Select a course method from the available list below. Once you complete the course selection flow and click on Add to cart, you will be redirected to the marketplace to complete your purchase',
          btnTitle: 'Next',
          back: false
        },
        time: {
          title: 'Select your live course time',
          desc: 'Select a course time from the available list below.',
          btnTitle: 'Select time',
          back: true
        },
        review: {
          title: 'Review your selection',
          desc: 'Review your course method and ensure that all details are correct.',
          footer: {
            live: 'If any issues or scheduling conflicts arise, feel free to contact our team anytime. You can also change the date and time of your course after purchasing by visiting the course details page.',
            prerec:
              'Note: Purchasing this course will allow you to watch the full recording until 60 days.',
            bundle:
              'If any issues or scheduling conflicts arise, feel free to contact our team anytime. You can also change the date and time of your course after purchasing by visiting the course details page. <br> Note: Purchasing this course will allow you to watch the full recording until 60 days.'
          },
          btnTitle: 'Add to cart',
          back: true
        }
      },
      step: 'type',
      selectedOption: null,
      review: {
        'Course method': null,
        Date: 'N/A',
        Time: 'N/A',
        Location: null,
        Price: null
      }
    };
  },

  components: {
    Loader,
    BaseButton,
    CourseSelectionCard
  },

  computed: {
    isNextEnabled() {
      if (this.step === 'type' && this.selectedOption) return true;
      if (this.step === 'time' && this.selectedSlotId) return true;
      if (this.step === 'review') return true;
      // if (this.operations.type === 'select') return !this.selectedSlotId;
      // return this.selectedSlotId === this.operations.selectedSlotId;
      return false;
    }
  },

  watch: {
    // courseDetails() {
    //   if (this.listView && this.courseDetails) {
    //     this.getTimeSlotsList();
    //   }
    // },
    operations: {
      handler(operations) {
        if (operations.type === 'select') {
          this.setCourseDetails();
        } else if (operations.type === 'edit') {
          this.setSelectedDetails();
        }
      },
      deep: true
    },
    timeSlotsList(newValue) {
      if (newValue) {
        this.availableTimeSlots = newValue;
      }
    }
  },

  methods: {
    getSlotDate,
    getSlotTimeRange,
    setSelected(type) {
      this.selectedOption = type;
    },
    async getTimeSlotsList() {
      this.loaderStatus = true;
      const availableApiTimeSlots = await getTimeSlotByCourseIdForUser(
        this.courseDetails.course_id
      );
      this.availableTimeSlots =
        availableApiTimeSlots?.length > 4
          ? availableApiTimeSlots.slice(0, 4)
          : availableApiTimeSlots;
      this.loaderStatus = false;
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
      this.selectedOption = null;
      this.step = 'type';
      if (this.listView) this.availableTimeSlots = [];
      $('#training-selection-modal').modal('hide');
    },
    // TODO Optimize this method
    updateStep(back = false) {
      if (back) {
        if (this.step === 'time') {
          this.step = 'type';
          this.clearTimeSelection();
          return;
        }
        if (this.step === 'review' && this.selectedOption === 'prerec') {
          this.step = 'type';
        } else {
          this.step = 'time';
        }
      } else {
        if (this.step === 'time') {
          this.step = 'review';
          this.populateReview();
          return;
        }
        if (this.selectedOption === 'prerec' && this.step === 'type') {
          this.step = 'review';
          this.populateReview();
        } else {
          this.step = 'time';
        }
        if (this.step === 'review') {
          this.addCartOrUpdateSlot();
        }
      }
    },
    clearTimeSelection() {
      this.selectedSlotId = null;
    },
    populateReview() {
      const slot = this.availableTimeSlots.find(
        (s) => s.slot_id === this.selectedSlotId
      );
      if (this.selectedOption === 'prerec') {
        this.review['Course method'] = 'Pre-recorded Course';
        this.review.Date = 'N/A';
        this.review.Time = 'N/A';
        this.review.Location = 'Video file link - OPUS Training Library';
        this.review.Price = '$399';
      } else if (this.selectedOption === 'live') {
        this.review['Course method'] = 'Instructor-Led Training';
        this.review.Date = this.getSlotDate(slot);
        this.review.Time = this.getSlotTimeRange(slot);
        this.review.Location = 'Online - Microsoft Teams Meeting';
        this.review.Price = '$399';
      } else if (this.selectedOption === 'bundle') {
        this.review['Course method'] =
          'Bundle: Instructor-Led Training and Pre-recorded Course';
        this.review.Date = this.getSlotDate(slot);
        this.review.Time = this.getSlotTimeRange(slot);
        this.review.Location =
          'Online - Microsoft Teams Meeting <br> Video file link - OPUS Trainings Library';
        this.review.Price = '$499';
      }
    },
    async addCartOrUpdateSlot() {
      if (this.operations.type === 'select') {
        const body = {
          user_id: this.userId,
          plan_id: this.courseDetails.plan_id,
          ilt_slot_id: this.selectedSlotId
        };
        this.loaderStatus = true;
        const res = await addToCart(body);
        this.loaderStatus = false;
        if (res.data && res.data.status_code === 200) {
          this.closeModal();
          const cartInfo = {
            type: 'add',
            body: ''
          };
          this.$emit('setCartInfo', {
            cartInfo,
            item: this.courseDetails
          });
          this.emitter.emit('cart-items-updated');
        }
      } else if (this.operations.type === 'edit') {
        this.loaderStatus = true;
        const body = {
          cart_id: this.courseDetails.cart_status.cart_id,
          course_id: this.courseDetails.course_id,
          new_slot_id: this.selectedSlotId,
          user_id: this.userId
        };
        const response = await updateTimeSlot(body);
        this.loaderStatus = false;
        this.$emit('refreshAllInfo', response);
      }
    }
  }
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
  margin: 15px 15px 15px 10px;
  padding: 0;
}
.modal-body .card-left-spacing {
  margin-left: 34px;
}
/* .course-time {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
} */
/* .course-info {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
} */
.course-review {
  padding: 16px 0 0 24px;
  border: 1px solid #d3d6d9;
  border-radius: 5px;
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
