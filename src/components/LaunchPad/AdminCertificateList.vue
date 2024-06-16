<template>
  <div class="content-wrappper">
    <div class="row tracker-container">
      <div class="col-xs-12 col-sm-12 box-body">
        <div class="row mt-20">
          <div class="col-md-10 col-sm-10 col-xs-12">
            <p class="total-count">
              {{ accountList.length }}
              <span v-if="accountList.length > 1">Users</span
              ><span v-else>User</span>
            </p>
          </div>
        </div>
        <div class="first_table">
          <table class="table activity-tracker-table">
            <thead>
              <tr>
                <template>
                  <th class="wd-100">User Id</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Completion Date</th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rowVal, index) in accountList" :key="index">
                <template>
                  <td>
                    <span>{{ rowVal.user_id }}</span>
                  </td>
                  <td>
                    <span>{{ rowVal.email }}</span>
                  </td>
                  <td>
                    <span>{{ rowVal.first_name }} {{ rowVal.last_name }}</span>
                  </td>
                  <td>
                    <span>{{ rowVal.company }}</span>
                  </td>
                  <td>
                    <span>{{ dateFormat(rowVal.completion_date) || rowVal.completion_date }}</span>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Loader from '../UIComponents/Loader.vue';
import getCertificateList from '../../apis/lmsCertificateList';

export default {
  props: ['roleId', 'account_id', 'userId'],
  data() {
    return {
      userCount: 0,
      loaderStatus: false,
      accountList: [],
      totalRecordsCount: 0
    };
  },
  components: {
    Loader
  },
  async created() {
    await this.getUsersList();
  },
  methods: {
    async getUsersList() {
      this.loaderStatus = true;
      const records = await getCertificateList();
      this.loaderStatus = false;
      if (records) {
        this.accountList = records.data;
      }
    },
    dateFormat(date) {
      const newDate = `${date[0]} ${date[1]} ${date[2]}`;
      // Make sure it is working in safari
      return dayjs(newDate).format('DD MMM YYYY');
    }
  },
};
</script>
<style scoped>
.wd-100 {
  width: 100px !important;
}
.tracker-container {
  margin-right: 0px;
  margin-left: 0px;
}
.box-body {
  padding-top: 15px;
}
.total-count {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
}
</style>
