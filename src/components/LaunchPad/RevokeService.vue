<template>
  <div class="content-wrappper">
    <div class="col-xs-12 mt-20 p-0 search-wrapper">
      <div class="col-xs-12 search-header">
        <div class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20">
          <img
            @click="navigateToLaunchPad"
            class="back-img cursor-pointer"
            src="/static/images/icons/chevron_left_icon.svg"
            alt=""
          />
          <router-link class="tools-text font-18" to="/launchpad"
            >Service Revoke</router-link
          >
        </div>
        <div class="col-xs-12 text-primary fw-300 header-text mb-10">
          Locate OPUS User by searching the User ID or Email ID
        </div>
        <!-- SearchBox -->
        <div class="col-xs-12">
          <div class="col-xs-12 col-sm-5 p-0">
            <input
              class="search-box form-control mb-20 font-16"
              type="text"
              v-model.trim="searchKeyword"
              placeholder="Search"
              @keyup="getAccountsListForAccountSearch"
            />
            <div>
              <img
                v-if="searchKeyword"
                @click="resetSearchKeyword"
                src="/static/images/icons/danger_close_icon.svg"
                alt="close-icon"
                class="cursor-pointer search-reset"
              />
              <span class="vertical-line"></span>
              <span
                @click="getAvailableServiceForUser()"
                class="search-icon cursor-pointer"
                :class="{ 'events-none': !selectedUser }"
              >
                <img
                  src="/static/images/icons/new_search.svg"
                  alt="search-icon"
                />
              </span>
            </div>
            <div
              class="col-xs-12 no-data-text font-18 fw-700"
              v-if="searchKeyword && searchKeyword.length < 2"
            >
              Please enter at least 2 characters
            </div>
            <div
              class="col-xs-12 no-data-text font-18 fw-700"
              v-else-if="isUsersListEmpty && searchKeyword.length >= 2"
            >
              No Users Found
            </div>
            <div
              class="col-xs-12 p-0 custom-col-search"
              v-else-if="usersList.length"
            >
              <ul>
                <li
                  v-for="(user, index) in usersList"
                  :key="index"
                  @click="setAccountFieldValues(user)"
                >
                  {{ user.user_name }} - ID {{ user.user_id }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="col-xs-12 p-0 no-data-text font-18 fw-700 text-center"
            v-if="!Object.keys(userDetails).length && !searchKeyword"
          >
            Please search the user by entering the username or user id
          </div>
        </div>
        <!-- SearchBox -->
      </div>
      <template v-if="Object.keys(userDetails).length">
        <div class="col-xs-12 mt-20">
          <div class="col-xs-12">
            <h4 class="fw-700 font-18 text-primary">User Details</h4>
            <div class="ml-30 mr-30">
              <div class="col-xs-12">
                <span class="fw-600">User Name: </span
                >{{ userDetails.user_name }}
              </div>
              <div class="col-xs-12">
                <span class="fw-600">User Id: </span>{{ userDetails.user_id }}
              </div>
              <div class="col-xs-12">
                <span class="fw-600">Email: </span>{{ userDetails.email }}
              </div>
              <div class="col-xs-12">
                <span class="fw-600">Account Id: </span
                >{{ userDetails.account_id }}
              </div>
              <div class="col-xs-12 d-flex" v-if="userDetails.active">
                <span class="fw-600">Account status: </span>
                <p class="green-main pl-10">Active</p>
              </div>
              <div class="col-xs-12 d-flex" v-else>
                <span class="fw-600">Account status: </span>
                <p class="red-1 pl-10">InActive</p>
              </div>
              <!-- <div class="col-xs-12 mt-20">
                <button
                  class="emergo-green-button"
                  @click="openDeActiveUserPopup"
                >
                  Deactivate Account
                </button>
                <div class="text-regular-xsmall red-1">This will deactivate all the Account owners and Team Members linked to this account.</div>
              </div> -->
            </div>
          </div>
          <div v-if="userDetails.active">
            <div
              class="col-xs-12 mt-30"
              v-for="(action, key) in availableActions"
              :key="key"
            >
              <div class="col-xs-12 p-0">
                <label class="radio">
                  <input
                    type="radio"
                    class="radio__input"
                    :value="key"
                    v-model="planSelected"
                  />
                  <div class="radio__radio"></div>
                  <div class="fw-700 font-18 text-primary">
                    {{ action }}
                    <span
                      v-if="action === 'Purchased plans'"
                      class="required-asterisk"
                      >*</span
                    >
                  </div>
                </label>
              </div>
              <template v-if="planSelected === 'plans' && key === 'plans'">
                <!-- Accordian for PlansList -->
                <div class="d-flex flex-direction-column plans-wrapper">
                  <div class="panel-group" id="plans-accordion">
                    <div
                      class="panel wrapper-panel"
                      v-for="(list, plan) in plansList"
                      :key="plan"
                    >
                      <div class="panel-heading">
                        <div
                          class="panel-title cursor-pointer collapsed"
                          data-toggle="collapse"
                          data-parent="#plans-accordion"
                          :data-target="`#plan${plan.replaceAll(' ', '-')}`"
                        >
                          {{ plan }}
                        </div>
                      </div>
                      <div
                        :id="`plan${plan.replaceAll(' ', '-')}`"
                        class="panel-collapse collapse"
                      >
                        <div class="panel-body">
                          <div class="col-xs-12" v-if="list && list.length">
                            <div
                              class="col-xs-12 d-flex align-items-center col-gap-10"
                              v-for="item in list"
                              :key="item.plan_id"
                            >
                              <div class="select-box">
                                <div class="checkbox">
                                  <label>
                                    <input
                                      type="checkbox"
                                      :value="item.plan_id"
                                      v-model="selectedPlanIdsWithType[plan]"
                                      @change="onPlanChange(plan, list)"
                                    />
                                    <span class="cr">
                                      <i
                                        class="cr-icon glyphicon glyphicon-ok"
                                      ></i>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div
                                class="text-primary"
                                :class="{
                                  'fw-700': selectedPlanIdsWithType[
                                    plan
                                  ].includes(item.plan_id)
                                }"
                              >
                                {{ item.item_name }}
                              </div>
                            </div>
                          </div>
                          <div
                            v-else
                            class="col-xs-12 p-0 no-data-text font-18 fw-700 text-center"
                          >
                            User currently have not purchased any resources
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Accordian for PlansList -->
              </template>
            </div>
            <!-- Payment Section -->
            <div class="col-xs-12">
              <div class="col-xs-12 col-sm-4">
                <label>Comments</label>
                <textarea
                  maxlength="1500"
                  type="text"
                  class="form-control"
                  rows="5"
                  v-model.trim="formDetails.comments"
                ></textarea>
              </div>
            </div>
            <div class="col-xs-12 mt-20 pl-30 mb-30">
              <button
                @click="activateServices"
                :class="{ 'events-none': isDisabled }"
                :disabled="isDisabled"
                class="emergo-green-button"
              >
                Revoke Plans
              </button>
            </div>
            <!-- Payment Section -->
          </div>
        </div>
      </template>
      <loader :loadingStatus="loaderStatus"></loader>
      <deactivate-user-popup
        @deActivateUserAccount="deactivateUser"
      ></deactivate-user-popup>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import debounce from 'lodash/debounce';
import Loader from '../UIComponents/Loader.vue';
import DeactivateUserPopup from './DeactivateUserPopup.vue';
import {
  getAvailableService,
  getUsersList,
  deactivateUserAccount,
  revokeServicesByPlanIds
} from '../../apis/revokeService';

export default {
  data() {
    return {
      isIltWithoutDates: false,
      loaderStatus: false,
      searchKeyword: '',
      plansList: {},
      usersList: [],
      userDetails: {},
      selectedUser: null,
      isUsersListEmpty: false,
      isSelectAll: false,
      selectedPlanIdsWithType: {},
      planSelected: '',
      availableActions: {
        plans: 'Purchased plans'
      },
      formDetails: {
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        plan_price: 0
      },
      paymentOptions: [
        {
          id: 2,
          name: 'Invoice'
        },
        {
          id: 3,
          name: 'Purchase Order'
        },
        {
          id: 4,
          name: 'Others'
        }
      ]
    };
  },

  components: {
    DeactivateUserPopup,
    Loader
  },

  computed: {
    isDisabled() {
      const plansEmpty = Object.values(this.selectedPlanIdsWithType).some(
        (item) => !!item.length
      );
      if (!plansEmpty) return true;
      return false;
    }
  },

  watch: {
    searchKeyword() {
      if (this.searchKeyword.length < 2 && this.usersList.length)
        this.usersList = [];
    }
  },

  methods: {
    resetSearchKeyword() {
      this.searchKeyword = '';
    },

    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    async deactivateUser() {
      $('#deactivateUserPopup').modal('hide');
      this.loaderStatus = true;
      const response = await deactivateUserAccount(this.userDetails.account_id);
      this.loaderStatus = false;
      this.showToaster(response);
    },

    showToaster(response) {
      if (response.status_code === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: response.data
        });
        this.userDetails = {};
        this.resetAll();
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.message || 'Please try again later'
        });
      }
    },

    openDeActiveUserPopup() {
      $('#deactivateUserPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    async activateServices() {
      this.loaderStatus = true;
      const plansInfo = Object.keys(this.selectedPlanIdsWithType).reduce(
        (acc, value) => {
          if (this.selectedPlanIdsWithType[value].length) {
            if (value === 'ILT') {
              const listWithSlotIds = this.selectedPlanIdsWithType[value].map(
                (planId) => ({
                  plan_id: planId
                })
              );
              // eslint-disable-next-line no-param-reassign
              acc = [...acc, ...listWithSlotIds];
              return acc;
            }
            const listWithPlanIds = this.selectedPlanIdsWithType[value].map(
              (planId) => ({
                plan_id: planId
              })
            );
            // eslint-disable-next-line no-param-reassign
            acc = [...acc, ...listWithPlanIds];
            return acc;
          }
          return acc;
        },
        []
      );
      const payload = {
        ...this.formDetails,
        account_owner_id: +this.formDetails.account_owner_id,
        plan_price: +this.formDetails.plan_price,
        plan_info_list: plansInfo,
        account_id: this.userDetails.account_id,
        user_id: this.userDetails.user_id,
        payment_mode: 5
      };
      const res = await revokeServicesByPlanIds(payload);
      this.loaderStatus = false;
      this.showToaster(res);
    },

    getSlotTimeWithPlanIds() {
      if (this.selectedPlanIdsWithType.ILT?.length) {
        return this.plansList?.ILT.reduce((acc, value) => {
          if (value.available_time_slot)
            acc[value.plan_id] = value.available_time_slot.slot_id;
          return acc;
        }, {});
      }
      return {};
    },

    async setAccountFieldValues(user) {
      this.searchKeyword = user.user_id;
      this.usersList = [];
      this.selectedUser = user;
      this.isUsersListEmpty = false;
      this.getAvailableServiceForUser();
    },

    onSelectAll(plan, list = []) {
      if (this.isSelectAll)
        this.selectedPlanIdsWithType[plan] = list.map((item) => item.plan_id);
      else this.selectedPlanIdsWithType[plan] = [];
    },

    onPlanChange(plan, list = []) {
      if (plan === 'ILT') {
        this.isSelectAll =
          this.selectedPlanIdsWithType[plan].length === list.length;
      }
    },

    resetAll() {
      this.planSelected = '';
      this.isSelectAll = false;
      this.searchKeyword = '';
      this.selectedUser = null;
      this.formDetails = {
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        plan_price: 0
      };
      this.setPlanIdWithTypes();
    },

    async getAvailableServiceForUser() {
      this.loaderStatus = true;
      this.plansList = await getAvailableService(this.selectedUser.user_id);
      this.isIltWithoutDates = this.plansList.ILT?.find(
        (item) => !item.available_time_slot
      );
      this.setPlanIdWithTypes();
      this.userDetails = this.selectedUser;
      this.resetAll();
      this.loaderStatus = false;
    },

    setPlanIdWithTypes() {
      this.selectedPlanIdsWithType = Object.keys(this.plansList).reduce(
        (acc, value) => {
          acc[value] = [];
          return acc;
        },
        {}
      );
    },
    // eslint-disable-next-line func-names
    getAccountsListForAccountSearch: debounce(async function () {
      if (this.searchKeyword.length > 1) {
        if (this.selectedUser) this.selectedUser = null;
        this.usersList = await getUsersList(this.searchKeyword);
        this.isUsersListEmpty = !this.usersList.length;
      }
    }, 200)
  }
};
</script>

<style scoped>
.vertical-line {
  top: 5px;
  right: 42px;
  position: absolute;
  border-left: 1px solid #828282;
  height: 28px;
}

.search-reset {
  top: 7px;
  right: 50px;
  height: 22px;
  width: 22px;
}

textarea {
  resize: none;
}

.search-box {
  padding-left: 16px;
  color: #000000;
  font-weight: normal;
  padding: 14px 84px 14px 14px;
}

.search-icon {
  top: 5px;
  position: absolute;
  right: 14px;
}

.form-control {
  height: 36px;
}

/* Panels */

.panel.wrapper-panel {
  box-shadow: 0px 2px 7px rgb(0 0 0 / 25%);
  border-radius: 10px;
  margin-bottom: 10px;
}

.panel-group .panel {
  margin-bottom: 10px;
}

.panel-group {
  margin-bottom: 0px;
}

.panel-title {
  width: 100%;
  font-size: 18px;
  color: #00518a;
  padding: 5px;
}

.panel-title:after {
  content: '\e6e0';
  font-family: 'element-icons';
  float: right;
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  color: black;
  font-weight: bolder;
}

.panel-title.collapsed:after {
  content: '\e6e0';
  font-family: 'element-icons';
  display: block;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  color: black;
  font-weight: bolder;
}

/* Panel */

.events-none {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}

.plans-wrapper {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 20px 20px 10px 20px;
}

/* Radio Button */
input[type='radio'] {
  border: 1px solid #0b3c61;
  box-sizing: border-box;
}
.radio input[type='radio'],
.radio-inline input[type='radio'] {
  margin-top: 20px;
}

/* UsersList selection Menu */

.custom-col-search .bg-smoke-white {
  background-color: #f9f9f9;
}
.custom-col-search ul {
  padding-left: 0;
  max-height: 230px;
  overflow: auto;
  overflow-x: hidden;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.custom-col-search ul::-webkit-scrollbar {
  width: 8px;
}

.custom-col-search ul::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px black;
  background-color: gainsboro;
  border-radius: 10px;
}

.custom-col-search ul::-webkit-scrollbar-thumb {
  background: darkgray;
  border-radius: 10px;
}
.custom-col-search li {
  list-style-type: none;
  padding: 8px;
  cursor: pointer;
  position: relative;
}

.custom-col-search li:after {
  border-bottom: 0.5px solid #bdbdbd;
  content: '';
  position: absolute;
  bottom: 0px;
  left: 10px;
  right: 10px;
}

.custom-col-search ul li:hover {
  font-weight: 700;
  color: #0b3c61;
}

.search-header {
  box-shadow: 0 8px 6px -6px rgb(0 0 0 / 25%);
  padding-bottom: 30px;
}

.required-asterisk {
  padding-left: 5px;
  color: red;
}

.header-text {
  font-size: 24px;
}

/* Custom Tooltip */
.tooltip-for-slot {
  position: relative;
  display: inline-block;
}

.tooltip-for-slot .tooltiptext {
  visibility: hidden;
  min-width: 200px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: -30px;
  left: 0;
}

.back-img {
  height: 18px;
}

textarea.form-control {
  height: auto !important;
}

.tooltip-for-slot:hover .tooltiptext {
  visibility: visible;
}
</style>
