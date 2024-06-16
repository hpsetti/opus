<template>
  <div
    class="content"
    v-bind:class="{ 'theme-red': roleId === 5 || roleId === 11 }"
  >
    <div
      class="mobile-overlay"
      v-bind:class="[
        { 'display-Block': displaySide, 'display-none': !displaySide }
      ]"
      @click="displaySide = false"
    ></div>
    <header-nav
      v-if="roleId"
      :accountsList="accountsList"
      :roleId="roleId"
      @mobilesidebar="mobilesidebar"
      :displaySide="displaySide"
      :account_id="account_id"
    ></header-nav>
    <header-menu
      v-if="roleId"
      :rep_client="rep_client"
      :roleId="roleId"
      :userId="userId"
      @mobilesidebar="mobilesidebar"
      :userCompany="userCompany"
      :userName="userName"
      :userEmail="userEmail"
      :accountId="account_id"
      :account_type_id="account_type_id"
      :displaySide="displaySide"
      :showSEFlag="showSEFlag"
    ></header-menu>
    <view-cart-wrapper></view-cart-wrapper>
    <purchase-expiry v-if="isHome"></purchase-expiry>
    <router-view
      v-if="roleId"
      :roleId="roleId"
      :account_id="account_id"
      :userId="userId"
    ></router-view>
    <timeout-warning></timeout-warning>
  </div>
</template>
<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import HeaderNav from './HeaderNav.vue';
import HeaderMenu from './HeaderMenu.vue';
import ViewCartWrapper from './ViewCartWrapper.vue';
import PurchaseExpiry from './PurchaseExpiry.vue';
import EventBus from '../../utils/event-bus';
import TimeoutWarning from './TimeoutWarning.vue';
import { getUserData } from '../../apis/profile';
import { getAllCountries } from '../../apis/countriesList';
import { getRefreshToken, getAccountsList } from '../../apis/login';
import { getSubscribedPlans, getPlans, getMapping } from '../../apis/plans';
import { postPlan } from '../../apis/psm';
import checkSmartExchangeProjects from '../../apis/smartExchange';
import { getCookie } from '../../utils/common';
import { getTeamMemberRestriction } from '../../apis/team';
import postMarketoFormData from '../../apis/marketo';
dayjs.extend(utc);

export default {
  data() {
    return {
      accountsList: [],
      userCompany: '',
      userName: '',
      userEmail: '',
      roleId: '',
      userId: '',
      progressStatus: false,
      percentage: 0,
      errors: [],
      progressTitle: '',
      progressTitleStatus: '',
      showHelp: false,
      account_id: '',
      countryList: [],
      displaySide: false,
      rep_client: '',
      refreshTokenInterval: '',
      rep_client_services: [1, 2, 4],
      timeoutID: null,
      mappingPlansIds: [],
      account_type_id: null,
      showSEFlag: false,
      isHome: false,
    };
  },
  components: {
    TimeoutWarning,
    HeaderNav,
    HeaderMenu,
    ViewCartWrapper,
    PurchaseExpiry
  },
  methods: {
    async getAccountsList() {
      const response = await getAccountsList();
      if (response.status_code === 200) {
        this.accountsList = response.data.accounts.filter(
          (accounts) => accounts.account_id !== this.account_id
        );
      } else {
        this.$notify({
          clean: true
        });
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Unable to fetch accounts',
          duration: -1,
          closeOnClick: true
        });
      }
    },
    mobilesidebar() {
      this.displaySide = !this.displaySide;
    },
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i += 1) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },

    updateProgressStatus() {
      this.progressStatus = false;
    },
    async getUserRole() {
      this.loaderStatus = true;
      const userDataStorage = await getUserData();
      const utmCodes = JSON.parse(localStorage.getItem('utm_codes'));
      if (userDataStorage) {
        this.roleId = userDataStorage.role_id;
        this.userId = userDataStorage.id;
        this.account_id = userDataStorage.account_id;
        this.rep_client = userDataStorage.rep_client;
        this.account_type_id = userDataStorage.account_type_id;
        localStorage.setItem('userId', userDataStorage.id);
        localStorage.setItem('userData', JSON.stringify(userDataStorage));
        if (
          this.roleId === 4 &&
          !this.$route.path.includes('/report') &&
          !this.$route.path.includes('/market-place/service/1') &&
          !this.$route.path.includes('/PermissionAccess')
        ) {
          window.location.href = '/report/summary';
        }
      }
      const marketoForm = {
        first_name: userDataStorage.first_name,
        last_name: userDataStorage.last_name,
        email: userDataStorage.email,
        company: userDataStorage.company,
        unstandardized_country: userDataStorage.country,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer
          ? document.referrer
          : window.location.href,
        form_control: 'Log in'
      };
      if (utmCodes) {
        marketoForm.gAKeyword = utmCodes.keyword;
        marketoForm.utmcampaign = utmCodes.utm_campaign;
        marketoForm.utmcontent = utmCodes.utm_content;
        marketoForm.utmmedium = utmCodes.utm_medium;
        marketoForm.utmmktoadid = utmCodes.utm_mktoadid;
        marketoForm.utmmktocampaign = utmCodes.utm_mktocampaign;
        marketoForm.utmsource = utmCodes.utm_source;
        marketoForm.utmterm = utmCodes.utm_term;
      }
      postMarketoFormData(marketoForm);
    },
    // addSocketEvents(userId) {
    //   socket.on(`alertExportRegistrationDataToExcel_${userId}`, (data) => {
    //     this.percentage = data;
    //   });

    //   socket.on(`alertExportCertificateDataToExcel_${userId}`, (data) => {
    //     this.percentage = data;
    //   });

    //   socket.on(`alertSaveMultiRegistrationDetails_${userId}`, (data) => {
    //     if (!this.progressStatus) {
    //       this.progressStatus = true;
    //       this.progressTitle = 'registrations';
    //       this.progressTitleStatus = 'import';
    //       this.showHelp = false;
    //     }
    //     this.percentage = data;
    //   });

    //   socket.on(`alertSaveMultiCertificateDetails_${userId}`, (data) => {
    //     if (!this.progressStatus) {
    //       this.progressStatus = true;
    //       this.progressTitle = 'certificates';
    //       this.progressTitleStatus = 'import';
    //       this.showHelp = false;
    //     }
    //     this.percentage = data;
    //   });
    // },
    // removeSocketEvents(userId) {
    //   socket.removeAllListeners(`alertExportRegistrationDataToExcel_${userId}`);
    //   socket.removeAllListeners(`alertExportCertificateDataToExcel_${userId}`);
    //   socket.removeAllListeners(`alertSaveMultiRegistrationDetails_${userId}`);
    //   socket.removeAllListeners(`alertSaveMultiCertificateDetails_${userId}`);
    // },
    async getAndAddServices() {
      if (this.rep_client) {
        const addedServices = await getSubscribedPlans(this.account_id);
        await this.validateNAddServices(addedServices);
      }
    },
    async validateNAddServices(addedServices) {
      let servicesPlansIds = [];
      const plans = await getPlans();
      addedServices.forEach((plan) => {
        const planService = this.mappingPlansIds.find(
          (each) => each.plan_id === plan.id
        );
        if (planService) {
          servicesPlansIds = [
            ...new Set(servicesPlansIds.concat(planService.service_id))
          ];
        }
      });
      const validUntil = dayjs.utc().add('years', 1).subtract(1, 'days');
      this.rep_client_services.forEach(async (value) => {
        if (!servicesPlansIds.some((plan) => plan === value)) {
          const addon = [];
          const planDetails = plans.find((plan) => plan.id === value);
          if (planDetails.id === 1) {
            addon.push({
              account: false,
              active: true,
              id: 2,
              price: 0,
              valid_from: dayjs.utc(),
              valid_until: validUntil,
              volume: 2097152
            });
            addon.push({
              account: false,
              active: true,
              id: 3,
              price: 0,
              valid_from: dayjs.utc(),
              valid_until: validUntil,
              volume: 250
            });
          }
          const formData = {
            account_id: this.account_id,
            active: true,
            add_on: addon,
            operation: 6,
            payment_mode: 4,
            plan_id: planDetails.id,
            plan_price: 0,
            service_type: 'premium',
            total_amount: 0,
            valid_from: dayjs.utc(),
            valid_until: validUntil
          };
          await postPlan(formData);
        }
      });
    },
    async checkTeamMemberRestriction() {
      if (this.account_type_id !== 1 || this.account_type_id !== 5) {
        const response = await getTeamMemberRestriction({
          is_rep:
            this.account_type_id === 2 || this.account_type_id === 4 ? 1 : 0
        });
        if (response.status_code === 200 && response.restrict_user) {
          $('#teamMemberRestrictionPopup').modal({
            backdrop: 'static',
            keyboard: false
          });
        }
      }
    },
    idleTimer() {
      window.addEventListener('mousemove', this.resetTimer, false); // catches mouse movements
      window.addEventListener('mousedown', this.resetTimer, false); // catches mouse movements
      window.addEventListener('keypress', this.resetTimer, false); // catches mouse clicks
      window.addEventListener('click', this.resetTimer, false); // catches scrolling
      window.addEventListener('scroll', this.resetTimer, false); // catches keyboard actions
      window.addEventListener('keydown', this.resetTimer, false);
    },
    resetTimer() {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        $('#warningTimeout').modal({ backdrop: 'static', keyboard: false });
      }, 900000);
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/home') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    }
  },
  async created() {
    if (this.$route.path === '/home') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    [this.countryList] = await Promise.all([
      getAllCountries(),
      getRefreshToken(),
      this.checkTeamMemberRestriction(),
      this.getAccountsList()
    ]);
    this.idleTimer();
    await getRefreshToken();
    const token = getCookie('Authorization').split('Bearer ')[1];
    this.showSEFlag = await checkSmartExchangeProjects(token);
    await this.getUserRole();
    this.mappingPlansIds = await getMapping();
    await this.getAndAddServices();
    this.emitter.on('getProfileDetails', (data) => {
      this.userCompany = data.company;
      this.userName = `${data.first_name} ${data.last_name}`;
      this.userEmail = data.email;
    });
    this.emitter.on('tourStart', () => {
      this.tourStatus = true;
      $(window).scrollTop(0);
      $('.sidebar-col').scrollTop(0);
      $('body').addClass('hide_scroll');
      this.mobilesidebar();
    });
    this.emitter.on('tourEnd', () => {
      this.tourStatus = false;
      $('body').removeClass('hide_scroll');
    });
    this.refreshTokenInterval = setInterval(getRefreshToken, 1680000);
    await this.getAccountsList();
  },
  beforeUnmount() {
    clearInterval(this.refreshTokenInterval);
    window.removeEventListener('mousemove', this.resetTimer); // catches mouse movements
    window.removeEventListener('mousedown', this.resetTimer); // catches mouse movements
    window.removeEventListener('keypress', this.resetTimer); // catches mouse clicks
    window.removeEventListener('click', this.resetTimer); // catches scrolling
    window.removeEventListener('scroll', this.resetTimer);
    window.removeEventListener('keydown', this.resetTimer);
    clearTimeout(this.timeoutID);
    this.emitter.off();
  }
};
</script>
<style scoped>
@media only screen and (min-width: 1025px) {
  .mobile-overlay {
    display: none !important;
  }
}
.display-Block {
  display: block;
}
.display-none {
  display: none;
}
.mobile-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  cursor: pointer;
}
</style>
