<template>
  <div id="score-popup" class="modal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content col-xs-12 p-0">
        <div class="modal-header">
          <div class="d-flex justify-content-between">
            <div class="title">Your Evaluation Score</div>
            <img
              @click="closePopup"
              class="cursor-pointer"
              src="/static/images/icons/close_icon.svg"
              alt="Close Score Popup"
            />
          </div>
        </div>
        <div class="header-separator"></div>
        <div class="modal-body emergo-lightgreen-bg font-18">
          <div class="score-header d-flex justify-content-between">
            <div class="section-title">Total Usability Score</div>
            <div class="completion-status">
              {{ result.answered }}/{{ questionnaire.total }} complete
            </div>
          </div>
          <div class="score-chart d-flex justify-content-between flex-wrap">
            <div class="d-flex flex-direction-column">
              <div class="name">
                {{ isCompleted ? scoreData[score.key].name : '---' }}
              </div>
              <div class="score-value">
                {{ isCompleted ? `${score.value}%` : '--' }}
              </div>
            </div>
            <div class="chart">
              <ScoreChart :scoreData="scoreData" :score="score"></ScoreChart>
            </div>
          </div>
          <div class="score-desc">
            Your score is between {{ scoreData[score.key].start }} and
            {{ scoreData[score.key].end }}, which is
            <span class="text-bold"
              >"{{ textCapitalize(scoreData[score.key].name) }}"</span
            >
          </div>
          <hr />
          <div class="score-range-container">
            <div class="section-title">Score Range Per Category</div>
            <div class="d-flex flex-wrap justify-content-between">
              <div
                class="score-range-item"
                v-for="name in Object.keys(categories)"
                :key="name"
              >
                <div class="score-range-name">{{ categories[name] }}</div>
                <div
                  class="score-range-bar"
                  :class="
                    isCategoryFullyAnswered(name)
                      ? score.categories[name].key
                      : 'none'
                  "
                ></div>
                <div class="score-range-status">
                  {{
                    isCategoryFullyAnswered(name)
                      ? scoreData[score.categories[name].key].name
                      : '---'
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer col-xs-12 d-flex justify-content-between">
          <div class="col-xs-3 p-0 text-left">
            <BaseButton data-dismiss="modal" variant="secondary"
              >Back</BaseButton
            >
          </div>
          <div class="col-xs-9 p-0 d-flex justify-content-end">
            <BaseButton
              class="mr-15"
              variant="secondary"
              @click="startNewQuestionnaire"
              >Start New Questionnaire</BaseButton
            >
            <BaseButton has-icon>
              <img
                src="/static/images/icons/download_icon_white.svg"
                class="preview-svg"
              />
              <span @click="downloadScore">Download Score</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import ScoreChart from './ScoreChart.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  name: 'ScorePopup',
  components: {
    ScoreChart,
    BaseButton
  },
  props: ['score', 'result', 'questionnaire', 'scoreData', 'categories'],
  computed: {
    isCompleted() {
      return this.result.answered === this.questionnaire.total;
    }
  },
  methods: {
    closePopup() {
      $('#score-popup').modal('hide');
    },
    startNewQuestionnaire() {
      this.$emit('start-new');
      this.closePopup();
    },
    downloadScore() {
      this.$emit('download-score');
      this.closePopup();
    },
    isCategoryFullyAnswered(category) {
      return (
        Object.keys(this.result.answers[category]).length ===
        this.questionnaire[category].count
      );
    },
    /**
     * @summary Transform a single word into Capitalized word where only the
     * first character is capital and remaining all small case letters
     * @example textCapitalize('GOOD') -> 'Good'
     */
    textCapitalize(input) {
      const smallInput = input.toLowerCase();
      return smallInput[0].toUpperCase() + smallInput.substr(1);
    }
  }
};
</script>

<style scoped>
.modal-header {
  background: #ffffff;
  color: #333333;
  border-bottom: none;
  padding: 24px;
}
.header-separator {
  margin-left: 24px;
  margin-right: 24px;
  border-top: 0.5px solid #333333;
}
.modal-header .title {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
}
.modal-body {
  margin: 24px;
  padding: 28px;
}
.modal-footer {
  border: none;
  padding: 0 24px 24px 24px;
  background-color: transparent;
}

.border-bottom {
  border-bottom: 1px solid #bdbdbd;
}

.title {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}
.score-header {
  padding-bottom: 16px;
}
.section-title {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
}
.completion-status {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.score-chart .name {
  font-weight: 300;
  font-size: 42px;
  line-height: 57px;
}
.score-value {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #828282;
}
.score-desc {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: justify;
  margin-top: 28px;
}
.score-range-item {
  display: flex;
  align-items: center;
  min-width: 240px;
  margin-top: 22px;
}
.score-range-name {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #151522;
  min-width: 100px;
}
.score-range-status {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  opacity: 0.8;
  padding-left: 16px;
}
.score-range-bar {
  width: 44px;
  height: 6px;
  border-radius: 26px;
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
</style>
