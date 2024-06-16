<template>
  <div class="content-ht">
    <nav class="main-header">
      <!-- Extra sidebar for Mobile Device -->
      <div class="mobileHeader" :class="{ displayBlock: displaySide }">
        <div class="media-sidebar">
          <div class="page-description txt-alg-rt mr-tp-10">
            {{ loggedInUser.company }}
          </div>
          <div class="mobile-user-info txt-alg-rt mr-tp-10">
            <span
              class="userProfileDropDownMobile collapsed parentCollapse"
              id="userProfileSettings"
              href="#settingsDropDown"
              data-toggle="collapse"
            >
              {{ loggedInUser.first_name + ' ' + loggedInUser.last_name }}
              <img
                src="/static/images/icons/chevron_up.svg"
                class="downCarret mr-lt-4"
              />
              <img
                src="/static/images/icons/chevron_up.svg"
                class="upCarret mr-lt-4"
              />
            </span>
            <img
              class="profilePicMobile"
              v-if="!loggedInInitialsFlag"
              :src="imageData"
            />
            <span
              class="profilePicMobile profilePicTitle"
              v-if="loggedInInitialsFlag"
              >{{ loggedInInitials }}</span
            >
          </div>
          <ul
            class="user-question-title"
            @click="openAskUsModal"
            v-if="roleId === 1 || roleId === 12"
          >
            <img src="/static/images/icons/askus_hfe.svg" />
            <li class="li-askus">Ask us an HFE question!</li>
            <li class="li-askus d-none"><p class="li-askus-text">Ask us an HFE question!<span class="li-askus-subtext">Explore protocol support options in Consulting</span></p></li>
          </ul>
        </div>
      </div>
      <div class="logo_wrapper text-center">
        <span class="burger-toggle" @click="$emit('mobilesidebar')">
          <svg
            width="28"
            height="20"
            viewBox="0 0 28 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="1"
              x2="27"
              y2="1"
              stroke="#0B3C61"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="1"
              y1="10"
              x2="27"
              y2="10"
              stroke="#0B3C61"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="1"
              y1="19"
              x2="27"
              y2="19"
              stroke="#0B3C61"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <div v-if="roleId === 13">
          <router-link to="/compliancewire-marketplace">
            <img class="logo-img" src="/static/images/logos/OPUS_Logo.png" />
          </router-link>
        </div>
        <div class="logo-mobile-alignment" v-else>
          <router-link to="/home">
            <img class="logo-img" src="/static/images/logos/OPUS_Logo.png" />
          </router-link>
        </div>
      </div>
      <div class="body-wrapper d-flex justify-content-between">
        <div class="col-lg-7 col-md-7 col-sm-6" style="padding-left: 0px">
          <div class="col-md-1 col-sm-1 separator-line">
            <img src="/static/images/logos/line.png" alt />
          </div>
          <div class="col-md-11 col-sm-11 company_title">
            <div class="page-description pd-lt-20">
              {{ loggedInUser.company }}
            </div>
            <div class="page-subheading pd-lt-20">{{ activeMenuTitle }}</div>
          </div>
        </div>
        <div class="col-lg-8 col-md-8 col-sm-8">
          <div class="help-support">
            <div
              class="section-support-info"
              v-if="roleId === 1 || roleId === 12"
            >
              <ul class="user-question-title" @click="openAskUsModal" v-if="isAskUs">
                <img src="/static/images/icons/askus_hfe.svg" />
                <li class="li-askus">Ask us an HFE question!</li>
              </ul>
              <ul class="user-question-title" @click="openAskUsRedirect" v-else>
                <img src="/static/images/icons/askus_hfe.svg" />
                <li class="li-askus"><p class="li-askus-text">Ask us an HFE question!<span class="li-askus-subtext">Explore {{ customMessage }} support options in Consulting</span></p></li>
              </ul>
            </div>
            <div
              class="section-support-info"
              :class="{ 'margin-neg-4': roleId !== 13 }"
            >
              <ul
                class="pd-lt-0"
                :class="{
                  'mt-7': roleId === 5 || roleId === 7 || roleId === 11
                }"
              >
                <li class="userProfileDropDown">
                  {{ loggedInUserTitle }}
                  <div class="dropdown dropdown-export openOnHover mr-lt-4">
                    <div
                      class="dropdown-toggle upanddown-arrow"
                      id="menu0"
                      data-toggle="dropdown"
                    ></div>
                    <ul
                      class="dropdown-menu dropdown-menu-right dropdown-settings notify"
                    >
                      <li @click="openPopup('profile')" v-if="roleId != 10">
                        <a class="flex">
                          <div class="inline-flex">
                            <img
                              class="img-size"
                              src="/static/images/icons/profile_icon.svg"
                              alt
                            />
                          </div>
                          <div class="settings-title">
                            <div class="li-title">Profile</div>
                          </div>
                        </a>
                      </li>

                      <li
                        @click="openPopup('team')"
                        v-if="roleId !== 4 && roleId !== 10 && roleId !== 13"
                      >
                        <a class="flex">
                          <div class="inline-flex">
                            <img
                              class="img-size"
                              src="/static/images/icons/settings_icon.svg"
                              alt="settings-icon"
                            />
                          </div>
                          <div class="settings-title">
                            <div class="li-title">Account Settings</div>
                          </div>
                        </a>
                      </li>

                      <!-- <li @click="switchAccounts" v-if="accountsList.length > 0">
                        <a class="flex" >
                          <div class="inline-flex">
                            <img class="img-size" src="/static/images/icons/switch_account.svg" alt />
                          </div>
                          <div class="settings-title">
                            <div class="li-title">Choose Accounts</div>
                          </div>
                        </a>
                      </li> -->

                      <li @click="openPopup('tour')" v-if="roleId !== 13">
                        <a class="flex">
                          <div class="inline-flex">
                            <img
                              class="img-size"
                              src="/static/images/icons/virtual_tour.svg"
                              alt
                            />
                          </div>
                          <div class="settings-title">
                            <div class="li-title">Virtual Tour</div>
                          </div>
                        </a>
                      </li>
                      <li @click="goToReleaseNotes" v-if="roleId !== 13">
                        <a class="flex">
                          <div class="inline-flex">
                            <img
                              class="img-size"
                              src="/static/images/icons/header_about.svg"
                              alt
                            />
                          </div>
                          <div class="settings-title">
                            <div class="li-title">Release Notes</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a class="flex" @click="logout">
                          <div class="inline-flex">
                            <img
                              class="img-size"
                              src="/static/images/icons/logout_icon.svg"
                              alt
                            />
                          </div>
                          <div class="settings-title">
                            <div class="li-title">Logout</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  class="profile-pic avatar-background"
                  v-if="!loggedInInitialsFlag"
                  v-bind:style="{ backgroundImage: 'url(' + imageData + ')' }"
                ></li>
                <li
                  class="profile-pic profile-pic-title"
                  v-if="loggedInInitialsFlag"
                >
                  {{ loggedInInitials }}
                </li>
              </ul>
            </div>
            <div
              class="section-support-info"
              v-if="roleId === 5 || roleId === 7 || roleId === 11"
            >
              <ul class="admin-title">
                <li class="admin-circle"></li>
                <li>Admin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="mobileProfileSettings collapse" id="settingsDropDown">
      <div
        class="mobileProfileSettingsDropDown border-bottom-property"
        v-if="roleId != 10"
      >
        <span @click="openPopup('profile')" class="cursor_pointer">
          <img
            class="img-size"
            src="/static/images/icons/profile_icon.svg"
            alt
          />
          <span class="mobilePrfSettingsTxt">Profile</span>
        </span>
      </div>
      <div
        class="mobileProfileSettingsDropDown border-bottom-property"
        v-if="roleId !== 4 && roleId !== 10 && roleId !== 12"
      >
        <span @click="openPopup('notifications')" class="cursor_pointer">
          <img
            class="img-size"
            src="/static/images/icons/settings_icon.svg"
            alt="settings-icon"
          />
          <span class="mobilePrfSettingsTxt">Account Settings</span>
        </span>
      </div>
      <!-- <div class="mobileProfileSettingsDropDown border-bottom-property" v-if="accountsList.length > 0">
        <span @click="switchAccounts" class="cursor_pointer">
          <img class="img-size" src="/static/images/icons/switch_account.svg" alt />
          <span class="mobilePrfSettingsTxt">Choose Accounts</span>
        </span>
      </div> -->
      <!--
      <div class="mobileProfileSettingsDropDown border-bottom-property">
        <span @click="openPopup('tour')" class="cursor_pointer">
          <img class="img-size" src="/static/images/icons/virtual_tour.svg" alt />
          <span class="mobilePrfSettingsTxt">Virtual Tour</span>
        </span>
      </div>
      <div class="mobileProfileSettingsDropDown border-bottom-property">
        <span @click="help" class="cursor_pointer">
          <img class="img-size" src="/static/images/icons/phone_icon.svg" alt />
          <span class="mobilePrfSettingsTxt">Customer Support</span>
        </span>
      </div>
      <div class="mobileProfileSettingsDropDown border-bottom-property">
        <span @click="help" class="cursor_pointer">
          <img class="img-size" src="/static/images/icons/help_icon.svg" alt />
          <span class="mobilePrfSettingsTxt">Help</span>
        </span>
      </div>
      -->
      <div class="mobileProfileSettingsDropDown">
        <span @click="logout" class="cursor_pointer">
          <img
            class="img-size"
            src="/static/images/icons/logout_icon.svg"
            alt
          />
          <span class="mobilePrfSettingsTxt">Logout</span>
        </span>
      </div>
    </div>
    <base-popup
      :regWatchprefTab="regWatchprefTab"
      :userAction="userAction"
      @popUpClosed="popUpClosed"
      @logoutUser="logoutUser"
      :account_id="account_id"
      :roleId="roleId"
    ></base-popup>
    <!-- <switch-account-modal :accountsList="accountsList"></switch-account-modal> -->
    <!-- <feedback-popup></feedback-popup> -->
    <ask-us-modal></ask-us-modal>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import EventBus from '../../utils/event-bus';
import BasePopup from '../ProfileAccountSettings/ProfileBasePopup.vue';
// import FeedbackPopup from './FeedbackPopup.vue';
// import SwitchAccountModal from './SwitchAccountModal.vue';
import { isDashboardCustomizable } from '../../apis/dashboardCustomization';
import askUsModal from './askUsModal.vue';
import { getLogoutLogs } from '../../apis/login';
import Loader from '../UIComponents/Loader.vue';

export default {
  components: {
    // SwitchAccountModal,
    BasePopup,
    // FeedbackPopup,
    askUsModal,
    Loader
  },
  props: {
    accountsList: Array,
    roleId: Number,
    displaySide: Boolean,
    account_id: Number
  },
  data() {
    return {
      regWatchprefTab: '',
      userAction: '',
      loggedInUser: {},
      errors: [],
      loggedInInitials: '',
      imageData: '',
      loggedInInitialsFlag: false,
      activeMenuTitle: '',
      isDashboardCustomizable: false,
      loggedInUserTitle: '',
      loaderStatus: false,
      isAskUs: true,
      phpData: {},
    };
  },
  watch: {
    displaySide(val) {
      $(document.body).addClass('disableBodyScroll');
      if (!val) {
        $(document.body).removeClass('disableBodyScroll');
        if (!$('#userProfileSettings').hasClass('collapsed')) {
          $('#userProfileSettings').trigger('click');
        }
      }
    },
    async $route() {
      if (this.$route.name === 'Dashboard') {
        await this.checkDashboardCustomizable();
      }
      this.isAskUs = true;
    }
  },
  methods: {
    async addLogoutLog() {
      const response = await getLogoutLogs();
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: response.data
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data
        });
      }
    },
    openAskUsModal() {
      $('#ask-us-modal').modal('show');
    },
    // switchAccounts() {
    //   $('#switchAccountModal').modal({
    //     backdrop: 'static',
    //     keyboard: false,
    //   });
    // },
    async checkDashboardCustomizable() {
      this.isDashboardCustomizable = await isDashboardCustomizable(
        JSON.parse(localStorage.getItem('userData')).account_id,
        JSON.parse(localStorage.getItem('userData')).role_id
      );
    },
    popUpClosed() {
      if (this.userAction === 'profile') {
        this.emitter.emit('updateProfile', true);
      }

      this.userAction = '';
      $('#basePopup').modal('hide');
    },
    openPopup(data) {
      this.regWatchprefTab = '';
      this.userAction = data;
      if (data === 'tour') {
        this.$emit('mobilesidebar');
      }
      $('#basePopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    // feedback() {
    //   window.dataLayer = window.dataLayer || [];
    //   window.dataLayer.push({
    //     event: 'Feedback Button',
    //   });
    //   $('#feedbackPopup').modal({
    //     backdrop: 'static',
    //     keyboard: false,
    //   });
    // },
    async logout() {
      this.loaderStatus = true;
      await this.addLogoutLog();
      this.finalLogout();
      this.loaderStatus = false;
    },
    goToReleaseNotes() {
      this.$router.push({ name: 'ReleaseNotes' });
    },
    finalLogout() {
      // socket.removeAllListeners(`alertExportRegistrationDataToExcel_${localStorage.getItem('userId')}`);
      // socket.removeAllListeners(`alertExportCertificateDataToExcel_${localStorage.getItem('userId')}`);
      // socket.removeAllListeners(`alertSaveMultiRegistrationDetails_${localStorage.getItem('userId')}`);
      // socket.removeAllListeners(`alertSaveMultiCertificateDetails_${localStorage.getItem('userId')}`);
      document.cookie =
        'Authorization=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie =
        'redirect_url=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      localStorage.clear();
      this.$router.push('/login');
    },
    getInitials(firstname, lastname) {
      return `${firstname ? firstname.charAt(0).toUpperCase() : ''}${
        lastname ? lastname.charAt(0).toUpperCase() : ''
      }`;
    },
    loadProfile() {
      this.loggedInUser = JSON.parse(localStorage.getItem('userData'));
      this.imageData = this.loggedInUser.user_image;
      if (this.imageData === '' || this.imageData === null) {
        this.loggedInInitialsFlag = true;
      } else {
        this.loggedInInitialsFlag = false;
      }
      this.loggedInInitials = this.loggedInUser
        ? this.getInitials(
            this.loggedInUser.first_name,
            this.loggedInUser.last_name
          )
        : '';
      this.setupLoggedInUserTitle();
      this.emitter.emit('getProfileDetails', this.loggedInUser);
    },
    setupLoggedInUserTitle() {
      let loggedInUserTitle = '';
      let maxCharsToDisplay = 15;
      if (window.innerWidth < 1230) {
        maxCharsToDisplay = 8;
      } else if (window.innerWidth < 1441) {
        maxCharsToDisplay = 11;
      } else if (window.innerWidth < 1700) {
        maxCharsToDisplay = 12;
      } else if (window.innerWidth < 2160) {
        maxCharsToDisplay = 14;
      }
      if (this.loggedInUser.first_name.length > 16) {
        loggedInUserTitle = `${this.loggedInUser.first_name.substr(
          0,
          maxCharsToDisplay
        )}..`;
      } else {
        loggedInUserTitle = this.loggedInUser.first_name;
      }
      if (this.loggedInUser.last_name.length > 16) {
        loggedInUserTitle += ` ${this.loggedInUser.last_name.substr(
          0,
          maxCharsToDisplay
        )}..`;
      } else {
        loggedInUserTitle += ` ${this.loggedInUser.last_name}`;
      }
      this.loggedInUserTitle = loggedInUserTitle;
    },
    logoutUser() {
      this.logout();
    },
    storageEventListener() {
      if (
        localStorage.getItem('reLoad') &&
        localStorage.getItem('reLoad') === 'true'
      ) {
        window.location.href = `${window.location.origin}/home`;
      }
      if (localStorage.length <= 0) {
        this.$router.push('/login');
      }
    },
    openAskUsRedirect() {
      // This is static page that we need to redirect will not change
      
      this.isAskUs = true;
      if (this.phpData.message === "hf-validation-test-report-template") {
        this.$router.push('/schedule-consulting/conduct-hf-validation-test?consultingId=19');
      } else if (this.phpData.message === 'hf-validation-test-protocol-template') {
        this.$router.push('/schedule-consulting/review-and-provide-feedback-on-hf-validation-test-protocol?consultingId=17');
      } else if (this.phpData.message === "formative-usability-test-protocol-template") {
        this.$router.push('/schedule-consulting/conduct-formative-usability-test?consultingId=14');
      }
    },
    async handleMessageEvent(e) {
      if (e.origin !== import.meta.env.VITE_VUE_APP_RS_URL) {
        return null;
      }
      this.phpData = JSON.parse(e.data);
      if (this.phpData && (this.phpData.message === "hf-validation-test-report-template" || this.phpData.message === "formative-usability-test-protocol-template" || this.phpData.message === "hf-validation-test-protocol-template")) {
        this.isAskUs = false;
      } else {
        this.isAskUs = true;
      }
      return null;
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property, consistent-return
    customMessage() {
      if(this.phpData.message === "hf-validation-test-report-template"){
        return 'validation'
      }if(this.phpData.message === "formative-usability-test-protocol-template") {
        return 'formative'
      }if(this.phpData.message === "hf-validation-test-protocol-template") {
        return'protocol'
      }
    }
  },
  async created() {
    const reqPath = document.cookie.replace(
      /(?:(?:^|.*;\s*)RequestedPath\s*\=\s*([^;]*).*$)|^.*$/, // eslint-disable-line no-useless-escape
      '$1'
    );
    if (reqPath != null && reqPath.length > 0) {
      document.cookie = 'RequestedPath=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      this.$router.push(reqPath);
    }
    this.emitter.on('activeMenuTitle', (data) => {
      this.activeMenuTitle = data;
    });
    this.activeMenuTitle = this.$route.meta.title;
    this.emitter.on('updateProfile', () => {
      this.loadProfile();
    });
    this.emitter.on('openAccountSettingsPopup', (data) => {
      this.openPopup(data);
    });
    await this.checkDashboardCustomizable();
  },
  mounted() {
    this.loadProfile();
    window.addEventListener('storage', this.storageEventListener, false);
    this.emitter.on('notificationSettings', (data) => {
      this.regWatchprefTab = 'RegWatch';
      this.userAction = data;
      $('#basePopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    });
    window.addEventListener('resize', this.setupLoggedInUserTitle);
    window.addEventListener('message', this.handleMessageEvent, false);
  },
  unmounted() {
    window.removeEventListener('message', this.handleMessageEvent);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.setupLoggedInUserTitle);
    window.removeEventListener('storage', this.storageEventListener);
  }
};
</script>
<style scoped>
* {
  font-style: normal;
}
.logo-img {
  width: 110px;
}
.mt-7 {
  margin-top: 7px;
}
.content-ht {
  max-height: 80px;
}
.img-responsive {
  height: 60px;
}
.themeRed {
  background: #950000 !important;
}
.cursor_pointer {
  cursor: pointer;
}
.border-bottom-property {
  border-bottom: 1px solid #ccc;
}
.mobProfSet {
  list-style: none;
  padding-left: 16px;
}
.mobProfSet li {
  padding-top: 16px;
  padding-left: 16px;
}
.mobilePrfSettingsTxt {
  vertical-align: middle;
  margin-left: 10px;
}
.mobileProfileSettingsDropDown {
  font-size: 16px;
  color: #0b3c61;
  padding: 8px 8px 8px 0px;
}
.downCarret {
  transform: rotate(180deg);
}
.parentCollapse > .downCarret {
  display: none;
}
.parentCollapse.collapsed > .downCarret {
  display: inline-block;
}
.parentCollapse > .upCarret {
  display: inline-block;
}
.parentCollapse.collapsed > .upCarret {
  display: none;
}
.mobileProfileSettings {
  position: fixed;
  width: 230px;
  top: 0;
  bottom: 0;
  padding: 0 5px 0px 20px;
  background-color: #fff;
  left: 0;
  margin-top: 80px;
  color: black;
  z-index: 100;
}
.profilePicMobile {
  width: 30px;
  height: 30px;
  border-radius: 68px;
}
.profilePicTitle {
  background: rgb(33, 133, 208);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.mr-tp-10 {
  margin-top: 4px !important;
}
.txt-alg-rt {
  text-align: right;
}
.mobileHeader {
  display: none;
  padding: 10px;
  background: #ffffff;
  position: fixed;
  width: 250px;
  float: left;
  height: 80px;
  z-index: 99;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.displayBlock {
  display: block !important;
}
.edit-icon {
  padding: 8px;
  font-size: 22px;
  cursor: pointer;
}
@media only screen and (min-width: 1025px) {
  .displayBlock {
    display: none !important;
  }
  .mobileProfileSettings {
    z-index: 0;
  }
}
.burger-toggle {
  margin: 18px 0px 0px 10px;
  float: left;
  display: none;
  cursor: pointer;
}
.pd-lt-0 {
  padding-left: 0px;
}
.mr-lt-4 {
  margin-left: 4px;
}
.userProfileDropDownMobile {
  vertical-align: middle;
  color: #0c3859;
  padding: 5px 4px 0 0 !important;
  cursor: pointer;
}
.userProfileDropDown {
  color: #0c3859;
  padding: 5px 15px 0px 0px !important;
}
.pd-lt-20 {
  padding-left: 20px;
}
.body-wrapper {
  padding-left: 250px;
  width: 100%;
  z-index: 30;
  background: #ffffff;
  position: fixed;
  height: 90px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.logo_wrapper {
  width: 250px;
  padding: 6px 20px 0px 15px;
  position: fixed;
  background: #ffffff;
  height: 80px;
  z-index: 40;
  float: left;
}
.separator-line {
  float: left;
  padding: 2px 0px 2px 0px;
  margin-top: 10px;
  width: 1px;
  background-color: #0b3c61;
  height: 60px;
}
.separator-line > img {
  height: 60px;
}
.company_title {
  float: left;
  padding-left: 15px;
}
.help-support-wrapper {
  float: right;
  padding: 0px 15px;
}
.fl-rt {
  float: right;
}
.page-description {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  line-height: 28px;
  color: #0c3859;
  margin-top: 8px;
}
.page-subheading {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 26px;
  line-height: 33px;
  color: #0c3859;
  margin-top: 5px;
}
span.name {
  padding-right: 10px;
  color: #0c3859;
  padding-top: 10px;
}

.main-header {
  height: 80px;
  background: #0b3c61;
}
.section-support {
  display: flex;
  justify-content: flex-end;
}
.help-support .section-support ul {
  margin: 8px 0;
  padding-inline-start: 15px;
}
.feedback-box {
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  background: #00518a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 7px 7px;
  padding: 14px 12px 8px;
  cursor: pointer;
}
.feedback-box i {
  margin-right: 10px;
}
.img-size {
  width: 18px;
  height: 18px;
}
@media only screen and (max-width: 1024px) {
  .body-wrapper {
    display: none;
  }
  .logo_wrapper {
    float: unset;
    width: unset;
    position: inherit;
  }
  .logo_wrapper > a {
    float: right;
  }
  .help-support-wrapper,
  .company_title,
  .separator-line {
    display: none;
  }
  .burger-toggle {
    display: block;
  }
  .page-description {
    font-size: 20px;
  }
  .user-question-title {
    height: 70px;
  }
  .li-askus {
    list-style: none;
    float: right !important;
    padding: 0 7px;
    margin-top: -33px;
    margin-left: 30px;
  }
  .li-askus-text {
    font-weight: 700 !important;
    margin-top: 3px !important;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }
  .li-askus-subtext {
    font-weight: 300 !important;
    margin-top: 3px !important;
    font-size: 10px;
    line-height: 16px;
    margin-left: 5px;
    color: #ffffff;
  }
}
.avatar-background {
  background-size: cover;
  background-position: top center;
}
ul.comn-dropdown {
  float: initial;
  margin-left: -25px;
  text-align: left;
}
span.upanddown-arrow-accounts {
  padding-left: 7px;
}
li.admin-circle {
  background-color: #fff;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: 3px;
}
ul.admin-title {
  padding: 5px 7px 5px;
  color: #fff;
  margin-right: 15px;
  margin-bottom: 0;
  margin-top: 0px;
  background-color: #4c9e45;
}
ul.admin-title li {
  font-weight: 500;
}
ul.user-question-title {
  padding: 8px;
  color: #fff;
  margin-right: 0px;
  margin-bottom: 10px;
  margin-top: 0px;
  background-color: #0c3859;
  border-radius: 0px 0px 6px 6px;
  cursor: pointer;
}
ul.user-question-title li {
  font-weight: 500;
}
.li-askus {
  list-style: none;
  float: right !important;
  padding: 0 7px;
}
.li-askus-text {
  font-weight: 700 !important;
  margin-top: 3px !important;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
}
.li-askus-subtext {
  font-weight: 300 !important;
  margin-top: 3px !important;
  font-size: 16px;
  line-height: 22px;
  margin-left: 5px;
  color: #ffffff;
}
.margin-neg-4 {
  margin-top: -4px;
}
@media (max-width: 1024px) {
  .mobile-user-info {
    font-size: 10px;
    margin-top: 0px;
  }
  .mobileHeader {
    padding-left: 2px;
    height: 140px;
  }
  .profilePicMobile {
    width: 20px;
    height: 20px;
    border-radius: 50px;
  }
}

@media screen and (max-width: 1024px) {
  .logo-mobile-alignment {
    text-align: right;
  }
}
</style>
