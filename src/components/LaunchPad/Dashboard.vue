<template>
  <div class="content-wrappper">
    <div class="submission-container">
      <div class="pl-15">
        <div class="col-xs-12 pb-15 d-flex justify-content-between">
          <span class="text-h2">Admin Tools</span>
        </div>
        <div class="col-xs-12 pb-15" v-if="roleId === 5 || roleId === 11">
          <div>
            <div>
              <span class="text-h4">Service Manager</span>
            </div>
            <div
              class="mt-10 d-flex col-gap-20 flex-wrap row-gap-20 xs-flex-direction-column"
            >
              <div
                class="cursor-pointer services-card d-flex col-gap-10 align-items-center"
                @click="navigateToConsult(list.url)"
                v-for="list in serviceManagerList"
                :key="list.id"
              >
                <div class="p-0">
                  <div class>
                    <img :src="list.icon" />
                  </div>
                </div>
                <div>
                  <p class="text-subtitle-2">{{ list.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import getActivityTrackerData from '../../apis/launchPad';
import Loader from '../UIComponents/Loader.vue';

export default {
  props: ['roleId'],
  data() {
    return {
      loaderStatus: false,
      accountsInfo: [],
      usersInfo: [],
      services: [],
      serviceManagerList: [
      {
          id: 1,
          name: 'Referral Details',
          icon: '/static/images/dashboard/admin_tools/training.svg',
          url: '/launchpad/ReferralOffer'
        },
        {
          id: 2,
          name: 'Manage Documents',
          icon: '/static/images/dashboard/admin_tools/training.svg',
          url: '/launchpad/manage-docs'
        },
        {
          id: 3,
          name: 'Users List',
          icon: '/static/images/dashboard/admin_tools/training.svg',
          url: '/launchpad/users'
        },
        {
          id: 4,
          name: 'Cetificate for HFE for Medical Technology',
          icon: '/static/images/dashboard/admin_tools/training.svg',
          url: '/launchpad/AdminCertificateList'
        },
        {
          id: 5,
          name: 'Instructor Led - Time slots',
          icon: '/static/images/dashboard/admin_tools/training.svg',
          url: '/launchpad/timeslots'
        },
        {
          id: 6,
          name: 'Block/Unblock Emails',
          icon: '/static/images/tools/tool_available.svg',
          url: '/launchpad/email-blocking'
        },
        {
          id: 7,
          name: 'User Interface Requirements Library',
          icon: '/static/images/tools/tool_available.svg',
          url: '/launchpad/uirl-admin-home'
        },
        {
          id: 8,
          name: 'Design Recommendations Library',
          icon: '/static/images/tools/tool_available.svg',
          url: '/launchpad/drl-admin-home'
        },
        {
          id: 9,
          name: 'Root Cause Analysis Wizard',
          icon: '/static/images/dashboard/admin_tools/tools.svg',
          url: '/launchpad/RCA-admin-home'
        },
        {
          id: 10,
          name: 'Activate Service',
          icon: '/static/images/dashboard/admin_tools/activate.svg',
          url: '/launchpad/activate-service'
        },
        {
          id: 11,
          name: 'Revoke Service',
          icon: '/static/images/dashboard/admin_tools/activate.svg',
          url: '/launchpad/revoke-service'
        },
      {
          id: 12,
          name: 'HFE Insights',
          icon: '/static/images/dashboard/admin_tools/hfe_insights.svg',
          url: '/launchpad/hfe-insights'
        },
        {
          id: 13,
          name: 'Consulting Hours',
          icon: '/static/images/consulting.svg',
          url: '/launchpad/consulting-hours'
        },
      ]
    };
  },
  components: {
    Loader
  },
  async created() {
    if (this.roleId === 5) {
      await this.getActivityTrackerData();
    }
  },
  methods: {
    navigateToConsult(url) {
      this.$router.push(url);
    },
    async getActivityTrackerData() {
      this.loaderStatus = true;
      const data = await getActivityTrackerData();
      data.data.forEach((widget) => {
        if (widget.name === 'accounts') {
          this.accountsInfo = widget;
        } else if (widget.name === 'users') {
          this.usersInfo = widget;
        }
      });
      this.loaderStatus = false;
    }
  }
};
</script>
<style scoped>
.submission-container {
  margin: 0;
  padding: 15px 10px;
}
.submission-container .content-header,
.submission-container .sub-content-header {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #0b3c61;
}
.submission-container .sub-content-header {
  font-weight: 500;
}
.submission-container .border-1 {
  border: 1px solid #d3d6d9;
  box-sizing: border-box;
  border-radius: 7px;
  margin: 0;
  padding: 15px;
}
.submission-container .border-2 {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 15px 5px 15px 15px;
  margin: 0;
}
.services-card {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 12px;
  flex: 0 0 30%;
}
.pb-15 {
  padding-bottom: 15px;
}
.submission-container .icon-container {
  background: #0b3c61;
  border: 1px solid #174c76;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 15px 12px;
  max-width: 80px;
  min-height: 80px;
}
.submission-container .icon-container img {
  width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.submission-container .product-service {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 19px;
  color: #174c76;
  margin-bottom: 5px;
  margin-top: 5px;
}
.cursor-pointer {
  cursor: pointer;
}
.submission-container .product-content {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 7px;
  margin-bottom: 0;
}
.submission-container .product-list-content {
  margin-top: 7px;
  margin-bottom: 0;
  font-weight: normal;
  font-family: Roboto;
  font-size: 16px;
}
.submission-container .product-list-content a {
  color: #4988be;
  font-size: 14px;
}
.submission-container .br-list {
  border-left: 1px solid #4988be;
}
.submission-container .product-list-content a:hover {
  color: #337ab7;
}
</style>
