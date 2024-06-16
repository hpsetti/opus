<template>
  <div>
    <div id="preview_video" class="modal" role="dialog">
      <div class="modal-dialog modal-lg request-modal">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20" v-if="displayData">
          <div class="modal-header">
            <div class="col-xs-12 p-0">
              <button type="button" class="close" @click="reset()">
                &times;
              </button>
            </div>
          </div>

          <div class="modal-body col-xs-12 text-start">
            <div class="col-xs-12 p-0">
              <div class="col-xs-12 p-0 training-title mb-5">
                Preview of {{ displayData.title }}
              </div>
              <div class="video-carosal mt-10">
                <video
                  id="lms-preview-video"
                  class="video-js video-content opus-intro-video"
                  disablepictureinpicture
                  controls
                  controlslist="nodownload"
                  @play="videoPlayed"
                >
                  <source :src="videoUrl" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import getSasToken from '../../apis/sasToken';
import postMarketoFormData from '../../apis/marketo';

export default {
  props: ['trainingInfo'],

  data() {
    return {
      displayData: null,
      videoUrl: null
    };
  },

  watch: {
    async trainingInfo() {
      this.displayData = this.trainingInfo;
      const formData = {
        container_name: 'preview',
        permissions: 'read',
        storage_name: 'opus-storage-java'
      };
      const token = await getSasToken(formData);
      this.videoUrl = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${this.displayData.preview_url}${token}`;
      const myVideoPlayer = document.getElementById('lms-preview-video');
      myVideoPlayer.setAttribute('src', this.videoUrl);
      myVideoPlayer.load();
    }
  },

  methods: {
    reset() {
      document.getElementById('lms-preview-video').pause();
      $('#preview_video').modal('hide');
    },
    videoPlayed() {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_url: window.location.href,
        page_url_referral: document.referrer,
        form_control: 'Video Play',
        form_control_details: 'Trainings',
        asset_title: this.trainingInfo.title
      };
      postMarketoFormData(marketoForm);
    }
  }
};
</script>

<style scoped>
#lms-preview-video {
  width: 100%;
  height: 100%;
}
.close {
  font-size: 25px !important;
  color: #808080d9 !important;
  background-color: #fff !important;
  top: 0 !important;
  right: 0 !important;
}
.modal-body {
  padding-left: 0px;
  padding-bottom: 50px;
  background: #fff;
}
.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}
.training-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
  margin-top: 5px;
  text-align: center;
}

@media (min-width: 375px) and (max-width: 1200px) {
  .request-modal {
    width: 75%;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
}

@media (min-width: 768px) {
  .modal-dialog {
    margin: 80px auto !important;
  }
}
</style>
