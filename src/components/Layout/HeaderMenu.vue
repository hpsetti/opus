<template>
  <div>
    <nav class="navbar nav-bar-class" :class="{ displayNav: !displaySide }">
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div>
        <aside>
          <section>
            <div class="row">
              <div class="col-sm-3 col-md-3 sidebar-content">
                <div
                  class="sidebar-col"
                  :class="{
                    displaySide: displaySide,
                    'theme-admin': roleId === 5 || roleId === 7 || roleId === 11
                  }"
                >
                  <ul
                    :class="[
                      ![5, 7, 11].includes(roleId)
                        ? 'primary-list'
                        : 'primary-list-admin'
                    ]"
                    v-if="roleId && roleId != 4 && roleId != 10 && roleId != 13"
                    id="accordion"
                    style="margin-top: 15px"
                  >
                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('home') != -1 }"
                      v-on:click="
                        redirect('/home');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/dashboard.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('home') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Dashboard</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{
                        active: activeMenu.indexOf('opusprocess') != -1
                      }"
                      v-on:click="
                        redirect('/opusprocess');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/hfe_process.svg"
                        alt=""
                        :class="{
                          'invert-img': !(
                            activeMenu.indexOf('opusprocess') != -1
                          )
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">HFE Process</span>
                      </a>
                    </li>
                    <li>
                      <ul id="accordion" style="margin-top: 1px">
                        <li
                          class="p-relative panel main-content menu_item active-icon has-sub-list"
                          data-toggle="collapse"
                          href="#collapseOne"
                          aria-expanded="false"
                          :class="{
                            active: activeMenu === '/projectplans',
                            'font-600':
                              activeMenu.indexOf('/projectplans') != -1
                          }"
                          v-on:click="redirect('/projectplans')"
                        >
                          <img
                            class="img-24"
                            src="/static/images/icons/side-bar/project_plans.svg"
                            alt=""
                            :class="{
                              'invert-img': !(
                                activeMenu.indexOf('/projectplans') != -1
                              )
                            }"
                          />
                          <span
                            class="content ml-20 main-list-header project-plan-text"
                            >Project Plans</span
                          >
                        </li>
                        <div
                          id="collapseOne"
                          class="panel-collaspse collapse col-xs-12 p-0"
                          data-parent="#accordion"
                        >
                          <div class="accordian" id="accordion-two">
                            <div
                              class="panel main-content-list accordion-menu col-xs-12 p-0 font-14 collapsed"
                              v-for="project in navigationList.projects"
                              :key="project.id"
                              data-toggle="collapse"
                              :data-target="'#test' + project.id"
                            >
                              <div v-if="projectsIdList[`${project.id}`]">
                                <div
                                  class="accordian-tab cursor-pointer"
                                  :class="{
                                    'tab-active':
                                      activeMenu ===
                                      '/projectplans/' + project.id,
                                    'font-600':
                                      activeMenu.indexOf(
                                        '/projectplans/' + project.id
                                      ) != -1
                                  }"
                                  v-on:click="
                                    redirect(
                                      `/projectplans` + `/` + project.id,
                                      project.id
                                    );
                                    emitEvent();
                                  "
                                >
                                  {{ subStrName(project.name) }}
                                </div>
                              </div>
                              <div
                                :id="'test' + project.id"
                                class="collapse pl-0"
                                aria-labelledby="headingOne"
                                data-parent="#accordion-two"
                              >
                                <div class="card-body">
                                  <ul
                                    class="sub_menu_list"
                                    v-for="(subList, i) in project.includedMod"
                                    :key="i"
                                  >
                                    <li
                                      class="col-xs-12 main-content-list active-icon project-sub-list"
                                      :class="{
                                        'tab-active':
                                          activeMenu.indexOf(
                                            `/projectplans/` +
                                              project.id +
                                              '/' +
                                              subList.name.toLowerCase()
                                          ) != -1
                                      }"
                                      v-on:click.stop="
                                        redirect(
                                          `/projectplans/` +
                                            project.id +
                                            '/' +
                                            subList.name.toLowerCase()
                                        );
                                        emitEvent();
                                      "
                                    >
                                      <div class="col-xs-12 p-0 flex-wrapper">
                                        <img
                                          class="img-24"
                                          :src="
                                            '/static/images/icons/side-bar/' +
                                            subList.name.toLowerCase() +
                                            '.svg'
                                          "
                                          alt=""
                                        />
                                        <span class="pl-20">{{
                                          subStrName(subList.name)
                                        }}</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('trainings') != -1 }"
                      v-on:click="
                        redirect('/trainings'),
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/training.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('trainings') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Training</span>
                      </a>
                    </li>

                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('documents') != -1 }"
                      v-on:click="
                        redirect('/documents');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/documents.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('documents') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Documents</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('tools') != -1 }"
                      v-on:click="
                        redirect('/tools');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/tools.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('/tools') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Tools</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('kpa') != -1 }"
                      v-if="showKPA"
                      v-on:click="
                        redirect('/known-problem-analysis-wizard');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/tools.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('/kpa') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">KPA</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{
                        active:
                          activeMenu === '/consulting' ||
                          activeMenu.includes('/schedule-consulting')
                      }"
                      v-on:click="
                        redirect('/consulting');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/consultings.svg"
                        alt=""
                        :class="{
                          'invert-img': !(
                            activeMenu.indexOf('layout/consulting') != -1
                          )
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Consulting</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{
                        active: activeMenu.indexOf('notifications') != -1
                      }"
                      v-on:click="
                        showAlertPage('/notifications');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/notification.svg"
                        alt=""
                        :class="{
                          'invert-img': !(
                            activeMenu.indexOf('notifications') != -1
                          )
                        }"
                      />
                      <span
                        v-if="notificationCount > 0"
                        class="notification-count"
                        >{{ notificationCount }}</span
                      >
                      <a href="javascript:void(0);">
                        <span
                          :class="
                            notificationCount > 0
                              ? 'notification-content'
                              : 'content'
                          "
                          >Notifications</span
                        >
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{
                        active: activeMenu.indexOf('market-place') != -1
                      }"
                      v-on:click="
                        redirect('/market-place');
                        emitEvent();
                      "
                    >
                      <div class="p-relative">
                        <img
                          class="img-24"
                          src="/static/images/newMarketplace/basket.svg"
                          alt=""
                          :class="{
                            'invert-img': !(
                              activeMenu.indexOf('market-place') != -1
                            )
                          }"
                        />
                        <span
                          v-if="cartDetails.total_items"
                          class="cart-count"
                          >{{ cartDetails.total_items }}</span
                        >
                      </div>
                      <a href="javascript:void(0);">
                        <span class="content">Marketplace</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('/contact') != -1 }"
                      v-on:click="
                        redirect('/contact');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/contact_bold.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('/contact') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Contact Us</span>
                      </a>
                    </li>
                  </ul>
                  <ul
                    class="menu mt-25"
                    v-if="roleId === 5 || roleId === 7 || roleId === 11"
                  >
                    <li>
                      <h5 class="main-content-service mb-10">Admin</h5>
                    </li>
                    <li
                      class="menu_item active-icon"
                      v-on:click="redirect('/launchpad')"
                      v-if="roleId === 5 || roleId === 11"
                      :class="{
                        active: activeMenu.indexOf('launchpad') !== -1
                      }"
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/launchpad.svg"
                        alt=""
                        :class="{
                          'invert-img': !(
                            activeMenu.indexOf('launchpad') !== -1
                          )
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Launch pad</span>
                      </a>
                    </li>
                    <!-- <li
                      class="menu_item active-icon pl-20"
                      v-on:click="redirect('/timeslots')"
                      v-if="roleId === 5 || roleId === 11"
                      :class="{ 'active': activeMenu.indexOf('timeslots')!==-1 }"
                    >
                    <img class="img-24" src="/static/images/icons/calendar.svg" alt=""
                        :class="{'invert-img' : !(activeMenu.indexOf('launchpad')!==-1)}"
                      >
                      <a href="javascript:void(0);">
                        <span class="content">Time slots</span>
                      </a>
                    </li> -->
                  </ul>
                  <!-- List for compliancewire -->
                  <ul class="menu mt-25" v-if="roleId === 13">
                    <li
                      class="menu_item active-icon"
                      v-on:click="redirect('/compliancewire-marketplace')"
                      v-if="roleId === 13"
                      :class="{
                        active:
                          activeMenu.indexOf('compliancewire-marketplace') !==
                          -1
                      }"
                    >
                      <img
                        class="img-24"
                        src="/static/images/newMarketplace/basket.svg"
                        alt=""
                        :class="{
                          'invert-img': !(
                            activeMenu.indexOf('compliancewire-marketplace') !==
                            -1
                          )
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Market Place</span>
                      </a>
                    </li>
                    <li
                      class="menu_item active-icon"
                      :class="{ active: activeMenu.indexOf('/contact') != -1 }"
                      v-on:click="
                        redirect('/contact');
                        emitEvent();
                      "
                    >
                      <img
                        class="img-24"
                        src="/static/images/icons/side-bar/contact_bold.svg"
                        alt=""
                        :class="{
                          'invert-img': !(activeMenu.indexOf('/contact') != -1)
                        }"
                      />
                      <a href="javascript:void(0);">
                        <span class="content">Contact Us</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </nav>
    <UserConsentPopup
      v-if="roleId !== 13"
      :optInType="optInType"
      :showUserConsentNeverBtn="showUserConsentNeverBtn"
    ></UserConsentPopup>
    <template-popup
      v-if="roleId !== 13"
      :displayRep="displayRep"
      :showSElink="showSElink"
    />
    <china-user-consent-popup
      :consentType="consentType"
      :showUserConsentNeverBtnChina="showUserConsentNeverBtnChina"
      v-if="roleId !== 13 && consentType && consentType.id"
    />
    <survey-popup
      v-if="roleId !== 13 && surveyData.display_survey !== false"></survey-popup>
  </div>
</template>

<script>
import $ from 'jquery';
import EventBus from '../../utils/event-bus';
// import { getUserNewNotificationsCount } from '../../apis/notification';
import getNotificationsList from '../../apis/navigation';
import { getAllNotificationCount } from '../../apis/notification';
import TemplatePopup from '../VirtualTour/TemplatePopup.vue';
import UserConsentPopup from '../misc/UserConsentPopup.vue';
import ChinaUserConsentPopup from './ChinaUserConsentPopup.vue';
import SurveyPopup from './SurveyPopup.vue';
import { getCartList } from '../../apis/cart';
import { getUserData } from '../../apis/profile';
import {
  getConsent,
  getUserConsentCountries,
  getChinaValidity
} from '../../apis/team';
import {
  getCountryConsentType,
  getCountryConsent,
  getSurvey
} from '../../apis/userConsent';

export default {
  components: {
    TemplatePopup,
    UserConsentPopup,
    ChinaUserConsentPopup,
    SurveyPopup
  },
  props: {
    roleId: Number,
    userCompany: String,
    userName: String,
    userEmail: String,
    accountId: Number,
    userId: Number,
    displaySide: Boolean,
    rep_client: Boolean,
    account_type_id: Number,
    showSEFlag: Boolean
  },
  data() {
    return {
      projectsIdList: {},
      activeMenu: this.$route.path,
      errors: [],
      userData: {},
      newNotificationsCount: '',
      newNotificationCountFlag: false,
      newNotificationCountText: 0,
      timer: '',
      notificationCount: null,
      premiumServices: [],
      addedServices: [],
      navigationList: {},
      cartDetails: {},
      showUserConsentNeverBtn: false,
      showUserConsentNeverBtnChina: false,
      optInType: null,
      consentType: '',
      callChinaConsent: false,
      surveyData: {},
      showKPA: false,
    };
  },
  computed: {
    displayRep() {
      return (
        this.roleId === 5 ||
        this.roleId === 7 ||
        this.account_type_id === 2 ||
        this.account_type_id === 4
      );
    },
    showSElink() {
      if (
        this.account_type_id === 1 &&
        (this.roleId === 5 || this.roleId === 11)
      ) {
        return true;
      }
      if (
        this.account_type_id === 2 &&
        (this.roleId === 9 ||
          this.roleId === 3 ||
          this.roleId === 8 ||
          this.roleId === 10)
      ) {
        return this.showSEFlag;
      }
      return false;
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessageEvent, false);
  },
  unmounted() {
    window.removeEventListener('message', this.handleMessageEvent);
  },
  methods: {
    async getUserConsent() {
      const optInData = await getUserConsentCountries();
      const res = await getConsent();
      if (res && res.display_consent) {
        const data = optInData.find((e) =>
          e.countries.some(
            (f) => f.toLowerCase() === this.userData.country.toLowerCase()
          )
        );
        this.optInType = data ? data.opt_in : '';
        if (this.optInType === 'pipl' && this.callChinaConsent) {
          $('#chinaUserConsentPopup').modal({
            backdrop: 'static',
            keyboard: false
          });
          this.showUserConsentNeverBtnChina = res.display_never;
        } else {
          $('#user-consent').modal({
            backdrop: 'static',
            keyboard: false
          });
          this.showUserConsentNeverBtn = res.display_never;
        }
      }
    },
    async getSurveyConsent() {
      const res = await getSurvey();
      this.surveyData.display_survey = res.display_survey;
      this.surveyData.display_never = res.display_never;
      if(this.surveyData.display_survey) {
        $('#surveyConsentPopup').modal({
              backdrop: 'static',
              keyboard: false
            });
      }
    },
    async getChinaConsent() {
      if (this.callChinaConsent) {
        const countryListStorage = JSON.parse(
          localStorage.getItem('countryList')
        );
        const countryId = countryListStorage.find(
          (country) =>
            country.country_name.toLowerCase() ===
            this.userData.country.toLowerCase()
        ).id;
        this.consentType = await getCountryConsentType(countryId);
        const displayConsent = await getCountryConsent({ consent_type_id: 1 });
        if (displayConsent) {
          $('#chinaUserConsentPopup').modal({
            backdrop: 'static',
            keyboard: false
          });
        }
      }
    },
    subStrName(name) {
      if (name.length > 15) return `${name.substr(0, 12)}...`;
      return name;
    },
    redirectfullServices(url) {
      window.open(url, '_blank');
    },
    emitEvent() {
      this.$emit('mobilesidebar');
      this.setupCartList();
    },
    showAlertPage(url) {
      this.newNotificationCountFlag = false;
      this.redirect(url);
    },
    redirect(url, projectId = null) {
      if (projectId) {
        const isCollapsed = $(`#test${projectId}`).hasClass('in');
        Object.keys(this.projectsIdList).forEach((id) => {
          if (isCollapsed) {
            this.projectsIdList[id] = true;
          } else {
            this.projectsIdList[id] = +id === projectId;
          }
        });
      }
      if (url !== this.$route.path) {
        if (url === '/projectplans' && this.navigationList.projects) {
          this.navigationList.projects.forEach((project) => {
            this.projectsIdList[project.id] = true;
            $(`#test${project.id}`).collapse('hide');
          });
        }
        this.$router.push(url);
      }
    },
    async getNavigationlist() {
      this.navigationList = await getNotificationsList();
      if (
        this.$route.meta.title === 'Project Plans' &&
        !this.$route.params.id &&
        this.navigationList.projects
      ) {
        this.navigationList.projects.forEach((project) => {
          this.projectsIdList[project.id] = true;
        });
      }
      if (this.$route.meta.title === 'Project Plans' && this.$route.params.id) {
        setTimeout(() => {
          if (this.navigationList.projects) {
            this.navigationList.projects.forEach((project) => {
              if (project.id === +this.$route.params.id) {
                this.showAccordian(project.id);
                $(`#test${project.id}`).collapse('show');
              } else {
                this.projectsIdList[project.id] = false;
              }
            });
          }
        }, 0);
      }
    },
    /**
     * This is a global message event listener function on window object
     * Allow only PHP sent messages to process
     * window.postMessage() allows you to send 'message' event
     */
    async handleMessageEvent(e) {
      if (e.origin !== import.meta.env.VITE_VUE_APP_RS_URL) {
        return null;
      }
      const msg = JSON.parse(e.data);
      if (msg.channel === 'hfe' && msg.event === 'cart-items-updated') {
        await this.setupCartList();
      }
      return null;
    },
    async setupCartList() {
      this.cartDetails = await getCartList(this.userId);
    },
    async getNotificationCount() {
      const count = await getAllNotificationCount(this.userId);
      this.notificationCount = count.count;
    },
    showAccordian(id) {
      this.projectsIdList[id] = true;
      this.$forceUpdate();
    }
  },
  async created() {
    const response = await getChinaValidity();
    this.callChinaConsent = response.china_consent;
    this.userData = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : await getUserData();
    this.getChinaConsent();
    this.emitter.on('cart-items-updated', this.setupCartList);
    this.emitter.on('get-notification-count', this.getNotificationCount);
    this.emitter.on('highlightNav', (data) => {
      this.activeMenu = data;
    });
    await Promise.all([this.getNavigationlist(), this.setupCartList()]);
    // await this.getNewNotificationsCount();
    // this.timer = setInterval(this.getNewNotificationsCount, 180000);
    if (this.$route.meta.title === 'Project Plans') {
      $('#collapseOne').collapse('show');
    }
    this.emitter.on('fetchCartList', async () => {
      await this.setupCartList();
    });
    await this.getUserConsent();
    await this.getSurveyConsent();
    await this.getNotificationCount();
    this.emitter.on('tourStart', () => {
      const sideBar = document.querySelector('#accordion');
      sideBar.scrollBy(0, -500);
    });

    this.emitter.on('contentTypeChanged', () => {
      const sideBar = document.querySelector('#accordion');
      sideBar.scrollBy(0, 500);
    });

    this.emitter.on('contentTypeChangedBack', () => {
      const sideBar = document.querySelector('#accordion');
      sideBar.scrollBy(0, -500);
    });

    this.emitter.on('tourEnd', () => {
      const sideBar = document.querySelector('#accordion');
      sideBar.scrollBy(0, -500);
    });
  },
  watch: {
    $route(to) {
      this.activeMenu = to.path;
      this.emitter.emit('activeMenuTitle', to.meta.title);
    },
    activeMenu() {
      this.getNotificationCount();
      this.emitter.on('highlightNav', (data) => {
        this.activeMenu = data;
      });
      if (this.$route.meta.title === 'Project Plans') {
        $('#collapseOne').collapse('show');
      } else {
        $('#collapseOne').collapse('hide');
        Object.keys(this.projectsIdList).forEach((id) => {
          $(`#test${id}`).collapse('hide');
          this.showAccordian(id);
        });
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.emitter.off('cart-items-updated', this.setupCartList);
  }
};
</script>

<style scoped>
.notification-content {
  margin-left: 0px !important;
}
.img-24 {
  height: 24px;
  width: 24px;
}

.ml-44 {
  margin-left: 44px;
}

.flex-wrapper {
  display: flex;
  align-items: center;
}

#collapseOne {
  margin-top: -13px;
}

.mt-25 {
  margin-top: 25px;
}

.main-list-header {
  font-size: 14px;
}

.invert-img {
  filter: invert(0.3) contrast(0.8);
}
.project-plan-text {
  font-size: 14px;
}
.p-relative {
  position: relative;
}

.ml-12 {
  margin-left: 12px;
}

li {
  font-weight: 300;
  cursor: pointer;
}

.font-600 {
  font-weight: 600 !important;
}

.cursor-pointer {
  cursor: pointer;
}

.vertical-align-middle {
  vertical-align: middle;
}
.cart-count {
  position: absolute;
  background: #43b4e4;
  border-radius: 50%;
  color: white;
  font-size: 10px;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  text-align: center;
}
.notification-count {
  position: relative;
  background: #43b4e4;
  border-radius: 50%;
  color: white;
  font-size: 10px;
  top: -10px;
  right: 10px;
  width: 20px;
  height: 20px;
  text-align: center;
}

.accordian-tab:hover,
.project-sub-list:hover {
  background: #c5e0c3 !important;
}

.project-sub-list {
  cursor: pointer;
  padding: 10px 0px 10px 84px;
}

.tab-active {
  padding-left: 78px !important;
  background: #c5e0c3;
  border-left: 6px solid forestgreen;
}

li .tab-active {
  font-weight: 600;
}

.btn-link:hover {
  text-decoration: none;
  color: #333333;
}

.btn-link {
  padding: 0px;
}

.accordion-menu {
  color: #333333;
}

.accordion-menu:not(.collapsed) {
  background-color: #edf5ec;
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  border-radius: 0;
}

li[aria-expanded='false'] .main-list-header:after {
  content: url(/static/images/icons/chevron_down_black.svg);
  position: absolute;
  right: 14px;
}

li[aria-expanded='true'] .main-list-header:after {
  content: url(/static/images/icons/chevron_down_black.svg);
  position: absolute;
  right: 14px;
  top: 12px;
  transform: rotate(180deg);
}

.accordian-tab {
  padding: 8px 0px 10px 84px;
}

.accordion-menu:not(.collapsed) .accordian-tab:after {
  content: url(/static/images/icons/close_icon.svg);
  display: inline-block;
  vertical-align: text-top;
  position: absolute;
  right: 10px;
}

.font-14 {
  font-size: 14px;
}

.panel {
  border: none;
  box-shadow: none;
  margin-bottom: 0px;
}

.sub_menu > .menu_item.active,
.sub_menu_list > .menu_item.active {
  padding-left: 40px !important;
}

.sidebar-col.theme-admin {
  background: #ffffff;
}
.sidebar-col.theme-admin .main-content-service {
  color: #333333;
}
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #c4c4c4;
}
.pd-tp-2 {
  padding-top: 2px;
}
.mr-rt-15 {
  margin-right: 15px;
}
.displaySide {
  display: block !important;
}
.nav-bar-class {
  position: fixed;
  z-index: 25;
}
.navbar {
  padding: 0px;
}
.mr-lt-2-6em {
  margin-left: 2.6em;
}
.custom-panel {
  margin: 0px;
  background-color: unset;
  border: 0px;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.mr-lt-0 {
  margin-left: 0px !important;
}
.flt-rht {
  float: right;
}
.showDas {
  display: block;
}
ul {
  margin-bottom: 0px;
  padding: 0px;
}
ul li {
  list-style: none;
}
li a {
  text-decoration: none;
}
.sidebar-col:hover {
  overflow-y: auto;
}
.sidebar-col {
  position: fixed;
  width: 250px;
  top: 0;
  bottom: 0;
  background: #ffffff;
  left: 0px;
  margin-top: 80px;
  /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25); */
  border-right: 0.5px solid #c4c4c4;
}

.primary-list {
  height: 96%;
  overflow: hidden;
}

.primary-list-admin {
  height: 71vh;
  overflow: hidden;
}

.primary-list:hover {
  overflow: auto;
}

.primary-list-admin:hover {
  overflow: auto;
}

li a span.content {
  margin-left: 20px;
  color: #333333;
  margin-top: 6px;
}
li.active a span {
  font-weight: 700;
}
li a span {
  font-style: normal;
  font-size: 14px;
  line-height: 21px;
  color: #333333;
}

i {
  color: #fff;
}
h5 {
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 23px;
  color: #333333;
}
span.font-cls {
  padding-left: 79px;
  position: absolute;
}

.font-chev {
  padding-left: 13px;
  position: absolute;
}
.rep-one,
.rep-two {
  padding-left: 41px;
}
.theme-admin li.menu_item:hover,
.menu_item:hover,
.menu_item.active {
  background: #edf5ec;
  opacity: 1;
}
.wrap-content {
  margin-left: 12px;
}
.sub_menu > .menu_item {
  padding-left: 48px;
}
.sub_menu_list > .menu_item {
  padding-left: 10px;
}
.sub_menu_list .active {
  font-weight: 600;
}

li.menu_item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0px 10px 40px;
  margin-bottom: 13px;
}
li.sub_menu_item {
  width: 100%;
  padding: 10px 0px 10px 38px;
}
.sub_menu_item:hover {
  background: #00518a;
}
li h5.main-content-service {
  padding: 10px 0px 4px 10px;
  color: #ffffff;
}
.panel-body {
  padding: 0px;
}
li.menu_item.active-icon.active {
  padding-left: 34px;
  font-weight: 700;
}
.menu_item.active {
  border-left: 6px solid forestgreen;
  font-weight: 600;
  opacity: 1;
  border-radius: 0px;
}
.media-sidebar {
  text-align: end;
  padding: 15px 10px 15px 0px;
  background: #0b3c61;
  color: #fff;
  display: none;
}
.fa-chevron-down {
  padding-right: 10px;
}
.fa-chevron-up {
  padding-right: 10px;
}
.fa-adn {
  padding-top: 15px;
}
span.name {
  padding-right: 10px;
}
.media-icons {
  text-align: end;
}
.comp-name {
  margin-bottom: 0px;
}
@media only screen and (max-width: 1024px) {
  .sidebar-col {
    display: none;
    margin-top: 140px;
    overflow-y: auto;
  }
  .user-question-title {
    margin-top: 13px;
  }
  .media-sidebar {
    display: block;
  }
  li.sub_menu_item {
    width: 85%;
    padding: 10px 0px 10px 38px;
  }
  .rep-one {
    padding-left: 41px;
  }
  .rep-two {
    padding-left: 41px;
  }
  .displayNav {
    z-index: unset;
  }
}

.project-list li a span.content {
  margin-top: 0px;
}
.project-list li a span.content.ml-0 {
  margin-left: 0px;
}

.side-nav-footer {
  margin-top: auto;
  padding-bottom: 20px;
}

@media screen and (min-width: 768px) and (max-width: 1366px) {
  .primary-list {
    height: 84vh;
  }
}

@media screen and (min-width: 768px) and (max-width: 1365px) {
  .primary-list-admin {
    height: 72vh;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .primary-list-admin {
    height: 78vh;
  }
}
</style>
