<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0">
        <div class="col-xs-12 p-0 d-flex align-items-cemter mb-10">
          <img
            @click="navigateBack"
            class="cursor-pointer"
            src="/static/images/icons/chevron_left_white.svg"
            alt=""
          />
          <div class="welcome-common-header pl-25 fw-300">
            Safety Label Quick Guide
          </div>
        </div>
        <div class="col-xs-12 pl-40">
          <div class="col-xs-12 col-md-10 col-lg-10 pl-0 font-18 fw-700 mb-5">
            Tips for creating effective information for safety
          </div>
          <div class="col-xs-12 pl-0 col-md-10 col-lg-7 font-14">
            The information in this quick guide can help you create effective
            labels and messages that convey important safety information on a
            device, package, or within a set of instructions.
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 pt-20 mt-10">
      <div class="panel-group" id="plans-accordion1">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion1"
              data-target="#severity"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span>Severity Level</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['severity'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="severity" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="col-xs-12 d-flex">
                <div class="col-xs-3 align-items-center">
                  <img
                    :src="`${blobUrl}/tools/Severity%20Level/Notive.svg`"
                    class="warning-img"
                  />
                  <p class="pt-10">
                    Use the signal word <b>NOTICE</b> when communicating an
                    important message that is not related to a personal injury.
                  </p>
                </div>
                <div class="col-xs-3 align-items-center">
                  <img
                    :src="`${blobUrl}/tools/Severity%20Level/Group%20455.svg`"
                    class="warning-img"
                  />
                  <p class="pt-10">
                    Use the signal word <b>CAUTION</b> when exposure to a hazard
                    could result in minor or moderate injury.
                  </p>
                </div>
                <div class="col-xs-3 align-items-center">
                  <img
                    :src="`${blobUrl}/tools/Severity%20Level/Group%20456.svg`"
                    class="warning-img"
                  />
                  <p class="pt-10">
                    Use the signal word <b>WARNING</b> when exposure to a hazard
                    could result in death or a serious injury.
                  </p>
                </div>
                <div class="col-xs-3 align-items-center">
                  <img
                    :src="`${blobUrl}/tools/Severity%20Level/Group%20457.svg`"
                    class="warning-img"
                  />
                  <p class="pt-10">
                    Use the signal word <b>DANGER</b> when exposure to a hazard
                    will result in death or a serious injury.
                  </p>
                </div>
              </div>
              <div class="col-xs-4 warning-card">
                <h3 class="warning-tip-text">Helpful Tips:</h3>
                <p class="fw-600">4 principles for applying a warning:</p>
                <div class="ml-15">
                  <ol>
                    <li>Product is hazardous.</li>
                    <li>Manufacturer is aware of hazard.</li>
                    <li>Hazard is not open or obvious.</li>
                    <li>Hazard exists during forseeable use or misuse.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12">
      <div class="panel-group" id="plans-accordion2">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion2"
              data-target="#safety"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span>Safety Labels & Symbols</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['safety'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="safety" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="col-xs-12 d-flex">
                <div
                  class="col-lg-3 col-sm-6 col-xs-6 col-md-3 align-items-center"
                >
                  <img
                    :src="`${blobUrl}/tools/Safty%20Labels%20%26%20Symbols/NOTICE.svg`"
                    class="warning-img-symbol"
                  />
                </div>
                <div
                  class="col-lg-3 col-sm-6 col-xs-6 col-md-3 align-items-center"
                >
                  <img
                    :src="`${blobUrl}/tools/Safty%20Labels%20%26%20Symbols/image%2031.svg`"
                    class="warning-img-symbol"
                  />
                </div>
                <div
                  class="col-lg-3 col-sm-6 col-xs-6 col-md-3 align-items-center"
                >
                  <img
                    :src="`${blobUrl}/tools/Safty%20Labels%20%26%20Symbols/Warning%20image.svg`"
                    class="warning-img-symbol"
                  />
                </div>
                <div
                  class="col-lg-3 col-sm-6 col-xs-6 col-md-3 align-items-center"
                >
                  <img
                    :src="`${blobUrl}/tools/Safty%20Labels%20%26%20Symbols/Danger%20image.svg`"
                    class="warning-img-symbol"
                  />
                </div>
              </div>
              <div class="col-xs-9 pl-30">
                <h3 class="sub-heading">Safety Labels & Symbols Summary:</h3>
                <p class="fw-600">
                  To draw attention to the warning as well as communicate
                  rapidly in a language-independent manner, include a symbol
                  that depicts either:
                </p>
                <div class="ml-15">
                  <ul class="pl-10">
                    <li>The hazardous situation to be avoided, or</li>
                    <li>The protective action</li>
                  </ul>
                </div>
                <p class="fw-600">
                  Effective symbols usually have these characteristics:
                </p>
                <div class="ml-15">
                  <ul class="pl-10">
                    <li>Black fill to contrast well with a white background</li>
                    <li>Visual simplicity</li>
                    <li>
                      Depiction of the hazardous situation (or one about to
                      occur), or depiction of user acting safely (i.e., taking
                      precautions)
                    </li>
                    <li>People and body parts drawn in silhouette.</li>
                    <li>
                      Optional: Red circle and slash to indicate what not to do.
                    </li>
                    <li>
                      The signal word DANGER uses white text to contrast more
                      sharply than black text with the red background.
                    </li>
                    <li class="ml-15">
                      Some designers elect to show the safety triangle, pointed
                      or rounded-off, as either black with a hollow exclamation
                      point, or yellow with a black exclamation point and
                      outline.
                    </li>
                  </ul>
                </div>
                <p class="fw-600">Safety symbol variations:</p>
                <div class="col-xs-12 align-items-center d-flex pl-0">
                  <img
                    :src="`${blobUrl}/tools/Safty%20Labels%20%26%20Symbols/image%2038.svg`"
                  />
                  <img
                    :src="`${blobUrl}/tools/Safty%20Labels%20%26%20Symbols/image%2039.svg`"
                    class="pl-10"
                  />
                  <div class="ml-10 safety-symbol-variations-standard">
                    Both versions are acceptable per ANSI Z535.<br />The version
                    on the right is per ISO 3864.
                  </div>
                </div>
              </div>
              <div class="col-xs-4 warning-card">
                <h3 class="warning-tip-text">Helpful Tips:</h3>
                <p class="fw-600">3 questions for an on-product label</p>
                <div class="ml-15">
                  <ol>
                    <li>Is hazard serious and likely?</li>
                    <li>Is this must-have information for users?</li>
                    <li>is an on-product label practical?</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12">
      <div class="panel-group" id="plans-accordion3">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion3"
              data-target="#format"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span>Formats</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['format'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="format" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="col-xs-8 d-flex pl-30">
                <div class="align-items-center pr-40">
                  <img :src="`${blobUrl}/tools/Formats/image%2034.svg`" />
                </div>
                <div class="align-items-center pr-40">
                  <img :src="`${blobUrl}/tools/Formats/image%2035.svg`" />
                </div>
                <div class="align-items-center pr-40">
                  <img :src="`${blobUrl}/tools/Formats/image%2036.svg`" />
                </div>
                <div class="align-items-center">
                  <img :src="`${blobUrl}/tools/Formats/image%2037.svg`" />
                </div>
              </div>
              <div class="col-xs-9 pl-30">
                <h3 class="sub-heading">Formatting Overview:</h3>
                <p>
                  Warning sign formats vary to fit the desired amount of
                  information and suit a specific placement that might allow for
                  narrower versus wider and shorter versus taller compositions.
                  The following compositions show how different signal words,
                  message choices, and formats might be used to alert users to a
                  hazard, which in this case is a hot surface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12">
      <div class="panel-group" id="plans-accordion4">
        <div class="panel wrapper-panel">
          <div class="panel-heading">
            <div
              class="panel-title cursor-pointer collapsed warning-title-heading"
              data-toggle="collapse"
              data-parent="#plans-accordion4"
              data-target="#messages"
            >
              <div class="d-flex align-items-center justify-content-between">
                <span>Messages</span>
                <img
                  src="/static/images/icons/chevron_down_new.svg"
                  :class="!showCard['messages'] ? 'show-card' : 'hide-card'"
                />
              </div>
            </div>
          </div>
          <div id="messages" class="panel-collapse collapse">
            <div class="panel-body">
              <div class="col-xs-8 d-flex pl-30">
                <div class="align-items-center pr-40">
                  <img :src="`${blobUrl}/tools/Messages/image%2034.svg`" />
                </div>
                <div class="align-items-center pr-40">
                  <img :src="`${blobUrl}/tools/Messages/image%2035.svg`" />
                </div>
                <div class="align-items-center pr-40">
                  <img :src="`${blobUrl}/tools/Messages/image%2036.svg`" />
                </div>
                <div class="align-items-center">
                  <img :src="`${blobUrl}/tools/Messages/image%2037.svg`" />
                </div>
              </div>
              <div class="col-xs-9 pl-30 pt-20">
                <p class="sub-heading">Message Overview:</p>
                <div class="ml-15">
                  <ul class="pl-10">
                    <li>
                      A warning message should be short and to the point.
                      Various formats allow for more or less content, but there
                      is rarely a need for more than 1-3 statements.
                    </li>
                    <li>
                      Text is usually black to contrast with a white background.
                    </li>
                    <li>
                      The text font is usually sans serif (e.g., Helvetica,
                      Calibri), meaning simple looking rather visually
                      embellished.
                    </li>
                    <li>It is standard practice to punctuate the text.</li>
                  </ul>
                </div>
              </div>
              <div class="col-xs-9 pl-30">
                <p class="sub-heading">Message Content:</p>
                <div class="ml-15">
                  <ul class="pl-10">
                    <li>Statement of the hazard (Example: Hot surface.)</li>
                    <li>
                      Statement of the harm that could be caused by the hazard
                      (Example: Contact may cause burn.)
                    </li>
                    <li>
                      Statement of the harm that could be caused by the hazard
                      (Example: Contact may cause burn.)
                    </li>
                    <li>Safety measure (Do not touch.)</li>
                  </ul>
                </div>
              </div>
              <div class="col-xs-4 warning-card">
                <h3 class="warning-tip-text">Helpful Tips:</h3>
                <p class="fw-600">3 questions a message should answer:</p>
                <div class="ml-15">
                  <ol>
                    <li>What will happen if I encounter a hazard?</li>
                    <li>How bad will it be?</li>
                    <li>How can I avoid the hazard?</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 mt-20 mb-20">
      <div class="pl-15 pr-15">
        <p class="references-heading">References</p>
        <ol class="references-list">
          <li class="references-list-item">
            Writing and designing manuals and warnings, Robinson, 2009
          </li>
          <li class="references-list-item">
            Product Safety Label Handbook, Westinghouse Inc, 1981
          </li>
          <li class="references-list-item">
            ANSI Z535.6 Product Safety Information In Product Manuals,
            Instructions And Other Collateral Materials
          </li>
          <li class="references-list-item">
            ISO 3864-2, Graphical Symbols - Safety Colours And Safety Signs -
            Part 2: Design Principles For Product Safety Labels
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      blobUrl: '',
      showCard: {
        severity: false,
        safety: false,
        format: false,
        messages: false
      }
    };
  },
  created() {
    this.blobUrl = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}`;
  },
  mounted() {
    Object.keys(this.showCard).forEach((key) => {
      $(`#${key}`).on('show.bs.collapse', () => {
        this.showCard[key] = true;
      });
      $(`#${key}`).on('hide.bs.collapse', () => {
        this.showCard[key] = false;
      });
    });
  },
  methods: {
    navigateBack() {
      this.$router.push('/tools');
    }
  }
};
</script>

<style scoped>
.font-14 {
  font-size: 14px;
}

.font-18 {
  font-size: 18px;
}
.fw-600 {
  font-weight: 600;
}

.warning-card {
  padding-left: 20px;
  margin-left: 20px;
  margin-top: 10px;
  background: rgba(252, 226, 22, 0.15);
}
.safety-symbol-variations-standard {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #333333;
}
.warning-tip-text {
  font-size: 16px;
  font-weight: 700;
}
.sub-heading {
  font-weight: 700;
  font-size: 18px;
}

.panel-heading .show-card {
  transform: rotate(0deg);
  transition: 0.5s;
}
.panel-heading .hide-card {
  transform: rotate(-180deg);
  transition: 0.5s;
}

/* Panel */

.panel.wrapper-panel {
  box-shadow: 0px 2px 7px rgb(0 0 0 / 25%);
  border-radius: 10px;
  margin-bottom: 10px;
}

.panel-group .panel {
  margin-bottom: 10px;
}

.panel-group {
  margin-bottom: 0px;
}

.panel-title {
  width: 100%;
  font-size: 18px;
  color: #00518a;
  padding: 5px 5px 5px 15px;
}

/* .panel-title:after {
  content: '\e6e0';
  font-family: 'element-icons';
  float: right;
  display: block;
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  color: black;
  font-weight: bolder;
} */

/* .panel-title.collapsed:after {
  content: '\e6e0';
  font-family: 'element-icons';
  display: block;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  color: black;
  font-weight: bolder;
} */
.panel-group .panel-heading + .panel-collapse > .panel-body {
  border-top: 0px !important;
}
.panel-body {
  padding: 15px 15px 15px 0px !important;
}
.warning-title-heading {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}

/* Panel */
.warning-img {
  width: 100%;
}
.warning-img-symbol {
  width: 90%;
}
.references-heading {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}
.references-list {
  list-style-position: inside;
}
.references-list-item {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #333333;
}
</style>
