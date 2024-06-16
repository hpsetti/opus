<template>
  <div class="content-wrappper p-20">
    <div class="col-xs-12">
      <div class="col-xs-12 p-0 font-18 d-flex">
        <div
          class="col-xs-1 width-auto p-0 cursor-pointer"
          @click="navigateToConsultingsPage"
        >
          <img
            class="back-img"
            src="/static/images/icons/chevron_left_blue.svg"
            alt=""
          />
        </div>
        <div
          class="col-xs-11 whitePaperName p-0 cursor-pointer ml-10"
          @click="navigateToConsultingsPage"
        >
          Consulting Support
        </div>
      </div>
      <div
        class="col-xs-12 p-0 d-flex flex-wrap content-wrapper-container"
        v-if="consulting"
      >
        <div class="col-xs-12 col-sm-8 col-md-8 p-0 pr-20">
          <div class="col-xs-12 p-0 mt-30">
            <div class="consulting-title">{{ consulting.title }}</div>
            <div
              v-if="consulting.tags.length"
              class="col-xs-12 mt-10 d-flex flex-wrap text-justify row-gap-10"
            >
              <span
                class="consulting-tag"
                v-for="(tag, index) in consulting.tags"
                :key="tag.consulting_tag_id + '_' + index"
                :style="{ background: tag.color, color: 'rgba(0, 0, 0, 0.7)' }"
                >{{ tag.consulting_tag_name }}</span
              >
            </div>
            <div class="col-xs-12 p-0 pl-15">
              <p class="consulting-subtitle text-justify regular-text m-0">
                {{ consulting.title_desc }}
              </p>
            </div>
          </div>
          <div class="col-xs-12 p-0 mt-25">
            <div class="col-xs-12 p-0 about-header-container">
              <span class="about-header">About this service</span>
            </div>
            <div class="col-xs-12 p-0 pl-15">
              <p class="regular-text about-desc text-justify m-0">
                {{ consulting.consulting_details_info.about_header }}
              </p>
              <div class="about-desc-points regular-text mt-25 mb-25 pl-25">
                <ul>
                  <li
                    v-for="(aboutItem, index) in consulting
                      .consulting_details_info.about_content"
                    :key="index + aboutItem"
                  >
                    {{ aboutItem }}
                  </li>
                </ul>
              </div>
              <p class="regular-text about-desc text-justify m-0">
                {{ consulting.consulting_details_info.about_footer }}
              </p>
            </div>
          </div>
          <div class="col-xs-12 p-0 mt-25">
            <div class="col-xs-12 p-0 about-header-container">
              <span class="consulting-details-header">Consulting details</span>
            </div>
            <div class="col-xs-12 p-0 pl-15">
              <div
                class="consulting-details-points regular-text mt-25 mb-25 pl-25"
              >
                <ul class="details-list">
                  <li
                    v-for="(detailItem, index) in consulting
                      .consulting_details_info.consulting_details"
                    :key="index + detailItem"
                  >
                    {{ detailItem }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xs-12 p-0 mt-25 pb-20">
            <div class="col-xs-12 p-0 related-consultings-container">
              <span class="related-consultings-header"
                >{{ consulting.related_course.title }}
              </span>
            </div>
            <div class="col-xs-12 p-0 pl-15 related-consulting-content">
              <div
                class="col-xs-12 col-sm-6 col-md-4 pl-0 mt-20"
                v-for="(relatedConsulting, index) in consulting.related_course
                  .list"
                :key="index"
              >
                <div class="related-consulting-name mb-5">
                  {{ relatedConsulting.name }}
                </div>
                <div
                  class="cursor-pointer"
                  @click="
                    goToRelatedCourse(
                      relatedConsulting.consulting_id,
                      relatedConsulting.title
                    )
                  "
                  :title="relatedConsulting.title"
                >
                  <div class="related-consulting-heading mb-15">
                    {{ relatedConsulting.title }}
                  </div>
                  <img
                    class="related-consulting-img"
                    :src="getImageUrl(relatedConsulting.img)"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-4 col-md-4 purchase-wrapper p-0 pt-30 pb-20 d-flex justify-content-center"
        >
          <div class="col-xs-12 p-0 purchase-container">
            <img
              class="width-100"
              :src="getImageUrl(consulting.blob_course_icon_url)"
              alt=""
            />
            <p class="purchase-consulting-title mt-10 width-100">
              {{ consulting.title }}
            </p>
            <div class="col-xs-12 p-0" v-if="isShowPrice">
              <div
                class="col-xs-12 col-sm-6 p-0 d-flex align-items-center justify-content-start"
              >
                <span class="pl-10 purchase-info">{{
                  consulting.consulting_type
                }}</span>
              </div>
              <div
                class="col-xs-12 col-sm-6 p-0 d-flex align-items-center justify-content-end"
              >
                <img
                  src="/static/images/icons/label_price.svg"
                  alt=""
                  class="consulting-price"
                />
                <span class="pl-10 fw-300 pl-10 purchase-info"
                  >${{ consulting.price }}+</span
                >
              </div>
            </div>
            <div
              v-if="isShowRequestedData"
              class="col-xs-12 p-0 mt-20 consulting-quote-date"
              :class="isShowPurchaseDate ? 'faded' : ''"
            >
              <img src="/static/images/icons/circle_check.svg" alt="" />
              <span class="ml-10"
                >Requested
                {{  formatToHumanDate(consulting.requested_date) || consulting.requested_date }}</span
              >
            </div>
            <div
              v-if="isShowPurchaseDate"
              class="col-xs-12 p-0 mt-20 consulting-quote-date"
              :class="isShowCompletedDate ? 'faded' : ''"
            >
              <img src="/static/images/icons/circle_check.svg" alt="" />
              <span class="ml-10"
                >Purchased
                {{  formatToHumanDate(consulting.purchased_date)|| consulting.purchased_date }}</span
              >
            </div>
            <div
              v-if="isShowCompletedDate"
              class="col-xs-12 p-0 mt-20 consulting-quote-date"
            >
              <img src="/static/images/icons/circle_check.svg" alt="" />
              <span class="ml-10"
                >Completed
                {{  formatToHumanDate(consulting.completed_date) || consulting.completed_date }}</span
              >
            </div>
            <div class="col-xs-12 p-0 mt-20 session-header">
              <p>Estimated duration</p>
            </div>
            <div
              class="session-availability-container col-xs-12 p-0 pl-10 mt-10 d-flex align-items-center"
            >
              <img
                src="/static/images/newMarketplace/clock.svg"
                class="availability-icon"
              />
              <span class="availability-duration regular-text ml-10"
                >{{ consulting.duration_hours + consulting.duration_type }}
              </span>
            </div>
            <div
              v-if="isShowRequestedData"
              class="session-availability-container col-xs-12 p-0 pl-10 mt-25 d-flex"
            >
              <img
                src="/static/images/icons/email_black.svg"
                class="availability-icon"
              />
              <span class="requested-message ml-10">
                You should receive an email from an Emergo by UL Sales team
                member regarding the progress of your quote.
              </span>
            </div>
            <div
              class="flex-wrap request-container col-xs-12 p-0 d-flex align-items-center mt-25 pr-10"
              :class="showRequestQuote ? 'pl-10' : 'justify-content-center'"
            >
              <BaseButton
                v-if="showRequestQuote"
                @click="requestQuote"
                class="width-100"
                >Request a quote</BaseButton
              >
              <button
                v-else-if="showContactUs"
                class="contact-us-btn btn pt-8 pb-8 pl-30 pr-30"
                @click="contactUs"
              >
                Contact us
              </button>
            </div>
            <div class="request-info-container col-xs-12 p-10 mt-5">
              <span>{{ consulting.purchase_info }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="consulting_page_modal" class="modal" role="dialog">
      <div class="modal-dialog" :class="modalComponent">
        <div class="modal-content p-0">
          <div class="content">
            <request-quote
              v-if="modalComponent === 'requestQuote'"
              :consulting="consulting"
              @close="closeModal"
              @submit="handleQuoteSubmit"
            />
            <contact-us
              v-else-if="modalComponent === 'contactUs'"
              :consulting="consulting"
              @close="closeModal"
              @submit="handleContactUsSubmit"
            />
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="isLoaderActive"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import { fetchConsultingDetails } from '../../apis/consultings';
import Loader from '../UIComponents/Loader.vue';
import RequestQuote from './RequestQuote.vue';
import ContactUs from './ContactUs.vue';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  props: ['account_id', 'userId'],
  name: 'ScheduleConsulting',
  components: {
    Loader,
    RequestQuote,
    ContactUs,
    BaseButton
  },
  data() {
    return {
      consulting: null,
      modalComponent: '',
      isLoaderActive: false
    };
  },
  computed: {
    // TODO Revisit this area in next release
    isDeleted() {
      return !this.consulting.requested;
    },
    showRequestQuote() {
      return !this.consulting.modified_date || this.isDeleted;
    },
    showContactUs() {
      return this.consulting.modified_date || this.isDeleted;
    },
    isShowPrice() {
      return !this.consulting.modified_date || this.isDeleted;
    },
    isShowRequestedData() {
      return this.consulting.modified_date && !this.isDeleted;
    },
    isShowPurchaseDate() {
      return this.consulting.purchased_date;
    },
    isShowCompletedDate() {
      return this.consulting.completed_date;
    }
  },
  created() {
    this.setupConsulting();
  },
  methods: {
    formatToHumanDate(date) {
      return dayjs(date).format('Do MMM YYYY');
    },
    navigateToConsultingsPage() {
      this.$router.push('/consulting');
    },
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    async setupConsulting() {
      // this.courseId = this.$route.params.id;
      if (this.$route.query.consultingId) {
        this.courseId = this.$route.query.consultingId;
      }
      this.isLoaderActive = true;
      await this.fetchConsultingDetails();
      this.isLoaderActive = false;
    },
    async fetchConsultingDetails() {
      this.consulting = await fetchConsultingDetails({
        courseId: this.courseId,
        userId: this.userId
      });
      // this.consulting.modified_date = '2022-08-25T11:47:44.529Z';
      if (this.consulting.modified_date) {
        this.consulting.purchase_info =
          'If you have not received an update email, check your spam or junk inboxes and if you still cannot locate it contact us with questions.';
      } else {
        this.consulting.purchase_info =
          'After requesting a quote, you will receive an email from an Emergo by UL Sales team member.';
      }
    },
    goToRelatedCourse(consultingId, consultingName) {
      const urlName = consultingName
        .trim()
        .replace(/[^a-zA-Z0-9- ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
      this.$router.push({
        path: `/schedule-consulting/${urlName}`,
        query: { consultingId }
      });
      this.setupConsulting();
    },
    requestQuote() {
      this.openModal('requestQuote', { consulting: this.consulting });
    },
    contactUs() {
      this.openModal('contactUs', { consulting: this.consulting });
    },
    // MODAL
    openModal(component, data) {
      this.modalComponent = component;
      this.modalData = data;
      $('#consulting_page_modal').modal('show');
    },
    closeModal() {
      $('#consulting_page_modal').modal('hide');
      this.modalComponent = '';
    },
    handleContactUsSubmit() {
      this.closeModal();
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Your request has been successfully sent'
      });
    },
    handleQuoteSubmit() {
      this.closeModal();
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Your request has been successfully sent'
      });
      this.setupConsulting();
    }
  }
};
</script>
<style scoped>
.flex-wrap {
  flex-wrap: wrap;
}

.fixed-nav-bar {
  background: #ffffff;
  padding: 10px 10px 10px 0px;
}

.width-auto {
  width: auto;
}

.back-img {
  width: 18px;
  height: 18px;
}

.whitePaperName {
  display: inline-block;
  color: #0b3c61;
}

.purchase-wrapper {
  height: max-content;
}

.consulting-title {
  font-weight: 300;
  font-size: 32px;
  line-height: 44px;
  color: #0b3c61;
}

.consulting-subtitle {
  margin-top: 24px;
}

.consulting-tag {
  margin-right: 10px;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
  font-size: 12px;
}

.regular-text {
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
}

.consulting-quote-date {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}

.consulting-quote-date.faded {
  opacity: 40%;
}

.regular-text,
.purchase-info {
  color: rgba(0, 0, 0, 0.7);
}

.about-header-container,
.consulting-details-container,
.related-consultings-container {
  padding-bottom: 7px;
  border-bottom: 1px solid #bdbdbd;
}

.about-header,
.consulting-details-header,
.related-consultings-header {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
}

.about-desc,
.consulting-details-desc {
  margin-top: 16px;
}

.about-desc-points ul li,
.consulting-details-points ul li {
  text-align: justify;
}

.related-consulting-name {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}

.related-consulting-heading {
  font-weight: bold;
  font-size: 24px;
  line-height: 25px;
  color: #0b3c61;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.related-consulting-img {
  width: 168px;
  height: 100px;
  border-radius: 5px;
}

.purchase-container {
  padding: 16px 25px 20px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.width-100 {
  width: 100%;
}

.purchase-consulting-title {
  font-weight: 300;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #0b3c61;
}

.consulting-location {
  width: 15px;
  height: 22px;
}

.consulting-price {
  width: 20px;
  height: 20px;
}

.session-header {
  border-bottom: 1px solid #d3d6d9;
}

.availability-icon {
  width: 22px;
  height: 22px;
}

.requested-message {
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}

.request-btn {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  background: #4c9e45;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}

.request-btn,
.request-btn:hover,
.request-btn:focus {
  color: white;
}

.contact-us-btn {
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #0b3c61;
}

.request-info-container {
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}

#consulting_page_modal .modal-dialog {
  width: 60vw;
  background: transparent;
}

#consulting_page_modal .modal-content .content {
  /* max-height: 85vh; */
  overflow: hidden;
}

@media screen and (max-width: 768px) {
  .content-wrapper-container {
    flex-direction: column-reverse;
  }

  #consulting_page_modal .modal-dialog {
    width: 90vw;
    background: transparent;
  }
}
</style>
