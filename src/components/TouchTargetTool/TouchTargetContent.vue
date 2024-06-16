<template>
  <div class="col-xs-12 tool-content p-15 d-flex flex-column flex-wrap">
    <div
      class="col-xs-12 p-0 screen-data-wrapper d-flex flex-wrap pb-20 align-items-start"
    >
      <div
        class="col-xs-12 col-sm-12 col-md-5 col-lg-4 p-0 screen-size-container d-flex flex-wrap"
      >
        <div class="col-xs-12 p-0">
          <div class="col-xs-12 d-flex p-0 align-items-center">
            <span
              :class="{ filled: filledSteps.includes(1) }"
              class="target-step"
            >
              1
            </span>
            <span class="section-header ml-20">Enter screen size</span>
          </div>
          <div class="col-xs-12 pl-0 pr-0 pt-10 m-0 d-flex flex-wrap">
            <div class="col-xs-2 col-sm-2 col-md-2"></div>
            <div class="col-xs-10 col-sm-10 col-md-10 pl-0 pr-0">
              <div class="col-xs-12 p-0">
                <div class="col-xs-2 col-sm-2 col-md-1" />
                <div class="col-xs-10 col-sm-10 col-md-11 p-0">&nbsp;</div>
              </div>
              <div
                class="col-xs-12 col-sm-12 col-md-12 d-flex p-0 pt-10 justify-content-start"
              >
                <div class="col-xs-12 d-flex p-0 align-items-end">
                  <div
                    class="col-xs-12 col-sm-3 col-md-3 pl-0 indicator-icon-container"
                  >
                    <img
                      src="/static/images/icons/touch_tool_diagonal.svg"
                      class="indicator-icon"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-9 col-md-9 p-0">
                    <div class="col-xs-12 section-item-title pl-0">
                      Diagonal
                    </div>
                    <div class="col-xs-12 p-0 d-flex align-items-end">
                      <input
                        v-model="screensize.size"
                        type="text"
                        pattern="[0-9]"
                        min="0"
                        :max="maxScreenSize"
                        class="metric text-center"
                        placeholder="--"
                        @input="handleScreeensizeChange"
                      />
                      <div class="pl-5">
                        <multiselect
                          class="touchtoolSelect unitSelect ml-5"
                          :show-labels="false"
                          placeholder="units"
                          open-direction="bottom"
                          :searchable="false"
                          v-model="screensize.unit"
                          :allow-empty="false"
                          :options="screenSizeUnits"
                          @input="handleScreenDataUpdate('size')"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-xs-12 col-sm-12 col-md-7 col-lg-8 p-0 screen-resolution-container"
      >
        <div class="col-xs-12 d-flex p-0 align-items-center">
          <span
            :class="{ filled: filledSteps.includes(2) }"
            class="target-step"
          >
            2
          </span>
          <span class="section-header ml-20">Enter screen resolution</span>
        </div>
        <div
          class="col-xs-12 pl-0 pr-0 pt-10 d-flex align-items-center flex-wrap"
        >
          <div class="col-xs-12 p-0">
            <div class="col-xs-2 col-sm-2 col-md-1" />
            <div class="col-xs-10 col-sm-10 col-md-11 p-0 section-item-title">
              Enter Height and Width
            </div>
          </div>
          <div class="col-xs-2 col-md-1"></div>
          <div class="col-xs-10 col-sm-10 col-md-11 p-0 pt-10">
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-6 d-flex p-0 resolution-input-container"
            >
              <div class="col-xs-12 d-flex align-items-end p-0">
                <div
                  class="col-xs-12 col-sm-3 col-md-3 pl-0 indicator-icon-container"
                >
                  <img
                    src="/static/images/icons/touch_tool_screenheight.svg"
                    class="indicator-icon"
                  />
                </div>
                <div class="col-xs-10 col-sm-9 col-md-9 p-0">
                  <div class="col-xs-12 section-item-title pl-0">Height</div>
                  <div class="col-xs-12 p-0 d-flex align-items-end">
                    <input
                      v-model="screenResolution.height"
                      type="text"
                      pattern="[0-9]"
                      min="0"
                      maxlength="6"
                      class="metric text-center"
                      placeholder="----"
                      @input="handleScreenHeightChange"
                    />
                    <div class="pl-5">
                      <span class="font-bold metric-unit">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-xs-12 col-sm-12 col-md-12 col-lg-6 d-flex p-0 resolution-input-container"
            >
              <div class="col-xs-12 d-flex align-items-end p-0">
                <div
                  class="col-xs-12 col-sm-3 col-md-3 pl-0 indicator-icon-container"
                >
                  <img
                    src="/static/images/icons/touch_tool_screenwidth.svg"
                    class="indicator-icon"
                  />
                </div>
                <div class="col-xs-10 col-sm-9 col-md-9 p-0">
                  <div class="col-xs-12 section-item-title pl-0">Width</div>
                  <div class="col-xs-12 d-flex p-0 align-items-end">
                    <input
                      v-model="screenResolution.width"
                      type="text"
                      pattern="[0-9]"
                      min="0"
                      maxlength="6"
                      class="metric text-center"
                      placeholder="----"
                      @input="handleScreenWidthChange"
                    />
                    <div class="pl-5">
                      <span class="font-bold metric-unit">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 pl-0 pt-10 pb-10 metric-or">OR</div>
            <div class="col-xs-12 pl-0">
              <div class="form-group">
                <label>Select a standard resolution</label>
                <multiselect
                  class="touchtoolSelect resolutionSelect"
                  placeholder="Select a standard resolution"
                  label="resolution"
                  :show-labels="false"
                  v-model="standardResolution"
                  :allow-empty="false"
                  :options="standardResolutions"
                  :custom-label="(resolution) => resolution.standard_resolution"
                  @select="handleSelectedResolution"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-xs-12 col-sm-12 col-md-12 pl-0 pr-0 mt-25 target-size-container d-flex flex-wrap"
      :class="[
        filledSteps.includes(1) && filledSteps.includes(2) ? '' : 'disabled'
      ]"
    >
      <div class="col-xs-12 d-flex p-0 align-items-center">
        <span :class="{ filled: filledSteps.includes(3) }" class="target-step">
          3
        </span>
        <span class="section-header ml-20">Minimum touch target size</span>
      </div>
      <div class="col-xs-12 pl-0 pr-0 pt-10 d-flex flex-wrap">
        <div class="col-xs-2 col-sm-2 col-md-1"></div>
        <div class="col-xs-10 col-sm-10 col-md-11 pl-0 pr-0">
          <div
            class="col-xs-12 col-sm-12 col-md-12 d-flex flex-wrap p-0 justify-content-start target-size-data-container"
          >
            <div class="col-xs-12 d-flex p-0 flex-wrap">
              <div
                class="col-xs-12 col-sm-5 col-md-3 p-0 target-size-image-container d-flex"
              >
                <img
                  src="/static/images/icons/touch_target_min_size.svg"
                  class="touch-target-size-icon"
                />
                <div class="touch-target-size-line" />
                <div class="touch-target-padding-line" />
                <div class="col-xs-12 p-0 touch-target-text-container">
                  <span class="touch-target-size-text min-target-section-title"
                    >Touch Target</span
                  >
                  <span
                    class="touch-target-padding-text min-target-section-title"
                    >Padding</span
                  >
                </div>
              </div>
              <div
                class="col-xs-12 col-sm-5 col-md-7 p-0 d-flex flex-wrap"
                style="align-items: space-around"
              >
                <div
                  class="col-xs-12 p-0 d-flex align-items-center flex-wrap target-size-input-container touch-target"
                >
                  <div class="col-xs-12 col-sm-12 col-md-3 p-0">
                    <span class="section-title min-target-section-title"
                      >Touch Target</span
                    >
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-5 pl-0 pr-5">
                    <div class="section-item-title">Physical size</div>
                    <div
                      class="d-flex pl-10 target-size-input-group align-items-center"
                    >
                      <input
                        v-model="minTargetData.targetSize"
                        type="number"
                        class="touch-target-size-input ml-5 r-5"
                        placeholder="---"
                        disabled
                        @input="handleTargetPaddingChange"
                      />
                      <div>
                        <multiselect
                          class="touchtoolSelect unitSelect"
                          :show-labels="false"
                          placeholder="units"
                          open-direction="bottom"
                          v-model="minTargetData.targetUnits"
                          :options="minTargetUnits"
                          :searchable="false"
                          :allow-empty="false"
                          @select="handleUpdatedTargetUnit($event, 'target')"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 pl-0 pr-5">
                    <div class="section-item-title">Pixel dimensions</div>
                    <div
                      class="d-flex pl-10 target-size-input-group align-items-center"
                    >
                      <input
                        v-model="pixelDimensions.target"
                        type="number"
                        class="touch-target-size-input ml-5 r-5"
                        placeholder="---"
                        disabled
                      />
                      <span class="metric-unit">px</span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-xs-12 p-0 d-flex align-items-center flex-wrap target-size-input-container"
                >
                  <div
                    class="col-xs-12 col-sm-12 col-md-3 p-0 section-title-container"
                  >
                    <span class="section-title min-target-section-title"
                      >Padding</span
                    >
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-5 pl-0 pr-5">
                    <div class="input-title section-item-title">
                      Physical size
                    </div>
                    <div
                      class="d-flex pl-10 target-size-input-group align-items-center"
                    >
                      <input
                        v-model="minTargetData.paddingSize"
                        type="number"
                        class="touch-target-size-input ml-5 r-5"
                        placeholder="---"
                        disabled
                        @input="handleTargetPaddingChange"
                      />
                      <div>
                        <multiselect
                          class="touchtoolSelect unitSelect"
                          :show-labels="false"
                          placeholder="units"
                          open-direction="bottom"
                          v-model="minTargetData.paddingUnits"
                          :searchable="false"
                          :allow-empty="false"
                          :options="minTargetUnits"
                          @select="handleUpdatedTargetUnit($event, 'padding')"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 pl-0 pr-5">
                    <div class="input-title section-item-title">
                      Pixel dimensions
                    </div>
                    <div
                      class="d-flex pl-10 target-size-input-group align-items-center"
                    >
                      <input
                        v-model="pixelDimensions.padding"
                        type="number"
                        class="touch-target-size-input ml-5 r-5"
                        placeholder="---"
                        disabled
                      />
                      <span class="metric-unit">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0 mt-20">
              <div class="col-xs-12 col-sm-5 col-md-3 p-0" />
              <div class="col-xs-12 col-sm-5 col-md-7 p-0">
                <div class="form-group">
                  <div
                    class="d-flex flex-wrap justify-content-between align-items-center"
                  >
                    <div class="col-xs-12 col-sm-12 col-md-6 p-0">
                      <label>Touch target sizing standard for reference</label>
                    </div>
                    <div
                      class="col-xs-12 col-sm-12 col-md-6 p-0 d-flex justify-content-end"
                    >
                      <label
                        class="ref-modal-trigger cursor-pointer"
                        @click="openStandardRefModal"
                      >
                        <i class="fa fa-exclamation-circle" />
                        Which standard should I use?
                      </label>
                    </div>
                  </div>
                  <multiselect
                    :class="[filledSteps.length === 3 ? 'enabled' : 'disabled']"
                    class="touchtoolSelect referenceSelect"
                    placeholder="Select a standard reference"
                    label="Reference"
                    :show-labels="false"
                    v-model="standardReference"
                    :options="standardReferences"
                    :allow-empty="false"
                    :custom-label="(reference) => reference.standard_reference"
                    @select="handleSelectedReference"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="output-container col-xs-12 p-0">
      <touch-target-output :input-data="touchTargetInputData" />
    </div>
    <div id="standard_ref_guide_modal" class="modal" role="dialog">
      <div class="modal-dialog request-modal">
        <div class="modal-content p-10">
          <div class="content">
            <standard-ref-guide @close="closStandardRefModal" />
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="isLoaderActive" />
  </div>
</template>

<script>
import $ from 'jquery';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import TouchTargetOutput from './TouchTargetOutput.vue';
import {
  getStandardReferences,
  getStandardResolutions,
  calculatePixelDimensions
} from '../../apis/tools';
import Loader from '../UIComponents/Loader.vue';
import StandardRefGuide from './StandardRefGuide.vue';

export default {
  name: 'TouchTargetContent',
  components: {
    StandardRefGuide,
    TouchTargetOutput,
    Multiselect,
    Loader
  },
  data() {
    return {
      standardResolution: '',
      standardResolutions: [],
      standardReferences: [],
      standardReference: '',
      isLoaderActive: false,
      filledSteps: [],
      // input data
      screensize: {
        size: null,
        unit: 'in'
      },
      screenSizeUnits: ['in', 'cm'],
      minTargetUnits: ['in', 'mm'],
      screenResolution: {
        width: null,
        height: null,
        unit: 'px'
      },
      minTargetData: {
        targetSize: '',
        targetUnits: 'in',
        paddingSize: '',
        paddingUnits: 'in'
      },
      pixelDimensions: {
        target: '',
        padding: ''
      },
      touchTargetInputData: null,
      debounceTimeout: null,
      maxScreenSize: 1000000,
      maxScreenResRegex: /^[0-9]{1,6}$/,
      maxScreenSizeRegex: /^(?!\.?$)\d{0,6}(\.\d{0,1})?$/
    };
  },
  async created() {
    await this.setup();
  },
  methods: {
    async setup() {
      [this.standardResolutions, this.standardReferences] = await Promise.all([
        getStandardResolutions(),
        getStandardReferences()
      ]);
    },
    handleScreeensizeChange() {
      let screensize = this.screensize.size;
      if (screensize && !this.maxScreenSizeRegex.test(screensize)) {
        if (this.maxScreenSize <= screensize) {
          screensize = parseInt(`${screensize}`.substring(0, 6), 10);
        } else {
          // finding the index of dot in the input
          let dotIndex = screensize.indexOf('.');
          // if the input has dot and the index of dot is not the last character, cropping till one decimal value
          if (dotIndex > -1 && dotIndex < screensize.length - 1) {
            // preventing from entering two dots
            if (screensize[dotIndex + 1] === '.') dotIndex -= 1;
            // setting screensize to only one decimal value
            screensize = screensize.substring(0, dotIndex + 2);
          }
        }
      }
      this.screensize.size = screensize;
      this.handleScreenDataUpdate('size');
    },
    handleScreenHeightChange() {
      this.screenResolution.height = this.getValidatedScreenResValue(
        this.screenResolution.height
      );
      this.handleResolutionManualUpdate();
    },
    handleScreenWidthChange() {
      this.screenResolution.width = this.getValidatedScreenResValue(
        this.screenResolution.width
      );
      this.handleResolutionManualUpdate();
    },
    getValidatedScreenResValue(size) {
      if (!size) return null;
      let screenSize = size;
      if (!this.maxScreenResRegex.test(screenSize)) {
        screenSize = parseInt(screenSize, 10);
        if (Number.isNaN(screenSize)) {
          return null;
        }
        if (this.maxScreenSize < size) {
          return `${screenSize}`.substring(0, 6);
        }
      }
      return screenSize;
    },
    handleSelectedResolution(res) {
      this.screenResolution = {
        width: res.width,
        height: res.height,
        unit: 'px'
      };
      this.handleScreenDataUpdate('resolution');
    },
    handleResolutionManualUpdate() {
      this.standardResolution = null;
      this.handleScreenDataUpdate('resolution');
    },
    handleUpdatedTargetUnit(selectedUnit, fieldName) {
      const sizeFieldName = `${fieldName}Size`;
      const size = this.minTargetData[sizeFieldName];
      if (selectedUnit === 'in') {
        this.minTargetData[sizeFieldName] =  this.getInchesFromMm(size)
      } else this.minTargetData[sizeFieldName] =  this.getMmFromInches(size)
      this.handleScreenDataUpdate('reference');
    },
    handleSelectedReference(reference) {
      if (!reference) return;
      this.minTargetData = {
        targetSize: reference.min_target,
        targetUnits: reference.min_target_unit,
        paddingSize: reference.min_padding,
        paddingUnits: reference.min_padding_unit
      };
      this.pixelDimensions.target = '';
      this.pixelDimensions.padding = '';
      this.handleScreenDataUpdate('reference');
    },
    handleTargetPaddingChange() {
      this.standardReference = null;
      this.handleScreenDataUpdate('reference');
    },
    isScreenSizeProvided() {
      return !!this.screensize.size;
    },
    getInchesFromMm(mm) {
      return mm / 25.4;
    },
    getMmFromInches(inches) {
      return inches * 25.4;
    },
    isScreenResolutionProvided() {
      return this.screenResolution.width && this.screenResolution.height;
    },
    isMinimumDataProvided() {
      return (
        this.minTargetData.targetSize &&
        (this.minTargetData.paddingSize || this.minTargetData.paddingSize === 0)
      );
    },
    isScreenDataAvailable() {
      const filledSteps = [];
      if (this.isScreenSizeProvided()) filledSteps.push(1);
      if (this.isScreenResolutionProvided()) filledSteps.push(2);
      if (this.isMinimumDataProvided()) filledSteps.push(3);
      this.filledSteps = filledSteps;
      return filledSteps.length === 3;
    },
    buildCalculationPayload() {
      return {
        standard_reference: this.standardReference
          ? this.standardReference.standard_reference
          : null,
        height: parseFloat(this.screenResolution.height),
        width: parseFloat(this.screenResolution.width),
        screen_size: parseFloat(this.screensize.size),
        screen_size_type: this.screensize.unit,
        min_target: this.minTargetData.targetSize,
        min_target_unit: this.minTargetData.targetUnits,
        min_padding: this.minTargetData.paddingSize,
        min_padding_unit: this.minTargetData.paddingUnits,
        standard_resolution: this.standardResolution
          ? this.standardResolution.standard_resolution
          : null
      };
    },
    handleScreenDataUpdate() {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      if (this.minTargetData.targetSize) {
        this.debounceTimeout = setTimeout(() => {
          this.fetchPixelDimensions();
        }, 300);
      } else {
        const ansiReference = this.standardReferences[0];
        if (ansiReference) {
          this.standardReference = ansiReference;
          this.handleSelectedReference(ansiReference);
        }
      }
    },
    async fetchPixelDimensions() {
      if (this.isScreenDataAvailable()) {
        this.touchTargetInputData = null;
        this.isLoaderActive = true;
        let touchTargetInputData = this.buildCalculationPayload();
        const data = await calculatePixelDimensions(touchTargetInputData);
        let pixelDimensions = {
          target: null,
          padding: null
        };
        if (
          data.touch_target &&
          typeof data.padding === 'number' &&
          typeof data.touch_target === 'number'
        ) {
          const parsedTouchTarget = Number.parseFloat(
            Number.parseFloat(data.touch_target).toFixed(2)
          );
          if (parsedTouchTarget > 0) {
            pixelDimensions = {
              target: parsedTouchTarget,
              padding: Number.parseFloat(
                Number.parseFloat(data.padding).toFixed(2)
              )
            };
            touchTargetInputData = {
              ...touchTargetInputData,
              ...pixelDimensions
            };
            this.touchTargetInputData = touchTargetInputData;
          }
        }
        this.pixelDimensions = pixelDimensions;
        this.isLoaderActive = false;
      }
    },
    openStandardRefModal() {
      $('#standard_ref_guide_modal').modal('show');
    },
    closStandardRefModal() {
      $('#standard_ref_guide_modal').modal('hide');
    },
    clearAllInputs() {
      this.screensize.size = '';
      this.screenResolution.width = '';
      this.screenResolution.height = '';
      this.screensize.unit = 'in';
      this.screenResolution.unit = 'px';
      this.standardResolution = '';
      if (this.pixelDimensions.target) {
        this.filledSteps = [3];
      } else {
        this.filledSteps = [];
      }
    }
  }
};
</script>
<style scoped>
#standard_ref_guide_modal .modal-dialog {
  width: 70vw;
}
#standard_ref_guide_modal .modal-content .content {
  max-height: 85vh;
  overflow: hidden;
}
.tool-content {
  margin-top: 36px;
  padding-left: 25px;
}

.screen-data-wrapper {
  align-items: stretch;
}

.section-header {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
}

.section-item-title {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
}

.target-size-container {
  padding-bottom: 30px;
}

.target-size-container.disabled {
  opacity: 0.5 !important; /* added important because in production opacity was overriding */
  pointer-events: none;
}

.screen-data-wrapper {
  border-bottom: 1px solid #e0e0e0;
}

.output-container {
  border-top: 1px solid #e0e0e0;
}

.flex-wrap {
  flex-wrap: wrap;
}

.indicator-icon {
  width: 80px;
  height: 60px;
}
.indicator-icon-container {
  padding: 0;
  padding-bottom: 6px;
}

.target-size-data-container {
  align-items: center;
}

.touch-target-size-icon {
  width: 150px;
  height: 160px;
}

.target-step {
  font-weight: 300;
  font-size: 16px;
  line-height: 30px;
  margin-top: 8px;
  text-align: center;
  color: #333333;
  background: #ffffff;
  -webkit-box-shadow: 2.97297px 2.97297px 7.43243px rgb(0 0 0 / 25%);
  box-shadow: 2.97297px 2.97297px 7.43243px rgb(0 0 0 / 25%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid #757575 !important;
  padding: 0.5px 8px 2px 8px;
}

.target-step.filled {
  border-color: #4c9e45 !important;
}

.metric {
  width: 150px;
  border: none;
  border-bottom: 2px solid #79b0de;
  border-radius: 5px 5px 0 0;
  background: rgba(196, 196, 196, 0.2);
}

.metric,
.touch-target-size-input {
  color: #0b3c61;
  padding-top: 10px;
  padding-bottom: 2px;
  font-size: 30px;
  -moz-appearance: textfield;
}

.metric-unit {
  color: #0b3c61;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
}

.metric-or {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
}

.metric::-webkit-outer-spin-button,
.metric::-webkit-inner-spin-button,
.touch-target-size-input::-webkit-outer-spin-button,
.touch-target-size-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.target-size-input-group {
  border-radius: 4px;
  height: 50px;
  background: #e0e0e0;
}

.target-size-input-group .metric-unit {
  width: 80px;
  text-align: center;
}

.touch-target-size-input {
  max-width: calc(100% - 80px);
}

.touch-target-size-input,
.touch-target-size-input:focus {
  border: none;
  outline: none;
}

.ref-modal-trigger {
  color: #00518a;
}
.metric::placeholder,
.touch-target-size-input::placeholder {
  color: #0b3c61;
}

.metric:focus,
.metric:focus {
  outline: none;
}

.min-target-section-title {
  font-size: 18px;
  line-height: 25px;
}

.touchtoolSelect {
  margin-bottom: -6px;
}
.touchtoolSelect >>> .multiselect__select:before {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  border: 1px solid #0b3c61;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  top: 0;
  content: '';
}
.touchtoolSelect >>> .multiselect__select {
  height: 35px;
}
.touchtoolSelect >>> .multiselect__tags {
  border-radius: 3px;
  min-height: 0;
  height: 33px;
  line-height: 12px;
  padding-top: 6px;
  border-radius: 0px !important;
  border: 1px solid #000000;
}
.touchtoolSelect.multiselect--active >>> .multiselect__tags {
  border-radius: 0 !important;
}
.touchtoolSelect >>> .multiselect__tags .multiselect__single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.touchtoolSelect >>> .multiselect__tags .multiselect__placeholder {
  padding-top: 4px;
  font-size: 18px;
  color: #333333;
}
.touchtoolSelect >>> .multiselect__content-wrapper {
  min-height: 0px;
  max-height: 180px !important;
  border: 1px solid #aaa;
}
.touchtoolSelect >>> .multiselect__content-wrapper .multiselect__option {
  height: 30px;
  font-size: 13px;
}
.touchtoolSelect >>> .multiselect__content-wrapper .multiselect__option span {
  word-break: break-word;
  white-space: pre-wrap;
}
.touchtoolSelect
  >>> .multiselect__content-wrapper
  .multiselect__option--highlight {
  color: #000000;
  height: 30px;
  background: white;
}

.resolutionSelect >>> .multiselect__option--selected,
.unitSelect >>> .multiselect__option--selected,
.referenceSelect >>> .multiselect__option--selected {
  background: rgba(67, 180, 228, 0.2) !important;
}

.unitSelect.multiselect >>> .multiselect__tags {
  border: none;
}
.unitSelect >>> .multiselect__select {
  padding-right: 0 !important;
  width: 60px !important;
}
.unitSelect >>> .multiselect__content-wrapper {
  border-radius: 0 0 2px 2px;
}

.unitSelect >>> .multiselect__single,
.unitSelect >>> .multiselect__content-wrapper .multiselect__option {
  font-weight: bold;
  font-size: 22px !important;
  color: #0b3c61;
}

.unitSelect >>> .multiselect__select:before {
  padding: 3px;
  top: 1px;
}
.unitSelect.multiselect--active >>> .multiselect__select {
  transform: rotate(270deg);
}
.unitSelect.multiselect--active >>> .multiselect__select:before {
  top: 4px;
  left: -2px;
}

.unitSelect
  >>> :is(.multiselect__single, .multiselect__input, .multiselect__tags) {
  background: transparent !important;
  border: none;
  width: 100%;
}
.referenceSelect.disabled >>> .multiselect__tags {
  border-color: #c9c9c9 !important;
}
.referenceSelect.disabled >>> .multiselect__tags {
  border-color: #000000;
}
/*start: styles for minimum touch size section*/
@media screen and (max-width: 991px) {
  .target-size-image-container {
    height: 300px;
  }

  .touch-target-size-icon {
    position: absolute;
    top: 0;
    right: calc(100% - 200px);
  }

  .target-size-image-container .touch-target-size-text {
    position: absolute;
    top: 190px;
    left: 150px;
  }

  .target-size-image-container .touch-target-padding-text {
    position: absolute;
    top: 230px;
    left: 70px;
  }

  .touch-target-size-line,
  .touch-target-padding-line {
    height: 100px;
    width: 2px;
    border-right: 2px solid #828282;
    position: absolute;
  }

  .touch-target-size-line {
    top: 110px;
    left: 140px;
  }

  .touch-target-padding-line {
    top: 150px;
    left: 65px;
  }

  .target-size-input-group {
    margin-top: 10px;
  }

  .target-size-input-container .input-title {
    margin-top: 10px;
  }

  .target-size-input-container .section-title-container {
    margin-top: 30px;
  }

  .target-size-input-container .section-title {
    font-size: 22px;
    font-weight: bold;
    margin-top: 20px;
  }
}

@media screen and (min-width: 991px) {
  .screen-size-container {
    border-right: 1px solid #e0e0e0;
  }

  .screen-resolution-container {
    padding-left: 10px;
  }

  .touch-target-size-icon {
    /*position:absolute;
        */
    top: 10px;
  }

  .touch-target-size-line {
    position: absolute;
    top: 45px;
    right: 0px;
    width: calc(100% - 110px);
  }

  .touch-target-padding-line {
    position: absolute;
    top: 128px;
    right: 0px;
    width: calc(100% - 145px);
  }

  .target-size-image-container {
    position: relative;
  }

  .touch-target-size-line,
  .touch-target-padding-line {
    border-bottom: 2px solid #828282;
  }

  .target-size-input-container.touch-target {
    border-bottom: 1px solid #e0e0e0;
  }

  .target-size-input-container .input-title,
  .touch-target-text-container {
    display: none;
  }
}

@media screen and (min-width: 991px) and (max-width: 1440px) {
  .indicator-icon {
    width: 65px;
  }
}

@media screen and (min-width: 1020px) and (max-width: 1280px) {
  .screen-size-container {
    width: 45%;
  }
  .screen-resolution-container {
    width: 55%;
  }
  .resolution-input-container {
    width: 100%;
  }
}

/*end: styles for minimum touch size section*/
</style>
