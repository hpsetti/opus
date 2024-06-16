<template>
  <div>
    <div id="basePopup" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg custom-modal-class">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-body">
            <div class="pop_wrapper">
              <div id="left">
                <profile-menu
                  :roleId="roleId"
                  @menuClicked="menuClicked"
                  :activeTab="activeTab"
                  :isDashboardCustomizable="isDashboardCustomizable"
                ></profile-menu>
              </div>
              <div id="right">
                <common-header
                  v-if="profileMenuClicked !== 'logout'"
                  @closepopup="closepopup"
                  @emit-close-event="closePage"
                  @changePage="getPageName"
                  :roleId="roleId"
                  :displaySubheader="displaySubheader"
                  :displayDownloadBtn="displayDownloadBtn"
                  :header="header"
                  :subheader="subheader"
                  :breadcrumb="breadcrumb"
                  :isDashboardCustomizable="isDashboardCustomizable"
                ></common-header>
                <template v-if="profileMenuClicked == 'profile'">
                  <profile-popup
                    ref="profilePopUp"
                    @closedConfirmPopup="redirectProfile"
                    @closepopup="closepopup"
                    @emitBreadCrumb="updateBreadCrumb"
                    :closeSubPage="closeSubPage"
                  ></profile-popup>
                </template>
                <template v-if="profileMenuClicked == 'trainings'">
                  <div class="trainings-acc-popup d-flex">
                    <div class="ml-20 text-h4" v-if="!eLearningSelectedLatesActivity">
                      <!-- Please Purchase HFE Certification Course from <a href="/market-place/training">Training Marketplace</a> -->
                      <div class="d-flex">
                        <img class="no-learnings-image" src="/static/images/icons/lms/State 1.svg" alt=""/>
                        <div class="purchased-text mt-20">
                          Earn certificates in HF for Medical Technology
                          <div class="mt-10">
                          <span class="black-3 font-14">
                            Take our  <a href="/market-place/training">training courses</a> and work your way to a certification in
                            <br />applying HF to Medical technology.
                          </span>
                        </div>
                        </div>
                        
                      </div>
                    </div>
                    <ViewAllProgressVerticalCommon v-else
                      :viewAllProgressList="eLearningViewAllList"
                      selectedCardType="eLearning"
                      :latestActivity="eLearningSelectedLatesActivity"
                    />

                    <!-- <ViewAllProgressVerticalCommon
                      :viewAllProgressList="selectedViewAllList"
                      selectedCardType="Instructor Led"
                      latestActivity="Instructor Led"
                    /> -->
                  </div>
                </template>
                <template v-if="profileMenuClicked == 'team'">
                  <team
                    @closepopup="closepopup"
                    @emitBreadCrumb="updateBreadCrumb"
                    :roleId="roleId"
                    :closeSubPage="closeSubPage"
                  ></team>
                </template>
                <!-- <template v-if="profileMenuClicked=='notifications'">
                  <notifications @closepopup="closepopup" :roleId="roleId" :regWatchprefTab="regWatchprefTab" :account_id="account_id"></notifications>
                </template>
                <template v-if="profileMenuClicked=='billing'">
                  <billing  @closepopup="closepopup" :closeSubPage="closeSubPage" @emitBreadCrumb="updateBreadCrumb" :roleId="roleId"></billing>
                </template>
                <template v-if="profileMenuClicked=='services'">
                  <services  @closepopup="closepopup" :roleId="roleId"></services>
                </template> -->
                <template v-if="profileMenuClicked == 'tour'">
                  <virtual-tour
                    @closepopup="closepopup"
                    :roleId="roleId"
                  ></virtual-tour>
                </template>
                <template v-if="profileMenuClicked == 'Purchase History'">
                  <purchase-history
                    @closepopup="closepopup"
                    :roleId="roleId"
                  ></purchase-history>
                </template>
              </div>
            </div>
          </div>
        </div>
        <loader :loadingStatus="loaderStatus"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { getTrainingData } from '@apis/lmsTraining';
import {
  getAllILTCourses,
  getILTtrainingLatestActivity
} from '@apis/instructorLedTraining';
import ViewAllProgressVerticalCommon from '@/components/Training/Common/ViewAllProgressVerticalCommon.vue';
import EventBus from '../../utils/event-bus';
import Loader from '../UIComponents/Loader.vue';
import ProfileMenu from './ProfileMenu.vue';
import ProfilePopup from './ProfilePopup.vue';
import VirtualTour from '../VirtualTour/VirtualTour.vue';
import Team from './Team/Team.vue';
import PurchaseHistory from './purchaseHistory.vue';
// import Notifications from './ProfileNotification.vue';
import CommonHeader from './Header.vue';
// import Billing from './Billing.vue';
// import Services from './Services.vue';

export default {
  props: {
    regWatchprefTab: String,
    userAction: String,
    roleId: Number,
    account_id: Number
  },
  components: {
    Loader,
    ProfileMenu,
    ProfilePopup,
    ViewAllProgressVerticalCommon,
    Team,
    PurchaseHistory,
    // Notifications,
    CommonHeader,
    // Billing,
    // Services,
    VirtualTour
  },
  data() {
    return {
      holdRoute: '',
      profileMenuClicked: '',
      header: '',
      subheader: '',
      breadcrumb: '',
      activeTab: '',
      closeSubPage: '',
      displaySubheader: true,
      displayDownloadBtn: false,
      loaderStatus: false,
      dashboardCustomizable: null,
      isDashboardCustomizable: false,
      selectedViewAllList: [],
      selectedCardType: '',
      selectedLatesActivity: '',
      iltProgress: {},
      iltLatestActivity: null,
      userId: '',
      ilts: {
        purchased: [],
        available: []
      },
      eLearningLatesActivity: null,
      eLearningProgress: {},
      purchasedELearnings: [],
      eLearningSelectedLatesActivity: [],
      eLearningViewAllList: {}
    };
  },
  async created() {
    this.userId = JSON.parse(localStorage.getItem('userId'));
    // await this.getAllTrainigsData();
    // this.viewAllProgress();
  },
  async mounted() {
    await this.getAllTrainigsData();
    this.emitter.on('selectedMenu', (data) => {
      this.menuClicked(data);
    });
    this.emitter.on('menuSelected', (data) => {
      this.menuClicked(data);
    });
    $('#basePopup').on('hidden.bs.modal', () => {
      $('.modal-backdrop').remove();
    });
    this.viewAllProgress();
  },
  watch: {
    userAction() {
      if (this.userAction) {
        this.menuClicked(this.userAction);
      }
    }
  },
  methods: {
    redirectProfile(closeBasePopup) {
      if (closeBasePopup === 'closeBasePopup') {
        this.reset();
      } else {
        this.redirectRoute(this.holdRoute);
      }
    },
    validateConfirmPopUp() {
      if (
        this.activeTab === 'profile' &&
        !this.$refs.profilePopUp.disableButtonForProfile
      ) {
        return false;
      }
      return true;
    },
    reset() {
      this.holdRoute = '';
      this.activeTab = '';
      this.profileMenuClicked = false;
      this.$emit('popUpClosed');
      $('#basePopup').modal('hide');
    },
    closepopup(closeBasePopup) {
      if (this.validateConfirmPopUp()) {
        if(this.$route.path === '/projectplans'){
          this.reset();
          this.$router.go();
        }
        this.reset();
      } else {
        this.$refs.profilePopUp.toggleConfirmPopUp(closeBasePopup);
      }
    },
    async menuClicked(data) {
      await this.getAllTrainigsData();
      this.viewAllProgress();

      this.holdRoute = data;
      if (this.validateConfirmPopUp()) {
        this.redirectRoute(data);
      } else {
        this.$refs.profilePopUp.toggleConfirmPopUp();
      }
    },
    redirectRoute(data) {
      this.activeTab = data;
      this.profileMenuClicked = data;
      if (data === 'team') this.emitter.emit('resetTeams');
      if (data === 'Purchase History') this.displayDownloadBtn = true;
      if (this.validateLogout(data)) {
        this.validateHeader(data);
        this.updateBreadCrumb(false);
      }
    },
    validateHeader(data) {
      this.header = data;
      this.subheader = data;
      if (data !== 'profile' && data !== 'tour') {
        this.header = 'Account Settings';
        this.displaySubheader = true;
      } else if (data === 'tour') {
        this.header = 'Virtual Tour';
        this.displaySubheader = false;
      } else {
        this.displaySubheader = false;
      }
    },
    updateBreadCrumb(breadcrumb) {
      this.breadcrumb = breadcrumb;
      this.closeSubPage = '';
    },
    validateLogout(data) {
      if (data === 'logout') {
        this.loaderStatus = true;
        this.$emit('logoutUser');
        return false;
      }
      return true;
    },
    closePage() {
      this.closeSubPage = 'close';
    },
    getPageName(pageName) {
      this.menuClicked(pageName);
    },
    async getAllTrainigsData() {
      this.loaderStatus = true;
      await Promise.all([this.getELearnings(), this.getiltLatestActivity()]);
      this.loaderStatus = false;
    },
    async getELearnings() {
      const response = await getTrainingData();
      this.eLearningProgress = response.lms_course_progress;
      this.eLearningLatesActivity = this.eLearningProgress.latest_activity; // || response.lms_user_course_list[0];
      this.purchasedELearnings = response.lms_user_course_list.filter(
        (course) => course.course_status !== 'Not Enrolled'
      );
    },
    async getiltLatestActivity() {
      const [allILTs, iltProgress] = await Promise.all([
        getAllILTCourses(this.userId),
        getILTtrainingLatestActivity()
      ]);
      const iltList = [...allILTs.online_ilt, ...allILTs.pre_recorded_il_t];
      this.ilts.purchased = iltList.filter((course) => course.enrolled);
      this.ilts.available = iltList.filter((course) => !course.enrolled);
      this.iltProgress = iltProgress;
      this.iltLatestActivity = iltProgress.latest_activity;
    },
    viewAllProgress() {
      this.eLearningViewAllList = this.eLearningProgress.all_course_progress;
      this.eLearningSelectedLatesActivity = this.eLearningLatesActivity;
      this.selectedViewAllList = this.iltProgress.all_course_progress;
      this.selectedLatesActivity = this.iltLatestActivity;
    }
  }
};
</script>
<style scoped>
#left {
  padding: 10px 0 0;
  background-color: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 260px;
  top: 0;
  position: fixed;
  height: inherit;
  z-index: 1;
}
.pop_wrapper {
  height: 85vh;
}
#right {
  padding: 0px 0px 0px 5px;
  background-color: #ffff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-left: 260px;
}

.purchased-text {
  line-height: 20px;
}
.modal-body {
  padding: 0px;
}
@media (max-width: 1024px) {
  #left {
    display: none;
  }
  #right {
    border-radius: 10px;
    margin: 0px;
  }
}
.modal-open .modal {
  overflow: hidden;
}
.custom-modal-class {
  margin-top: 6%;
  width: 80% !important;
}

.trainings-acc-popup {
  width: 100%;
  overflow-y: auto;
  height: 71vh;
}
@media (min-width: 768px) and (max-width: 1024px) {
  .pop_wrapper {
    height: 65vh;
  }
  .modal-dialog {
    vertical-align: top;
    margin-top: 14%;
  }
}
@media screen and (max-width: 767px) {
  .custom-modal-class {
    margin-top: 3%;
    width: 95% !important;
  }
  .pop_wrapper {
    height: 90vh;
  }
}
</style>
