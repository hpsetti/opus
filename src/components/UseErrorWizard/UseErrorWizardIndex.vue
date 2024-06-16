<template>
  <div class="UseErrorWizardIndex content-wrappper">
    <section
      class="row welcome-banner use-error-banner mr-0 d-flex align-items-center mb-0"
    >
      <div class="col-xs-12 col-sm-8 col-md-9 use-error-container">
        <div class="col-xs-12 pl-0 use-error-header fw-300">
          <img
            @click="navigateToTools"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />Use Error Wizard
          <span class="free-button" v-if="!enrolled">Free version</span>
        </div>
        <div class="col-xs-12 pl-0 mt-20 text-subtitle-1 use-error-header-text">
          Practice developing a high-quality Use-Related Risk Analysis (URRA)
        </div>
        <div class="col-xs-12 pl-0 mt-10 use-error-description">
          Tab through the URRA columns to read instructions and tips, practice
          writing content, and then compare your work to our content to identify
          ways to improve.
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3 p-0 mt-10">
        <div class="col-xs-12 mb-15 d-flex align-items-center">
          <img
            src="/static/images/useErrorWizardTool/headerComponent/ViewRelatedConsultingIcon.svg"
            alt=""
          />
          <a
            class="pl-15 cursor-pointer text-subtitle-1 white-1"
            href="/schedule-consulting/review-and-provide-feedback-on-use-related-risk-analysis?consultingId=5"
            target="_blank"
            >View Related Consulting
          </a>
        </div>
        <div class="col-xs-12 mb-15 d-flex align-items-center cursor-pointer">
          <img
            src="/static/images/useErrorWizardTool/headerComponent/URRATrainingIcon.svg"
            alt=""
          />
          <a
            class="pl-15 text-subtitle-1 white-1"
            href="/trainings/schedule-training/advanced-use-related-risk-analysis?planId=94"
            target="_blank"
            >URRA Training</a
          >
        </div>
      </div>
    </section>
    <div class="useErrorWizardNavbar--container opus-bg-green-1">
      <UseErrorWizardNavbar
        class="useErrorWizardNavbar"
        :tabs="tabs"
        @activeTabName="activeTabNameSelected"
      />
    </div>

    <UseErrorWizardOverview
      v-if="activeTab === 'Overview'"
      :userInfo="userInfo"
    />
    <UseErrorOpusUrra
      v-if="activeTab !== 'Overview'"
      class="mt-15"
      :activeParentTab="activeTab"
      :paid="enrolled"
      :useErrorContent="useErrorContent"
    />
    <loader :loadingStatus="loader" />
  </div>
</template>
<script>
// Libraries

import axios from 'axios';
// APIs

import { getUseErrorWizardData } from '@apis/tools';
import getUseErrorContentDta from '@apis/useErrorServices.js';
import { getSasToken } from '@apis/documents';

// Components
import Loader from '@/components/UIComponents/Loader.vue';
import UseErrorWizardNavbar from './components/UseErrorWizardNavbar.vue';
import UseErrorWizardOverview from './components/Overview/UseErrorWizardOverview.vue';
import UseErrorOpusUrra from './components/OPUSURRATemplate/UseErrorOpusUrra.vue';

export default {
  name: 'UseErrorWizardIndex',
  components: {
    UseErrorWizardNavbar,
    UseErrorWizardOverview,
    UseErrorOpusUrra,
    Loader
  },
  data() {
    return {
      activeTab: 'Overview',
      userInfo: {},
      enrolled: false,
      tabs: [],
      useErrorContent: {},
      filePath: ''
    };
  },

  async created() {
    if (localStorage.getItem('userData')) {
      const response = JSON.parse(localStorage.getItem('userData'));
      this.userInfo = response;
      this.loader = true;
      await this.getUseErrorResponse();
      await this.getNavTabsData();
      this.loader = false;
    }
  },
  methods: {
    async getNavTabsData() {
      const response = await getUseErrorContentDta();
      this.filePath = response.data;
      const formData = {
        container_name: 'use-error-wizard',
        permissions: 'read',
        storage_name: 'opus-storage-java'
      };
      const sasToken = await getSasToken(formData);
      this.filePath = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${this.filePath}?${sasToken.data}`;
      const jsonResponse = await this.getNavDataJson(this.filePath);

      this.tabs = Object.keys(jsonResponse);
      this.useErrorContent = jsonResponse;

      // comment the above code  and uncomment below for testing

      // this.tabs = Object.keys(response);
      // this.useErrorContent = response;
    },
    // Move it to .js file for readability
    async getNavDataJson(filePath) {
      let data;
      await axios
        .get(filePath)
        .then((response) => {
          if (response.status === 200 && response.data) {
            data = response.data;
          }
        })
        .catch((err) => {
          console.log('Opus Use Error json Error', err);
        });
      return data;
    },
    activeTabNameSelected(e) {
      this.activeTab = e;
    },
    navigateToTools() {
      this.$router.push('/tools');
    },
    async getUseErrorResponse() {
      this.loader = true;
      const response = await getUseErrorWizardData(this.userInfo.id);
      this.enrolled = response.enrolled;
      this.loader = false;
    }
  }
};
</script>
<style scoped>
.use-error-banner {
  min-height: 120px;
  margin-bottom: 0;
}

.use-error-container {
  padding-left: unset;
}

.use-error-header {
  font-size: 36px;
  line-height: 49px;
}

.use-error-header-text {
  margin-left: 32px;
}

.use-error-description {
  max-width: 489px;
  margin-left: 32px;
}
.cursor-pointer {
  margin-right: 20px;
}
.useErrorWizardNavbar--container {
  width: 100%;
}

.useErrorWizardNavbar {
  margin-top: 5px;
}

a {
  text-decoration: none;
}

.free-button {
  display: inline-block;
  padding: 1px 8px;
  background: #ffc62f;
  border-radius: 2px;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  vertical-align: middle;
  text-align: center;
  color: #333333;
  margin-left: 10px;
  margin-top: -5px;
}
</style>
