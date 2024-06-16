<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="row m-0">
        <div class="col-xs-12 p-0 d-flex align-items-cemter mb-10">
          <img
            @click="navigateToTools"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />
          <div class="welcome-common-header pl-25 fw-300">
            Medical Device Usability Score (MDUS)
          </div>
        </div>
      </div>
      <div class="row m-0 d-flex pl-40 flex-direction">
        <div class="pl-0 font-14">
          MDUS is a subjective assessment that enables you to rapidly evaluate
          your product’s user interface and identify opportunities to improve
          its usability and use-safety. Answer the questions yourself or ask a
          colleague or usability test participant to do so.
        </div>
        <div class="d-flex justify-end pb-10 pl-100 pt-10">
          <BaseButton
            size="lg"
            variant="secondary"
            @click="clearAll"
            :disabled="isBlank"
            >Clear All</BaseButton
          >
          <BaseButton
            size="lg"
            variant="secondary"
            class="ml-15"
            @click="showDownloadOptions"
            :disabled="isBlank"
            >Download</BaseButton
          >
        </div>
      </div>
    </div>
    <div class="d-flex flex-direction emergo-lightgreen-bg score-container">
      <div class="">
        <ScoreChart :scoreData="scoreData" :score="score"></ScoreChart>
      </div>
      <div
        class="score-area full-width d-flex align-items-center justify-content-between"
      >
        <div class="d-flex flex-direction-column justify-content-center">
          <div class="title">Answered:</div>
          <div class="desc">
            {{ result.answered }}/{{ questionnaire.total }}
          </div>
        </div>
        <div class="d-flex flex-direction-column justify-content-center">
          <div class="title">Score:</div>
          <div class="desc">
            {{ scoreData[isComplete ? score.key : 'none'].name }}
          </div>
        </div>
        <div>
          <BaseButton size="lg" @click="showScoreCard" :disabled="!canShowScore"
            >View Score</BaseButton
          >
        </div>
      </div>
    </div>
    <div class="col-xs-12 survey-card-container">
      <SurveyCard
        v-for="category in Object.keys(categories)"
        :key="category"
        :label="category"
        :categories="categories"
        :scoreData="scoreData"
        :questions="questionnaire[category]"
        :answers.sync="result.answers[category]"
        :calculateScore="calculateScore"
      ></SurveyCard>
    </div>
    <ScorePopup
      :score="score"
      :result="result"
      :questionnaire="questionnaire"
      :scoreData="scoreData"
      :categories="categories"
      @download-score="showDownloadOptions"
      @start-new="clearAll()"
    ></ScorePopup>
    <ScoreReport
      :result="result"
      :score="score"
      :scoreData="scoreData"
      ref="score-report"
      @hasDownloaded="postDownload"
    ></ScoreReport>
    <!-- Modal to warn users when they click on download before answering all the questions -->
    <div>
      <div class="modal fade" id="ConfirmDownloadModal" data-backdrop="static">
        <div class="modal-dialog confirm-modal-wrapper">
          <div class="modal-content">
            <div class="modal-header text-right">
              <img
                data-dismiss="modal"
                class="cursor-pointer"
                src="/static/images/icons/close_icon.svg"
                alt="Close Download Modal"
              />
            </div>
            <div class="modal-body text-center">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">
                    <span
                      >Are you sure you would like to download before answering
                      all the questions?</span
                    >
                  </div>
                  <div class="card-text">
                    <span>You will receive a blank questionnaire.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div class="d-flex justify-content-center">
                <BaseButton
                  variant="secondary"
                  class="mr-15"
                  data-dismiss="modal"
                  >No, Cancel</BaseButton
                >
                <BaseButton @click="downloadReport">Yes, Download</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import Loader from '../../UIComponents/Loader.vue';
import SurveyCard from './SurveyCard.vue';
import questionnaire from './questions';
import ScorePopup from './ScorePopup.vue';
import ScoreChart from './ScoreChart.vue';
import ScoreReport from './ScoreReport.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../../apis/marketo';

export default {
  name: 'MDUS',
  components: {
    Loader,
    SurveyCard,
    ScorePopup,
    ScoreChart,
    ScoreReport,
    BaseButton
  },
  created() {
    this.clearAll();
  },
  data() {
    return {
      questionnaire,
      loaderStatus: false,
      categories: {
        general: 'General',
        safety: 'Safety',
        mitigation: 'Mitigations',
        clarity: 'Clarity',
        usability: 'Usability',
        ergonomics: 'Ergonomics',
        appeal: 'Appeal'
      },
      result: null,
      scoreKeys: ['bad', 'poor', 'fair', 'good', 'great'],
      scoreData: {
        bad: {
          id: 0,
          name: 'BAD',
          color: '#B00505',
          start: 0,
          end: 19
        },
        poor: {
          id: 1,
          name: 'POOR',
          color: '#CF5F28',
          start: 20,
          end: 39
        },
        fair: {
          id: 2,
          name: 'FAIR',
          color: '#FFD362',
          start: 40,
          end: 59
        },
        good: {
          id: 3,
          name: 'GOOD',
          color: '#92C83E',
          start: 60,
          end: 79
        },
        great: {
          id: 4,
          name: 'GREAT',
          color: '#4C9E45',
          start: 80,
          end: 100
        },
        none: {
          id: 5,
          name: '---',
          color: '#333333'
        }
      },
      score: {
        key: 'none',
        value: -1,
        categories: {
          general: { key: 'none', value: -1 },
          safety: { key: 'none', value: -1 },
          mitigation: { key: 'none', value: -1 },
          clarity: { key: 'none', value: -1 },
          usability: { key: 'none', value: -1 },
          ergonomics: { key: 'none', value: -1 },
          appeal: { key: 'none', value: -1 }
        }
      },
      options: {
        sagree: {
          name: 'Strongly Agree',
          value: 2
        },
        agree: {
          name: 'Agree',
          value: 1
        },
        neutral: {
          name: 'Neutral',
          value: 0
        },
        disagree: {
          name: 'Disagree',
          value: -1
        },
        sdisagree: {
          name: 'Strongly Disagree',
          value: -2
        },
        dna: {
          name: 'Does not Apply',
          value: -3
        }
      }
    };
  },
  computed: {
    // If none of the questionnaire is attempted
    isBlank() {
      return this.result && this.result.answered === 0;
    },
    // If all the questionnaire is completed
    isComplete() {
      return this.result && this.result.answered === this.questionnaire.total;
    },
    /**
     * Calculate the position of the indicator based on score calculated
     * @todo Consider the available width of the container in the position calculation
     */
    indicatorPosition() {
      const iconWidth = 32;
      const padding = 2;
      const scoreBarWidth = 100;
      const position =
        (scoreBarWidth - iconWidth) / 2 +
        this.scoreData[this.score.key ? this.score.key : 'fair'].id *
          (scoreBarWidth + padding);
      return {
        'padding-left': `${position}px`
      };
    },
    /**
     * Enable view score button when atleast one category is fully answered
     */
    canShowScore() {
      if (this.result.answered === 0) return false;
      return Object.keys(this.result.answers).some(
        (key) =>
          Object.keys(this.result.answers[key]).length ===
          questionnaire[key].count
      );
    }
  },
  watch: {
    'result.answers': {
      handler() {
        this.processAnswers();
      },
      deep: true
    }
  },
  methods: {
    navigateToTools() {
      this.$router.push('/tools');
    },
    /**
     * @summary calculate score based on a given array of values
     * @typedef {Object} Score - Score Object
     * @property {String} score.key A valid key in scoreData
     * @property {Number} score.value Score Value based on inputs provided ignoring DNA's
     * @property {Number} score.count Number of values considered in the array
     * @returns {{key: String, value: Number, count: Number}} Score Object
     */
    calculateScore(answers, category) {
      let key = 'none';
      const count = answers.length;
      if (count === 0) return { key, value: -1, count };
      const newAnswers = answers.filter((val) => val !== -3);
      if (
        newAnswers.length === 0 &&
        category !== 'all' &&
        this.questionnaire[category].count === answers.length
      ) {
        return { key: 'bad', value: 0, count };
      }
      const total = newAnswers.reduce((prev, curr) => prev + curr, 0);
      const value = newAnswers.length
        ? Math.floor((total / newAnswers.length) * 25 + 50)
        : 0;
      let scoreKey;
      for (let i = 0; i < this.scoreKeys.length; i += 1) {
        scoreKey = this.scoreKeys[i];
        if (
          value >= this.scoreData[scoreKey].start &&
          value <= this.scoreData[scoreKey].end
        ) {
          key = scoreKey;
          break;
        }
      }
      return { key, value, count };
    },
    processAnswers() {
      const allValues = [];
      const prevAnswered = this.result.answered;
      Object.keys(this.result.answers).forEach((category) => {
        const values = [];
        Object.values(this.result.answers[category]).forEach((ans) => {
          allValues.push(ans);
          values.push(ans);
        });
        const { key, value } = this.calculateScore(values, category);
        this.score.categories[category].key = key;
        this.score.categories[category].value = value;
      });
      const { key, value, count } = this.calculateScore(allValues, 'all');
      this.score.key = key;
      this.score.value = value;
      this.result.answered = count;
      if (this.isComplete && prevAnswered < this.questionnaire.total) {
        this.showScoreCard();
      }
    },
    // Clear all the user provided data
    clearAll() {
      this.result = {
        answered: 0,
        answers: {
          general: {},
          safety: {},
          mitigation: {},
          clarity: {},
          usability: {},
          ergonomics: {},
          appeal: {}
        }
      };
      this.score = {
        key: 'none',
        value: -1,
        categories: {
          general: { key: 'none', value: -1 },
          safety: { key: 'none', value: -1 },
          mitigation: { key: 'none', value: -1 },
          clarity: { key: 'none', value: -1 },
          usability: { key: 'none', value: -1 },
          ergonomics: { key: 'none', value: -1 },
          appeal: { key: 'none', value: -1 }
        }
      };
      // Expand all categories
      Object.keys(this.categories).forEach((category) =>
        $(`#${category}`).collapse('show')
      );
    },
    /**
     * @summary Trigger download pdf method of vue-html2pdf component
     */
    async downloadReport() {
      $('#ConfirmDownloadModal').modal('hide');
      this.loaderStatus = true;
      await this.$refs['score-report'].generatePDF();
    },
    postDownload() {
      this.$notify({
        type: 'success',
        title: 'Success',
        text: 'Downloaded successfully as a PDF.'
      });
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'Tools',
        form_control_details: 'Download - Design Recommendation Library'
      };
      postMarketoFormData(marketoForm);
      this.loaderStatus = false;
    },
    showScoreCard() {
      // Show the score card dialog modal
      $('#score-popup').modal('show');
    },
    showDownloadModal() {
      $('#ConfirmDownloadModal').modal('show');
    },
    showDownloadOptions() {
      return this.isComplete ? this.downloadReport() : this.showDownloadModal();
    }
  }
};
</script>

<style scoped>
.pl-100 {
  padding-left: 100px;
}
.survey-card-container {
  padding: 20px 32px 0 32px;
}
.score-container {
  height: 168px;
  /* padding-left: 62px; */
  padding-left: 32px;
  padding-right: 32px;
}
.score-chart {
  height: 100%;
  padding-left: 36px;
  padding-right: 36px;
}
.score-bar-chart {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.score-bar-chart .score-bar {
  width: 100px;
  height: 8px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.score-bar-chart .score-bar.bad {
  background-color: #b00505;
}
.score-bar-chart .score-bar.poor {
  background-color: #cf5f28;
}
.score-bar-chart .score-bar.fair {
  background-color: #ffd362;
}
.score-bar-chart .score-bar.good {
  background-color: #92c83e;
}
.score-bar-chart .score-bar.great {
  background-color: #4c9e45;
}
.score-bar-chart .score-bar.disabled {
  background-color: #828282;
  opacity: 0.2;
}
.score-bar-chart .score-bar.white {
  background-color: #ffffff;
  width: 2px;
}
.score-bar-chart .score-bar.left-rounded {
  border-radius: 4px 0px 0px 4px;
}
.score-bar-chart .score-bar.right-rounded {
  border-radius: 0px 4px 4px 0px;
}
.pl-2 {
  padding-left: 2px;
}
.score-names {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.score-names .score-name:first {
  width: 100px;
}
.score-names .score-name {
  width: 102px;
  padding-top: 9px;
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #333333;
  opacity: 0.8;
}
.score-area {
  padding-left: 32px;
}
.score-area .title {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.4px;
  color: #333333;
  padding-bottom: 8px;
}
.score-area .desc {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 0.4px;
  color: #333333;
}
.confirm-modal-wrapper .modal-header,
.confirm-modal-wrapper .modal-footer {
  background: transparent;
  border: none;
}
.confirm-modal-wrapper .modal-footer {
  padding-bottom: 24px;
}
.confirm-modal-wrapper .modal-body {
  padding: 0 80px 40px 80px;
}
.confirm-modal-wrapper .card-title span {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
  color: #333333;
}
.confirm-modal-wrapper .card-text span {
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}
.flex-direction {
  flex-direction: column;
}
@media only screen and (min-width: 1440px) {
  .score-container {
    height: 88px;
  }
  .flex-direction {
    flex-direction: row;
  }
}
@media only screen and (max-width: 1439px) {
  .score-container > div {
    padding-top: 10px;
  }
}
</style>
