<template>
  <div>
    <div class="col-sm-12 col-xs-12 col-md-12">
      <hr />
    </div>
    <div class="col-sm-12 col-xs-12 team-wrapper">
      <div id="team-icon" class="col-sm-4">
        <div class="col-sm-10" style="padding-top: 10px; text-align: center">
          <img
            class="new_member_img"
            src="/static/images/icons/blank_image.svg"
          />
        </div>
      </div>
      <div id="team-details" class="col-sm-8 col-md-8 col-xs-12">
        <div class="row">
          <div
            class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 p-0"
            @click="cancelAddTeam"
          >
            <img
              class="back-img cursor-pointer"
              src="/static/images/icons/back_arrow.svg"
              alt=""
            />
            <div class="text-subtitle-2 blue-1 cursor-pointer">Back</div>
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-xs-12 text-body-light">
            Add your recipients’ name and email below
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">First Name</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <input
              type="text"
              placeholder="First Name"
              class="form-control"
              v-model="team.first_name"
              maxlength="65"
            />
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Last Name</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <input
              type="text"
              placeholder="Last Name"
              class="form-control"
              v-model="team.last_name"
              maxlength="50"
            />
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Email</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <input
              type="text"
              placeholder="Email"
              class="form-control"
              v-model="team.email"
              maxlength="65"
              @input="emailVal"
            />
            <div
              v-if="this.addMemberError.length"
              class="validation-message"
              style="padding-left: 2px; font-size: 14px; float: left"
            >
              {{ this.addMemberError }}
            </div>
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Country</div>
          <div class="col-sm-12 col-xs-12 col-md-10 custom-dropdown">
            <OpusSelect
              id="teamListSelect"
              :options="countriesList.map((type) => type.alpha_three_code)"
              :custom-label="
                (opt) =>
                  countriesList.find((x) => x.alpha_three_code === opt)
                    .country_name
              "
              label="name"
              v-model="team.alpha_three_code"
              :searchable="true"
              placeholder="Select a country"
            ></OpusSelect>
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Role</div>
          <div class="col-sm-12 col-xs-12 col-md-10 custom-dropdown">
            <OpusSelect
              id="teamListSelect"
              v-if="roles"
              :disabled="!isAccountAdmin"
              :options="roles"
              label="name"
              track-by="id"
              v-model="team.role"
              placeholder="Select Role"
            ></OpusSelect>
          </div>
        </div>
        <div v-if="displayErrormsg" class="error-msg-holder custom-error">
          <span class="error-message-response">{{ displayErrorText }}</span>
          <br />
        </div>
      </div>
    </div>
    <div
      class="col-sm-12 col-xs-12 col-md-12 footer mb-30 pr-30 remove_button_padding"
    >
      <div class="d-flex col-gap-15 justify-content-end flex-wrap">
        <BaseButton variant="secondary" size="lg" @click="cancelAddTeam"
          >Cancel</BaseButton
        >
        <BaseButton
          variant="primary"
          size="lg"
          @click="addTeamMember"
          :disabled="!canSave"
          >Send Invite</BaseButton
        >
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cloneDeep from 'lodash/cloneDeep';
import * as freeDomainNames from 'free-email-domains';
import OpusSelect from '../../UIComponents/OpusSelect.vue';
import Loader from '../../UIComponents/Loader.vue';
import EventBus from '../../../utils/event-bus';
import { addTeamMember } from '../../../apis/team';
import { getCountries, getEmailBlockStatus, getBlockedEmails } from '../../../apis/register';
import { getRoleBasedPermissions } from '../../../apis/rbac';
import { getAddonDetails } from '../../../apis/psm';
import { getSubscribedPlans, getMapping } from '../../../apis/plans';
// import CompetitorEmails from '../../../apis/CompetitorEmails';
import BaseButton from '../../UIComponents/BaseButton.vue';
dayjs.extend(utc);

export default {
  props: ['roles', 'roleId'],
  data() {
    return {
      displayErrormsg: false,
      displayErrorText: '',
      team: {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        alpha_three_code: '',
        assigned_distributor_id: null
      },
      addMemberError: '',
      isFreeDomain: false,
      loaderStatus: false,
      servicesList: [],
      serviceId: null,
      memberName: '',
      userServiceList: [],
      addedServiceIds: [],
      blockedEmailDomains: [],
      countriesList: [],
      isEmailBlocked: false,
    };
  },
  components: {
    OpusSelect,
    BaseButton,
    Loader
  },
  async created() {
    this.loaderStatus = true;
    // this.fetchBlockedEmailDomains();
    // if (import.meta.env.VITE_NODE_ENV !== 'production') {
    await this.loadCountries();
    await this.getEmailStatus();
    if (this.isEmailBlocked) {
      await this.fetchBlockedEmailDomains();
    }
    this.emitter.on('resetTeams', () => {
      this.cancelAddTeam();
    });
    if (!this.isAccountAdmin) {
      this.team.role = this.roles.find((role) => role.id === 12);
    }
    this.loaderStatus = false;
  },
  methods: {
    async loadCountries() {
      this.countriesList = await getCountries();
    },
    async getEmailStatus() {
      const data = await getEmailBlockStatus();
      this.isEmailBlocked = data.block_email;
    },
    disablePermissionCheck(serviceid) {
      return this.servicesList.find((service) => service.id === serviceid)
        .access;
    },
    updateUserPermission(permissions, serviceId) {
      this.userServiceList.forEach((service, index) => {
        if (service.id === serviceId) {
          this.userServiceList[index] = permissions;
        }
      });
    },
    revertOldPermissions(id, access) {
      if (!access) {
        const oldService = this.servicesList.find(
          (service) => service.id === id
        );
        this.userServiceList.forEach((service, index) => {
          if (service.id === id) {
            this.userServiceList[index].access = access;
            this.userServiceList[index].modules = oldService.modules;
          }
        });
      }
    },
    emailVal() {
      const mailformat =
        /^([a-zA-Z0-9_\-\+\.]+)@([a-zA-Z-0-9-]+)((\.([a-zA-Z0-9-]){2,63}){1,3})$/; //eslint-disable-line
      this.displayErrormsg = false;
      if (this.team.email && !this.team.email.match(mailformat)) {
        this.displayErrormsg = true;
        this.displayErrorText = 'Invalid email.';
      }
      this.checkEmailIsValid();
    },
    // to restrict public emails
    checkEmailIsValid() {
      if (
        this.team.email.includes('@') &&
        // (import.meta.env.VITE_NODE_ENV !== 'production')
        (this.isEmailBlocked)
      ) {
        const emailToSpit = this.team.email.split('@');
        const domainName = emailToSpit[emailToSpit.length - 1].toLowerCase();
        const filteredBlockList = this.blockedEmailDomains.map(element => {
          return element.toLowerCase();
        });
        this.isFreeDomain =
          freeDomainNames.default.includes(domainName) ||
          filteredBlockList.includes(domainName);
        if (this.isFreeDomain) {
          this.displayErrormsg = true;
          this.displayErrorText =
            'To combat fraudulent account creation, we have restricted certain domain email addresses from creating new accounts.';
        }
      }
    },
    // async fetchBlockedEmailDomains() {
    //   this.blockedEmailDomains = await CompetitorEmails();
    // },
    async fetchBlockedEmailDomains() {
      const blockedEmailArray = await getBlockedEmails();
      this.blockedEmailDomains = blockedEmailArray.map((item) => item.email);
    },
    async validateTeamUpgrade() {
      this.loaderStatus = true;
      const addonAccountDetails = await getAddonDetails(
        JSON.parse(localStorage.getItem('userData')).account_id
      );
      this.recordAddonService = addonAccountDetails.find(
        (each) => each.units === 'RECORDS'
      );
      this.teamAddonService = addonAccountDetails.find(
        (each) => each.units === 'USERS'
      );
      this.loaderStatus = false;
      if (this.teamAddonService) {
        if (
          this.teamAddonService.total_limit >=
            this.teamAddonService.default_limit &&
          this.teamAddonService.is_active &&
          dayjs().utc().format('YYYY-MM-DD HH:mm:ss') <
            this.teamAddonService.valid_until &&
          dayjs().utc().format('YYYY-MM-DD HH:mm:ss') >=
            this.teamAddonService.valid_from
        ) {
          this.max_team_members = this.teamAddonService.total_limit;
        } else if (
          this.teamAddonService.total_limit >=
            this.teamAddonService.default_limit &&
          this.teamAddonService.is_active &&
          dayjs().utc().format('YYYY-MM-DD HH:mm:ss') >
            this.teamAddonService.valid_until &&
          dayjs().utc().format('YYYY-MM-DD HH:mm:ss') >=
            this.teamAddonService.valid_from
        ) {
          this.max_team_members = this.teamAddonService.default_limit;
        }
        this.current_members = this.teamAddonService.current_utilization;
      }
    },
    async addTeamMember() {
      // await this.validateTeamUpgrade();
      this.loaderStatus = true;
      this.addMemberError = '';
      const data = {
        first_name: this.team.first_name,
        last_name: this.team.last_name,
        memberEmailId: this.team.email,
        roleAssigned: this.team.role.id,
        alpha_three_code: this.team.alpha_three_code,
        rbac_permission_inst: this.userServiceList
      };
      if (this.team.assigned_distributor_id)
        data.assigned_distributor_id = this.team.assigned_distributor_id;
      const response = await addTeamMember(data);
      this.loaderStatus = false;
      if (response) {
        if (response.error) {
          this.addMemberError = response.error;
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Adding Member Failed!'
          });
        } else if (response.status === 'Failure') {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
          });
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Member added successfully!'
          });
          this.clearAddTeam();
          this.$emit('inviteSent');
        }
        // this.$emit('getTeamMembers');
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Adding Member Failed!'
        });
      }
      return null;
    },
    clearAddTeam() {
      this.displayErrormsg = false;
      this.team = {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        assigned_distributor_id: null
      };
      this.addTeamFlag = false;
      this.teamPermissionsFlag = false;
      this.memberName = '';
      this.serviceId = null;
      this.userServiceList = [];
    },
    cancelAddTeam() {
      this.clearAddTeam();
      this.$emit('cancelAddTeam');
    },
    async getRoleBasedTemplate(roleId) {
      await this.getSubscribedPlans();
      this.loaderStatus = true;
      const response = await getRoleBasedPermissions(roleId);
      this.loaderStatus = false;
      if (response) {
        response.services.forEach((service, index) => {
          if (
            service.serviceId &&
            !this.addedServiceIds.includes(service.serviceId)
          ) {
            response.services[index].access = false;
          }
        });
        this.servicesList = cloneDeep(response.services);
        this.userServiceList = cloneDeep(this.servicesList);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Unable to get default permissions for the role!'
        });
      }
    },
    removeAssignedDistributorId() {
      this.team.assigned_distributor_id = null;
    },
    async getSubscribedPlans() {
      this.loaderStatus = true;
      this.addedServiceIds = [];
      const addedServices = await getSubscribedPlans(
        localStorage.getItem('accountId')
      );
      const mappingPlansIds = JSON.parse(
        localStorage.getItem('mappingServices')
      )
        ? JSON.parse(localStorage.getItem('mappingServices'))
        : await getMapping();
      this.loaderStatus = false;
      addedServices.forEach((plan) => {
        const planService = mappingPlansIds.find(
          (each) => each.plan_id === plan.id
        );
        if (planService) {
          this.addedServiceIds = [
            ...new Set(this.addedServiceIds.concat(planService.service_id))
          ];
        }
      });
    }
  },
  beforeUnmount() {
    this.emitter.off('resetTeams');
  },
  computed: {
    isAccountAdmin() {
      return this.roleId === 1 || this.roleId === 5;
    },
    canSave() {
      return (
        this.team.first_name &&
        this.team.last_name &&
        this.team.email &&
        !this.displayErrormsg &&
        this.team.role &&
        this.team.alpha_three_code
      );
    },
    disableButtonForAddTeam() {
      if (
        this.team.last_name &&
        this.team.first_name &&
        this.team.email &&
        this.displayErrormsg !== true &&
        this.team.role &&
        this.team.role.id === 6
      ) {
        return false;
      }
      if (
        this.team.last_name &&
        this.team.first_name &&
        this.team.email &&
        this.displayErrormsg !== true &&
        this.team.role &&
        this.team.role.id !== 6
      ) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
.pb-20 {
  padding-bottom: 20px;
}
.team-wrapper {
  height: calc(65vh - 45px);
  overflow: auto;
}
.mr-bt-5p {
  margin-bottom: 5%;
}

.custom-dropdown {
  margin-bottom: 5px;
}
.custom-dropdown >>> .el-input__inner {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61 !important;
  border: 0.5px solid #828282 !important;
  border-radius: 20px;
}
.custom-dropdown >>> .el-select {
  width: 100%;
}

.custom-dropdown >>> .opus-multiselect.sm .multiselect__tags {
  height: fit-content;
  min-height: 36px;
}
.bt-border {
  border-bottom: 1px solid #bdbdbd;
}
.txt-alg-rt {
  text-align: right;
}
#team-details {
  padding-left: 20px;
}
.checkbox.cust_checkbox_rbac {
  display: inline-block;
  cursor: pointer;
}
.checkbox {
  position: relative;
  margin-top: 10px;
  margin-bottom: 5px;
}
input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  z-index: 1;
  width: 18px !important;
  height: 18px !important;
  left: 0;
  top: 0;
  margin: 0 !important;
}
.checkbox label:before {
  content: '';
  width: 18px !important;
  height: 18px !important;
  border: 1px solid #0b3c61;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}
.checkbox input[type='checkbox']:checked + label:before {
  background-color: #0b3c61;
  background-image: url(/static/images/icons/checkbox.svg);
  background-size: 12px 16px;
  background-repeat: no-repeat;
  background-position-x: center;
}
.bt-border {
  border-bottom: 1px solid #bdbdbd;
}
.edit-lnk {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 37px;
  text-align: right;
  padding-right: 15%;
  color: #2f80ed;
  cursor: pointer;
}
.mt-4 {
  margin-top: 4px;
}
.cust_label {
  display: inline-block;
  margin-left: 15px;
  vertical-align: super;
  font-size: 14px;
  font-weight: 300;
}
.label-selected {
  color: #0b3c61;
  font-weight: 500;
}
.link-disabled {
  opacity: 0.4;
}
.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
.team-pagination {
  width: calc(100% - 230px);
  border-top: 0.5px solid #bdbdbd;
  position: absolute;
  bottom: 0;
  left: calc(50% + 115px);
  transform: translateX(-50%);
  background: white;
}
.multiselect-single-dropdown >>> .multiselect__tags {
  height: auto !important;
  padding: 10px 40px 10px 14px;
  display: block;
}
.multiselect-single-dropdown.no-values >>> .multiselect__tags {
  height: 40px !important;
}
.multiselect-single-dropdown >>> .multiselect__select {
  top: 5px;
}
.multiselect-single-dropdown >>> .multiselect__placeholder {
  padding: 0px 0px 0px 5px !important;
}
@media screen and (max-width: 767px) {
  .bt-border {
    padding-bottom: 10px;
  }
  .cust_checkbox_rbac {
    margin-left: 5px !important;
  }
}
@media screen and (min-width: 768px) {
  #team-icon {
    float: right;
  }
  .hide-sm {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .team-wrapper {
    height: 35vh;
  }
}
</style>
