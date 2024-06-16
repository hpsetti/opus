<template>
  <div class="content-wrappper p-20">
    <div class="col-xs-12">
      <div class="row fixed-nav-bar">
        <div class="col-xs-12 p-0 font-18">
          <div class="col-xs-12 col-sm-8 p-0">
            <div
              class="col-xs-1 width-auto p-0 cursor-pointer"
              @click="navigateToTrainingPage"
            >
              <img
                class="back-img"
                src="/static/images/icons/chevron_left_icon.svg"
                alt=""
              />
            </div>
            <div
              class="col-xs-11 whitePaperName p-0 cursor-pointer ml-10"
              @click="navigateToTrainingPage"
            >
              Training Catalog
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-xs-6 col-sm-8 col-md-9 mb-40"
      v-if="Object.keys(courseDetails).length"
    >
      <div class="schedule-title col-xs-12 p-0">
        {{ courseDetails.title }}
      </div>
      <div v-if="courseDetails.tags.length" class="col-xs-12 mt-10 mb-20">
        <span
          class="mr-10 tags mt-10 mr-10"
          v-for="(tag, index) in courseDetails.tags"
          :key="index"
          :style="{ background: tag.color, color: 'rgba(0, 0, 0, 0.7)' }"
          >{{ tag.tag_name }}</span
        >
      </div>
      <div class="title_desc col-xs-12 mb-20 fw-300">
        {{ courseDetails.title_desc }}
      </div>
      <div
        v-if="
          hasBundleOption &&
          courseDetails.course_status === 'Not Enrolled' &&
          courseDetails.purchase_options
        "
      >
        <div class="about-title col-xs-12 p-0 mb-20">
          {{ courseDetails.purchase_options.title }}
        </div>
        <div
          class="d-flex col-gap-35 col-xs-12 mb-20 p-0 pl-10 flex-wrap row-gap-10"
        >
          <CourseSelectionCard
            type="live"
            :price="courseDetails.purchase_options.live"
          ></CourseSelectionCard>
          <CourseSelectionCard
            type="prerec"
            :price="courseDetails.purchase_options.prerec"
          ></CourseSelectionCard>
          <CourseSelectionCard
            type="bundle"
            :price="courseDetails.purchase_options.bundle"
          ></CourseSelectionCard>
        </div>
      </div>
      <div class="about col-xs-12 p-0">
        <div class="about-title col-xs-12 p-0 mb-20">
          {{ courseDetails.about.title }}
        </div>
        <div class="about-content col-xs-12 mb-20">
          {{ courseDetails.about.about_header }}
        </div>
        <div
          class="about-content col-xs-12 mb-20"
          v-if="courseDetails.about.list.length"
        >
          <ul class="about-list mb-20">
            <li
              class=""
              v-for="(aboutItem, index) in courseDetails.about.list"
              :key="index"
            >
              {{ aboutItem }}
            </li>
          </ul>
        </div>
        <div class="about-content col-xs-12 mb-20">
          {{ courseDetails.about.about_footer }}
        </div>
      </div>
      <div class="course col-xs-12 p-0" v-if="courseDetails.course.list">
        <div class="course-title col-xs-12 mb-20 p-0">
          {{ courseDetails.course.title }}
        </div>
        <div class="course-content col-xs-12 mb-20">
          <ul class="course-list">
            <li
              class=""
              v-for="(courseItem, index) in courseDetails.course.list"
              :key="index"
            >
              {{ courseItem }}
            </li>
          </ul>
        </div>
      </div>
      <div class="meeting col-xs-12 p-0">
        <div class="meeting-title p-0 mb-20 col-xs-12">
          {{ courseDetails.meeting.title }}
        </div>
        <div class="meeting-content col-xs-12">
          <ul class="meeting-list">
            <li
              class="mb-10 col-xs-12 p-0"
              v-for="(meetingItem, index) in courseDetails.meeting.list"
              :key="index"
            >
              <div class="instructor-info col-xs-12 p-0">
                <div class="col-xs-12 pl-0 flex-center mb-5">
                  <img
                    class="meeting-img-size"
                    :src="`/static/images/instructors/${meetingItem.name}.png`"
                    alt=""
                  />
                  <div class="pl-20">
                    <div class="meeting-name">{{ meetingItem.name }}</div>
                    <div class="meeting-position">
                      {{ meetingItem.position }}
                    </div>
                  </div>
                </div>
                <div class="col-xs-11 pl-0 font-14 instructor-desc">
                  {{ meetingItem.description }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Related Resources -->
      <div
        class="related_course col-xs-12 p-0"
        v-if="courseDetails.related_course"
      >
        <div class="related-course-title col-xs-12 mt-20 pl-0">
          {{ courseDetails.related_course.title }}
        </div>
        <div class="col-xs-12 d-flex col-gap-50">
          <div
            class="col-xs-4 px-0 mt-20"
            v-for="(relatedItem, index) in courseDetails.related_course.list"
            :key="index"
          >
            <img
              class="training-img"
              :src="getImageUrl(relatedItem.large_image)"
              alt=""
            />
            <div class="related-course-name mb-5">{{ relatedItem.name }}</div>
            <div
              class="cursor-pointer related-course-heading mb-15"
              @click="
                goToRelatedCourse(
                  relatedItem.plan_id,
                  relatedItem.course_id,
                  relatedItem.title
                )
              "
            >
              {{ relatedItem.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Sidebar Content -->
    <div
      class="col-xs-6 col-sm-4 col-md-3 course-info"
      v-if="Object.keys(courseDetails).length"
    >
      <div class="webinar-img-size">
        <img
          class=""
          :src="getImageUrl(courseDetails.blob_course_icon_url_large)"
          alt=""
        />
      </div>
      <div class="webinar-title mt-10">{{ courseDetails.title }}</div>
      <!-- <div class="d-flex mt-15" v-if="courseDetails.training_type === 'Instructor Led'">
        <div class="col-xs-6 font-14 fw-300">
          <img class="location-img-size" src="/static/images/icons/location.svg" alt="" />
          <span class="pl-10 title_desc">{{ courseDetails.training_location }}</span>
        </div>
        <div class="col-xs-6">
          <img class="price-img-size" src="/static/images/icons/label_price.svg" alt="" />
          <span class="title_desc fw-300 pl-10">${{ courseDetails.price }}</span>
        </div>
      </div> -->
      <div class="col-xs-12 p-0">
        <!-- User is enrolled to one or more course methods -->
        <!-- <div v-if="hasEnrolled">
          <div v-if="hasEnrolledForLive">
            <div class="text-body-2 text-secondary mt-10">
              <img src="/static/images/icons/ilt/live-icon.svg" class="preview-svg"/>
              <span class="ml-10">{{ hasEnrolledForLive ? 'Live course time' : 'Available live course times' }}</span>
            </div>
            <hr class="m-0 black-4 mt-10 mb-10"/>
            <div class="col-xs-12 p-0">
              <div class="col-xs-12 p-0 mb-15 d-flex align-items-center">
                <span class="mr-20">
                  <img class="date-info" src="/static/images/icons/calendar.svg" alt="" />
                </span>
                <div class="col-xs-10">
                  <div class="fw-300 font-14">
                    {{ getSlotDate(courseDetails.booked_slot) }}
                  </div>
                  <div class="fw-300 font-12">
                    {{ getSlotTimeRange(courseDetails.booked_slot) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="hasEnrolledForPrerec">

          </div>
        </div> -->
        <!-- User is not enrolled to any course variant -->
        <div>
          <div v-if="isLive">
            <div class="text-body-2 text-secondary mt-10">
              <img
                src="/static/images/icons/ilt/live-icon.svg"
                class="preview-svg"
              />
              <span class="ml-5">{{
                courseDetails.booked_slot
                  ? 'Live course time'
                  : 'Available live course times'
              }}</span>
            </div>
            <hr class="m-0 black-4 mt-10 mb-10" />
            <div v-if="!courseDetails.booked_slot">
              <div class="col-xs-12 p-0" v-if="timeSlotsList.length > 0">
                <div
                  class="col-xs-12 p-0 mb-15 d-flex align-items-center"
                  v-for="(timeSlot, index) in timeSlotsList"
                  :key="index"
                >
                  <span class="ml-30">
                    <img
                      class="preview-svg"
                      src="/static/images/icons/calendar.svg"
                      alt=""
                    />
                  </span>
                  <div class="">
                    <div class="fw-300 font-14">
                      {{ getSlotDate(timeSlot) }}
                    </div>
                    <div class="fw-300 font-12">
                      {{ getSlotTimeRange(timeSlot) }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-xs-12 p-0 no-data-text text-center mb-10 fw-700"
                v-else
              >
                More dates coming soon
              </div>
            </div>
            <div v-else>
              <div class="">
                <div class="col-xs-12 p-0 mb-15 d-flex align-items-center">
                  <span class="ml-30">
                    <img
                      class="preview-svg"
                      src="/static/images/icons/calendar.svg"
                      alt=""
                    />
                  </span>
                  <div class="">
                    <div class="fw-300 font-14">
                      {{ getSlotDate(courseDetails.booked_slot) }}
                    </div>
                    <div class="fw-300 font-12">
                      {{ getSlotTimeRange(courseDetails.booked_slot) }}
                    </div>
                  </div>
                </div>
                <a
                  class="col-xs-12 cursor-pointer d-flex p-0 ml-30 mb-15"
                  :class="{
                    'gray-out':
                      eventsNone ||
                      !courseDetails.booked_slot ||
                      timeSlotsList.length <= 1
                  }"
                  @click.prevent="changeSelectedDate"
                >
                  <img
                    src="/static/images/icons/edit_blue.svg"
                    alt="Edit Booked Time Slot"
                    class="preview-svg"
                  />
                  <span class="text-subtitle-1 blue-3">Change date</span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-xs-12 p-0" v-else-if="isPrerec">
            <div class="text-body-2 text-secondary mt-10">
              <img
                src="/static/images/icons/ilt/pre-recorded-icon.svg"
                class="preview-svg"
              />
              <span class="ml-5">Pre-recorded training course</span>
            </div>
            <hr class="m-0 black-4 mt-10 mb-10" />
            <div class="prerec-content">
              <p class="text-regular-xsmall m-0 text-italic">
                {{ courseDetails.duration }} hour recording
              </p>
              <div v-if="!hasEnrolledForPrerec">
                <p
                  class="text-regular-xsmall m-0 text-italic mt-10"
                >
                  Access for <span class="text-bold">365</span> days
                </p>
              </div>
              <div v-else>
                <div class="white-space black-2 pt-5">
                <div
                  class="pl-15 pb-15 pt-10"
                  v-if="courseDetails.expiry_days > 90"
                >
                  <p class="text-regular-large">
                    Expires:
                    {{ courseDetails.expiry_days }} days
                  </p>
                </div>
                <div
                  class="pl-15 pb-15 pt-10"
                  v-else-if="
                    courseDetails.expiry_days <= 90 &&
                    courseDetails.expiry_days > 10
                  "
                >
                  <p class="text-regular-large orange-bg2 expiry-box">
                    Expires: {{ courseDetails.expiry_days }} days
                  </p>
                </div>
                <div class="pl-15 pb-15 pt-10" v-else-if="courseDetails.expiry_days <= 10 && courseDetails.expiry_days > 1">
                  <p class="text-regular-large red-bg1 expiry-box white-1">
                    Expires: {{ courseDetails.expiry_days }} days
                  </p>
                </div>
                <div class="pr-15 pb-15" v-else-if="courseDetails.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ courseDetails.expiry_days }} day</p>
          </div>
              </div>
              </div>
              
            </div>
            <!-- <div class="mt-10 d-flex flex-direction-column row-gap-10">
              <div>
              <img src="/static/images/icons/ilt/pre-recorded-icon.svg" class="preview-svg"/>
              <p class="text-body-2 text-secondary m-0">Pre-recorded training course</p>
              <hr class="m-0 black-4 mt-10 mb-10"/>
              </div>
              <div>
                <p class="text-regular-xsmall m-0 text-italic">{{ courseDetails.duration }} hour recording</p>
                <p class="text-regular-xsmall m-0 text-italic mt-10" v-if="!hasEnrolledForPrerec">Access for <span class="text-bold">60</span> days</p>
                <p class="text-regular-xsmall m-0 text-italic mt-10" v-else>Video available for <span class="text-bold">36</span> more days</p>
              </div>
            </div> -->
          </div>
          <div class="col-xs-12 p-0" v-else>
            <div class="mt-10 d-flex col-gap-10">
              <img
                src="/static/images/icons/ilt/bundle-icon.svg"
                class="preview-svg"
              />
              <div>
                <p class="text-body-2 text-secondary m-0">Training Bundle</p>
                <p class="text-regular-xsmall m-0 text-italic">
                  Pre-recorded course & live webinar
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 mt-20 p-0"
            v-if="courseDetails.course_status !== 'Enrolled'"
          >
            <BaseButton
              class="mb-15 full-width"
              :class="{
                primary:
                  courseDetails.cart_status.purchase_status === 'ADD_TO_CART',
                secondary:
                  courseDetails.cart_status.purchase_status ===
                  'REMOVE_FROM_CART',
                tertiary:
                  courseDetails.cart_status.purchase_status === 'GO_TO_CART'
              }"
              :disabled="eventsNone"
              @click="addRemoveCart"
              has-icon
            >
              <img
                src="/static/images/newMarketplace/trash.svg"
                class="course-action-icon"
                v-if="
                  courseDetails.cart_status.purchase_status ===
                  'REMOVE_FROM_CART'
                "
                alt=""
              />
              <img
                src="/static/images/newMarketplace/goto_arrow.svg"
                class="course-action-icon pr-10"
                v-if="
                  courseDetails.cart_status.purchase_status === 'GO_TO_CART'
                "
                alt=""
              />
              <span
                v-if="
                  isLive &&
                  courseDetails.cart_status.purchase_status === 'ADD_TO_CART'
                "
                >Sign Up</span
              >
              <span v-else>{{
                cartStatus[courseDetails.cart_status.purchase_status]
              }}</span>
            </BaseButton>
          </div>
        </div>
        <div
          class="col-xs-12 text-regular-xsmall text-secondary mb-30"
          v-if="isLive && !hasEnrolled"
        >
          After signing up, you will receive a meeting invite from the
          instructor.
        </div>
      </div>
      <!-- Show bookmark for not enrolled or contact us link for enrolled/partially enrolled -->
      <div class="col-xs-12 p-0">
        <div class="text-subtitle-2 text-secondary">
          {{
            isPrerec || (isLive && hasEnrolled)
              ? 'Have questions?'
              : 'Can’t make it?'
          }}
        </div>
        <hr class="m-0 black-4 mt-10 mb-10" />
        <div v-if="isLive && !hasEnrolled">
          <span class="col-xs-12 text-regular-small text-secondary mb-10"
            >Bookmark this course to receive an email the next time it's
            offered.</span
          >
          <div class="col-xs-12 mt-10 p-0">
            <BaseButton
              @click="addToBookmark"
              variant="secondary"
              class="full-width"
            >
              Bookmark
            </BaseButton>
          </div>
        </div>
        <div v-else>
          <span class="col-xs-12 text-regular-small text-secondary mb-10"
            >Contact us for more information.</span
          >
          <div class="col-xs-12 mt-10 p-0">
            <BaseButton
              @click="openContactUs"
              variant="secondary"
              class="full-width"
            >
              Contact us
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <training-sign-up-modal
      :operations="operations"
      :courseDetails="courseDetails"
      :userId="userId"
      :timeSlotsList="timeSlotsList"
      @refreshAllInfo="refreshInfo"
      @setCartInfo="setCartInfo($event, 'ilt')"
    ></training-sign-up-modal>
    <TrainingSelectionModal
      :operations="operations"
      :courseDetails="courseDetails"
      :userId="userId"
      :timeSlotsList="timeSlotsList"
      @refreshAllInfo="refreshInfo"
      @setCartInfo="setCartInfo($event, 'ilt')"
    ></TrainingSelectionModal>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart(true)"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart('ilt')"
    ></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import cloneDeep from 'lodash/cloneDeep';
import { cartStatus } from '../../utils/constants';
import {
  getInstructorCourseDetails,
  getTimeSlotByCourseIdForUser,
  addToBookmark
} from '../../apis/instructorLedTraining';
import TrainingSignUpModal from './TrainingSignUpModal.vue';
import TrainingSelectionModal from './TrainingSelectionModal.vue';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import Loader from '../UIComponents/Loader.vue';
import cartMixin from '../NewMarketPlace/Mixins/shared';
import CourseSelectionCard from './CourseSelectionCard.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import { getSlotDate, getSlotTimeRange } from '../../utils/common';
import { addToCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';

export default {
  props: ['userId'],
  mixins: [cartMixin],
  components: {
    AddRemoveCartPopup,
    TrainingSignUpModal,
    TrainingSelectionModal,
    Loader,
    CourseSelectionCard,
    BaseButton
  },
  data() {
    return {
      cartInfo: {},
      loaderStatus: false,
      courseId: null,
      planId: null,
      // cartStatus: { ...cartStatus, ADD_TO_CART: 'Sign Up' },
      cartStatus: {},
      operations: {
        type: 'select',
        listView: false,
        courseDetails: null,
        timeSlotsList: null,
        selectedSlotId: null
      },
      courseDetails: {},
      timeSlotsList: []
    };
  },
  watch: {
    $route: {
      async handler(to) {
        this.planId = to.query.planId ? to.query.planId : null;
        this.courseId = to.query.courseId ? to.query.courseId : null;
        await this.fetchCourseDetails();
      },
    }
  },
  mounted() {
    if (this.isLive) {
      this.cartStatus = { ...cartStatus, ADD_TO_CART: 'Sign Up' };
    } else {
      this.cartStatus = cartStatus;
    }
  },
  async created() {
    if (this.$route.query.planId) {
      this.planId = this.$route.query.planId;
    } else {
      this.planId = JSON.parse(localStorage.getItem('schedulePlanId'));
    }
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId;
    } else {
      this.courseId = JSON.parse(localStorage.getItem('scheduleTrainingId'));
    }
    await this.fetchCourseDetails();
    if (this.isLive) {
      this.cartStatus = { ...cartStatus, ADD_TO_CART: 'Sign Up' };
    } else {
      this.cartStatus = cartStatus;
    }
  },
  computed: {
    isLive() {
      return this.courseDetails.training_type === 'Instructor Led';
    },
    isPrerec() {
      return this.courseDetails.training_type === 'Pre-recorded course';
    },
    isBundle() {
      return this.courseDetails.training_type === 'Bundle';
    },
    eventsNone() {
      return this.isLive && this.timeSlotsList.length <= 0;
    },
    hasEnrolledForLive() {
      return this.isLive && this.courseDetails.course_status === 'Enrolled';
    },
    hasEnrolledForPrerec() {
      return this.isPrerec && this.courseDetails.course_status === 'Enrolled';
    },
    hasEnrolledForBundle() {
      return this.isBundle && this.courseDetails.course_status === 'Enrolled';
    },
    hasBundleOption() {
      return this.courseDetails.training_type === 'Bundle';
    },
    /**
     * Has enrolled for any course method if bundle available
     * or enrolled for live version if not
     */
    hasEnrolled() {
      // if (!this.hasBundleOption) return true;
      return (
        this.hasEnrolledForLive ||
        this.hasEnrolledForPrerec ||
        this.hasEnrolledForBundle
      );
    }
  },

  methods: {
    getSlotDate,
    getSlotTimeRange,
    async fetchCourseDetails() {
      this.loaderStatus = true;
      await this.getCourseDetails();
      await this.getTimeSlotsByCourseId();
      this.loaderStatus = false;
    },

    async goToRelatedCourse(planId, courseId, name) {
      const urlName = name.replace(/ /g, '-').toLowerCase(); // Making url more understandable for publically publishing url's
      localStorage.setItem('scheduleTrainingId', JSON.stringify(courseId));
      localStorage.setItem('schedulePlanId', JSON.stringify(planId));
      this.$router.push({
        path: `/trainings/schedule-training/${urlName}`,
        query: { planId }
      });
      // this.loaderStatus = true;
      // this.courseId = courseId;
      /* await this.getCourseDetails();
      await this.getTimeSlotsByCourseId(); */
      // this.loaderStatus = false;
    },

    async addToBookmark() {
      this.loaderStatus = true;
      const response = await addToBookmark(this.courseId);
      this.loaderStatus = false;
      if (response.status_code === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: `${response.data}`
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: `${response.message}`
        });
      }
    },
    openContactUs(referrer = '') {
      this.$router.push({ name: 'ContactUs', params: { referrer } });
    },
    async getCourseDetails() {
      this.courseDetails = await getInstructorCourseDetails(
        this.planId,
        this.userId
      );
      const finalFilteredData = cloneDeep(this.courseDetails);
      if (finalFilteredData.cart_status && finalFilteredData.cart_status.purchase_status === 'REMOVE_FROM_CART') {
          finalFilteredData.cart_status.purchase_status = 'GO_TO_CART';
        }
      this.courseDetails = finalFilteredData;
      this.courseId = this.courseDetails.course_id;
      localStorage.setItem('scheduleTrainingId', this.courseId);
      localStorage.setItem('schedulePlanId', this.planId);
    },

    async refreshInfo(courseDetails) {
      $('#training-signup-modal').modal('hide');
      this.loaderStatus = true;
      this.courseDetails = courseDetails;
      await this.getTimeSlotsByCourseId();
      this.loaderStatus = false;
    },

    async getTimeSlotsByCourseId() {
      const timeSlotsApiList = await getTimeSlotByCourseIdForUser(
        this.courseId
      );
      this.timeSlotsList =
        timeSlotsApiList?.length > 4
          ? timeSlotsApiList.slice(0, 4)
          : timeSlotsApiList;
    },

    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },

    changeSelectedDate() {
      this.operations = {
        ...this.operations,
        timeSlotsList: this.timeSlotsList,
        type: 'edit',
        courseDetails: this.courseDetails,
        selectedSlotId: this.courseDetails.booked_slot.slot_id
      };
      $('#training-signup-modal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    async addRemoveCart() {
      const { purchase_status: purchaseStatus } =
        this.courseDetails.cart_status || {};
      if (
        purchaseStatus === 'ADD_TO_CART' &&
        this.courseDetails.training_type !== 'Pre-recorded course'
      ) {
        this.operations = {
          ...this.operations,
          timeSlotsList: this.timeSlotsList,
          type: 'select',
          courseDetails: this.courseDetails
        };
        $('#training-signup-modal').modal({
          backdrop: 'static',
          keyboard: false
        });
        /* $('#training-selection-modal').modal({
          backdrop: 'static',
          keyboard: false,
        }); */
      } else if (
        purchaseStatus === 'ADD_TO_CART' &&
        this.courseDetails.training_type === 'Pre-recorded course'
      ) {
        this.loaderStatus = true;
        const body = {
          user_id: this.userId,
          plan_id: this.planId
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
            // item: this.trainingDetails[this.trainingDetails.plan_type],
            item: this.courseDetails
          });
          this.emitter.emit('cart-items-updated');
          await this.fetchCourseDetails();
        }
      } else if (purchaseStatus === 'GO_TO_CART') {
        this.$router.push('/market-place/cart');
      } else if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?'
        };
        this.setCartInfo(
          {
            cartInfo,
            item: this.courseDetails
          },
          'ilt',
          false
        );
      }
    },
    navigateToTrainingPage() {
      this.$router.push('/trainings?name=instructorLed');
    }
  }
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

.title_desc,
.course-list li,
.instructor-desc,
.about-list li,
.about-content {
  text-align: justify;
}

.gray-out {
  opacity: 0.5;
  pointer-events: none;
}

.whitePaperName {
  display: inline-block;
  color: rgba(0, 0, 0, 0.7);
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
/*  */
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
  /* margin-top: 22px;
  margin-bottom: 18px; */
}

.course-time-desc {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}
/* .date-info,
.bookmark-desc {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
} */

.w-100p {
  width: 100%;
}

/* .events-none {
  pointer-events: none;
} */

.webinar-img-size img {
  width: 100%;
}

.course-action {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.course-action-icon {
  margin-top: -3px;
}
.prerec-content {
  margin-left: 37px;
}
</style>
