<template>
  <div id="profile_main" class="black-2 text-regular-large">
    <div class="menu-top">
      <ul class="menu_ul">
        <li
          v-if="roleId != 10"
          @click="settings('profile')"
          :class="{ active_page: active_tab == 'profile' }"
        >
          <img
            class="menu_icon"
            src="/static/images/icons/profile/profile.svg"
          />
          <span>Profile</span>
        </li>
        <li
          v-if="roleId !== 13"
          @click="settings('tour')"
          :class="{ active_page: active_tab == 'tour' }"
        >
          <img
            class="menu_icon"
            src="/static/images/icons/profile/virtual-tour.svg"
          />
          <span>Virtual Tour</span>
        </li>
        <li
          v-if="roleId !== 13"
          @click="settings('trainings')"
          :class="{ active_page: active_tab == 'trainings' }"
        >
          <img
            class="menu_icon"
            src="/static/images/icons/side-bar/training.svg"
          />
          <span>Trainings</span>
        </li>
        <li
          v-if="roleId !== 13"
          @click="settings('team')"
          :class="{ active_page: active_tab == 'team' }"
        >
          <img
            class="menu_icon"
            src="/static/images/icons/profile/settings.svg"
            alt="settings-icon"
          />
          <span>Account Settings</span>
        </li>
        <li class="sub_menu_wrapper" v-if="roleId !== 13">
          <ul class="sub_menu">
            <li
              @click="settings('team')"
              :class="{ active_page: active_tab == 'team' }"
            >
              <span>Team</span>
            </li>
          </ul>
        </li>
        <li class="sub_menu_wrapper" v-if="roleId !== 13">
          <ul class="sub_menu">
            <li
              @click="settings('Purchase History')"
              :class="{ active_page: active_tab == 'Purchase History' }"
            >
              <span>Purchase History</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="menu-bottom">
      <ul class="menu_ul">
        <li
          @click="settings('logout')"
          :class="{ active_page: active_tab == 'logout' }"
        >
          <img
            class="menu_icon"
            src="/static/images/icons/profile/logout.svg"
          />
          <span>Log out</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ['activeTab', 'roleId'],
  data() {
    return {
      active_tab: 'profile',
      dashboardCustomizable: null
    };
  },
  watch: {
    activeTab() {
      this.active_tab = this.activeTab;
    }
  },
  methods: {
    settings(data) {
      this.$emit('menuClicked', data);
    }
  }
};
</script>
<style scoped>
.active_page {
  background-color: #edf5ec;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
}
.menu-bottom {
  position: absolute;
  bottom: 10px;
}
.menu-wrapper {
  color: #0b3c61;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
}
.menu_ul {
  list-style: none;
  padding: 0px;
}
.menu_ul > li {
  padding: 8px;
  cursor: pointer;
}
.sub_menu {
  list-style: none;
  padding: 0px;
}
.sub_menu > li {
  padding: 8px 8px 10px 25%;
  cursor: pointer;
  margin: 2px 0px 2px 0px;
}
.sub_menu_wrapper {
  padding: 5px 0 8px !important;
  cursor: unset !important;
}
.menu_icon {
  margin: 0px 10px;
  vertical-align: top;
}
</style>
