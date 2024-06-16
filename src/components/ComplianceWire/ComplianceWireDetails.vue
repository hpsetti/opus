<template>
  <div class="content-wrappper p-20">
    <div class="col-xs-12">
      <div class="row fixed-nav-bar">
        <div class="col-xs-12 p-0 font-18">
          <div class="col-xs-12 col-sm-8 p-0">
            <div class="col-xs-1 width-auto p-0 cursor-pointer" @click="navigateToTrainingPage">
              <img class="back-img" src="/static/images/icons/chevron_left_icon.svg" alt="" />
            </div>
            <div class="col-xs-11 p-0 cursor-pointer ml-10 text-subtitle-2 blue-1" @click="navigateToTrainingPage">
              ComplianceWire® Catalog
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-6 col-sm-8 col-md-9 mb-40">
      <div class="schedule-title col-xs-12 p-0">
        {{ courseDetails.title }}
      </div>
      <div class="title_desc col-xs-12 mb-20 fw-300">
        {{ courseDetails.description }}
      </div>
      <div class="about col-xs-12 p-0">
        <div class="about-title col-xs-12 p-0 mb-20">
          About this course
        </div>
        <div class="about-content col-xs-12 mb-20">
          {{ courseDetails.aboutheader }}
        </div>
      </div>
      <div class="about col-xs-12 p-0">
        <div class="about-title col-xs-12 p-0 mb-20">
          Course topics
        </div>
        <div class="about-content col-xs-12 mb-20" v-if="courseDetails.course_topics">
          <ul class="about-list mb-20">
            <li class="" v-for="(aboutItem, index) in courseDetails.course_topics" :key="index">
              {{ aboutItem }}
            </li>
          </ul>
        </div>
        <div class="about-content col-xs-12 mb-20">
          {{ courseDetails.about_footer }}
        </div>
      </div>
    </div>
    <div class="col-xs-6 col-sm-4 col-md-3 course-info" v-if="Object.keys(courseDetails).length">
      <div class="webinar-img-size">
        <img class="" :src="getImageUrl(courseDetails.large_icon_url)" alt="" />
      </div>
      <div class="webinar-title mt-10">{{ courseDetails.title }}</div>
      <div class="col-xs-12 p-0">
        <!-- User is not enrolled to any course variant -->
        <div>
          <div>
            <div class="text-body-2 text-secondary mt-10">
              <img src="/static/images/icons/ilt/live-icon.svg" class="preview-svg"/>
              <span class="ml-5">Online training course</span>
            </div>
            <hr class="m-0 black-4 mt-10 mb-10"/>
            <div v-if="!courseDetails.booked_time_slot">
              <div class="col-xs-12 p-0" v-if="timeSlotsList.length > 0">
                <div class="col-xs-12 p-0 mb-15 d-flex align-items-center" v-for="(timeSlot, index) in timeSlotsList" :key="index">
                  <span class="ml-30">
                    <img class="preview-svg" src="/static/images/icons/calendar.svg" alt="" />
                  </span>
                  <div class="">
                    <div class="fw-300 font-14">
                      {{ getDateList(timeSlot) }}
                    </div>
                    <div class="fw-300 font-14">
                      {{ gettimeList(timeSlot) }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 p-0 no-data-text text-center mb-10 fw-700" v-else>
                More dates coming soon
              </div>
            </div>
            <div v-else>
              <div class="">
                <div class="col-xs-12 p-0 mb-15 d-flex align-items-center">
                  <span class="ml-30">
                    <img class="preview-svg" src="/static/images/icons/calendar.svg" alt="" />
                  </span>
                  <div class="">
                    <div class="fw-300 font-14">
                      {{ getDateSlotFromTraining(courseDetails) }}
                    </div>
                    <div class="fw-300 font-14">
                      {{ getTimeSlotFromTraining(courseDetails) }}
                    </div>
                  </div>
                </div>
                <!-- <a
                  class="col-xs-12 cursor-pointer d-flex p-0 ml-30 mb-15"
                  @click.prevent="changeSelectedDate"
                >
                  <img src="/static/images/icons/edit_blue.svg" alt="Edit Booked Time Slot" class="preview-svg"/>
                  <span class="text-subtitle-1 blue-3">Change date</span>
                </a> -->
              </div>
            </div>
          </div>
          <div class="col-xs-12 mt-20 p-0" v-if="courseDetails.course_status !== 'Enrolled'">
            <BaseButton
              class="mb-15 full-width"
              :class="{
                'primary': courseDetails.cart_status.purchase_status === 'ADD_TO_CART',
                'secondary': courseDetails.cart_status.purchase_status === 'REMOVE_FROM_CART',
              }"
              @click="addRemoveCart"
              has-icon
            >
              <img src="/static/images/newMarketplace/trash.svg" class="course-action-icon" v-if="courseDetails.cart_status.purchase_status === 'REMOVE_FROM_CART'" alt="" />
              {{ cartStatus[courseDetails.cart_status.purchase_status] }}
            </BaseButton>
          </div>
        </div>
        <!-- <div class="col-xs-12 text-regular-xsmall text-secondary mb-30" v-if="isLive && !hasEnrolled">
          After signing up, you will receive a meeting invite from the instructor.
        </div> -->
      </div>
      <!-- Show bookmark for not enrolled or contact us link for enrolled/partially enrolled -->
      <div class="col-xs-12 p-0">
        <div class="text-subtitle-2 text-secondary">Save for later?</div>
        <hr class="m-0 black-4 mt-10 mb-10"/>
        <div v-if="!hasEnrolled">
          <span class="col-xs-12 text-regular-small text-secondary mb-10">Bookmark this course to receive an email the next time it's offered.</span>
          <div class="col-xs-12 mt-10 p-0">
            <BaseButton @click="addToBookmark" variant="secondary" class="full-width">
              Bookmark
            </BaseButton>
          </div>
        </div>
        <div v-else>
          <span class="col-xs-12 text-regular-small text-secondary mb-10">Contact us for more information.</span>
          <div class="col-xs-12 mt-10 p-0">
            <BaseButton @click="openContactUs" variant="secondary" class="full-width">
              Contact us
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <training-sign-up-modal :operations="operations" :courseDetails="courseDetails" :userId="userId" :timeSlotsList="timeSlotsList" @refreshAllInfo="refreshInfo" @setCartInfo="setCartInfo($event, 'ilt')"></training-sign-up-modal>
    <TrainingSelectionModal :operations="operations" :courseDetails="courseDetails" :userId="userId" :timeSlotsList="timeSlotsList" @refreshAllInfo="refreshInfo" @setCartInfo="setCartInfo($event, 'ilt')"></TrainingSelectionModal>
    <add-remove-cart-popup @closeAddRemoveCart="closeAddRemoveCart(true)" :cartInfo="cartInfo" @removeFromCart="removeFromCart('ilt')"></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import { cartStatus } from '../../utils/constants';
import { getComplianceWireDetails, addToBookmark } from '../../apis/complianceWire';
import TrainingSignUpModal from './TrainingSignUpModal.vue';
import TrainingSelectionModal from './ComplianceTrainingSelectionModal.vue';
import Loader from '../UIComponents/Loader.vue';
import cartMixin from '../NewMarketPlace/Mixins/shared';
import { addToCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';
import BaseButton from '../UIComponents/BaseButton.vue';
// import { getSlotDate, getSlotTimeRange } from '../../utils/common';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';

export default {
  props: ['userId'],
  mixins: [cartMixin],
  components: {
    Loader,
    BaseButton,
    AddRemoveCartPopup,
    TrainingSignUpModal,
    TrainingSelectionModal,
  },
  data() {
    return {
      cartInfo: {},
      loaderStatus: false,
      courseId: null,
      cartStatus: {},
      operations: {
        type: 'select',
        listView: false,
        courseDetails: null,
        timeSlotsList: null,
        selectedSlotId: null,
      },
      courseDetails: {},
      timeSlotsList: [],
    };
  },
  computed: {
    hasEnrolled() {
      return this.courseDetails.course_status === 'Enrolled';
    },
  },
  async created() {
    await this.fetchCourseDetails();
    this.cartStatus = cartStatus;
    this.courseId = this.courseDetails.course_id;
  },
  methods: {
    async fetchCourseDetails() {
      await this.getCourseDetails();
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
    getTimeSlotFromTraining(training) {
      if (training.booked_time_slot) {
        return this.timeConvert(training.booked_time_slot);
      }
      if (training.all_available_time_slots) {
        return this.timeConvert(training.all_available_time_slots);
      }
      return 'More dates coming soon';
    },
    getDateSlotFromTraining(training) {
      if (training.booked_time_slot) {
        return this.dateConvert(training.booked_time_slot);
      }
      if (training.all_available_time_slots) {
        return this.timeConvert(training.all_available_time_slots);
      }
      return 'More dates coming soon';
    },
    async refreshInfo(courseDetails) {
      $('#compliance-signup-modal').modal('hide');
      this.courseDetails = courseDetails;
      await this.getCourseDetails();
    },
    async addToBookmark() {
      this.loaderStatus = true;
      const response = await addToBookmark(this.courseId);
      this.loaderStatus = false;
      if (response.status_code === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: `${response.data}`,
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: `${response.message}`,
        });
      }
    },
    openContactUs(referrer = '') {
      this.$router.push({ name: 'ContactUs', params: { referrer } });
    },
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    async addRemoveCart() {
      const { purchase_status: purchaseStatus } = this.courseDetails.cart_status || {};
      if (purchaseStatus === 'ADD_TO_CART') {
        this.operations = {
          ...this.operations,
          timeSlotsList: this.timeSlotsList,
          type: 'select',
          courseDetails: this.courseDetails,
        };
        $('#compliance-signup-modal').modal({
          backdrop: 'static',
          keyboard: false,
        });
      } else if (purchaseStatus === 'ADD_TO_CART' && this.courseDetails.training_type === 'Pre-recorded course') {
        this.loaderStatus = true;
        const body = {
          user_id: this.userId,
          plan_id: this.planId,
        };
        const res = await addToCart(body);
        this.loaderStatus = false;
        if (res.data && res.data.status_code === 200) {
          const cartInfo = {
            type: 'add',
            body: '',
          };
          this.$emit('setCartInfo', {
            cartInfo,
            // item: this.trainingDetails[this.trainingDetails.plan_type],
            item: this.courseDetails,
          });
          this.emitter.emit('cart-items-updated');
          await this.fetchCourseDetails();
        }
      } else if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?',
        };
        this.setCartInfo(
          {
            cartInfo,
            item: this.courseDetails,
          },
          'ilt',
          false,
        );
      }
    },
    async getCourseDetails() {
      this.loaderStatus = true;
      const complianceDetails = await getComplianceWireDetails(this.planId, this.userId);
      [this.courseDetails] = complianceDetails;
      const availableSlots = this.courseDetails.all_available_time_slots;
      this.timeSlotsList = availableSlots.length > 4 ? availableSlots.slice(0, 4) : availableSlots;
      this.loaderStatus = false;
    },
    navigateToTrainingPage() {
      this.$router.push('/compliancewire-marketplace');
    },
  },
};
</script>

<style scoped>
.fixed-nav-bar {
  background: #ffffff;
  padding: 10px 10px 10px 0px;
}

.flex-center {
  display: flex;
}

.tags {
  margin-right: 10px;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.title_desc {
  color: rgba(0, 0, 0, 0.7);
}

.title_desc, .course-list li, .instructor-desc, .about-list li, .about-content{
  text-align:justify;
}

.gray-out {
  opacity: 0.5;
  pointer-events: none;
}

.whitePaperName {
  display: inline-block;
}
.width-auto {
  width: auto;
}
.mb-40 {
  margin-bottom: 40px;
}
.schedule-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 32px;
  line-height: 44px;
  color: #0b3c61;
}
.back-img {
  width: 18px;
  height: 18px;
}
.margin-tags {
  margin-top: 10px;
  margin-bottom: 20px;
}
.human-factors {
  background-color: #4c9e45;
}
.ui-design {
  background-color: #007584;
}
.users {
  background-color: #ffc62f;
}
.about-title,
.course-title,
.meeting-title,
.related-course-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
  padding-bottom: 5px;
  border-bottom: 0.5px solid #bdbdbd;
}
.about-content,
.course-content,
.meeting-content,
.related-course-content {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
  padding-left: 15px;
}
.about-list,
.course-list {
  margin-left: 15px;
}
.meeting-list {
  list-style-type: none;
}
.meeting-content li:not(:first-child) {
  margin-top: 30px;
}
.meeting-content li:last-child {
  margin-bottom: 0px;
}
.meeting-img-size {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.meeting-name {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.7);
}
.meeting-position {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.7);
}
.related-course-name {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.related-course-heading {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  color: #0b3c61;
}
.training-img {
  width: 290px;
  height: 168px;
  border-radius: 5px;
}
.course-info {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 15px 20px 30px 20px;
}

.webinar-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 27px;
  color: #0b3c61;
}

.location-img-size {
  width: 15px;
  height: 22px;
}
.price-image-size {
  width: 20px;
  height: 20px;
}
.date-info {
  width: 18px;
  height: 20px;
}
.course-times-title,
.bookmark-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  border-bottom: 1px solid #d3d6d9;
}

.course-time-desc {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}

.w-100p {
  width: 100%;
}

.webinar-img-size img {
  width: 100%;
}

.course-action{
  box-shadow:4px 4px 10px rgba(0, 0, 0, 0.25)
}
.course-action-icon{
  margin-top:-3px;
}
.prerec-content {
  margin-left: 37px;
}
</style>
