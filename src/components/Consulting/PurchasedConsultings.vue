<template>
  <div class="col-xs-12 mb-30 mt-30 pl-0">
    <div
      class="header--container d-flex justify-content-between align-items-center mb-30"
    >
      <span class="font-32 fw-400">Purchased</span>

      <opusSelect
        style="width: 327px"
        v-model="activeConsultingTab"
        :options="consultingCategoriesData"
        trackBy="name"
        :custom-label="customLabel"
      >
      </opusSelect>
    </div>

    <template v-if="activeConsultingList.length > 0">
      <div class="col-xs-12 d-flex sorting-container mb-20 mt-10">
        <div
          class="col-xs-6 col-sm-6 col-md-6 p-0 xs-flex-column d-flex align-items-center flex-wrap name--filter"
        >
          <span
            class="text-primary cursor-pointer pr-10"
            @click="setSorting('name')"
          >
            Name
          </span>
          <img
            @click="setSorting('name')"
            :class="{ desc: sortingOrder === 'desc' && sortingType === 'name' }"
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
          class="col-xs-2 col-sm-2 col-md-2 p-0 xs-flex-column d-flex align-items-center status--filter"
        >
          <span
            class="text-primary cursor-pointer pr-10"
            @click="setSorting('status')"
          >
            Status
          </span>
          <img
            :class="{
              desc: sortingOrder === 'desc' && sortingType === 'status'
            }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'status'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
            @click="setSorting('status')"
          />
        </div>
        <div
          class="col-xs-4 p-0 xs-flex-column d-flex align-items-center date--filter justify-end"
        >
          <span
            class="text-primary cursor-pointer pr-10"
            @click="setSorting('requested_date')"
          >
            Requested date
          </span>
          <img
            :class="{
              desc: sortingOrder === 'desc' && sortingType === 'requested_date'
            }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'requested_date'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
            @click="setSorting('requested_date')"
            v-if="activeConsultingList.length > 1"
          />
        </div>
      </div>
      <div class="col-xs-12 p-0">
        <div
          v-for="(consulting, index) in activeConsultingList"
          :key="index + '_' + consulting.title + '_' + consulting.project_name"
          class="col-xs-12 p-0 mt-10"
        >
          <consulting
            :consulting="consulting"
            @request-quote="$emit('request-quote', consulting)"
          />
        </div>
      </div>
    </template>
    <div
      v-else
      class="col-xs-12 d-flex flex-wrap col-gap-20 align-items-center text-justify mt-20"
    >
      <img src="/static/images/icons/single_document.svg" />
      <div>
        <div class="not-purchased no-data-color">
          Collaborate with our HFE experts
        </div>
        <div class="mt-5">
          <span class="no-data-color"
            >Track your current and past consulting requests</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';

import Consulting from './Consulting.vue';

export default {
  name: 'PurchasedConsultings',
  components: { Consulting, OpusSelect },
  props: {
    account_id: {
      type: [String, Number],
      default: ''
    },
    userId: {
      type: [String, Number],
      default: ''
    },
    consultings: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // NEW DATA
      activeConsultingTab: {
        name: 'View all',
        length: 0
      },
      activeTabName: {
        name: 'View all',
        length: 0
      },
      consultingTabs: {
        Research: 'Research',
        Analyze: 'Analyze',
        Design: 'Design',
        Evaluate: 'Evaluate',
        Validate: 'Validate',
        Submit: 'Submit'
      },
      consultingTabCount: {
        'View all': 0,
        Research: 0,
        Analyze: 0,
        Design: 0,
        Evaluate: 0,
        Validate: 0,
        Submit: 0
      },
      consultingCategories: {},
      activeConsultingList: [],
      consultingCategoriesData: [],
      sortingType: 'name',
      sortingOrder: 'asc'
    };
  },
  mounted() {
    this.buildConsultingCategories();
    this.setActiveConsultingList();
  },
  watch: {
    activeConsultingTab() {
      this.setActiveConsultingList();
    },
    consultings() {
      this.buildConsultingCategories();
      this.setActiveConsultingList();
    }
  },
  methods: {
    setTab(tab) {
      this.activeConsultingTab = tab;
    },
    setSorting(type) {
      const sortingSwitch = {
        asc: 'desc',
        desc: 'asc'
      };
      if (this.sortingType === type) {
        this.sortingOrder = sortingSwitch[this.sortingOrder];
      } else {
        this.sortingType = type;
        this.sortingOrder = 'asc';
      }
      this.setActiveConsultingList();
    },
    buildConsultingCategories() {
      const consultingCategories = { 'View all': 0 };
      const consultingTabCount = { 'View all': 0 };
      Object.keys(this.consultingTabs).forEach((key) => {
        consultingCategories[key] = [];
        consultingTabCount[key] = 0;
      });
      this.consultings.forEach((consulting) => {
        let category = '';
        if (consulting.consulting_basic_details_dto) {
          category = consulting.consulting_basic_details_dto.consulting_type;
        } else {
          category = consulting.consulting_type;
        }
        if (category && consultingCategories[category]) {
          consultingCategories[category].push(consulting);
        }
      });
      let consultingCategoriesData = [];
      Object.keys(consultingCategories).forEach((categoryName) => {
        this.consultingTabCount[categoryName] =
          consultingCategories[categoryName].length;
        consultingCategoriesData.push({
          name: categoryName,
          length:
            categoryName === 'View all'
              ? this.consultings.length
              : consultingCategories[categoryName].length
        });
      });
      this.consultingCategoriesData = consultingCategoriesData;
      consultingCategoriesData = [];
      consultingCategories['View all'] = this.consultings;
      this.consultingCategories = consultingCategories;
      consultingTabCount['View all'] = this.consultings.length;
      this.consultingTabCount = consultingTabCount;
    },
    setActiveConsultingList() {
      let activeConsultingList = [];
      activeConsultingList =
        this.consultingCategories[this.activeConsultingTab.name];
      activeConsultingList = JSON.parse(JSON.stringify(activeConsultingList));
      activeConsultingList.sort((a, b) =>
        this.compareConsultings(a, b, this.sortingType)
      );
      if (this.sortingOrder === 'desc') {
        activeConsultingList.reverse();
      }
      this.activeConsultingList = activeConsultingList;
      this.activeConsultingTab.length = this.activeConsultingList.length;
    },
    compareConsultings(a, b, type = 'name') {
      if (!a || !b) return 0;
      switch (type) {
        case 'status': {
          if (!a.consulting_status || !b.consulting_status) return -1;
          if (a.consulting_status === b.consulting_status) return 0;
          const progress = {
            Requested: 1,
            Inprogress: 2,
            Completed: 3
          };
          return progress[a.consulting_status] < progress[b.consulting_status]
            ? -1
            : 1;
        }
        case 'requested_date':
          if (!a.modified_date || !b.modified_date) return 0;
          return dayjs(a.modified_date).isBefore(b.modified_date) ? -1 : 1;
        default:
          return (a.consulting_name || '')
            .toLowerCase()
            .localeCompare((b.consulting_name || '').toLowerCase());
      }
    },
    navigateToMarketPlace() {
      this.$router.push('/layout/market-place');
    },
    customLabel(option) {
      return `${option.name} (${option.length})`;
    }
  }
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
.sorting-container {
  border-bottom: 1px dashed gray;
}

.name--filter {
  width: 60%;
}

.date--filter,
.status--filter {
  width: 20%;
}

.status--filter {
  padding-left: 8px;
}
.sorting-icon {
  transform: rotate(0deg);
}
.sorting-icon.desc {
  transform: rotate(180deg);
}
</style>
