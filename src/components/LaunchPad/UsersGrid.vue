<template>
  <div class="col-md-12 col-lg-12 col-sm-12 pl-0 xs-pr-0">
    <div class="first_table">
      <table class="table activity-tracker-table">
        <thead v-if="showheader">
          <tr>
            <th class="filter-th wd-65 sticky"></th>
            <template v-for="(cellVal, indexes) in headers">
              <th
                class
                v-if="selectedColumns.indexOf(cellVal) > -1"
                :key="indexes"
              >
                {{ capitalize(cellVal) }}
              </th>
            </template>
            <th class="dropdown-column">
              <div id="userPreferences" class="dropdown angle">
                <span class="plus-circle" data-toggle="dropdown">
                  <img src="/static/images/icons/plus_circle_icon.svg" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rowVal, index) in dataList" :key="index">
            <td class="menu-td sticky">
              <div
                :id="'trackerActionDots' + index"
                class="dropdown dropdown-export export-activity-menu text-center"
              >
                <div
                  data-toggle="dropdown"
                  @click="menuDropdown"
                  style="margin-top: 1px"
                >
                  <span
                    class="dropdown-toggle"
                    data-toggle="tooltip"
                    data-placement="left"
                  >
                    <i class="fa fa-ellipsis-v menu-dots"></i>
                  </span>
                </div>
                <ul
                  class="activitytrackermenu dropdown-menu export-menu"
                  v-bind:class="changeClass ? 'addReverse' : ''"
                >
                  <li @click="resetPasswordUser(rowVal, rowVal.deactivated)">
                    <a :disabled="rowVal.deactivated">
                      <img
                        src="/static/images/icons/lock_icon.svg"
                        class="tracker-images lock_image"
                      />
                      <span class="text-color-blue">Reset Password</span>
                    </a>
                  </li>
                  <li class="divider"></li>
                  <li @click="deActivateUser(rowVal, rowVal.deactivated)">
                    <a
                      class="text-color-delete-red menu-dots-links"
                      :disabled="rowVal.deactivated"
                    >
                      <img
                        src="/static/images/icons/delete_icon.svg"
                        class="tracker-images"
                      />
                      <span>Deactivate</span>
                    </a>
                  </li>
                </ul>
              </div>
            </td>
            <template v-for="(cellVal, indexes) in headers">
              <td
                :class="[
                  cellVal === 'company_name'
                    ? 'cursor_pointer decoration-underline'
                    : ''
                ]"
                v-if="selectedColumns.indexOf(cellVal) > -1"
                :key="indexes"
                @click="
                  cellVal === 'company_name' ? openAccountDetails(rowVal) : null
                "
              >
                <span
                  v-if="cellVal !== 'rep_client'"
                  v-html="rowVal[cellVal]"
                ></span>
                <span v-if="cellVal == 'rep_client'">{{
                  repClientFilter(rowVal[cellVal])
                }}</span>
              </td>
            </template>
            <td class="dropdown-column"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="dataList.length === 0" class="norecords_wrapper">
      <div class="no-records-found">No Records Found</div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import isEqual from 'lodash/isEqual';
import activityTrackerMixin from '../UIComponents/mixins/activityTrackerMixin';
import {
  getUsersPreferences,
  updateUsersPreferences
} from '../../apis/activityTracker';
import Loader from '../UIComponents/Loader.vue';

export default {
  mixins: [activityTrackerMixin],
  props: ['selectedMenu', 'searchActivity', 'dataList', 'pagechanged'],
  data() {
    return {
      userPreferences: [],
      selectedUsersList: [],
      diffSelectedColumns: [],
      selectedColumns: [],
      isCheckAll: false,
      changeClass: false,
      selectedRow: [],
      loaderStatus: false,
      deactivateList: [],
      userAccounts: [],
      selectedUser: {},
      errorType: '',
      showheader: true,
      headers: [],
      mandatoryColumns: ['company_name', 'email_id', 'account_id'],
      isSelectedColumnsChanged: false
    };
  },
  components: {
    Loader
  },
  async created() {
    await this.getUserPrefernces();
  },
  methods: {
    capitalize(value) {
      if (!value) return '';
      const returnVal = value.replace('_', ' ').toString();
      return returnVal
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    },
    repClientFilter(value) {
      if (!value) return 'Commercial';
      return 'Rep';
    },
    SetUserSelectedColumns(userSelectedColumns) {
      this.selectedColumns = [...userSelectedColumns];
    },

    clearNotifications() {
      this.$notify({
        clear: true
      });
    },

    openAccountDetails(user) {
      sessionStorage.setItem('getPreviousUrl', window.location.pathname);
      sessionStorage.setItem('getAccountDetailsId', user.account_id);
      this.$router.push('/accountdetails');
    },
    checkMandatoryFields(header) {
      return (
        header === 'company_name' ||
        header === 'email_id' ||
        header === 'account_id'
      );
    },
    async deActivateUser(user, deactivateStatus) {
      if (!deactivateStatus) {
        this.selectedUser = user;
        $('#deactiveModal').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    },
    async resetPasswordUser(user, deactivateStatus) {
      if (!deactivateStatus) {
        this.selectedUser = user;
        $('#resetPasswordUserModal').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    },
    async updateUserPreferences() {
      const previouslySelectedColumns = [...this.diffSelectedColumns].sort();
      if (!isEqual(this.selectedColumns.sort(), previouslySelectedColumns)) {
        this.isSelectedColumnsChanged = true;
      }
    },

    async updateUserSelctedPreferences() {
      let data;
      if (this.selectedColumns.length <= 6) {
        data = {
          account_id: this.selectedColumns.indexOf('account_id') !== -1,
          account_type: this.selectedColumns.indexOf('account_type') !== -1,
          company_name: this.selectedColumns.indexOf('company_name') !== -1,
          confirmed: this.selectedColumns.indexOf('confirmed') !== -1,
          confirmed_date: this.selectedColumns.indexOf('confirmed_date') !== -1,
          email_id: this.selectedColumns.indexOf('email_id') !== -1,
          created_date: this.selectedColumns.indexOf('created_date') !== -1,
          first_name: this.selectedColumns.indexOf('first_name') !== -1,
          last_name: this.selectedColumns.indexOf('last_name') !== -1,
          user_id: this.selectedColumns.indexOf('user_id') !== -1,
          deactivated: this.selectedColumns.indexOf('deactivated') !== -1,
          user_role: this.selectedColumns.indexOf('user_role') !== -1
        };
      }
      const response = await updateUsersPreferences(data);
      if (response) {
        this.diffSelectedColumns = this.selectedColumns;
        this.clearNotifications();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Columns modified successfully!'
        });
      } else {
        this.clearNotifications();
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'updating Columns !'
        });
      }
      this.isSelectedColumnsChanged = false;
    },
    async getUserPrefernces() {
      const preferences = await getUsersPreferences();
      this.loaderStatus = false;
      const totalPrefernces = Object.keys(preferences);
      this.headers = [...totalPrefernces];
      totalPrefernces.forEach((column) => {
        if (preferences[column]) {
          this.selectedColumns.push(column);
        }
      });
      this.diffSelectedColumns = [...this.selectedColumns];
    },
    // To Disable modal on select of tracker dots
    menuDropdown(event) {
      $('td.sticky').css('z-index', 0);
      $(event.target).closest('td.sticky').css('z-index', 1);
      this.dropDownMenuDisable = true;
      this.changeClass = false;
      if (event.screenY > window.innerHeight - 90) {
        this.changeClass = true;
      } else {
        this.changeClass = false;
      }
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedUsersList = [];
      this.selectedRow = [];
      if (this.isCheckAll) {
        this.dataList.forEach((value) => {
          this.selectedRow.push(value.user_id);
          this.selectedUsersList.push(value);
        });
      }
    },
    updateCheckall(rowVal) {
      const valIndex = this.selectedRow.indexOf(rowVal.Id);
      if (valIndex !== -1) {
        this.selectedUsersList.push(rowVal);
      } else {
        this.selectedUsersList.splice(valIndex, 1);
      }
      if (this.selectedUsersList.length === this.dataList.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    }
  },
  watch: {
    selectedUsersList() {
      this.$emit('input', this.selectedUsersList);
    },
    headers() {
      if (this.headers.length) {
        this.showheader = true;
      } else this.showheader = false;
    },
    isSelectedColumnsChanged() {
      if (this.isSelectedColumnsChanged) {
        this.updateUserSelctedPreferences();
      }
    }
  },
  mounted() {
    $('#userPreferences').on('hide.bs.dropdown', this.updateUserPreferences);
  }
};
</script>
<style scoped>
.lock_image {
  height: 15px;
}
.activity-tracker-table
  .export-activity-menu
  .dropdown-menu.export-menu::after {
  left: -8px;
}
.activity-tracker-table .export-activity-menu.dropdown-export {
  float: none;
}

.activity-tracker-table .dropdown-column {
  text-align: start;
}

#userPreferences.dropdown.angle.open::before {
  display: unset;
  position: absolute;
  pointer-events: none;
  content: '';
  visibility: visible;
  transform: rotate(45deg);
  width: 21px;
  height: 34px;
  background: #fff;
  z-index: 1;
  right: 12px;
  top: 22px;
  box-shadow: 0 0 6px 1px rgba(41, 38, 38, 0.15);
}

@media screen and (max-width: 767px) {
  .activity-tracker-table.table tr .sticky {
    box-shadow: 4px 0 4px -4px rgba(0, 0, 0, 0.1);
  }
}
</style>
