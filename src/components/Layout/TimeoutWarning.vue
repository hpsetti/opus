<template>
  <div>
    <div id="warningTimeout" class="modal fade custom" role="dialog">
      <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Your Session is about to expire...</h4>
          </div>
          <div
            style="
              position: relative;
              display: table;
              overflow-y: auto;
              overflow-x: auto;
              width: auto;
              min-width: 300px;
            "
          >
            <div class="col-md-12" style="padding: 10px 10px 10px 10px">
              You will be logged out of OPUS in
              <strong>{{ gettime }} seconds</strong>
              <br />
              <br />Do you want to stay logged in?
            </div>
          </div>
          <div
            class="modal-footer d-flex justify-content-center col-gap-15 p-10"
          >
            <BaseButton
              variant="secondary"
              data-dismiss="modal"
              @click="loadLogOut"
            >
              <i class="glyphicon glyphicon-log-out"></i> No, log me out
            </BaseButton>
            <BaseButton
              data-dismiss="modal"
              @click="loadAgain"
              data-toggle="tab"
              >Yes, keep me logged in</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import BaseButton from '../UIComponents/BaseButton.vue';
import { getLogoutLogs } from '../../apis/login';

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      gettime: 30,
      warningOut: 1
    };
  },

  methods: {
    makeTimeOut() {
      this.gettime = 30;
      clearInterval(this.warningOut);
      clearTimeout(this.warningOut);
      this.warningOut = setInterval(this.warningTime, 1000);
    },
    warningTime() {
      if (this.gettime > 0) {
        this.gettime -= 1;
      }
    },
    async addLogoutLog() {
      const response = await getLogoutLogs();
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Logout Successful',
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data,
        });
      }
    },

    loadLogOut() {
      // socket.removeAllListeners(`alertExportRegistrationDataToExcel_${localStorage.getItem('userId')}`);
      // socket.removeAllListeners(`alertExportCertificateDataToExcel_${localStorage.getItem('userId')}`);
      // socket.removeAllListeners(`alertSaveMultiRegistrationDetails_${localStorage.getItem('userId')}`);
      // socket.removeAllListeners(`alertSaveMultiCertificateDetails_${localStorage.getItem('userId')}`);
      document.cookie =
        'Authorization=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie =
        'redirect_url=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      localStorage.clear();
      this.addLogoutLog();
      this.$router.push('/login');
    },
    loadAgain() {
      clearInterval(this.warningOut);
    }
  },
  mounted() {
    $('#warningTimeout').on('show.bs.modal', this.makeTimeOut);
    $('#warningTimeout').on('hidden.bs.modal', () => {
      $('.modal-backdrop').remove();
    });
  },
  watch: {
    gettime() {
      if (this.gettime === 0) {
        this.loadLogOut();
      }
    }
  },

  beforeUnmount() {
    clearInterval(this.warningOut);
    setTimeout(this.makeTimeOut, 2000);
  }
};
</script>
<style></style>
