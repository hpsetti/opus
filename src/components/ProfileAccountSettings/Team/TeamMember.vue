<template>
  <div class="row">
    <div
      class="col-md-5 col-sm-6 col-xs-6 xs-mr-tp-10 xs-mr-bt-10"
      v-bind:class="xshide ? 'hidden-xs' : ''"
    >
      <div class="collapse-drop-label">Role</div>
      <div>
        <span v-if="getRoleName(member.role_id)" class="custom-dropdown">
          {{ getRoleName(member.role_id) }}
        </span>
        <span v-else>
          <div v-if="member.role_id === 1">Account Owner</div>
          <div v-else-if="member.role_id === 5">OPUS Admin</div>
          <div v-else-if="member.role_id === 11">OPUS Operations</div>
          <div v-else>{{ selectedRolesList.name }}</div>
        </span>
      </div>
    </div>
    <!-- <div
      class="col-lg-offset-1 col-lg-6 col-md-6 custom-dropdown col-sm-6 col-xs-6 xs-mr-tp-10 xs-mr-bt-10"
      v-bind:class="xshide?'hidden-xs':''"
    >
      <div class="collapse-drop-label">Distributor</div>
      <div>--</div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: ['roleId', 'roles', 'member', 'selectedRolesList', 'xshide'],
  data() {
    return {
      selectedRole: {}
    };
  },
  created() {
    this.selectedRole = this.selectedRolesList;
  },
  watch: {
    selectedRolesList() {
      this.selectedRole = this.selectedRolesList;
    }
  },
  methods: {
    getRoleName(id) {
      const role = this.roles.find((r) => r.role === id);
      return role ? role.name : '';
    },
    emitDistributor() {
      this.$emit('updateDistributor', {
        id: this.member.id,
        dist_id: this.member.assigned_distributor_id
      });
    },
    emitRole() {
      this.$emit('updateRole', {
        member: this.member,
        selectedId: this.selectedRole.id
      });
    }
  }
};
</script>
<style scoped>
@media (min-width: 769px) and (max-width: 1150px) {
  .sm-txt-alg-lt {
    text-align: left !important;
  }
}
@media (max-width: 767px) {
  .xs-pd-lt-0 {
    padding-left: 0px;
  }
  .xs-pd-rt-0 {
    padding-right: 0px;
  }
  .xs-mr-bt-10 {
    margin-bottom: 10px;
  }
  .xs-mr-tp-10 {
    margin-top: 10px;
  }
  .xs-mr-bt-10 {
    margin-bottom: 10px;
  }
  .collapse-drop-label {
    display: block !important;
  }
}
.collapse-drop-label {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-left: 10px;
  margin-bottom: 4px;
  display: none;
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
.el-select-dropdown__item.selected {
  color: #0b3c61;
}
.el-select-dropdown__item.selected::after {
  content: '';
  position: absolute;
  width: 1.6ex;
  height: 0.8ex;
  background: rgba(0, 0, 0, 0);
  top: 1.7ex;
  right: 15px;
  border: 3px solid #4c9e45;
  border-top: none;
  border-right: none;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
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
</style>
