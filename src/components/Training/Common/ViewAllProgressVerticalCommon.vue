<template>
  <div
    id="view-all-progress-vertical-common"
    class="viewAllProgressVerticalCommon"
  >
    <div class="course-dialog course-md">
      <div class="course-content col-xs-12 pl-20 pb-20">
        <div class="course-header">
          <div class="col-xs-12 p-0 text-start header flex-between text-h4">
            <span
              >{{
                selectedCardType === 'eLearning'
                  ? 'eLearning'
                  : 'Instructor Led'
              }}
              Courses</span
            >
          </div>
        </div>
        <div class="course-body col-xs-12">
          <div
            class="col-xs-12 p-0 mb-15 no-data-text text-center font-18"
            v-if="!latestActivity"
          >
            You don't have any upcoming courses
          </div>
          <div class="col-xs-12 p-0 progress-header text-subtitle-2 mb-10">Your progress</div>
          <div class="col-xs-12 p-0 flex-align-center flex-column">
            <ul
              class="wrapper flex-column"
              v-if="viewAllProgressList.length > 0"
            >
              <li
                class="col-xs-12 p-0"
                :class="{
                  enrolled:
                    index !== viewAllProgressList.length - 1 &&
                    viewAllProgressList[index + 1].course_status === 'Enrolled'
                }"
                v-for="(training, index) in viewAllProgressList"
                :key="training.id"
              >
                <img
                  class="stepper img-size"
                  :src="getImageUrl(training.status_icon_path)"
                  alt=""
                />
                <div class="pl-10 font-14 font-300 title-name">
                  {{ training.title }}
                </div>
              </li>
            </ul>
            <div
              class="col-xs-12 p-0 mb-15 no-data-text text-center font-18"
              v-else
            >
              No Progress to Show
            </div>
            <div
              :class="latestActivity.training_type === 'Certificate' &&
                  latestActivity.course_status === 'Complete'?'certificate-footer--container emergo-lightgreen-bg mt-20 pl-25 pb-15':''"
            >
            <div v-if="latestActivity.training_type === 'Certificate' &&
                  latestActivity.course_status === 'Complete'" class="certificate-text--container">
                <h3 class="fw-300 mb-5 mt-5">Congrats!</h3>
                <p class="mb-15 sort-label">
                  You have earned a certificate in {{ latestActivity.title }}
                </p>
              </div>
            <div class="certificate-download-btn--container">
              <BaseButton
                class="emergo-green-button"
                @click="getCertificateDetails"
                :disabled="
                  latestActivity.training_type !== 'Certificate' ||
                  latestActivity.course_status !== 'Complete'
                "
              >
                <img
                  src="/static/images/icons/download_icon_white.svg"
                  class="preview-svg"
                />Download certificate
              </BaseButton>
              <VueHtml2pdf
                :show-layout="false"
                :float-layout="false"
                :enable-download="true"
                :preview-modal="false"
                :filename="getFileName()"
                :pdf-quality="2"
                :manual-pagination="true"
                pdf-format="a3"
                pdf-orientation="landscape"
                pdf-content-width="570px"
                ref="certificatepdf"
                class="certificate-pdf"
              >
                <div
                  class="certificate-content"
                  slot="pdf-content"
                  :class="userName.length >= 67 ? 'xl-certificate-content' : ''"
                >
                  <div class="top-frame">
                    <span class="top-top"></span>
                    <span
                      class="top-left"
                      :class="userName.length >= 67 ? 'xl-top-left' : ''"
                    ></span>
                  </div>
                  <Certificate
                    certificateName="HFE for Medical Technology"
                    :recipientName="userName"
                    :dateIssued="certificateDateIssued"
                    :certificate-details="certificateDetails"
                    :certificateNumber="certificateDetails.certificate_number"
                    class="certificate-main"
                  />
                  <div class="bottom-frame">
                    <span class="bottom-bottom"></span>
                    <span
                      class="bottom-right"
                      :class="userName.length >= 67 ? 'xl-bottom-right' : ''"
                    ></span>
                  </div>
                </div>
              </VueHtml2pdf>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import VueHtml2pdf from 'vue-html2pdf';
import getCertificate from '@apis/lmsCertificate';
import BaseButton from '@/components/UIComponents/BaseButton.vue';
import Certificate from '../Certificate.vue';

export default {
  name: 'ViewAllProgressVerticalCommon',
  props: ['viewAllProgressList', 'selectedCardType', 'latestActivity'],
  components: {
    BaseButton,
    VueHtml2pdf,
    Certificate
  },
  data() {
    return {
      statusMap: {
        'Not Started': 'Enrolled',
        Incomplete: 'In progress'
      },
      userInfo: {},
      coursesCompleted: 0,
      certificateDateIssued: '',
      userName: '',
      certificateDetails: {},
      certificateDownloadBtn: []
    };
  },
  created() {
    if (localStorage.getItem('userData')) {
      const response = JSON.parse(localStorage.getItem('userData'));
      this.userInfo.first_name = response.first_name;
      this.userInfo.last_name = response.last_name;
      this.userInfo.id = response.id;
      this.userName = `${this.userInfo.first_name} ${this.userInfo.last_name}`;
    }
  },
  methods: {
    formatToDateFormat(value) {
      if (value) {
        return dayjs.utc(`${value}`).local().format('MM/DD/YYYY');
      }
      return 'N/A';
    },
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    async getCertificateDetails() {
      this.loaderStatus = true;

      try {
        const res = await getCertificate(this.userInfo.id);
        this.certificateDetails = res.data;
        this.generatePdf();
        this.loaderStatus = false;
      } catch (error) {
        const err = 'certificate api not resolved';
        this.loaderStatus = false;

        return err;
      }
      return '';
    },
    async generatePdf() {
      this.loaderStatus = true;
      this.certificateDateIssued = dayjs([
        this.certificateDetails.date_issued[0],
        this.certificateDetails.date_issued[1] - 1,
        this.certificateDetails.date_issued[2]
      ]).format('DD-MMM-Y');
      await this.$refs.certificatepdf.generatePdf();
      this.loaderStatus = false;
    },
    getFileName() {
        return `OPUS_${
          this.latestActivity.title
        }_Certificate_${this.userInfo.first_name.slice(
          0,
          10
        )}_${this.userInfo.last_name.slice(0, 10)}${dayjs().format('MMDDYYYY')}`;
    }
  },
  computed: {
    getCourseProgress() {
      this.viewAllProgressList.forEach((item) => {
        if (item.course_status === 'Complete') {
          this.coursesCompleted += 1;
        }
      });
      return this.coursesCompleted;
    }
  }
};
</script>

<style scoped>
.viewAllProgressVerticalCommon {
  width: 100%;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}

.ml-30 {
  margin-left: 30px;
}

.course-content {
  padding-left: 80px;
}

.course-body {
  padding-top: 16px;
}

.progress-header {
  border-bottom: 1px solid #d3d6d9;
  padding-bottom: 7.5px;
}

.img-size {
  height: 30px;
  width: 40px;
}

li {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

ul {
  /* overflow: auto; */
  margin-bottom: 0px;
}

ul li:not(:last-child):after {
  content: '';
  position: absolute;
  height: calc(100% - 18px);
  left: 18px;
  top: 29px;
  border-left: 1px dashed #c4c4c4;
  border-width: medium;
}

ul li.enrolled:not(:last-child):after {
  border-left: 1px dashed green;
  border-width: medium;
}

.wrapper {
  display: flex;
  /* flex-wrap: wrap; */
  width: 100%;
  border-bottom: 1px solid #d3d6d9;
}

.certificate-download-btn--container {
  margin-top: 15px;
}

.title-name {
  color: #333333;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #cdcdcd;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cdcdcd;
}

.modal-body {
  padding-bottom: 0px;
}

.latest-activity-img {
  height: 70px;
}

.link {
  color: #00518a;
}

.certificate-pdf {
  display: none;
}

.certificate-content {
  transform: scale(0.8);
  position: relative;
  bottom: 550px;
  top: 15px;
  height: 1110px;
}

.top-frame {
  height: 45px;
  width: 1918px;
}

.top-top {
  height: 45px;
  display: inline-block;
  background-image: linear-gradient(
    136.8deg,
    #4c9e45 55%,
    #a5cea2 55%,
    #a5cea2 68%,
    #fff 0%
  );
  width: 100%;
  position: relative;
  right: 38px;
}

.top-left {
  position: relative;
  width: 85px;
  display: inline-block;
  height: 985px;
  top: -10px;
  background-image: linear-gradient(
    135deg,
    #4c9e45 55%,
    #a5cea2 55%,
    #a5cea2 68%,
    #fff 0%
  );
  bottom: 4px;
  right: 38px;
}

.bottom-frame {
  height: 45px;
  width: 1856px;
  position: relative;
  left: -39px;
  top: 6px;
}

.bottom-bottom {
  height: 45px;
  width: 100%;
  display: inline-block;
  position: relative;
  left: 2px;
  top: -10px;
  background-image: linear-gradient(
    135deg,
    #fff 35%,
    #a5cea2 35%,
    #a5cea2 48%,
    #4c9e45 45%
  );
}

.bottom-right {
  position: relative;
  display: inline-block;
  height: 1030px;
  width: 85px;
  background-image: linear-gradient(
    135deg,
    #fff 35%,
    #a5cea2 35%,
    #a5cea2 48%,
    #4c9e45 0%
  );

  left: 1834px;
  bottom: 1047px;
}

.xl-top-left {
  height: 1244px;
}

.xl-bottom-right {
  height: 1285px;
  bottom: 1304px;
}

.xl-certificate-content {
  top: -75px;
}

@media (min-width: 768px) {
  .modal-dialog {
    width: 500px;
  }
}
</style>
