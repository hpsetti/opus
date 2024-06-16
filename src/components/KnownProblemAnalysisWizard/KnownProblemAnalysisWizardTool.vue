<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0">
        <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9 p-0">
          <div class="col-xs-12 d-flex align-items-center mb-10 p-0">
            <img
              @click="navigateToTools"
              class="cursor-pointer"
              src="/static/images/icons/chevron_left_white.svg"
              alt=""
            />
            <div class="welcome-common-header pl-25 fw-300">
              Known Problem Analysis Wizard
            </div>
          </div>
          <div class="col-xs-12 pl-0 col-md-10 col-lg-8 font-14 pl-40">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet et
            nisl cras lectus neque vitae tristique. Volutpat a elementum,
            interdum neque interdum massa. Nulla ipsum aliquam, semper integer
            maecenas adipiscing ultricies. Faucibus quis nascetur nulla
            scelerisque sed.
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-4 col-md-4 col-lg-3 p-0 xs-pl-40 md-pl-40 action-options"
        >
          <div
            class="col-xs-12 mb-15 d-flex align-items-center p-0 cursor-pointer"
          >
            <img src="/static/images/dashboard/ask_question.svg" alt="" />
            <span class="pl-15">How to perform KPA?</span>
          </div>
          <div
            class="col-xs-12 mb-15 d-flex align-items-center p-0 cursor-pointer"
          >
            <img src="/static/images/icons/document_white.svg" alt="" />
            <span class="pl-15">View example KPA</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-8 options-card-container">
      <div class="d-flex justify-content-start align-center">
        <div class="qno-container">
          <div class="qno step-style text-subtitle-2">1</div>
        </div>
        <div class="question d-flex align-center justify-content-between">
          <div class="title text-h4">Select Product code</div>
          <div class="inline-flex">
            <img
              class="img-size"
              src="/static/images/icons/header_about.svg"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-8 dropdown-container">
      <opus-select
        style="width: 100%"
        v-model="activeItemList"
        :options="tabs"
        trackBy="id"
        :custom-label="customLabel"
        placeholder="Select Role"
      >
      </opus-select>
    </div>
    <div class="col-xs-8 options-card-container">
      <div class="d-flex justify-content-start align-center">
        <div class="qno-container">
          <div
            class="qno text-subtitle-2"
            :class="
              this.activeItemList.itemName !== 'Select Product Code'
                ? 'step-style'
                : ''
            "
          >
            2
          </div>
        </div>
        <div class="question">
          <div class="title text-h4">Select Dates</div>
          <h5>Select the date range report received by FDA</h5>
        </div>
      </div>
    </div>
    <div class="col-xs-8 mb-10 date-picker-container d-flex align-center">
      <div>
        <h5>Start date</h5>
        <div class="form-group">
          <date-picker
            type="date"
            lang="en"
            v-model:value="startDate"
            valueType="format"
            format="DD-MMM-YYYY"
            placeholder="xx/xx/xxxx"
            @change="customFirstDate()"
            :disabled="this.activeItemList.itemName === 'Select Product Code'"
          >
          </date-picker>
        </div>
      </div>
      <div class="pl-30">
        <h5>End date</h5>
        <div class="form-group">
          <date-picker
            type="date"
            lang="en"
            v-model:value="secondDate"
            valueType="format"
            format="DD-MMM-YYYY"
            placeholder="xx/xx/xxxx"
            @change="customSecondDate()"
            :disabled-date="disabledBefore"
            :disabled="!startDate"
          >
          </date-picker>
        </div>
      </div>
    </div>
    <div class="col-xs-8 options-card-container" v-if="isKpaReady">
      <div class="d-flex justify-content-start align-center">
        <div class="qno-container">
          <div
            class="qno text-subtitle-2"
            :class="this.isKpaReady ? 'step-style' : ''"
          >
            3
          </div>
        </div>
        <div
          class="question align-center justify-content-between opus-bg-green-1 p-20"
          v-if="isDownloadAvailable"
        >
          <div>
            <div class="row">
              <div class="col-xs-8 title text-h4 pb-20">
                Your KPA Result is ready!
              </div>
              <div class="col-xs-4 d-flex">
                <BaseButton
                  variant="secondary"
                  :disabled="!isDownloadAvailable"
                  @click="resetValues"
                  >View</BaseButton
                >
                <BaseButton
                  class="button ml-15 primary sm"
                  :disabled="!isDownloadAvailable"
                  @click="downloadResults"
                  has-icon
                  ><img
                    src="/static/images/icons/download_icon_white.svg"
                    alt=""
                  />
                  <span class="pl-10">Download</span></BaseButton
                >
              </div>
              <div class="p-20">
                <p
                  class="text-primary mt-30 text-button-label white-space d-contents"
                >
                  Product Code: {{ activeItemList.itemName }} / Date Range:
                  {{ startDate }} - {{ secondDate }}
                </p>
                <p class="text-primary text-regular-small">
                  The KPA result can be visible by clicking on “View” within
                  OPUS. The KPA result can also be exported as an excel file for
                  offline usage by clicking on ‘Download”.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="question align-center justify-content-between orange-bg-3 p-20"
          v-else
        >
          <div>
            <div class="row">
              <div class="col-xs-9 title text-h4 pb-20">
                Sorry, no results found.
              </div>
              <div class="col-xs-3">
                <BaseButton
                  variant="secondary"
                  @click="clearAll"
                  >Clear all</BaseButton
                >
              </div>
              <div class="p-20">
                <p
                  class="text-primary mt-30 text-button-label white-space d-contents"
                >
                  Product Code: {{ activeItemList.itemName }} / Date Range:
                  {{ startDate }} - {{ secondDate }}
                </p>
                <p class="text-primary text-regular-small mt-10">
                  Clear your search inputs and try again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-xs-8 pb-40 d-flex align-center justify-content-end"
      v-if="!isKpaReady"
    >
      <hr />
      <BaseButton
        variant="secondary"
        :disabled="!startDate || !secondDate"
        @click="clearAll"
        >Clear all</BaseButton
      >
      <BaseButton
        class="button ml-15 primary sm"
        :disabled="!startDate || !secondDate"
        @click="searchResults"
        >Search</BaseButton
      >
    </div>
    <div class="col-xs-12 pb-40 align-center justify-content-end" v-else>
      <div class="col-xs-8 pt-20">
        <hr />
        <BaseButton
          variant="secondary"
          class="float-r"
          :disabled="!startDate || !secondDate"
          @click="clearAll"
          >Clear all</BaseButton
        >
      </div>
    </div>
    <clearAllPopup @closeClearallPopup="closeClearallPopup" @clearSearch="resetValues"></clearAllPopup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import {
  getKPAToolOptions,
  getKPAToolDataWithCode
} from '@apis/knownProblemAnalysis';
import { saveAs } from 'file-saver';
import DatePicker from 'vue-datepicker-next';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
import BaseButton from '@/components/UIComponents/BaseButton.vue';
import Loader from '@/components/UIComponents/Loader.vue';
import b64toBlob from '../../utils/base64toBlob';
import clearAllPopup from './clearAllPopup.vue';

export default {
  name: 'KnownProblemAnalysisWizard',
  components: {
    OpusSelect,
    DatePicker,
    BaseButton,
    Loader,
    clearAllPopup
  },
  data() {
    return {
      startDate: null,
      secondDate: null,
      tabs: [],
      activeItemList: {},
      loaderStatus: false,
      isKpaReady: false,
      isDownloadAvailable: false,
      fileStatusText: ''
    };
  },
  async created() {
    const options = await getKPAToolOptions();
    this.tabs = options;
    [this.activeItemList] = this.tabs;
  },
  methods: {
    navigateToTools() {
      this.$router.go(-1);
    },
    customLabel(option) {
      return `${option.itemName}`;
    },
    customFirstDate() {
      return this.startDate;
    },
    customSecondDate() {
      return this.secondDate;
    },
    setListForSelectedTab() {
      const activeCourseList = this.activeItemList;
      return activeCourseList;
    },
    closeClearallPopup() {
      $('#clear-all-popup').modal('hide');
    },
    clearAll() {
      $('#clear-all-popup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    resetValues() {
      this.loaderStatus = true;
      this.startDate = null;
      this.secondDate = null;
      [this.activeItemList] = this.tabs;
      this.isKpaReady = false;
      this.loaderStatus = false;
    },
    disabledBefore(date) {
      return date <= new Date(this.startDate);
    },
    async downloadResults() {
      this.loaderStatus = true;
      const payload = {
        current_page: 1,
        from: dayjs(this.startDate).format('YYYY-MM-DD'),
        product_code: this.activeItemList.itemName,
        result_per_page: 1000,
        to: dayjs(this.secondDate).format('YYYY-MM-DD')
      };
      const reportOption = 1;
      const response = await getKPAToolDataWithCode(payload, reportOption);
      if (response.status_code === 200 && response.data.kpa_device_events) {
        const blob = b64toBlob(
          response.data.kpa_device_events.attachment,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        saveAs(blob, `KPA_${this.startDate}-${this.secondDate}.xlsx`);
        this.$notify({
          type: 'success',
          title: 'Success',
          text: `${this.activeItemList.itemName} file has been downloaded`
        });
      } else if (
        response.status_code === 200 &&
        !response.data.data_available
      ) {
        this.fileStatusText = 'No result found';
        this.$notify({
          type: 'error',
          title: 'Error',
          text: `File not found for ${this.activeItemList.itemName}`
        });
        this.loaderStatus = false;
      }
      this.loaderStatus = false;
    },
    async searchResults() {
      this.loaderStatus = true;
      const payload = {
        current_page: 1,
        from: dayjs(this.startDate).format('YYYY-MM-DD'),
        product_code: this.activeItemList.itemName,
        result_per_page: 1000,
        to: dayjs(this.secondDate).format('YYYY-MM-DD')
      };
      const reportOption = 0;
      const response = await getKPAToolDataWithCode(payload, reportOption);
      if (response.status_code === 200) {
        this.isKpaReady = true;
        if (response.data.kpa_device_events.total_events > 0) {
          this.isDownloadAvailable = true;
        } else {
          this.isDownloadAvailable = false;
        }
      }
      this.loaderStatus = false;
    }
  },
  watch: {
    activeItemList() {
      this.setListForSelectedTab();
    },
  }
};
</script>

<style scoped>
.action-options {
  margin-top: 80px;
}
.d-contents {
  display: contents;
}
.options-card-container {
  padding: 40px 32px 0 32px !important;
}
.options-card-container .qno {
  width: 32px;
  height: 32px;
  text-align: center;
  color: #333333;
  border: 4px solid #d3d6d9;
  border-radius: 50%;
  -webkit-box-shadow: 1.62px 1.62px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 1.62px 1.62px 4px rgba(0, 0, 0, 0.25);
}
.options-card-container .question {
  margin-left: 18px;
  width: 100%;
}
.step-style {
  border: 5px solid #4c9e45 !important;
}

.dropdown-container,
.date-picker-container {
  padding: 20px 30px 0px 80px !important;
}

.dropdown-container >>> .multiselect__content-wrapper {
  max-height: 200px !important;
}

/* Date Picker Styles */
.mx-datepicker {
  width: 165px;
}
.mx-datepicker >>> .mx-input {
  border: 0.5px solid #000000;
  font-size: 15px;
  padding-left: 35px;
  line-height: 2.4;
}
.mx-datepicker >>> .mx-icon-calendar,
.mx-icon-clear {
  left: 10px;
}
</style>
