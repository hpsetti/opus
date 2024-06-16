<template>
  <div class="content-wrappper">
    <div class="row m-25-10">
      <div class="col-xs-7 col-sm-8 col-lg-9 mb-15">
        <a href="javascript:void(0);" class="sub-heading" @click="back()">
          <i class="fa fa-angle-left"></i>Account Name
        </a>
      </div>
    </div>
    <account-services :account-id="accountId"></account-services>
  </div>
</template>
<script>
import AccountServices from './AccountServices.vue';

export default {
  components: {
    AccountServices
  },
  data() {
    return {
      accountId: ''
    };
  },
  props: ['roleId'],
  created() {
    if (this.roleId !== 5 && this.roleId !== 11) {
      this.$router.push('/home');
    }
    this.accountId = sessionStorage.getItem('getAccountDetailsId');
    if (!this.accountId) {
      if (window.history.length > 2) this.$router.go(-1);
      else this.$router.push('/launchpad');
    }
  },
  methods: {
    back() {
      const serviceTrackerId = sessionStorage.getItem('serviceTrackerPlanId');
      if (serviceTrackerId) {
        this.$router.push({
          name: 'ServiceTracker',
          params: {
            plan_id: serviceTrackerId
          }
        });
      } else {
        this.$router.push('/launchpad');
      }
    }
  }
};
</script>
<style scoped>
.m-25-10 {
  margin: 25px 10px 0;
}
.mb-15 {
  margin-bottom: 15px;
}
.mb-10 {
  margin-bottom: 10px;
}
.sub-heading > i {
  margin-right: 6px;
}
.sub-heading {
  font-family: Roboto;
  font-style: normal;
  font-size: 18px;
  color: #0b3c61;
  cursor: pointer;
}
</style>
