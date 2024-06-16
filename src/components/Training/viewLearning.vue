/** * @author Hemanth Alluddla * @email 85761@global.ul.com * @Info Video modal */
<template>
  <div>
    <div id="view-eLearning-modal" class="modal" role="dialog">
      <div class="modal-dialog modal-lg request-modal">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20" v-if="displayData">
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
              {{ displayData.training_type }}
            </div>
            <div class="col-xs-8 p-0">
              <div class="col-xs-12 p-0 training-title mb-5">
                {{ displayData.title }}
              </div>
              <div class="col-xs-11 p-0 font-14 mb-10">
                {{ displayData.description }}

              </div>
              <div class="text-secondary pr-15 validity-text fw-700 font-14">
                Validity - {{ displayData.validity_months }} days access
              </div>
            </div>
            <div
              class="col-xs-4 p-0"
              v-if="displayData.training_type !== 'Consulting'"
            >
              <div class="col-xs-12 course-contents p-0">
                {{
                  displayData.training_type === 'Certificate'
                    ? 'Courses'
                    : 'Contents'
                }}
              </div>
              <div class="col-xs-12 p-0 mt-10">
                <ul>
                  <li
                    class="font-14"
                    v-for="(content, index) in displayData.content_list"
                    :key="index"
                  >
                    {{ content }}
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-xs-12 p-0 mt-15"
              v-if="displayData.training_type !== 'Consulting'"
            >
              <div class="col-xs-12 p-0 mt-15">
                {{ displayData.course_count }}
                {{ displayData.course_count > 1 ? 'courses' : 'course' }}
              </div>
              <div class="col-xs-12 p-0 pt-10">
                <div v-if="displayData.training_type === 'Certificate'">
                  {{ displayData.duration_minutes / 60 }} hours
                </div>
                <div v-else>{{ displayData.duration_minutes }} minutes</div>
              </div>
              <div class="col-xs-12 pr-0 purchase-info-main mt-10">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <div class="purchase-info p-0 font-18 font-bold pr-10">
                    {{ getPurchaseStatus(displayData.included) }}
                  </div>
                  <div
                    class="pl-15 pb-15"
                    v-if="
                      displayData.previous_purchase_date
                    "
                  >
                    <p class="text-regular-large orange-bg2 expiry-box">
                      Previously purchased: {{ formatPurchaseDate(displayData.previous_purchase_date) }}
                    </p>
                  </div>
                  <div
                    class="pl-15 pb-15"
                    v-if="displayData.expiry_days > 90"
                  >
                    <p class="text-regular-large">
                      Expires:
                      {{
                        formatPurchaseDate(displayData.expiry_date)
                      }}
                    </p>
                  </div>
                  <div
                    class="pl-15 pb-15"
                    v-else-if="
                      displayData.expiry_days <= 90 &&
                      displayData.expiry_days > 10
                    "
                  >
                    <p class="text-regular-large orange-bg2 expiry-box">
                      Expires: {{ displayData.expiry_days }} days
                    </p>
                  </div>
                  <div class="pl-15 pb-15" v-else-if="displayData.expiry_days <= 10 && displayData.expiry_days > 1">
                    <p class="text-regular-large red-bg1 expiry-box white-1">
                      Expires: {{ displayData.expiry_days }} days
                    </p>
                  </div>
                  <div class="pr-15 pb-15" v-else-if="displayData.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ displayData.expiry_days }} day</p>
          </div>
                  </div>
                  <div class="col-xs-2 font-18 font-bold text-right p-0 pr-10">
                  ${{ displayData.price }}
                </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="footer col-xs-12 flex-wrapper align-items-center xs-flex-column col-gap-20 p-0"
          >
            <BaseButton data-dismiss="modal" variant="secondary">
              Cancel
            </BaseButton>
            <template
              v-if="
                displayData.enrolled && displayData.training_type === 'Course'
              "
            >
              <div
                v-if="displayData.deep_link"
                :class="[
                  displayData.course_status === 'Incomplete'
                    ? 'continue-button'
                    : 'bg-emergo-green text-white'
                ]"
                class="d-flex align-items-center col-gap-10 pr-15 pl-15 pt-5 cursor-pointer play-button"
                @click="openCourseOrCertificate(displayData.deep_link)"
              >
                <img
                  class="play-icon"
                  :src="
                    displayData.course_status === 'Incomplete'
                      ? '/static/images/icons/lms/play_blue.svg'
                      : '/static/images/icons/play.svg'
                  "
                />
                <span>{{
                  displayData.course_status === 'Incomplete'
                    ? 'Continue'
                    : 'Play course'
                }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery';
import moment from 'moment';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  props: ['trainingDetails', 'userId', 'accountId'],

  data() {
    return {
      displayData: null,
      paramId: '',
    };
  },

  components: {
    BaseButton,
  },

  watch: {
    trainingDetails: {
      handler() {
        if (this.trainingDetails) {
          this.displayData = this.trainingDetails;
        }
      },
      immediate: true,
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
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return moment(formattedDateArray).format('D MMM YYYY');
      }
      return '';
    },
    openCourseOrCertificate(link) {
      window.open(link, '_blank');
    },
    reset() {
      $('#modal_video').modal('hide');
    },
  },
};
</script>

<style scoped>

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

.text-start {
  text-align: start;
}
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

.validity-text {
  position: relative;
  top: 10px;
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
.continue-button {
  color: #0b3c61;
  border: 1px solid #0b3c61;
}
.text-white {
  color: white;
}
.play-button {
  font-weight: 600;
  border-radius: 5px;
  padding-bottom: 5px;
}
</style>
