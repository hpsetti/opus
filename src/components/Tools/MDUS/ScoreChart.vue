<template>
  <div
    class="score-chart d-flex flex-direction-column justify-content-center p-0"
  >
    <div>
      <img
        :style="indicatorPosition"
        v-if="score.key !== 'none'"
        src="/static/images/icons/indicator.svg"
      />
      <img
        :style="indicatorPosition"
        v-else
        src="/static/images/icons/indicator_disabled.svg"
      />
    </div>
    <div v-if="score.key !== 'none'">
      <div class="score-bar-chart">
        <div :style="setScoreBarWidth" class="score-bar bad left-rounded"></div>
        <div class="score-bar white"></div>
        <div :style="setScoreBarWidth" class="score-bar poor"></div>
        <div class="score-bar white"></div>
        <div :style="setScoreBarWidth" class="score-bar fair"></div>
        <div class="score-bar white"></div>
        <div :style="setScoreBarWidth" class="score-bar good"></div>
        <div class="score-bar white"></div>
        <div
          :style="setScoreBarWidth"
          class="score-bar great right-rounded"
        ></div>
      </div>
    </div>
    <div v-else>
      <div class="score-bar-chart">
        <div
          :style="setScoreBarWidth"
          class="score-bar disabled left-rounded"
        ></div>
        <div class="score-bar white"></div>
        <div :style="setScoreBarWidth" class="score-bar disabled"></div>
        <div class="score-bar white"></div>
        <div :style="setScoreBarWidth" class="score-bar disabled"></div>
        <div class="score-bar white"></div>
        <div :style="setScoreBarWidth" class="score-bar disabled"></div>
        <div class="score-bar white"></div>
        <div
          :style="setScoreBarWidth"
          class="score-bar disabled right-rounded"
        ></div>
      </div>
    </div>
    <div class="">
      <div class="score-names">
        <div :style="setScoreNameWidth" class="score-name">BAD</div>
        <div :style="setScoreNameWidth" class="score-name">POOR</div>
        <div :style="setScoreNameWidth" class="score-name">FAIR</div>
        <div :style="setScoreNameWidth" class="score-name">GOOD</div>
        <div :style="setScoreNameWidth" class="score-name">GREAT</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreChart',
  props: {
    scoreData: {
      required: true
    },
    score: {
      required: true
    },
    scoreBarWidth: {
      default: 100
    }
  },
  computed: {
    /**
     * Calculate the position of the indicator based on score calculated
     */
    indicatorPosition() {
      const iconWidth = 32;
      const padding = 2;
      /* console.log(this.$parent.$el.clientWidth);
      const availableWidth = Math.floor(this.$parent.$el.clientWidth / 2);
      const reqWidth = this.scoreBarWidth * 5 + 2 * 4;
      let effScoreBarWidth = 0;
      if (reqWidth > availableWidth) {
        effScoreBarWidth = ((reqWidth - availableWidth) / reqWidth) * this.scoreBarWidth;
      } */
      // const position = ((effScoreBarWidth - iconWidth) / 2)
      //  + (this.scoreData[this.score.key !== 'none' ? this.score.key : 'fair'].id * (effScoreBarWidth + padding));
      const position =
        (this.scoreBarWidth - iconWidth) / 2 +
        this.scoreData[this.score.key !== 'none' ? this.score.key : 'fair'].id *
          (this.scoreBarWidth + padding);
      return {
        'padding-left': `${position}px`
      };
    },
    setScoreBarWidth() {
      return {
        width: `${this.scoreBarWidth}px`
      };
    },
    setScoreNameWidth() {
      return {
        width: `${this.scoreBarWidth + 2}px`
      };
    }
  }
};
</script>

<style>
.score-container {
  height: 88px;
  padding-left: 66px;
  padding-right: 32px;
}
.score-chart {
  height: 100%;
}
.score-bar-chart {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.score-bar-chart .score-bar {
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
.score-names {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.score-names .score-name {
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
</style>
