<template>
  <div class="row m-0">
    <div class="col-md-12 col-lg-12 col-sm-12 p-0">
      <div class="p-0 col-xs-12 first_table" v-if="servicesList.length">
        <table class="table activity-tracker-table">
          <thead>
            <tr>
              <template v-for="header in tableHeaders">
                <th
                  v-if="header !== 'plan_id'"
                  :key="header"
                  :class="{ 'w-35': header === 'name' }"
                >
                  {{ capitalize(header) }}
                </th>
              </template>
              <th class="w-6"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="service in servicesList"
              :key="service.id"
              :class="{
                greyout: !service.active
              }"
            >
              <template v-for="header in tableHeaders">
                <td :key="header" v-if="header !== 'plan_id'">
                  <div v-if="['added_date', 'expiry_date'].includes(header)">
                    {{ dateFormatter(service[header]) }}
                  </div>
                  <div v-else-if="header === 'active'">
                    <img
                      v-if="service[header]"
                      src="/static/images/icons/check.svg"
                    />
                  </div>
                  <div v-else-if="header === 'name' && !service.active">
                    <span
                      >{{ service[header] }}
                      <img
                        src="/static/images/icons/expiry-grey.svg"
                        class="image-size"
                    /></span>
                  </div>
                  <div v-else>{{ service[header] }}</div>
                </td>
              </template>
              <td>
                <div
                  class="account_header_content cursor-pointer"
                  @click="routeURL('/prodclassificationactivitytracker')"
                >
                  <img
                    src="/static/images/icons/chevron_right.svg"
                    alt
                    v-if="service.plan_id === 7"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="norecords_wrapper p-20">
        <div class="no-records-found">No Records Found</div>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import Loader from '../UIComponents/Loader.vue';

export default {
  components: { Loader },
  props: ['accountId'],
  data() {
    return {
      loaderStatus: false,
      servicesList: [],
      tableHeaders: []
    };
  },
  methods: {
    dateFormatter(date) {
      return date ? dayjs(date).format('DD/MM/YYYY') : '';
    },
    capitalize(value) {
      if (!value) return '';
      const returnVal = value.replace(/_/g, ' ').toString();
      return returnVal
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    },
    routeURL(url) {
      sessionStorage.setItem('getAccountDetailsId', this.accountId);
      this.$router.push(url);
    }
  },
  async created() {
    await this.getServices();
  }
};
</script>
<style scoped>
.image-size {
  vertical-align: sub;
}
.activity-tracker-table.table > tbody > tr > td,
.activity-tracker-table.table > thead > tr > th {
  padding-left: 15px !important;
}
.activity-tracker-table.table > tbody > tr.greyout > td {
  color: rgb(0, 0, 0, 0.4);
}
.w-35 {
  width: 35%;
}
.w-6 {
  width: 6%;
}
.first_table th:hover .arrow {
  opacity: 0.5;
}
.first_table .arrow.asc {
  border-bottom: 6px solid #bdbdbd;
}
.first_table .arrow.dsc {
  border-top: 6px solid #bdbdbd;
}
</style>
