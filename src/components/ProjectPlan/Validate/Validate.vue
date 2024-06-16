<template>
  <div class="content-wrappper">
    <div v-if="!previewMode">
      <div class="row welcome-banner mr-0">
        <div class="col-xs-12 p-0">
          <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
            <img
              @click="navigateBack"
              class="cursor-pointer"
              src="/static/images/icons/chevron_left_white.svg"
              alt=""
            />
            <div class="welcome-common-header pl-25 fw-300">
              HF Validation Test Calculator
            </div>
          </div>
          <div class="col-xs-12 font-18 fw-700 pl-40 mb-5">
            Tool instructions
          </div>
          <div
            class="col-xs-12 tools-desc pl-40 d-flex align-items-end welcome-banner-description pr-0"
          >
            <div class="col-xs-12 col-sm-7 font-14 fw-400 p-0">
              This tool estimates timelines and budget for an HF validation
              usability test. To calculate the result, select the target start
              or submission date and then adjust the test variables using the
              sliders.
            </div>
            <div
              class="col-xs-12 col-sm-5 p-0 d-flex justity-content-right col-gap-10"
            >
              <BaseButton
                size="lg"
                variant="secondary"
                @click="reset"
                :disabled="!testCalculation"
              >
                Clear
              </BaseButton>
              <BaseButton
                size="lg"
                variant="secondary"
                @click="generatePDF"
                :disabled="!testCalculation"
              >
                View Report
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-25">
        <div class="col-xs-12 header_box p-0">
          <div class="row">
            <div class="col-xs-12 col-sm-7 xs-mb-10 mb-10 top-15">
              <span class="calculation-text">Test calculation</span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 p-0 mb-10">
          <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 RL_mt-25 pr-0">
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div class="header_box"># weeks</div>
                  <p class="mt-10 break-word">
                    The total number of weeks to conduct all activities (e.g.,
                    write protocol, conduct test sessions) in series. The
                    timeline can be reduced by conducting some activities in
                    parallel. For example, finalizing the test protocol in
                    parallel with participant recruitment or by engaging
                    additional test teams to conduct parallel test sessions.
                  </p>
                </template>
                <p class="weeks-text">
                  <span class="" :class="{ 'grey-text': !testCalculation }">{{
                    testCalculation ? testCalculation.total_weeks : 0
                  }}</span>
                  <span class="md-ft-35 ml-10">weeks</span>
                </p>
              </OpusPopoverToolTip>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 RL_mt-25">
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box">Estimated budget (USD)</div>
                    <p class="mt-10 text-emergo-black">
                      <span class="estimated-budget-rate">$:</span
                      ><span>$0 - $74,000</span><br />
                      <span class="estimated-budget-rate">$$:</span
                      ><span>$75,000 - $124,000</span><br />
                      <span class="estimated-budget-rate">$$$:</span
                      ><span>$125,000 - $199,000</span><br />
                      <span class="estimated-budget-rate">$$$$:</span
                      ><span>$200,000+</span>
                    </p>
                    <p class="mt-10 break-word">
                      The estimated budget includes the estimated labor and
                      expenses associated with conducting the HF validation
                      test.
                    </p>
                  </div>
                </template>
                <p class="weeks-text">
                  <span
                    class="grey-text"
                    :class="{
                      'text-emergo-dark-blue':
                        testCalculation && testCalculation.total_weeks > 0
                    }"
                    >$</span
                  >
                  <span
                    class="grey-text"
                    :class="{
                      'text-emergo-dark-blue':
                        testCalculation && testCalculation.total_weeks >= 14
                    }"
                    >$</span
                  >
                  <span
                    class="grey-text"
                    :class="{
                      'text-emergo-dark-blue':
                        testCalculation && testCalculation.total_weeks >= 17
                    }"
                    >$</span
                  >
                  <span
                    class="grey-text"
                    :class="{
                      'text-emergo-dark-blue':
                        testCalculation && testCalculation.total_weeks >= 22
                    }"
                    >$</span
                  ><span class="md-ft-35">&nbsp;estimated budget</span>
                </p>
              </OpusPopoverToolTip>
            </div>
            <div
              class="col-xs-12 col-sm-4 col-md-4 RL_mt-25 RL_mb-25 text-nowrap break-space"
            >
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box"># participants</div>
                    <p class="mt-10 break-word-initial">
                      The total number of participants in the HF validation
                      test. Specifically, the number of distinct user groups
                      multiplied by the number of participants per user group.
                    </p>
                  </div>
                </template>
                <p class="weeks-text">
                  <span :class="{ 'grey-text': !testCalculation }">
                    {{
                      testCalculation ? testCalculation.total_participants : 0
                    }}
                  </span>
                  <span class="md-ft-35">participants</span>
                </p>
              </OpusPopoverToolTip>
            </div>
          </div>
        </div>
        <div
          id="weeks-progress-wrapper"
          class="col-xs-10 p-0 xs-display-block sm-display-flex"
        >
          <div>
            <div class="xs-display-flex">
              <p class="progress-title">Protocol</p>
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box">Protocol</div>
                    <p class="mt-10 break-word">
                      The HF validation protocol defines how you will validate
                      that the product can be used safely and effectively by
                      intended users. The protocol describes the test
                      participants, recruiting method, test materials,
                      environment, test personnel, evaluation activities, data
                      collection and analysis methods, and reporting approach.
                    </p>
                    <p>
                      If you are developing a product for the US market,
                      consider submitting your protocol for FDA review. FDA
                      typically takes 2-4 months to review and comment on a
                      protocol.
                    </p>
                  </div>
                </template>
                <div
                  class="progress-weeks-bar"
                  :class="[
                    !testCalculation
                      ? 'bg-emergo-light-green'
                      : testCalculation &&
                        +new Date(testCalculation.protocol.start_date) <
                          +currentDate
                      ? 'bg-emergo-orange'
                      : 'bg-emergo-green'
                  ]"
                  :style="{ width: progressBarWidth['protocol'] + 'px' }"
                ></div>
              </OpusPopoverToolTip>
            </div>
            <div class="progress-weeks">
              {{ testCalculation ? testCalculation.protocol.weeks : 0 }} weeks
            </div>
            <div class="progress-date">
              {{
                testCalculation
                  ? formatDate(testCalculation.protocol.start_date)
                  : '-'
              }}
            </div>
          </div>
          <div>
            <div class="xs-display-flex">
              <p class="progress-title">Prepare</p>
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box">Prepare</div>
                    <p class="mt-10 break-word">
                      The prepare step includes the logistics, recruitment, and
                      general activities that you should complete to ensure you
                      are ready to conduct the test sessions. Preparation
                      activities can include reserving the research facility,
                      obtaining IRB approval of the protocol, managing
                      participant recruitment, developing data collection
                      materials, shipping supplies, and conducting a dry run.
                    </p>
                  </div>
                </template>
                <div
                  class="progress-weeks-bar"
                  :class="[
                    !testCalculation
                      ? 'bg-emergo-light-green'
                      : testCalculation &&
                        +new Date(testCalculation.prepare.start_date) <
                          +currentDate
                      ? 'bg-emergo-orange'
                      : 'bg-emergo-green'
                  ]"
                  :style="{ width: progressBarWidth['prepare'] + 'px' }"
                ></div>
              </OpusPopoverToolTip>
            </div>
            <div class="progress-weeks">
              {{ testCalculation ? testCalculation.prepare.weeks : 0 }} weeks
            </div>
            <div class="progress-date">
              {{
                testCalculation
                  ? formatDate(testCalculation.prepare.start_date)
                  : '-'
              }}
            </div>
          </div>
          <div>
            <div class="xs-display-flex">
              <p class="progress-title">Conduct</p>
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box">Conduct</div>
                    <p class="mt-10 break-word">
                      The test conduct step includes the time to conduct all the
                      test sessions. It also includes time for set up and break
                      down before and after the test, respectively. The
                      timelines assume that all test sessions occur in series,
                      but you can reduce the number of weeks by engaging
                      additional test teams to conduct test sessions in
                      parallel.
                    </p>
                  </div>
                </template>
                <div
                  class="progress-weeks-bar"
                  :class="[
                    !testCalculation
                      ? 'bg-emergo-light-green'
                      : testCalculation &&
                        +new Date(testCalculation.conduct.start_date) <
                          +currentDate
                      ? 'bg-emergo-orange'
                      : 'bg-emergo-green'
                  ]"
                  :style="{ width: progressBarWidth['conduct'] + 'px' }"
                ></div>
              </OpusPopoverToolTip>
            </div>
            <div class="progress-weeks">
              {{ testCalculation ? testCalculation.conduct.weeks : 0 }} weeks
            </div>
            <div class="progress-date">
              {{
                testCalculation
                  ? formatDate(testCalculation.conduct.start_date)
                  : '-'
              }}
            </div>
          </div>
          <div>
            <div class="xs-display-flex">
              <p class="progress-title">Test Report</p>
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box">Test Report</div>
                    <p class="mt-10 break-word">
                      The HF validation test report documents the results of the
                      HF validation test. The test report should cite all use
                      errors, instances of moderator assistance, close calls,
                      and difficulties that occurred during the test. The report
                      should also present participant-reported root causes, as
                      well as your root cause analysis based on your experience
                      and professional judgment.
                    </p>
                  </div>
                </template>
                <div
                  class="progress-weeks-bar"
                  :class="[
                    !testCalculation
                      ? 'bg-emergo-light-green'
                      : testCalculation &&
                        +new Date(testCalculation.report.start_date) <
                          +currentDate
                      ? 'bg-emergo-orange'
                      : 'bg-emergo-green'
                  ]"
                  :style="{ width: progressBarWidth['report'] + 'px' }"
                ></div>
              </OpusPopoverToolTip>
            </div>
            <div class="progress-weeks">
              {{ testCalculation ? testCalculation.report.weeks : 0 }} weeks
            </div>
            <div class="progress-date">
              {{
                testCalculation
                  ? formatDate(testCalculation.report.start_date)
                  : '-'
              }}
            </div>
          </div>
          <div>
            <div class="xs-display-flex">
              <p class="progress-title">HFE Report</p>
              <OpusPopoverToolTip position="bottom">
                <template #content>
                  <div>
                    <div class="header_box">HFE Report</div>
                    <p class="mt-10 break-word">
                      This step includes the time to complete the final sections
                      of the HFE Report that you must complete after conducting
                      the HF validation test. Specifically, you must analyze the
                      test findings and perform a rigorous residual risk
                      analysis. Chapter 8 of the HFE Report should include the
                      test results, as well as your written residual risk
                      commentaries. This step also includes writing the HFE
                      Report’s conclusion (Chapter 1). For non-FDA submissions,
                      this step includes the time to perform residual risk
                      analysis and to compile the final documentation (e.g.,
                      documents to show compliance with IEC 62366-1).
                    </p>
                  </div>
                </template>
                <div
                  class="progress-weeks-bar"
                  :class="[
                    !testCalculation
                      ? 'bg-emergo-light-green'
                      : testCalculation &&
                        +new Date(testCalculation.submit.start_date) <
                          +currentDate
                      ? 'bg-emergo-orange'
                      : 'bg-emergo-green'
                  ]"
                  :style="{ width: progressBarWidth['submit'] + 'px' }"
                ></div>
              </OpusPopoverToolTip>
            </div>
            <div class="progress-weeks">
              {{ testCalculation ? testCalculation.submit.weeks : 0 }} weeks
            </div>
            <div class="progress-date">
              {{
                testCalculation
                  ? formatDate(testCalculation.submit.start_date)
                  : '-'
              }}
            </div>
          </div>
          <div>
            <p class="progress-title invisible hidden-xs">Submission</p>
            <div class="progress-weeks-bar hidden-xs"></div>
            <OpusPopoverToolTip position="bottom">
              <template #content>
                <div>
                  <div class="header_box">Submission</div>
                  <p class="mt-10 break-word">
                    Submission is the date on which your human factors
                    documentation is complete, so it is ready for a regulatory
                    submission.
                  </p>
                </div>
              </template>
              <div class="progress-weeks">Submission</div>
            </OpusPopoverToolTip>
            <div class="progress-date">
              {{
                testCalculation
                  ? formatDate(testCalculation.submit.end_date)
                  : '-'
              }}
            </div>
          </div>
        </div>
        <div
          class="col-xs-12 adjust-text mb-10"
          :class="[
            testCalculation &&
            +new Date(testCalculation.protocol.start_date) < +currentDate
              ? 'text-emergo-orange'
              : 'text-hide'
          ]"
        >
          Adjust target date or ensure activities occuring in the past are
          complete
        </div>
        <div class="col-xs-12 header_box p-0 mb-10 mt-10">
          <div class="row">
            <div class="col-xs-12 mt-10">
              <span class="calculation-text">Target date</span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 p-0 mb-10">
          <div class="col-xs-12 col-sm-5 col-md-3 mb-10">
            <div class="col-xs-12"><p class="progress-weeks">Target</p></div>
            <div class="col-xs-12 p-0 countries_select_list">
              <OpusSelect
                v-model="target"
                :options="targetOptions"
                placeholder="Select a target"
              >
              </OpusSelect>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 mb-10">
            <div class="row">
              <div class="col-xs-4 col-md-3">
                <div class="col-xs-12"><p class="progress-weeks">Day</p></div>
                <div class="col-xs-12 p-0">
                  <DatePicker
                  class="vue-date-picker day"
                  v-model="day"
                  format="DD"
                  placeholder="--"
                  @change="getDataCalculation2()"
                  lang="en">
                  </DatePicker>
                </div>
              </div>
              <div class="col-xs-4 col-md-3">
                <div class="col-xs-12"><p class="progress-weeks">Month</p></div>
                <div class="col-xs-12 p-0">
                  <DatePicker
                  class="vue-date-picker month"
                    v-model="month"
                    format="MMM"
                    placeholder="--"
                    type="month"
                    @change="getDataCalculation2()"
                  >
                  </DatePicker>
                </div>
              </div>
              <div class="col-xs-4 col-md-3">
                <div class="col-xs-12"><p class="progress-weeks">Year</p></div>
                <div class="col-xs-12 p-0">
                  <DatePicker
                  class="vue-date-picker year"
                    v-model="year"
                    format="YYYY"
                    type="year"
                    placeholder="--"
                    @change="getDataCalculation2()"
                    
                  >
                  </DatePicker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 header_box p-0 mb-10 mt-10">
          <div class="row">
            <div class="col-xs-12">
              <span class="calculation-text">Test variables</span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 p-0 mb-10">
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
                      @change="getTestCalculationDetails()"
                      :class="{
                        'left-50': !testVariables.distinct_user_groups
                      }"
                      v-model="testVariables.distinct_user_groups"
                      :interval="1"
                      :max="6"
                      :min="1"
                      :marks="[1, 6]"
                      :tooltip="'none'"
                      :height="8"
                      :width="'95%'"
                      :dotSize="25"
                      :dotStyle="{
                        background: testVariables.distinct_user_groups
                          ? '#4C9E45'
                          : '#bae0b7'
                      }"
                      :processStyle="{ background: '#4C9E45' }"
                      :railStyle="{ background: '#bae0b7' }"
                    /> -->
                    <div
                      class="fda-text"
                      v-if="!testVariables.distinct_user_groups"
                    >
                      Click and drag
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-3 col-md-2">
                    {{
                      testVariables.distinct_user_groups
                        ? `${testVariables.distinct_user_groups} ${
                            testVariables.distinct_user_groups > 1
                              ? 'user groups'
                              : 'user group'
                          }`
                        : '--'
                    }}
                  </div>
                </div>
                <div
                  data-toggle="collapse"
                  data-parent="#faq"
                  href="#panel-collapse1"
                  aria-expanded="false"
                  aria-controls="panel-collapse1"
                  class="col-xs-12 p-0 chevron-div"
                >
                  <img
                    class="chevron-img float-right"
                    src="/static/images/icons/chevron_down.svg"
                  />
                </div>
              </div>
            </div>
            <div
              id="panel-collapse1"
              class="panel-collapse collapse col-xs-12 p-0"
              role="tabpanel"
              aria-labelledby="panel1"
            >
              <div class="panel-body">
                User groups are distinct groups within a broader population of
                intended device users. User groups are distinct when their
                characteristics (e.g., experience, clinical training) would
                likely affect their interactions with the device, or when the
                tasks they perform using the device are different (e.g., nurse
                sets up device, physician administers treatment). Many devices
                have between one and three distinct user groups, but some
                devices, particularly combination products, can have more.
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
                      @change="getTestCalculationDetails()"
                      :class="{ 'left-50': !testVariables.participants }"
                      v-model="testVariables.participants"
                      :interval="1"
                      :max="25"
                      :min="10"
                      :marks="[10, 25]"
                      :tooltip="'none'"
                      :height="8"
                      :width="'95%'"
                      :dotSize="25"
                      :dotStyle="
                        testVariables.participants
                          ? testVariables.participants < 15
                            ? { background: '#EB811F' }
                            : { background: '#4C9E45' }
                          : { background: '#bae0b7' }
                      "
                      :processStyle="
                        testVariables.participants < 15
                          ? { background: '#EB811F' }
                          : { background: '#4C9E45' }
                      "
                      :railStyle="
                        testVariables.participants
                          ? testVariables.participants < 15
                            ? { background: '#E0D2B7' }
                            : { background: '#BAE0B7' }
                          : { background: '#bae0b7' }
                      "
                    /> -->
                    <div class="fda-text" v-if="!testVariables.participants">
                      Click and drag
                    </div>
                    <div
                      class="fda-text text-emergo-orange"
                      v-if="
                        testVariables.participants &&
                        testVariables.participants < 15
                      "
                    >
                      Below FDA recommended 15
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-3 col-md-2">
                    {{
                      testVariables.participants
                        ? `${testVariables.participants} participants per user group`
                        : '--'
                    }}
                  </div>
                </div>
                <div
                  data-toggle="collapse"
                  data-parent="#faq"
                  href="#panel-collapse2"
                  aria-expanded="false"
                  aria-controls="panel-collapse2"
                  class="col-xs-12 p-0 chevron-div"
                >
                  <img
                    class="chevron-img float-right"
                    src="/static/images/icons/chevron_down.svg"
                  />
                </div>
              </div>
            </div>
            <div
              id="panel-collapse2"
              class="panel-collapse collapse col-xs-12 p-0"
              role="tabpanel"
              aria-labelledby="panel2"
            >
              <div class="panel-body">
                The FDA expects manufacturers to include at least 15
                representatives of each distinct user group in an HF validation
                test. We recommend recruiting a few extra participants per user
                group to account for last-minute cancellations and no-shows.
                Supplemental HF validation tests, as well as HF validation tests
                conducted for submission to regulatory bodies outside the US,
                might include fewer than 15 participants per user group.
              </div>
            </div>
          </div>
          <div class="panel col-xs-12">
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
                      @change="getTestCalculationDetails()"
                      :class="{
                        'left-50': !testVariables.test_session_duration
                      }"
                      v-model="testVariables.test_session_duration"
                      :max="4"
                      :min="0.5"
                      :marks="[0.5, 4]"
                      :interval="0.5"
                      :tooltip="'none'"
                      :height="8"
                      :width="'95%'"
                      :dotSize="25"
                      :dotStyle="{
                        background: testVariables.test_session_duration
                          ? '#4C9E45'
                          : '#bae0b7'
                      }"
                      :processStyle="{ background: '#4C9E45' }"
                      :railStyle="{ background: '#bae0b7' }"
                    /> -->
                    <div
                      class="fda-text"
                      v-if="!testVariables.test_session_duration"
                    >
                      Click and drag
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-3 col-md-2">
                    {{
                      testVariables.test_session_duration
                        ? `${testVariables.test_session_duration} ${
                            testVariables.test_session_duration > 1
                              ? 'hours'
                              : 'hour'
                          }`
                        : '--'
                    }}
                  </div>
                </div>
                <div
                  data-toggle="collapse"
                  data-parent="#faq"
                  href="#panel-collapse3"
                  aria-expanded="false"
                  aria-controls="panel-collapse3"
                  class="col-xs-12 p-0 chevron-div"
                >
                  <img
                    class="chevron-img float-right"
                    src="/static/images/icons/chevron_down.svg"
                  />
                </div>
              </div>
            </div>
            <div
              id="panel-collapse3"
              class="panel-collapse collapse col-xs-12 p-0"
              role="tabpanel"
              aria-labelledby="panel3"
            >
              <div class="panel-body">
                HF validation test sessions typically include the following
                activities: (1) an introduction to provide the participant with
                an overview of the test session, (2) a background interview to
                review the participant’s demographic information and relevant
                experience, (3) evaluation activities, including use scenarios
                and knowledge tasks, and (4) a final interview to seek the
                participant’s feedback regarding the device and root causes for
                any events that occurred during the evaluation activities. When
                selecting the test session duration, consider the number of
                evaluation activities, the duration of each evaluation activity,
                and the time needed for the final interview. HF validation test
                sessions are often 1 to 2 hours but can vary depending on the
                variables mentioned above.
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 header_box p-0 mb-10 mt-40">
          <div class="row">
            <div class="col-xs-12">
              <span class="calculation-text">Caveat</span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 p-0">
          <div class="col-xs-12 col-sm-11 col-lg-10 caveats-text">
            This tool is for planning purposes only. The actual timeline and
            budget for a specific project might vary significantly from the
            estimate depending on factors such as participant compensation,
            participant training, the number of test locations, travel expenses,
            whether any activities can occur in parallel, the product’s
            complexity, the product’s likely performance during the test (e.g.,
            number of use errors to report), and more.
          </div>
        </div>
        <div class="col-xs-12 header_box no-border p-0 mt-50">
          <div class="row">
            <div class="col-xs-12">
              <span class="calculation-text">Learn more</span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 p-0 mb-10 learn-more-display-flex">
          <div class="sm-wd-350">
            <h1 class="text-emergo-green">Start HFE Report</h1>
            <p class="learn-more-text">
              Did you know you can (and should!) start your HFE Report before
              conducting your HF validation test? Check out our HFE Report
              template and training to learn more.
            </p>
            <BaseButton class="mt-10 xs-mb-30" @click="openInfo()"
              >Learn about HFE Reports</BaseButton
            >
          </div>
          <div class="sm-wd-350">
            <h1 class="text-emergo-green">We’re here to help</h1>
            <p class="learn-more-text">
              Would you like a quote for an HF validation test? Or are you
              unsure if you’re ready for HF validation? Our consulting team
              would be pleased to answer your questions.
            </p>
            <BaseButton class="mt-10" @click="redirectToContact"
              >Contact us</BaseButton
            >
          </div>
        </div>
      </div>
      <HfeModal
        :trainingInfo="trainingInfo"
        :userId="userId"
        @setCartInfo="setCartInfo"
        :loaderPopup="loaderStatus"
      />
      <add-remove-cart-popup
        @closeAddRemoveCart="closeAddRemoveCart"
        :cartInfo="cartInfo"
        @removeFromCart="removeFromCart"
      ></add-remove-cart-popup>
    </div>
    <div v-else>
      <validatePDF
        :testCalculationData="testCalculation"
        :dateSelected="day"
        :targetDateType="target"
        :testVariablesData="copyOfTestVariables"
        ref="childComponentRef"
      />
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import dayjs from 'dayjs';
// import VueSlider from 'vue-slider-component';
import DatePicker from 'vue-datepicker-next';
import OpusPopoverToolTip from '@/components/UIComponents/OpusPopoverToolTip.vue';
import OpusSelect from '@/components/UIComponents/OpusSelect.vue';
// import { Popover } from 'element-ui';
// import validatePDF from './ValidatePDF.vue';
import Loader from '../../UIComponents/Loader.vue';
import getCalculationData from '../../../apis/hfvalidation';
import HfeModal from './HfeModal.vue';
import { getTrainingData } from '../../../apis/lmsTraining';
import { removeFromCart } from '../../../apis/cart';
import AddRemoveCartPopup from '../../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import EventBus from '../../../utils/event-bus';
import postMarketoFormData from '../../../apis/marketo';

export default {
  name: 'HFValidationCalculator',
  props: ['userId', 'accountId'],
  data() {
    return {
      trainingInfo: null,
      cartInfo: {},
      target: 'Start date',
      targetOptions: ['Start Date', 'Submission Date'],
      month: '',
      year: '',
      day: '',
      testVariables: {
        distinct_user_groups: null,
        participants: null,
        test_session_duration: null
      },
      currentDate: new Date(),
      copyOfTestVariables: null,
      testCalculation: null,
      progressBarWidth: {
        protocol: 96,
        prepare: 96,
        conduct: 96,
        report: 96,
        submit: 96
      },
      previewMode: false,
      loaderStatus: false
    };
  },
  components: {
    // VueSlider,
    DatePicker,
    // validatePDF,
    HfeModal,
    Loader,
    AddRemoveCartPopup,
    BaseButton,
    // 'el-popover': Popover,
    OpusPopoverToolTip,
    OpusSelect
  },
  created() {
    this.getHfeData();
    const today = new Date();
    // Add cst time for select date
    const dateFormat = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    this.currentDate = new Date(dateFormat);
  },
  mounted() {
    window.addEventListener('resize', this.setBarsWidth);
  },
  watch: {
    testVariables: {
      deep: true,
      handler() {
        this.copyOfTestVariables = { ...this.testVariables };
      }
    },
    target: {
      handler: 'targetSelected',
      immediate: true
    }
  },
  methods: {
    async getHfeData() {
      this.loaderStatus = true;
      const response = await getTrainingData();
      this.trainingData = response.lms_user_course_list;
      this.trainingInfo = this.trainingData.filter(
        (item) => item.course_id === 9
      );
      const finalData = this.trainingInfo.map((item) => {
          if (item.cart_status && item.cart_status.purchase_status === 'REMOVE_FROM_CART') {
            item.cart_status.purchase_status = 'GO_TO_CART';
          }
          return item;
        });
        this.trainingInfo = finalData;
      this.loaderStatus = false;
    },
    closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.getHfeData();
    },
    setCartInfo(cartDetails) {
      this.cartInfo = { ...cartDetails.cartInfo };
      this.selectedCartItem = cartDetails.item;
      if ($('#modal_video').hasClass('in') && this.cartInfo.type === 'add') {
        $('#modal_video').modal('hide');
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    async removeFromCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const res = await removeFromCart(
        this.selectedCartItem.cart_status.cart_id
      );
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if ($('#modal_video').hasClass('in')) {
          $('#modal_video').modal('hide');
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        this.getHfeData();
        this.emitter.emit('cart-items-updated');
      }
    },
    redirectToContact() {
      this.$router.push({
        name: 'ContactUs',
        params: { referrer: 'hf-validation' }
      });
    },
    navigateBack() {
      this.$router.push('/tools');
    },
    redirectToHfe() {
      this.$router.push('/opusprocess');
    },
    openInfo() {
      $('#modal_video').modal('show');
    },
    getDataCalculation2() {
      const isCompleteDateSelected = this.checkIsProperDateSelected();
      if (isCompleteDateSelected) {
        const date = this.getDateFormat(this.year, this.month, this.day);
        this.getTestCalculationDetails(date);
      }
    },

    checkIsProperDateSelected() {
      return [this.month, this.year, this.day].every((value) => value);
    },
    formatDate(date) {
      return dayjs(date).format('DD MMM YYYY');
    },
    async getTestCalculationDetails(explictDateSelected = '') {
      const isMultiParamsSelected = !!this.checkDateAndTestVariablesSelected();
      if (isMultiParamsSelected) {
        this.loaderStatus = true;
        const reqDate =
          explictDateSelected ||
          this.getDateFormat(this.year, this.month, this.day);
        const params = {
          ...this.testVariables,
          target_date: reqDate,
          target_type:
            this.target === 'Submission done' ? 'SUBMISSION_DONE' : 'START_DATE'
        };
        this.testCalculation = await getCalculationData(params);
        this.setBarsWidth();
        this.loaderStatus = false;
      }
    },
    getDateFormat(year, month, day) {
      const yearSelected = new Date(year).getFullYear();
      const monthSelected = `0${new Date(month).getMonth() + 1}`.slice(-2);
      const daySelected = `0${new Date(day).getDate()}`.slice(-2);
      return `${yearSelected}-${monthSelected}-${daySelected}`;
    },

    checkDateAndTestVariablesSelected() {
      const isTestVariableSelected = Object.values(this.testVariables).every(
        (variable) => !!variable
      );
      return (
        this.checkIsProperDateSelected() &&
        isTestVariableSelected &&
        this.target
      );
    },
    setBarsWidth() {
      if (this.testCalculation) {
        let totalWidth = $('#weeks-progress-wrapper').width();
        if ($(window).width() > 760) {
          totalWidth = $('#weeks-progress-wrapper').width() - 5 * 96;
        }
        const totalWeeks = this.testCalculation.total_weeks;
        const gridValues = totalWidth / totalWeeks;
        Object.keys(this.progressBarWidth).forEach((key) => {
          this.progressBarWidth[key] =
            96 +
            (this.testCalculation[key].weeks > 1
              ? gridValues * this.testCalculation[key].weeks - 1
              : 0);
        });
      }
    },
    generatePDF() {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'Tools',
        form_control_details: 'HF Validation Test Calculator'
      };
      postMarketoFormData(marketoForm);
      this.previewMode = true;
    },
    reset() {
      this.target = 'Start date';
      this.year = '';
      this.month = '';
      this.day = '';
      this.testVariables = {
        distinct_user_groups: null,
        participants: null,
        test_session_duration: null
      };
      this.progressBarWidth = {
        protocol: 96,
        prepare: 96,
        conduct: 96,
        report: 96,
        submit: 96
      };
      this.testCalculation = null;
      $('#panel-collapse1').collapse('hide');
      $('#panel-collapse2').collapse('hide');
      $('#panel-collapse3').collapse('hide');
      this.$nextTick(() => this.targetSelected());
    },
    targetSelected() {
      const today = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(today.getFullYear() + 1);
      if (this.target === 'Start date') {
        this.year = today;
      } else {
        this.year = nextYear;
      }
      this.day = today;
      this.month = today;
      this.getTestCalculationDetails();
    }
  }
};
</script>
<style scoped>
/* To-Do: Need to migrate all common classes to Global css file */

.text-hide {
  display: none;
}
.learn-more-text {
  padding-right: 110px;
}
.adjust-text {
  padding-top: 10px;
  padding-left: 0px;
}
.text_body,
.calculation-text,
.page-heading {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}
.page-heading {
  font-weight: 300;
  font-size: 32px;
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
  font-size: 16px;
  color: #000000;
  margin-bottom: 20px;
}
.calculation-text {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
}

.vue-date-picker >>> .mx-input-wrapper .mx-input{
  padding-left: 35px;
  border-radius: 20px;
  height: 32px;
  line-height: 32px;
  border-color: #4f4f4f;
  color: #4f4f4f;
}

.vue-date-picker >>> .mx-input-wrapper i {
  left: 8px;
  right: unset;
}

.break-word-initial {
  white-space: initial;
}
.weeks-text {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 45px;
  color: #0b3c61;
}
.grey-text {
  color: lightgrey;
}
.grey-text.text-emergo-dark-blue {
  color: #0b3c61;
}
.md-ft-35 {
  font-size: 35px;
}
.header_box {
  border-bottom: 1px solid #bdbdbd;
  padding: 0 0 10px 0;
}
.header_box.no-border {
  border-bottom: none;
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
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
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
.countries_select_list >>> .opus-multiselect.sm .multiselect__tags {
  border-radius: 20px;
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
  width: 90%;
  margin-bottom: 30px;
}
.panel-heading .chevron-div {
  flex: 1;
  margin: auto;
  cursor: pointer;
}
.fda-text {
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  width: 95%;
}

.break-space >>> .content-slot .break-word {
  white-space: break-spaces;
}
.caveats-text {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  padding-left: 30px;
}
/* Change to global */
.btn.wd-210 {
  width: auto;
}
.learn-more-display-flex {
  display: flex;
  flex-direction: row;
}
.learn-more-display-flex h1 {
  margin-top: 0;
}
.estimated-budget-rate {
  text-align: right;
  width: 35px;
  display: inline-block;
  margin-right: 10px;
}
.left-50 >>> .vue-slider-dot {
  left: 50% !important;
}

.pl-40 {
  padding-left: 40px;
}

@media screen and (max-width: 767px) {
  .welcome-banner-description {
    flex-direction: column;
    row-gap: 10px;
  }
  .m-25 {
    margin: 25px 15px;
  }
  .xs-mb-10 {
    margin-bottom: 10px;
  }
  .xs-mb-30 {
    margin-bottom: 30px;
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
  .learn-more-display-flex {
    flex-direction: column;
  }
}

@media screen and (min-width: 768px) {
  .header-buttons {
    text-align: right;
  }
  .top-15 {
    top: 15px;
  }
  .sm-wd-350 {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .weeks-text {
    font-size: 26px;
  }

  .md-ft-35 {
    font-size: 26px;
  }
}
</style>
