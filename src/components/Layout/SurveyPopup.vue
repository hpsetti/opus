<template>
  <div id="surveyConsentPopup" class="modal" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header p-0">
          <div class="view-header">
            <span class="text-h3">What resource made you interested in joining OPUS?</span>
          </div>
        </div>
        <hr style="width: 96%" class="mx-auto" />
        <div>
          <div class="d-flex survey-content consent-title">
          <div v-for="list in surveyList" :key="list.id" class="">
          <div class="select-box d-flex align-items-center">
                        <div class="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              :value="list.id"
                              v-model="selectedSurveyList"
                            >
                            <span class="cr">
                              <i class="cr-icon glyphicon glyphicon-ok"></i>
                            </span>
                          </label>
                        </div>
                        <span class="pl-10">{{ list.product }}</span>
                      </div>
          </div>
          <hr style="width: 96%" class="mx-auto m-0" />
        </div>
        </div>
        <div>
          <div
            class="d-flex flex-column justify-content-center align-items-center footer"
          >
            <BaseButton data-dismiss="modal" @click="updateSurveyConsent" :disabled="selectedSurveyList.length <=0"
              >Submit
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from 'jquery';
import { getSurvey, updateSurveyConsent } from '../../apis/userConsent';
import Loader from '../UIComponents/Loader.vue';
// import OpusCheckboxGroup from '../UIComponents/OpusCheckboxGroup.vue';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  components: { Loader, 
    // OpusCheckboxGroup,
     BaseButton },
  data() {
    return {
      emailOptin: false,
      optInType: null,
      dataConsent: false,
      loaderStatus: false,
      surveyList: [],
      selectedSurveyList: [],
    };
  },
  computed: {
    // disableSubmit() {
    //   return !this.emailOptin || !this.dataConsent;
    // }
  },
  async created () {
    await this.getSurveyList();
  },
  methods: {
    async getSurveyList() {
      const data = await getSurvey();
      this.surveyList = data.survey_product_dtolist;
    },
    async updateSurveyConsent() {
      this.loaderStatus = true;
      const res = await updateSurveyConsent(['Y',this.selectedSurveyList]);
      this.loaderStatus = false;
      if (res && res.status_code === 200 && res.message === 'success') {
        this.clearNotifications();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Terms and conditions accepted.',
          group: 'custom-notification'
        });
        $('#chinaUserConsentPopup').modal('hide');
      } else {
        this.clearNotifications();
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'We had a problem updating your consent. Please try again.',
          group: 'custom-notification'
        });
      }
      // this.loaderStatus = false;

    },
    clearNotifications() {
      this.$notify({
        clear: true,
        group: 'custom-notification'
      });
    }
  }
};
</script>
<style scoped>
.china-modal {
  background: rgba(0, 0, 0, 0.8);
}
.modal-content {
  border-radius: 10px;
}
.modal-header {
  padding: 25px 25px 10px;
  background: #fff;
  border-radius: 10px;
  border: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
}
.modal-footer {
  background: #fff;
  border-radius: 10px;
  border: 0;
  padding: 30px 35px;
  text-align: right;
}
.close-icon {
  position: absolute;
  top: 18px;
  right: 18px;
}
.info-icon {
  width: 58px;
  height: 58px;
}
.modal-body {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.terms-conditions ml-15 {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}
.hide-btn {
  visibility: hidden;
}
.consent-title {
  margin: 0px 62px 18px 48px;
}
.consent-content {
  margin: 0px 56px 18px 51px;
  text-align: justify;
}
.survey-content {
  flex-direction: column;
    align-items: baseline;
}
.footer {
  row-gap: 28px;
  padding-top: 22px;
  padding-bottom: 22px;
}
</style>
