<template>
  <div>
    <div class="col-xs-12 p-0 search-wrapper">
      <div class="form-group search-container pl-10 pr-10 cursor-pointer">
        <img src="/static/images/icons/search_icon.svg" alt="" />
        <input
          type="text"
          class="project-search p-10"
          placeholder="Search"
          v-model="projectSearchKeyword"
          @keydown.enter="getprojectSearchKeyword"
        />
      </div>
    </div>
    <div
      class="col-xs-12 p-0 pl-10 mt-10 d-flex align-items-center justify-content-between flex-wrap"
    >
      <p class="items-count">{{ total }} Items</p>
      <div class="d-flex">
        <p
          class="item-action deselect cursor-pointer"
          :class="selectedProjects.length ? '' : 'disabled'"
          @click="deSelectAll"
        >
          Deselect All
        </p>
        <p
          class="item-action delete ml-10 cursor-pointer"
          :class="selectedProjects.length ? '' : 'disabled'"
          @click="deletepopup(true)"
        >
          <img
            class="back-img gap-nve-5"
            src="/static/images/consulting/delete.svg"
            alt=""
          />
          <span>Delete</span>
        </p>
      </div>
    </div>
    <div class="col-xs-12 p-0">
      <tabs
        :tabs="projectTabCount"
        :tabCount="projectTabCount"
        :showTabCount="false"
        v-model="activeTabName"
        class="mt-30"
      />
    </div>
    <div class="col-xs-12 p-0 pl-10 pr-10">
      <table class="projects-table" v-if="!!Object.keys(groupByStatus).length">
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
            <th @click="setSortBy('project_name')">
              Project Name
              <span class="sort-key" :class="getSortKey('project_name')"></span>
            </th>
            <th @click="setSortBy('email_address')">
              Email
              <span
                class="sort-key"
                :class="getSortKey('email_address')"
              ></span>
            </th>
            <th @click="setSortBy('consulting_name')">
              Service
              <span
                class="sort-key"
                :class="getSortKey('consulting_name')"
              ></span>
            </th>
            <th @click="setSortBy('requested_date')">
              Requested Date
              <span
                class="sort-key"
                :class="getSortKey('requested_date')"
              ></span>
            </th>
            <th @click="setSortBy('modified_date')">
              Last modified
              <span
                class="sort-key"
                :class="getSortKey('modified_date')"
              ></span>
            </th>
            <th @click="setSortBy('consulting_status')">
              Status
              <span
                class="sort-key"
                :class="getSortKey('consulting_status')"
              ></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in groupByStatus[activeTabName]"
            :key="project.consulting_name + '_' + index"
          >
            <td class="pl-5 pr-10 select-checkbox">
              <div class="select-box">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="selectedProjects"
                      :value="project.consulting_user_info_id"
                      @change="onSelectAll()"
                    />
                    <span class="cr">
                      <i class="cr-icon glyphicon glyphicon-ok"></i>
                    </span>
                  </label>
                </div>
              </div>
            </td>
            <td class="table-data-fixed-width">
              <div>{{ project.project_name }}</div>
              <div class="sub-text">{{ project.device_type }}</div>
            </td>
            <td class="table-data-fixed-width">
              <div>{{ project.email_address }}</div>
              <div class="sub-text">{{ project.company_name }}</div>
            </td>
            <td class="table-data-fixed-width">
              {{ project.consulting_name }}
            </td>
            <td class="table-data-fixed-width">{{ project.requested_date }}</td>
            <td class="table-data-fixed-width">{{ project.modified_date }}</td>
            <td class="table-data-fixed-width">
              <div class="d-flex align-items-center justify-content-between">
                <span
                  class="project-status"
                  :class="[project.consulting_status]"
                >
                  {{ project.consulting_status }}
                </span>
                <div class="dropdown">
                  <img
                    src="/static/images/icons/menu_dots.svg"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />
                  <div class="dropdown-menu dropdown-menu-right pb-10 pt-10">
                    <div
                      class="project-menu-action-container p-10"
                      @click="viewProject(project.consulting_user_info_id)"
                    >
                      <img
                        src="/static/images/icons/document_black.svg"
                        class="icon"
                      />
                      <span class="ml-20 project-menu-action"
                        >View project</span
                      >
                    </div>
                    <div
                      class="project-menu-action-container p-10"
                      @click="editProject(project.consulting_user_info_id)"
                    >
                      <img src="/static/images/icons/edit_icon_new.svg" />
                      <span class="ml-20 project-menu-action">Edit</span>
                    </div>
                    <div
                      class="project-menu-action-container p-10"
                      @click="
                        deletepopup(false, project.consulting_user_info_id)
                      "
                    >
                      <img src="/static/images/icons/delete_icon.svg" />
                      <span class="ml-20 project-menu-action delete"
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
        v-if="totalPages > 1 && activeTabName === 'all'"
        :total="total"
        :perPage="perPage"
        :currentPage="currentPage"
        @pagechanged="pagechanged"
      ></Pagination>
    </div>
    <!-- <view-project :projectId ="projectId"></view-project> -->
    <delete-project @deleteConsultantProject="deleteProject"></delete-project>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import Tabs from '../../NewDocuments/Tabs.vue';
import {
  projectsByConsultantType,
  deleteProjectById
} from '../../../apis/consultingAdmin';
import deleteProject from './deleteProjectPopup.vue';
import Loader from '../../UIComponents/Loader.vue';
import Pagination from '../Pagination.vue';
// import ViewProject from './ViewProject.vue';

export default {
  name: 'ConsultingProjectsTable',
  components: {
    Tabs,
    deleteProject,
    Loader,
    Pagination
  },
  props: {
    projectTabs: { type: Object, default: () => {} },
    projectCategories: { type: Object, default: () => {} },
    consultingProjectType: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loaderStatus: false,
      groupByStatus: {},
      selectedProjects: [],
      selectedProject: [],
      startTime: '',
      endTime: '',
      UTCFormat: 'DD-MMM-YYYY',
      isSelectAll: false,
      activeTabName: 'all',
      projectId: null,
      activeProjectList: [],
      projectSearchKeyword: '',
      filteredProjects: {},
      projectTabCount: {
        Requested: 'Requested',
        Inprogress: 'Inprogress',
        Completed: 'Completed'
      },
      orderBy: { name: 'asc', type: 'asc' },
      sortBy: 'title',
      sortOrder: 'asc',
      sortingType: 'name',
      sortingOrder: 'asc',
      sortIcon: 'asc',
      selectedSortColumn: 'title',
      totalPages: 0,
      currentPage: 1,
      perPage: 20,
      total: 0,
      searchView: false,
      sortOptions: {
        project_name: 1,
        consulting_name: -1,
        email_address: -1,
        modified_date: -1,
        requested_date: -1,
        consulting_status: -1
      }
    };
  },
  async created() {
    await this.getProjectListByType();
    this.setSortBy('project_name');
  },
  methods: {
    onSelectAll() {
      this.isSelectAll =
        this.selectedProjects.length ===
        this.groupByStatus[this.activeTabName].length;
    },
    deSelectAll() {
      this.selectedProjects = [];
      this.isSelectAll = false;
    },
    setAllSelected() {
      if (this.isSelectAll) {
        this.selectedProjects = this.groupByStatus[this.activeTabName].map(
          (project) => project.consulting_user_info_id
        );
      } else {
        this.selectedProjects = [];
      }
    },
    async getProjectListByType() {
      const formData = {
        consulting_type: this.consultingProjectType,
        pagination: {
          current_page: this.currentPage,
          result_per_page: this.perPage
        },
        search: ''
      };
      const response = await projectsByConsultantType(formData);
      const projectList = response.result_data;
      this.totalPages = response.total_pages;
      this.total = response.total_records_count;
      const updateDateFormat = projectList.filter(
        (item) => item.active === true
      );
      this.activeProjectList = updateDateFormat.map((item) => {
        const project = { ...item };
        project.requested_date = dayjs(
          this.groupByStatus.requested_date
        ).format(this.UTCFormat);
        project.modified_date = dayjs(this.groupByStatus.modified_date).format(
          this.UTCFormat
        );
        return project;
      });
      this.groupByStatus = groupBy(
        this.activeProjectList,
        (project) => project.consulting_status
      );
      this.groupByStatus.all = this.activeProjectList;
    },
    async getprojectSearchKeyword() {
      if (!this.searchView) {
        this.currentPage = 1;
      }
      const formData = {
        consulting_type: this.consultingProjectType,
        pagination: {
          current_page: this.currentPage,
          result_per_page: this.perPage
        },
        search: this.projectSearchKeyword
      };
      const response = await projectsByConsultantType(formData);
      this.totalPages = response.total_pages;
      this.total = response.total_records_count;
      this.searchView = Boolean(this.projectSearchKeyword);
      this.activeProjectList = response.result_data;
      this.groupByStatus = groupBy(
        this.activeProjectList,
        (project) => project.consulting_status
      );
      this.groupByStatus.all = this.activeProjectList;
    },
    async pagechanged(page) {
      this.loaderStatus = true;
      this.currentPage = page;
      if (this.projectSearchKeyword) {
        await this.getprojectSearchKeyword();
      } else {
        await this.getProjectListByType();
      }
      this.loaderStatus = false;
    },
    viewProject(projectId) {
      this.$router.push({
        path: `${this.$route.path}view/${projectId}`
      });
    },
    editProject(projectId) {
      const { type } = this.$route.params;
      this.$router.push({
        path: `/launchpad/consulting-hours/projects/${type}/edit/${projectId}`
      });
    },
    deletepopup(isMultiSelect = false, id) {
      if (!isMultiSelect) this.selectedProject = [id];
      else this.selectedProject = [];
      $('#modal_project_delete').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async deleteProject() {
      $('#modal_project_delete').modal('hide');
      const idList = this.selectedProject.length
        ? this.selectedProject
        : this.selectedProjects;
      this.loaderStatus = true;
      const payload = {
        ids: idList
      };
      const response = await deleteProjectById(payload);
      this.loaderStatus = false;
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Project deleted successfully!'
        });
        // this.updateProfileInmemory();
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Please try again later!'
        });
      }
      this.isSelectAll = false;
      this.getProjectListByType();
    },
    getSortKey(key) {
      let classes = '';
      classes += this.sortOptions[key] > 0 ? 'asc' : 'desc';
      classes += this.sortingType === key ? ' active' : ' ';
      return classes;
    },
    setSortBy(type) {
      const currentList = this.groupByStatus[this.activeTabName];
      this.sortingType = type;
      this.sortOptions[type] *= -1;
      const sortOrder = this.sortOptions[type] > 0 ? 'desc' : 'asc';
      this.sortIcon = sortOrder;
      const sortedList = orderBy(currentList, type, sortOrder);
      this.groupByStatus = {
        ...this.groupByStatus,
        [this.activeTabName]: sortedList
      };
    }
  }
};
</script>
<style scoped>
.search-container {
  border: 1px solid rgba(0, 0, 0);
  border-radius: 22px;
  display: flex;
}
.project-search {
  flex: 1;
}
.gap-nve-5 {
  margin-top: -5px;
}
.project-search,
.project-search:focus {
  border: none;
  width: auto;
  outline: none;
}
.items-count {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}
.item-action {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #00518a;
}
.item-action.delete {
  color: #b00505;
}
.item-action.disabled {
  pointer-events: none;
  opacity: 40%;
}
.project-select-check-box {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid #0b3c61;
}
.project-select-check-box.filled {
  background: #0b3c61;
}
.project-select-check-box.filled img {
  height: 8px;
  width: 10px;
  margin-top: -8px;
  margin-left: 1px;
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
.sort-icon {
  margin-top: -6px;
}
.sort-icon.desc {
  transform: rotate(180deg);
  margin-top: 6px;
}
.project-status {
  padding: 1px 8px;
  font-size: 12px;
}
.project-status.new {
  background: rgba(255, 211, 98, 0.3);
}
.project-status.inprogress {
  background: rgba(236, 141, 37, 0.3);
}
.project-status.complete {
  background: rgba(76, 158, 69, 0.3);
}
.dropdown-menu {
  width: max-content;
  margin-top: 10px;
  margin-right: -10px;
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
</style>
