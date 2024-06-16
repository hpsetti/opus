<template>
  <div class="col-xs-12 p-0">
    <div
      class="opus-tools-header d-flex justify-content-between align-items-center xs-flex-column-650"
    >
      <h2 class="text-h3 mb-0">Purchased</h2>
      <div class="xs-width-100-650 opus-tools-select">
        <opus-select
          class="opusToolsSelect"
          v-model="activeTabName.available"
          :options="trainingsData.available"
          trackBy="id"
          :custom-label="customLabel"
        >
        </opus-select>
      </div>
    </div>
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
          class="col-xs-2 p-0 xs-flex-column d-flex date--filter justify-content-end"
          v-if="anyPurchasedTool && anyPurchasedTool.length > 0"
        >
          <span class="text-primary cursor-pointer pr-30">Purchased date</span>
        </div>
      </div>
      <div
        class="details-wrapper col-xs-12 p-10 mb-10 d-flex xs-flex-column"
        v-for="list in toolsList"
        :key="list.id"
        @click="redirect(list.link)"
      >
        <div class="col-xs-12 p-0 d-flex col-gap-20 align-items-center">
          <div
            class="col-xs-12 col-sm-9 col-md-9 p-0 d-flex col-gap-20 align-items-center"
          >
            <img
              class="training-img"
              src="/static/images/tools/tool_available.svg"
              alt=""
            />
            <div class="d-flex flex-direction-column col-xs-12 p-0">
              <!-- Plan type -->
              <div
                class="fw-300 text-primary mb-5 d-flex justify-content-between xs-flex-column"
              >
                <div class="flex-50">Tool</div>
              </div>
              <!-- Title -->
              <div
                class="fw-700 font-18 text-primary mb-10 d-flex xs-flex-column"
              >
                <div class="">
                  {{ list.title }}
                </div>
                <p class="free-version xs-free-version" v-if="!list.enrolled">
                  Free Version
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-3 col-md-3 p-0 d-flex col-gap-20 align-items-center justify-content-end"
          >
            <div class="white-space" v-if="list.expiry_days">
              <div class="pl-15 pb-15 pt-10 pr-15" v-if="list.expiry_days > 90">
                <p class="text-regular-large">
                  Expires:
                  {{ formatPurchaseDate(list.expiry_date) }}
                </p>
              </div>
              <div
                class="pl-15 pb-15 pt-10 pr-15"
                v-else-if="list.expiry_days <= 90 && list.expiry_days > 10"
              >
                <p class="text-regular-large orange-bg2 expiry-box">
                  Expires: {{ list.expiry_days }} days
                </p>
              </div>
              <div class="pl-15 pb-15 pt-10 pr-15" v-else-if="list.expiry_days <= 10 && list.expiry_days > 1">
                <p class="text-regular-large red-bg1 expiry-box white-1">
                  Expires: {{ list.expiry_days }} days
                </p>
              </div>
              <div class="pr-15 pb-15 pr-15" v-else-if="list.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ list.expiry_days }} day</p>
          </div>
            </div>
            <p class="white-space pr-20">
              {{ formatPurchaseDate(list.purchase_date) }}
            </p>
          </div>
        </div>
        <loader :loadingStatus="loaderStatus"></loader>
      </div>
    </div>
  </div>
</template>
<script>
// import Tabs from './Tabs.vue';
import dayjs from 'dayjs';
// import arraySupport from "dayjs/plugin/arraySupport";
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
import Loader from '../UIComponents/Loader.vue';
import { getResourcesListById } from '../../apis/marketPlaceResources';
import { getToolsPurchaseData } from '../../apis/designRecommendationLibrary';
import getToolsDta from '../../apis/opusTools';
import postMarketoFormData from '../../apis/marketo';
// dayjs.extend(arraySupport);

export default {
  props: {
    loader: {
      type: Boolean
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loaderStatus: false,
      windowWidth: window.innerWidth,
      toolsData: {},
      cartInfo: {},
      documentInfo: {},
      selectedCartItem: {},
      activeTabName: {
        available: {
          id: 0,
          name: 'View all',
          no_of_documents: 0,
          sequence: 0
        }
      },
      trainingsData: {
        available: [
          {
            id: 0,
            name: 'View all',
            no_of_documents: 0,
            sequence: 0
          }
        ]
      },
      filteredList: [],
      availableTabs: {},
      toolsList: {},
      isPurchased: {},
      anyPurchasedTool: {},
      availableTabCount: {
        all: 0
      },
      showKPA: true,
      kpaTool: [
        {
          id: '9',
          link: 'known-problem-analysis',
          title: 'Known Problem Analysis',
          enrolled: true,
          description: 'Known Problem Analysis.'
        }
      ]
    };
  },

  components: {
    Loader,
    // Tabs
    OpusSelect
  },
  async created() {
    await Promise.all([this.getStaticTools(), this.getList()]);
  },

  methods: {
    redirect(url) {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'Tools',
        form_control_details: `Visit - ${url}`
      };
      postMarketoFormData(marketoForm);
      this.$router.push({ path: `/tools/${url}` });
    },
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return dayjs(formattedDateArray).format('D MMMM YYYY');
      }
      return '';
    },
    async getStaticTools() {
      const [purchasedData, jsonToolsList] = await Promise.all([
        getToolsPurchaseData(+this.userId),
        getToolsDta()
      ]);
      const baseList = [...purchasedData, ...jsonToolsList];
      this.toolsList =
      import.meta.env.VITE_NODE_ENV === 'development'
          ? [...baseList, ...this.kpaTool]
          : baseList;
      this.anyPurchasedTool = baseList.filter((item) => item.purchase_date);
      this.setCountForTabs();
    },
    async getList() {
      this.loaderStatus = true;
      this.toolsData = await getResourcesListById(1, this.userId);
      this.loaderStatus = false;
    },
    setCountForTabs() {
      const count = this.toolsList.length || 0;
      this.availableTabCount = {
        all: count
      };
    },
    navigateToMarketplace() {
      this.$router.push('/market-place');
    },
    customLabel(option) {
      // if (option.name === 'View all') return option.name;
      return `${option.name} (${this.availableTabCount.all})`;
    }
  }
};
</script>

<style scoped>
.details-wrapper {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;
}
.free-version {
  background: rgba(255, 211, 98, 0.3);
  border-radius: 2px;
  padding: 8px;
  font-size: 12px;
  line-height: 16px;
  margin-left: 15px;
  margin-top: -4px;
}

.training-img {
  height: 85px;
  width: 85px;
  object-fit: cover;
  border-radius: 5px;
}

.price,
.preview-text {
  color: #00518a;
}

.flex-title {
  flex: 0 0 50%;
}

.cart-item {
  border: 3px solid #4c9e45;
}

.align-self-center {
  align-self: center;
}

.course-status {
  line-height: 25px;
  color: #0b3c61;
}

.flex-50 {
  flex: 0 0 65%;
}

/*  h2.purchased-text {

} */

.opus-tools-header {
  margin-top: 25px;
  margin-bottom: 25px;
}

.opus-tools-select {
  width: 375px;
  max-width: 100%;
  margin-top: 15px;
  align-self: center;
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  /* .training-img {
    width: 100%;
    height: 100%;
  } */

  .flex-title {
    flex: 0 0 100%;
  }

  .xs-free-version {
    margin-left: 0px;
    align-self: flex-start;
  }

  .opus-tools-header {
    align-items: flex-start;
  }
}

@media screen and (max-width: 650px) {
  .xs-width-100-650 >>> .opus-multiselect.multiselect,
  .xs-width-100-650 >>> .opus-multiselect.multiselect.sm {
    max-width: 100%;
  }

  .xs-flex-column-650 {
    flex-direction: column;
    row-gap: 10px;
  }

  .opus-tools-select {
    align-self: unset;
  }

  .xs-hide-content-650 {
    display: none;
  }
}
</style>
