<template>
  <div id="user-consent" class="modal" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header p-0">
            <div class="view-header">
              <span class="text-h3" v-if="optInType === 'pipl'">Terms and Conditions</span>
              <span class="text-h3" v-else>Email Preferences</span>
              <img
                v-if="optInType !== 'pipl'"
                data-dismiss="modal"
                class="cursor-pointer close-icon pt-20"
                src="/static/images/icons/close_icon.svg"
                alt="Close modal"
                @click="updateConsent('P')"
              />
            </div>
          </div>
          <hr style="width: 96%" class="mx-auto" />
        <div>
          <div class="consent-title blue-1 text-h5">
            <span v-if="optInType === 'pipl'"
              >Please review and agree with the mandatory policies, terms and
              conditions added below to use the application further.</span
            >
            <span v-else>
              Please update your email preferences below. Email communication helps
              us keep you informed.
            </span>
          </div>
          <div v-if="optInType === 'single'">
            <OpusCheckbox
              v-model="emailOptin"
              class="consent-content text-regular-large black-2"
              :html="labels.single"
            ></OpusCheckbox>
          </div>
          <div v-else-if="optInType === 'pipl'">
            <OpusCheckbox
              v-model="dataConsent"
              class="consent-content text-regular-large black-2"
              :html="labels.pipl2"
            ></OpusCheckbox>
          </div>
          <div v-else-if="optInType === 'double'">
            <div
              class="consent-content text-regular-large black-2"
              v-html="labels.double"
            ></div>
            <OpusCheckbox
              v-model="emailOptin"
              class="consent-content text-regular-large black-2"
              :html="labels.double2"
            ></OpusCheckbox>
          </div>
          <hr style="width: 96%" class="mx-auto m-0" />
        </div>
        <div>
          <div
            class="d-flex flex-column justify-content-center align-items-center footer"
          >
            <BaseButton @click="updateConsent('Y')" :disabled="disableSubmit"
              >Submit
            </BaseButton>
            <!-- <OpusLink
              size="sm"
              :class="{ 'd-none': !showUserConsentNeverBtnChina }"
              @click="updateConsent('N')"
              >Never</OpusLink
            > -->
            <OpusLink
              size="sm"
              :class="{ 'd-none': optInType === 'pipl' }"
              @click="updateConsent('P')"
              >Skip for now</OpusLink
            >
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import Loader from '../UIComponents/Loader.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import OpusCheckbox from '../UIComponents/OpusCheckbox.vue';
import OpusLink from '../UIComponents/OpusLink.vue';
import { updateConsent, postChinaValidity } from '../../apis/team';
import { successNotification, errorNotification } from '../../utils/common';
import postMarketoFormData from '../../apis/marketo';

export default {
  name: 'UserConsentPopup',
  props: ['optInType', 'showUserConsentNeverBtn', 'userId'],
  components: {
    Loader,
    BaseButton,
    OpusCheckbox,
    OpusLink
  },
  data() {
    return {
      emailOptin: false,
      dataConsent: false,
      loading: false,
      loaderStatus: false,
      labels: {
        single:
          'By submitting this form, I agree to <a href="https://www.ul.com/resources/online-policies" target="_blank">Emergo by UL\'s Online Policies</a> and agree to receive periodic emails from Emergo by UL containing best practices, education, industry research, news, updates and promotions related to Emergo by UL\'s products and services. I understand that I can unsubscribe at any time by visiting our <a href="https://www.emergobyul.com/preference-center" target="_blank">Preference Center</a>.',
        pipl1:
          'By clicking this checkbox, I agree to <a href="https://www.ul.com/resources/online-policies" target="_blank">Emergo by UL\'s Online Policies</a> and agree to receive periodic emails from Emergo by UL containing best practices, education, industry research, news, updates and promotions related to Emergo by UL\'s products and services. I understand that I can unsubscribe at any time by visiting our <a href="https://www.emergobyul.com/preference-center" target="_blank">Preference Center</a>.',
        pipl2:
          'By clicking this checkbox, I agree Emergo by UL may process my personal information in accordance with the <a href="https://www.ul.com/resources/online-policies" target="_blank">Emergo by UL\'s Online Policies</a> and to the cross-border transfer of my personal information to the United States.',
        double:
          'By submitting this form, I agree to <a href="https://www.ul.com/resources/online-policies" target="_blank">Emergo by UL\'s Online Policies</a>.',
        double2:
          'I would like to receive periodic emails from Emergo by UL containing best practices, education, industry research, news, updates and promotions related to Emergo by UL\'s products and services. I understand that I can unsubscribe at any time by visiting our <a href="https://www.emergobyul.com/preference-center" target="_blank">Preference Center</a >.'
      }
    };
  },
  computed: {
    disableSubmit() {
      return (
        ((this.optInType === 'single' || this.optInType === 'double') &&
          !this.emailOptin) ||
        (this.optInType === 'pipl' && !this.dataConsent)
      );
    }
  },
  methods: {
    successNotification,
    errorNotification,
    hideConsentPopup() {
      $('#user-consent').modal('hide');
    },
    async updateConsent(consentType) {
      this.loaderStatus = true;
      const response = await updateConsent(consentType);
      this.loaderStatus = false;
      if (response && response.message === 'success') {
        if (this.optInType === 'pipl') {
          this.successNotification('Email preference updated');
          const user = JSON.parse(localStorage.getItem('userId'));
          const data = {
            user_id: user,
            china_consent: true,
          };
          await postChinaValidity(data);
        }
        const userData = JSON.parse(localStorage.getItem('userData'));
        const marketoForm = {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          company: userData.company,
          unstandardized_country: userData.country,
          page_urlextended: window.location.href,
          page_urlreferral_extended: document.referrer,
          Last_Interest: 'Human Factors Research & Design',
          form_control: 'Subscribe'
        };
        if (consentType === 'Y') {
          marketoForm.form_control_details = 'Emergo Talking Points';
          marketoForm.o_ps_newsletter_name = 'Emergo Talking Points';
          marketoForm.email_optin = true;
        } else if (consentType === 'N') {
          marketoForm.form_control_details = 'Never';
        } else if (consentType === 'P') {
          marketoForm.form_control_details = 'Remind me later';
        }
        postMarketoFormData(marketoForm);
      } else {
        this.errorNotification(
          'We have a problem updating your preferences. Please try again later.'
        );
      }
      this.hideConsentPopup();
    }
  }
};
</script>

<style scoped>
.consent-title {
  margin: 0px 62px 18px 48px;
}
.consent-content {
  margin: 0px 56px 18px 51px;
  text-align: justify;
}
.footer {
  row-gap: 28px;
  padding-top: 22px;
  padding-bottom: 22px;
}
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
</style>
