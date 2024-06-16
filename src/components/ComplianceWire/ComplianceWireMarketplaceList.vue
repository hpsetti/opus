<template>
  <div class="row mr-0">
    <div class="col-xs-12 mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center mb-20 mt-10">
        <span class="font-32 pl-15">Marketplace</span>
      </div>
    </div>
    <div class="col-xs-12">
      <template v-if="selectedListItems.length">
        <div
          v-if="selectedListItems.length > 1"
          class="col-xs-12 d-flex dashed-border mx-20 mb-20 mt-10"
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
        </div>
        <div
          class="col-xs-12 pl-20 mt-20"
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
import TrainingDetails from './ComplianceTrainingDetails.vue';
import Loader from '../UIComponents/Loader.vue';
import PreviewModal from './previewModal.vue';
import InfoModal from './InfoModal.vue';
import TrainingSignUpModal from './TrainingSignUpModal.vue';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
// import { getResourcesListById } from '../../apis/marketPlaceResources';
import { getMarketplaceComplianceWire } from '../../apis/complianceWire';
import cartMixin from '../NewMarketPlace/Mixins/shared';
import EventBus from '../../utils/event-bus';

export default {
  props: {
    userId: {
      type: [Number, String],
      required: true,
    },
  },
  mixins: [cartMixin],
  data() {
    return {
      tabs: {
        eLearning: 'eLearning',
        'Instructor Led': 'Instructor Led Courses',
      },
      trainingsInfo: {},
      selectedListItems: [],
      selectedTraining: {},
      videoInfo: {},
      loaderStatus: false,
      cartInfo: {},
      filteredIlt: {},
      operations: {
        type: 'select',
        listView: true,
        courseDetails: null,
        timeSlotsList: null,
      },
      tabCount: {
        all: 0,
        eLearning: 0,
        'Instructor Led': 0,
      },
      activeTabName: 'all',
      sortingType: 'name',
      orderBy: { name: 'asc', type: 'asc' },
    };
  },
  components: {
    AddRemoveCartPopup,
    Loader,
    InfoModal,
    PreviewModal,
    TrainingDetails,
    TrainingSignUpModal,
  },

  async created() {
    await this.getList();
    this.emitter.on('fetchCartList', async () => {
      await this.getList();
    });
  },
  watch: {
    activeTabName() {
      this.setListForSelectedTab();
    },
  },

  methods: {
    async getList() {
      this.loaderStatus = true;
      this.trainingsInfo = await getMarketplaceComplianceWire(this.userId);
      this.trainingDetails = this.trainingsInfo.filter((item) => item.course_status === 'Not Enrolled');
      this.setListForSelectedTab();
      this.loaderStatus = false;
    },

    showTimeSlots(cart) {
      this.operations = {
        ...this.operations,
        courseDetails: cart,
      };
      $('#compliance-signup-modal').modal({
        backdrop: 'static',
        keyboard: false,
      });
    },

    setListForSelectedTab() {
      this.selectedListItems = this.trainingDetails || [];
      this.sortItems();
    },

    navigateToMarketPlace() {
      this.$router.push('/market-place');
    },
    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] = this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
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
  },
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
