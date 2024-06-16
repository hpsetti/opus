<template>
  <div class="content-wrappper">
    <div class="row m-0">
      <div>
        <OpusBreadCrumb class="mb-10" variant="sm" @click="navigateToLaunchPad"
          >Launchpad</OpusBreadCrumb
        >
        <div class="d-flex align-items-center justify-content-between">
          <p class="ml-20 text-h3">Users</p>
          <p
            v-if="items"
            class="mr-20 text-subtitle-1 blue-3 download-list-btn"
            @click="getUsersDownloadList"
          >
            <img
              class="pr-10"
              src="/static/images/icons/download_icon.svg"
            />Download Full List
          </p>
        </div>
      </div>
      <div class="mx-20 my-10">
        <OpusSearchBar
          placeholder="Search by user id/email"
          :searchOnEnter="true"
          @search="searchForUsers"
        ></OpusSearchBar>
      </div>
      <div class="text-subtitle-2 text-secondary mt-10 mb-10 ml-20">
        {{ totalItems }} Users
      </div>
      <OpusTable
        id="hfe-user-list"
        class="users-table"
        :items="items"
        :fields="fields"
        :currentPage="currentPage"
        :perPage="inSearch ? perPage : 0"
      >
        <template #empty="">
          <span>No users found!</span>
        </template>
      </OpusTable>
      <div class="users-pagination">
        <OpusPagination
          :total="totalItems"
          :perPage.sync="perPage"
          :currentPage.sync="currentPage"
          @pagechanged="onPageChanged"
          show-per-page-control
          :perPageCounts="[200, 500, 1000]"
          :maxPages="0"
        ></OpusPagination>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>

<script>
// uncomment below to enable download operation
// import { saveAs } from 'file-saver';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import b64toBlob from '../../utils/base64toBlob';
import OpusBreadCrumb from '../UIComponents/OpusBreadCrumb.vue';
import OpusTable from '../UIComponents/OpusTable.vue';
import Loader from '../UIComponents/Loader.vue';
import OpusPagination from '../UIComponents/OpusPagination.vue';
import OpusSearchBar from '../UIComponents/OpusSearchBar.vue';
import { getHFEUsers } from '../../apis/team';
import {
  getUsersList,
  adminDownloadUserList
} from '../../apis/activateService';

export default {
  name: 'HFEUsers',
  components: {
    OpusTable,
    OpusBreadCrumb,
    OpusPagination,
    OpusSearchBar,
    Loader
  },
  async created() {
    await this.getHFEUsers();
  },
  data() {
    return {
      loaderStatus: false,
      items: [],
      /* eslint-disable object-curly-newline */
      fields: [
        { key: 'user_name', label: 'Name', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'active', label: 'State', sortable: true }
      ],
      perPage: 200,
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      inSearch: false
    };
  },
  methods: {
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    async getHFEUsers() {
      this.loaderStatus = true;
      const formData = {
        pagination: {
          current_page: this.currentPage,
          result_per_page: this.perPage
        }
      };
      const result = await getHFEUsers(formData);
      this.items = result.data.result_data;
      const itemService = this.items.map((item) => {
        if (item.status) {
          item.status = 'Verified';
        } else {
          item.status = 'Not Verified';
        }

        if (item.active) {
          item.active = 'Active';
        } else {
          item.active = 'Deactive';
        }
        return item;
      });

      this.items = itemService;
      this.totalPages = result.data.total_pages;
      this.totalItems = result.data.total_records_count;
      this.loaderStatus = false;
    },
    async getUsersDownloadList() {
      this.loaderStatus = true;
      const response = await adminDownloadUserList();
      const blob = b64toBlob(
        response,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      const currentDate = dayjs().format('DD_MMM_YYYY');
      saveAs(blob, `${currentDate}_UserList.xlsx`);
      this.loaderStatus = false;
    },
    async onPageChanged() {
      if (!this.inSearch) {
        this.$nextTick(async () => {
          await this.getHFEUsers();
        });
      }
    },
    async searchForUsers(query) {
      this.loaderStatus = true;
      if (query) {
        this.inSearch = true;
        this.currentPage = 1;
        this.items = await getUsersList(query);
        const itemService = this.items.map((item) => {
          if (item.status) {
            item.status = 'Verified';
          } else {
            item.status = 'Not Verified';
          }

          if (item.active) {
            item.active = 'Active';
          } else {
            item.active = 'Deactive';
          }
          return item;
        });

        this.items = itemService;
        this.totalPages = this.items.length / this.perPage;
        this.totalItems = this.items.length;
      } else {
        this.inSearch = false;
        this.items = [];
        this.totalPages = 0;
        this.totalItems = 0;
        this.currentPage = 1;
        await this.getHFEUsers();
      }
      this.loaderStatus = false;
    }
  }
  // computed: {
  //   computedState() {}
  // }
};
</script>
<style scoped>
.users-table {
  margin-bottom: 120px;
}
.users-pagination {
  border-top: 0.5px solid #bdbdbd;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 24px;
  padding-left: 24px;
  background: white;
}

.download-list-btn {
  cursor: pointer;
}

.users-table >>> tbody tr.sm td {
  max-width: 180px;
}

.users-table >>> tbody tr.sm span {
  word-wrap: break-word;
  display: block;
  max-width: 180px;
}
</style>
