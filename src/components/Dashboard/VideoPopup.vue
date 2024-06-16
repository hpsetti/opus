<template>
  <div id="overview-video" class="modal" role="dialog">
    <div class="modal-dialog modal-lg request-modal custom-modal-class">
      <!-- Modal content-->
      <div class="modal-content col-xs-12 p-10 pt-0 content-custom">
        <div class="modal-header">
          <div class="col-xs-12 flex-wrapper pr-0">
            <div>Overview</div>
            <!-- <h2>Overview</h2> -->
            <img
              class="cursor-pointer"
              @click="closePopup"
              src="/static/images/icons/close_icon.svg"
              alt=""
            />
          </div>
        </div>
        <div class="modal-body">
          <div class="video-carosal">
            <video
              ref="dashboardDemo"
              class="video-js video-content opus-intro-video"
              disablepictureinpicture
              controls
              controlslist="nodownload"
              @play="videoPlayed"
            >
              <source :src="videoPath" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postMarketoFormData from '../../apis/marketo';

export default {
  props: ['wistiaSourceUrlId'],
  mounted() {
    /* eslint-disable no-underscore-dangle */
    if (this.wistiaSourceUrlId) {
      window._wq = window._wq || [];
      window._wq.push({
        id: this.wistiaSourceUrlId,
        play: () => {
          this.videoPlayed();
        }
      });
    }
  },
  data() {
    return {
      videoPath: '',
    };
  },
  watch: {
    wistiaSourceUrlId() {
      /* eslint-disable no-underscore-dangle */
      if (this.wistiaSourceUrlId) {
        window._wq = window._wq || [];
        setTimeout(() => {
          window._wq.push({
            id: this.wistiaSourceUrlId,
            onReady: (video) => {
              video.time(0);
            }
          });
        }, 1000);
      }
    }
  },
  methods: {
    closePopup() {
      if (!this.wistiaSourceUrlId) {
        this.$refs.dashboardDemo.pause();
      }
      this.$emit('closeOverViewPopup');
      this.$router.push('/home');
    },
    videoPlayed() {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'Video Play',
        asset_title: 'OPUS Overview',
        form_control_details: 'OPUS Overview'
      };
      postMarketoFormData(marketoForm);
    },
    async getVideoLink() {
      this.videoPath = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}/video/OPUS_Product_Introduction.mp4`;
    }
  },
  async created() {
    await this.getVideoLink();
  },
};
</script>

<style scoped>
.opus-intro-video {
  height: 450px;
  width: 100%;
  margin: 0 auto;
  padding-top: 15px;
}

.flex-wrapper {
  display: flex;
  justify-content: space-between;
}
.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}

.modal-footer {
  background: #fff;
  border-top: none;
}

.mt-15 {
  margin-top: 15px;
}

.modal-body {
  background: #fff;
}

.custom-modal-class {
  margin-top: 10%;
  height: 700px;
  width: 65% !important;
}
.content-custom {
  height: 75%;
}
@media screen and (max-width: 1023px) {
  .custom-modal-class {
    margin-top: 3%;
    height: auto;
    width: 95% !important;
  }
}
</style>
