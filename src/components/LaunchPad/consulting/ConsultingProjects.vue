<template>
  <div class="pl-30 pt-20 pr-20">
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 search-header p-0">
        <div
          class="col-xs-12 mb-10 p-0 d-flex align-items-center col-gap-10 mb-20"
          @click="navigateToConsultingHours"
        >
          <img
            class="back-img cursor-pointer"
            src="/static/images/icons/back_arrow.svg"
            alt=""
          />
          <p class="tools-text font-18 mt-10 cursor-pointer" to="/launchpad">
            Consulting Hours
          </p>
        </div>
        <div
          class="col-xs-12 p-0 mb-10 d-flex align-items-center justify-content-between"
        >
          <p class="heading-text">{{ consultingProjectType }}</p>
        </div>
        <consulting-projects-table
          :projectTabs="projectTabs"
          :projectTabCount="projectTabCount"
          :projectCategories="projectCategories"
          :consultingProjectType="consultingProjectType"
        ></consulting-projects-table>
      </div>
    </div>
  </div>
</template>
<script>
import ConsultingProjectsTable from './ConsultingProjectsTable.vue';

export default {
  components: { ConsultingProjectsTable },
  data() {
    return {
      consultingProjectType: '',
      projects: [],
      // TABS
      projectTabs: {
        new: 'New requests',
        inprogress: 'In progress',
        complete: 'Complete'
      },
      projectTabCount: {
        all: 0,
        new: 0,
        inprogress: 0,
        complete: 0
      },
      projectCategories: {},
      loaderStatus: false
    };
  },
  created() {
    this.setupConsultingDetails();
  },
  methods: {
    async setupConsultingDetails() {
      this.consultingProjectType = this.$route.params.type;
      this.buildConsultingCategories();
    },
    buildConsultingCategories() {
      const projectCategories = {};
      Object.keys(this.projectTabs).forEach((key) => {
        projectCategories[key] = [];
      });
      this.projects.forEach((project) => {
        projectCategories[project.status].push(project);
      });
      Object.keys(projectCategories).forEach((categoryName) => {
        this.projectTabCount[categoryName] =
          projectCategories[categoryName].length;
      });
      projectCategories.all = this.projects;
      this.projectCategories = projectCategories;
      this.projectTabCount.all = this.projects.length;
    },
    navigateToConsultingHours() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.heading-text {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
  text-transform: capitalize;
}
.add-project {
  background: #4c9e45;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
  padding: 5px 15px 5px 20px;
}
.add-project img {
  width: 15px;
  height: 15px;
  margin-top: -3px;
}
.tools-text {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
</style>
