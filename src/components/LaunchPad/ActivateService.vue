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
            >Service Activation</router-link
          >
        </div>
        <div class="col-xs-12 text-primary fw-300 header-text mb-10">
          Locate OPUS User by searching the User ID or Email ID
        </div>
        <div class="col-xs-12 mt-20 mb-10">
          <div class="col-xs-12 p-0 font-18 fw-700 text-primary">
            Search By <span class="required-asterisk">*</span>
          </div>
          <div
            class="col-xs-12 col-sm-3"
            v-for="option in searchByOptions"
            :key="option.name"
          >
            <label class="radio">
              <input
                type="radio"
                class="radio__input"
                :value="option.name"
                v-model="searchBy"
                @click="resetSearchParent"
              />
              <div class="radio__radio"></div>
              <div class="font-18 text-primary">{{ option.value }}</div>
            </label>
          </div>
        </div>
        <!-- SearchBox -->
        <div class="col-xs-12" v-if="searchBy">
          <div class="col-xs-12 col-sm-5 p-0">
            <input
              v-if="searchBy === 'Account'"
              class="search-box form-control mb-20 font-16"
              type="number"
              v-model.trim="searchKeyword"
              placeholder="Search by Account ID"
              @keyup="getAccountsListForAccountSearch"
            />
            <input
              v-else
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
            <p v-if="searchBy === 'Account'">
              Please search by entering the Account ID Only
            </p>
            <p v-else>
              Please search the user by entering the username or user id
            </p>
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
              <div class="col-xs-12" v-if="userDetails.active">
                <span class="fw-600">Role: </span>
                {{ userDetails.role_name }}
              </div>
              <div class="col-xs-12 d-flex" v-if="userDetails.active">
                <span class="fw-600">Account status: </span>
                <p class="green-main pl-10">Active</p>
              </div>
              <div class="col-xs-12 d-flex" v-else>
                <span class="fw-600">Account status: </span>
                <p class="red-1 pl-10">InActive</p>
              </div>
              <div class="col-xs-4 mt-20" v-if="userDetails.active">
                <button
                  class="emergo-green-button"
                  @click="openDeActiveUserPopup"
                >
                  Deactivate User
                </button>
              </div>
              <div class="col-xs-8 mt-20" v-if="userDetails.active">
                <button
                  class="emergo-green-button"
                  @click="openDeActiveAccountPopup"
                >
                  Deactivate Account
                </button>
                <p class="text-regular-xsmall red-1">
                  This will deactivate all the Account owners and Team Members
                  linked to this account.
                </p>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
              <h4 class="fw-700 font-18 text-primary">Q&A session</h4>
            </div>
            <div class="col-xs-8">
                <button
                  class="emergo-green-button"
                  :disabled="!qnaList.enrolled"
                  @click="completeQnA"
                >
                  Mark Complete
                </button>
                <p class="text-regular-xsmall red-1" v-if="qnaList.enrolled">
                  This will make Q&A session complete and will be available for re-purchase for the user.
                </p>
                <p class="text-regular-xsmall red-1" v-else>
                  The Q&A session is completed/expired/yet to purchase.
                </p>
              </div>
          </div>
          <div v-if="searchBy === 'Account'">
            <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
              User List <span style="color: red">*</span>
            </div>
            <div class="col-xs-12 col-md-8 col-lg-8 select-parent">
              <multiselect
                :showLabels="false"
                :multiple="true"
                :close-on-select="false"
                :allow-empty="false"
                class="multiselect-single-dropdown"
                :searchable="true"
                :max='15'
                :options="usersListByAccount.map((list) => list.user_id)"
                :custom-label="customLabel"
                v-model="userDetails.user_ids"
                open-direction="bottom"
                placeholder="Select users"
              >
              </multiselect>
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
                      v-if="action === 'Available plans'"
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
                              v-if="plan === 'ILT'"
                            >
                              <div class="select-box">
                                <div
                                  class="checkbox"
                                  :class="{
                                    'tooltip-for-slot': !!isIltWithoutDates
                                  }"
                                >
                                  <label>
                                    <input
                                      :class="{
                                        'events-none': !!isIltWithoutDates
                                      }"
                                      class="ilt-all"
                                      @click="openActiveServiceDateExpiryPopup"
                                      :disabled="!!isIltWithoutDates"
                                      type="checkbox"
                                      v-model="isSelectAll"
                                      @change="onSelectAll(plan, list)"
                                    />
                                    <span class="cr">
                                      <i
                                        class="cr-icon glyphicon glyphicon-ok"
                                      ></i>
                                    </span>
                                  </label>
                                  <span
                                    v-if="!!isIltWithoutDates"
                                    class="tooltiptext"
                                    >No slots available for few</span
                                  >
                                </div>
                              </div>
                              <div
                                class="text-primary"
                                :class="{ 'fw-700': isSelectAll }"
                              >
                                Select All
                              </div>
                            </div>
                            <div
                              class="col-xs-12 d-flex align-items-center col-gap-10"
                              v-for="item in list"
                              :key="item.plan_id"
                              
                            >
                              <div class="select-box">
                                <div
                                  class="checkbox"
                                  :class="{
                                    'tooltip-for-slot ilt-here':
                                      !item.available_time_slot &&
                                      plan === 'ILT',
                                  }"
                                  
                                >
                                  <label>
                                    <input
                                      :class="{
                                        'events-none':
                                          !item.available_time_slot &&
                                          plan === 'ILT' &&
                                          item.training_type !==
                                            'Pre-recorded course',
                                            'ilt-input':plan === 'ILT'
                                      }"
                                      @click="openActiveServiceDateExpiryPopup"
                                      ref="iltPlanCheckbox"
                                      :disabled="
                                        !item.available_time_slot &&
                                        plan === 'ILT' &&
                                        item.training_type !==
                                          'Pre-recorded course'
                                      "
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
                                  <span
                                    v-if="
                                      !item.available_time_slot &&
                                      plan === 'ILT' &&
                                      item.training_type !==
                                        'Pre-recorded course'
                                    "
                                    class="tooltiptext "
                                    >No slots available</span
                                  >
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
                                {{ item.item_name }}  {{ setPlanidToExpiryDate[item.plan_id] ? '- (' +(new Date(setPlanidToExpiryDate[item.plan_id]).getMonth()+1) +'-' +  new Date(setPlanidToExpiryDate[item.plan_id]).getDate()+ '-'+new Date(setPlanidToExpiryDate[item.plan_id]).getFullYear() + ')' : ''}}
                                {{
                                  item.training_type === 'Pre-recorded course'
                                    ? '(Pre recorded course)'
                                    : ''
                                }}
                              </div>
                            </div>
                          </div>
                          <div
                            v-else
                            class="col-xs-12 p-0 no-data-text font-18 fw-700 text-center"
                          >
                            User currently have full access to all available
                            resources
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Accordian for PlansList -->
              </template>
            </div>
            <!-- List of services requested by user -->
            <div v-if="searchBy != 'Account'">
              <div
                class="col-xs-12 mt-30"
                v-for="(action, key) in requestedActions"
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
                        v-if="action === 'Requested plans'"
                        class="required-asterisk"
                        >*</span
                      >
                    </div>
                  </label>
                  <template
                    v-if="planSelected === 'requests' && key === 'requests'"
                  >
                    <!-- Accordian for PlansList -->
                    <div class="d-flex flex-direction-column plans-wrapper">
                      <div class="panel-group" id="plans-accordion">
                        <div
                          class="panel wrapper-panel"
                          v-for="(list, plan) in requestList"
                          :key="plan"
                        >
                          <div class="panel-heading d-flex">
                            <label class="radio requested-label">
                              <input
                                type="radio"
                                class="radio__input"
                                :value="list.trn_order_id"
                                v-model="formDetails.trn_order_id"
                              />
                              <div class="radio__radio"></div>
                            </label>
                            <div
                              class="panel-title cursor-pointer collapsed mt-5"
                              data-toggle="collapse"
                              data-parent="#plans-accordion"
                              :data-target="`#plan${plan}`"
                            >
                              Requested plan {{ plan + 1 }}
                              <span class="black-3 text-regular-small ml-20"
                              >On {{ dateFormat(list.requested_date) || list.requested_date }}</span
                              >
                            </div>
                          </div>
                          <div
                            :id="`plan${plan}`"
                            class="panel-collapse collapse"
                          >
                            <div class="panel-body">
                              <div class="col-xs-12" v-if="requestList.length">
                                <div
                                  class="col-xs-12 d-flex align-items-center col-gap-10"
                                  v-for="(item, index) in list.plan_details"
                                  :key="index"
                                >
                                  <li>
                                    {{ item.name }} - {{ item.plan_type }}
                                  </li>
                                </div>
                              </div>
                              <div
                                v-else
                                class="col-xs-12 p-0 no-data-text font-18 fw-700 text-center"
                              >
                                User currently have not requested any services
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Accordian for PlansList -->
                  </template>
                </div>
              </div>
            </div>
            <div
              class="col-xs-12 col-sm-4 pl-30 mb-20 mt-20"
              v-if="planSelected === 'requests'"
            >
              <label>Trn Order ID</label
              ><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                disabled="true"
                type="text"
                v-model.trim="formDetails.trn_order_id"
              />
            </div>
            <!-- Payment Section -->
            <div class="col-xs-12 mt-20 mb-10">
              <div class="col-xs-12 p-0 font-18 fw-700 text-primary">
                Payment Options <span class="required-asterisk">*</span>
              </div>
              <div
                class="col-xs-12 col-sm-3"
                v-for="option in paymentOptions"
                :key="option.id"
              >
                <label class="radio">
                  <input
                    type="radio"
                    class="radio__input"
                    :value="option.id"
                    v-model="formDetails.payment_mode"
                  />
                  <div class="radio__radio"></div>
                  <div class="font-18 text-primary">{{ option.name }}</div>
                </label>
              </div>
            </div>
            <div
              class="col-xs-12 col-sm-4 pl-30 mb-20"
              v-if="formDetails.payment_mode === 2"
            >
              <label>Invoice Details</label
              ><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                v-model.trim="formDetails.invoice"
              />
            </div>
            <div
              class="col-xs-12 col-sm-4 pl-30 mb-20"
              v-else-if="formDetails.payment_mode === 3"
            >
              <label>Purchase Order Details</label
              ><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                v-model.trim="formDetails.purchase_order"
              />
            </div>
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
            <div class="col-xs-12">
              <div class="col-xs-12 col-sm-4 mt-20 font-18 fw-700 text-primary" v-if="searchBy === 'Account'">
                <label>Total Price</label>
                <input
                  class="form-control"
                  disabled="true"
                  type="number"
                  v-model.trim="formDetails.plan_price"
                />
              </div>
              <div class="col-xs-12 col-sm-4 mt-20 font-18 fw-700 text-primary" v-else>
                <label>Total Price</label>
                <input
                  class="form-control"
                  type="number"
                  v-model.trim="formDetails.plan_price"
                />
              </div>
            </div>
            <div class="col-xs-12 mt-20 pl-30 mb-30">
              <button
                @click="activateServices"
                :class="{ 'events-none': isDisabled }"
                :disabled="isDisabled"
                class="emergo-green-button"
              >
                Activate Plans
              </button>
            </div>
            <!-- Payment Section -->
          </div>
        </div>
      </template>
      <loader :loadingStatus="loaderStatus"></loader>
      <deactivate-account-popup
        @deActivateUserAccount="deactivateAccount"
      ></deactivate-account-popup>
      <deactivate-user-popup
        @deActivateUser="deactivateUser"
      ></deactivate-user-popup>
      <already-activated-plans-popup :formDetails="multiActivationResponse"></already-activated-plans-popup>
      <activate-service-date-expiry-popup @activateServiceDateExpiry="setDateToILTPlanID" @activateServiceDateExpiryNotUpdated="uncheckILTCourse"></activate-service-date-expiry-popup>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import Multiselect from 'vue-multiselect';
import Loader from '../UIComponents/Loader.vue';
import DeactivateUserPopup from './DeactivateUserPopup.vue';
import ActivateServiceDateExpiryPopup from './ActivateServiceDateExpiryPopup.vue';
import AlreadyActivatedPlansPopup from './AlreadyActivatedPlansPopup.vue';
import DeactivateAccountPopup from './DeactivateAccountPopup.vue';
import {
  getAvailableService,
  getUsersList,
  getAccountList,
  activatePlans,
  deactivateUser,
  deactivateAccount,
  getRequestedService,
  activateRequestedPlans,
  activateBulkPlans,
  getQuestionAnswersStatus,
  getQuestionAnswersList,
} from '../../apis/activateService';

export default {
  data() {
    return {
      isIltWithoutDates: false,
      loaderStatus: false,
      searchBy: '',
      searchKeyword: '',
      plansList: {},
      requestList: {},
      usersList: [],
      usersListByAccount: [],
      qnaList: {},
      userDetails: {},
      selectedUser: null,
      isUsersListEmpty: false,
      isSelectAll: false,
      selectedPlanIdsWithType: {},
      planSelected: '',
      requestedPlan: '',
      requestedPlanSelected: '',
      availableActions: {
        plans: 'Available plans'
      },
      requestedActions: {
        requests: 'Requested plans'
      },
      expiryDateSet:false,
      iltExpiryDate:null,
      currentILTCourseIDSelected:'',
      currentILTCourseSelected:'',
      formDetails: {
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        plan_price: 0,
        trn_order_id: ''
      },
      multiActivationResponse: {},
      isAccount: false,
      searchByOptions: [
        {
          id: 1,
          name: 'Account',
          value: 'Account ID'
        },
        {
          id: 2,
          name: 'User',
          value: 'User ID'
        }
      ],
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
      ],
      setPlanidToExpiryDate:{}
    };
  },

  components: {
    DeactivateUserPopup,
    DeactivateAccountPopup,
    Loader,
    Multiselect,
    AlreadyActivatedPlansPopup,
    ActivateServiceDateExpiryPopup
  },

  computed: {
    isDisabled() {
      let plansEmpty = false;
      if (this.planSelected === 'plans') {
        plansEmpty = Object.values(this.selectedPlanIdsWithType).some(
          (item) => !!item.length
        );
      } else if (this.planSelected === 'requests') {
        if (this.formDetails.trn_order_id) {
          plansEmpty = true;
        } else {
          plansEmpty = false;
        }
      }
      const { payment_mode: paymentMode } = this.formDetails;
      if (this.searchBy === 'Account') {
        if(!this.userDetails.user_ids) return true;
      }
      if (!plansEmpty || !paymentMode || !this.planSelected) return true;
      if (paymentMode === 2 && !this.formDetails.invoice) return true;
      if (paymentMode === 3 && !this.formDetails.purchase_order) return true;
      return false;
    }
  },

  watch: {
    planSelected() {
      // this.resetPlans();
      if (this.planSelected === 'requests') {
        this.resetPlans();
      }
    },
    searchKeyword() {
      if (this.searchKeyword.length < 2 && this.usersList.length)
        this.usersList = [];
    },
    setPlanidToExpiryDate() {
      this.setPlanidToExpiryDate[this.currentILTCourseIDSelected] = this.iltExpiryDate;
    }
  },

  methods: {
    customLabel(option) {
      const user = this.usersListByAccount.find((list) => list.user_id === option);
      const newOption = user ? user.email : "Unknown";
      const newOptionActive = user ? user.active : false;
      let result;
      if (newOptionActive) {
          result = `${newOption} - Active`;
      } else {
          result = `${newOption} - InActive`;
      }
      return result;
    },
    resetSearchParent() {
      this.searchKeyword = '';
      this.userDetails = {};
    },
    resetSearchKeyword() {
      this.searchKeyword = '';
    },
    dateFormat(date) {
      const newDate = `${date[0]} ${date[1]} ${date[2]}`;
      return dayjs(newDate).format('DD MMM YYYY');
    },
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    async deactivateUser() {
      $('#deactivateUserPopup').modal('hide');
      this.loaderStatus = true;
      const response = await deactivateUser(
        this.userDetails.account_id,
        this.userDetails.user_id
      );
      this.loaderStatus = false;
      this.showToaster(response);
    },
    async deactivateAccount() {
      $('#deactivateAccountPopup').modal('hide');
      this.loaderStatus = true;
      const response = await deactivateAccount(this.userDetails.account_id);
      this.loaderStatus = false;
      this.showToaster(response);
    },
    showToaster(response) {
      if (response.status_code === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: response.data,
          duration: 15000
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
    showBulkToaster(response) {
      if (response.status_code === 200) {
        if (!response.data.services_activated) {
          this.multiActivationResponse = response.data;
          this.openAlreadyActivatedPlansPopup();
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data.message,
            duration: 15000
            });
            this.userDetails = {};
            this.resetAll();
        }
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.message || 'Please try again later'
        });
      }
    },

    openAlreadyActivatedPlansPopup() {
      $('#alreadyActivatedPlans').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    openActiveServiceDateExpiryPopup(e) {
      if(e.target.checked) {
        if(e.target.classList[0]==='ilt-input'|| e.target.classList[0] === 'ilt-all'){
          $('#activateServiceDateExpiryPopup').modal({
          backdrop: 'static',
          keyboard: false
        });
          this.currentILTCourseIDSelected = e.target.value;
        }

      } else {
        delete this.setPlanidToExpiryDate[e.srcElement.value];
        if(e.target.classList[0] === 'ilt-all') {
          this.loaderStatus = true;
          // eslint-disable-next-line array-callback-return
          this.plansList.ILT.map((item) => {
            delete this.setPlanidToExpiryDate[item.plan_id]
          })
          
          this.loaderStatus = false;
        }
      }
      
    },

    async setDateToILTPlanID(e) {
      if(e) {
        this.expiryDateSet = true;
        this.iltExpiryDate = e
        this.loaderStatus = true;
        this.setPlanidToExpiryDate[this.currentILTCourseIDSelected] = await this.iltExpiryDate;
        this.loaderStatus = false;
        

        if(Object.keys(this.setPlanidToExpiryDate)[0] === 'on') {
        this.loaderStatus = true;

          // eslint-disable-next-line array-callback-return
          this.plansList.ILT.map((item) => {
            this.setPlanidToExpiryDate[item.plan_id] = e
          })
        this.loaderStatus = false;

        }
        

        
      }else {
        this.expiryDateSet = false;
        this.iltExpiryDate = null;
        
      }
    },

    uncheckILTCourse() {
      const selectAllCheckbox = document.querySelector('.ilt-all');
      if(selectAllCheckbox.checked === true) {
          this.loaderStatus = true;
          this.selectedPlanIdsWithType.ILT = []
          this.loaderStatus = false;
          selectAllCheckbox.checked = false;
          selectAllCheckbox.value=''
          this.isSelectAll = false;
        }else {
          this.selectedPlanIdsWithType.ILT.pop();
          this.setPlanidToExpiryDate.pop();
        }
    },

    openDeActiveUserPopup() {
      $('#deactivateUserPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    openDeActiveAccountPopup() {
      $('#deactivateAccountPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async completeQnA() {
      this.loaderStatus = true;
      const response = await getQuestionAnswersStatus(this.userDetails.user_id);
      if (response.status_code === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: `${response.data}`,
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: `${response.message}`,
        });
      }
      await this.getAvailableServiceForUserAFterComplete();
      this.loaderStatus = false;
    },

    async activateServices() {
      this.loaderStatus = true;
      const slotTimeWithPlanIds = this.getSlotTimeWithPlanIds();
      let plansInfo = [];
      if (this.planSelected === 'requests') {
        const requestedPlansList = this.requestList.find(
          (item) => item.trn_order_id === this.formDetails.trn_order_id
        );
        const newRequestedList = requestedPlansList.plan_details.map(
          (item) => ({ plan_id: item.id })
        );
        plansInfo = newRequestedList;
      } else {
        plansInfo = Object.keys(this.selectedPlanIdsWithType).reduce(
          (acc, value) => {
            if (this.selectedPlanIdsWithType[value].length) {
              if (value === 'ILT') {
                const listWithSlotIds = this.selectedPlanIdsWithType[value].map(
                  (planId) => ({
                    plan_id: planId,
                    ilt_slot_id: slotTimeWithPlanIds[planId],
                    date_expiry: this.setPlanidToExpiryDate[planId]
                  })
                );
                // eslint-disable-next-line no-param-reassign
                acc = [...acc, ...listWithSlotIds];
                return acc;
              }
              const listWithPlanIds = this.selectedPlanIdsWithType[value].map(
                (planId) => ({ plan_id: planId })
              );
              // eslint-disable-next-line no-param-reassign
              acc = [...acc, ...listWithPlanIds];
              return acc;
            }
            return acc;
          },
          []
        );
      }
      const payload = {
        ...this.formDetails,
        account_owner_id: this.formDetails.account_id,
        plan_price: +this.formDetails.plan_price,
        plan_info_list: plansInfo,
        account_id: this.userDetails.account_id,
        user_id: this.userDetails.user_id,
        user_ids: this.userDetails.user_ids
      };
      let response = {};
      if (this.planSelected === 'requests') {
        payload.trn_order_id = this.formDetails.trn_order_id;
        response = await activateRequestedPlans(payload);
      } else {
        if (this.searchBy === 'Account') {
          response = await activateBulkPlans(payload);
        } else {
          response = await activatePlans(payload);
        }
        payload.trn_order_id = '';
      }
      this.loaderStatus = false;
      if (this.searchBy === 'Account') {
        this.showBulkToaster(response);
      } else {
        this.showToaster(response);
      }
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

    // setDateExpiryILT() {
    //   this.plansList
    // },

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
    resetPlans() {
      this.requestedPlan = '';
      this.requestedPlanSelected = '';
      this.isSelectAll = false;
      this.formDetails = {
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        plan_price: 0,
        trn_order_id: ''
      };
      this.setPlanIdWithTypes();
    },

    resetAll() {
      this.planSelected = '';
      this.requestedPlan = '';
      this.requestedPlanSelected = '';
      this.isSelectAll = false;
      this.searchKeyword = '';
      this.selectedUser = null;
      this.formDetails = {
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        plan_price: 0,
        trn_order_id: ''
      };
      this.setPlanIdWithTypes();
    },

    async getAvailableServiceForUser() {
      this.loaderStatus = true;
      if (this.searchBy === 'Account') {
        // Pass 0 as parameter to get all plans this is for Bulk activation
        this.plansList = await getAvailableService(0);
      } else {
        this.plansList = await getAvailableService(this.selectedUser.user_id);
      }
      delete this.plansList.Documents;
      this.qnaList = await getQuestionAnswersList(this.selectedUser.user_id);
      this.requestList = await getRequestedService(this.selectedUser.user_id);
      this.isIltWithoutDates = this.plansList.ILT?.find(
        (item) =>
          !item.available_time_slot &&
          item.training_type !== 'Pre-recorded course'
      );
      this.setPlanIdWithTypes();
      this.userDetails = this.selectedUser;
      this.resetAll();
      this.loaderStatus = false;
    },
    async getAvailableServiceForUserAFterComplete() {
      this.loaderStatus = true;
      if (this.searchBy === 'Account') {
        // Pass 0 as parameter to get all plans this is for Bulk activation
        this.plansList = await getAvailableService(0);
      } else {
        this.plansList = await getAvailableService(this.userDetails.user_id);
      }
      delete this.plansList.Documents;
      this.requestList = await getRequestedService(this.userDetails.user_id);
      this.isIltWithoutDates = this.plansList.ILT?.find(
        (item) =>
          !item.available_time_slot &&
          item.training_type !== 'Pre-recorded course'
      );
      this.setPlanIdWithTypes();
      this.resetAll();
      this.qnaList = await getQuestionAnswersList(this.userDetails.user_id);
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
        if (this.searchBy === 'Account') {
          this.usersList = await getAccountList(this.searchKeyword);
          this.usersListByAccount = this.usersList;
        } else {
          this.usersList = await getUsersList(this.searchKeyword);
        }
        this.isUsersListEmpty = !this.usersList.length;
      }
    }, 200)
  }
};
</script>

<style scoped>
.select-parent >>> .multiselect-single-dropdown .multiselect__tags {
  height: auto !important;
}
/* To hide arrows since the input is in search need to remove arrows */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
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
.requested-label {
  flex-basis: 30px;
  margin-left: 15px;
}
</style>
