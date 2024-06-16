<template>
  <div class="content-wrappper" v-if="hfeInsightData && allInsightsData.length">
    <OpusBreadCrumb class="ml-10 mt-20" variant="sm" @click="goToDashboard"
      >Dashboard</OpusBreadCrumb
    >
    <div class="text-h3 hfe-doc-title">HFE Insights</div>
    <section class="d-flex opus-bg-green-1 hfe-header">
      <div class="my-auto text-center">
        <button
          type="button"
          @click="nextPreviousInsight(false)"
          title="View previous insight"
        >
          <img
            src="/static/images/icons/insights_left_icon.svg"
            class="opus-icon"
          />
        </button>
      </div>
      <div class="content d-flex flex-direction-column justify-content-center">
        <div class="text-button-label black-2 mb-10 mt-20">HFE Insights</div>
        <div class="text-h3 mb-20">
          {{ hfeInsightData.hfe_insight_headline }}
        </div>
        <OpusDots
          class="mb-30"
          :count="allInsightsData.length"
          :position="hfeInsightData.viewing_order"
        ></OpusDots>
      </div>
      <img class="logo" src="/static/images/dashboard/hfe_insights.svg" />
      <div class="my-auto text-center">
        <button
          type="button"
          @click="nextPreviousInsight()"
          title="View next insight"
        >
          <img
            src="/static/images/icons/insights_right_icon.svg"
            class="opus-icon"
          />
        </button>
      </div>
    </section>
    <section class="hfe-desc">
      <section
        class="col-xs-6 p-0 text-regular-large content black-2 mb-30"
        v-html="hfeInsightData.insight_content"
      ></section>
      <section class="col-xs-6 p-0 author" v-if="hfeInsightData.authors_name">
        <div class="text-h5 black-2">Author</div>
        <hr />
        <div class="black-2 text-button-label">
          {{ hfeInsightData.authors_name }}
        </div>
        <div class="text-regular-large black-3">
          {{ hfeInsightData.authors_work_title }}
        </div>
      </section>
    </section>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import Loader from '../UIComponents/Loader.vue';
import OpusDots from '../UIComponents/OpusDots.vue';
import OpusBreadCrumb from '../UIComponents/OpusBreadCrumb.vue';
import { getHfeInsightByUser, getHfeUserData } from '../../apis/dashboard';

export default {
  name: 'HFEInsight',
  components: {
    OpusBreadCrumb,
    OpusDots,
    Loader
  },
  data() {
    return {
      loaderStatus: false,
      hfeInsightData: null,
      insightId: null,
      allInsightsData: []
    };
  },
  async created() {
    this.loaderStatus = true;
    this.insightId = this.$route.params.id.toString();
    await this.getInsightsData(this.insightId);
    this.loaderStatus = false;
  },
  computed: {
    inFirstPage() {
      if (!this.allInsightsData.length) return -1;
      return Number(this.insightId) === this.allInsightsData[0].id;
    },
    inLastPage() {
      if (!this.allInsightsData.length) return -1;
      return (
        Number(this.insightId) ===
        this.allInsightsData[this.allInsightsData.length - 1].id
      );
    }
  },
  watch: {
    $route: {
      async handler(to) {
        this.insightId = to.params.id.toString();
        await this.getInsightsData(this.insightId);
      },
      immediate: true
    }
  },
  methods: {
    async getInsightsData(id) {
      await Promise.all([this.getHfeInsightsData(id), this.getAllInsights()]);
    },
    goToDashboard() {
      this.$router.push('/home');
    },
    async getAllInsights() {
      this.allInsightsData = await getHfeUserData();
    },
    async nextPreviousInsight(isNext = true) {
      this.loaderStatus = true;
      const currentId = this.insightId;
      const insightArray = this.allInsightsData.map((item) => item.id);
      const index = insightArray.findIndex((item) => item === +currentId);
      const id = this.getID(isNext, index, insightArray);
      this.$router.push({ name: 'HFEInsight', params: { id } });
      this.loaderStatus = false;
    },
    getID(isNext, current, insightArray) {
      /* eslint-disable prefer-destructuring */
      const length = insightArray.length;
      if (isNext) {
        return this.inLastPage ? insightArray[0] : insightArray[current + 1];
      }
      return this.inFirstPage
        ? insightArray[length - 1]
        : insightArray[current - 1];
    },
    async getHfeInsightsData(id) {
      this.loaderStatus = true;
      const response = await getHfeInsightByUser(id);
      if (response) {
        this.hfeInsightData = response;
      }
      this.loaderStatus = false;
    }
  }
};
</script>

<style>
.hfe-doc-title {
  margin-left: 60px;
  margin-top: 24px;
  margin-bottom: 24px;
}
.hfe-header {
  padding-right: 16px;
  padding-left: 16px;
}
.hfe-header .content {
  margin-left: 20px;
  flex-grow: 1;
}
.hfe-header .logo {
  margin-right: 130px;
  margin-left: 130px;
  width: 275px;
}
.hfe-desc {
  margin-left: 60px;
  margin-top: 32px;
  margin-right: 40px;
}
.hfe-desc .author {
  padding-left: 150px;
}
</style>
