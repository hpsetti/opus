<template>
  <div class="right-header">
    <template v-if="!breadcrumb">
      <div class="col-sm-12 col-xs-12 col-md-12">
        <div class="text-h4 pt-20 black-2 first-lette-cap pl-5">
          {{ subheader }}
          <div
            class="mr-20 text-subtitle-1 blue-3 download-list-btn float-right d-flex"
          >
            <div v-if="subheader === 'Purchase History'">
              <p
              :class="purchaseHistory?'':'text-disabled download-disabled'"
                class="mt-5 cursor-pointer"
                @click="getDownloadFile"
                v-if="displayDownloadBtn"
              >
                <img
                  class="pr-10"
                  src="/static/images/icons/download_icon.svg"
                />
                <span class="pr-20">Download Full List</span>
              </p>
            </div>
            <img
              class="pl-10 cursor-pointer"
              src="/static/images/icons/close_icon.svg"
              @click="$emit('closepopup', 'closeBasePopup')"
            />
          </div>
        </div>
        <hr />
      </div>
      <!-- <div v-if="displaySubheader">
        <div class="subHeader col-md-12 first-lette-cap hide_xs">
          {{ subheader }}
        </div>
        <div class="col-me-4 col-sm-4 col-xs-7"></div>
      </div> -->
    </template>
    <template v-else>
      <div class="col-sm-12 col-xs-12 col-md-12">
        <div class="header-team first-lette-cap">
          <span class="hide_xs">{{ subheader }}</span>
          <span class="first-lette-cap">
            <img
              src="/static/images/icons/chevron_right.svg"
              class="hide_xs"
              width="24px"
              height="24px"
            />
            {{ breadcrumb }}
          </span>
          <i
            class="el-icon-close icon-close"
            @click="$emit('emit-close-event')"
          ></i>
        </div>
      </div>
    </template>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import FileSaver from 'file-saver';
import dayjs from 'dayjs';
import EventBus from '../../utils/event-bus';
import b64toBlob from '../../utils/base64toBlob';
import { downloadPurchaseHistory } from '../../apis/profile';
import Loader from '../UIComponents/Loader.vue';

export default {
  props: [
    'subheader',
    'header',
    'breadcrumb',
    'displaySubheader',
    'roleId',
    'displayDownloadBtn'
  ],
  data() {
    return {
      loaderStatus: false,
      subPagesList: ['notifications'],
      subPage: '',
      purchaseHistory: false,
    };
  },
  components: {
    Loader
  },
  mounted() {
    this.emitter.on('purchaseHistoryDetailsData', async(e) => {
      if(e > 0) {
        this.purchaseHistory = true;
      }else {
        this.purchaseHistory = false;
      }
    })
  },
  methods: {
    changePage() {
      this.$emit('changePage', this.subPage);
    },
    capitalize(value) {
      if (!value) return '';
      return (
        value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
      );
    },
    async getDownloadFile() {
      this.loaderStatus = true;
      if(this.purchaseHistory) {
        const response = await downloadPurchaseHistory();
        const blob = b64toBlob(
          response,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        const currentDate = dayjs().format('DD_MMM_YYYY');
        FileSaver.saveAs(blob, `${currentDate}_PurchaseHistory.xlsx`);
      }
      this.loaderStatus = false;
    }
  },
  watch: {
    subheader() {
      this.subPage = this.subheader;
    }
  }
};
</script>
<style scoped>
.header-team {
  padding: 15px 0px 0px 0px;
  font-size: 28px;
  line-height: 33px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
}
.icon-close {
  color: #828282 !important;
  float: right;
  cursor: pointer;
}
.subHeader {
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: #0b3c61;
  margin-top: 10px;
  margin-bottom: 15px;
}
.mb-0 {
  margin-bottom: 0px;
}
.first-lette-cap::first-letter {
  text-transform: capitalize;
}
.custom-dropdown >>> .el-input__inner {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61 !important;
  border: 0.5px solid #828282 !important;
  border-radius: 20px;
}
.custom-dropdown >>> .el-select {
  width: 100%;
}
.el-select-dropdown__item.selected {
  color: #0b3c61;
}
.custom-dropdown {
  display: none;
  margin-top: 10px;
  margin-bottom: 15px;
}
.download-disabled{
  cursor: not-allowed;
}
@media screen and (max-width: 767px) {
  .hide_xs {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .subHeader {
    display: none;
  }
  .custom-dropdown {
    display: block !important;
  }
}
@media screen and (max-width: 374px) {
  .header-team {
    font-size: 25px;
    line-height: 25px;
  }
}
</style>
