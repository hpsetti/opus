<template>
  <div class="col-xs-12 mt-20 p-0">
    <div class="col-xs-12 search-header">
      <div class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20">
        <img
          @click="navigateToLaunchPad"
          class="back-img cursor-pointer"
          src="/static/images/icons/back_arrow.svg"
          alt=""
        />
        <router-link class="tools-text font-18" to="/launchpad"
          >Launchpad</router-link
        >
      </div>
      <div class="col-xs-12 mb-10">
        <p class="heading-text">Consulting Hours</p>
      </div>
    </div>
    <div class="col-xs-12 p-0 p-20">
      <div class="recent col-xs-12 p-10">
        <div class="ml-20 recent-text">
          <p>Recently modified</p>
        </div>
        <div class="recent-list d-flex flex-wrap row-gap-10">
          <div
            v-for="(recentConsulting, index) in recentConsultings"
            :key="recentConsulting.project_name + index"
            class="col-xs-12 col-sm-6 col-md-4 p-0 pl-15"
          >
            <div
              class="card col-xs-12 p-10 cursor-pointer"
              @click="
                goToProject(
                  recentConsulting.consulting_user_info_id,
                  recentConsulting.consulting_type
                )
              "
            >
              <div class="card-section">
                <p class="black-text text-button-label">
                  {{ recentConsulting.user_name }}
                </p>
                <p class="gray-text font-14 mb-0 mt-0">
                  {{ recentConsulting.project_name }}
                </p>
                <p class="gray-text font-14 mb-0 mt-0">
                  {{ recentConsulting.email_address }}
                </p>
                <p class="gray-text font-14 mb-0 mt-0">
                  {{ recentConsulting.company_name }}
                </p>
              </div>
              <hr />
              <div
                class="col-xs-12 p-0 d-flex align-items-end"
                style="justify-content: space-between"
              >
                <p class="ellipsis-text p-0">
                  <span class="gray-text">Last modified : </span
                  ><span class="date ml-10">{{
                    recentConsulting.modified_date
                  }}</span>
                </p>
                <p class="status-btn ellipsis-text p-0">
                  {{ recentConsulting.consulting_status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 p-0 p-20">
      <p class="p-0 m-0 projects-title">Projects</p>
      <div class="col-xs-12 p-0 projects-wrapper">
        <div class="col-xs-12 p-0 sort-container mt-20 pl-20 pr-20">
          <div class="col-xs-7 p-0 sort-by-type sort-label ellipsis-text">
            Type
          </div>
          <div class="col-xs-2 p-0 sort-by-new sort-label ellipsis-text">
            Requested
          </div>
          <div class="col-xs-1 p-0 sort-by-projects sort-label ellipsis-text">
            Projects
          </div>
          <!-- <div class="col-xs-2 p-0 sort-by-sales sort-label ellipsis-text">Sales</div> -->
        </div>
        <div class="col-xs-12 p-0 mt-10 projects-container">
          <div
            v-for="project in projectList"
            :key="project.consulting_type"
            class="project-container col-xs-12 p-20 mt-10 cursor-pointer"
            @click="navigateToProject(project.consulting_type)"
          >
            <div class="col-xs-7 p-0 project-title ellipsis-text">
              {{ project.consulting_type }}
            </div>
            <div class="col-xs-2 p-0 new-requests ellipsis-text">
              {{ project.number_of_new_request }}
            </div>
            <div class="col-xs-2 p-0 projects-count ellipsis-text">
              {{ project.number_of_projects }}
              <!-- <img src="/static/images/sharedImages/left_arrow_icon.svg" style="" alt="" /> -->
            </div>
            <div
              class="col-xs-1 p-0 project-sales ellipsis-text align-items-end"
            >
              <!-- {{ project.sales }} -->
              <img
                src="/static/images/sharedImages/left_arrow_icon.svg"
                style=""
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import {
  getProjectTypes,
  getRecentProjects
} from '../../../apis/consultingAdmin';
import Loader from '../../UIComponents/Loader.vue';
// TODO: LKI :: API :: Enable this when endpoints are ready
// import { fetchConsultingProjects, fetchRecentConsultings } from '../../apis/consultings';

export default {
  data() {
    return {
      loaderStatus: false,
      recentConsultings: [],
      recentProjects: [],
      UTCFormat: 'DD-MMM-YYYY',
      projectList: {}
    };
  },

  components: {
    Loader
  },
  async created() {
    await this.getProjectList();
    await this.getRecentProjects();
  },
  methods: {
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    goToProject(projectId, consultingType) {
      this.$router.push({
        path: `/launchpad/consulting-hours/projects/${consultingType}/view/${projectId}`
      });
    },
    async getRecentProjects() {
      const response = await getRecentProjects();
      this.recentProjects = response.splice(0, 3);
      this.recentConsultings = this.recentProjects.map((item) => {
        const project = { ...item };
        project.requested_date = dayjs(
          this.recentProjects.requested_date
        ).format(this.UTCFormat);
        project.modified_date = dayjs(
          this.recentProjects.modified_date
        ).format(this.UTCFormat);
        return project;
      });
    },
    navigateToProject(projectType) {
      this.$router.push({
        name: 'Consulting Projects',
        params: {
          type: projectType
        }
      });
    },
    async getProjectList() {
      this.projectList = await getProjectTypes();
    }
  }
};
</script>

<style scoped>
.heading-text {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}
.card {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 200px;
}
.card-section {
  height: 115px;
  overflow: auto;
}
.recent {
  border: 1px solid #d3d6d9;
  border-radius: 3px;
}
.date {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}
.recent-text {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.status-btn {
  padding: 1px 8px;
  background: rgba(236, 141, 37, 0.3);
  border-radius: 2px;
  height: 26px;
  width: auto;
  font-size: 14px;
}
.projects-title {
  font-size: 24px;
  line-height: 33px;
  color: #333333;
}
.sort-container {
  border-bottom: 1px dashed rgba(11, 60, 97, 0.25);
}
.sort-label {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #0b3c61;
}
.project-container {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.project-title {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.project-container .new-requests,
.projects-count,
.project-sales {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}
.project-sales {
  justify-content: space-between;
}
.project-sales img {
  margin-top: -3px;
  transform: rotate(180deg);
}
.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
