<template>
  <div>
    <div class="action-bar d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-start align-items-center cursor-pointer" @click="goBack">
        <img class="pl-15 pr-15" src="/static/images/icons/chevron_left_icon.svg"/>
        <span class="text-h4 black-2">HF Validation Test Calculator Report</span>
      </div>
      <img class="pr-30 cursor-pointer" src="/static/images/icons/download_icon.svg" @click="generatePDF"/>
    </div>
    <div class="hf-report">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1200"
        :filename="getFileName()"
        :pdf-quality="4"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="600"
        ref="hfreport"
      >
        <section slot:pdf-content>
          <!-- PDF Content Here -->
          <div class="row m-25">
            <div class="d-flex justify-content-between align-items-center mb-15">
              <img src="/static/images/logos/OPUS_Logo.png" class="logo-img">
              <span class="text-subtitle-2 blue-1">{{ getTodayDate()}}</span>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <div class="col-xs-12 p-0 d-flex align-items-cemter">
                  <!-- <img src="/static/images/icons/chevron_left_white.svg" alt=""> -->
                  <div class="text-h3 blue-1">HF Validation Test Calculator</div>
                </div>
                <div class="col-xs-10 p-0 text-regular-large">
                  This tool estimates timelines and budget for an HF validation usability test. To calculate the result,
                  select the target start or submission date and then adjust the test variables using the sliders.
                </div>
              </div>
            </div>
            <div class="col-xs-12 header_box p-0 mt-10">
              <div class="row">
                <div class="col-xs-12 xs-mb-10">
                  <span class="calculation-text">Test calculation</span>
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0">
              <div class="row">
                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 mt-15 pr-0">
                  <p class="weeks-text">
                    <span :class="{'grey-text' : !testCalculation }">
                      {{ testCalculation ? testCalculation.total_weeks : 0 }}
                      </span> weeks
                  </p>
                </div>
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 mt-15">
                  <p class="weeks-text font-14">
                    <span
                      class="grey-text"
                      :class="{ 'text-emergo-dark-blue': testCalculation && testCalculation.total_weeks > 0 }"
                      >$</span
                    >
                    <span
                      class="grey-text"
                      :class="{ 'text-emergo-dark-blue': testCalculation && testCalculation.total_weeks >=14 }"
                      >$</span
                    >
                    <span
                      class="grey-text"
                      :class="{ 'text-emergo-dark-blue': testCalculation && testCalculation.total_weeks >=17 }"
                      >$</span
                    >
                    <span
                      class="grey-text"
                      :class="{ 'text-emergo-dark-blue': testCalculation && testCalculation.total_weeks >=22 }"
                      >$</span
                    ><span>&nbsp;estimated budget</span>
                  </p>
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4 mt-15 RL_mb-25">
                  <p class="weeks-text" slot="reference">
                    <span :class="{'grey-text' : !testCalculation }">
                      {{ testCalculation ? testCalculation.total_participants : 0 }}
                    </span>
                    <span>participants</span>
                  </p>
                </div>
              </div>
            </div>
            <div id="weeks-progress-wrapper" class="col-xs-12 p-0 xs-display-block sm-display-flex">
              <div>
                <div class="xs-display-flex">
                  <p class="progress-title">Protocol</p>
                  <div class="progress-weeks-bar"
                    :class="[!testCalculation ? 'bg-emergo-light-green' : (testCalculation && +new Date(testCalculation.protocol.start_date) < +currentDate ? 'bg-emergo-orange' : 'bg-emergo-green')]"
                    :style="{width: progressBarWidth['protocol'] + 'px'}"
                    slot="reference"
                  >
                  </div>
                  <!-- <div class="progress-weeks-bar bg-emergo-light-green"></div> -->
                </div>
                <div class="progress-weeks">{{testCalculation ? testCalculation.protocol.weeks : 0}} weeks</div>
                <div class="progress-date">{{testCalculation ? formatDate(testCalculation.protocol.start_date) : '-'}}</div>
                <!-- <div class="progress-weeks">4 weeks</div>
                <div class="progress-date">1 Oct 2021</div> -->
              </div>
              <div>
                <div class="xs-display-flex">
                  <p class="progress-title">Prepare</p>
                  <div class="progress-weeks-bar"
                    :class="[!testCalculation ? 'bg-emergo-light-green' : (testCalculation && +new Date(testCalculation.prepare.start_date) < +currentDate ? 'bg-emergo-orange' : 'bg-emergo-green')]"
                    :style="{width: progressBarWidth['prepare'] + 'px'}"
                    slot="reference"
                  >
                  </div>
                </div>
                <div class="progress-weeks">{{testCalculation ? testCalculation.prepare.weeks : 0}} weeks</div>
              <div class="progress-date">{{testCalculation ? formatDate(testCalculation.prepare.start_date) : '-'}}</div>
                <!-- <div class="progress-weeks">4 weeks</div>
                <div class="progress-date">1 Oct 2021</div> -->
              </div>
              <div>
                <div class="xs-display-flex">
                  <p class="progress-title">Conduct</p>
                  <div class="progress-weeks-bar"
                    :class="[!testCalculation ? 'bg-emergo-light-green' : (testCalculation && +new Date(testCalculation.conduct.start_date) < +currentDate ? 'bg-emergo-orange' : 'bg-emergo-green')]"
                    :style="{width: progressBarWidth['conduct'] + 'px'}"
                    slot="reference"
                  >
                  </div>
                </div>
                <div class="progress-weeks">{{testCalculation ? testCalculation.conduct.weeks : 0}} weeks</div>
                <div class="progress-date">{{testCalculation ? formatDate(testCalculation.conduct.start_date) : '-'}}</div>
                <!-- <div class="progress-weeks">4 weeks</div>
                <div class="progress-date">1 Oct 2021</div> -->
              </div>
              <div>
                <div class="xs-display-flex">
                  <p class="progress-title">Test Report</p>
                  <div class="progress-weeks-bar"
                    :class="[!testCalculation ? 'bg-emergo-light-green' : (testCalculation && +new Date(testCalculation.report.start_date) < +currentDate ? 'bg-emergo-orange' : 'bg-emergo-green')]"
                    :style="{width: progressBarWidth['report'] + 'px'}"
                    slot="reference"
                  >
                  </div>
                  <!-- <div class="progress-weeks-bar bg-emergo-orange"></div> -->
                </div>
                <div class="progress-weeks">{{testCalculation ? testCalculation.report.weeks : 0}} weeks</div>
                <div class="progress-date">{{testCalculation ? formatDate(testCalculation.report.start_date) : '-'}}</div>
                <!-- <div class="progress-weeks">4 weeks</div>
                <div class="progress-date">1 Oct 2021</div> -->
              </div>
              <div>
                <div class="xs-display-flex">
                  <p class="progress-title">HFE Report</p>
                  <div class="progress-weeks-bar"
                    :class="[!testCalculation ? 'bg-emergo-light-green' : (testCalculation && +new Date(testCalculation.submit.start_date) < +currentDate ? 'bg-emergo-orange' : 'bg-emergo-green')]"
                    :style="{width: progressBarWidth['submit'] + 'px'}"
                    slot="reference"
                  >
                  </div>
                  <!-- <div class="progress-weeks-bar bg-emergo-light-green"></div> -->
                </div>
                <div class="progress-weeks">{{testCalculation ? testCalculation.submit.weeks : 0}} weeks</div>
                <div class="progress-date">{{testCalculation ? formatDate(testCalculation.submit.start_date) : '-'}}</div>
                <!-- <div class="progress-weeks">4 weeks</div>
                <div class="progress-date">1 Oct 2021</div> -->
              </div>
              <div>
                <p class="progress-title invisible hidden-xs">Submission</p>
                <div class="progress-weeks-bar hidden-xs"></div>
                <div class="progress-weeks">Submission</div>
                <!-- <div class="progress-date">1 Oct 2021</div> -->
                <div class="progress-date">{{testCalculation ? formatDate(testCalculation.submit.end_date) : '-'}}</div>
              </div>
            </div>
            <div class="col-xs-12 adjust-text"
              :class="[testCalculation && +new Date(testCalculation.protocol.start_date) < +currentDate ? 'text-emergo-orange' :  'text-hide']">
            Adjust target date or ensure activities occuring in the past are complete
          </div>
            <div class="col-xs-12 header_box p-0 mb-5">
              <div class="row target-date">
                <div class="col-xs-12">
                  <span class="calculation-text">Target date</span>
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0">
              <div class="col-xs-4 col-sm-4">
                <span class="progress-weeks" v-if="target === 'Submission done'"
                  >Submission Date</span
                >
                <span class="progress-weeks" v-else-if="target === 'Start date'"
                  >Start Date</span
                >
                <span class="progress-weeks" v-else
                  > -- </span
                >
              </div>
              <div class="col-xs-4 col-sm-6 mb-10">
                <span class="progress-weeks">{{ getDate() }}</span>
              </div>
            </div>
            <div class="col-xs-12 header_box p-0 mb-10 mt-10">
              <div class="row">
                <div class="col-xs-12">
                  <span class="calculation-text">Test variables</span>
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0">
              <div class="panel col-xs-12">
                <div
                  class="panel-heading col-xs-12 pl-0 pr-0"
                  role="tab"
                  id="panel1"
                >
                  <div class="row">
                    <div class="col-xs-12 p-0">
                      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                        Number of distinct user groups
                      </div>
                      <div
                        class="col-xs-12 col-sm-5 col-md-6 col-lg-6 xs-mt10-mb25"
                      >
                        <!-- <vue-slider
                          v-model="testVariables.distinct_user_groups"
                          :class="{'left-50' : !testVariables.distinct_user_groups }"
                          :interval="1"
                          :max="6"
                          :min="1"
                          :marks="[1, 6]"
                          :height="8"
                          :width="'95%'"
                          :dotSize="25"
                          :dotStyle="{ background: testVariables.distinct_user_groups ? '#4C9E45' : '#bae0b7'}"
                          :processStyle="{ background: '#4C9E45' }"
                          :railStyle="{ background: '#bae0b7' }"
                        /> -->
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-2">
                        {{ testVariables.distinct_user_groups ? `${testVariables.distinct_user_groups} ${testVariables.distinct_user_groups > 1 ? 'user groups' : 'user group'}` : "--" }}
                      </div>
                    </div>
                    <div
                      data-toggle="collapse"
                      data-parent="#faq"
                      href="#panel-collapse1"
                      aria-expanded="true"
                      aria-controls="panel-collapse1"
                      class="col-xs-12 p-0 chevron-div"
                    ></div>
                  </div>
                </div>
                <div
                  id="panel-collapse1"
                  class="panel-collapse collapse in col-xs-12 p-0"
                  role="tabpanel"
                  aria-labelledby="panel1"
                  aria-expanded="true"
                >
                  <div class="panel-body">
                    User groups are distinct groups within a broader population of intended device
                    users. User groups are distinct when their characteristics (e.g., experience,
                    clinical training) would likely affect their interactions with the device, or
                    when the tasks they perform using the device are different (e.g., nurse sets
                    up device, physician administers treatment). Many devices have between one and
                    three distinct user groups, but some devices, particularly combination products,
                    can have more.
                  </div>
                </div>
              </div>
              <div class="panel col-xs-12">
                <div
                  class="panel-heading col-xs-12 pl-0 pr-0"
                  role="tab"
                  id="panel2"
                >
                  <div class="row">
                    <div class="col-xs-12 p-0">
                      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                        Number of participants per user group
                      </div>
                      <div
                        class="col-xs-12 col-sm-5 col-md-6 col-lg-6 xs-mt10-mb25"
                      >
                        <!-- <vue-slider
                          v-model="testVariables.participants"
                          :class="{'left-50' : !testVariables.participants }"
                          :interval="1"
                          :max="25"
                          :min="10"
                          :marks="[10, 25]"
                          :height="8"
                          :width="'95%'"
                          :dotSize="25"
                          :dotStyle="
                            testVariables.participants ? testVariables.participants < 15
                            ? { background: '#EB811F' }
                            : { background: '#4C9E45' }
                            : { background: '#bae0b7' }"
                          :processStyle="
                            testVariables.participants < 15
                            ? { background: '#EB811F' }
                            : { background: '#4C9E45' }"
                          :railStyle="
                            testVariables.participants ? testVariables.participants < 15
                            ? { background: '#E0D2B7' }
                            : { background: '#BAE0B7' }
                            : { background: '#bae0b7' }"
                        /> -->
                        <div
                          class="fda-text text-emergo-orange"
                          v-if="testVariables.participants && testVariables.participants < 15">
                          Below FDA recommended 15
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-2">
                        {{
                        testVariables.participants
                          ? `${testVariables.participants} participants per user group`
                          : "--"
                      }}
                      </div>
                    </div>
                    <div
                      data-toggle="collapse"
                      data-parent="#faq"
                      href="#panel-collapse2"
                      aria-expanded="true"
                      aria-controls="panel-collapse2"
                      class="col-xs-12 p-0 chevron-div"
                    ></div>
                  </div>
                </div>
                <div
                  id="panel-collapse2"
                  class="panel-collapse collapse in col-xs-12 p-0"
                  role="tabpanel"
                  aria-labelledby="panel2"
                  aria-expanded="true"
                >
                  <div class="panel-body">
                    The FDA expects manufacturers to include at least 15 representatives
                    of each distinct user group in an HF validation test. We recommend
                    recruiting a few extra participants per user group to account for
                    last-minute cancellations and no-shows. Supplemental HF validation
                    tests, as well as HF validation tests conducted for submission to
                    regulatory bodies outside the US, might include fewer than 15 participants
                    per user group.
                  </div>
                </div>
              </div>
              <div class="panel col-xs-12 mt-50">
                <div
                  class="panel-heading col-xs-12 pl-0 pr-0"
                  role="tab"
                  id="panel3"
                >
                  <div class="row">
                    <div class="col-xs-12 p-0">
                      <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                        Estimated duration of test session
                      </div>
                      <div
                        class="col-xs-12 col-sm-5 col-md-6 col-lg-6 xs-mt10-mb25"
                      >
                        <!-- <vue-slider
                          v-model="testVariables.test_session_duration"
                          :class="{'left-50' : !testVariables.test_session_duration }"
                          :max="4"
                          :min="0.5"
                          :marks="[0.5, 4]"
                          :interval="0.5"
                          :height="8"
                          :width="'95%'"
                          :dotSize="25"
                          :dotStyle="{ background: testVariables.test_session_duration ? '#4C9E45' : '#bae0b7'}"
                          :processStyle="{ background: '#4C9E45' }"
                          :railStyle="{ background: '#bae0b7' }"
                        /> -->
                      </div>
                      <div class="col-xs-12 col-sm-3 col-md-2">
                        {{ testVariables.test_session_duration ? `${testVariables.test_session_duration} ${testVariables.test_session_duration > 1 ? 'hours' : 'hour'}` : "--" }}
                      </div>
                    </div>
                    <div
                      data-toggle="collapse"
                      data-parent="#faq"
                      href="#panel-collapse3"
                      aria-expanded="true"
                      aria-controls="panel-collapse3"
                      class="col-xs-12 p-0 chevron-div"
                    ></div>
                  </div>
                </div>
                <div
                  id="panel-collapse3"
                  class="panel-collapse collapse in col-xs-12 p-0"
                  role="tabpanel"
                  aria-labelledby="panel3"
                  aria-expanded="true"
                >
                  <div class="panel-body">
                    HF validation test sessions typically include the following
                    activities: (1) an introduction to provide the participant with
                    an overview of the test session, (2) a background interview to
                    review the participant’s demographic information and relevant
                    experience, (3) evaluation activities, including use scenarios
                    and knowledge tasks, and (4) a final interview to seek the
                    participant’s feedback regarding the device and root causes
                    for any events that occurred during the evaluation activities. When
                    selecting the test session duration, consider the number of evaluation
                    activities, the duration of each evaluation activity, and the time
                    needed for the final interview. HF validation test sessions are
                    often 1 to 2 hours but can vary depending on the variables mentioned above.
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 header_box p-0 mb-10">
            <div class="row">
              <div class="col-xs-12">
                <span class="calculation-text">Caveat</span>
              </div>
            </div>
          </div>
          <div class="col-xs-12 p-0">
            <div class="col-xs-12 col-sm-11 col-lg-11 caveats-text">
              This tool is for planning purposes only. The actual timeline and
              budget for a specific project might vary significantly from the
              estimate depending on factors such as participant compensation,
              participant training, the number of test locations, travel expenses,
              whether any activities can occur in parallel, the product’s
              complexity, the product’s likely performance during the test (e.g.,
              number of use errors to report), and more.
            </div>
          </div>
          </div>
        </section>
      </vue-html2pdf>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
// import $ from 'jquery';
import dayjs from 'dayjs';
// import VueSlider from 'vue-slider-component';
import VueHtml2pdf from 'vue-html2pdf';
import Loader from '../../UIComponents/Loader.vue';

export default {
  props: [
    'testCalculationData',
    'dateSelected',
    'targetDateType',
    'testVariablesData'
  ],
  data() {
    return {
      testCalculation: null,
      target: '',
      date: null,
      currentDate: new Date(),
      testVariables: {
        distinct_user_groups: null,
        participants: null,
        test_session_duration: null
      },
      progressBarWidth: {
        protocol: 96,
        prepare: 96,
        conduct: 96,
        report: 96,
        submit: 96,
      },
      loaderStatus: false,
    };
  },
  components: {
    // VueSlider,
    VueHtml2pdf,
    Loader,
  },
  watch: {
    testCalculationData: {
      handler() {
        this.testCalculation = this.testCalculationData;
        this.setBarsWidth();
      },
      immediate: true,
    },
    dateSelected: {
      handler() {
        this.date = this.dateSelected;
      },
      immediate: true,
    },
    targetDateType: {
      handler() {
        this.target = this.targetDateType;
      },
      immediate: true,
    },
    testVariablesData: {
      handler() {
        this.testVariables = this.testVariablesData;
      },
      immediate: true,
    },
  },
  created() {
    const today = new Date();
    // Add cst time for select date
    const dateFormat = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    this.currentDate = new Date(dateFormat);
  },
  methods: {
    setBarsWidth() {
      if (this.testCalculation) {
        // const totalWidth = $('#weeks-progress-wrapper').width();
        const totalWidth = 600 - 5 * 65;
        const totalWeeks = this.testCalculation.total_weeks;
        const gridValues = totalWidth / totalWeeks;
        Object.keys(this.progressBarWidth).forEach((key) => {
          // update with Max weeks if we get confirmation
          this.progressBarWidth[key] =
            65 +
            (this.testCalculation[key].weeks > 1
              ? gridValues * this.testCalculation[key].weeks - 1
              : 0);
        });
      }
    },
    getTodayDate() {
      return dayjs().format('MMMM DD, YYYY');
    },
    async generatePDF() {
      this.loaderStatus = true;
      await this.$refs.hfreport.generatePdf();
      this.loaderStatus = false;
    },
    formatDate(date) {
      return dayjs(date).format('DD MMM YYYY');
    },
    getDate() {
      if (this.date) {
        const date = new Date(this.date);
        return dayjs(date).format('MMMM DD, YYYY');
      } return '--';
    },
    getFileName() {
      return `HF_Validation_Test_Calculator_${dayjs().format('MMDDYYYY')}`;
    },
    goBack() {
      // Reload the page as this component shares same URL as main component
      this.$router.go();
    },
  },
};
</script>
<style scoped>
.action-bar {
  height: 80px;
  border-bottom: 0.5px solid #D5D5D5;
  box-shadow: 4px 4px 10px rgb(0 0 0 / 25%);
}
.hf-report {
  margin: 60px;
  border: 1px solid #000000;
}
.adjust-text {
  padding-top: 10px;
  padding-left: 0px;
}
.mt-30 {
  margin-top: 30px;
}
.logo-img {
  width: 110px;
}
.text_body,
.calculation-text,
.page-heading {
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
}
.page-heading {
  font-weight: 300;
  font-size: 24px;
  color: #0b3c61;
  margin: 0;
  margin-bottom: 16px;
}
.m-25 {
  margin: 25px;
}
.mt-13 {
  margin-top: 13px;
}
.mb-10 {
  margin-bottom: 10px;
}
.text_body {
  font-weight: 300;
  font-size: 15px;
  color: #000000;
  margin-bottom: 20px;
}
.calculation-text {
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
}
.weeks-text {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  color: #0b3c61;
}
.grey-text {
  color: lightgrey;
}
.grey-text.text-emergo-dark-blue {
  color: #0b3c61;
}
.ft-35 {
  font-size: 35px;
}
.header_box {
  border-bottom: 1px solid #bdbdbd;
  padding: 0 0 10px 0;
}
.header-buttons button:not(:last-child) {
  margin-right: 25px;
}
.sm-display-flex {
  display: flex;
}
.sm-display-flex > div {
  margin-right: 6px;
}
.progress-weeks-bar {
  height: 8px;
  width: 92px;
  margin-bottom: 10px;
}
.progress-weeks,
.progress-date {
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
}
.option_check {
  display: none;
  float: right;
  color: #4c9e45;
  margin-top: 10px;
}
.el-select-dropdown__item.selected > .options {
  color: #0b3c61;
}
.el-select-dropdown__item.selected > .option_check {
  display: block;
}
.countries_select_list >>> .el-input__icon {
  line-height: 30px;
}
.countries_select_list >>> .el-input__inner {
  padding-left: 20px;
  border-radius: 20px;
  border: 1px solid #4f4f4f;
  height: 32px;
  width: 100% !important;
  font-weight: 500;
  line-height: 20px;
}
.countries_select_list >>> .el-input.is-focus .el-input__inner {
  border-color: #4f4f4f;
}
.countries_select_list:hover >>> .el-input__inner {
  border-color: #4f4f4f;
}
.countries_select_list > .is-focus > .el-input__inner {
  border-color: #4f4f4f;
}
.countries_select_list >>> .el-input .el-select__caret.el-input__icon {
  color: #4f4f4f;
}
.countries_select_list >>> ::placeholder {
  color: #4f4f4f;
}
.countries_select_list >>> input.el-input__inner:-ms-input-placeholder {
  color: #4f4f4f;
}
.countries_select_list >>> input.el-input__inner::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #4f4f4f;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-date-editor >>> .el-input__icon {
  line-height: 32px;
}
.el-date-editor.el-input >>> input.el-input__inner {
  border-radius: 20px;
  height: 32px;
  line-height: 32px;
  border-color: #4f4f4f;
  color: #4f4f4f;
}
.el-date-editor.el-input >>> .el-input__prefix,
.el-input__suffix {
  color: #4f4f4f;
}
.el-date-editor.el-input >>> ::placeholder {
  color: #4f4f4f;
}
.el-date-editor.el-input >>> input.el-input__inner:-ms-input-placeholder {
  color: #4f4f4f;
}
.el-date-editor.el-input >>> input.el-input__inner::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #4f4f4f;
}
div[aria-expanded='true'] .chevron-img {
  transform: rotate(180deg);
}
.panel {
  border-bottom: 0.5px solid #bdbdbd;
  border-radius: 0;
  margin: 10px 0 10px 0;
}
.panel-heading .row {
  display: flex;
  margin: 0 0 20px 0;
}
.panel-heading {
  font-family: Nunito;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
}
.panel-body {
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  width: 100%;
  margin-bottom: 15px;
  margin-top: -25px;
}
.panel-heading .chevron-div {
  flex: 1;
  margin: auto;
  cursor: pointer;
}
.fda-text {
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  width: 95%;
}
@media screen and (max-width: 767px) {
  .m-25 {
    margin: 25px 15px;
  }
  .xs-mb-10 {
    margin-bottom: 10px;
  }
  .xs-mt10-mb25 {
    margin-bottom: 25px;
    margin-top: 10px;
  }
  .xs-display-block {
    display: block;
  }
  .xs-display-block > div {
    margin: 0 0 15px 0;
  }
  .weeks-text {
    font-size: 35px;
  }
  .ft-35 {
    font-size: 30px;
  }
  .xs-display-flex {
    display: flex;
  }
  .xs-display-flex .progress-weeks-bar {
    margin: 8px 0 0 10px;
  }
  .xs-display-flex .progress-title {
    margin: 0;
    width: 20%;
  }
  .panel-body {
    width: 100%;
  }
}

@media screen and (min-width: 768px) {
  .header-buttons {
    text-align: right;
  }
  .top-15 {
    top: 15px;
  }
}

.left-50 >>> .vue-slider-dot {
  left: 50% !important;
}

.mt-20 {
  margin-top: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}

.estimate-margin {
  margin-top: 100px !important;
}

.caveats-text {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  padding-left: 30px;
}
.learn-more-display-flex {
  display: flex;
  flex-direction: row;
}
.learn-more-display-flex h1 {
  margin-top: 20px;
}
.text-hide {
  display: none;
}
.learn-more-text {
  padding-right: 140px;
}
.target-date {
  padding-top: 10px;
}
/* Change to global */
.btn.wd-210 {
  width: auto;
}
</style>
