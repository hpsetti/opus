<template>
  <div class="content-wrappper">
    <section class="row welcome-banner mr-0">
      <div class="col-xs-12 col-sm-8 col-md-9 pl-20">
        <div class="col-xs-12 pl-0 welcome-header">
          Welcome to Optimal Product Usability Suite
        </div>
        <div class="col-xs-12 pl-0 description-text">
          A ready-to-go structure for performing all required HFE tasks for
          medical products.
        </div>
        <div class="col-xs-12 pl-0 description-text">
          Accelerate your work with helpful training, tools, and templates.
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-3 p-0 mt-25 demo--container">
        <div class="col-xs-12 mb-15 d-flex align-items-center">
          <img src="/static/images/dashboard/request_demo.svg" alt="" />
          <span
            @click="navigateToContactUs('request-a-demo')"
            class="pl-15 cursor-pointer"
            >Request a demo</span
          >
        </div>
        <div
          class="col-xs-12 mb-15 d-flex align-items-center cursor-pointer"
          @click="openDemoVideo()"
        >
          <img src="/static/images/dashboard/play_icon.svg" alt="" />
          <span class="pl-15">Play demo video</span>
        </div>
      </div>
    </section>
    <div
      class="opus-bg-green-1 hfe-header"
      v-if="hfeInsightsList && hfeInsightsList.length"
    >
      <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div
            class="item"
            v-for="(list, index) in hfeInsightsList"
            :key="index"
            :class="index === 0 ? 'active' : ''"
          >
            <div class="d-flex carousel-xs-alignment">
              <div
                class="content d-flex flex-direction-column justify-content-center"
              >
                <div class="text-button-label black-2 mb-10 mt-20">
                  HFE Insights
                </div>
                <div class="text-h3 mb-20">{{ list.hfe_insight_headline }}</div>
                <div
                  v-if="screenWidth > 640"
                  class="text-subtitle-1 blue-3 mb-20"
                >
                  <span class="cursor-pointer" @click="goToInsights(list.id)"
                    >Read more</span
                  >
                </div>
                <OpusDots
                  v-if="screenWidth > 640"
                  class="mb-30"
                  :count="hfeInsightsList.length"
                  :position="index + 1"
                ></OpusDots>
              </div>
              <div>
                <img
                  class="logo"
                  src="/static/images/dashboard/hfe_insights.svg"
                />
              </div>
              <div
                v-if="screenWidth <= 640"
                class="dots--container d-flex flex-direction-column"
              >
                <div class="text-subtitle-1 blue-3 mb-20">
                  <span class="cursor-pointer" @click="goToInsights(list.id)"
                    >Read more</span
                  >
                </div>
                <OpusDots
                  class="mb-30"
                  :count="hfeInsightsList.length"
                  :position="index + 1"
                ></OpusDots>
              </div>
            </div>
          </div>
        </div>
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <div class="my-auto">
            <img
              src="/static/images/icons/insights_left_icon.svg"
              class="opus-icon"
            />
          </div>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <div class="my-auto">
            <img
              src="/static/images/icons/insights_right_icon.svg"
              class="opus-icon"
            />
          </div>
        </a>
      </div>
    </div>
    <section>
      <section class="top-resources">
        <div class="text-h3 blue-1">Top Resources</div>
        <div class="m-0 mt-10 top-resources-alignment">
          <!-- <div
            @click="performAction(resource)"
            class="xs-alignment-top-resources col-xs-6 col-md-6 mt-20 d-flex align-items-center cursor-pointer pl-0"
            v-for="(resource, index) in topResourcesList"
            :key="index"
          >
            <img class="opus-icon" :src="getImageUrl(resource.icon)" alt="" />
            <span class="pl-15 blue-1 text-subtitle-2">{{
              resource.name
            }}</span>
          </div> -->
          <div
            @click="performAction(resource)"
            class="xs-alignment-top-resources mt-20 d-flex align-items-center cursor-pointer pl-0"
            v-for="(resource, index) in topResourcesList"
            :key="index"
          >
            <img class="opus-icon" :src="getImageUrl(resource.icon)" alt="" />
            <span class="pl-15 blue-1 text-subtitle-2">{{
              resource.name
            }}</span>
          </div>
        </div>
      </section>
      <section class="opus-bg-blue-1">
        <div class="d-flex flex-direction-column">
          <div class="refer-offer d-flex align-items-center">
            <img src="/static/images/dashboard/referral_offer.svg" />
            <div
              class="flex-grow d-flex flex-direction-column row-gap-10 justify-content-center"
            >
              <div class="text-h4 blue-1">Get a free OPUS training!</div>
              <div class="text-subtitle-1 blue-1">
                Add 5 new team members and get a free eLearning
                <div v-if="screenWidth < 640" class="mt-auto learn-more-xs">
                  <BaseButton @click="openTeamModal">Learn more</BaseButton>
                </div>
              </div>
            </div>
            <div v-if="screenWidth >= 640">
              <BaseButton @click="openTeamModal">Learn more</BaseButton>
            </div>
          </div>
          <div class="content-container">
            <DashboardCard
              id="training-dashboard"
              :heading="training.heading"
              :items="training.content"
              @view-all="navigateToPage('Trainings')"
            ></DashboardCard>
          </div>
        </div>
      </section>
      <section class="content-container">
        <DashboardCard
          id="hfe-dashboard"
          :heading="hfe.heading"
          :items="hfe.content"
          clickable
          @click="openHFE"
          @view-all="navigateToPage('HFE Process')"
        ></DashboardCard>
      </section>
      <section class="content-container mt-15 mb-10 row">
        <div class="notif-title">
          <div class="d-flex align-items-center">
            <img
              src="/static/images/icons/side-bar/notification.svg"
              alt=""
              class="opus-icon"
            />
            <span class="pl-15 blue-1 text-h4">Notifications</span>
          </div>
        </div>
        <div class="col-xs-12 p-0" v-if="notificationsList.length">
          <div v-for="(notification, index) in notificationsList" :key="index">
            <NotificationItem
              :notification="notification"
              :canDismiss="false"
            ></NotificationItem>
          </div>
          <div class="pr-15 text-right">
            <span
              class="text-subtitle-1 blue-3 cursor-pointer"
              @click="navigateToPage('notifications')"
              >View All
            </span>
          </div>
        </div>
        <div
          class="mt-15 mb-15 text-center"
          v-if="!notificationsList.length && !loaderStatus"
        >
          You do not have any notifications!
        </div>
      </section>
    </section>
    <video-popup
      :wistiaSourceUrlId="overviewVideoId"
      @closeOverViewPopup="closePopup"
    ></video-popup>
    <documents-info
      :loader="loaderStatus"
      :templateInfo="templateInfo"
      :userId="userId"
      @setCartInfo="setCartInfo"
      @downloadDoc="downloadDocument"
    ></documents-info>
    <div class="inner-noti col-xs-12" v-if="banners.tools_banner_active">
      <tools-banner :notification="banners"></tools-banner>
    </div>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../UIComponents/Loader.vue';
import VideoPopup from './VideoPopup.vue';
import DocumentsInfo from '../UIComponents/Modals/DocumentsMoreInfo.vue';
import { getTopResourcesList, getPricingData } from '../../apis/dashboard';
import { getDashboardNotifications } from '../../apis/notification';
import getNavigationList from '../../apis/navigation';
import { getDocumentsListByType } from '../../apis/documents';
import { getTrainingData } from '../../apis/lmsTraining';
import downloadZipFile from '../UIComponents/mixins/documentsMixin';
import toolsBanner from '../SystemNotifications/toolsBanner.vue';
import { removeFromCart } from '../../apis/cart';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import EventBus from '../../utils/event-bus';
import NotificationItem from '../Notification/NotificationItem.vue';
import DashboardCard from './DashboardCard.vue';
import OpusDots from '../UIComponents/OpusDots.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import { getHfeData } from '../../apis/hfeInsightsAdmin';

export default {
  props: ['userId'],
  mixins: [downloadZipFile],
  data() {
    return {
      loaderStatus: false,
      headers: {
        1: 'Template',
        2: 'User Profile',
        3: 'Use Environment Descriptions Library'
      },
      documentType: null,
      templateInfo: null,
      documentTypeId: null,
      overviewVideoId: null,
      cardsList: ['HFE Process', 'Project Plans', 'Training'],
      topResourcesList: [],
      notificationsList: [],
      projectsList: null,
      trainingList: null,
      documentsList: [],
      banners: [],
      isFromLogin: false,
      isDemoVideo: false,
      cartInfo: {},
      selectResource: {},
      training: {
        heading: {
          text: 'Training',
          path: '/static/images/icons/side-bar/training.svg'
        },
        content: []
      },
      hfe: {
        heading: {
          text: 'HFE Process',
          path: '/static/images/icons/side-bar/hfe_process.svg'
        },
        content: [
          {
            id: 'intro',
            text: 'Intro',
            path: '/static/images/icons/side-bar/intro.svg'
          },
          {
            id: 'research',
            text: 'Research',
            path: '/static/images/icons/side-bar/research.svg'
          },
          {
            id: 'analyze',
            text: 'Analyze',
            path: '/static/images/icons/side-bar/analyze.svg'
          },
          {
            id: 'design',
            text: 'Design',
            path: '/static/images/icons/side-bar/design.svg'
          },
          {
            id: 'evaluate',
            text: 'Evaluate',
            path: '/static/images/icons/side-bar/evaluate.svg'
          },
          {
            id: 'validate',
            text: 'Validate',
            path: '/static/images/icons/side-bar/validate.svg'
          },
          {
            id: 'submit',
            text: 'Submit',
            path: '/static/images/icons/side-bar/submit.svg'
          }
        ]
      },
      hfeInsights: {
        count: 6,
        position: 1
      },
      hfeInsightsList: {},
      screenWidth: 0
    };
  },
  components: {
    VideoPopup,
    DocumentsInfo,
    toolsBanner,
    Loader,
    AddRemoveCartPopup,
    NotificationItem,
    DashboardCard,
    OpusDots,
    BaseButton
  },
  async created() {
    this.loaderStatus = true;
    this.isFromLogin = JSON.parse(localStorage.getItem('isFromLogin'));
    await Promise.all([
      this.getPricedata(),
      this.getProjectsList(),
      this.getTopResourcesList(),
      this.getNotificationsList(),
      this.getTrainings(),
      this.getHfeInsightsData()
    ]);
    if (this.$route.path === '/home/demovideo') {
      this.openDemoVideopopup();
    }
    this.loaderStatus = false;
  },
  watch: {
    $route() {
      if (this.$route.path === '/home/demovideo') {
      this.openDemoVideopopup();
    }
    },
  },
  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/login') {
      localStorage.setItem('isFromLogin', true);
    } else {
      localStorage.setItem('isFromLogin', false);
    }
    next();
  },

  methods: {
    openDemoVideo() {
      this.$router.push('/home/demovideo');
      this.openDemoVideopopup();
    },
    openDemoVideopopup() {
      $('#overview-video').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    closePopup() {
      this.overviewVideoId = null;
      $('#overview-video').modal('hide');
    },
    async getPricedata() {
      this.isFromLogin = JSON.parse(localStorage.getItem('isFromLogin'));
      if (this.isFromLogin) {
        const toolName = 'Root Cause Analysis Wizard';
        const userId = JSON.parse(localStorage.getItem('userId'));
        const response = await getPricingData(toolName, userId);
        this.banners = response.data;
      }
    },
    async getHfeInsightsData() {
      this.loaderStatus = true;
      const response = await getHfeData();
      if (response) {
        this.hfeInsightsList = response;
      }
      this.loaderStatus = false;
    },
    async getProjectsList() {
      this.projectsList = await getNavigationList();
    },
    async getTrainings() {
      // this.trainingList = await getTrainingData();
      const response = await getTrainingData();
      this.trainingList = response.lms_user_course_list;
      this.training.content = this.trainingList.map((training) => ({
        id: training.course_id,
        text: training.title,
        path: this.getImageUrl(training.status_icon_path)
      }));
    },
    async closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      await this.getModalUpdatedData();
    },
    async getModalUpdatedData() {
      this.documentsList = await getDocumentsListByType(this.userId, 1);
      this.templateInfo = this.documentsList.find(
        (document) => document.document_id === this.selectResource.documentId
      );
    },
    setCartInfo(cartDetails) {
      this.cartInfo = { ...cartDetails.cartInfo };
      this.selectedCartItem = cartDetails.item;
      if (
        $('#document-more-info').hasClass('in') &&
        this.cartInfo.type === 'add'
      ) {
        $('#document-more-info').modal('hide');
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    async removeFromCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const res = await removeFromCart(
        this.selectedCartItem.cart_status.cart_id
      );
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if ($('#document-more-info').hasClass('in')) {
          $('#document-more-info').modal('hide');
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        await this.getModalUpdatedData();
        this.emitter.emit('cart-items-updated');
      }
    },

    downloadDocument(downloadPath) {
      this.downloadZipFile(downloadPath);
    },

    async getTopResourcesList() {
      this.topResourcesList = await getTopResourcesList();
      const documentTypes = [];
      this.topResourcesList.forEach((resource) => {
        if (
          resource.documentLibraryTypeId &&
          !documentTypes.includes(resource.documentLibraryTypeId)
        ) {
          documentTypes.push(resource.documentLibraryTypeId);
        }
      });
      await this.getTemplatesList(documentTypes);
    },

    async getTemplatesList(documentTypeIds) {
      documentTypeIds.forEach(async (documentTypeId) => {
        const response = await getDocumentsListByType(
          this.userId,
          documentTypeId
        );
        this.documentsList.push(...response);
      });
    },

    async getNotificationsList() {
      const response = await getDashboardNotifications(this.userId);
      if (response.length > 4) response.length = 4;
      this.notificationsList = response.map((notification) => {
        if (notification.type === 'QNA_CONSULTING')
          // eslint-disable-next-line no-param-reassign
          notification.type = 'INSTRUCTOR_TRAINING';
        return notification;
      });
    },

    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },

    performAction(resource) {
      if (resource.type === 'navigation') {
        this.$router.push(resource.navigationUrl);
      } else if (resource.type === 'video') {
        this.playVideo(resource.sourceUrlId);
      } else {
        this.selectResource = resource;
        this.openDocumentsModal(resource);
      }
    },

    openDocumentsModal(selectedDocument) {
      this.templateInfo = this.documentsList.find(
        (document) => document.document_id === selectedDocument.documentId
      );
      this.documentTypeId = selectedDocument.documentLibraryTypeId;
      this.documentType = this.headers[selectedDocument.documentLibraryTypeId];
      $('#document-more-info').modal('show');
    },

    navigateToPage(viewAll) {
      if (viewAll === 'HFE Process') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'view_all_button_click',
          view_all_type: 'hfe_process'
        });
        this.$router.push('/opusprocess');
      } else if (viewAll === 'Project Plans') {
        this.$router.push('/projectplans');
      } else if (viewAll === 'notifications') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'view_all_button_click',
          view_all_type: 'notifications'
        });
        this.$router.push('/notifications');
      } else {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'view_all_button_click',
          view_all_type: 'trainings'
        });
        this.$router.push('/trainings');
      }
    },

    playVideo(sourceUrl) {
      this.overviewVideoId = sourceUrl;
      $('#overview-video').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    navigateToContactUs(referrer) {
      this.$router.push({ name: 'ContactUs', params: { referrer } });
    },
    openAddProject() {
      $('#addProject').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    closeAddProjectPopup() {
      $('#addProject').modal('hide');
    },
    goToInsights(id) {
      this.$router.push({ name: 'HFEInsight', params: { id } });
    },
    openTeamModal() {
      this.emitter.emit('menuSelected', 'team');
      $('#basePopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    openHFE(selectedItem) {
      this.$router
        .push({
          name: 'OpusProcess',
          params: {
            selectedItem
          }
        })
        .catch(() => {});
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped>
.inner-noti {
  position: fixed;
  bottom: 10px;
  display: flex;
  width: calc(100% - 250px);
  justify-content: center;
}
.welcome-header {
  font-size: 36px;
  line-height: 47px;
  margin-bottom: 12px;
}
.content-container {
  margin-left: 24px;
  margin-right: 24px;
}
.top-resources {
  margin-top: 32px;
  margin-left: 60px;
  margin-bottom: 48px;
}
.top-resources-alignment {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.welcome-banner {
  min-height: 120px;
  height: auto;
}

.description-text:first-child {
  margin-top: 12px;
}

.notif-title {
  margin-left: 25px;
}
.hfe-header {
  padding-right: 16px;
  padding-left: 16px;
}
.hfe-header .content {
  margin-left: 44px;
  flex-grow: 1;
}
.hfe-header .logo {
  margin-right: 54px;
  margin-left: 54px;
  width: 335px;
  height: 100%;
}

.dots--container {
  align-self: start;
  margin-left: 44px;
}
.refer-offer {
  margin: 20px 56px 20px 20px;
}
.refer-offer img {
  margin-left: 34px;
  margin-right: 20px;
}

.round-button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  float: none;
  border: 0.5px solid #0b3c61;
  margin: 0 4px;
  background: transparent;
}
.round-button.active {
  background: #0b3c61;
}

/* carousel-control classes are over ridden for OPUS styles */

.carousel-control.right,
.carousel-control.left {
  background-image: none !important;
}
.left.carousel-control {
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 0% !important;
  bottom: unset !important;
}
.right.carousel-control {
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 2% !important;
  bottom: unset !important;
}
.carousel-indicators {
  position: relative;
  left: 77px;
  top: -15px;
}
.carousel-indicators .active {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  float: none;
  border: 0.5px solid #0b3c61;
  margin: 0 4px;
  background: #0b3c61;
}
.carousel-control:focus {
  opacity: 0.5 !important;
}
.carousel-control:hover {
  opacity: 0.9 !important;
}

.learn-more-xs {
  margin-top: 24px;
}

@media only screen and (max-width: 1200px) {
  .welcome-banner {
    display: flex;
    flex-direction: column;
  }

  .welcome-banner .div:first-child {
    padding-right: 0;
  }

  .description-text {
    padding: 0;
  }

  .demo--container {
    margin-top: 33px;
  }
}

@media only screen and (max-width: 720px) {
  .carousel-xs-alignment {
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }

  .carousel-xs-alignment .content {
    align-self: flex-start;
  }
}

@media only screen and (max-width: 640px) {
  .right.carousel-control,
  .left.carousel-control {
    top: 17% !important;
  }

  .refer-offer img {
    align-self: flex-start;
  }
}

@media only screen and (max-width: 500px) {
  .top-resources-alignment {
    grid-template-columns: 1fr;
  }
  .xs-alignment-top-resources {
    width: 100%;
  }
}

@media only screen and (max-width: 360px) {
  .content-container {
    margin-left: 15px;
    margin-right: 15px;
  }
}

@media only screen and (max-width: 359px) {
  .refer-offer {
    flex-direction: column;
    text-align: center;
  }

  .refer-offer img {
    align-self: unset;
  }
}
</style>
