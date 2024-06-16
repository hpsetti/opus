<template>
  <div class="col-md-12 col-lg-12 col-sm-12 pl-20 pr-20 xs-pr-0 mt-20">
    <span class="text-subtitle-2">{{ filteredList.length }} items</span>
    <div class="pagination-wrapper pt-20">
      <!-- <OpusTabs :tabs="UIRLTabs" v-model="tabActiveName" /> -->
      <table class="projects-table" v-if="filteredList.length > 0">
        <thead>
          <tr>
            <th @click="setSortBy('id')">
              Number
              <span class="sort-key" :class="getSortKey('requirement_number')"></span>
            </th>
            <th class="pl-15" @click="setSortBy('requirement_title')">
              Title
              <span
                class="sort-key"
                :class="getSortKey('requirement_title')"
              ></span>
            </th>
            <th @click="setSortBy('date_created')">
              Added Date
              <span class="sort-key" :class="getSortKey('date_created')"></span>
            </th>
            <th @click="setSortBy('date_modified')">
              Last modified
              <span
                class="sort-key"
                :class="getSortKey('date_modified')"
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rec in filteredList" :key="rec.id">
            <td class="table-data-fixed-width">{{ rec.requirement_number }}</td>
            <td class="pl-15">{{ rec.requirement_title }}</td>
            <!-- <td class="pl-15">{{ rec.categories.join(", ") }}</td>
            <td class="pl-15">{{ rec.sub_categories.join(", ") }}</td> -->
            <td class="table-data-fixed-width">
              {{ getDateFormat(rec.date_created) }}
            </td>
            <td class="table-data-fixed-width">
              <div class="d-flex align-items-center justify-content-between">
                {{ getDateFormat(rec.date_modified) || '&nbsp;' }}
                <div class="dropdown pr-20 pl-20">
                  <img
                    src="/static/images/icons/more-horizontal.svg"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />
                  <div class="dropdown-menu dropdown-menu-right pb-10 pt-10">
                    <div
                      class="project-menu-action-container p-15"
                      @click="openEditPopup(rec)"
                    >
                      <img
                        src="/static/images/icons/edit_icon_new.svg"
                        class="preview-svg"
                      />
                      <span class="ml-10 project-menu-action">Edit</span>
                    </div>
                    <div
                      class="project-menu-action-container p-15"
                      @click="deleteDRL(rec)"
                    >
                      <img
                        src="/static/images/icons/delete_icon.svg"
                        class="preview-svg"
                      />
                      <span class="ml-10 project-menu-action delete"
                        >Delete</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :totalPages="totalPages"
        v-if="total"
        :maxVisibleButtons="maxVisiblePages"
        :total="total"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="pagechanged"
      ></Pagination>
    </div>
    <div v-if="filteredList.length === 0" class="norecords_wrapper">
      <div class="mt-50 no-records-found">No requirements found!</div>
    </div>
    <EditUIRLModal :editDetails="editDetails"></EditUIRLModal>
    <DeleteUIRLModal
      :rec="selectedItem"
      @delete="deleteRecommendation(selectedItem.id)"
    ></DeleteUIRLModal>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import orderBy from 'lodash/orderBy';
// import OpusTabs from '@/components/UIComponents/OpusTabs.vue';
import Loader from '../../UIComponents/Loader.vue';
import EventBus from '../../../utils/event-bus';
import {
  getRecommendations,
  deleteRecommendation
} from '../../../apis/uirlAdmin';
import EditUIRLModal from './EditUIRLModal.vue';
import DeleteUIRLModal from './DeleteUIRLModal.vue';
import Pagination from '../Pagination.vue';
import { getDateFormat } from '../../../utils/common';

export default {
  components: {
    // OpusTabs,
    Loader,
    EditUIRLModal,
    DeleteUIRLModal,
    Pagination
  },
  async created() {
    this.emitter.on('getRecommendations', async () => {
      await this.getRecommendationsData();
    });
    await this.getRecommendationsData();
    this.setSortBy('id');
  },
  data() {
    return {
      recommendations: [],
      tabActiveName: 'viewall',
      // UIRLTabs: [
      //   { name: 'View All', key: 'viewall' },
      //   { name: 'Hardware', key: 'Hardware & On-Device Markings' },
      //   { name: 'Software', key: 'Software' },
      //   { name: 'Packaging & Labelling', key: 'Packaging & Labelling' },
      //   { name: 'Instructions', key: 'Instructions' },
      //   { name: 'Training', key: 'Training' }
      // ],
      changeClass: false,
      selectedItem: {},
      editDetails: null,
      filteredList: [],
      loaderStatus: false,
      totalPages: 1,
      total: 0,
      perPage: 20,
      currentPage: 1,
      maxVisiblePages: 4,
      sortingType: 'name',
      sortingOrder: 'asc',
      sortIcon: 'asc',
      sortOptions: {
        id: 1,
        requirement_title: -1,
        date_created: -1,
        date_modified: -1
      }
    };
  },
  watch: {
    async tabActiveName() {
      await this.getRecommendationsData();
    }
  },
  methods: {
    getDateFormat,
    async pagechanged(currentPage) {
      if (currentPage) this.currentPage = currentPage;
      await this.getRecommendationsData();
    },
    async getRecommendationsData() {
      const formData = {
        pagination: {
          current_page: this.currentPage,
          result_per_page: this.perPage
        },
        search:this.tabActiveName !== 'viewall' ? this.tabActiveName :''
      };
      this.loaderStatus = true;
      const response = await getRecommendations(formData);
      if (response) {
        this.filteredList = response.result_data;
        this.total = response.total_records_count;
        this.totalRecordsCount =
          this.total > this.totalRecordsCount
            ? this.total
            : this.totalRecordsCount;
        this.totalPages = Math.ceil(this.total / this.perPage);
      }
      this.loaderStatus = false;
    },
    deleteDRL(rec) {
      this.selectedItem = rec;
      $('#delete_drl').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async deleteRecommendation(id) {
      this.loaderStatus = true;
      const response = await deleteRecommendation(id);
      if (response.message === 'success') {
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
      $('#delete_drl').modal('hide');
      await this.getRecommendationsData();
      if (this.filteredList.length === 0 && this.currentPage > 1) {
        this.currentPage -= 1;
        await this.getRecommendationsData();
      }
      this.loaderStatus = false;
    },
    openEditPopup(rec) {
      this.editDetails = rec;
      this.openAddNewContentPopup();
    },
    openAddNewContentPopup() {
      $('#edit-rec').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    menuDropdown(event) {
      this.changeClass = false;
      if (event.screenY > window.innerHeight - 150) {
        this.changeClass = true;
      } else {
        this.changeClass = false;
      }
    },
    getSortKey(key) {
      let classes = '';
      classes += this.sortOptions[key] > 0 ? 'asc' : 'desc';
      classes += this.sortingType === key ? ' active' : ' ';
      return classes;
    },
    setSortBy(type) {
      // const currentList = this.groupByStatus[this.activeTabName];
      this.sortingType = type;
      this.sortOptions[type] *= -1;
      const sortOrder = this.sortOptions[type] > 0 ? 'desc' : 'asc';
      this.sortIcon = sortOrder;
      this.filteredList = orderBy(this.filteredList, type, sortOrder);
      // const sortedList = orderBy(this.drlData.data.result_data, type, sortOrder);
      // this.groupByStatus = { ...this.groupByStatus, [this.activeTabName]: sortedList };
    }
  }
};
</script>
<style scoped>
.table {
  border-top: 1px solid #bdbdbd;
}
@media screen and (max-width: 767px) {
  .xs-hide {
    display: hidden;
  }
  .first_table > .table {
    width: 898px;
    max-width: unset;
  }
  .first_table {
    overflow-x: hidden;
    width: 100%;
  }
  .data_table {
    overflow-x: auto;
    width: calc(100% - 75px);
  }
  .shadow_col {
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1) inset;
  }
  .activity-tracker-table.table > thead:first-child > tr:first-child > th {
    padding-left: 8px;
  }
  .activity-tracker-table.table > tbody > tr > td:first-child {
    padding-left: 8px !important;
  }
}
.width_16 {
  width: 16.6%;
}
.wd-65 {
  width: 65px;
}
.first_table {
  position: relative;
}
.spinnerTop {
  z-index: 3 !important;
}
.data_table {
  background: white;
  position: absolute;
  top: 0;
  left: 75px;
  z-index: 2;
  padding-right: 15px;
}

.table_first {
  width: 130px;
  vertical-align: top;
}
.activity-tracker-table {
  table-layout: fixed;
}
.activitytrackermenu.export-menu:after {
  left: 30px !important;
  visibility: visible;
  box-shadow: none;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
}
.fa.menu-dots {
  cursor: pointer;
  font-size: 22px;
}
th.checkbox-cell {
  height: 45px;
}
.activity-tracker-table.table > thead:first-child > tr:first-child > th {
  color: #0b3c61;
  font-size: 16px;
}
.table_first > .table > thead tr th:first-child,
.table_first > .table > tbody tr td:first-child {
  width: 70px;
}
.activity-tracker-table.table > thead tr th {
  height: 46px;
}
.activity-tracker-table.table > tbody tr td {
  height: 44px;
}
.table_second {
  vertical-align: top;
  padding: 0;
}
.checkbox-cell {
  width: 60px;
  text-align: center;
}
.activity-tracker-table.table thead {
  background-color: white;
}
.menu-td {
  text-align: right;
}
.activity-tracker-table.table > tbody > tr:nth-child(even) {
  background-color: rgba(103, 177, 226, 0.35);
  border-top: 0.5px solid #bdbdbd;
  border-bottom: 0.5px solid #bdbdbd;
}
.activity-tracker-table.table > tbody > tr:nth-child(even).on-hover {
  background-color: rgba(103, 177, 226, 0.35);
}
tbody > tr.on-hover {
  background-color: rgba(103, 177, 226, 0.35);
}
.activity-tracker-table.table > thead > tr > th {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500 !important;
  font-size: 14px;
  line-height: 16px;
  color: #0b3c61;
  border-bottom: 0.5px dashed #bdbdbd;
  vertical-align: middle;
  padding: 10px 10px 10px 3px;
}
.activity-tracker-table.table > tbody > tr > td {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
  padding: 10px 10px 10px 3px !important;
}
.checkbox-cell > .checkbox label:after,
.checkbox label:after {
  content: '';
  display: table;
  clear: both;
}

.activityTracker-checkbox > .checkbox .cr {
  position: relative;
  display: inline-block;
  border: 1px solid #0b3c61;
  border-radius: 1px;
  width: 15px;
  height: 15px;
}

.activityTracker-checkbox > .checkbox .cr .cr-icon {
  position: absolute;
  font-size: 10px;
  line-height: 0;
  top: 48%;
  left: 8%;
}
.activityTracker-checkbox > .checkbox label input[type='checkbox'],
.checkbox label input[type='checkbox'] {
  display: none;
}
.activityTracker-checkbox
  > .checkbox
  label
  input[type='checkbox']
  + .cr
  > .cr-icon {
  opacity: 0;
}
.activityTracker-checkbox
  > .checkbox
  label
  input[type='checkbox']:checked
  + .cr {
  background-color: #0b3c61;
}

.activityTracker-checkbox
  > .checkbox
  label
  input[type='checkbox']:checked
  + .cr
  > .cr-icon {
  opacity: 1;
  color: #fff;
}
.activityTracker-checkbox
  > .checkbox
  label
  input[type='checkbox']:disabled
  + .cr {
  opacity: 0.5;
}
.activityTracker-checkbox > .checkbox label {
  padding-left: 0;
}
.activityTracker-checkbox > .checkbox {
  margin: 0;
  text-align: center;
  display: inline;
  vertical-align: sub;
}
.preferences-columns .checkbox .cr {
  top: 2px;
  margin-right: 5px;
}
.custom-checkbox-class {
  left: 40px;
  width: 0px;
  height: 0px;
  top: 0px;
}
.checkmark {
  position: relative;
  display: inline-block;
  margin: 3px 0px -4px -7px;
  background-color: white;
}
table input[type='checkbox'].custom-checkbox-class {
  position: fixed;
}
.dropdown-column {
  width: 45px;
  text-align: right;
  padding-right: 10px !important;
}
.activitytrackermenu.dropdown-menu.pull-left {
  right: 0px;
  left: auto;
  top: 25px;
  min-width: 200px;
}
ul.activitytrackermenu.dropdown-menu.pull-left li {
  padding-left: 10px;
  padding-bottom: 5px;
}
.dropdown.angle.open::before {
  display: unset;
  position: absolute;
  pointer-events: none;
  content: '';
  visibility: visible;
  transform: rotate(45deg);
  width: 0.6em;
  height: 0.6em;
  background: #fff;
  z-index: 9999;
  right: 10px;
  top: 24px;
  box-shadow: -1px -1px 1px 1px rgba(41, 38, 38, 0.15);
  -webkit-transition: all 0.5s ease-in 0s;
  transition: all 0.5s ease-in 0s;
}
@media only screen and (max-width: 767px) {
  .xs-pr-0 {
    padding-right: 0px !important;
  }
  .activity-tracker-table.dataList {
    width: 768px;
    max-width: unset;
  }
  .table_first > .table {
    position: relative;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
  }
  .table-wrapper > .table.dataList > thead tr th:first-child,
  .table-wrapper > .table.dataList > tbody tr td:first-child {
    padding-left: 10px !important;
  }
  .table-wrapper {
    overflow: scroll;
  }
  .main-table {
    table-layout: fixed;
  }
  .activity-tracker-table.table-responsive {
    border: none;
  }
  .table_second {
    overflow: scroll;
  }
  .table_first {
    width: 70px;
  }
}
.filter-wrapper >>> .el-tag {
  background-color: transparent;
  border: transparent;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #0b3c61;
}
.filter-wrapper >>> .el-collapse-item__arrow {
  margin: 0 14px 0 auto;
}
.wd-20 {
  width: 20%;
}
.wd-25 {
  width: 25%;
}
.wd-18 {
  width: 18%;
}
.cursor {
  cursor: pointer;
}
td > a {
  color: rgba(0, 0, 0, 0.7);
}
.center {
  width: 50%;
}
.projects-table {
  width: 100%;
}
.projects-table thead {
  border-bottom: 1px dashed rgba(11, 60, 97, 0.25);
}
.projects-table thead th {
  color: #0b3c61;
  font-size: 14px;
  font-weight: 400;
  padding-top: 10px;
  line-height: 19px;
  padding-bottom: 10px;
  cursor: pointer;
}
.projects-table tbody tr {
  border-bottom: 1px solid rgba(11, 60, 97, 0.1);
}
.projects-table tbody td {
  padding-top: 10px;
  padding-bottom: 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #333333;
}
.projects-table tbody td .sub-text {
  color: #828282;
}
.dropdown-menu {
  width: max-content;
  margin-top: 10px;
  margin-right: 10px;
}
.dropdown-menu::before {
  height: 16px;
  width: 16px;
  background-color: white;
  color: white;
  content: '.';
  text-align: center;
  display: inline-block;
  right: 5%;
  position: absolute;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(45deg);
  top: -9px;
  border-radius: 2px 0 0 0;
}
.project-menu-action {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61;
}
.project-menu-action.delete {
  color: #b00505;
}
.project-menu-action-container {
  padding-right: 100px;
}
.project-menu-action-container:hover {
  background: rgba(0, 0, 0, 0.05);
}
.project-menu-action-container .icon {
  width: 18px;
  height: 18px;
  color: red;
}
.select-checkbox {
  width: 40px;
}
.table-data-fixed-width {
  width: 16%;
  overflow-wrap: anywhere;
}
.sort-key.desc:before {
  content: url('/static/images/icons/caret_up_light.svg');
  position: relative;
  top: -3px;
  left: 2px;
}
.sort-key.asc:before {
  content: url('/static/images/icons/caret_up_light.svg');
  display: inline-block;
  transform: rotate(180deg);
  position: relative;
  top: 1px;
  left: 2px;
}
.sort-key.active:before {
  content: url('/static/images/icons/caret_up.svg');
}

.pagination-wrapper >>> .box-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-wrapper >>> .box-wrapper .pagination {
  flex: 1;
}
</style>
