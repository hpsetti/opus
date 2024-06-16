<template>
  <div class="purchased-trainings">
    <div
      class="d-flex justify-content-between align-items-center dropdown--container"
      :class="
        windowWidth <= 767
          ? 'align-items-start flex-direction-column col-30-gap'
          : ''
      "
    >
      <div>
        <h3 class="font-32">Purchased</h3>
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
    <div class="purchased-tiles--container pl-10">
      <div
        v-if="activeCourseList.length > 0 && windowWidth > 850"
        class="col-xs-12 d-flex mb-20 mt-10 dashed-border"
      >
        <div
          class="col-xs-5 xs-flex-column p-0 d-flex align-items-center pl-15"
          @click="setSorting('name')"
        >
          <span class="text-primary cursor-pointer pr-10 sort-label">
            Name
          </span>
          <img
            :class="{ desc: orderBy.name === 'desc' }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'name'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
          />
        </div>
        <div
          class="col-xs-5 xs-flex-column d-flex align-items-center"
          @click="setSorting('status')"
        >
          <template v-if="trainingData.available.name !== 'instructorLed'">
            <span class="text-primary cursor-pointer pr-10 sort-label">
              Status
            </span>
            <img
              :class="{ desc: orderBy.status === 'desc' }"
              class="sorting-icon cursor-pointer"
              :src="
                sortingType === 'status'
                  ? '/static/images/icons/caret_up.svg'
                  : '/static/images/icons/caret_up_light.svg'
              "
              alt=""
            />
          </template>
        </div>
        <div
          class="col-xs-2 p-0 xs-flex-column align-items-center date--filter align-right mr-10"
          @click="setSorting('date')"
        >
          <span class="text-primary cursor-pointer pr-10">Purchased date</span>
          <img
            :class="{ desc: orderBy.date === 'desc' }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'date'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
            v-if="activeCourseList.length > 1"
          />
        </div>
      </div>
      <div v-if="activeCourseList.length" class="col-xs-12 p-0">
        <div
          v-for="training in activeCourseList"
          :key="training.plan_id"
          class="col-xs-12 p-0 purchased-training-wrapper"
        >
          <purchased-training
            :training="training"
            :userId="userId"
            :account_id="account_id"
            @setElearning="setElearningDetails"
          />
        </div>
      </div>
      <div
        v-if="!activeCourseList.length"
        class="col-xs-12 d-flex col-gap-20 align-items-center mt-20"
      >
        <img src="/static/images/icons/single_document.svg" alt="" />
        <div>
          <div class="not-purchased no-data-color">
            Start building your library!
          </div>
          <div class="mt-5">
            <span class="no-data-color"
              >Check out offered courses below or within
            </span>
            <a class="cursor-pointer" @click.prevent="navigateToMarketPlace"
              >Marketplace</a
            >
            <span class="no-data-color"> to purchase more courses</span>
          </div>
        </div>
      </div>
      <view-learning
        :trainingDetails="trainingDetails"
        :userId="userId"
      ></view-learning>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
import PurchasedTraining from './PurchasedTraining.vue';
import viewLearning from './viewLearning.vue';

export default {
  name: 'PurchasedTrainings',
  components: { PurchasedTraining, viewLearning, OpusSelect },
  props: {
    account_id: {
      type: [String, Number],
      default: ''
    },
    userId: {
      type: [String, Number],
      default: ''
    },
    eLearning: {
      type: Array,
      default: () => []
    },
    ilt: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // NEW DATA
      activeCourseTab: 'View all',
      trainingDetails: null,
      courseTabs: {
        eLearning: 'eLearnings',
        'Instructor Led': 'Instructor Led Courses'
      },
      courseTabCount: {
        'View all': 0,
        eLearning: 0,
        'Instructor Led': 0
      },
      windowWidth: window.innerWidth,
      activeCourseList: [],
      sortingType: 'name',
      orderBy: { name: 'asc', status: 'asc' },
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
      }
    };
  },
  mounted() {
    this.setActiveCourseList();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  watch: {
    // activeCourseTab: {
    //   handler() {
    //     this.setActiveCourseList();
    //   },
    //   immediate: true
    // },
    'trainingData.available.name': {
      handler() {
        this.setActiveCourseList();
      },
      immediate: true
    },
    eLearning() {
      this.setActiveCourseList();
    },
    ilt() {
      this.setActiveCourseList();
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    setElearningDetails(trainingDetails) {
      this.trainingDetails = trainingDetails;
      $('#view-eLearning-modal').modal('show');
    },
    setTab(tab) {
      this.activeCourseTab = tab;
    },
    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] =
        this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
      this.setActiveCourseList();
    },
    setActiveCourseList() {
      this.courseTabCount.eLearning = this.eLearning.length;
      this.courseTabCount['Instructor Led'] = this.ilt.length;
      this.courseTabCount['View all'] =
        this.courseTabCount.eLearning + this.courseTabCount['Instructor Led'];
      let activeCourseList = [];
      switch (this.trainingData.available.name) {
        case 'View all':
          activeCourseList = [...this.eLearning, ...this.ilt];
          break;
        case 'eLearning':
          activeCourseList = this.eLearning;
          break;
        case 'Instructor Led':
          activeCourseList = this.ilt;
          break;
        default:
          activeCourseList = [];
          break;
      }
      activeCourseList = JSON.parse(JSON.stringify(activeCourseList));
      activeCourseList.sort((a, b) => this.sortList(a, b));
      this.activeCourseList = activeCourseList;
      this.trainingsData.available = this.trainingTypes;
      this.trainingTypes.forEach((ele) => {
        ele.no_of_documents = this.courseTabCount[ele.name];
      });

      this.trainingData.available.no_of_documents = activeCourseList.length;
    },
    sortList(a, b) {
      if (this.sortingType === 'name') {
        if (a.title.toLowerCase() === b.title.toLowerCase()) return 0;
        if (this.orderBy.name === 'asc') {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        }
        return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
      }
      if (this.sortingType === 'date') {
        if (this.orderBy.date === 'desc') {
          let sortedDate =
            new Date(
              b.purchase_date[0],
              b.purchase_date[1],
              b.purchase_date[2]
            ) -
            new Date(
              a.purchase_date[0],
              a.purchase_date[1],
              a.purchase_date[2]
            );
          if (sortedDate === 0) {
            sortedDate = a.title.trim().localeCompare(b.title.trim());
          }
          return sortedDate;
        }
        let sortedDate =
          new Date(
            a.purchase_date[0],
            a.purchase_date[1],
            a.purchase_date[2]
          ) -
          new Date(
            b.purchase_date[0],
            b.purchase_date[1],
            b.purchase_date[2]
          );
        if (sortedDate === 0) {
          sortedDate = b.title.trim().localeCompare(a.title.trim());
        }
        return sortedDate;
      }
      const progress = {
        'Not Enrolled': 0,
        Enrolled: 1,
        'Not Started': 2,
        Incomplete: 3,
        Complete: 4,
        '': 5
      };
      if (progress[a.course_status] === progress[b.course_status]) return 0;
      if (this.orderBy.status === 'asc') {
        return progress[a.course_status] > progress[b.course_status] ? 1 : -1;
      }
      return progress[a.course_status] < progress[b.course_status] ? 1 : -1;
    },
    navigateToMarketPlace() {
      this.$router.push('/market-place');
    },
    customLabel(option) {
      // if (option.name === 'View all') return option.name;
      return `${option.name} (${option.no_of_documents})`;
    }
  }
};
</script>
<style scoped>
.dropdown--container {
  /* padding-right: 13px; */
}
.not-purchased {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}
.no-data-color {
  color: #828282;
}
.purchased-training-wrapper {
  margin-top: 12px;
}
</style>
