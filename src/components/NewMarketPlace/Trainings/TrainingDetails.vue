<template>
  <div
    @click="
      trainingDetails.is_tools && selectedTrainingInfo.enrolled
        ? navigateToTools()
        : false
    "
    class="details-wrapper col-xs-12 p-10 mb-10 d-flex xs-flex-column"
    :class="{
      'cart-item':
        type === 'cart' ||
        (!selectedTrainingInfo.enrolled &&
          selectedTrainingInfo.cart_status.purchase_status === 'GO_TO_CART'),
      'cursor-pointer':
        trainingDetails.is_tools && selectedTrainingInfo.enrolled
    }"
  >
    <div
      class="col-xs-12 col-sm-8 col-md-7 p-0 d-flex col-gap-20 align-items-center"
    >
      <img
        class="training-img"
        :src="
          trainingDetails.plan_type === 'Tool'
            ? '/static/images/tools/tool_available.svg'
            : getImageUrl(trainingDetails.icon_path)
        "
        :alt="trainingDetails.plan_type"
      />
      <div class="d-flex flex-direction-column col-xs-12 p-0">
        <!-- Plan type -->
        <div class="fw-300 text-primary mb-5 d-flex justify-content-between">
          <div v-if="isPreRecCourse" class="flex-50">
            {{ trainingDetails.type }}
          </div>
          <div
            v-else
            :class="{
              'flex-50':
                trainingDetails.is_documents &&
                trainingDetails.plan_type !== 'Templates'
            }"
          >
            {{ trainingDetails.plan_type }}
          </div>
          <div
            class="course-status fw-300 font-18"
            v-if="
              trainingDetails.is_documents &&
              trainingDetails.plan_type !== 'Templates'
            "
          >
            {{ selectedTrainingInfo.category }}
          </div>
        </div>
        <!-- Title -->
        <div
          class="fw-700 font-18 text-primary mb-10 d-flex justify-content-between xs-flex-column"
        >
          <div
            :class="{
              'flex-50':
                selectedTrainingInfo.enrolled &&
                trainingDetails.is_trainings &&
                trainingDetails.type !== 'Certificate'
            }"
          >
            {{
              trainingDetails.plan_name
                ? trainingDetails.plan_name
                : trainingDetails.title
            }}
          </div>
          <div
            v-if="
              selectedTrainingInfo.enrolled &&
              trainingDetails.is_trainings &&
              trainingDetails.type !== 'Certificate'
            "
            class="course-status fw-300 font-18"
          >
            {{
              statusMap[selectedTrainingInfo.course_status] ||
              selectedTrainingInfo.course_status
            }}
          </div>
        </div>
        <!-- FOR LMS (eLearning) -->
        <div
          class="d-flex col-gap-30 xs-flex-column"
          v-if="trainingDetails.plan_type === 'eLearning'"
        >
          <div class="d-flex align-items-center">
            <img
              class="preview-svg"
              src="/static/images/newMarketplace/book.svg"
              alt=""
            />
            <span class="font-14 fw-300">
              {{ selectedTrainingInfo.course_count }}
              {{ selectedTrainingInfo.course_count > 1 ? 'courses' : 'course' }}
            </span>
          </div>
          <div class="d-flex align-items-center">
            <img
              class="preview-svg"
              src="/static/images/newMarketplace/clock.svg"
              alt=""
            />
            <span class="time-text"
              >{{ selectedTrainingInfo.duration_minutes }} minutes</span
            >
          </div>
          <div
            @click="setSelectedTraining('video')"
            class="d-flex align-items-center"
            v-if="
              trainingDetails.type === 'Course' &&
              trainingDetails.plan_type === 'eLearning' &&
              selectedTrainingInfo.course_status === notEnrolled
            "
          >
            <img
            src="/static/images/icons/lms/preview.svg"
              class="preview-svg cursor-pointer"
              alt=""
            />
            <span class="preview-text font-18 fw-600">Preview</span>
          </div>
        </div>
        <!-- For ITL -->
        <div
          v-else-if="isILT && !isPreRecCourse"
          class="d-flex col-gap-30 xs-flex-column"
        >
          <div class="d-flex align-items-center">
            <img
              class="pr-10"
              src="/static/images/icons/lms/location.svg"
              alt=""
            />
            <span class="font-14 fw-300">Online</span>
          </div>
          <div class="d-flex align-items-center">
            <img
              class="preview-svg"
              src="/static/images/newMarketplace/clock.svg"
              alt=""
            />
            <span class="time-text"
              >{{ selectedTrainingInfo.duration_hours }}
              {{
                selectedTrainingInfo.duration_hours > 1 ? 'hours' : 'hour'
              }}</span
            >
          </div>
          <div class="d-flex align-items-center calender-date">
            <img
              class="pr-10"
              src="/static/images/icons/lms/calender.svg"
              alt=""
            />
            <div
              v-if="selectedTrainingInfo.enrolled || !!trainingDetails.cart_id"
            >
            {{
                selectedTrainingInfo.booked_time_slot &&
                formatToLocalDate(selectedTrainingInfo.booked_time_slot.slot_start_time)||
                selectedTrainingInfo.booked_time_slot.slot_start_time
                
              }}
            </div>
            <div
              v-else-if="
                !selectedTrainingInfo.enrolled &&
                selectedTrainingInfo.upcoming_time_slot
              "
            >
              {{
                formatToLocalDate(selectedTrainingInfo.upcoming_time_slot.slot_start_time)||selectedTrainingInfo.upcoming_time_slot.slot_start_time
                
              }}
              {{ slotMoreOptions }}
            </div>
            <div v-else>More dates coming soon</div>
          </div>
        </div>
        <div
          v-else-if="isILT && isPreRecCourse"
          class="d-flex col-gap-30 xs-flex-column"
        >
          <div class="d-flex align-items-center">
            <img
              class="preview-svg"
              src="/static/images/newMarketplace/clock.svg"
              alt=""
            />
            <span class="time-text"
              >{{ selectedTrainingInfo.duration_hours }}
              {{
                selectedTrainingInfo.duration_hours > 1 ? 'hours' : 'hour'
              }}</span
            >
          </div>
        </div>
        <!-- For Documents -->
        <div
          v-else-if="
            trainingDetails.is_documents &&
            !selectedTrainingInfo.is_bundle &&
            !selectedTrainingInfo.enrolled
          "
          class="d-flex col-gap-30 xs-flex-column"
        >
          <div
            class="d-flex align-items-start cursor-pointer"
            @click="navigateToPreview()"
          >
            <img
              class="pr-10"
              src="/static/images/icons/preview_document.svg"
              alt=""
            />
            <span class="preview-text font-18 fw-600">Preview</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Action Section -->
    <div
      class="col-xs-12 col-sm-4 col-md-5 p-0 d-flex flex-direction-column justify-content-center"
    >
      <div
        class="col-xs-12 pl-0 pr-0 justify-end col-gap-20"
        v-if="
          trainingDetails.plan_type === 'Instructor Led' ||
          !selectedTrainingInfo.enrolled
        "
      >
        <div v-if="selectedTrainingInfo.discount_applicable">
          <div class="col-xs-12 d-flex pr-0 pl-0 justify-end col-gap-20">
            <span class="font-18 fw-700">Price</span>
            <span class="font-18 text-strike price-text"
              >${{ trainingDetails.Tool.discount.price_before_discount }}</span
            >
          </div>
          <div class="col-xs-12 d-flex pr-0 pl-0 justify-end col-gap-20">
            <span class="font-18 fw-700">Promotional Price</span>
            <span class="font-18 price-text">${{ trainingDetails.price }}</span>
          </div>
          <p class="mt-5 align-right mr-15">
            Available until
            {{
              formatedDate(trainingDetails.Tool.discount.discount_valid_till)||trainingDetails.Tool.discount.discount_valid_till
            }}
          </p>
        </div>
        <div v-else>
          <div class="col-xs-12 d-flex pl-0 pr-0 justify-end mb-10 col-gap-20">
            <span class="font-18 fw-700">Price</span>
            <span class="font-18 price-text">${{ trainingDetails.price }}</span>
          </div>
        </div>
      </div>
      <div
        class="col-xs-12 p-0 d-flex col-gap-20 justify-content-end align-items-end pl-0 cursor-pointer price"
      >
        <div
          class="white-space black-2 pt-5"
          v-if="
            trainingDetails.plan_type === 'Tool' &&
            trainingDetails.Tool.expiry_days &&
            routePath!='/market-place/cart'
          "
        >
          <div
            class="pl-15 pb-15 pt-10"
            v-if="trainingDetails.Tool.expiry_days > 90"
          >
            <p class="text-regular-large">
              Expires:
              {{ formatPurchaseDate(trainingDetails.Tool.expiry_date) }}
            </p>
          </div>
          <div
            class="pl-15 pb-15 pt-10"
            v-else-if="
              trainingDetails.Tool.expiry_days <= 90 &&
              trainingDetails.Tool.expiry_days > 10
            "
          >
            <p class="text-regular-large orange-bg2 expiry-box">
              Expires: {{ trainingDetails.Tool.expiry_days }} days
            </p>
          </div>
          <div class="pl-15 pb-15 pt-10" v-else-if="trainingDetails.Tool.expiry_days <= 10 && trainingDetails.Tool.expiry_days > 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">
              Expires: {{ trainingDetails.Tool.expiry_days }} days
            </p>
          </div>
          <div class="pr-15 pb-15 xs-hide-content-650" v-else-if="trainingDetails.Tool.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ trainingDetails.Tool.expiry_days }} day</p>
          </div>
        </div>
        <span
          v-if="
            !selectedTrainingInfo.enrolled ||
            trainingDetails.plan_type === 'Instructor Led' ||
            trainingDetails.plan_type === 'eLearning'
          "
          class="cursor-pointer font-18 fw-600 white-space"
          @click="setSelectedTraining('more info')"
          >View Details</span
        >
        <!-- For LMS & ILT Purchased trainings -->
        <template
          v-if="
            trainingDetails.is_trainings &&
            selectedTrainingInfo.enrolled &&
            trainingDetails.plan_type === 'eLearning'
          "
        >
          <div>
            <div class="d-flex">
              <div
              class="white-space black-2 pr-10"
              v-if="
                trainingDetails.eLearning.expiry_days
              "
            >
              <div
                class="pl-15 pb-15"
                v-if="trainingDetails.eLearning.expiry_days > 90"
              >
                <p class="text-regular-large">
                  Expires:
                  {{
                    formatPurchaseDate(trainingDetails.eLearning.expiry_date)
                  }}
                </p>
              </div>
              <div
                class="pl-15 pb-15"
                v-else-if="
                  trainingDetails.eLearning.expiry_days <= 90 &&
                  trainingDetails.eLearning.expiry_days > 10
                "
              >
                <p class="text-regular-large orange-bg2 expiry-box">
                  Expires: {{ trainingDetails.eLearning.expiry_days }} days
                </p>
              </div>
              <div class="pl-15 pb-15" v-else-if="trainingDetails.eLearning.expiry_days <= 10 && trainingDetails.eLearning.expiry_days > 1">
                <p class="text-regular-large red-bg1 expiry-box white-1">
                  Expires: {{ trainingDetails.eLearning.expiry_days }} days
                </p>
              </div>
              <div class="pr-15 pb-15 xs-hide-content-650" v-else-if="trainingDetails.eLearning.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ trainingDetails.eLearning.expiry_days }} day</p>
          </div>
            </div>
            <div class="white-space pb-20 text-subtitle-2 black-2 text-center">
              {{ formatPurchaseDate(trainingDetails.purchase_date)||trainingDetails.purchase_date }}
            </div>
            </div>
            <div class="float-r">
              <div v-if="trainingDetails.type === 'Certificate'"></div>
              <BaseButton
                has-icon
                v-else-if="trainingDetails.type !== 'Certificate'"
                class="d-flex align-items-center col-gap-10"
                @click="openCourseOrCertificate()"
                ><img
                  class="preview-svg"
                  src="/static/images/icons/play.svg"
                  alt
                /><span>Play course</span></BaseButton
              >
            </div>
          </div>
        </template>
        <template
          v-if="(trainingDetails.is_tools && trainingDetails.Tool.purchase_date) && (routePath!='/market-place/cart')"
        >
          <p class="white-space text-subtitle-2 black-2 text-center pb-15">
            {{ formatPurchaseDate(trainingDetails.Tool.purchase_date) }}
          </p>
        </template>
        <!-- For Documents purchased items -->
        <template
          v-if="trainingDetails.is_documents && selectedTrainingInfo.enrolled"
        >
          <BaseButton
            @click="downloadDocument"
            variant="tertiary"
            class="d-flex align-items-center col-gap-10"
          >
            <img
              class="preview-svg"
              src="/static/images/icons/download_icon_white.svg"
              alt=""
            />
            <span>Download</span>
          </BaseButton>
        </template>
        <!-- For All Non Purchased items -->
        <template v-if="!selectedTrainingInfo.enrolled">
          <div>
            <BaseButton
              class="br-20 d-flex align-items-center col-gap-10"
              :class="{
                'gray-out':
                  trainingDetails &&
                  selectedTrainingInfo.disable_as_bundle_added_to_cart,
                'cursor-pointer':
                  trainingDetails.is_tools && selectedTrainingInfo.enrolled
              }"
              :variant="btnVariant"
              :has-icon="
                selectedTrainingInfo.cart_status.purchase_status ===
                'GO_TO_CART'
              "
              @click="
                addRemoveCart(selectedTrainingInfo, trainingDetails.plan_id)
              "
            >
              <img
              src="/static/images/newMarketplace/goto_arrow.svg"
                v-if="
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'GO_TO_CART'
                "
                alt=""
                class="preview-svg"
              />
              <img
                src="/static/images/newMarketplace/trash.svg"
                v-if="
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'REMOVE_FROM_CART'
                "
                alt=""
                class="preview-svg"
              />
              <span>{{
                cartStatus[selectedTrainingInfo.cart_status.purchase_status]
              }}</span>
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
import utc from 'dayjs/plugin/utc';
import { addToCart } from '../../../apis/cart';
import { cartStatus } from '../../../utils/constants';
import Loader from '../../UIComponents/Loader.vue';
import downloadZipFile from '../../UIComponents/mixins/documentsMixin';
import BaseButton from '../../UIComponents/BaseButton.vue';
import EventBus from '../../../utils/event-bus';
dayjs.extend(utc);

export default {
  mixins: [downloadZipFile],
  props: {
    trainingDetails: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    userId: {
      type: Number
    }
  },

  data() {
    return {
      statusMap: {
        'Not Started': 'Enrolled',
        Incomplete: 'In progress'
      },
      loaderStatus: false,
      notEnrolled: 'Not Enrolled',
      cartInfo: {},
      cartStatus
      // selectedTrainingInfo: null,
    };
  },
  created() {
    this.routePath = this.$route.path;
    // this.selectedTrainingInfo = this.trainingDetails;
  },

  computed: {
    isILT() {
      return this.trainingDetails.plan_type === 'Instructor Led';
    },
    isPreRecCourse() {
      return (
        this.trainingDetails.plan_type === 'Instructor Led' &&
        this.trainingDetails.type === 'Pre-recorded course'
      );
    },
    selectedTrainingInfo() {
      return this.trainingDetails[this.trainingDetails.plan_type];
      /* if (!this.trainingDetails.cart_status) {
        this.trainingDetails.cart_status = {
          cart_id: 0,
          purchase_status: 'ADD_TO_CART',
        };
      } */
      // return this.trainingDetails;
    },
    btnVariant() {
      if (
        this.selectedTrainingInfo.cart_status.purchase_status === 'ADD_TO_CART'
      )
        return 'primary';
      if (
        this.selectedTrainingInfo.cart_status.purchase_status ===
        'GO_TO_CART'
      )
        return 'tertiary';
      if (
        this.selectedTrainingInfo.cart_status.purchase_status ===
        'REMOVE_FROM_CART'
      )
        return 'secondary';
      return '';
    },
    slotMoreOptions() {
      const slotCount = this.selectedTrainingInfo.all_available_time_slots
        ? this.selectedTrainingInfo.all_available_time_slots.length
        : '';
      if (slotCount <= 1) return '';
      if (slotCount === 2) return ' + 1 more option';
      return ` + ${slotCount - 1} more options`;
    }
  },

  components: {
    Loader,
    BaseButton
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
        return dayjs.utc(`${value}`).local().format('ddd MMM DD , YYYY');
      }
      return '';
    },
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [
          value[0],
          value[1] - 1,
          value[2]
        ];
        return dayjs(formattedDateArray).format('D MMMM YYYY');
      }
      return '';
    },

    navigateToTools() {
      this.$router.push('/tools/root-cause-analysis-wizard');
    },

    navigateToPreview() {
      const docType = this.getQueryType();
      const documentId =
        this.trainingDetails[this.trainingDetails.plan_type].document_id;
      this.$router.push({
        path: `/market-place/documents/${documentId}`,
        query: { docType }
      });
    },

    downloadDocument() {
      this.downloadZipFile(
        this.trainingDetails[this.trainingDetails.plan_type].document_path
      );
    },

    getQueryType() {
      const documentType = this.trainingDetails.type;
      switch (documentType) {
        case 'Use Environment Descriptions':
          return 3;
        case 'User Profiles':
          return 2;
        case 'Design Documents':
          return 5;
        case 'Use-Related Risk Analyses':
          return 6;
        case 'Known Problems Analyses':
          return 7;
        case 'Product Packages':
          return 8;
        default:
          return 1;
      }
    },

    openCourseOrCertificate() {
      window.open(
        this.trainingDetails[this.trainingDetails.plan_type].deep_link,
        '_blank'
      );
    },

    setSelectedTraining(type) {
      const { plan_type: planType } = this.trainingDetails;
      const details = this.trainingDetails[this.trainingDetails.plan_type];
      // const details = this.trainingDetails;
      if (
        ['eLearning', 'Consulting'].includes(planType) ||
        this.trainingDetails.is_documents ||
        this.trainingDetails.is_tools
      ) {
        this.$emit('setSelectedTrainingItem', {
          type,
          item: details,
          moduleType: this.getModuleType(details)
        });
      } else if (planType === 'Instructor Led') {
        const urlName = details.title.replace(/ /g, '-').toLowerCase(); // Making url more understandable for publically publishing url's
        localStorage.setItem(
          'scheduleTrainingId',
          JSON.stringify(details.course_id)
        );
        localStorage.setItem('schedulePlanId', JSON.stringify(details.plan_id));
        // const courseId = details.course_id;
        const planId = details.plan_id;
        this.$router.push({
          path: `/trainings/schedule-training/${urlName}`,
          query: { planId }
        });
      } else if (planType === 'ComplianceWire Training') {
        const urlName = details.title
          .replace(/®/g, '')
          .replace(/ /g, '-')
          .toLowerCase();
        localStorage.setItem(
          'scheduleTrainingId',
          JSON.stringify(details.course_id)
        );
        localStorage.setItem('schedulePlanId', JSON.stringify(details.plan_id));
        const planId = details.plan_id;
        this.$router.push({
          path: `/compliancewire-marketplace/details/${urlName}`,
          query: { planId, userId: this.userId }
        });
      } else if (planType === 'ComplianceWire Training') {
        const urlName = details.title
          .replace(/®/g, '')
          .replace(/ /g, '-')
          .toLowerCase();
        localStorage.setItem(
          'scheduleTrainingId',
          JSON.stringify(details.course_id)
        );
        localStorage.setItem('schedulePlanId', JSON.stringify(details.plan_id));
        const planId = details.plan_id;
        this.$router.push({
          path: `/compliancewire-marketplace/details/${urlName}`,
          query: { planId, userId: this.userId }
        });
      } else if (planType === 'ComplianceWire Training') {
        const urlName = details.title
          .replace(/®/g, '')
          .replace(/ /g, '-')
          .toLowerCase();
        localStorage.setItem(
          'scheduleTrainingId',
          JSON.stringify(details.course_id)
        );
        localStorage.setItem('schedulePlanId', JSON.stringify(details.plan_id));
        const planId = details.plan_id;
        this.$router.push({
          path: `/compliancewire-marketplace/details/${urlName}`,
          query: { planId, userId: this.userId }
        });
      }
    },

    getModuleType(planDetails) {
      switch (true) {
        case planDetails.is_tools:
          return 'tools';
        case planDetails.is_documents:
          return 'documents';
        default:
          return 'trainings';
      }
    },
    async addRemoveCart(itemSelected, planId) {
      const { purchase_status: purchaseStatus } = itemSelected.cart_status;
      if (purchaseStatus === 'GO_TO_CART') {
        this.$router.push('/market-place/cart');
      } else if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?'
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: this.trainingDetails[this.trainingDetails.plan_type]
          // item: this.trainingDetails,
        });
      } else if (
        (purchaseStatus === 'ADD_TO_CART' &&
          ['eLearning', 'Consulting'].includes(
            this.trainingDetails.plan_type
          )) ||
        this.trainingDetails.is_documents ||
        this.trainingDetails.is_tools ||
        this.isPreRecCourse
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
            item: this.trainingDetails[this.trainingDetails.plan_type]
            // item: this.trainingDetails,
          });
          this.emitter.emit('cart-items-updated');
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'add_to_cart_button_click',
            add_to_cart_type: itemSelected.plan_type,
            add_to_cart_title: itemSelected.title
          });
        }
      } else if (
        purchaseStatus === 'ADD_TO_CART' &&
        this.trainingDetails.plan_type === 'Instructor Led'
      ) {
        this.$emit('onShowTimeSlots', this.trainingDetails);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'add_to_cart_button_click',
          add_to_cart_type: itemSelected.plan_type,
          add_to_cart_title: itemSelected.title
        });
      }
    }
  }
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

.course-status {
  line-height: 25px;
  color: #0b3c61;
}

.flex-50 {
  flex: 0 0 65%;
}

.gray-out {
  opacity: 0.5;
  pointer-events: none;
}

.align-items-start {
  align-items: flex-start;
}

.calender-date {
  width: 160px;
}

@media screen and (max-width: 800px) {
  .col-gap-20 {
    column-gap: 7px;
  }
}

@media screen and (max-width: 500px) {
  .col-gap-20 {
    column-gap: 20px;
  }
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .training-img {
    /* width: 100%;
    height: 100%; */
    align-self: flex-start;
  }

  .flex-title {
    flex: 0 0 100%;
  }
}
</style>
