<template>
  <div class="col-md-12 col-lg-12 col-sm-12 pl-0 xs-pr-0">
    <div class="column-select-container">
      <div class="col-md-6 col-lg-4 col-sm-8 col-xs-9">
        <multiselect
          class="VMSelectCss overflow-country"
          v-model="showingColumns"
          :multiple="true"
          :options="availableColumns"
          :show-labels="false"
          :allow-empty="false"
          :searchable="false"
          :taggable="false"
          :close-on-select="false"
          placeholder="Select Columns"
        ></multiselect>
      </div>
    </div>
    <div class="first_table">
      <table class="table activity-tracker-table">
        <thead v-if="showheader">
          <tr>
            <th class="filter-th wd-70 sticky"></th>
            <template>
              <th v-if="showingColumns.includes('accountId')">Account Id</th>
              <th v-if="showingColumns.includes('companyName')">
                Company Name
              </th>
              <th v-if="showingColumns.includes('email')">Email</th>
              <th v-if="showingColumns.includes('name')">Name</th>
              <th v-if="showingColumns.includes('planName')">Plan Name</th>
              <th v-if="showingColumns.includes('createdAt')">Created At</th>
              <th v-if="showingColumns.includes('country')">Country</th>
              <th v-if="showingColumns.includes('userId')">User Id</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rowVal, index) in dataList" :key="index">
            <template>
              <td></td>
              <td
                v-if="showingColumns.includes('accountId')"
                class="premium-services"
              >
                <span @click="getAccountDetailsPlan(rowVal.account_id)">
                  {{ rowVal.account_id }}
                </span>
              </td>
              <td v-if="showingColumns.includes('companyName')">
                <span>{{ rowVal.company_name }}</span>
              </td>
              <td v-if="showingColumns.includes('email')">
                <span>{{ rowVal.email }}</span>
              </td>
              <td v-if="showingColumns.includes('name')">
                <span>{{ rowVal.first_name }} {{ rowVal.last_name }}</span>
              </td>
              <td v-if="showingColumns.includes('planName')">
                <span>{{ rowVal.plan_name }}</span>
              </td>
              <td v-if="showingColumns.includes('createdAt')">
                <span>{{ rowVal.valid_from }}</span>
              </td>
              <td v-if="showingColumns.includes('country')">
                <span>{{ rowVal.country }}</span>
              </td>
              <td v-if="showingColumns.includes('userId')">
                <span>{{ rowVal.user_id }}</span>
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
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Loader from '../UIComponents/Loader.vue';
import {
  getAccountPreferences,
  updateAccountPreferences
} from '../../apis/activityTracker';

export default {
  props: ['dataList', 'value', 'dataHeaders'],
  data() {
    return {
      loaderStatus: false,
      selectedAccountsList: [],
      selectedColumns: [],
      diffSelectedColumns: [],
      isCheckAll: false,
      changeClass: false,
      selectedRow: [],
      deactivateList: [],
      convertAccountDetails: {},
      showheader: true,
      headers: [],
      isSelectedColumnsChanged: false,
      showingColumns: [
        'accountId',
        'companyName',
        'email',
        'name',
        'planName',
        'createdAt',
        'country',
        'userId'
      ],
      availableColumns: [
        'accountId',
        'companyName',
        'email',
        'name',
        'planName',
        'createdAt',
        'country',
        'userId'
      ]
    };
  },
  components: {
    Loader,
    Multiselect
  },
  async created() {
    await this.getAccPreferences();
  },
  mounted() {
    $('#accPreferences').on(
      'hidden.bs.dropdown',
      this.updateAccountPreferences
    );
  },
  methods: {
    getAccountDetailsPlan(id) {
      sessionStorage.setItem('getPreviousUrl', this.$route.name);
      sessionStorage.setItem('getAccountDetailsId', id);
      this.$router.push({
        name: 'AccountDetails',
        params: {
          account_id: id
        }
      });
    },
    SetUserSelectedColumns(userSelectedColumns) {
      this.selectedColumns = [...userSelectedColumns];
    },

    convertAccount(account) {
      if (account.rep_client) {
        this.convertAccountDetails = account;
        $('#convertAccountModal').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    },
    deActivateAccount(accountId, deActivatedFlag) {
      if (!deActivatedFlag) {
        this.deactivateList = [accountId];
        $('#deactiveModal').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    },
    async updateAccountPreferences() {
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
          company_name: this.selectedColumns.indexOf('company_name') !== -1,
          users_active: this.selectedColumns.indexOf('users_active') !== -1,
          registrations: this.selectedColumns.indexOf('registrations') !== -1,
          rep_client: this.selectedColumns.indexOf('rep_client') !== -1,
          services_registered:
            this.selectedColumns.indexOf('services_registered') !== -1,
          created_date: this.selectedColumns.indexOf('created_date') !== -1,
          first_name: this.selectedColumns.indexOf('first_name') !== -1,
          last_name: this.selectedColumns.indexOf('last_name') !== -1,
          storage_used: this.selectedColumns.indexOf('storage_used') !== -1,
          deactivated: this.selectedColumns.indexOf('deactivated') !== -1
        };
      }
      const response = await updateAccountPreferences(data);
      if (response) {
        this.diffSelectedColumns = [...this.selectedColumns];
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

    clearNotifications() {
      this.$notify({
        clear: true
      });
    },

    async getAccPreferences() {
      this.loaderStatus = true;
      const preferences = await getAccountPreferences();
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
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedAccountsList = [];
      this.selectedRow = [];
      if (this.isCheckAll) {
        this.dataList.forEach((value) => {
          this.selectedRow.push(value.account_id);
          this.selectedAccountsList.push(value);
        });
      }
    },
    updateCheckall(rowVal) {
      const valIndex = this.selectedRow.indexOf(rowVal.account_id);
      if (valIndex !== -1) {
        this.selectedAccountsList.push(rowVal);
      } else {
        this.selectedAccountsList.splice(valIndex, 1);
      }
      if (this.selectedAccountsList.length === this.dataList.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
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
    }
  },
  watch: {
    selectedAccountsList() {
      this.$emit('input', this.selectedAccountsList);
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
  }
};
</script>
<style scoped>
.premium-services {
  cursor: pointer;
  text-decoration: underline;
}
.premium-services span {
  font-weight: bold;
}
.norecords_wrapper {
  background-color: #f9f9f9;
}

.text-start {
  text-align: start;
}

#accPreferences.dropdown.angle.open::before {
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
.premium-services {
  color: #0b3c61 !important;
}
.column-select-container {
  display: flex;
  justify-content: flex-end;
  margin-top: -55px;
  margin-bottom: 20px;
}

.VMSelectCss >>> .multiselect__content-wrapper .multiselect__option--highlight {
  color: #000000;
  height: 30px;
  background: #f5f5f5;
}
.VMSelectCss >>> .multiselect__option--selected:before {
  content: '\f00c';
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  color: green;
  float: right;
}
.VMSelectCss >>> .multiselect__tags {
  border-radius: 15px;
  min-height: 0;
  height: 33px;
  line-height: 12px;
  border: 1px solid black;
  padding-top: 6px;
  overflow: hidden;
}

.VMSelectCss >>> .multiselect__placeholder {
  padding-top: 4px;
}

.VMSelectCss >>> .multiselect__content-wrapper {
  min-height: 0px;
  max-height: 180px !important;
  border: 1px solid #aaa;
}
.overflow-country >>> .multiselect__content-wrapper {
  overflow-y: scroll;
}
.VMSelectCss >>> .multiselect__option {
  height: 30px;
  font-size: 13px;
}
.VMSelectCss >>> .multiselect__single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.VMSelectCss >>> .multiselect__select {
  height: 35px;
}
.VMSelectCss >>> .multiselect__element .multiselect__option span {
  word-break: break-word;
  white-space: pre-wrap;
}
.VMSelectCss >>> .multiselect__select:before {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  border: 1px solid #0b3c61;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  top: 0;
  content: '';
}
</style>
