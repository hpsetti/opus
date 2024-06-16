<template>
  <div class="touch-target-output-container col-xs-12 p-0 p-20">
    <div class="col-xs-12 p-0 d-flex flex-wrap align-items-start">
      <div class="col-xs-12 col-sm-12 col-md-8 p-0">
        <div>
          <span class="font-22 download-header">Download PNG Template</span>
        </div>
        <div class="mt-15">
          <span class="download-header-body"
            >Download the PNG file of your touch target template and scale the
            PNG to the pixel size of your UI screen. Overlay the template onto
            your interface software to view the recommended touch targets.
          </span>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4 p-0 d-flex justify-content-end">
        <BaseButton
          :disabled="!inputData || downloading"
          :class="[!inputData || downloading ? 'disabled' : '']"
          has-icon
          @click="downloadOutputImage"
        >
          <img
            src="/static/images/icons/download_icon_white.svg"
            alt=""
            class="download-icon"
          />
          <span>{{ downloading ? 'downloading' : 'Download template' }}</span>
        </BaseButton>
      </div>
    </div>
    <div
      v-if="inputData"
      class="col-xs-12 p-10 d-flex flex-wrap mt-40 download-suggestion-wrapper"
    >
      <div
        class="col-xs-12 col-sm-12 col-md-9 d-flex align-items-center justify-content-center suggestions-image"
      >
        <img
          style="object-fit: contain; width: 95%"
          src="/static/images/tools/touchTargetTool/touch_target_tool_output_animation.gif"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3">
        <ol type="number">
          <li class="download-suggestion">
            Download the png file and open it in your design software.
          </li>
          <li class="download-suggestion">
            Confirm that the size of the outer image equals your screen frame
            size.
          </li>
          <li class="download-suggestion">
            Overlay the touch target onto your design item to check for the
            correct size.
          </li>
        </ol>
      </div>
    </div>
    <div class="col-xs-12 p-0">
      <div
        v-if="inputData"
        class="p-10"
        :style="{
          width: inputData.width + 20 + 'px',
          height: inputData.height + 20 + 'px'
        }"
        id="touchTargetOutput"
      >
        <div
          class="touch-target-output"
          :style="{
            width: inputData.width + 'px',
            height: inputData.height + 'px'
          }"
        >
          <div class="output-image-container col-xs-12 p-0">
            <div>
              <div
                :class="[hasPadding ? 'has-padding' : '']"
                :style="getTouchPaddingStyle"
                class="output-image-outline d-flex align-items-start justify-content-start"
              >
                <div
                  :style="getTouchTargetStyle"
                  class="output-image-target d-flex align-items-center justify-content-center"
                >
                  <span v-if="hideOutwardMinData"
                    >{{ formatFloat(inputData.target) }} px</span
                  >
                </div>
                <div
                  v-if="hasPadding"
                  class="output-image-padding"
                  :style="getTouchPaddingTextStyle"
                >
                  <span v-if="hideOutwardMinData"
                    >{{ formatFloat(inputData.padding) }} px</span
                  >
                </div>
                <template v-if="!hideOutwardMinData">
                  <div
                    class="outward-min-data-container target"
                    :style="getOutwardTargetStyle"
                  >
                    <span>{{ formatFloat(inputData.target) }} px</span>
                  </div>
                  <div
                    v-if="hasPadding"
                    class="outward-min-data-container padding"
                    :style="getOutwardPaddingStyle"
                  >
                    <span>{{ formatFloat(inputData.padding) }} px</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="col-xs-12 p-0 output-units">
            <span>
              {{ inputData['screen_size'] }} {{ inputData.screen_size_type }}
              {{
                inputData.standard_resolution ||
                `${inputData['height']} x ${inputData['width']}`
              }} </span
            ><br />
            <span
              class="font-14 font-bold"
              v-if="inputData['standard_reference']"
            >
              {{ inputData['standard_reference'] }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="isLoaderActive" />
  </div>
</template>

<script>
import * as htmlToImage from 'html-to-image';
import Loader from '../UIComponents/Loader.vue';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  name: 'TouchTargetOutput',
  components: { Loader, BaseButton },
  props: {
    inputData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      downloading: false,
      isLoaderActive: false
    };
  },
  computed: {
    hasPadding() {
      return this.inputData.min_padding > 0;
    },
    getTouchPaddingStyle() {
      try {
        return {
          // 4 for padding, 2 for border
          width: `${this.inputData.target + this.inputData.padding * 2 + 4}px`,
          height: `${this.inputData.target + this.inputData.padding * 2 + 4}px`
        };
      } catch (e) {
        return {};
      }
    },
    getTouchTargetStyle() {
      try {
        return {
          left: `${this.inputData.padding}px`,
          top: `${this.inputData.padding}px`,
          width: `${this.inputData.target}px`,
          height: `${this.inputData.target}px`
        };
      } catch {
        return {};
      }
    },
    getTouchPaddingTextStyle() {
      try {
        return {
          // 5 for height of text
          top: `${
            this.inputData.target +
            this.inputData.padding +
            this.inputData.padding / 2 -
            5
          }px`
        };
      } catch (e) {
        return {};
      }
    },
    getWidthOfTouchTarget() {
      try {
        return this.inputData.target + this.inputData.padding * 2 + 4;
      } catch (e) {
        return 0;
      }
    },
    getOutwardTargetStyle() {
      try {
        return {
          left: `${
            this.inputData.padding +
            this.inputData.target -
            this.inputData.target / 5
          }px`,
          top: `${this.inputData.padding + this.inputData.target / 3 - 25}px`,
          width: this.getWidthOfTouchTarget > 90 ? '100%' : '95px'
        };
      } catch (e) {
        return {};
      }
    },
    getOutwardPaddingStyle() {
      try {
        return {
          left: `${
            this.inputData.padding +
            this.inputData.target +
            this.inputData.padding / 2
          }px`,
          top: `${this.inputData.padding + this.inputData.target - 4}px`,
          width: `calc(${this.getWidthOfTouchTarget > 90 ? '100%' : '95px'} - ${
            this.inputData.padding / 2 + this.inputData.target / 5
          }px)`
        };
      } catch (e) {
        return {};
      }
    },
    hideOutwardMinData() {
      return this.inputData.target > 70;
    }
  },
  methods: {
    downloadOutputImage() {
      if (this.downloading) return;
      this.isLoaderActive = true;
      this.downloading = true;
      const target = document.getElementById('touchTargetOutput');
      target.style.display = 'flex';
      htmlToImage
        .toPng(target)
        .then((dataUrl) => {
          target.style.display = 'none';
          const date = new Date();
          const link = document.createElement('a');
          let days = date.getDate();
          if (days < 10) days = `0${days}`;
          let months = date.getMonth() + 1;
          if (months < 10) months = `0${months}`;
          let hours = date.getHours();
          if (hours < 10) hours = `0${hours}`;
          let minutes = date.getMinutes();
          if (minutes < 10) minutes = `0${minutes}`;
          let seconds = date.getSeconds();
          if (seconds < 10) seconds = `0${seconds}`;
          link.download = `touch_target_output_${months}${days}${date.getFullYear()}_${hours}${minutes}${seconds}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('error while downloading image', error);
        })
        .finally(() => {
          this.downloading = false;
          this.isLoaderActive = false;
        });
    },
    formatFloat(value) {
      const val = `${parseFloat(value)}`;
      const splitFloat = val.split('.');
      const int = splitFloat[0];
      let dec = splitFloat[1];
      if (dec) {
        if (dec.length === 0) {
          dec = '';
        } else if (dec.length === 1) {
          dec = `${dec[0]}`;
        } else {
          dec = dec[0] + dec[1];
        }
        if (dec) return `${int}.${dec}`;
      }
      return int;
    },
  }
};
</script>
<style scoped>
#touchTargetOutput {
  background: transparent;
  display: none;
}
.touch-target-output {
  background: transparent;
  border-radius: 2px;
  padding: 15px 20px;
  border: 3px solid orange;
  position: relative;
}
.flex-wrap {
  flex-wrap: wrap;
}
.download-header {
  color: #333333;
  font-size: 24px;
  line-height: 33px;
}
.download-header-body {
  font-size: 14px;
  line-height: 19px;
  color: #333333;
}
.download-button {
  border-radius: 5px;
  color: white;
  font-size: 18px;
  text-align: center;
}
.download-button.disabled {
  opacity: 0.4;
  pointer-events: none;
}
.download-icon {
  margin-top: -7px;
  margin-right: 7px;
}
.output-units {
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
  position: absolute;
  bottom: 0;
}
.output-image-outline {
  position: relative;
}
.output-image-target,
.output-image-padding {
  font-weight: 700;
  font-size: 14px;
  line-height: 11px;
}
.output-image-outline.has-padding {
  border: 2px dashed orange;
}

.output-image-target {
  border: 2px solid orange;
  position: absolute;
}

.output-image-padding {
  position: absolute;
  text-align: center;
  width: 100%;
}
.outward-min-data-container {
  position: absolute;
  text-align: right;
  font-weight: 700;
  font-size: 12px;
  color: #333333;
}
.outward-min-data-container.target {
  border-bottom: 2px solid #828282;
}
.outward-min-data-container.padding {
  border-top: 2px solid #828282;
}
.download-suggestion {
  margin-top: 30px;
  text-align: justify;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
@media screen and (max-width: 991px) {
  .download-suggestion-wrapper {
    flex-direction: column-reverse;
  }
  .download-suggestion-wrapper .suggestions-image {
    margin-top: 30px;
  }
}
</style>
