<template>
  <div>
    <div id="ask-us-modal" class="modal" role="dialog">
      <div class="modal-dialog modal-lg custom-modal-class">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20">
          <div class="modal-header">
            <div class="col-xs-12 p-0 mb-10">
              <span class="ask-us-header"> Ask us an HFE question! </span>
              <img
                class="cursor-pointer close-modal"
                @click="closeAskUs"
                src="/static/images/icons/modal_close.svg"
                alt=""
              />
            </div>
          </div>
          <div class="row mb-20 mt-10">
            <div class="col-xs-12 mb-10">
              <p class="ask-us-sub-header">Provide us more details</p>
              <p class="ask-us-text">
                We are here to help any time you need a little extra HFE input
                or support. We are pleased to answer your technical HFE
                questions or help you navigate an HFE challenge.
              </p>
              <p class="ask-us-text">
                You’ll receive an email response from one of our HFE specialists
                within two business days.
              </p>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Subject</label><span style="color: red">*</span>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control common-input"
                  maxlength="249"
                  placeholder="Subject"
                  v-model="askSubject"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Message</label><span style="color: red">*</span>
              <div class="col-xs-12 p-0">
                <textarea
                  class="form-control"
                  style="resize: none"
                  rows="4"
                  cols="20"
                  maxlength="2000"
                  placeholder="Tell us more about your HFE question..."
                  v-model="askMessage"
                ></textarea>
              </div>
            </div>
          </div>
          <div
            class="footer col-xs-12 flex-wrapper align-items-center xs-flex-column col-gap-20"
          >
            <BaseButton @click="closeAskUs" variant="secondary" size="lg">
              Cancel
            </BaseButton>
            <div>
              <BaseButton size="lg" @click="askHfeQuestion()">
                Submit
              </BaseButton>
            </div>
          </div>
        </div>
        <loader :loadingStatus="loaderStatus"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import askUsHFE from '../../apis/askUsHFE';
import Loader from '../UIComponents/Loader.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../apis/marketo';

export default {
  data() {
    return {
      askSubject: '',
      askMessage: '',
      loaderStatus: false
    };
  },
  components: {
    Loader,
    BaseButton
  },
  methods: {
    closeAskUs() {
      this.resetForm();
      $('#ask-us-modal').modal('hide');
    },
    resetForm() {
      this.askSubject = '';
      this.askMessage = '';
    },
    async askHfeQuestion() {
      this.loaderStatus = true;
      const payload = {
        subject: this.askSubject,
        detail_description: this.askMessage
      };
      const response = await askUsHFE(payload);
      if (response) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const marketoForm = {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          company: userData.company,
          unstandardized_country: userData.country,
          Last_Interest: 'Human Factors Research & Design',
          page_urlextended: window.location.href,
          page_urlreferral_extended: document.referrer,
          o_psinquiry_type: 'Sales',
          form_control: 'Contact',
          form_control_details: 'Ask us an HFE question',
          customer_comments: `Subject: ${payload.subject}; Comments: ${payload.detail_description}`
        };
        postMarketoFormData(marketoForm);
        this.$notify({
          type: 'success',
          title: 'Success',
          text: response.data
        });
        this.closeAskUs();
      } else if (response === undefined) {
        // this need to change from server as we are not dealing with 400 differed for now
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Subject/Message should not be null'
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data
        });
      }
      this.loaderStatus = false;
    }
  }
};
</script>

<style scoped>
.close-modal {
  float: right;
  margin-top: 10px;
  margin-right: 15px;
  color: #ffffff !important;
}

.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}

.modal-footer {
  background: #fff;
  border-top: none;
}

.modal-body {
  background: #fff;
  max-height: 60vh;
  overflow: auto;
  padding-left: 0px;
  padding-bottom: 50px;
}

.save-button:hover {
  color: #f2f2f2;
}

.footer-btn-common-properties {
  border-radius: 5px;
  line-height: 21px;
  font-size: 18px;
  font-weight: 500;
}
.flex-wrapper {
  display: flex;
  justify-content: flex-end;
}
.ask-us-header {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
  color: #333333;
}
.ask-us-sub-header {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}
.ask-us-text {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}
.cancel-button {
  padding: 9px 32px;
  height: 44px;
  background: #ffffff;
  border: 1px solid #0b3c61;
  color: #0b3c61;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.save-button {
  padding: 9px 32px;
  height: 44px;
  background: #4c9e45;
  color: #f2f2f2;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
