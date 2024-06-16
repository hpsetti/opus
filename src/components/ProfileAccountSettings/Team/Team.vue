<template>
  <div>
    <div v-if="screen.team" class="team-content">
      <div class="row m-0">
        <div class="col-sm-12 col-xs-12 col-md-12 p-0">
          <div class="offer d-flex justify-content-between">
            <div class="ml-30">
              <div class="title blue-1 mb-10">Get a free OPUS training</div>
              <div class="text-subtitle-1 blue-1 mb-10">
                Add 5 new team members and receive a free eLearning
              </div>
              <BaseButton @click="showScreen('offerHome')"
                >Learn more</BaseButton
              >
            </div>
            <img src="/static/images/promotions/refer_5.svg" />
          </div>
        </div>
      </div>
      <div class="mt-20">
        <div class="d-flex justify-content-end col-gap-15 pr-20">
          <BaseButton variant="secondary" @click="addTeamMemberSection">
            Add new member
          </BaseButton>
        </div>
        <div class="mt-10 d-flex align-items-center justify-content-between">
          <div class="text-subtitle-2 ml-30">
            {{ filterMembers.length }} members
          </div>
          <div class="pr-20">
            <OpusPopoverToolTip
              width="350"
              position="left"
              @popoverToggle="popoverControl"
              :triggerClick="true"
              class="team-popover"
            >
            <template #content>
              <div class="info-tabs">
                <OpusTabs
                  :tabs="[{ name: 'Role Definitions', key: 'role' }]"
                  v-model="activeTab"
                ></OpusTabs>
                <div v-for="(role, index) in roles" :key="index">
                  <div v-html="role.name" class="info-header"></div>
                  <div v-html="role.description" class="info-text"></div>
                </div>
              </div>
            </template>
            <template #default>
              <img
                class="info-img"
                src="/static/images/icons/info_icon.svg"
                v-if="!popoverToggle"
                slot="reference"
              />
              <img
                class="info-img"
                src="/static/images/icons/info_icon_active.svg"
                v-if="popoverToggle"
                slot="reference"
              />
            </template>

          </OpusPopoverToolTip>
          </div>
        </div>
        <div
          class="opus-table-container"
          v-if="paginatedTeamMembers.length > 0 && !loaderStatus"
        >
          <table class="opus-table">
            <thead>
              <tr>
                <th class="pl-15" @click="setSortBy('name')">
                  Member
                  <span class="sort-key" :class="getSortKey('name')"></span>
                </th>
                <th @click="setSortBy('email')">
                  Email
                  <span class="sort-key" :class="getSortKey('email')"></span>
                </th>
                <th @click="setSortBy('role')">
                  Role
                  <span class="sort-key" :class="getSortKey('role')"></span>
                </th>
                <th @click="setSortBy('status')">
                  Confirmation Status
                  <span class="sort-key" :class="getSortKey('status')"></span>
                </th>
                <!-- <th @click="setSortBy('status')">
                  Account Status
                  <span class="sort-key" :class="getSortKey('account_status')"></span>
                </th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="member in paginatedTeamMembers.slice(low, upper)"
                :key="member.id"
              >
                <td class="pl-15">{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.role }}</td>
                <td>{{ member.status }}</td>
                <!-- <td>{{ member.account_status }}</td> -->
                <td
                  class="fixed-small"
                  v-if="isAccountAdmin && member.id !== loggedInUser.id && member.account_status === 'Active'"
                >
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <div class="dropdown pr-20 pl-20">
                      <img
                        src="/static/images/icons/more-horizontal.svg"
                        data-toggle="dropdown"
                      />
                      <div
                        class="dropdown-menu dropdown-menu-right pb-10 pt-10"
                      >
                        <div
                          class="menu-action-container p-15"
                          @click="openRbacPage(member)"
                        >
                          <img
                            src="/static/images/icons/edit_icon_new.svg"
                            class="preview-svg"
                          />
                          <span class="ml-10 text-body-light blue-1">Edit</span>
                        </div>
                        <div
                          class="menu-action-container p-15"
                          @click="showRemoveTeam(member)"
                        >
                          <img
                            src="/static/images/icons/delete_icon.svg"
                            class="preview-svg"
                          />
                          <span class="ml-10 text-body-light red-1 delete"
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
        <div v-else-if="!loaderStatus" class="text-center">
          <div class="mt-50 text-subtitle-1">No accounts found!</div>
        </div>
        <div class="team-pagination">
          <OpusPagination
            :totalPages="totalPages"
            v-if="paginatedTeamMembers.length"
            :total="paginatedTeamMembers.length"
            :perPage="perPage"
            :currentPage="currentPage"
            @pagechanged="onPageChanged"
          ></OpusPagination>
        </div>
      </div>
      
    </div>
    <template v-if="screen.addTeam">
      <add-team-member
        :roles="roles"
        :roleId="roleId"
        @cancelAddTeam="cancelAddTeam"
        @getTeamMembers="getTeamMembers"
        @inviteSent="showInviteSent"
      >
      </add-team-member>
    </template>
    <template v-if="screen.editTeam">
      <edit-team-member
        :roles="roles"
        :member="selectedMember"
        @cancelAddTeam="cancelAddTeam"
        @getTeamMembers="refreshTeamMembers"
      >
      </edit-team-member>
    </template>

    <div id="confirmPopup" class="modal fade" role="dialog">
      <div class="modal-dialog modal-md">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header confirmpopup-bgcolor">
            <button
              type="button"
              class="close"
              data-toggle="modal"
              data-target="#confirmPopup"
            >
              &times;
            </button>
            <h4 class="modal-title">Confirm</h4>
          </div>
          <div class="modal-body confirm-body">
            <p class="text-button-label">
              Are you sure you want to remove your team member?
            </p>
            <p class="text-center mt-20 mb-20 text-regular-large">
              {{ selectedMember.first_name + ' ' + selectedMember.last_name }}
            </p>
          </div>
          <div class="modal-footer confirmpopup-bgcolor">
            <button
              type="button"
              class="btn search-button btn-width-confirm"
              data-toggle="modal"
              data-target="#confirmPopup"
            >
              No
            </button>
            <button
              type="button"
              class="btn save-button btn-width-confirm"
              @click="removeTeamMember(selectedMember)"
            >
              Yes
            </button>
          </div>
          <loader :loadingStatus="removeloaderStatus"></loader>
        </div>
      </div>
    </div>
    <OfferHome
      v-if="screen.offerHome"
      @addNew="showAddTeam"
      @showScreen="showScreen"
    ></OfferHome>
    <InvitesSent
      v-if="screen.inviteSent"
      @getTeamMembers="refreshTeamMembers"
    ></InvitesSent>
    <!-- <generic-popup :genericPopupId="genericPopupId" :genericHeader="'Team Limit'" :genericBody="'upgradeTeams'" :max_number="max_team_members" @emitUpgradeTeams="upgradeTeams"></generic-popup> -->
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import orderBy from 'lodash/orderBy';
// import { Popover } from 'element-ui';
import OpusPopoverToolTip from '@/components/UIComponents/OpusPopoverToolTip.vue';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import { removeTeamMember, getTeamMembers } from '../../../apis/team';
import {
  isDefaultDashboard,
  setDefaultPreference
} from '../../../apis/dashboardCustomization';
// import TeamMember from './TeamMember.vue';
import EditTeamMember from './EditTeamMember.vue';
import { getRolesList, getUserData } from '../../../apis/profile';
// import GenericPopup from '../../UIComponents/GenericPopup.vue';
import AddTeamMember from './AddTeamMember.vue';
import { getListOfRoleNames } from '../../../apis/rbac';
import OfferHome from './OfferHome.vue';
import InvitesSent from './InvitesSent.vue';
import OpusTabs from '../../UIComponents/OpusTabs.vue';
// import OpusTable from '../../UIComponents/OpusTable.vue';
import OpusPagination from '../../UIComponents/OpusPagination.vue';

export default {
  components: {
    Loader,
    // TeamMember,
    // GenericPopup,
    EditTeamMember,
    AddTeamMember,
    BaseButton,
    OfferHome,
    InvitesSent,
    OpusPagination,
    OpusTabs,
    // OpusTable,
    // 'el-popover': Popover,
    OpusPopoverToolTip
  },
  props: ['roleId', 'closeSubPage', 'resetTeams'],
  data() {
    return {
      disableDistributorUpdate: true,
      errors: [],
      showMenu: false,
      loaderStatus: false,
      selectAll: false,
      addMemberError: '',
      roles: [],
      teamMembersList: '',
      filterMembers: [],
      paginatedTeamMembers: [],
      fields: [
        { key: 'name', label: 'Member', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'status', label: 'Confirmation Status', sortable: true },
        { key: 'status', label: 'Account Status', sortable: true }
      ],
      menuOptions: [
        {
          key: 'edit',
          name: 'Edit',
          icon: '/static/images/icons/edit_icon_new.svg',
          fn: this.openRbacPage
        },
        {
          key: 'delete',
          name: 'Delete',
          icon: '/static/images/icons/delete_icon.svg',
          fn: this.showRemoveTeam
        }
      ],
      team: {
        name: '',
        email: '',
        role: '',
        assigned_distributor_id: null
      },
      // What screen to be shown
      screen: {
        team: true,
        offerHome: false,
        addTeam: false,
        editTeam: false,
        inviteSent: false
      },
      updateRoleList: [],
      selectedRolesList: [],
      searchValue: '',
      selectedTeamMembers: [],
      restTeamMembers: [],
      infoActive: false,
      activeTab: 'role',
      removeloaderStatus: false,
      xshide: [],
      max_team_members: 0,
      current_members: 0,
      // genericPopupId: 'genericPopupTeam',
      recordAddonService: null,
      teamAddonService: null,
      selectedMember: '',
      servicesList: [],
      Permissions: '',
      loggedInUser: null,
      showOfferScreen: false,
      invitesSent: false,
      perPage: 5,
      currentPage: 1,
      sortingType: 'name',
      sortingOrder: 'asc',
      sortIcon: 'asc',
      popoverToggle:false,
      sortOptions: {
        name: 1,
        email: -1,
        role: -1,
        status: -1
      },
      upper: 5,
      low: 0
    };
  },
  computed: {
    teamMembersName() {
      const arrName = [];
      if (this.selectedTeamMembers.length) {
        for (let i = 0; i < this.selectedTeamMembers.length; i += 1) {
          const member = this.teamMembersList.find(
            (memberObj) => memberObj.user_id === this.selectedTeamMembers[i]
          );
          if (member) {
            arrName.push(`${member.first_name} ${member.last_name}`);
          }
        }
      }
      return arrName;
    },
    allMemberIds() {
      const allIds = [];
      this.filterMembers.forEach((curMember) => {
        allIds.push(parseInt(curMember.user_id, 10));
      });
      return allIds;
    },
    totalPages() {
      return Math.ceil(this.filterMembers.length / this.perPage);
    },
    isAccountAdmin() {
      return this.roleId === 1 || this.roleId === 5;
    }
  },
  watch: {
    closeSubPage(val) {
      if (val === 'close') {
        this.cancelAddTeam();
      }
    },
    filterMembers(newValue) {
      this.restTeamMembers = newValue.filter(
        (teamMember) => teamMember.user_id !== this.loggedInUser.id
      );
    }
  },
  async created() {
    if (this.roleId === 1) {
      // v-if="isAccountAdmin && member.id !== loggedInUser.id"
      // Work on above logic for hide menu for self and admin.
      this.showMenu = true;
    }
    this.loggedInUser = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : await getUserData();
    this.loaderStatus = true;
    await Promise.all([
      this.getRoles(),
      this.listOfAllRoles(),
      this.getTeamMembers()
    ]);
    this.paginateTeamMembers();
    this.showScreen('team');
    this.loaderStatus = false;
  },
  methods: {
    popoverControl(e) {
      this.popoverToggle = e;
    },
    paginateTeamMembers() {
      /* let members = this.filterMembers.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );

      if (members.length === 0 && this.currentPage > 1) {
        this.currentPage -= 1;
        members = this.filterMembers.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      } */

      this.paginatedTeamMembers = this.filterMembers.map((member) => ({
        id: member.user_id,
        account_id: member.account_id,
        name: `${member.first_name} ${member.last_name}`,
        email: member.email,
        role: this.returnRoleName(member.role_id),
        status: member.is_confirmed ? 'Active' : 'Pending',
        account_status: member.is_account_user_status_active ? 'Active' : 'InActive'
      }));
    },
    onPageChanged(page) {
      this.currentPage = page;
      // this.paginateTeamMembers();
      this.upper = this.currentPage * 5;
      this.low = this.upper - 5;
    },
    setSelectAll() {
      if (this.selectAll) {
        this.selectedTeamMembers = this.restTeamMembers.map(
          (teamMember) => teamMember.user_id
        );
      } else {
        this.selectedTeamMembers = [];
      }
    },
    singleSelect() {
      this.selectAll =
        this.selectedTeamMembers.length === this.restTeamMembers.length;
    },
    cancelAddTeam() {
      this.showScreen('team');
      this.$emit('emitBreadCrumb', false);
    },
    // open role based permission page
    openRbacPage(member) {
      this.selectedMember = this.filterMembers.find(
        (t) => t.user_id === member.id
      );
      this.showScreen('editTeam');
      this.$emit('emitBreadCrumb', 'Member');
    },
    upgradeTeams() {
      $('#UpgradeModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    resetSearch() {
      this.searchValue = '';
      this.filterTeamMembers();
    },
    dropDownEvent(id) {
      this.$set(this.xshide, id, !this.xshide[id]);
    },
    validateRemoveAuthority(assignedRoleId) {
      if (this.roleId === 9) {
        if (
          assignedRoleId !== 1 &&
          assignedRoleId !== 5 &&
          assignedRoleId !== 6
        ) {
          return true;
        }
      } else {
        return true;
      }
      return false;
    },
    updatedRole(respObj) {
      this.selectedRolesList[respObj.member.id].id = respObj.selectedId;
      this.updateRole(respObj.member);
    },
    emitedDistributor(membobj) {
      this.updateRoleDistributor(membobj.id, membobj.dist_id);
      this.checkChanges();
    },
    async filterTeamMembers() {
      const searchStr = this.searchValue.trim();
      this.filterMembers = [];
      if (!searchStr.length) {
        this.filterMembers = this.teamMembersList;
        return;
      }
      this.filterMembers = this.teamMembersList.filter((each) =>
        this.searchString(searchStr, each)
      );
      this.validateCheckedValue();
    },
    validateCheckedValue() {
      const check = [];
      for (let i = 0; i <= this.selectedTeamMembers.length; i += 1) {
        if (this.validateFilterMemberVal(this.selectedTeamMembers[i])) {
          check.push(this.selectedTeamMembers[i]);
        }
      }
      this.selectedTeamMembers = check;
    },
    validateFilterMemberVal(id) {
      let valid = false;
      for (let member = 0; member < this.filterMembers.length; member += 1) {
        if (this.filterMembers[member].user_id === id) {
          valid = true;
          break;
        }
      }
      return valid;
    },
    searchString(searchValue, member) {
      if (
        member.first_name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
        -1
      ) {
        return true;
      }
      if (
        member.email.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ) {
        return true;
      }
      if (
        member.last_name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      ) {
        return true;
      }
      const role = this.returnRoleName(member.assigned_role_id);
      if (role.search(new RegExp(searchValue, 'i')) !== -1) {
        return true;
      }

      if (this.validateDistributer(member, searchValue)) {
        return true;
      }
      return false;
    },
    returnRoleName(roleId) {
      const role = this.roles.find((each) => each.id === roleId);
      return role ? role.name : '';
    },
    updateRole(member) {
      const { id } = member;
      const role = this.selectedRolesList[id].id;
      const distributor = member.assigned_distributor_id;
      let flag = false;
      for (let i = 0; i < this.updateRoleList.length; i += 1) {
        if (this.updateRoleList[i].user_id === id) {
          this.updateRoleList[i].assigned_role_id = role;
          if (role === 6)
            this.updateRoleList[i].assigned_distributor_id = distributor;
          flag = true;
          break;
        }
      }
      if (!flag) {
        const data = {
          user_id: id,
          assigned_role_id: role
        };
        if (role && role === 6) data.assigned_distributor_id = distributor;
        this.updateRoleList.push(data);
      }
      this.checkChanges();
    },
    updateRoleDistributor(id, distributor) {
      let flag = false;
      for (let i = 0; i < this.updateRoleList.length; i += 1) {
        if (this.updateRoleList[i].user_id === id) {
          this.updateRoleList[i].assigned_distributor_id = distributor;
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.updateRoleList.push({
          user_id: id,
          assigned_role_id: 6,
          assigned_distributor_id: distributor
        });
      }
    },
    getInitials(firstname, lastname) {
      return `${firstname ? firstname.charAt(0).toUpperCase() : ''}${
        lastname ? lastname.charAt(0).toUpperCase() : ''
      }`;
    },
    async addTeamMemberSection() {
      this.loaderStatus = true;
      this.selectedTeamMembers = [];
      this.updateRoleList = [];
      this.team = {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        assigned_distributor_id: null,
        user_type_id: 1
      };
      this.addMemberError = '';
      this.searchValue = '';
      this.filterTeamMembers();
      this.showAddTeam();
      this.selectedTeamMembers = [];
      this.selectAll = false;
      this.loaderStatus = false;
    },
    showAddTeam() {
      this.showScreen('addTeam');
      this.$emit('emitBreadCrumb', 'New Member');
    },
    showInviteSent() {
      this.showScreen('inviteSent');
      this.$emit('emitBreadCrumb', false);
    },
    async listOfAllRoles() {
      this.listAllRoles = await getListOfRoleNames();
    },
    async getRoles() {
      this.roles = await getRolesList();
    },
    async refreshTeamMembers() {
      this.loaderStatus = true;
      await this.getTeamMembers();
      this.paginateTeamMembers();
      this.showScreen('team');
      this.loaderStatus = false;
    },
    async getTeamMembers() {
      const userData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : await getUserData();
      this.teamMembersList = await getTeamMembers(
        userData.account_type_id === 2 || userData.account_type_id === 4 ? 1 : 0
      );
      this.filterMembers = this.teamMembersList;
      this.selectedRolesList = [];
      this.xshide = [];
      this.teamMembersList.forEach((curMember) => {
        this.selectedRolesList[curMember.id] = {
          id: curMember.role_id,
          name: this.returnRoleName(curMember.role_id)
        };
        this.xshide[curMember.id] = true;
      });
    },
    showRemoveTeam(member) {
      this.selectedMember = this.filterMembers.find(
        (t) => t.user_id === member.id
      );
      $('#confirmPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async removeTeamMember(member) {
      this.removeloaderStatus = true;
      const data = {
        userIds: [member.user_id]
      };
      const resp = await removeTeamMember(data);
      this.removeloaderStatus = false;
      $('#confirmPopup').modal('toggle');
      if (resp.status) {
        this.loaderStatus = true;
        this.selectedTeamMembers.forEach(async (id) => {
          const isDefault = await isDefaultDashboard(
            JSON.parse(localStorage.getItem('userData')).account_id,
            id
          );
          const defaultData = {
            account_id: JSON.parse(localStorage.getItem('userData')).account_id,
            user_id: id,
            dashboard_notification_type_id: 3
          };
          if (!isDefault) {
            await setDefaultPreference(defaultData);
          }
        });
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Member removed successfully!'
        });
        await this.getTeamMembers();
        this.filterTeamMembers();
        this.paginateTeamMembers();
        this.selectedTeamMember = null;
        this.selectAll = false;
        this.loaderStatus = false;
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: "Member couldn't be removed"
        });
      }
    },
    checkChanges() {
      let counter = 0;
      this.updateRoleList.forEach((data) => {
        if (
          data.assigned_role_id === 6 &&
          data.assigned_distributor_id === null
        )
          counter += 1;
      });
      this.disableDistributorUpdate = true;
      if (counter === 0 && this.updateRoleList.length > 0) {
        this.disableDistributorUpdate = false;
      }
    },
    showScreen(screen) {
      Object.keys(this.screen).forEach((key) => {
        this.screen[key] = Boolean(key === screen);
      });
    },
    openOffer() {
      this.showScreen('offerHome');
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
      this.paginatedTeamMembers = orderBy(
        this.paginatedTeamMembers,
        [type],
        [sortOrder]
      );
      // const sortedList = orderBy(this.drlData.data.result_data, type, sortOrder);
      // this.groupByStatus = { ...this.groupByStatus, [this.activeTabName]: sortedList };
    }
  }
};
</script>

<style scoped>
.team-content {
  width: 100%;
  overflow-y: auto;
  height: 57vh;
}
.opacity-7 {
  opacity: 0.7;
}
.container1 {
  position: absolute;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  max-height: calc(84vh - 300px);
  padding-left: 230px;
  padding-right: 0px;
  margin-top: 224px;
}
.section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.scrollable-content {
  flex-grow: 1;
  overflow: auto;
  overflow-x: hidden;
  min-height: 0;
}
.scrollable-content::-webkit-scrollbar {
  width: 5px;
}
.scrollable-content::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 4px;
}
.search-reset-label {
  right: 30px;
  top: 6px;
}
.custom-profile-pic-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  background: #f2f2f2;
  color: #00518a;
}
.ft-wt {
  font-weight: 300;
}
.xs-collapse-arrow {
  height: 14px;
  width: 14px;
  background-image: url(/static/images/icons/chevron_down.svg);
  background-repeat: no-repeat;
}
.xs-collapse-arrow.active {
  background-image: url(/static/images/icons/chevron_up.svg);
}
.arrow-disp {
  display: none;
}
.member-name {
  font-size: 14px;
  line-height: 16px;
}
.member_img {
  display: table-cell;
  vertical-align: middle;
  padding-right: 15px;
}
.member-text {
  display: table-cell;
  word-break: break-all;
}
.mr-tp-20 {
  margin-top: 20px;
}
.mr-bt-10 {
  margin-bottom: 10px;
}
.mr-tp-10 {
  margin-top: 10px;
}
.mr-bt-5p {
  margin-bottom: 5%;
}
.info-tabs >>> .el-tabs__active-bar {
  height: 6px;
  background-color: #4c9e45;
}
.info-tabs >>> .el-tabs__item {
  font-weight: 300;
  font-size: 16px;
  color: #000000;
}
.info-tabs >>> .el-tabs__item.is-active {
  font-weight: bold;
  color: #000000;
}
.info-tabs >>> .el-tabs__item.is-active {
  color: #000000;
}
.info-header {
  font-weight: 500;
  font-size: 16px;
  margin-top: 10px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}
.info-text {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.7);
  text-align: left;
  word-break: break-word;
}
.info-img {
  height: 22px;
  width: 22px;
}
.modal-header .close {
  background: unset;
  opacity: 1;
  line-height: unset;
  width: unset;
  border-radius: unset;
  color: unset;
  font-weight: 300;
  font-size: 30px;
}
.confirm-body {
  font-size: 14px;
  padding: 15px;
}
.btn-width-confirm {
  width: 100px;
}
#container {
  height: 100%;
}
#add-team-footer {
  padding-bottom: 30px;
}
.header-team {
  padding: 15px 0px 0px 0px;
  font-size: 28px;
  line-height: 33px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
}
.icon-close {
  color: #828282 !important;
}
.add-border {
  width: 100%;
  border: 0.5px solid #828282;
  box-sizing: border-box;
  border-radius: 20px;
}
.add-dropdown-img {
  -webkit-appearance: none;
  background: url('/static/images/icons/chevron_down.svg') no-repeat right white;
  background-position: 99% 50%;
}

#add-team-footer {
  padding-top: 10px;
}
.cancel-btn {
  float: right;
  margin-right: 10px;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  color: #0b3c61 !important;
  border-radius: 20px;
  background: #ffff;
  height: 25px;
}
.save-btn {
  float: right;
  border-radius: 20px;
  border: 1px solid #4c9e45;
  background: #4c9e45;
  margin-right: 10px;
  height: 25px;
}
.custo-search >>> .el-input__inner {
  padding-left: 34px !important;
  border: 0.5px solid #828282;
  box-sizing: border-box;
  border-radius: 20px;
  padding-right: 74px;
}
.search-button {
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 16px;
}

.save-button {
  background-color: #4c9e45;
  border: 1px solid #4c9e45;
  border-radius: 20px;
  color: #ffffff;
  font-size: 16px;
}
.add-team-button {
  background: #0b3c61;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  color: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
}
.add-team-button:hover,
.add-team-button:active,
.add-team-button:focus,
.add-team-button.active.focus,
.add-team-button.active:focus,
.add-team-button.active:hover,
.add-team-button:active.focus,
.add-team-button:active:focus,
.add-team-button:active:hover {
  background-color: #0b3c61;
  border-color: #0b3c61;
  color: #fff;
  box-shadow: none;
}
.pd-lt-0 {
  padding-left: 0px;
}
.pd-rt-0 {
  padding-right: 0px;
}
.text-alg-center {
  text-align: center;
}
.text-alg-right {
  text-align: right;
}
.mr-lt-33 {
  margin-left: 33px;
}
.member-box-wrapper {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 0.5px solid #bdbdbd;
  margin: 0;
}
.member-box-wrapper i {
  color: #0b3c61;
}

.el-select-dropdown__item.selected {
  color: #0b3c61;
}
.checkbox {
  position: relative;
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
.checkbox label {
  cursor: none;
  top: 5px;
  position: relative;
}
.cust_checkbox {
  margin: 0px;
  margin-right: 8px;
  display: inline-block;
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
.confirmpopup-bgcolor {
  background-color: #ffffff;
}
.footer {
  padding-top: 10px;
  position: absolute;
  bottom: 0%;
  padding-bottom: 2%;
  right: 0;
  background-color: #fff;
}
.add_icon_img {
  display: none;
}
.custo-search >>> .el-input__icon {
  font-size: 22px;
  font-weight: 600;
  color: #828282;
}
.reset-close-xs {
  display: none;
  top: 8px;
  right: 12%;
}
.offer {
  background: rgba(226, 238, 255, 0.5);
  padding-top: 15px;
  padding-bottom: 15px;
}
.offer .title {
  font-weight: 300;
  font-size: 26px;
  line-height: 36px;
}
.offer img {
  padding-right: 90px;
}
.team-pagination {
  width: calc(100% - 230px);
  border-top: 0.5px solid #bdbdbd;
  position: fixed;
  bottom: 0;
  right: 0;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 24px;
  padding-left: 24px;
  left: calc(50% + 115px);
  transform: translateX(-50%);
  background: white;
}
@media only screen and (min-width: 1025px) {
  .remove_button_padding {
    padding-left: 230px;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .container1 {
    padding-left: 0px;
    padding-right: 0px;
    margin-top: 230px;
    max-height: calc(84vh - 500px);
  }
  .team-pagination {
    width: 100%;
    left: unset;
    transform: unset;
  }
  .team-content {
    height: 35vh;
  }
}
@media screen and (max-width: 767px) {
  .bt-border {
    padding-bottom: 10px;
  }
  .hide-xs {
    display: none;
  }
  .container1 {
    padding-left: 0px;
    padding-right: 0px;
    margin-top: 200px;
    max-height: calc(84vh - 250px);
  }
  .add_icon_img {
    display: inline !important;
  }
  .search-reset-label {
    display: none;
  }
  .custo-search >>> .el-input__inner {
    padding-right: 36px;
  }
  .reset-close-xs {
    display: block;
  }
  .arrow-disp {
    display: table-cell !important;
    vertical-align: middle;
  }
  .member-text {
    width: 96%;
  }
  .xs-pd-lt-0 {
    padding-left: 0px;
  }
  .xs-pd-rt-0 {
    padding-right: 0px;
  }
  .xs-mr-bt-10 {
    margin-bottom: 10px;
  }
  .footer {
    padding-bottom: 5%;
  }
  .team-pagination {
    width: 100%;
    left: unset;
    transform: unset;
  }
}
@media (min-width: 992px) and (max-width: 1024px) {
  .container1 {
    max-height: calc(84vh - 570px);
  }
}

/* Remove the following code and use opus table with covering the
loggedin user and team member not able to see the menu option feature */
.opus-table-container {
  margin-left: 20px;
  margin-right: 20px;
}
.opus-table-container.responsive {
  overflow-y: auto;
}
.opus-table {
  width: 100%;
}

/* START :: Table border */
.opus-table thead tr,
.opus-table.bordered thead,
.opus-table.default thead {
  border-bottom: 1px dashed rgba(11, 60, 97, 0.25);
}

.opus-table.borderless thead tr,
.opus-table.borderless tbody tr {
  border-bottom: unset;
}
.opus-table tbody tr,
.opus-table.default tbody tr,
.opus-table.outline tbody tr {
  border-bottom: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.outline thead tr,
.opus-table.bordered thead tr {
  border-top: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.bordered thead tr th.first-col,
.opus-table.bordered tbody tr td.first-col,
.opus-table.outline thead tr th.first-col,
.opus-table.outline tbody tr td.first-col {
  border-left: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.outline thead tr th.last-col,
.opus-table.outline tbody tr td.last-col {
  border-right: 1px solid rgba(11, 60, 97, 0.1);
}
.opus-table.bordered thead tr th,
.opus-table.bordered tbody tr td {
  border-right: 1px solid rgba(11, 60, 97, 0.1);
}
/* END :: Table border */

/* START :: Table spacing */
.opus-table thead tr th,
.opus-table tbody tr td {
  padding-left: 15px;
  padding-right: 15px;
}
/* Small rows */
.opus-table tr td,
.opus-table tr th,
.opus-table tr.sm th,
.opus-table tr.sm td {
  height: 40px;
}
/* Large rows */
.opus-table tr.lg th,
.opus-table tr.lg td {
  height: 60px;
}
/* END :: Table spacing */

/* START :: Table content */
.opus-table thead tr th {
  color: #0b3c61;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  /* cursor: pointer; */
}
.opus-table tbody tr td {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #333333;
}
.opus-table tbody td .sub-text {
  color: #828282;
}
.opus-table tbody td > a {
  color: rgba(0, 0, 0, 0.7);
}
/* START :: Table content */

/* START :: Table background */
.opus-table tbody tr.selected {
  background-color: #d0ecf8;
}
.opus-table tbody tr:hover {
  background-color: #e3f4fb;
}
/* END :: Table background */

/* START :: Table sticky */
.opus-table thead {
  position: sticky;
  top: 0;
  background: white;
  z-index: 2;
}
.opus-table thead tr th.first-col.sticky,
.opus-table tbody tr td.first-col.sticky {
  position: sticky;
  left: 0;
  background: white;
  z-index: 1;
}
.opus-table thead tr th.last-col.sticky,
.opus-table tbody tr td.last-col.sticky {
  position: sticky;
  right: 0;
  background: white;
  z-index: 1;
}
/* END :: Table sticky */

/* START :: Table column size */
.opus-table.fixed {
  table-layout: fixed;
}
.opus-table th.fixed-sm,
.opus-table td.fixed-sm {
  width: 8%;
}
.opus-table th.fixed-md,
.opus-table td.fixed-md {
  width: 12%;
}
.opus-table th.fixed-lg,
.opus-table td.fixed-lg {
  width: 24%;
}
/* END :: Table column size */

/* START :: Table drop down menu */
.opus-table .dropdown-menu {
  width: max-content;
  /* margin-top: 10px; */
  /* margin-right: 10px; */
}
.opus-table .dropdown .dropdown-menu-right::before {
  height: 16px;
  width: 16px;
  background-color: white;
  color: white;
  content: '.';
  text-align: center;
  display: inline-block;
  right: 11%;
  position: absolute;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(45deg);
  top: -9px;
  border-radius: 2px 0 0 0;
}
.opus-table .dropup .dropdown-menu-right::before {
  height: 16px;
  width: 16px;
  background-color: white;
  color: white;
  content: '.';
  text-align: center;
  display: inline-block;
  right: 11%;
  position: absolute;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  transform: rotate(135deg);
  top: calc(100% - 8px);
  border-radius: 2px 0 0 0;
}
.opus-table .opus-table-menu {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61;
}
.opus-table .opus-table-menu.error {
  color: #b00505;
}
.opus-table .opus-table-menu-container {
  padding-right: 15px;
  height: 40px;
  min-width: 180px;
}
.opus-table .opus-table-menu-container:hover {
  background: rgba(0, 0, 0, 0.05);
}
/* END :: Table drop down menu */

/* START :: Table sort icon */
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

.team-popover >>> .content-slot {
  right: calc(100% + -17px) !important;
  top: 44px;
}
/* END :: Table sort icon */
</style>
