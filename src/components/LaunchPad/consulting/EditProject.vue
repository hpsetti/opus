<template>
  <div class="">
    <div class="col-xs-12 mt-20 p-0">
      <div class="col-xs-12 search-header">
        <div
          class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 pl-20"
          @click="navigateToLaunchPad"
        >
          <img
            class="back-img cursor-pointer"
            src="/static/images/icons/back_arrow.svg"
            alt=""
          />
          <p class="text-subtitle-2 blue-1 pt-10" to="/launchpad">
            Consulting Hours
          </p>
        </div>
        <div class="col-xs-12">
          <form>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Project name</label
                ><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  @input="enableSubmitButton"
                  v-model="projectDetails.project_name"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Device type</label
                ><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  @input="enableSubmitButton"
                  v-model="projectDetails.device_type"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>User</label><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  disabled="true"
                  v-model="projectDetails.user_name"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Email</label><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  disabled="true"
                  v-model="projectDetails.email_address"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Company</label><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  disabled="true"
                  v-model="projectDetails.company_name"
                />
              </div>
            </div>
            <hr class="mt-20" />
            <div class="row pl-20">
              <div class="col-xs-10">
                <p class="text-h4">Project Info</p>
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Type</label><span class="required-asterisk">*</span>
                <!-- <multiselect :showLabels="false" :close-on-select="true" :allow-empty="false" class="multiselect-single-dropdown" :options="consultingTypes.map((list) => list.consulting_type)" :custom-label="(option) => consultingTypes.find((list) => list.consulting_type == option).consulting_type" v-model="projectDetails.consulting_type"> </multiselect> -->
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  disabled
                  v-model="projectDetails.consulting_type"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Service</label><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  disabled
                  v-model="projectDetails.consulting_name"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div class="col-md-8">
                <label>Requested date</label
                ><span class="required-asterisk">*</span>
                <input
                  class="form-control"
                  type="text"
                  maxLength="65"
                  disabled
                  v-model="endTime"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20 pb-40 mb-30">
              <div class="col-md-8 mb-30">
                <label>Other details:</label
                ><span class="required-asterisk">*</span>
                <br />
                <textarea
                  v-model="projectDetails.other_details"
                  @input="enableSubmitButton"
                  rows="5"
                  maxlength="1500"
                  class="textarea p-10 comments"
                  placeholder="Question"
                />
              </div>
            </div>
            <div class="row mb-25 mt-20">
              <div
                class="row p-20 d-flex col-gap-10 justify-content-end cart-footer"
              >
                <BaseButton variant="secondary" @click="navigateToLaunchPad"
                  >Cancel</BaseButton
                >
                <BaseButton @click="submitForm" :disabled="!enableButton"
                  >Save Changes</BaseButton
                >
              </div>
            </div>
          </form>
        </div>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>

<script>
// import Multiselect from 'vue-multiselect';
import dayjs from 'dayjs';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import {
  getprojectsById,
  updateProjectDetails,
  getConsultingTypes
} from '../../../apis/consultingAdmin';
import validateData from './validations';

export default {
  data() {
    return {
      loaderStatus: false,
      enableButton: false,
      endTime: '',
      UTCFormat: 'DD-MMM-YYYY',
      projectDetails: {
        project_name: '',
        device_type: '',
        other_details: ''
      },
      consultingTypes: null,
      formData: {
        project_name: '',
        device_type: '',
        other_details: ''
      }
    };
  },

  components: {
    Loader,
    BaseButton
    // Multiselect,
  },
  created() {
    this.projectId = +this.$route.params.id;
    this.getprojectsById();
    this.getConsultingTypes();
  },
  validations: { formData: validateData },
  methods: {
    enableSubmitButton() {
      if (!this.enableButton) this.enableButton = true;
    },
    navigateToLaunchPad() {
      this.$router.go(-1);
    },
    // async getProjectListByType() {
    //   const formData = {
    //     consulting_type: this.projectDetails.consulting_type,
    //     pagination: {
    //       current_page: this.fromRecords,
    //       result_per_page: this.perPage,
    //     },
    //     search: '',
    //   };
    //   const response = await projectsByConsultantType(formData);
    //   const projectList = response.result_data;
    //   this.activeProjectList = projectList.filter((item) => item.active === true);
    // },
    async getConsultingTypes() {
      this.consultingTypes = await getConsultingTypes();
    },
    async getprojectsById() {
      this.projectDetails = await getprojectsById(this.projectId);
      this.endTime = dayjs(this.projectDetails.modified_date).format(
        this.UTCFormat
      );
    },
    goToViewProject() {
      this.$router.go(-1);
    },
    async submitForm() {
      const payload = {
        company: this.projectDetails.company_name,
        consulting_id:
          this.projectDetails.consulting_basic_details_dto.consulting_id,
        consulting_type: this.projectDetails.consulting_type,
        device_type: this.projectDetails.device_type,
        other_details: this.projectDetails.other_details,
        project_name: this.projectDetails.project_name,
        user_name: this.projectDetails.user_name
      };
      this.loaderStatus = true;
      const response = await updateProjectDetails(this.projectId, payload);
      this.loaderStatus = false;
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Project updated successfully!'
        });
        this.goToViewProject();
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Please try again later!'
        });
      }
    }
  }
};
</script>

<style scoped>
.required-asterisk {
  padding-left: 5px;
  color: red;
}
.textarea {
  border: 1px solid lightgray;
  width: 100%;
  border-radius: 5px;
  resize: none;
}
.textarea:focus,
.device-type:focus {
  border: 1px solid rgb(64, 154, 255);
  outline: none;
}
.cart-footer {
  position: fixed;
  background: #ffffff;
  box-shadow: 4px 0px 10px rgb(0 0 0 / 25%);
  border-radius: 0px;
  bottom: 0;
  z-index: 2;
  width: calc(100% - 250px);
}
.comments {
  resize: none;
  height: 130px;
}

@media screen and (max-width: 1024px) {
  .cart-footer {
    width: 100%;
  }
}
</style>
