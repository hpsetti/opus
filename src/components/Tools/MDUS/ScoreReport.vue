<template>
  <VueHtml2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="true"
    :preview-modal="false"
    :filename="getFileName()"
    :pdf-quality="2"
    :manual-pagination="true"
    pdf-format="a4"
    pdf-content-width="800px"
    pdf-orientation="portrait"
    ref="html2Pdf"
    @hasDownloaded="$emit('hasDownloaded')"
  >
    <section slot="pdf-content">
      <div class="report-container">
        <div class="report-content">
          <div
            v-for="(category, index) in Object.keys(categories)"
            :key="category"
          >
            <div
              :class="[3, 4].includes(index) ? 'html2pdf__page-break' : ''"
            />
            <div class="report-header" v-if="[0, 3, 4].includes(index)">
              <div class="title">Medical Device Usability Score</div>
              <img
                src="/static/images/logos/signin-opus-logo.svg"
                class="logo-img"
              />
            </div>
            <div
              class="score-header row emergo-lightgreen-bg m-0"
              v-if="isComplete && index === 0"
            >
              <div class="col-xs-12 p-0 score-container d-flex">
                <div class="chart">
                  <ScoreChart
                    :scoreData="scoreData"
                    :score="score"
                    :scoreBarWidth="75"
                  ></ScoreChart>
                </div>
                <div
                  class="score-area d-flex align-items-center justify-content-start"
                >
                  <div
                    class="d-flex flex-direction-column justify-content-center answers"
                  >
                    <div class="title">Total Answers:</div>
                    <div class="desc">
                      {{ result.answered }}/{{ questionnaire.total }}
                    </div>
                  </div>
                  <div
                    class="d-flex flex-direction-column justify-content-center answers"
                  >
                    <div class="title">Total Score:</div>
                    <div class="desc">{{ scoreData[score.key].name }}</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-8 p-0 mb-15">
                <div class="score-range-container">
                  <div class="section-title">Score Per Category</div>
                  <div class="d-flex flex-wrap">
                    <div
                      class="score-range-item"
                      v-for="name in Object.keys(categories)"
                      :key="name"
                    >
                      <div class="score-range-name">{{ categories[name] }}</div>
                      <div
                        class="score-range-bar"
                        :class="score.categories[name].key"
                      ></div>
                      <div class="score-range-status">
                        {{ scoreData[score.categories[name].key].name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="category-container">
              <div class="category-name d-flex justify-content-between">
                <span>{{ categories[category] }}</span>
                <span
                  v-if="isComplete"
                  :class="score.categories[category].key"
                  >{{ scoreData[score.categories[category].key].name }}</span
                >
              </div>
              <div
                class="question-container d-flex justify-content-start"
                v-for="(q, index) in questionnaire[category].count"
                :key="index"
              >
                <div class="qno-container">
                  <div class="qno" :class="{ selected: isComplete }">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="question full-width">
                  <div class="title">
                    {{ questionnaire[category][index + 1] }}
                  </div>
                  <div class="options">
                    <div
                      class="option"
                      v-for="option in Object.keys(options)"
                      :key="option"
                    >
                      <BaseRadio
                        size="small"
                        :option="options[option]"
                        :checked="
                          isComplete && isAnswered(category, index, option)
                        "
                        :disabled="
                          isComplete && !isAnswered(category, index, option)
                        "
                      ></BaseRadio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </VueHtml2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
import dayjs from 'dayjs';
import questionnaire from './questions';
import ScoreChart from './ScoreChart.vue';
import BaseRadio from '../../UIComponents/BaseRadio.vue';

export default {
  components: {
    VueHtml2pdf,
    ScoreChart,
    BaseRadio
  },
  props: ['result', 'score', 'scoreData'],
  data() {
    return {
      questionnaire,
      categories: {
        general: 'General',
        safety: 'Safety',
        mitigation: 'Mitigations',
        clarity: 'Clarity',
        usability: 'Usability',
        ergonomics: 'Ergonomics',
        appeal: 'Appeal'
      },
      options: {
        sdisagree: {
          name: 'Strongly Disagree',
          value: -2
        },
        disagree: {
          name: 'Disagree',
          value: -1
        },
        neutral: {
          name: 'Neutral',
          value: 0
        },
        agree: {
          name: 'Agree',
          value: 1
        },
        sagree: {
          name: 'Strongly Agree',
          value: 2
        },
        dna: {
          name: 'Does not Apply',
          value: -3
        }
      }
    };
  },
  computed: {
    /**
     * Is the questionnaire completely filled in?
     */
    isComplete() {
      return this.result && this.result.answered === this.questionnaire.total;
    }
  },
  methods: {
    isAnswered(category, index, option) {
      return (
        Object.keys(this.result.answers[category]).includes(index.toString()) &&
        this.options[option].value === this.result.answers[category][index]
      );
    },
    async generatePDF() {
      await this.$refs.html2Pdf.generatePdf();
    },
    getFileName() {
      return `Medical Device Usability Score Report ${dayjs().format(
        'MMDDYY'
      )}`;
    }
  }
};
</script>

<style scoped>
.report-container {
  width: 100%;
}
.report-header {
  height: 84px;
  padding-left: 32px;
  padding-right: 32px;
  background: url('/static/images/dashboard/report_header.svg') no-repeat;
  color: #ffffff;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.report-header .title {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
  color: #ffffff;
}
.report-header .logo-img {
  width: 80px;
}
.category-container {
  padding-top: 10px;
}
.report-content .category-name {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #0b3c61;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #828282;
}
.report-content .category-container {
  padding-top: 30px;
  padding-bottom: 0px;
  padding-left: 45px;
  padding-right: 45px;
}
.report-content .question-container {
  margin: 20px 0px 0px 0px;
}
.report-content .question-container .qno-container {
  width: 18px;
  height: 18px;
}
.report-content .question-container .qno {
  font-weight: 300;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #333333;
  border: 2px solid #d3d6d9;
  border-radius: 50%;
}
.report-content .question-container .qno.selected {
  border: 2px solid #4c9e45;
}
.report-content .question-container .question {
  margin-left: 8px;
  padding-top: 2px;
}
.report-content .question-container .question .title {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
  color: #333333;
}
.report-content .question-container .question .option {
  display: inline-block;
  padding-right: 30px;
}
.report-content .question-container .question .option:nth-last-child(2) {
  padding-right: 80px;
}
.report-content .question-container .question .option label {
  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  color: #000;
  padding-left: 12px;
}
.report-content .score-header {
  padding-left: 35px;
  padding-right: 35px;
}
.report-container .score-container .chart {
  border-bottom: 0.3px solid #828282;
}
.report-content .section-title {
  font-weight: 500;
  font-size: 9px;
  line-height: 13px;
}
.report-content .score-chart {
  width: 100%;
}
.score-desc {
  font-weight: 400;
  font-size: 7px;
  line-height: 10px;
  padding-left: 50px;
  padding-right: 50px;
}
.score-area .answers {
  padding-left: 45px;
}
.score-area .title {
  font-weight: 500;
  font-size: 9px;
  line-height: 13px;
  letter-spacing: 0.2px;
}
.score-area .desc {
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.2px;
}
.score-range-container {
  /* width: 75%; */
  /* border-top: 0.5px solid #333333; */
  padding-top: 7px;
}
.score-range-item {
  display: flex;
  align-items: center;
  min-width: 150px;
  margin-top: 11px;
}
.score-range-name {
  font-weight: 600;
  font-size: 7px;
  line-height: 10px;
  color: #151522;
  min-width: 50px;
}
.score-range-status {
  font-weight: 500;
  font-size: 6px;
  line-height: 8px;
  opacity: 0.8;
  padding-left: 8px;
}
.score-range-bar {
  width: 16px;
  height: 3px;
  border-radius: 13px;
}
.score-range-bar.bad {
  background-color: #b00505;
}
.score-range-bar.poor {
  background-color: #cf5f28;
}
.score-range-bar.fair {
  background-color: #ffd362;
}
.score-range-bar.good {
  background-color: #92c83e;
}
.score-range-bar.great {
  background-color: #4c9e45;
}
.score-range-bar.none {
  background: #828282;
  opacity: 0.3;
}
.category-name span.bad {
  color: #b00505;
}
.category-name span.poor {
  color: #cf5f28;
}
.category-name span.fair {
  color: #ffd362;
}
.category-name span.good {
  color: #92c83e;
}
.category-name span.great {
  color: #4c9e45;
}
</style>
