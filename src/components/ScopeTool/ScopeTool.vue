<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
        <img
          @click="navigateToTools"
          class="cursor-pointer"
          src="/static/images/icons/chevron_left_white.svg"
          alt=""
        />
        <div class="welcome-common-header pl-25 fw-300">
          HFE Project Scope Tool
        </div>
      </div>
      <div class="col-xs-12 font-18 fw-700 pl-40 mb-5">Tool instructions</div>
      <div class="col-xs-12 tools-desc pl-40 d-flex align-items-end pr-0">
        <div class="col-xs-12 col-sm-7 font-14 fw-400 p-0">
          To generate an HFE scope description, answer 2-4 questions about your
          product. The tool accounts for regulatory requirement in differences
          in various markets, as well as the requirement differences when
          applying HFE to new versus existing (i.e., already marketed) products.
        </div>
        <div
          class="col-xs-12 col-sm-5 p-0 d-flex justity-content-right col-gap-10"
        >
          <BaseButton variant="secondary" class="br-5" @click="clearAll"
            >Clear All</BaseButton
          >
          <BaseButton
            variant="secondary"
            class="br-5"
            :disabled="
              !learnMoreFlag ||
              (scopeToolObj.market.includes('US') &&
                !scopeToolObj.market.includes('NON_US') &&
                scopeToolObj.product_type == 'EXISTING' &&
                scopeToolObj.change_type == 'NO_IMPACT')
            "
            :class="{
              disabled:
                !learnMoreFlag ||
                (scopeToolObj.market.includes('US') &&
                  !scopeToolObj.market.includes('NON_US') &&
                  scopeToolObj.product_type == 'EXISTING' &&
                  scopeToolObj.change_type == 'NO_IMPACT')
            }"
            @click="viewPdf"
            >View</BaseButton
          >
        </div>
      </div>
    </div>
    <div class="row col-xs-12 p-20 scope-body opus-stepper">
      <v-app>
        <v-stepper v-model="stepNumber" vertical>
          <v-stepper-content :class="{ step_completed: stepNumber >= 1 }" step="1">
            
            <div class="col-xs-11 question">
              Where will you market the product?
            </div>
            <div class="col-xs-12 question-selection-type">
              Select all that apply
            </div>
          </v-stepper-content>

          <v-stepper-content
            step="1"
            :class="{ next_step_content: stepNumber > 1 }"
          >
            <v-btn
              depressed
              @click="incrementStep(1, 'US')"
              :class="{ market_selected: scopeToolObj.market.includes('US') }"
              >United States</v-btn
            >
            <v-btn
              depressed
              @click="incrementStep(1, 'NON_US')"
              :class="{
                market_selected: scopeToolObj.market.includes('NON_US')
              }"
              >Outside the United States</v-btn
            >
            <v-divider></v-divider>
          </v-stepper-content>
          <v-stepper-step :class="{ step_completed: stepNumber >= 2 }" step="2">
            <div class="col-xs-11 question">
              Is the product new or are you changing an existing product?
            </div>
           
            <div class="col-xs-12 question-selection-type">Select one</div>
          </v-stepper-step>

          <v-stepper-content
            step="2"
            :class="{
              next_step_content: stepNumber > 2,
              dashed_content:
                stepNumber > 2 && scopeToolObj.product_type == 'NEW'
            }"
          >
            <v-btn
              depressed
              @click="incrementStep(2, 'NEW')"
              :class="{ market_selected: scopeToolObj.product_type == 'NEW' }"
              >New product</v-btn
            >
            <v-btn
              depressed
              @click="incrementStep(2, 'EXISTING')"
              :class="{
                market_selected: scopeToolObj.product_type == 'EXISTING'
              }"
              >Existing product</v-btn
            >
            <v-divider v-if="scopeToolObj.product_type != ''"></v-divider>
          </v-stepper-content>
          <div v-if="scopeToolObj.product_type == 'NEW'">
            <!-- download format here new product at all cases -->
            <v-stepper-step
              :class="{ final_step: stepNumber > 2 }"
              step="final-step"
              :rules="[() => false]"
            >
            </v-stepper-step>
            <v-stepper-content
              step="final-step"
              class="final_step_content ht-160"
            >
              <div class="col-xs-12 disp-flex">
                <div class="col-xs-7 scope-ready">
                  HFE Project Scope Description is ready!
                </div>
                <div class="col-xs-5 d-flex col-gap-15">
                  <BaseButton variant="secondary" @click="viewPdf"
                    >View</BaseButton
                  >
                  <BaseButton has-icon @click="downloadPdf">
                    <img
                      src="/static/images/icons/download_icon_white.svg"
                      class="preview-svg"
                    />Download
                  </BaseButton>
                </div>
              </div>
              <div class="col-xs-12 step-path float-prop">
                <div
                  class="col-xs-6"
                  v-if="
                    scopeToolObj.market.includes('US') &&
                    !scopeToolObj.market.includes('NON_US')
                  "
                >
                  <div>United States</div>
                  <div>New Product</div>
                </div>
                <div
                  class="col-xs-6"
                  v-else-if="
                    scopeToolObj.market.includes('NON_US') &&
                    !scopeToolObj.market.includes('US')
                  "
                >
                  <div>Outside the United States</div>
                  <div>New Product</div>
                </div>
                <div class="col-xs-6" v-else>
                  <div>United States + Outside the United States</div>
                  <div>New Product</div>
                </div>
              </div>
            </v-stepper-content>
          </div>
          <div v-else-if="scopeToolObj.product_type == 'EXISTING'">
            <v-stepper-step
              :class="{ step_completed: stepNumber >= 3 }"
              step="3"
            >
              <div class="col-xs-11 question">
                What kind of changes are you making to the existing product?
              </div>
              
              <div class="col-xs-12 question-selection-type">Select one</div>
            </v-stepper-step>

            <v-stepper-content
              step="3"
              :class="{
                next_step_content: stepNumber > 3,
                disableline_till_select: scopeToolObj.change_type == '',
                dashed_content:
                  (scopeToolObj.market.includes('US') &&
                    scopeToolObj.product_type == 'EXISTING' &&
                    (scopeToolObj.change_type == 'IMPACT_USE' ||
                      scopeToolObj.change_type == 'NO_IMPACT')) ||
                  (scopeToolObj.market.includes('NON_US') &&
                    scopeToolObj.product_type == 'EXISTING' &&
                    scopeToolObj.change_type == 'NO_IMPACT'),
                solid_content:
                  scopeToolObj.market.includes('US') &&
                  scopeToolObj.market.includes('NON_US') &&
                  scopeToolObj.product_type == 'EXISTING' &&
                  scopeToolObj.change_type == 'IMPACT_USE'
              }"
            >
              <v-btn
                depressed
                @click="incrementStep(3, 'IMPACT_USE')"
                class="impact-btn"
                :class="{
                  market_selected: scopeToolObj.change_type == 'IMPACT_USE'
                }"
                >Product’s use and user interactions</v-btn
              >
              <v-btn
                depressed
                @click="incrementStep(3, 'NO_IMPACT')"
                :class="{
                  market_selected: scopeToolObj.change_type == 'NO_IMPACT'
                }"
                >No use-related changes</v-btn
              >
              <v-divider v-if="scopeToolObj.change_type != ''"></v-divider>
            </v-stepper-content>
            <div
              v-if="
                scopeToolObj.market.includes('US') &&
                !scopeToolObj.market.includes('NON_US') &&
                scopeToolObj.change_type != ''
              "
            >
              <!-- To download Market contains 'ONLY' US  & product_type as EXISTING & any change_type -->
              <v-stepper-step
                :class="{ final_step: stepNumber >= 3 }"
                step="final-step"
                :rules="[() => false]"
              >
              </v-stepper-step>
              <v-stepper-content
                step="final-step"
                class="final_step_content ht-175"
              >
                <div class="col-xs-12 disp-flex">
                  <div
                    class="col-xs-7 scope-ready"
                    v-if="scopeToolObj.change_type == 'IMPACT_USE'"
                  >
                    HFE Project Scope Description is ready!
                  </div>
                  <div
                    class="col-xs-7 scope-ready"
                    v-else-if="scopeToolObj.change_type == 'NO_IMPACT'"
                  >
                    No HFE Activites Required
                  </div>
                  <div class="col-xs-5 disp-flex col-gap-15">
                    <BaseButton
                      variant="secondary"
                      @click="viewPdf"
                      v-if="scopeToolObj.change_type != 'NO_IMPACT'"
                      >View</BaseButton
                    >
                    <BaseButton
                      has-icon
                      @click="downloadPdf"
                      v-if="scopeToolObj.change_type != 'NO_IMPACT'"
                    >
                      <img
                        src="/static/images/icons/download_icon_white.svg"
                        class="preview-svg"
                      />Download
                    </BaseButton>
                  </div>
                </div>
                <div class="col-xs-12 step-path float-prop">
                  <div class="col-xs-8">
                    <div>United States</div>
                    <div>Existing Product</div>
                    <div v-if="scopeToolObj.change_type == 'IMPACT_USE'">
                      Changes to use and user interactions
                    </div>
                    <div v-else>No Use-Related Changes</div>
                  </div>
                </div>
              </v-stepper-content>
            </div>
            <!-- Market Non_US flow and product_type as EXISTING -->
            <div v-if="scopeToolObj.market.includes('NON_US')">
              <div v-if="scopeToolObj.change_type == 'IMPACT_USE'">
                <v-stepper-step
                  :class="{ final_step: stepNumber >= 3 }"
                  step="final-step"
                  :rules="[() => false]"
                >
                </v-stepper-step>
                <!-- Market as US/Non_US flow & product_type as EXISTING & change_type as NO_IMPACT -->
                <v-stepper-content
                  step="final-step"
                  class="final_step_content ht-175"
                >
                  <div class="col-xs-12 disp-flex">
                    <div class="col-xs-7 scope-ready">
                      HFE Project Scope Description is ready!
                    </div>
                    <div class="col-xs-5 disp-flex col-gap-15">
                      <BaseButton variant="secondary" @click="viewPdf"
                        >View</BaseButton
                      >
                      <BaseButton has-icon @click="downloadPdf">
                        <img
                          src="/static/images/icons/download_icon_white.svg"
                          class="preview-svg"
                        />Download
                      </BaseButton>
                    </div>
                  </div>
                  <div class="col-xs-12 step-path float-prop">
                    <div class="col-xs-8">
                      <div
                        v-if="
                          scopeToolObj.market.includes('NON_US') &&
                          !scopeToolObj.market.includes('US')
                        "
                      >
                        Outside the United States
                      </div>
                      <div
                        v-else-if="
                          scopeToolObj.market.includes('NON_US') &&
                          scopeToolObj.market.includes('US')
                        "
                      >
                        United States + Outside the United States
                      </div>
                      <div>Existing Product</div>
                      <div>Changes to use and user interactions</div>
                    </div>
                  </div>
                </v-stepper-content>
              </div>
              <div v-if="scopeToolObj.change_type == 'NO_IMPACT'">
                <v-stepper-step
                  step="4"
                  :class="{ step_completed: stepNumber >= 4 }"
                >
                  <div class="col-xs-11 question">
                    When was the product initially released?
                  </div>
                  
                  <div class="col-xs-12 question-selection-type">
                    Select one
                  </div>
                </v-stepper-step>
                <v-stepper-content
                  step="4"
                  :class="{
                    disableline_till_select: scopeToolObj.duration == '',
                    dashed_content: scopeToolObj.duration != ''
                  }"
                >
                  <v-btn
                    depressed
                    @click="incrementStep(4, 'BEFORE_JAN_31')"
                    :class="{
                      market_selected: scopeToolObj.duration == 'BEFORE_JAN_31'
                    }"
                    >On or before Jan 31, 2015</v-btn
                  >
                  <v-btn
                    depressed
                    @click="incrementStep(4, 'AFTER_FEB_1')"
                    :class="{
                      market_selected: scopeToolObj.duration == 'AFTER_FEB_1'
                    }"
                    >After Feb 1, 2015</v-btn
                  >
                  <v-divider v-if="scopeToolObj.duration != ''"></v-divider>
                </v-stepper-content>
                <div v-if="scopeToolObj.duration != ''">
                  <v-stepper-step
                    :class="{ final_step: stepNumber > 4 }"
                    step="final-step"
                    :rules="[() => false]"
                  >
                  </v-stepper-step>
                  <v-stepper-content
                    step="final-step"
                    class="final_step_content"
                  >
                    <div class="col-xs-12 disp-flex">
                      <div class="col-xs-7 scope-ready">
                        HFE Project Scope Description is ready!
                      </div>
                      <div class="col-xs-5 disp-flex col-gap-15">
                        <BaseButton variant="secondary" @click="viewPdf"
                          >View</BaseButton
                        >
                        <BaseButton @click="downloadPdf" has-icon>
                          <img
                            src="/static/images/icons/download_icon_white.svg"
                            class="preview-svg"
                          />Download
                        </BaseButton>
                      </div>
                    </div>
                    <div class="col-xs-12 step-path float-prop">
                      <div class="col-xs-8">
                        <div v-if="scopeToolObj.market.length == 1">
                          Outside the United States
                        </div>
                        <div v-else>
                          United States + Outside the United States
                        </div>
                        <div>Existing Product</div>
                        <div>
                          No changes to product’s use or user interactions
                        </div>
                        <div v-if="scopeToolObj.duration == 'BEFORE_JAN_31'">
                          Released before Jan 31, 2015
                        </div>
                        <div v-else-if="scopeToolObj.duration == 'AFTER_FEB_1'">
                          Released after Feb 1, 2015
                        </div>
                      </div>
                    </div>
                  </v-stepper-content>
                </div>
              </div>
            </div>
          </div>
        </v-stepper>
      </v-app>
    </div>
    <div class="col-xs-12 header_box no-border p-0" v-if="learnMoreFlag">
      <div class="row">
        <div class="col-xs-12">
          <span class="calculation-text">Learn more</span>
        </div>
      </div>
    </div>
    <div
      class="col-xs-12 p-0 mb-10 learn-more-display-flex"
      v-if="learnMoreFlag"
    >
      <div class="sm-wd-350">
        <h1 class="text-emergo-green">Start HFE Report</h1>
        <p class="learn-more-text">
          Did you know you can (and should!) start your HFE Report before
          conducting your HF validation test? Check out our HFE Report template
          and training to learn more.
        </p>
        <BaseButton class="br-5 mt-10 xs-mb-30" @click="openInfo()"
          >Learn about HFE Reports</BaseButton
        >
      </div>
      <div class="sm-wd-350">
        <h1 class="text-emergo-green">We’re here to help</h1>
        <p class="learn-more-text">
          Would you like a quote for an HF validation test? Or are you unsure if
          you’re ready for HF validation? Our consulting team would be pleased
          to answer your questions.
        </p>
        <BaseButton class="br-5 mt-10" @click="redirectToContact"
          >Contact us</BaseButton
        >
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
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import cloneDeep from 'lodash/cloneDeep';
import Loader from '../UIComponents/Loader.vue';
import HfeModal from '../ProjectPlan/Validate/HfeModal.vue';
import { getScopeToolData } from '../../apis/tools';
import { pdfFileDownload } from '../../utils/pdf-file-download';
import { getTrainingData } from '../../apis/lmsTraining';
import { removeFromCart } from '../../apis/cart';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import EventBus from '../../utils/event-bus';
import postMarketoFormData from '../../apis/marketo';

export default {
  components: {
    HfeModal,
    Loader,
    AddRemoveCartPopup,
    BaseButton
  },
  props: ['userId', 'accountId'],
  data() {
    return {
      trainingInfo: null,
      cartInfo: {},
      loaderStatus: false,
      learnMoreFlag: false,
      stepNumber: 1,
      documentToDownload: true,
      scopeToolObj: {
        market: [],
        product_type: '',
        change_type: '',
        duration: ''
      }
    };
  },
  watch: {},
  mounted() {},
  async created() {
    this.getHfeData();
    if (this.$route.params.stepper) {
      this.updateObj();
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
    updateObj() {
      this.scopeToolObj = cloneDeep(this.$route.params.scopeObj);
      this.stepNumber = this.$route.params.stepper;
      this.learnMoreFlag = true;
    },
    clearAll() {
      this.scopeToolObj = {
        market: [],
        product_type: '',
        change_type: '',
        duration: ''
      };
      this.stepNumber = 1;
      this.learnMoreFlag = false;
    },
    async viewPdf() {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'View',
        form_control_details: 'HFE Project Scope'
      };
      postMarketoFormData(marketoForm);
      if (this.scopeToolObj.change_type === '') {
        this.scopeToolObj.change_type = 'NOT_SELECTED';
      }
      if (this.scopeToolObj.duration === '') {
        this.scopeToolObj.duration = 'NOT_SELECTED';
      }
      this.loaderStatus = true;
      const response = await getScopeToolData(this.scopeToolObj);
      this.loaderStatus = false;
      this.$router.push({
        name: 'ScopeToolPDFViewer',
        params: {
          pdfPath: response,
          scopeObj: this.scopeToolObj,
          stepper: this.stepNumber
        }
      });
    },
    clearNotifications() {
      this.$notify({
        clear: true
      });
    },
    async downloadPdf() {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem('userData')).email,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'Download',
        form_control_details: 'HFE Project Scope'
      };
      postMarketoFormData(marketoForm);

      if (this.scopeToolObj.change_type === '') {
        this.scopeToolObj.change_type = 'NOT_SELECTED';
      }
      if (this.scopeToolObj.duration === '') {
        this.scopeToolObj.duration = 'NOT_SELECTED';
      }
      this.loaderStatus = true;
      const filePath = await getScopeToolData(this.scopeToolObj);
      const response = await pdfFileDownload(filePath);
      this.loaderStatus = false;
      if (response && response.error) {
        this.clearNotifications();
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.error.errorMessage
        });
      }
    },
    incrementStep(stepValue, data) {
      this.learnMoreFlag = false;
      if (stepValue === 1) {
        // step 1
        if (!this.scopeToolObj.market.includes(data)) {
          this.stepNumber = stepValue + 1;
          this.scopeToolObj.market.push(data);
          this.scopeToolObj.product_type = '';
          this.scopeToolObj.change_type = '';
          this.scopeToolObj.duration = '';
        }
      }
      if (stepValue === 2) {
        this.stepNumber = stepValue + 1;
        this.scopeToolObj.product_type = data;
        if (!this.scopeToolObj.market.length) {
          this.scopeToolObj.product_type = '';
          this.stepNumber = 1;
          this.$notify({
            type: 'error',
            title: 'Select Market'
          });
        }
        this.scopeToolObj.change_type = '';
        if (data === 'NEW') {
          this.scopeToolObj.change_type = '';
          this.scopeToolObj.duration = '';
          this.learnMoreFlag = true;
        }
      }
      if (stepValue === 3) {
        this.stepNumber = stepValue + 1;
        this.scopeToolObj.change_type = data;
        this.scopeToolObj.duration = '';
        if (
          (this.scopeToolObj.market.includes('US') &&
            this.scopeToolObj.product_type === 'EXISTING' &&
            (this.scopeToolObj.change_type === 'IMPACT_USE' ||
              this.scopeToolObj.change_type === 'NO_IMPACT')) ||
          (this.scopeToolObj.market.includes('NON_US') &&
            this.scopeToolObj.product_type === 'EXISTING' &&
            this.scopeToolObj.change_type === 'IMPACT_USE')
        ) {
          this.learnMoreFlag = true;
        }
        if (
          this.scopeToolObj.market.includes('US') &&
          this.scopeToolObj.market.includes('NON_US') &&
          this.scopeToolObj.product_type === 'EXISTING' &&
          this.scopeToolObj.change_type === 'NO_IMPACT'
        ) {
          this.learnMoreFlag = false;
        }
      }
      if (stepValue === 4) {
        this.stepNumber = stepValue + 1;
        this.scopeToolObj.duration = data;
        this.learnMoreFlag = true;
      }
    },
    redirectToContact() {
      this.$router.push({
        name: 'ContactUs',
        params: { referrer: 'hfe-project-scope' }
      });
    },
    openInfo() {
      $('#modal_video').modal('show');
    },
    navigateToTools() {
      this.$router.push('/tools');
    }
  }
};
</script>
<style scoped>
.scope-body {
  margin: 0px 15px 0px 0px !important;
  padding-left: 0px;
}
.limit_popover_txt {
  text-align: left;
  word-break: break-word;
}
.info-img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

/* v stepper  */
.opus-stepper >>> .v-application--wrap {
  min-height: 70vh;
}
.opus-stepper >>> .v-sheet.v-stepper {
  box-shadow: none;
}
.opus-stepper
  >>> .theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(
    .v-stepper__step--complete
  ):not(.v-stepper__step--error)
  .v-stepper__step__step {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 38px;
  text-align: center;
  color: #333333;
  background: #ffffff;
  border: 8px solid #d3d6d9;
  box-shadow: 2.97297px 2.97297px 7.43243px rgba(0, 0, 0, 0.25);
  width: 55px;
  height: 57px;
}
.opus-stepper >>> .step_completed .v-stepper__step__step,
.opus-stepper >>> .final_step .v-stepper__step__step {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 38px;
  text-align: center;
  color: #333333;
  background: #ffffff;
  border: 8px solid #4c9e45 !important;
  box-shadow: 2.97297px 2.97297px 7.43243px rgba(0, 0, 0, 0.25);
  width: 55px;
  height: 57px;
  border: 8px solid #4c9e45;
  box-shadow: 2.97297px 2.97297px 7.43243px rgba(0, 0, 0, 0.25);
  background-color: #ffffff !important;
}

.opus-stepper >>> .final_step .v-icon::before {
  content: url('/static/images/icons/document.svg');
}

.v-application--is-ltr .v-stepper--vertical .v-stepper__content {
  margin: -16px -36px -16px 56px;
}

.opus-stepper
  >>> .v-application--is-ltr
  .theme--light.v-stepper--vertical
  .v-stepper__content:not(:last-child) {
  border-left: 7px solid #d3d6d9;
  margin: -16px -36px -24px 48px;
  padding: 40px 60px 16px 23px;
}
.opus-stepper >>> .v-stepper__content.next_step_content {
  border-left: 7px solid #4c9e45 !important;
}
.opus-stepper >>> .v-stepper__wrapper {
  height: auto !important;
  overflow: initial;
}
.opus-stepper >>> .dashed_content .v-divider {
  margin-bottom: 35px;
}
/* questions */
.opus-stepper >>> .theme--light.v-stepper .v-stepper__label .question,
.opus-stepper >>> .final_step_content .scope-ready {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
  text-shadow: none;
}
.opus-stepper >>> .final_step_content .step-path {
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
  margin-top: 10px;
}
.opus-stepper >>> .final_step_content .step-desc {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: #0b3c61;
  margin-top: 10px;
}
.opus-stepper
  >>> .theme--light.v-stepper
  .v-stepper__label
  .question-selection-type {
  /* question selection */
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #0b3c61;
  text-shadow: none;
}
.opus-stepper >>> .v-size--default {
  /* Button */
  background-color: #ffffff !important;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 38px;
  height: 44px !important;
  text-transform: initial;
}
.opus-stepper >>> .v-stepper__content.dashed_content {
  transition: none;
  border-left: 7px dashed #4c9e45 !important;
}
.opus-stepper >>> .v-stepper__content.solid_content {
  border-left: 7px solid #4c9e45 !important;
}
.opus-stepper >>> .v-stepper__content.disableline_till_select {
  border-left: none !important;
}
/* final step */
.opus-stepper >>> .v-stepper__content.final_step_content {
  margin: -100px 25px 10px 86px;
  background: #edf5ec;
  box-shadow: 4px 4px 10px rgb(0 0 0 0.25);
  border-radius: 5px;
  height: 220px;
  padding: 35px 0px 0px 0px;
}
.opus-stepper >>> .v-stepper__content.final_step_content.ht-160 {
  height: 160px;
}
.opus-stepper >>> .v-stepper__content.final_step_content.ht-175 {
  height: 175px;
}
.opus-stepper >>> .final_step_content .view-btn {
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-family: Nunito !important;
  font-style: normal !important;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  align-items: center;
  text-align: center;
  color: #0b3c61;
  width: 115px;
}
.opus-stepper >>> .disp-flex {
  display: flex;
}
.opus-stepper >>> .download-btn .download_icon {
  margin-right: 8px;
}
.opus-stepper >>> .final_step_content .download-btn {
  background-color: #4c9e45 !important;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-family: Nunito !important;
  font-style: normal !important;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  align-items: center;
  margin-left: 12px;
}
.opus-stepper >>> .v-size--default::before {
  background-color: #ffffff !important;
  transition: none;
}
.opus-stepper >>> .v-size--default.market_selected {
  background-color: #ffc62f !important;
}
.opus-stepper >>> .v-stepper__wrapper .v-size--default {
  width: 40%;
}
.opus-stepper >>> .v-stepper__wrapper:last-child .v-size--default {
  margin-left: 16px;
}
.opus-stepper >>> .v-btn__content {
  /* Button */
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #00518a;
}

/* learn more */
.header_box {
  border-bottom: 1px solid #bdbdbd;
  padding: 0px 0px 10px 20px;
}
.header_box.no-border {
  border-bottom: none;
}
.calculation-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
}
.learn-more-display-flex {
  display: flex;
  flex-direction: row;
  padding-left: 20px;
}
.learn-more-display-flex h1 {
  margin-top: 0;
}
.learn-more-text {
  padding-right: 110px;
}
/* Change to global */
.btn.wd-210 {
  width: auto;
}
@media screen and (max-width: 767px) {
  .xs-mb-30 {
    margin-bottom: 30px;
  }
  .tools-desc {
    flex-direction: column;
    row-gap: 10px;
  }
}
@media screen and (min-width: 768px) {
  .sm-wd-350 {
    width: 350px;
  }
}
@media screen and (max-width: 1024px) {
  .scope-body {
    margin: 0px !important;
    padding: 0px !important;
  }
  .opus-stepper >>> .impact-btn {
    width: 53% !important;
  }
  .opus-stepper >>> .theme--light.v-stepper .v-stepper__label .question,
  .opus-stepper >>> .final_step_content .scope-ready {
    font-size: 19px !important;
    font-weight: 500 !important;
  }
  .opus-stepper >>> .v-stepper__content.final_step_content {
    height: 240px;
  }
  .opus-stepper >>> .v-stepper__content.final_step_content.ht-160 {
    height: 180px;
  }
  .opus-stepper >>> .v-stepper__content.final_step_content.ht-175 {
    height: 200px;
  }
}
@media screen and (min-width: 1050px) and (max-width: 1241px) {
  .opus-stepper >>> .theme--light.v-stepper .v-stepper__label .question,
  .opus-stepper >>> .final_step_content .scope-ready {
    font-size: 20px !important;
  }
  .opus-stepper >>> .impact-btn {
    width: 53% !important;
  }
  .opus-stepper >>> .v-stepper__content.final_step_content {
    height: 240px;
  }
  .opus-stepper >>> .v-stepper__content.final_step_content.ht-160 {
    height: 180px;
  }
  .opus-stepper >>> .v-stepper__content.final_step_content.ht-175 {
    height: 200px;
  }
}
</style>
