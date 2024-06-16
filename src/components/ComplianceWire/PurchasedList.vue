<template>
  <div
    class="col-xs-12"
  >
    <div
      v-if="activeCourseList.length"
      class="col-xs-12 p-0"
    >
      <div
        v-for="training in activeCourseList"
        :key="training.plan_id"
        class="col-xs-12 p-0 purchased-training-wrapper"
      >
        <compliance-wire-purchased-list
          :training="training"
          :userId="userId"
          :account_id="account_id"
        />
      </div>
    </div>
    <div
      v-if="!activeCourseList.length"
      class="col-xs-12 d-flex col-gap-20 align-items-center mt-30"
    >
        <img src="/static/images/icons/single_document.svg" alt="" />
        <div>
          <div class="not-purchased no-data-color">Start building your library!</div>
          <div class="mt-5">
            <span class="no-data-color">Check out offered courses below to purchase more courses </span>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import ComplianceWirePurchasedList from './ComplianceWirePurchasedList.vue';
import { getMarketplaceComplianceWire } from '../../apis/complianceWire';

export default {
  name: 'PurchasedTrainings',
  components: { ComplianceWirePurchasedList },
  props: {
    account_id: {
      type: [String, Number],
      default: '',
    },
    userId: {
      type: [String, Number],
      default: '',
    },
    // eLearning: {
    //   type: Array,
    //   default: () => ([]),
    // },
    ilt: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      // NEW DATA
      // activeCourseTab: 'all',
      // courseTabs: {
      //   elearning: 'eLearnings',
      //   instructorLed: 'Instructor Led Courses',
      // },
      // courseTabCount: {
      //   all: 0,
      //   elearning: 0,
      //   instructorLed: 0,
      // },
      activeCourseList: [],
      sortingType: 'name',
      orderBy: { name: 'asc', status: 'asc' },
    };
  },
  watch: {
    ilt() {
      this.setActiveCourseList();
    },
  },
  mounted() {
    this.setActiveCourseList();
  },
  methods: {
    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] = this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
      this.setActiveCourseList();
    },
    async setActiveCourseList() {
      // this.courseTabCount.elearning = this.eLearning.length;
      // this.courseTabCount.instructorLed = this.ilt.length;
      // this.courseTabCount.all = this.courseTabCount.elearning + this.courseTabCount.instructorLed;
      let activeCourseList = [];
      const response = await getMarketplaceComplianceWire(this.userId);
      activeCourseList = response.filter((course) => course.course_status !== 'Not Enrolled');
      // activeCourseList = [...this.ilt];
      activeCourseList = JSON.parse(JSON.stringify(activeCourseList));
      activeCourseList.sort((a, b) => this.sortList(a, b));
      this.activeCourseList = activeCourseList;
    },
    sortList(a, b) {
      if (this.sortingType === 'name') {
        if (a.title.toLowerCase() === b.title.toLowerCase()) return 0;
        if (this.orderBy.name === 'asc') {
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        }
        return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
      }
      const progress = {
        'Not Enrolled': 0,
        Enrolled: 1,
        'Not Started': 2,
        Incomplete: 3,
        Complete: 4,
        '': 5,
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
  },
};
</script>
<style scoped>
.not-purchased {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}
.no-data-color {
  color: #828282;
}
.purchased-training-wrapper{
  margin-top:12px;
}
</style>
