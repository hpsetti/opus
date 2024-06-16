<template>
  <div class="row mr-0">
    <div
      class="mr-0 menu__container xs-flex-column d-flex align-items-center justify-content-between mb-10"
      :class="
        windowWidth <= 767
          ? 'align-items-start flex-direction-column row-gap-20'
          : ''
      "
    >
      <div class="p-0 d-flex align-items-center">
        <span class="font-32">Marketplace</span>
      </div>
      <opus-select
        style="width: 327px"
        v-model="trainingData.available"
        :options="trainingsData.available"
        trackBy="id"
        :custom-label="customLabel"
      >
      </opus-select>
    </div>
    <!-- Tabs List -->
    <div class="col-xs-12 marketplace-training--container">
      <div class="col-xs-12 pl-20 mb-15"></div>
      <template v-if="selectedListItems.length">
        <div
          v-if="selectedListItems.length > 1 && windowWidth > 767"
          class="col-xs-12 d-flex dashed-border ml-0 mb-20 mt-10 pl-0"
        >
          <div
            class="col-xs-6 p-0 xs-flex-column d-flex align-items-center pl-15"
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
          class="col-xs-12 marketplace-training--tab p-0"
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
import TrainingDetails from '../NewMarketPlace/Trainings/TrainingDetails.vue';
import Loader from '../UIComponents/Loader.vue';
import PreviewModal from './previewModal.vue';
import InfoModal from './InfoModal.vue';
import TrainingSignUpModal from './TrainingSignUpModal.vue';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import { getResourcesListById } from '../../apis/marketPlaceResources';
import cartMixin from '../NewMarketPlace/Mixins/shared';

export default {
  props: {
    userId: {
      type: [Number, String],
      required: true
    }
    /* enrolledTrainings: {
      type: Array,
      default: () => [],
    },
    availableILTs: {
      type: Array,
      default: () => [],
    }, */
  },
  mixins: [cartMixin],
  data() {
    return {
      tabs: {
        eLearning: 'eLearning',
        'Instructor Led': 'Instructor Led Courses'
      },
      windowWidth: window.innerWidth,
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
      trainingsInfo: {},
      isConsultingPurchased: false,
      consultingObj: {},
      selectedListItems: [],
      selectedTraining: {},
      videoInfo: {},
      loaderStatus: false,
      cartInfo: {},
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
      activeTabName: 'all',
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
    // activeTabName() {
    //   this.setListForSelectedTab();
    // },
    'trainingData.available.name': {
      handler() {
        this.setListForSelectedTab();
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async getList() {
      this.trainingsInfo = await getResourcesListById(2, this.userId);
      const finalData = this.trainingsInfo.item_list.map((obj) => {
        const planType = obj.plan_type;
          if (!obj[planType].cart_status) return obj;
          if (obj[planType].cart_status.purchase_status === 'REMOVE_FROM_CART') obj[planType].cart_status.purchase_status = 'GO_TO_CART';
          return obj;
      });
      this.filteredList = finalData;
      this.loaderStatus = true;
      this.setListForSelectedTab();
      this.setCountForTabs();
      this.loaderStatus = false;
      this.trainingsData.available = this.trainingTypes;
    },
    showTimeSlots(cart) {
      this.operations = {
        ...this.operations,
        courseDetails: cart[cart.plan_type]
        // courseDetails: cart,
      };
      $('#training-signup-modal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    setListForSelectedTab() {
      if (this.trainingData.available.name === 'View all') {
        this.isConsultingPurchased = this.trainingsInfo.item_list
          .filter(course => course.plan_type === 'Consulting')
          .map(course => course.Consulting.enrolled);
          const consultingData = this.trainingsInfo.item_list
          .filter(course => course.plan_type === 'Consulting');
          this.consultingObj = consultingData[0].Consulting;
          if (this.isConsultingPurchased[0]) {
            this.selectedListItems = this.trainingsInfo.item_list.filter(course => course.type !== 'Consulting');
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
  }
};
</script>

<style scoped>
.content-padding {
  padding: 30px 15px 24px 50px;
}

.subscription-options,
.other-info {
  background: #ecf7fc;
}

.menu__container {
  padding-left: 18px;
  padding-right: 8px;
}

.marketplace-training--container {
  padding-right: 21px;
  margin-left: 13px;
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

@media screen and (min-width: 757px) {
  .sm-pl-50 {
    padding-left: 50px;
  }
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .content-padding {
    padding: 30px 15px 24px 30px;
  }
}
</style>
