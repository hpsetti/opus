<template>
  <div>
    <div class="col-sm-12 col-xs-12 col-md-12">
      <hr />
    </div>
    <div class="col-sm-12 col-xs-12 box-wrapper">
      <div id="team-icon" class="col-sm-6">
        <div class="col-sm-10 img-blk">
          <div
            class="profile-pic-edit profile-pic-title-edit"
            v-if="!member.profile_pic"
          >
            {{ getInitials(member.first_name, member.last_name) }}
          </div>
          <img
            class="profile-pic-edit"
            v-if="member.profile_pic"
            :src="member.profile_pic"
          />
        </div>
      </div>
      <div id="team-details" class="col-sm-6 col-md-6 col-xs-12">
        <div class="row">
          <div
            class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 p-0"
            @click="cancelEditTeam"
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
          <div class="col-xs-12 text-body-light">Edit role of the member</div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">First Name</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <input
              type="text"
              placeholder="Name"
              :value="member.first_name"
              class="form-control"
              disabled
            />
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Last Name</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <input
              type="text"
              placeholder="Name"
              :value="member.last_name"
              class="form-control"
              disabled
            />
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Email</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <input
              type="text"
              placeholder="Email"
              :value="member.email"
              class="form-control"
              disabled
            />
          </div>
        </div>
        <div class="row mr-bt-5p">
          <div class="col-sm-12 col-xs-12 col-md-12">Role</div>
          <div class="col-sm-12 col-xs-12 col-md-10">
            <div class="custom-dropdown mt-4">
              <OpusSelect
                id="teamListSelect"
                :options="roles"
                v-model="roleId"
                label="name"
                track-by="id"
                @change="getRoleBasedTemplate(roleId.id)"
                placeholder="Select Role"
              >
              </OpusSelect>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-12 col-sm-12 col-xs-12 pb-20" v-if="userServiceList && userServiceList.length">
        <div class="col-md-12 col-sm-12 col-xs-12 pl-0 pr-0 bt-border">
          <div class="row pb-4">
            <div class="col-sm-7 col-xs-8">Services access</div>
            <div class="col-sm-3 col-xs-4 txt-alg-rt">Permissions</div>
          </div>
        </div>
        <div
          v-for="(service, index) in userServiceList"
          :key="index"
          class="col-md-12 col-sm-12 col-xs-12 bt-border"
        >
          <div class="row" >
            <div class="col-sm-7 col-xs-8">
              <div class="checkbox cust_checkbox" :class="{'link-disabled': (!disablePermissionCheck(service.id))}" >
                <input type="checkbox" class="form-control" v-model="service.access" :disabled="!disablePermissionCheck(service.id)" @change="revertOldPermissions(service.id,service.access)"/>
                <label class="cust_label_rbac"></label>
              </div>
              <div class="cust_label label-selected" :class="{'link-disabled': !(disablePermissionCheck(service.id))}">{{ service.name }}</div>
            </div>
            <div class="col-sm-3 col-xs-4">
              <div class="edit-lnk" @click="(disablePermissionCheck(service.id) && service.access) ? openPermissionsPopup(service) : null" :class="{'link-disabled': !disablePermissionCheck(service.id)|| !service.access}"> edit</div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding">
      <div class="d-flex col-gap-15 justify-content-end flex-wrap">
        <BaseButton variant="secondary" @click="cancelEditTeam"
          >Cancel</BaseButton
        >
        <BaseButton
          variant="primary"
          @click="updateTeamMember()"
          :disabled="disableButtonForAddTeam || loaderStatus"
          >Save Changes</BaseButton
        >
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import OpusSelect from '../../UIComponents/OpusSelect.vue';
import Loader from '../../UIComponents/Loader.vue';
import EventBus from '../../../utils/event-bus';
import {
  getRoleBasedPermissions,
  getUserPermissions
} from '../../../apis/rbac';
import { getSubscribedPlans, getMapping } from '../../../apis/plans';
import { updateTeamMember } from '../../../apis/team';
import {
  isDefaultDashboard,
  setDefaultPreference
} from '../../../apis/dashboardCustomization';
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  props: ['member', 'roles', 'distributors', 'getTeamMembers', 'cancelAddTeam'],
  components: {
    Loader,
    BaseButton,
    OpusSelect
  },
  data() {
    return {
      loaderStatus: false,
      Permissions: '',
      servicesList: [],
      serviceId: '',
      userServiceList: [],
      usersPermission: {},
      roleId: null,
      distributorId: null
    };
  },
  async created() {
    await this.getPermissionsList();
    this.roleId = this.roles.find((role) => role.id === this.member.role_id);
    this.distributorId = this.member.assigned_distributor_id;
    this.emitter.on('resetTeams', () => {
      this.cancelEditTeam();
    });
  },
  computed: {
    disableButtonForAddTeam() {
      if (this.roleId === 6 && !this.distributorId) return true;
      if (this.member.role_id !== this.roleId) return false;
      if (this.member.role_id === this.roleId) {
        if (this.distributorId !== this.member.assigned_distributor_id)
          return false;
        let diff = true;
        for (let i = 0; i < this.userServiceList.length; i += 1) {
          const obj2 = this.usersPermission.services.find(
            (service) => service.id === this.userServiceList[i].id
          );
          if (!isEqual(this.userServiceList[i], obj2)) {
            diff = false;
            break;
          }
        }
        return diff;
      }
      return true;
    }
  },
  watch: {
    roleId() {
      if (this.roleId === 6 && this.roleId === this.member.role_id)
        this.distributorId = this.member.assigned_distributor_id;
      else this.distributorId = null;
    }
  },
  beforeUnmount() {
    this.emitter.off('resetTeams');
  },
  methods: {
    revertOldPermissions(id, access) {
      if (!access) {
        let service;
        if (this.roleId === this.member.role_id) {
          service = this.usersPermission.services.find((s) => s.id === id);
        } else {
          service = this.servicesList.find((s) => s.id === id);
        }
        this.userServiceList.forEach((s, index) => {
          if (s.id === id) {
            this.userServiceList[index].modules = service.modules;
          }
        });
      }
    },
    disablePermissionCheck(serviceid) {
      return this.servicesList.find((service) => service.id === serviceid)
        .access;
    },
    async updateTeamMember() {
      if (!this.disableButtonForAddTeam) {
        this.loaderStatus = true;
        const data = {
          assigned_role_id: this.roleId.id,
          user_role_id: this.member.id,
          rbac_permission_inst: this.userServiceList
        };
        if (this.roleId === 6)
          data.assigned_distributor_id = this.distributorId;
        const response = await updateTeamMember(data);
        this.loaderStatus = false;
        if (response && response.status) {
          // reset upser preferences to default
          this.loaderStatus = true;
          const isDefault = await isDefaultDashboard(
            this.member.account_id,
            this.member.user_id
          );
          const dashboardData = {
            account_id: this.member.account_id,
            dashboard_notification_type_id: 1,
            user_id: this.member.user_id
          };
          if (!isDefault) {
            await setDefaultPreference(dashboardData);
          }
          this.loaderStatus = false;
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Team member updated successfully!'
          });
          this.$emit('getTeamMembers');
          this.cancelEditTeam();
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
              ? response.message
              : 'Unable to update Team member!'
          });
        }
      }
    },
    updateUserPermission(permissions, serviceId) {
      this.userServiceList.forEach((service, index) => {
        if (service.id === serviceId) {
          this.$set(this.userServiceList, index, permissions);
        }
      });
    },
    cancelEditTeam() {
      this.$emit('cancelAddTeam');
    },
    async getPermissionsList() {
      await this.getRoleBasedTemplate(this.member.role_id);
      this.loaderStatus = true;
      const response = await getUserPermissions(
        this.member.user_id,
        this.member.account_id,
        this.member.role_id
      );
      this.loaderStatus = false;
      if (response && response.services) {
        this.usersPermission = response;
        this.userServiceList = cloneDeep(this.usersPermission.services);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Unable to get user permissions!'
        });
      }
    },
    getInitials(firstname, lastname) {
      return `${firstname ? firstname.charAt(0).toUpperCase() : ''}${
        lastname ? lastname.charAt(0).toUpperCase() : ''
      }`;
    },
    async getRoleBasedTemplate(roleId) {
      await this.getSubscribedPlans();
      this.loaderStatus = true;
      const response = await getRoleBasedPermissions(roleId);
      this.loaderStatus = false;
      if (response && response.services) {
        response.services.forEach((service, index) => {
          if (
            service.serviceId &&
            !this.addedServiceIds.includes(service.serviceId)
          ) {
            response.services[index].access = false;
          }
        });
        this.servicesList = cloneDeep(response.services);
        if (this.roleId === this.member.role_id)
          this.userServiceList = cloneDeep(this.usersPermission.services);
        else this.userServiceList = cloneDeep(this.servicesList);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Unable to get default permissions for the role!'
        });
        this.servicesList = [];
        this.userServiceList = [];
      }
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
  }
};
</script>
<style scoped>
.pb-20 {
  padding-bottom: 20px;
}
.box-wrapper {
  height: calc(65vh - 35px);
  overflow-y: auto;
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
.txt-alg-rt {
  text-align: right;
}
.custom-dropdown >>> .el-input__inner {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61 !important;
  border: 1px solid #828282 !important;
  border-radius: 20px;
}
.custom-dropdown >>> .el-select {
  width: 100%;
}
.el-select-dropdown__item.selected {
  color: #0b3c61;
}
.cust_label {
  display: inline-block;
  margin-left: 15px;
  vertical-align: super;
  font-size: 14px;
}
.cust_checkbox {
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
.profile-pic-edit {
  width: 170px;
  height: 170px;
  line-height: 170px;
  float: unset;
}
.cursor_pointer {
  cursor: pointer;
}
.profile-pic-title-edit {
  display: inline-block !important;
  background: #f2f2f2;
  color: #00518a;
}
.mr-bt-5p {
  margin-bottom: 5%;
}
.cancel-button {
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 16px;
}
.footer {
  padding-top: 10px;
  position: absolute;
  bottom: 0%;
  padding-bottom: 2%;
  right: 0;
  background-color: #fff;
}
.save-button:hover,
.save-button:hover,
.save-button:active,
.save-button:focus,
.save-button.active.focus,
.save-button.active:focus,
.save-button.active:hover,
.save-button:active.focus,
.save-button:active:focus,
.save-button:active:hover {
  background-color: #4c9e45;
  border-color: #4c9e45;
  color: #fff;
  box-shadow: none;
}
.save-button {
  background-color: #4c9e45;
  border: 1px solid #4c9e45;
  border-radius: 20px;
  color: #ffffff;
  font-size: 16px;
}
.img-blk {
  padding-top: 10px;
  text-align: center;
}
.label-selected {
  color: #0b3c61;
  font-weight: 500;
}
.link-disabled {
  opacity: 0.4;
}
@media screen and (min-width: 768px) {
  #team-icon {
    float: right;
  }
  .hide-sm {
    display: none;
  }
}
@media only screen and (min-width: 1025px) {
  .remove_button_padding {
    padding-left: 230px;
  }
}
@media screen and (max-width: 767px) {
  .bt-border {
    padding-bottom: 10px;
  }
  .new_member_img {
    height: 100px;
  }
  .footer {
    padding-bottom: 5%;
  }
  .cust_checkbox {
    margin-left: 5px !important;
  }
  .hide-xs {
    display: none;
  }
}
@media only screen and (min-width: 1025px) {
  .remove_button_padding {
    padding-left: 230px;
  }
}
@media only screen and (max-width: 1024px) {
  .box-wrapper {
    height: 35vh;
  }
}
</style>
