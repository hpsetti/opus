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
        :src="getImageUrl(trainingDetails.icon_path)"
        alt=""
      />
      <div class="d-flex flex-direction-column col-xs-12 p-0 plan-type">
        <!-- Plan type -->
        <div
          class="fw-300 text-primary mb-5 d-flex justify-content-between xs-flex-column"
        >
          <div
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
            {{ trainingDetails.plan_name }}
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
            <span class="font-14 fw-300"
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
          v-else-if="trainingDetails.plan_type === 'Instructor Led'"
          class="d-flex col-gap-30 xs-flex-column"
        >
          <div class="d-flex align-items-start">
            <img
              class="preview-svg"
              src="/static/images/icons/lms/location.svg"
              alt=""
            />
            <span class="font-14 fw-300">Online</span>
          </div>
          <div class="d-flex align-items-start">
            <img
              class="preview-svg"
              src="/static/images/newMarketplace/clock.svg"
              alt=""
            />
            <span class="font-14 fw-300"
              >{{ selectedTrainingInfo.duration_hours }}
              {{
                selectedTrainingInfo.duration_hours > 1 ? 'hours' : 'hour'
              }}</span
            >
          </div>
          <div class="d-flex align-items-center">
            <img
              class="preview-svg"
              src="/static/images/icons/lms/calender.svg"
              alt=""
            />
            <div
              v-if="selectedTrainingInfo.enrolled || !!trainingDetails.cart_id"
            >
              {{
                selectedTrainingInfo.booked_time_slot &&
                formatToLocalDate(selectedTrainingInfo.booked_time_slot.slot_start_time) || selectedTrainingInfo.booked_time_slot.slot_start_time

              }}
            </div>
            <div
              v-else-if="
                !selectedTrainingInfo.enrolled &&
                selectedTrainingInfo.upcoming_time_slot
              "
            >
              {{
                formatToLocalDate(selectedTrainingInfo.upcoming_time_slot.slot_start_time) || selectedTrainingInfo.upcoming_time_slot.slot_start_time
              }}
            </div>
            <div v-else>More dates coming soon</div>
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
            class="d-flex align-items-center cursor-pointer"
            @click="navigateToPreview()"
          >
            <img
              class="pr-10"
              src="/static/images/documents/doc_preview.svg"
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
          <div class="col-xs-12 d-flex pl-0 pr-0 justify-end col-gap-20">
            <span class="font-18 fw-700">Price</span>
            <span class="font-18 text-strike price-text"
              >${{ trainingDetails.Tool.discount.price_before_discount }}</span
            >
          </div>
          <div class="col-xs-12 d-flex pl-0 pr-0 justify-end col-gap-20">
            <span class="font-18 fw-700">Promotional Price</span>
            <span class="font-18 price-text">${{ trainingDetails.price }}</span>
          </div>
          <p class="mt-5 align-right mr-15">
            Available until
            {{
              formatedDate(trainingDetails.Tool.discount.discount_valid_till) || trainingDetails.Tool.discount.discount_valid_till
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
        class="col-xs-12 d-flex col-gap-20 justify-content-end align-items-center pl-0 pr-0 cursor-pointer price"
      >
        <span
          v-if="
            !selectedTrainingInfo.enrolled ||
            trainingDetails.plan_type === 'Instructor Led'
          "
          class="cursor-pointer font-18 fw-600"
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
        </template>
        <!-- For Documents purchased items -->
        <template
          v-if="trainingDetails.is_documents && selectedTrainingInfo.enrolled"
        >
          <div>
            <div>
              <div class="d-flex">
                <div
                  class="white-space black-2 pr-10"
                  v-if="trainingDetails.Templates.expiry_days"
                >
                  <div
                    class="pl-15 pb-15"
                    v-if="trainingDetails.Templates.expiry_days > 90"
                  >
                    <p class="text-regular-large">
                      Expires:
                      {{ formatPurchaseDate(trainingDetails.Templates.expiry_date_time) }}
                    </p>
                  </div>
                  <div
                    class="pl-15 pb-15"
                    v-else-if="
                      trainingDetails.Templates.expiry_days <= 90 &&
                      trainingDetails.Templates.expiry_days > 10
                    "
                  >
                    <p class="text-regular-large orange-bg2 expiry-box">
                      Expires: {{ trainingDetails.Templates.expiry_days }} days
                    </p>
                  </div>
                  <div class="pl-15 pb-15" v-else-if="trainingDetails.Templates.expiry_days <= 10 && trainingDetails.Templates.expiry_days > 1">
                    <p class="text-regular-large red-bg1 expiry-box white-1">
                      Expires: {{ trainingDetails.Templates.expiry_days }} days
                    </p>
                  </div>
                  <div class="pr-15 pb-15 xs-hide-content-650" v-else-if="trainingDetails.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ trainingDetails.expiry_days }} day</p>
          </div>
                </div>
                <div
                  class="white-space pb-20 text-subtitle-2 black-2 text-center"
                >
                  {{ formatPurchaseDate(trainingDetails.purchase_date) }}
                </div>
              </div>
            </div>
            <div class="float-r">
              <BaseButton
                @click="downloadDocument"
                variant="tertiary"
                class="d-flex align-items-center"
                has-icon
              >
                <img
                  class="preview-svg"
                  src="/static/images/icons/download_icon_white.svg"
                  alt=""
                />
                <span>Download</span>
              </BaseButton>
            </div>
          </div>
        </template>
        <!-- For All Non Purchased items -->
        <template v-if="!selectedTrainingInfo.enrolled">
          <div>
            <BaseButton
              class="br-20 d-flex align-items-center col-gap-10"
              :has-icon="
                selectedTrainingInfo.cart_status.purchase_status ===
                'GO_TO_CART'
              "
              :class="{
                'gray-out':
                  trainingDetails &&
                  selectedTrainingInfo.disable_as_bundle_added_to_cart,
                primary:
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'ADD_TO_CART',
                secondary:
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'REMOVE_FROM_CART',
                tertiary:
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'GO_TO_CART'
              }"
              @click="
                addRemoveCart(selectedTrainingInfo, trainingDetails.plan_id)
              "
            >
              <img
                class="preview-svg"
                src="/static/images/newMarketplace/trash.svg"
                v-if="
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'REMOVE_FROM_CART'
                "
                alt=""
              />
              <img
                class="preview-svg"
                src="/static/images/newMarketplace/goto_arrow.svg"
                v-if="
                  selectedTrainingInfo.cart_status.purchase_status ===
                  'GO_TO_CART'
                "
                alt=""
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
    };
  },

  computed: {
    selectedTrainingInfo() {
      return this.trainingDetails[this.trainingDetails.plan_type];
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
        this.$router.push({
          name: 'ScheduleTraining',
          params: {
            id: details.course_id
          }
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
      } if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?'
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: this.trainingDetails[this.trainingDetails.plan_type]
        });
      } else if (
        (purchaseStatus === 'ADD_TO_CART' &&
          ['eLearning', 'Consulting'].includes(
            this.trainingDetails.plan_type
          )) ||
        this.trainingDetails.is_documents ||
        this.trainingDetails.is_tools
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
          });
          this.emitter.emit('cart-items-updated');
        }
      } else if (
        purchaseStatus === 'ADD_TO_CART' &&
        this.trainingDetails.plan_type === 'Instructor Led'
      ) {
        this.$emit('onShowTimeSlots', this.trainingDetails);
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
  width: 85px;
  object-fit: cover;
  border-radius: 5px;
}

.plan-type {
    padding-left: 0px;
  }

.price,
.preview-text {
  color: #00518a;
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

.price-text {
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: right;
  min-width: 60px;
}



@media screen and (max-width: 757px) {
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

@media screen and (max-width: 400px) {
  .col-gap-20 {
    column-gap: 5px;
  }

  .plan-type {
    padding-left: 15px;
  }
}
</style>
