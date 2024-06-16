<template>
  <div class="reg-filter">
    <div id="activityFilter">
      <div
        data-toggle="dropdown"
        class="reg-dropdown"
        v-if="collapsed"
        @click="showHideFilter()"
      >
        <span class="dropdown-toggle cursor">
          <img src="/static/images/icons/filter.svg" class="image-size" />
          <span class="count" v-if="showFilterIcon">
            <span class="glyphicon glyphicon-ok"></span>
          </span>
          <img
            src="/static/images/icons/chevron_right.svg"
            alt
            class="image-size"
          />
        </span>
      </div>
      <div v-else class="dropdown-menu dropdown-menu-left filter-ul">
        <div class="col-xs-12 pb-1 pl-0 pr-0 filter-text">
          <div data-toggle="dropdown" class="col-xs-1 filter-icon p-0">
            <img src="/static/images/icons/filter.svg" class="image-size" />
          </div>
          <div class="col-xs-11 font-properties pl-0 pt-3">Filter</div>
          <div class="col-xs-1">
            <a @click="showHideFilter()">
              <img
                src="/static/images/icons/chevron_right.svg"
                class="image-size left-transform cursor"
              />
            </a>
          </div>
        </div>
        <div class="col-xs-12 filter-wrapper pl-0">
          <div>
            <div
              class="col-xs-12 col-md-12 col-lg-12 item-divider p-0 cursor-pointer"
              @click="
                filterRegistrations('collapseApprovalDate', 'date_created')
              "
            >
              <div class="col-xs-10 col-md-10 col-lg-10 p-0">
                <a
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExpireyDate"
                  class="font-properties"
                >
                  Date Created</a
                >
              </div>
              <div class="col-xs-2 text-right pr-0">
                <a v-if="!date_created">
                  <img
                    src="/static/images/icons/chevron_down.svg"
                    class="chev_down"
                  />
                </a>
                <a v-else>
                  <img
                    src="/static/images/icons/chevron_down.svg"
                    class="chev_down transform-180"
                  />
                </a>
              </div>
            </div>
            <div
              class="col-xs-12 col-md-12 col-lg-12 collapse collapseApprovalDate pr-0"
              :class="{
                in:
                  filterObject.filter_date || (!showFilterIcon && date_created)
              }"
            >
              <div class="col-xs-12 col-md-12 col-lg-12 p-0 date-range">
                <ul class="pl-0 mt-6">
                  <li class="col-xs-12 p-0" @click="selectDate('last7Days')">
                    <div
                      class="col-xs-10 pl-0 sub-approval"
                      :class="{ 'font-bold': last7Days }"
                    >
                      Last 7 days
                    </div>
                    <a class="col-xs-2 p-0 text-right" v-if="last7Days">
                      <img
                        src="/static/images/icons/check.svg"
                        class="image-size"
                      />
                    </a>
                  </li>
                  <li class="col-xs-12 p-0" @click="selectDate('last30Days')">
                    <div
                      class="col-xs-10 pl-0 sub-approval"
                      :class="{ 'font-bold': last30Days }"
                    >
                      Last 30 days
                    </div>
                    <a class="col-xs-2 p-0 text-right" v-if="last30Days">
                      <img
                        src="/static/images/icons/check.svg"
                        class="image-size"
                      />
                    </a>
                  </li>
                  <li
                    class="col-xs-12 p-0"
                    @click="selectDate('within_last_year')"
                  >
                    <div
                      class="col-xs-10 pl-0 sub-approval"
                      :class="{ 'font-bold': lastYear }"
                    >
                      Within last year
                    </div>
                    <a class="col-xs-2 p-0 text-right" v-if="lastYear">
                      <img
                        src="/static/images/icons/check.svg"
                        class="image-size"
                      />
                    </a>
                  </li>
                </ul>
                <div class="font-weight-prop col-xs-12 p-0 pt-10">
                  <div class="sub-approval">Date Range</div>
                </div>
                <div class="alert-menu col-xs-12 p-0 m-0">
                  <date-picker
                    v-model:value="filterFromDate"
                    :disabled-date="notBeforeEndDate"
                    :default-value="
                      filterFromDate ? filterFromDate : new Date()
                    "
                    :editable="false"
                    type="date"
                    v-on:change="selectDate('date_selection')"
                    placeholder="DD-MM-YYYY"
                    format="DD-MM-YYYY"
                  ></date-picker>
                  <div class="start-to-end">to</div>
                  <date-picker
                    v-model:value="filterToDate"
                    :disabled-date="notBeforeStartDate"
                    :default-value="filterToDate ? filterToDate : new Date()"
                    :editable="false"
                    type="date"
                    v-on:change="selectDate('date_selection')"
                    placeholder="DD-MM-YYYY"
                    format="DD-MM-YYYY"
                  ></date-picker>
                </div>
              </div>
            </div>
          </div>
          <template v-if="includeDeactivatedAccounts">
            <div
              data-toggle="collapse"
              data-target="#account_status"
              class="font-properties"
              :aria-expanded="filterObject.filter_user_status ? true : false"
            >
              Account Status
              <span class="collapse_arrow fa fa-angle-right"></span>
            </div>
            <div
              class="col-xs-12 col-md-12 col-lg-12 collapse collapseDateRangeSelection pr-0"
              :class="{ in: filterObject.filter_user_status }"
            >
              <div class="col-xs-12 col-md-12 col-lg-12 p-0 date-range">
                <ul class="pl-0 mt-6">
                  <li
                    class="col-xs-12 p-0"
                    @click="selectAccountStatus('active')"
                  >
                    <div
                      class="col-xs-10 pl-0 sub-approval"
                      :class="{ 'font-bold': active }"
                    >
                      Active
                    </div>
                    <a class="col-xs-2 p-0 text-right" v-if="active">
                      <img
                        src="/static/images/icons/check.svg"
                        class="image-size"
                      />
                    </a>
                  </li>
                  <li
                    class="col-xs-12 p-0"
                    @click="selectAccountStatus('deactivated')"
                  >
                    <div
                      class="col-xs-10 pl-0 sub-approval"
                      :class="{ 'font-bold': deactivated }"
                    >
                      Deactivated
                    </div>
                    <a class="col-xs-2 p-0 text-right" v-if="deactivated">
                      <img
                        src="/static/images/icons/check.svg"
                        class="image-size"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
        <div class="col-xs-12 text-right clear-option cursor-pointer">
          <a @click.prevent="clearAll()">Clear All</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import DatePicker from 'vue-datepicker-next';
import dayjs from 'dayjs';

export default {
  props: ['servicesList', 'preSelect', 'includeDeactivatedAccounts'],
  components: {
    DatePicker
  },
  data() {
    return {
      filterObject: { flags: { date: false } },
      collapsed: true,
      filterFromDate: '',
      filterToDate: '',
      filterExpiryToDate: '',
      filterExpiryFromDate: '',
      last7Days: false,
      expiring30Days: false,
      expiring30To45Days: false,
      last30Days: false,
      lastYear: false,
      dateSelected: false,
      expiryDateSelected: false,
      initial: false,
      activeName: ['1'],
      rep: false,
      commercial: false,
      selectedService: [],
      confirmed: false,
      unconfirmed: false,
      deactivated: false,
      active: false,
      account_type: false,
      date_created: false,
      service_expiry: false,
      service_register: false
    };
  },
  watch: {
    preSelect() {
      if (this.preSelect) {
        this.selectFilter();
      }
    },
    includeDeactivatedAccounts() {
      if (!this.includeDeactivatedAccounts) {
        this.active = false;
        this.deactivated = false;
        if (this.filterObject.filter_account_status)
          delete this.filterObject.filter_account_status;
        this.filterObject.flags.deactivated = false;
      }
    }
  },
  methods: {
    selectFilter() {
      if (this.preSelect.filter.account_type) {
        this.filterUserType(this.preSelect.filter.account_type);
      }
      if (this.preSelect.filter.services_registered) {
        this.filterSelectService(this.preSelect.filter.services_registered);
      }
      if (this.preSelect.filter.service_expiry) {
        this.filterServiceExpiryDate(this.preSelect.filter.service_expiry);
      }
      this.$emit('accountsFilterObject', this.filterObject);
    },
    notBeforeEndDate(date) {
      if (this.filterToDate)
        return date > new Date(this.filterToDate).setHours(0, 0, 0, 0);
      return '';
    },
    notBeforeStartDate(date) {
      return date < new Date(this.filterFromDate).setHours(0, 0, 0, 0);
    },
    notBeforeExpiryEndDate(date) {
      if (this.filterExpiryToDate)
        return date > new Date(this.filterExpiryToDate).setHours(0, 0, 0, 0);
      return '';
    },
    notBeforeExpiryStartDate(date) {
      return date < new Date(this.filterExpiryFromDate).setHours(0, 0, 0, 0);
    },
    isDateStatus(last7Days, last30Days, lastYear, dateSelected) {
      if (!dateSelected) {
        // other than date range
        this.filterFromDate = '';
        this.filterToDate = '';
      }
      this.last7Days = last7Days;
      this.last30Days = last30Days;
      this.lastYear = lastYear;
      this.dateSelected = dateSelected;
    },
    isExpiryDateStatus(expiring30Days, expiring30To45Days, expiryDateSelected) {
      if (!expiryDateSelected) {
        // other than date range
        this.filterExpiryFromDate = '';
        this.filterExpiryToDate = '';
      }
      this.expiring30Days = expiring30Days;
      this.expiring30To45Days = expiring30To45Days;
      this.expiryDateSelected = expiryDateSelected;
    },
    resetDateFilter() {
      this.last7Days = false;
      this.last30Days = false;
      this.lastYear = false;
      this.dateSelected = false;
    },
    resetExpiryDateFilter() {
      this.expiring30Days = false;
      this.expiring30To45Days = false;
      this.expiryDateSelected = false;
    },
    checkDateRange(filterFromDate, filterToDate) {
      if (
        filterFromDate != null &&
        filterToDate != null &&
        filterFromDate !== '' &&
        filterToDate !== ''
      ) {
        return true;
      }
      return false;
    },
    selectDate(data) {
      const dateRangeValidate = this.filterDate(data);
      if (
        data !== 'date_selection' ||
        (data === 'date_selection' && dateRangeValidate)
      ) {
        this.$emit('accountsFilterObject', this.filterObject);
      }
    },
    filterDate(data) {
      let dateRangeValidate = true;
      if (data === 'date_selection') {
        this.$set(this.filterObject.flags, 'date', false);
        if (
          this.filterFromDate != null &&
          this.filterToDate != null &&
          this.filterFromDate !== '' &&
          this.filterToDate !== ''
        ) {
          this.isDateStatus(false, false, false, true);
          if (
            dayjs(this.filterFromDate).format('YYYY-MM-DD') <=
            dayjs(this.filterToDate).format('YYYY-MM-DD')
          ) {
            const filteredDate = {
              from: dayjs(this.filterFromDate).format('YYYY-MM-DD'),
              to: dayjs(this.filterToDate).format('YYYY-MM-DD')
            };
            this.filterObject.filter_date = filteredDate;
            this.$set(this.filterObject.flags, 'date', true);
          } else {
            this.$notify({
              clear: true
            });
            this.$notify({
              type: 'error',
              title: 'Date',
              text: 'End Date should be Greater than Start Date'
            });
            this.filterToDate = '';
          }
        } else {
          if (
            this.filterObject.flags &&
            !this.filterObject.flags.date &&
            !this.checkDateRange(this.filterFromDate, this.filterToDate)
          ) {
            dateRangeValidate = false;
          }
          if (typeof this.filterObject.filter_date === 'undefined') {
            dateRangeValidate = false;
          }
          if (!this.filterFromDate && !this.filterToDate)
            delete this.filterObject.filter_date;
          this.resetDateFilter();
        }
      } else {
        let from = '';
        let to = '';
        let flag = false;
        if (data === 'last7Days') {
          if (!this.last7Days) {
            // selects last 7 days
            this.isDateStatus(true, false, false, false);
            from = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
            to = dayjs().format('YYYY-MM-DD');
            flag = true;
          } else {
            this.isDateStatus(false, false, false, false);
          }
        } else if (data === 'last30Days') {
          if (!this.last30Days) {
            // selects last 30 days
            this.isDateStatus(false, true, false, false);
            from = dayjs().subtract(30, 'days').format('YYYY-MM-DD');
            to = dayjs().format('YYYY-MM-DD');
            flag = true;
          } else {
            // user un-selects
            this.isDateStatus(false, false, false, false);
          }
        } else if (data === 'within_last_year') {
          if (!this.lastYear) {
            // user selects year
            this.isDateStatus(false, false, true, false);
            /* const date = moment();
            from = moment(date).year() - 1 + moment(date).format('-01-01');
            to = moment(date).year() - 1 + moment(date).format('-12-31'); */
            from = dayjs().subtract(365, 'days').format('YYYY-MM-DD');
            to = dayjs().format('YYYY-MM-DD');
            flag = true;
          } else {
            // user un-selects
            this.isDateStatus(false, false, false, false);
          }
        }

        if (flag) {
          const filteredDate = { from, to };
          this.filterObject.filter_date = filteredDate;
          this.$set(this.filterObject.flags, 'date', true);
        } else {
          delete this.filterObject.filter_date;
          this.$set(this.filterObject.flags, 'date', false);
        }
      }
      return dateRangeValidate;
    },
    selectExpiryDate(data) {
      const dateRangeValidate = this.filterServiceExpiryDate(data);
      if (
        data !== 'date_selection' ||
        (data === 'date_selection' && dateRangeValidate)
      ) {
        this.$emit('accountsFilterObject', this.filterObject);
      }
    },
    filterServiceExpiryDate(data) {
      let dateRangeValidate = true;
      if (data === 'date_selection') {
        if (
          this.filterExpiryFromDate != null &&
          this.filterExpiryToDate != null &&
          this.filterExpiryFromDate !== '' &&
          this.filterExpiryToDate !== ''
        ) {
          this.isExpiryDateStatus(false, false, true);
          if (
            dayjs(this.filterExpiryFromDate).format('YYYY-MM-DD') <=
            dayjs(this.filterExpiryToDate).format('YYYY-MM-DD')
          ) {
            const filteredDate = {
              from: dayjs(this.filterExpiryFromDate).format('YYYY-MM-DD'),
              to: dayjs(this.filterExpiryToDate).format('YYYY-MM-DD')
            };
            this.filterObject.filter_service_expiry = filteredDate;
            this.$set(this.filterObject.flags, 'service_expiry_date', true);
          } else {
            this.$notify({
              clear: true
            });
            this.$notify({
              type: 'error',
              title: 'Date',
              text: 'End Date should be Greater than Start Date'
            });
            this.filterExpiryToDate = '';
          }
        } else {
          if (
            this.filterObject.flags &&
            !this.filterObject.flags.service_expiry_date &&
            !this.checkDateRange(
              this.filterExpiryFromDate,
              this.filterExpiryToDate
            )
          ) {
            dateRangeValidate = false;
          }
          if (typeof this.filterObject.filter_service_expiry === 'undefined') {
            dateRangeValidate = false;
          }
          if (!this.filterExpiryFromDate && !this.filterExpiryToDate)
            delete this.filterObject.filter_service_expiry;
          this.resetExpiryDateFilter();
          this.$set(this.filterObject.flags, 'service_expiry_date', false);
        }
      } else {
        let from = '';
        let to = '';
        let flag = false;
        if (data === 'expiring30Days') {
          if (!this.expiring30Days) {
            // selects last 7 days
            this.isExpiryDateStatus(true, false, false);
            from = dayjs().format('YYYY-MM-DD');
            to = dayjs().add(30, 'days').format('YYYY-MM-DD');
            flag = true;
          } else {
            this.isExpiryDateStatus(false, false, false);
          }
        } else if (data === 'expiring30To45Days') {
          if (!this.expiring30To45Days) {
            // selects last 30 days
            this.isExpiryDateStatus(false, true, false);
            from = dayjs().add(31, 'days').format('YYYY-MM-DD');
            to = dayjs().add(45, 'days').format('YYYY-MM-DD');
            flag = true;
          } else {
            // user un-selects
            this.isExpiryDateStatus(false, false, false);
          }
        }
        if (flag) {
          const filteredDate = { from, to };
          this.filterObject.filter_service_expiry = filteredDate;
          this.$set(this.filterObject.flags, 'service_expiry_date', true);
        } else {
          delete this.filterObject.filter_service_expiry;
          this.$set(this.filterObject.flags, 'service_expiry_date', false);
        }
      }
      return dateRangeValidate;
    },
    showHideFilter() {
      this.collapsed = !this.collapsed;
      if ($('#activityFilter').hasClass('open')) {
        // During focus out
        $('#activityFilter').removeClass('open');
      }
    },
    selectUserType(data) {
      this.filterUserType(data);
      this.$emit('accountsFilterObject', this.filterObject);
    },
    filterUserType(data) {
      let flag = false;
      if (data === 'commercial' && !this.commercial) {
        this.commercial = true;
        this.rep = false;
      } else if (data === 'rep' && !this.rep) {
        this.commercial = false;
        this.rep = true;
      } else {
        this.commercial = false;
        this.rep = false;
        flag = true;
      }
      this.$set(this.filterObject.flags, 'user', true);
      this.filterObject.filter_account_type = { account_type: data };
      if (flag) {
        this.$set(this.filterObject.flags, 'user', false);
        delete this.filterObject.filter_account_type;
      }
    },
    selectService(data) {
      this.filterSelectService(data);
      this.$emit('accountsFilterObject', this.filterObject);
    },
    filterSelectService(data) {
      let flag = false;
      const index = this.selectedService.indexOf(data);
      if (index > -1) {
        this.selectedService.splice(index, 1);
      } else {
        this.selectedService.push(data);
      }
      if (!this.selectedService.length) {
        flag = true;
      }
      this.$set(this.filterObject.flags, 'service', true);
      this.filterObject.filter_selectedService = {
        selectedService: this.selectedService
      };
      if (flag) {
        this.$set(this.filterObject.flags, 'service', false);
        delete this.filterObject.filter_selectedService;
      }
    },
    filterRegistrations(filterCSS, flag) {
      if (flag === 'account_type') {
        this.account_type = !this.account_type;
      }
      if (flag === 'date_created') {
        this.date_created = !this.date_created;
      }
      if (flag === 'service_expiry') {
        this.service_expiry = !this.service_expiry;
      }
      if (flag === 'service_register') {
        this.service_register = !this.service_register;
      }
      if ($(`.${filterCSS}`).hasClass('in')) {
        $(`.${filterCSS}`).removeClass('in');
      } else {
        $(`.${filterCSS}`).addClass('in');
      }
    },
    selectConfirmType(data) {
      let flag = false;
      if (data === 'confirmed' && !this.confirmed) {
        this.confirmed = true;
        this.unconfirmed = false;
      } else if (data === 'unconfirmed' && !this.unconfirmed) {
        this.confirmed = false;
        this.unconfirmed = true;
      } else {
        this.confirmed = false;
        this.unconfirmed = false;
        flag = true;
      }
      this.$set(this.filterObject.flags, 'confirmed', true);
      this.filterObject.filter_confirmed_type = { selectedService: data };
      if (flag) {
        this.$set(this.filterObject.flags, 'confirmed', false);
        delete this.filterObject.filter_confirmed_type;
      }
      this.$emit('accountsFilterObject', this.filterObject);
    },
    selectAccountStatus(data) {
      let flag = false;
      if (data === 'active' && !this.active) {
        this.active = true;
        this.deactivated = false;
      } else if (data === 'deactivated' && !this.deactivated) {
        this.active = false;
        this.deactivated = true;
      } else {
        this.active = false;
        this.deactivated = false;
        flag = true;
      }
      this.$set(this.filterObject.flags, 'deactivated', true);
      this.filterObject.filter_account_status = { account_status: data };
      if (flag) {
        this.$set(this.filterObject.flags, 'deactivated', false);
        delete this.filterObject.filter_account_status;
      }
      this.$emit('accountsFilterObject', this.filterObject);
    },
    clearAll() {
      this.rep = false;
      this.commercial = false;
      this.last7Days = false;
      this.last30Days = false;
      this.lastYear = false;
      this.expiring30Days = false;
      this.expiring30To45Days = false;
      this.selectedService = [];
      this.date_created = false;
      this.filterFromDate = '';
      this.filterToDate = '';
      delete this.filterObject.filter_date;
      delete this.filterObject.flags.date;
      $('.collapseApprovalDate').removeClass('in');
      this.$emit('accountsFilterObject', this.filterObject);
    }
  },
  computed: {
    showFilterIcon() {
      if (
        this.filterObject.flags.date ||
        this.filterObject.flags.user ||
        this.filterObject.flags.deactivated ||
        this.filterObject.flags.service
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style scoped>
.pd-15 {
  padding: 0px 15px;
}
div[aria-expanded='true'] > .collapse_arrow {
  -webkit-transform: rotate(90deg); /* to support Safari and Android browser */
  -ms-transform: rotate(90deg); /* to support IE 9 */
  transform: rotate(90deg);
}
.collapse_arrow {
  float: right;
  vertical-align: middle;
  font-size: 20px;
}
.font-properties {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61;
}
.sub-approval {
  color: #0b3c61;
  /* font-weight: normal; */
  font-size: 16px;
  line-height: 19px;
  /* padding-left: 12px; */
  margin-bottom: 13px;
}
.count {
  position: absolute;
  left: 20px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  line-height: 16px;
  font-size: 10px;
  text-align: center;
  cursor: pointer;
  color: white;
  background: #4c9e45;
}
.alert-menu .mx-datepicker {
  /* width: 120px; */
  width: 125px;
}

.alert-menu .mx-datepicker >>> .mx-input {
  /* padding-left: 6px;
  font-size: 12px; */
  padding-left: 7px;
  font-size: 13px;
  height: 24px;
  color: rgba(0, 0, 0, 0.7);
  border: 0.5px solid #0b3c61;
  border-radius: 3px;
  font-weight: 500;
}

.alert-menu >>> .el-input--suffix .el-input__inner {
  padding-right: 0px;
}

.alert-menu {
  margin-bottom: 5px;
}
.start-to-end {
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.7);
  padding: 5px 8px;
  display: inline;
}
.filter-wrapper {
  border-top: 0px;
  /* margin: 30px 30px 0px 30px; */
}
.header_collapse {
  padding: 10px 10px 10px 0px;
  cursor: pointer;
}
.item-divider {
  border-bottom: 1px solid #d3d6d9;
  padding-bottom: 7px;
  margin-top: 6px;
}
.collapseApprovalDate.in {
  border-bottom: 1px solid #d3d6d9;
  padding-bottom: 10px;
  padding-left: 12px;
}
.date-range ul {
  list-style-type: none;
  padding: 0;
  z-index: 1;
  border-radius: 10px;
  border: none;
  max-height: 200px;
}
li:last-child {
  margin-bottom: -13px;
}
.mt-6 {
  margin-top: 6px;
}
.image-size {
  height: 18px;
  width: 18px;
}
.filter-icons {
  width: 50px;
  height: 35px;
  border-radius: 0 0 8px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
}
.dropdown-menu > li > a {
  padding: 0px;
  clear: none;
}
.dropdown-menu {
  top: 0;
}
.clear-option {
  padding-top: 20px;
}
.clear-option a {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #0b3c61;
}
.filter-ul {
  overflow: auto;
  padding: 16px 8px 16px 24px;
  width: 375px;
  height: auto;
  display: block;
  scrollbar-width: thin;
}
.filter-ul li .icon {
  padding: 0 0 0 9px;
}
.filter-icon {
  padding-right: 8px;
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #cdcdcd;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cdcdcd;
}
.pb-3 {
  padding-bottom: 3px;
}
.pt-3 {
  padding-top: 3px;
}
.mb-0 {
  margin-bottom: 0;
}
.font-props {
  font-family: Roboto;
  font-style: normal;
  color: #0b3c61;
}
.ft-12 {
  font-size: 12px;
}
.ft-16 {
  font-size: 16px;
}
.ft-18 {
  font-size: 18px;
}
.ft-wt-400 {
  font-weight: 400;
}
.ft-wt-normal {
  font-weight: normal;
}
.ft-wt-bold {
  font-weight: bold;
}
.date-selected {
  font-weight: bold;
}
.last-7-days,
.last-30-days,
.within-year,
.cursor {
  cursor: pointer;
}
.country-selection-text >>> .el-input__inner {
  width: 250px;
}
.Filter-tab {
  height: 55px;
  width: 75px;
  padding-left: 6px;
}
.reg-filter {
  position: absolute;
  z-index: 3;
}
.left-transform {
  transform: rotate(-180deg);
}
.pd-0 {
  padding: 0px;
}
.text-align {
  text-align: center;
}
.filter-text {
  display: inline-flex;
  padding-bottom: 18px;
}
.reg-dropdown {
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 4px 0px;
  text-align: center;
}
#activityFilter {
  height: 46px;
  width: 65px;
}
.reg-dropdown img {
  margin: 16px 0px 12px 0px;
}
@media only screen and (max-width: 576px) {
  .Filter-tab {
    height: 50px;
    width: 60px;
    padding-left: 0px;
  }
}
.top-5 {
  top: 5px;
}
/* .regulatory-date .mx-datepicker >>> .mx-input {
  padding-left: 7px;
} */
/* .regulatory-date .mx-datepicker {
  width: 100%;
} */
@media screen and (max-width: 767px) {
  .collapse.in {
    display: block !important;
  }
}
</style>
