<template>
  <div class="">
    <div class="row RL_m-0">
      <div class="col-lg-12 col-md-12 RL_page_body">
        <div class="dropdown_li"></div>
        <ul class="list-inline RL_tabs_wrapper">
          <li
            class="RL_tabs RL_tabs_label cursor-pointer"
            :class="{ active: selectedTab === 'viewAll' }"
            @click.prevent="setSelectedTab('viewAll')"
          >
            View all ({{ (trainingData && trainingData.length) || 0 }})
          </li>
          <li
            class="RL_tabs RL_tabs_label cursor-pointer"
            :class="{
              active: selectedTab === dynamicTabs[selectedTrainingTab]
            }"
            @click.prevent="setSelectedTab(dynamicTabs[selectedTrainingTab])"
          >
            {{ selectedTrainingTab === 'eLearning' ? 'Resume' : 'Purchased' }}
            ({{
              counts[selectedTrainingTab][dynamicTabs[selectedTrainingTab]]
            }})
          </li>
          <li
            v-if="selectedTrainingTab === 'eLearning'"
            class="RL_tabs RL_tabs_label cursor-pointer"
            :class="{ active: selectedTab === 'Complete' }"
            @click.prevent="setSelectedTab('Complete')"
          >
            Complete ({{ counts[selectedTrainingTab]['Complete'] }})
          </li>
        </ul>
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 tab-wrapper">
            <div class="tab-content catalog-list">
              <div v-if="filteredTraining.length">
                <catalog-widget
                  v-for="trainingDetails in filteredTraining"
                  :userId="userId"
                  :key="trainingDetails.course_id"
                  :mainTab="selectedTrainingTab"
                  :trainingInfo="trainingDetails"
                  :keyValue="trainingDetails.course_id"
                  @setSelectedTraining="setTraining"
                  @setSelectedPreview="setPreview"
                  @setSelectedIltTraining="setIltTraining"
                  @setCartInfo="setCartInfo"
                ></catalog-widget>
              </div>
              <div
                v-if="!filteredTraining.length && !loaderStatus"
                class="col-xs-12 font-18 mt-20"
              >
                {{ noDataMessage[selectedTab] }}
                <router-link to="/market-place/add-service/0">
                  Marketplace
                </router-link>
                to purchase your Trainings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <info-modal
      :loader="loaderStatus"
      :trainingInfo="selectedTraining"
      :userId="userId"
      :accountId="accountId"
      @setCartInfo="setCartInfo"
    ></info-modal>
    <training-sign-up-modal
      :userId="userId"
      :operations="operations"
      @setCartInfo="setCartInfo"
    ></training-sign-up-modal>
    <preview-modal :trainingInfo="selectedTraining"></preview-modal>
    <loader :loadingStatus="loaderStatus"></loader>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
  </div>
</template>
<script>
import $ from 'jquery';
import cloneDeep from 'lodash/cloneDeep';
import CatalogWidget from './CatalogWidget.vue';
import { getTrainingData } from '../../apis/lmsTraining';
import infoModal from './InfoModal.vue';
import previewModal from './previewModal.vue';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import Loader from '../UIComponents/Loader.vue';
import TrainingSignUpModal from './TrainingSignUpModal.vue';
import { getInstructorTrainingList } from '../../apis/instructorLedTraining';
import { noDataMessage } from './constants';
import { removeFromCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';

export default {
  props: ['accountId', 'userId', 'roleId', 'selectedTrainingTab'],
  data() {
    return {
      cartInfo: {},
      selectedCartItem: {},
      trainingData: [],
      selectedTab: 'viewAll',
      filteredTraining: [],
      selectedIltCourse: {},
      operations: {
        type: 'select',
        listView: true,
        courseDetails: null,
        timeSlotsList: null
      },
      selectedTraining: {},
      loaderStatus: false,
      resumeCourses: [],
      counts: {
        eLearning: {
          Incomplete: 0,
          Complete: 0
        },
        instructorLed: {
          Enrolled: 0
        }
      },
      completedCourses: [],
      noDataMessage,
      dynamicTabs: {
        eLearning: 'Incomplete',
        instructorLed: 'Enrolled'
      }
    };
  },
  components: {
    AddRemoveCartPopup,
    CatalogWidget,
    infoModal,
    previewModal,
    Loader,
    TrainingSignUpModal
  },
  watch: {
    selectedTrainingTab: {
      handler(selectedMainTab) {
        if (selectedMainTab) {
          this.filteredTraining = [];
          this.selectedTab = 'viewAll';
          this.getAllTrainingData();
        }
      },
      immediate: true
    }
  },
  methods: {
    /* open addRemoveCart popup after setting cart info */
    setCartInfo(cartDetails) {
      this.cartInfo = { ...cartDetails.cartInfo };
      this.selectedCartItem = cartDetails.item;
      if ($('#modal_video').hasClass('in') && this.cartInfo.type === 'add') {
        $('#modal_video').modal('hide');
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
      // if (this.cartInfo.type === 'add') {
      //   // this.emitter.emit()
      //   this.getAllTrainingData();
      // }
    },

    closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.getAllTrainingData();
    },

    async removeFromCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const res = await removeFromCart(
        this.selectedCartItem.cart_status.cart_id
      );
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if ($('#modal_video').hasClass('in')) {
          $('#modal_video').modal('hide');
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        this.getAllTrainingData();
        this.emitter.emit('cart-items-updated');
      }
    },

    setIltTraining(courseDetails) {
      this.operations = { ...this.operations, courseDetails };
      // this.selectedIltCourse = { ...courseDetails };
    },
    setSelectedTab(tab) {
      if (this.selectedTab !== tab) {
        this.selectedTab = tab;
        this.setFilteredTabListData();
      }
    },
    setTraining(training) {
      this.selectedTraining = training;
    },
    setPreview(training) {
      this.selectedTraining = training;
    },
    async getAllTrainingData() {
      this.loaderStatus = true;
      this.setDefaultCountValuesForTabs();
      if (this.selectedTrainingTab === 'eLearning') {
        const response = await getTrainingData();
        this.$emit('setElearningLatestActivity', {
          eLearningProgress: response.lms_course_progress,
          defaultValue: response.lms_user_course_list[0]
        });
        this.trainingData = response.lms_user_course_list;
      } else this.trainingData = await getInstructorTrainingList();
      this.setFilteredTabListData();
      this.setCountForTabs();
      this.loaderStatus = false;
    },

    setDefaultCountValuesForTabs() {
      this.counts = {
        eLearning: {
          Incomplete: 0,
          Complete: 0
        },
        instructorLed: {
          Enrolled: 0
        }
      };
    },

    setCountForTabs() {
      Object.keys(this.counts[this.selectedTrainingTab]).forEach((key) => {
        this.counts[this.selectedTrainingTab][key] = this.trainingData.filter(
          (item) => item.course_status === key
        ).length;
      });
    },

    setFilteredTabListData() {
      if (this.selectedTab === 'viewAll') {
        this.filteredTraining = cloneDeep(this.trainingData);
      } else {
        this.filteredTraining = this.trainingData.filter(
          (item) => item.course_status === this.selectedTab
        );
      }
    }
  }
};
</script>
<style scoped>
.catalog-list {
  margin-left: 30px;
}
.dropdown_li {
  float: right;
  margin-left: 25px;
}
.dropdown_label {
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}
.custom-dropdown >>> .el-input__inner {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61 !important;
  border: 1px solid #828282 !important;
  border-radius: 20px;
}
.custom-dropdown >>> .el-select {
  width: 100%;
}
.option_check {
  display: none;
  float: right;
  color: #4c9e45;
  margin-top: 10px;
}
.el-select-dropdown__item.selected > .options {
  color: #0b3c61;
}
.el-select-dropdown__item.selected > .option_check {
  display: block;
}
.el-select-dropdown__item.selected {
  color: #0b3c61;
}
.RL_m-0 {
  margin: 0px;
}
.pl-0 {
  padding-left: 0px;
}
.RL_page_body {
  padding: 8px 35px 35px 0px;
}
.RL_pt-16 {
  padding-top: 16px !important;
}
.RL_pt-20 {
  padding-top: 20px !important;
}
.RL_mr-34 {
  margin-right: 34px !important;
}
.RL_tile_footer {
  font-family: Nunito;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #000000;
}
.RL_temp_heading {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
  padding-top: 10px;
}
.RL_sub_heading {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
}
.RL_tab_sub_heading {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.RL_tabs_label {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
}
.RL_tabs_label_icon {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.RL_tabs.active > .RL_tabs_label {
  font-weight: bold;
}
.RL_tabs_wrapper > .RL_tabs.active {
  border-bottom: 8px solid #4c9e45;
  margin-bottom: -4px;
}
.RL_tabs {
  padding: 0px 0px 6px 0px;
  margin-right: 50px;
}
.RL_tabs_wrapper {
  border-bottom: 0.5px solid #bdbdbd;
  margin-left: 30px;
  /* margin-top: 28px; */
}
@media screen and (min-width: 1360px) {
  .tab-wrapper {
    padding-left: 0px;
  }
}
@media (min-width: 1024px) and (max-width: 1367px) {
  .RL_tabs {
    margin-right: 25px;
  }
  .dropdown_li {
    margin-left: 8px;
  }
  .custom-dropdown >>> .el-input__inner {
    width: 175px;
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .RL_tabs {
    margin-right: 16px;
  }
  .dropdown_li {
    margin-left: 0px;
  }
  .RL_tabs_label {
    font-size: 16px;
    line-height: 18px;
  }
  .RL_tabs_label_icon {
    width: 16px;
    height: 16px;
  }
}
@media (min-width: 1368px) and (max-width: 1510px) {
  .RL_tabs {
    margin-right: 30px;
  }
  .dropdown_li {
    margin-left: 16px;
  }
}
@media (min-width: 767px) and (max-width: 1023px) {
  .tabs_design {
    margin-top: 10px;
  }
}
@media screen and (max-width: 767px) {
  .RL_tabs {
    margin-top: 10px;
    margin-right: 20px;
  }
}
</style>
