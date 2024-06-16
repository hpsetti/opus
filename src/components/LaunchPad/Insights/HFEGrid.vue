<template>
  <div class="col-md-12 col-lg-12 col-sm-12 pl-20 pr-20 xs-pr-0 mt-20">
    <div class="d-flex justify-content-end">
      <p
        class="item-action delete pr-20 pt-10 cursor-pointer"
        :class="selectedProjects.length ? '' : 'disabled'"
        @click="deleteHfeInsight(true)"
      >
        <img
          class="back-img gap-nve-5"
          src="/static/images/consulting/delete.svg"
          alt=""
        />
        <span>Delete</span>
      </p>
      <BaseButton
        variant="primary"
        has-icon
        @click="openAddPopup"
        :disabled="filteredList.length > 9 ? true : false"
      >
        <img
          src="/static/images/icons/plus_white.svg"
          alt="Add Category"
          class="preview-svg"
        />
        <span>Add Insight</span>
      </BaseButton>
    </div>
    <span class="text-subtitle-2">{{ filteredList.length }} items</span>
    <div class="pagination-wrapper pt-20" v-if="filteredList.length > 0">
      <table class="projects-table">
        <thead>
          <tr>
            <th class="pl-5 pr-10">
              <div class="select-box">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="isSelectAll"
                      @change="setAllSelected()"
                    />
                    <span class="cr">
                      <i class="cr-icon glyphicon glyphicon-ok"></i>
                    </span>
                  </label>
                </div>
              </div>
            </th>
            <th @click="setSortBy('hfe_insight_headline')">
              Training name
              <span
                class="sort-key"
                :class="getSortKey('hfe_insight_headline')"
              ></span>
            </th>
            <th @click="setSortBy('date_created')">
              Date
              <span class="sort-key" :class="getSortKey('date_created')"></span>
            </th>
            <th @click="setSortBy('viewing_order')">
              Viewing order
              <span
                class="sort-key"
                :class="getSortKey('viewing_order')"
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hfe in filteredList" :key="hfe.id">
            <td class="pl-5 pr-10 select-checkbox">
              <div class="select-box">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="selectedProjects"
                      :value="hfe.id"
                      @change="onSelectAll()"
                    />
                    <span class="cr">
                      <i class="cr-icon glyphicon glyphicon-ok"></i>
                    </span>
                  </label>
                </div>
              </div>
            </td>
            <td>{{ hfe.hfe_insight_headline }}</td>
            <td class="table-data-fixed-width">
              {{ getDateFormat(hfe.date_created) }}
            </td>
            <td class="table-data-fixed-width">
              <div class="d-flex align-items-center justify-content-between">
                <multiselect
                  class="table-data-fixed-px multiselect-single-dropdown"
                  v-model="hfe.viewing_order"
                  :multiple="false"
                  :options="availableViewingOrder"
                  :close-on-select="true"
                  :show-labels="false"
                  :allow-empty="false"
                  :searchable="false"
                  @select="setViewingorder"
                ></multiselect>
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
                      @click="openEditPopup(hfe)"
                    >
                      <img
                        src="/static/images/icons/edit_icon_new.svg"
                        class="preview-svg"
                      />
                      <span class="ml-10 project-menu-action">Edit</span>
                    </div>
                    <div
                      class="project-menu-action-container p-15"
                      @click="deleteHfeInsight(false, hfe.id)"
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
    </div>
    <div v-if="filteredList.length === 0" class="norecords_wrapper">
      <div class="mt-50 no-records-found">No insights found!</div>
    </div>
    <BaseButton
      class="mt-10 float-right"
      variant="primary"
      has-icon
      @click="addHfe"
      :disabled="isViewingOrderUnique ? false : true"
    >
      <span>Update Order</span>
    </BaseButton>
    <AddHFEModal></AddHFEModal>
    <EditHFEModal :editDetails="editDetails"></EditHFEModal>
    <DeleteHFEModal
      :rec="selectedItem"
      @delete="deleteHfe(selectedItem.id)"
    ></DeleteHFEModal>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import orderBy from 'lodash/orderBy';
import Multiselect from 'vue-multiselect';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import EventBus from '../../../utils/event-bus';
import {
  getHfeData,
  deleteHfe,
  updateHfeViewingOrder
} from '../../../apis/hfeInsightsAdmin';
import DeleteHFEModal from './DeleteHFE.vue';
import EditHFEModal from './editHFE.vue';
import AddHFEModal from './AddHFEModal.vue';
import { getDateFormat } from '../../../utils/common';

export default {
  components: {
    Loader,
    DeleteHFEModal,
    EditHFEModal,
    AddHFEModal,
    BaseButton,
    Multiselect
  },
  async created() {
    this.emitter.on('getHfeData', async () => {
      await this.getHfeInsightsData();
    });
    await this.getHfeInsightsData();
    this.setSortBy('hfe_insight_headline');
  },
  data() {
    return {
      insights: [],
      changeClass: false,
      selectedItem: {},
      editDetails: null,
      filteredList: [],
      selectedProjects: [],
      selectedProject: [],
      loaderStatus: false,
      isSelectAll: false,
      sortingType: 'name',
      sortingOrder: 'asc',
      sortIcon: 'asc',
      availableViewingOrder: [],
      viewingOrder: [],
      isViewingOrderUnique: false,
      newList: [],
      sortOptions: {
        hfe_insight_headline: 1,
        date_created: -1,
        viewing_order: -1
      }
    };
  },
  methods: {
    getDateFormat,
    openAddPopup() {
      this.openAddNewContentPopup();
    },
    async addHfe() {
      this.loaderStatus = true;
      this.filteredList.active = true;
      const response = await updateHfeViewingOrder(this.filteredList);
      if (response) {
        if (response.data === 'HfeHeadline already Exist') {
          this.$notify({
            type: 'warning',
            title: 'Warning',
            text: response.data
          });
          this.categoryName = '';
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
        }
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data
        });
      }
      this.emitter.emit('getHfeData');
      await this.getHfeInsightsData();
      this.isViewingOrderUnique = false;
      this.loaderStatus = false;
    },
    openAddNewContentPopup() {
      $('#add-hfe').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    onSelectAll() {
      this.isSelectAll =
        this.selectedProjects.length === this.filteredList.length;
    },
    deSelectAll() {
      this.selectedProjects = [];
      this.isSelectAll = false;
    },
    setAllSelected() {
      if (this.isSelectAll) {
        this.selectedProjects = this.filteredList.map((hfe) => hfe.id);
      } else {
        this.selectedProjects = [];
      }
    },
    async getHfeInsightsData() {
      this.loaderStatus = true;
      const response = await getHfeData();
      if (response) {
        this.filteredList = response;
      }
      this.availableViewingOrder = this.filteredList.map(
        (item) => item.viewing_order
      );
      this.loaderStatus = false;
    },
    setViewingorder() {
      this.$nextTick(() => {
        this.newList = this.filteredList.map((item) => item.viewing_order);
        if (this.newList.length === new Set(this.newList).size) {
          this.isViewingOrderUnique = true;
        } else {
          this.isViewingOrderUnique = false;
        }
      });
    },
    deleteHfeInsight(isMultiSelect = false, id) {
      if (!isMultiSelect) this.selectedProject = id;
      else this.selectedProject = [];
      $('#delete_hfe').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async deleteHfe() {
      const idList = this.selectedProjects.length
        ? this.selectedProjects
        : [this.selectedProject];
      this.loaderStatus = true;
      const response = await deleteHfe(idList);
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
      $('#delete_hfe').modal('hide');
      await this.getHfeInsightsData();
      this.deSelectAll();
      this.loaderStatus = false;
    },
    openEditPopup(rec) {
      this.editDetails = rec;
      this.openEditContentPopup();
    },
    openEditContentPopup() {
      $('#edit-hfe').modal({
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
      this.sortingType = type;
      this.sortOptions[type] *= -1;
      const sortOrder = this.sortOptions[type] > 0 ? 'desc' : 'asc';
      this.sortIcon = sortOrder;
      this.filteredList = orderBy(this.filteredList, type, sortOrder);
    }
  }
};
</script>
<style scoped>
.table {
  border-top: 1px solid #bdbdbd;
}
.item-action.disabled {
  pointer-events: none;
  opacity: 40%;
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
.table-data-fixed-px {
  width: 105px;
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
</style>
