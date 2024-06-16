<template>
  <div id="chinaUserConsentPopup" class="modal" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header p-0">
            <div class="view-header">
              <span class="text-h3">Email Preferences</span>
              <img
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
            <span>
              Please update your email preferences below. Email communication
              helps us keep you informed.
            </span>
          </div>
          <div>
            <OpusCheckbox
              v-model="emailOptin"
              class="consent-content text-regular-large black-2"
              :html="labels.single"
            ></OpusCheckbox>
          </div>
          <div>
            <OpusCheckbox
              v-model="dataConsent"
              class="consent-content text-regular-large black-2"
              :html="labels.double"
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
import { updateConsent } from '../../apis/userConsent';
import Loader from '../UIComponents/Loader.vue';
import OpusLink from '../UIComponents/OpusLink.vue';
import OpusCheckbox from '../UIComponents/OpusCheckbox.vue';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  components: { Loader, OpusCheckbox, OpusLink, BaseButton },
  props: ['consentType', 'showUserConsentNeverBtnChina'],
  data() {
    return {
      emailOptin: false,
      optInType: null,
      dataConsent: false,
      loaderStatus: false,
      labels: {
        single:
          'By clicking this checkbox, I agree to <a class="term-priv" href="https://www.ul.com/resources/online-policies" target="_blank" >Emergo by UL’s Online Policies </a> and agree to receive periodic emails from Emergo by UL Solutions containing best practices, education, industry research, news, updates and promotions related to Emergo by UL’s products and services. I understand that I can unsubscribe at any time by visiting our <a class="term-priv" href="https://www.emergobyul.com/preference-center" target="_blank" >Preference Center.</a>',
        double:
          'By clicking this checkbox, I agree Emergo by UL may process my personal information in accordance with the <a class="term-priv" href="https://www.ul.com/resources/online-policies" target="_blank" >Emergo by UL’s Online Policies </a> and to the cross-border transfer of my personal information to the United States.'
      }
    };
  },
  computed: {
    disableSubmit() {
      return !this.emailOptin || !this.dataConsent;
    }
  },
  methods: {
    async updateConsent(consentType) {
      this.loaderStatus = true;
      const payload = {
        consent_type_id: this.consentType.id,
        consent: consentType
      };
      const res = await updateConsent(payload);
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
.footer {
  row-gap: 28px;
  padding-top: 22px;
  padding-bottom: 22px;
}
</style>
