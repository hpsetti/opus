<template>
  <div class="content-wrappper">
    <div v-if="!loaderStatus" class="mt-20 mb-20">
      <div class="clear-all">
        <BaseButton
          size="lg"
          variant="secondary"
          :disabled="!hasNotifications"
          @click="clearAll"
          >Clear all</BaseButton
        >
      </div>
      <div class="tabs">
        <OpusTabs :tabs="tabs" showTabCount v-model="selectedTab"></OpusTabs>
      </div>
      <NotificationGeneral
        :userId="userId"
        :notificationsList="filteredList"
        :pageNo="pageNo"
        @refresh="refresh"
      ></NotificationGeneral>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import Loader from '../UIComponents/Loader.vue';
import NotificationGeneral from './NotificationGeneral.vue';
import {
  getNotifications,
  dismissAllNotifications
} from '../../apis/notification';
import BaseButton from '../UIComponents/BaseButton.vue';
import OpusTabs from '../UIComponents/OpusTabs.vue';

export default {
  name: 'NotificationHome',
  props: ['userId'],
  components: {
    NotificationGeneral,
    Loader,
    BaseButton,
    OpusTabs
  },
  data() {
    return {
      selectedTab: 'general',
      loaderStatus: true,
      notificationsList: [],
      filteredList: [],
      tabs: null,
      types: {
        general: ['Other'],
        hfe: ['PROJECT'],
        trainings: [
          'TRAINING',
          'INSTRUCTOR_TRAINING',
          'QNA_CONSULTING',
          'INSTRUCTOR_PRE_RECORDED_TRAINING'
        ],
        documents: ['DOCUMENTS', 'USER_PROFILE_AND_ENVIRONMENT'],
        tools: ['TOOLS'],
        consulting: ['CONSULTING']
      },
      pageNo: 1
    };
  },
  async created() {
    this.loaderStatus = true;
    this.emitter.on("tabSelected", async (e) => {
      this.selectedTab = e;
    });
    this.resetTabs();
    await this.getNotificationsList();
    this.setTabCount();
    this.loaderStatus = false;
  },
  computed: {
    hasNotifications() {
      return this.notificationsList.length > 0;
    }
  },
  watch: {
    selectedTab() {
      this.getFilteredList();
      this.pageNo = 1;
    }
  },
  methods: {
    async getNotificationsList() {
      this.loaderStatus = true;
      const newNotifications = await getNotifications(this.userId);
      this.notificationsList = newNotifications.map((notification) => {
        // use instructor_training icon for qna_consulting also
        if (notification.type === 'QNA_CONSULTING') {
          // eslint-disable-next-line no-param-reassign
          notification.type = 'INSTRUCTOR_TRAINING';
        }
        return notification;
      });
      this.getFilteredList();
      this.loaderStatus = false;
    },
    setTabCount() {
      this.notificationsList.forEach((item) => {
        Object.keys(this.types).forEach((type) => {
          if (this.types[type].includes(item.type)) {
            const idx = this.tabs.findIndex((tab) => tab.key === type);
            if (idx !== -1) {
              this.tabs[idx].count += 1;
            }
          }
        });
      });
    },
    // TODO Revisit this design
    // Possibly move data fetching logic into NotificationGeneral component itself
    async refresh(data) {
      this.loaderStatus = true;
      Object.keys(this.types).forEach((type) => {
        if (this.types[type].includes(data.notification.type)) {
          const idx = this.tabs.findIndex((tab) => tab.key === type);
          if (idx !== -1) {
            this.tabs[idx].count -= 1;
          }
          this.selectedTab = type;
        }
      });
      this.pageNo = data.pageNo;
      await this.getNotificationsList();
    },
    resetTabs() {
      this.tabs = [
        { name: 'General', key: 'general', count: 0 },
        { name: 'HFE Process & Project Plans', key: 'hfe', count: 0 },
        { name: 'Trainings', key: 'trainings', count: 0 },
        { name: 'Documents', key: 'documents', count: 0 },
        { name: 'Tools', key: 'tools', count: 0 },
        { name: 'Consulting', key: 'consulting', count: 0 },
      ];
    },
    getFilteredList() {
      this.filteredList = this.notificationsList.filter((item) =>
        this.types[this.selectedTab].includes(item.type)
      );
    },
    async clearAll() {
      this.loaderStatus = true;
      const response = await dismissAllNotifications(this.userId);
      if (response && response.message === 'success') {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Cleared all notifications'
        });
        this.emitter.emit('get-notification-count');
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Unable to clear all notifications'
        });
      }
      this.resetTabs();
      await this.getNotificationsList();
      this.setTabCount();
      this.loaderStatus = false;
    }
  }
};
</script>

<style scoped>
.clear-all {
  padding-bottom: 20px;
  margin-left: auto;
  margin-right: 35px;
  text-align: right;
}
.tabs {
  margin-left: 35px;
  margin-right: 35px;
}
</style>
