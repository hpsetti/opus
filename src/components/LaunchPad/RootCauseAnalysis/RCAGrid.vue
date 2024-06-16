<template>
  <div class="col-md-12 col-lg-12 col-sm-12 pl-0 xs-pr-0">
    <div class="first_table">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width: 40px !important">
              <!-- <input
                    type="checkbox"
                    id="select_all"
                    class="form-control"
                    :disabled="!rootCauseInfo.length"
                  /> -->
            </th>
            <th class="root-heading">Root cause title</th>
            <th class="root-heading">Sample use error title</th>
          </tr>
        </thead>
        <tbody v-if="rootCauseInfo.length > 0">
          <tr v-for="(root, index) in rootCauseInfo" :key="index">
            <td class="title-sub-header">
              <div class="dropdown export-activity-menu p-0 ml-15">
                <div
                  data-toggle="dropdown"
                  @click="menuDropdown"
                  style="margin-top: 1px"
                >
                  <span
                    class="dropdown-toggle cursor-pointer"
                    data-toggle="tooltip"
                    data-placement="left"
                  >
                    <i class="fa fa-ellipsis-v menu-dots"></i>
                  </span>
                </div>
                <ul
                  class="activitytrackermenu dropdown-menu export-menu"
                  :class="changeClass ? 'addReverse' : ''"
                >
                  <li class="border-bottom">
                    <a
                      class="text-color menu-dots-links"
                      @click.prevent="openEditPopup(root)"
                    >
                      <img
                        src="/static/images/icons/edit_icon.svg"
                        class="tracker-images dot-images img-20"
                      />
                      <span class="drpdwn-option-txt pl-5 font-16">Edit</span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="text-color-delete-red menu-dots-links"
                      @click.prevent="showcancelModal(root.id)"
                    >
                      <!-- <a class="text-color-delete-red menu-dots-links" @click.prevent="deleteInisght(root.id)"> -->
                      <img
                        src="/static/images/icons/delete_icon.svg"
                        class="tracker-images dot-images img-20"
                      />
                      <span class="drpdwn-option-txt pl-5 font-16">Delete</span>
                    </a>
                  </li>
                </ul>
              </div>
            </td>
            <!-- <td class="pl-15" style="width: 40px !important;">
                  <input
                    type="checkbox"
                    id="select_all"
                    class="form-control"
                  />
                </td> -->
            <td class="root-title" @click.stop="openInfoModal(root)">
              {{ root.rca_title }}
            </td>
            <td class="root-error">{{ root.sample_error }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper" v-if="rootCauseInfo.length > 0">
        <pagination
          :totalPages="totalPages"
          v-if="total"
          :maxVisibleButtons="maxVisiblePages"
          :total="total"
          :perPage="perPage"
          :currentPage="currentPage"
          @pagechanged="pagechanged"
        ></pagination>
      </div>
    </div>
    <div v-if="rootCauseInfo.length === 0" class="norecords_wrapper">
      <div class="no-records-found">No Root Cause Data Found</div>
    </div>
    <edit-rca-modal :editDetails="editDetails"></edit-rca-modal>
    <div class="modal fade" id="confirmRCADelete">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="card text-center">
              <div class="card-body">
                <div class="card-title">
                  <p class="first-card-title">Are you sure you would like</p>
                  <p class="secnd-card-title">
                    to Delete this Root Cause Title
                  </p>
                </div>
              </div>
              <div class="row card-footer">
                <div class="col-xs-6 pb_10">
                  <button
                    class="btn btn-danger btn-block"
                    @click="deleteRCA(RCAid)"
                  >
                    Delete
                  </button>
                </div>
                <div class="col-xs-6">
                  <button
                    class="btn btn-primary btn-block"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../../UIComponents/Loader.vue';
import EventBus from '../../../utils/event-bus';
import {
  getRootCauseData,
  DeleteRcaData,
  getRootCauseTitleData
} from '../../../apis/rcaAdmin';
import EditRCAModal from './EditRCAModal.vue';
import Pagination from '../Pagination.vue';

export default {
  components: {
    Loader,
    'edit-rca-modal': EditRCAModal,
    Pagination
  },
  props: [],
  data() {
    return {
      rootCauseInfo: {},
      changeClass: false,
      editDetails: null,
      loaderStatus: false,
      totalPages: 1,
      total: 0,
      perPage: 20,
      fromRecords: 1,
      currentPage: 1,
      maxVisiblePages: 4
    };
  },
  methods: {
    async pagechanged(currentPage) {
      if (currentPage) this.currentPage = currentPage;
      this.fromRecords = this.currentPage;
      await this.getRCAData();
    },
    async getRCAData() {
      const formData = {
        pagination: {
          current_page: this.fromRecords,
          result_per_page: this.perPage
        }
      };
      this.loaderStatus = true;
      const data = await getRootCauseTitleData(formData);
      this.rootCauseInfo = data.data.result_data.filter(
        (item) => item.active === true
      );
      if (data) {
        this.total = data.data.total_records_count;
        this.totalRecordsCount =
          this.total > this.totalRecordsCount
            ? this.total
            : this.totalRecordsCount;
        this.totalPages = Math.ceil(this.total / this.perPage);
      }
      this.loaderStatus = false;
    },
    showcancelModal(id) {
      this.RCAid = id;
      $('#confirmRCADelete').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async getRootCauseData() {
      this.loaderStatus = true;
      const data = await getRootCauseData();
      this.rootCauseInfo = data.filter((item) => item.active === true);
      this.loaderStatus = false;
    },
    async deleteRCA(id) {
      this.loaderStatus = true;
      const response = await DeleteRcaData(id);
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
      $('#confirmRCADelete').modal('hide');
      this.getRCAData();
      this.loaderStatus = false;
    },
    openEditPopup(details) {
      this.formDetails = {
        back_ground_info: details.back_ground_info,
        rca_commentary: details.rca_commentary,
        rca_title: details.rca_title,
        sample_error: details.sample_error,
        sample_product: details.sample_product,
        category_id: details.category_id,
        sub_category_list: details.sub_category_list,
        id: details.id
      };
      this.editDetails = this.formDetails;
      this.openAddNewContentPopup();
    },
    openAddNewContentPopup() {
      $('#edit-content-popup').modal({
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
    }
  },
  async created() {
    this.emitter.on('getRootCauseTitleData', () => {
      this.getRCAData();
    });
    this.getRCAData();
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
.center {
  text-align: center;
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
.addReverse {
  top: auto !important;
  bottom: 100%;
  margin-bottom: initial;
}
.addReverse:after {
  visibility: hidden !important;
  box-shadow: none;
  bottom: -163px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}
</style>
