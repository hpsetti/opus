<template>
  <div class="row mr-0">
    <div class="col-xs-12 welcome-banner mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
        <img
          @click="navigateToMarketPlace"
          class="cursor-pointer"
          src="/static/images/icons/chevron_left_white.svg"
          alt=""
        />
        <div class="welcome-common-header fw-300 pl-20">Trainings</div>
      </div>
      <div class="col-xs-12 tools-desc col-xs-12 col-sm-6 font-14 fw-400 pl-30">
        Self-paced eLearning and live instructor-led courses enable you to
        customize your learning timeline and path. Take a single course or earn
        your Applying HFE to Medical Technology Certificate.
      </div>
    </div>
    <div
      class="col-xs-12 p-30 mb-10 subscription-options content-padding mb-10"
    >
      <div class="col-xs-12 featured-title pl-20">Featured Training</div>
      <div class="col-xs-12 col-sm-6 pl-20 mb-15">
        This training explains how KPAs fit into the HFE process and describes
        the steps to scope, perform, and report the results of a KPA.
      </div>
      <template v-if="trainingsInfo.featured_list">
        <div
          class="col-xs-12 pl-20"
          v-for="trainingDetails in trainingsInfo.featured_list"
          :key="trainingDetails.plan_id"
        >
        <div class="purchased-tiles--container pl-10">
            <div
              v-if="windowWidth > 850"
              class="col-xs-12 d-flex mb-10 mt-15 pl-0 pr-0 dashed-border"
            >
              <div
                class="col-xs-10 xs-flex-column p-0 d-flex align-items-center pl-15"
              >
                <span class="text-primary cursor-pointer pr-10 sort-label">
                  Name
                </span>
              </div>
              <div
                class="col-xs-2 p-0 xs-flex-column d-flex align-items-center date--filter justify-content-end"
                v-if="trainingDetails.purchase_date"
              >
                <span class="text-primary cursor-pointer pr-10"
                  >Purchased date</span
                >
              </div>
            </div>
            <training-details
              :trainingDetails="trainingDetails"
              :userId="userId"
              @setSelectedTrainingItem="setSelectedTrainingItem"
              @setCartInfo="setCartInfo($event, 'trainings')"
            />
          </div>
        </div>
      </template>
    </div>
    <div class="col-xs-12 content-padding">
      <div
        class="col-xs-12 sm-pl-15 mb-20 d-flex column-gap-10p xs-flex-column"
      >
        <img
          class="flex-desktop"
          src="/static/images/newMarketplace/trainings_desktop.svg"
          alt=""
        />
        <div class="d-flex flex-direction-column flex-50">
          <div class="header-main mt-10 mb-20">eLearning and live courses</div>
          <div class="fw-300 text-secondary">
            The OPUS training library includes digital training courses on a
            number of key HFE topics intended for professionals who desire a
            working knowledge of HFE. Completing these courses will yield the
            perspective and knowledge necessary to apply HFE to the design and
            development of medical technology. The training is based on
            materials presented over many years to corporate audiences, as well
            as taught in university courses.
          </div>
          <div class="fw-300 text-secondary pr-15">
            <p class="m-0">Validity - 1 year access</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Tabs List -->
    <div class="col-xs-12 pl-30">
      <div
        class="col-xs-12 pl-20 d-flex justify-content-between xs-flex-column-marketplace"
        :class="{ 'mb-40': selectedListItems.length <= 1 }"
      >
        <div class="text-h3 black-2">Marketplace</div>
        <opus-select
          class="training-select"
          v-model="trainingData.available"
          :options="trainingsData.available"
          trackBy="id"
          :custom-label="customLabel"
        >
        </opus-select>
      </div>
      <template v-if="selectedListItems.length">
        <div
          v-if="selectedListItems.length > 1"
          class="col-xs-12 d-flex dashed-border mx-20 mb-20 mt-10 xs-display-none"
        >
          <div
            class="col-xs-6 p-0 xs-flex-column d-flex align-items-center"
            @click="setSorting('name')"
          >
            <span class="text-primary cursor-pointer pr-10"> Name </span>
            <img
              :class="{ desc: orderBy.name === 'desc' }"
              class="sorting-icon cursor-pointer"
              src="/static/images/icons/caret_up.svg"
              alt=""
            />
          </div>
          <!-- <div
            class="col-xs-6 p-0 xs-flex-column d-flex align-items-center"
            @click="setSorting('type')"
          >
            <span
              class="text-primary cursor-pointer pr-10"
            >
              Type
            </span>
            <img
              :class="{ 'desc' : orderBy.type === 'desc' }"
              class="sorting-icon cursor-pointer"
              src="/static/images/icons/sort.svg"
              alt=""
            />
          </div> -->
        </div>

        <div
          class="col-xs-12 pl-20"
          v-for="(trainingDetails, index) in selectedListItems"
          :key="index"
        >
          <training-details
            :userId="userId"
            :trainingDetails="trainingDetails"
            @setSelectedTrainingItem="setSelectedTrainingItem"
            @onShowTimeSlots="showTimeSlots"
            @setCartInfo="setCartInfo($event, 'trainings')"
          />
        </div>
      </template>
      <div
        v-if="!selectedListItems.length && !loaderStatus"
        class="col-xs-12 mt-20 mb-20"
      >
        <div
          class="col-xs-12 col-sm-10 col-md-8 d-flex col-gap-10 align-items-start"
        >
          <img src="/static/images/purchased_resources.svg" alt="" />
          <div class="col-xs-12 d-flex flex-direction-column row-gap-10">
            <span class="fw-400 purchased-text"
              >You currently have full access to all available resources</span
            >
            <span class="fw-300 font-18"
              >We will notify you of any new resources as they become available
              for purchase</span
            >
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
    <preview-modal :trainingInfo="videoInfo"></preview-modal>
    <info-modal
      :loader="loaderStatus"
      :trainingInfo="selectedTraining"
      :userId="userId"
      @setCartInfo="setCartInfo($event, 'trainings')"
    ></info-modal>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart('trainings')"
    ></add-remove-cart-popup>
    <training-sign-up-modal
      @setCartInfo="setCartInfo($event, 'trainings')"
      :operations="operations"
      :userId="userId"
    ></training-sign-up-modal>
  </div>
</template>

<script>
import $ from 'jquery';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
import TrainingDetails from './TrainingDetails.vue';
import Loader from '../../UIComponents/Loader.vue';
import PreviewModal from '../../Training/previewModal.vue';
import InfoModal from '../../Training/InfoModal.vue';
import TrainingSignUpModal from '../../Training/TrainingSignUpModal.vue';
import AddRemoveCartPopup from '../Modals/AddRemoveCartPopup.vue';
import { getResourcesListById } from '../../../apis/marketPlaceResources';
import cartMixin from '../Mixins/shared';

export default {
  props: ['userId'],
  mixins: [cartMixin],
  data() {
    return {
      tabs: {
        eLearning: 'eLearning',
        'Instructor Led': 'Instructor Led Courses'
      },
      selectedListItems: [],
      selectedTraining: {},
      videoInfo: {},
      loaderStatus: false,
      windowWidth: window.innerWidth,
      cartInfo: {},
      isConsultingPurchased: false,
      consultingObj: {},
      operations: {
        type: 'select',
        listView: true,
        courseDetails: null,
        timeSlotsList: null
      },
      tabCount: {
        all: 0,
        eLearning: 0,
        'Instructor Led': 0
      },
      trainingTypes: [
        {
          id: 0,
          name: 'View all',
          no_of_documents: 0,
          sequence: 0
        },
        {
          id: 1,
          name: 'eLearning',
          no_of_documents: 0,
          sequence: 1
        },
        {
          id: 2,
          name: 'Instructor Led',
          no_of_documents: 0,
          sequence: 2
        }
      ],
      trainingData: {
        available: {
          id: 0,
          name: 'View all',
          no_of_documents: 0,
          sequence: 0
        }
      },
      trainingsData: {
        available: []
      },
      activeTabName: 'all',
      trainingsInfo: {},
      sortingType: 'name',
      orderBy: { name: 'asc', type: 'asc' }
    };
  },
  components: {
    AddRemoveCartPopup,
    Loader,
    InfoModal,
    PreviewModal,
    TrainingDetails,
    TrainingSignUpModal,
    OpusSelect
  },

  async created() {
    await this.getList();
  },

  watch: {
    'trainingData.available.name': {
      handler() {
        this.setListForSelectedTab();
      },
      immediate: true
    }
  },

  methods: {
    async getList() {
      this.loaderStatus = true;
      const resId = this.$route.params.id ? Number(this.$route.params.id) : 2;
      this.trainingsInfo = await getResourcesListById(resId, this.userId);
      const finalData = this.trainingsInfo.item_list.map((obj) => {
        const planType = obj.plan_type;
        if (!obj[planType].cart_status) return obj;
        if (obj[planType].cart_status.purchase_status === 'REMOVE_FROM_CART')
          obj[planType].cart_status.purchase_status = 'GO_TO_CART';
        return obj;
      });
      const finalFeatureData = this.trainingsInfo.featured_list.map((obj) => {
        const planType = obj.plan_type;
        if (!obj[planType].cart_status) return obj;
        if (obj[planType].cart_status.purchase_status === 'REMOVE_FROM_CART')
          obj[planType].cart_status.purchase_status = 'GO_TO_CART';
        return obj;
      });
      this.trainingsInfo.item_list = finalData;
      this.trainingsInfo.featured_list = finalFeatureData;
      this.setListForSelectedTab();
      this.setCountForTabs();
      this.loaderStatus = false;
      this.trainingsData.available = this.trainingTypes;
    },

    showTimeSlots(cart) {
      this.operations = {
        ...this.operations,
        courseDetails: cart[cart.plan_type]
      };
      $('#training-signup-modal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    setListForSelectedTab() {
      if (this.trainingData.available.name === 'View all') {
        this.isConsultingPurchased = this.trainingsInfo.item_list
          .filter((course) => course.plan_type === 'Consulting')
          .map((course) => course.Consulting.enrolled);
        const consultingData = this.trainingsInfo.item_list.filter(
          (course) => course.plan_type === 'Consulting'
        );
        this.consultingObj = consultingData[0].Consulting;
        if (this.isConsultingPurchased[0]) {
          this.selectedListItems = this.trainingsInfo.item_list.filter(
            (course) => course.type !== 'Consulting'
          );
        } else {
          this.selectedListItems = this.trainingsInfo.item_list || [];
        }
      } else {
        this.isConsultingPurchased = this.trainingsInfo.item_list
          .filter((course) => course.plan_type === 'Consulting')
          .map((course) => course.Consulting.enrolled);
        if (this.isConsultingPurchased[0]) {
          this.selectedListItems = this.trainingsInfo.item_list.filter(
            (item) => {
              if (this.trainingData.available.name === 'eLearning') {
                return ['eLearning'].includes(item.plan_type);
              }
              return item.plan_type === this.trainingData.available.name;
            }
          );
        } else {
          this.selectedListItems = this.trainingsInfo.item_list.filter(
            (item) => {
              if (this.trainingData.available.name === 'eLearning') {
                return ['eLearning', 'Consulting'].includes(item.plan_type);
              }
              return item.plan_type === this.trainingData.available.name;
            }
          );
        }
      }
      this.sortItems();
    },

    setCountForTabs() {
      this.isConsultingPurchased = this.trainingsInfo.item_list
        .filter((course) => course.plan_type === 'Consulting')
        .map((course) => course.Consulting.enrolled);
      const consultingData = this.trainingsInfo.item_list.filter(
        (course) => course.plan_type === 'Consulting'
      );
      this.consultingObj = consultingData[0].Consulting;
      if (this.isConsultingPurchased[0]) {
        this.selectedListItems = this.trainingsInfo.item_list.filter(
          (course) => course.type !== 'Consulting'
        );
      } else {
        this.selectedListItems = this.trainingsInfo.item_list || [];
      }
      const counts = Object.keys(this.tabs).reduce((acc, value) => {
        acc[value] = this.selectedListItems.filter((item) => {
          if (value === 'eLearning')
            return ['eLearning', 'Consulting'].includes(item.plan_type);
          return item.plan_type === value;
        }).length;
        return acc;
      }, {});
      this.tabCount = {
        'View all': this.selectedListItems.length,
        ...counts
      };
      this.trainingTypes.forEach((ele) => {
        ele.no_of_documents = this.tabCount[ele.name];
      });
      if (this.isConsultingPurchased[0]) {
        this.trainingData.available.no_of_documents =
          this.trainingsInfo.item_list.length - 1;
      } else {
        this.trainingData.available.no_of_documents =
          this.trainingsInfo.item_list.length;
      }
    },

    navigateToMarketPlace() {
      this.$router.push('/market-place');
    },

    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] =
        this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
      this.sortItems();
    },
    sortItems() {
      const list = JSON.parse(JSON.stringify(this.selectedListItems));
      list.sort((a, b) => this.sortList(a, b));
      this.selectedListItems = list;
    },
    sortList(a, b) {
      if (this.sortingType === 'name') {
        if (this.orderBy.name === 'asc') {
          return a.plan_name.toLowerCase() > b.plan_name.toLowerCase() ? 1 : -1;
        }
        return a.plan_name.toLowerCase() > b.plan_name.toLowerCase() ? -1 : 1;
      }
      if (this.orderBy.type === 'asc') {
        return a.plan_type.toLowerCase() > b.plan_type.toLowerCase() ? 1 : -1;
      }
      return a.plan_type.toLowerCase() > b.plan_type.toLowerCase() ? -1 : 1;
    },
    customLabel(option) {
      // if (option.name === 'View all') return option.name;
      return `${option.name} (${option.no_of_documents})`;
    }

    // setTab(tab) {
    //   if (tab !== this.activeTabName) {
    //     this.activeTabName = tab;
    //     this.setListForSelectedTab();
    //   }
    // },
  }
};
</script>

<style scoped>
.welcome-banner {
  background: url('/static/images/newMarketplace/welcomebanner.svg') no-repeat;
  background-size: cover;
}

.content-padding {
  padding: 30px 15px 24px 50px;
}

.subscription-options,
.other-info {
  background: #ecf7fc;
}

.column-gap-10p {
  column-gap: 10%;
}

.no-data-text {
  color: #d3d6d9;
}

.flex-50 {
  flex: 0 0 50%;
}

.training-select >>> .opus-multiselect.multiselect,
.opus-multiselect.multiselect.sm {
  min-width: 280px;
  max-width: 327px;
}
/* .align-items-start {
  align-items: flex-start;
}

.purchased-text {
  font-size: 32px;
  line-height: 44px;
  color: #828282;
} */

@media screen and (min-width: 757px) {
  .sm-pl-15 {
    padding-left: 15px;
  }
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }
  .xs-display-none {
    display: none;
  }

  .xs-flex-column-marketplace {
    margin-bottom: 20px;
  }
  .content-padding {
    padding: 30px 15px 24px 30px;
  }
}

@media screen and (max-width: 600px) {
  .xs-flex-column-marketplace {
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
