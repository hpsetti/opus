<template>
  <div class="content-wrappper training-main" ref="dummy">
    <div>
      <div v-show="false">
        <form ref="form-header" method="POST" :action="samlUrl">
          <div>
            <input ref="refcode" type="hidden" name="SAMLResponse" />
          </div>
          <noscript>
            <div>
              <input ref="samlpost" type="submit" value="Continue" />
            </div>
          </noscript>
        </form>
      </div>
    </div>
    <div class="col-xs-12 mt-20 mb-20">
      <div class="col-xs-12 pl-10 catalog-header fw-300">Your Trainings</div>
      <div class="col-xs-12 pl-0 d-flex flex-wrap">
        <div class="col-xs-12 col-sm-7 col-md-7 pl-0">
          <div
            class="col-xs-12 mt-15 fw-300 text-light-black catalog-description"
          >
            The training catalog includes self-paced eLearning courses and live,
            online instructor-led courses.
          </div>
          <div
            class="col-xs-12 mt-20 fw-300 text-light-black catalog-description"
          >
            The eLearning courses provide a strong foundation on all key HFE
            topics. The instructor-led courses are intended to take someone who
            is already familiar with HFE methods to the next level.
          </div>
          <div
            class="col-xs-12 mt-20 fw-300 text-light-black catalog-description"
          >
            Our instructors are experienced HFE consultants who have practiced
            what they teach. Instructors include individuals who have also
            written an acclaimed book on the topic and taught at universities.
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-5 col-md-5 pl-0 d-flex align-items-center justify-content-center"
        >
          <img
            v-if="windowWidth > 767"
            src="/static/images/icons/trainings_heading.svg"
          />
        </div>
      </div>
      <div class="col-xs-12 col-md-12 mt-30 pl-10 mb-20">
        <training-progress
          :eLearningLatesActivity="eLearningLatesActivity"
          :iltLatestActivity="iltLatestActivity"
          :userId="userId"
          @viewAllProgress="viewAllProgress"
        />
      </div>
      <div class="col-xs-12 col-md-12 mt-30 purchased-trainings--container">
        <purchased-trainings
          :eLearning="purchasedELearnings"
          :ilt="ilts.purchased"
          :userId="userId"
          :account_id="account_id"
        />
      </div>
      <div class="col-xs-12 col-md-12 mt-50 pl-5">
        <marketplace-trainings :userId="userId"></marketplace-trainings>
      </div>
    </div>
    <view-all-progress-vertical
      :viewAllProgressList="selectedViewAllList"
      :selectedCardType="selectedCardType"
      :latestActivity="selectedLatesActivity"
    >
    </view-all-progress-vertical>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../UIComponents/Loader.vue';
import ViewAllProgressVertical from './ViewAllProgressVertical.vue';
import { getTrainingData, getLmsAssertionCode } from '../../apis/lmsTraining';
// import getCertificate from '../../apis/lmsCertificate';
// import { getILTtrainingLatestActivity, getInstructorTrainingList } from '../../apis/instructorLedTraining';
import {
  getAllILTCourses,
  getILTtrainingLatestActivity
} from '../../apis/instructorLedTraining';
import TrainingProgress from './TrainingProgress.vue';
import PurchasedTrainings from './PurchasedTrainings.vue';
import MarketplaceTrainings from './MarketplaceTrainings.vue';

export default {
  props: ['account_id', 'userId'],
  data() {
    return {
      loaderStatus: false,
      selectedLatesActivity: '',
      selectedViewAllList: [],
      selectedCardType: '',
      iltProgress: {},
      eLearningProgress: {},
      iltLatestActivity: null,
      eLearningLatesActivity: null,
      windowWidth: window.innerWidth,
      // NEW DATA
      purchasedELearnings: [],
      // purchasedIlts: [],
      ilts: {
        purchased: [],
        available: []
      },
      certificateDetails: {},
      // loadSamlHtml: false,
      samlResponseHtml: '',
      samlUrl: ''
    };
  },
  components: {
    TrainingProgress,
    PurchasedTrainings,
    ViewAllProgressVertical,
    MarketplaceTrainings,
    Loader
  },
  watch: {
    $route() {
      this.callSaml();
    }
  },
  async mounted() {
    await this.getAllTrainigsData();
    await this.callSaml();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async callSaml() {
      if (this.$route.query.reference === 'lms') {
        const response = await getLmsAssertionCode();
        this.samlUrl = response.acs_link;
        this.$refs.refcode.value = response.saml_response;
        this.$nextTick(async () => {
          this.$refs.samlpost.click();
        });
      }
    },

    viewAllProgress(type) {
      this.selectedCardType = type;
      if (type === 'eLearning') {
        this.selectedViewAllList = this.eLearningProgress.all_course_progress;
        this.selectedLatesActivity = this.eLearningLatesActivity;
      } else {
        this.selectedViewAllList = this.iltProgress.all_course_progress;
        this.selectedLatesActivity = this.iltLatestActivity;
      }
      $('#view-all-progress-vertical').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async getAllTrainigsData() {
      this.loaderStatus = true;
      await Promise.all([this.getELearnings(), this.getiltLatestActivity()]);
      this.loaderStatus = false;
    },
    async getELearnings() {
      const response = await getTrainingData();
      this.eLearningProgress = response.lms_course_progress;
      this.eLearningLatesActivity = this.eLearningProgress.latest_activity; // || response.lms_user_course_list[0];
      this.purchasedELearnings = response.lms_user_course_list.filter(
        (course) => course.course_status !== 'Not Enrolled'
      );
    },
    async getiltLatestActivity() {
      const [allILTs, iltProgress] = await Promise.all([
        getAllILTCourses(this.userId),
        getILTtrainingLatestActivity()
      ]);
      const iltList = [...allILTs.online_ilt, ...allILTs.pre_recorded_il_t];
      this.ilts.purchased = iltList.filter((course) => course.enrolled);
      this.ilts.available = iltList.filter((course) => !course.enrolled);
      this.iltProgress = iltProgress;
      this.iltLatestActivity = iltProgress.latest_activity;
    }
  }
};
</script>
<style scoped>
.catalog-header {
  font-size: 36px;
  line-height: 49px;
  color: #0b3c61;
}
.catalog-description {
  text-align: justify;
  font-size: 16px;
}

.learning-header {
  line-height: 33px;
  color: #333333;
}

.purchased-trainings--container {
  padding-left: 8px;
  padding-right: 23px;
}

@media screen and (min-width: 769px) {
  .sm-pl-30 {
    padding-left: 30px;
  }
}

@media screen and (min-width: 1025px) {
  .lg-pl-0 {
    padding-left: 0px;
  }
}
</style>
