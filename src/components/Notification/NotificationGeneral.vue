<template>
  <div>
    <div class="notif-container">
      <div class="no-notifications" v-if="filteredList.length === 0">
        You do not have any notifications
      </div>
      <div v-else>
        <div v-for="(notification, index) in filteredList" :key="index">
          <NotificationItem
            :notification="notification"
            @dismiss="dismiss(notification)"
          ></NotificationItem>
        </div>
      </div>
      <Pagination
        v-if="notificationsList.length > perPage"
        :perPage="perPage"
        :totalPages="totalPages"
        :total="notificationsList.length"
        :currentPage="currentPage"
        @pagechanged="setPage"
      ></Pagination>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import Loader from '../UIComponents/Loader.vue';
import { dismissNotification } from '../../apis/notification';
import Pagination from '../LaunchPad/Pagination.vue';
import NotificationItem from './NotificationItem.vue';

export default {
  name: 'NotificationGeneral',
  props: {
    notificationsList: {
      type: Array,
      default: () => []
    },
    userId: {
      type: Number,
      required: true
    },
    pageNo: {
      type: Number,
      default: 1
    }
  },
  components: { Pagination, Loader, NotificationItem },
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      filteredList: [],
      loaderStatus: false
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.notificationsList.length / this.perPage);
    }
  },
  watch: {
    notificationsList: {
      handler() {
        const page =
          this.pageNo > this.totalPages && this.pageNo > 1
            ? this.totalPages
            : this.pageNo;
        this.setPage(page);
      },
      immediate: true
    }
  },
  methods: {
    async dismiss(notification) {
      this.loaderStatus = true;
      const response = await dismissNotification(this.userId, notification.id);
      if (response && response.message === 'success') {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Successfully deleted the notification'
        });
        this.emitter.emit('get-notification-count');
        this.$emit('refresh', { notification, pageNo: this.currentPage });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Unable to delete the notification'
        });
      }
      this.loaderStatus = false;
    },
    setPage(page) {
      if (page < 0 && page > this.totalPages) return;
      this.currentPage = page;
      this.filteredList = cloneDeep(
        this.notificationsList.slice(
          (page - 1) * this.perPage,
          page * this.perPage
        )
      );
    }
  }
};
</script>
<style scoped>
.notif-container {
  margin-right: 35px;
  margin-left: 35px;
}
.no-notifications {
  text-align: center;
  color: #828282;
  margin-top: 100px;
}
</style>
