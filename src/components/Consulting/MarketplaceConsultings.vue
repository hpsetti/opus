<template>
  <div class="row mr-0">
    <div
      class="col-xs-12 pl-0"
      :class="screen !== 'consultings' ? 'marketplace--container' : ''"
    >
      <div
        class="col-xs-12 header--container d-flex justify-content-between align-items-center pr-0 xs-flex-column-marketplace"
        :class="screen === 'consultings' ? 'pl-15' : 'pl-25'"
      >
        <span class="font-32 fw-400">Marketplace</span>

        <opusSelect
          class="consulting-select"
          v-model="activeTabName"
          :options="consultingCategoriesData"
          trackBy="name"
          :custom-label="customLabel"
        >
        </opusSelect>
      </div>
      <template v-if="activeConsultingList.length">
        <div class="col-xs-12 p-0 pl-20 xs-display-none">
          <div class="col-xs-12 d-flex sorting-container mb-20 mt-10">
            <div
              class="col-xs-6 col-sm-6 col-md-6 p-0 xs-flex-column d-flex align-items-center flex-wrap"
            >
              <span
                class="text-primary cursor-pointer pr-10"
                @click="setSorting('name')"
              >
                Name
              </span>
              <img
                @click="setSorting('name')"
                :class="{
                  desc: sortingOrder === 'desc' && sortingType === 'name'
                }"
                class="sorting-icon cursor-pointer"
                :src="
                  sortingType === 'name'
                    ? '/static/images/icons/caret_up.svg'
                    : '/static/images/icons/caret_up_light.svg'
                "
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          class="col-xs-12 pl-20 mt-10 pr-0"
          v-for="(consulting, index) in activeConsultingList"
          :key="index"
        >
          <consulting
            :consulting="consulting"
            @request-quote="$emit('request-quote', consulting)"
          />
        </div>
      </template>
      <div v-else-if="!loaderStatus" class="col-xs-12 mt-20 mb-20">
        <div
          class="col-xs-12 col-sm-10 col-md-8 d-flex col-gap-10 align-items-start"
        >
          <img src="/static/images/purchased_resources.svg" alt="" />
          <div class="col-xs-12 d-flex flex-direction-column row-gap-10">
            <span class="fw-400 purchased-text"
              >You have requested quotes for all consulting services</span
            >
            <span class="fw-300 font-18"
              >We will notify you of any new services as they become
              available</span
            >
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';

import Loader from '../UIComponents/Loader.vue';
import { fetchMarketplaceConsultings } from '../../apis/consultings';
import Consulting from './Consulting.vue';

export default {
  props: {
    userId: {
      type: [Number, String],
      required: true
    },
    enrolledTrainings: {
      type: Array,
      default: () => []
    },
    screen: {
      type: String,
      default: 'consultings'
    }
  },
  data() {
    return {
      consultings: [],
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
      activeTabName: {
        name: 'View all',
        length: 0
      },
      activeConsultingList: [],
      consultingCategories: [],
      consultingCategoriesData: [],
      loaderStatus: false,
      // SORTING DATA
      sortingType: 'name',
      sortingOrder: 'asc'
    };
  },
  components: {
    Consulting,
    OpusSelect,
    Loader
  },

  async created() {
    await this.setupMarketPlaceConsultings();
  },

  watch: {
    activeTabName() {
      this.setActiveTabConsultings();
    }
  },

  methods: {
    async setupMarketPlaceConsultings() {
      this.loaderStatus = true;
      this.consultings = await fetchMarketplaceConsultings({
        userId: this.userId
      });
      this.buildConsultingCategories();
      this.setActiveTabConsultings();
      this.loaderStatus = false;
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
      this.setActiveTabConsultings();
    },
    buildConsultingCategories() {
      const consultingCategories = { 'View all': 0 };
      const consultingTabCount = { 'View all': 0 };
      Object.keys(this.consultingTabs).forEach((key) => {
        consultingCategories[key] = [];
        consultingTabCount[key] = 0;
      });
      if (!this.consultings) {
        return;
      }
      this.consultings.forEach((consulting) => {
        const category = consulting.consulting_type;
        if (category && consultingCategories[category]) {
          consultingCategories[category].push(consulting);
        }
      });
      let consultingCategoriesData = [];
      Object.keys(consultingCategories).forEach((categoryName) => {
        consultingTabCount[categoryName] =
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
    setActiveTabConsultings() {
      let activeConsultingList = [];
      activeConsultingList = this.consultingCategories[this.activeTabName.name];

      activeConsultingList = JSON.parse(JSON.stringify(activeConsultingList));
      activeConsultingList.sort((a, b) =>
        this.compareConsultings(a, b, this.sortingType)
      );
      if (this.sortingOrder === 'desc') {
        activeConsultingList.reverse();
      }
      this.activeConsultingList = activeConsultingList;
      this.activeTabName.length = this.activeConsultingList.length;
    },
    compareConsultings(a, b, type = 'name') {
      if (!a || !b) return 0;
      switch (type) {
        case 'status': {
          if (!a.consulting_status || !b.consulting_status) return -1;
          const progress = {
            requested: 1,
            inprogress: 2,
            complete: 3
          };
          return progress[a.consulting_status] < progress[b.consulting_status]
            ? -1
            : 1;
        }
        default:
          return (a.consulting_name || '')
            .toLowerCase()
            .localeCompare((b.consulting_name || '').toLowerCase());
      }
    },
    navigateToMarketPlace() {
      this.$router.push('/market-place');
    },
    customLabel(option) {
      return `${option.name} (${option.length})`;
    }
  }
};
</script>

<style scoped>

.consulting-select >>> .opus-multiselect.multiselect, .opus-multiselect.multiselect.sm {
  min-width: 280px;
  max-width: 327px
}
.marketplace--container {
  margin-top: 50px;
}
.header--container {
  margin-bottom: 36px;
}
.content-padding {
  padding: 30px 15px 24px 50px;
}
.sorting-container {
  border-bottom: 1px dashed gray;
}
.sorting-icon {
  transform: rotate(0deg);
}
.sorting-icon.desc {
  transform: rotate(180deg);
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

  .xs-display-none {
    display: none;
  }

  .xs-flex-column-marketplace {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 600px) {
  .xs-flex-column-marketplace {
    flex-direction: column;
    row-gap: 20px;
    align-items: flex-start;
  }
}
</style>
