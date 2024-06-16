<template>
  <div class="panel survey-panel" :class="label">
    <div :style="cardTopBorder"></div>
    <div class="panel-heading">
      <div
        class="panel-title cursor-pointer"
        data-toggle="collapse"
        data-parent="#plans-accordion"
        :data-target="`#${label}`"
      >
        <div class="d-flex align-items-center">
          <div
            class="col-xs-6 category d-flex justify-content-start align-items-center"
          >
            <img
              v-if="!showCard && numAnswered === questions.count"
              src="/static/images/icons/circle_check.svg"
            />
            <div class="title">{{ categories[label] }}</div>
          </div>
          <div
            class="col-xs-6 score d-flex justify-content-end align-items-center"
          >
            <div class="status">
              {{ numAnswered }}/{{ questions.count }} completed
            </div>
            <div
              class="title"
              v-if="numAnswered === questions.count"
              :style="scoreColor"
            >
              {{ score.key !== 'none' ? scoreData[score.key].name : '' }}
            </div>
            <img
              src="/static/images/icons/chevron_down_new.svg"
              :class="!showCard ? 'show-card' : 'hide-card'"
            />
          </div>
        </div>
      </div>
    </div>
    <div :id="label" class="panel-collapse collapse in">
      <div class="survey-panel-content">
        <div
          class="question-container d-flex justify-content-start"
          v-for="(q, index) in questions.count"
          :key="index"
        >
          <div class="qno-container">
            <div class="qno" :class="{ selected: isAnswered(index) }">
              {{ index + 1 }}
            </div>
          </div>
          <div class="question">
            <div class="title">{{ questions[index + 1] }}</div>
            <div class="options">
              <div
                class="option"
                v-for="option in Object.keys(options)"
                :key="option"
              >
                <BaseRadio
                  v-model="answers[index]"
                  :option="options[option]"
                ></BaseRadio>
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
import BaseRadio from '../../UIComponents/BaseRadio.vue';

export default {
  name: 'SurveyCard',
  props: {
    label: {
      required: true,
      type: String
    },
    categories: {
      required: true
    },
    questions: {
      required: true
    },
    answers: {
      required: true
    },
    scoreData: {
      required: true
    },
    calculateScore: {
      required: true
    }
  },
  components: {
    BaseRadio
  },
  mounted() {
    $(`#${this.label}`).on('show.bs.collapse', () => {
      this.showCard = true;
    });
    $(`#${this.label}`).on('hide.bs.collapse', () => {
      this.showCard = false;
    });
  },
  data() {
    return {
      scoreKeys: ['bad', 'poor', 'fair', 'good', 'great'],
      showCard: true, // Is the survey card expanded?
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
      },
      score: null
    };
  },
  computed: {
    numAnswered() {
      return Object.keys(this.answers).length;
    },
    /**
     * Determine the border color based on user selection
     */
    scoreColor() {
      const color =
        this.score && this.score.key
          ? this.scoreData[this.score.key].color
          : '#000';
      return { color };
    },
    /**
     * Show the card top border variants based on category score and whether
     * the card is collapsed or not
     */
    cardTopBorder() {
      let color = '#00518A';
      let width = '0%';
      const bgColor = '#D3D6D9';
      const totalQuestions = this.questions.count;
      const numAnswered = Object.keys(this.answers).length;
      if (!this.showCard && numAnswered === totalQuestions) {
        color = this.scoreColor.color;
      }
      if (numAnswered !== 0) {
        width = `${(numAnswered / totalQuestions) * 100}%`;
      }
      return {
        'background-color': bgColor,
        'background-image': `linear-gradient(${color}, ${color})`,
        'background-size': width,
        height: '4px'
      };
    }
  },
  watch: {
    answers: {
      handler() {
        this.$emit('update:answers', this.answers);
        this.score = this.calculateScore(
          Object.values(this.answers),
          this.label
        );
      },
      deep: true
    },
    numAnswered: {
      handler(newNum, oldNum) {
        if (newNum !== oldNum && newNum === this.questions.count) {
          $(`#${this.label}`).collapse('hide');
        }
      }
    }
  },
  methods: {
    isAnswered(index) {
      return Object.keys(this.answers).includes(index.toString());
    }
  }
};
</script>

<style>
.panel.survey-panel {
  margin-bottom: 19px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px 4px 10px 10px;
  border: none;
}
.panel-title {
  width: 100%;
  font-size: 18px;
  color: #00518a;
}
.category .title {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.4px;
  color: #0b3c61;
  padding-top: 10px;
  padding-bottom: 10px;
}
.panel-title.collapsed .category img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  display: block;
}
.panel-title .category img {
  display: none;
}
.score .status {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #333333;
  margin-right: 20px;
}
.score .title {
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: right;
  margin-right: 32px;
  min-width: 62px;
}
.score .show-card {
  transform: rotate(0deg);
  transition: 0.5s;
}
.score .hide-card {
  transform: rotate(-180deg);
  transition: 0.5s;
}
.survey-panel .question-container:first-child {
  border-top: 0.5px solid #bdbdbd;
  padding-top: 24px;
}
.survey-panel .question-container {
  margin: 0px 40px 24px 40px;
}
.survey-panel .question-container .qno {
  width: 32px;
  height: 32px;
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #333333;
  border: 4px solid #d3d6d9;
  border-radius: 50%;
  box-shadow: 1.62px 1.62px 4px rgba(0, 0, 0, 0.25);
}
.survey-panel .question-container .qno.selected {
  border: 4px solid #4c9e45;
}
.survey-panel .question-container .question {
  margin-left: 18px;
  padding-bottom: 32px;
  padding-top: 5px;
  border-bottom: 1px solid rgba(11, 60, 97, 0.1);
  width: 100%;
}
.survey-panel .question-container .question .options {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 24px;
  flex-wrap: wrap;
}
.survey-panel .question-container .question .title {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}

.survey-panel .question-container .question .option:nth-last-child(2) {
  padding-right: 130px;
}

.survey-panel .question-container .question .option {
  display: inline-block;
  min-width: 120px;
  padding-right: 30px;
}
.survey-panel .question-container .question .option label {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #000;
  padding-left: 12px;
}
</style>
