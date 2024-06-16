<template>
  <div>
    <div id="suggest-root-cause" class="modal" role="dialog">
      <div class="modal-dialog modal-lg custom-modal-class">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20">
          <div class="modal-header">
            <div class="col-xs-12 p-0 mb-10">
              <span class="modal-title"> Suggest a root cause </span>
              <img
                class="cursor-pointer close-modal"
                @click="closeRootCauseInfo"
                src="/static/images/icons/close_icon.svg"
                alt=""
              />
            </div>
          </div>
          <div class="row mb-20 mt-10">
            <div class="col-xs-12 mb-10">
              <label>Name (optional)</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control common-input"
                  maxlength="150"
                  placeholder="Enter Name"
                  v-model="formData.userName"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Email (optional)</label>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control common-input"
                  maxlength="150"
                  placeholder="Enter Email"
                  v-model.trim="$v.formData.emailAddress.$model"
                />
                <!-- <div class="error_text" v-if="$v.formData.emailAddress.$error">
                  <div v-if="!$v.formData.emailAddress.required">Email is required</div>
                  <div v-if="!$v.formData.emailAddress.isValidMail">Please enter valid email</div>
                </div> -->
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label
                >Tell us more about the root cause you would like to see added
                to the library<span style="color: red">*</span></label
              >
              <div class="col-xs-12 p-0">
                <textarea
                  class="form-control"
                  style="resize: none"
                  rows="4"
                  cols="20"
                  maxlength="2000"
                  placeholder="Tell us more about the root cause you would like to see added to the library"
                  v-model="formData.detailMessage"
                ></textarea>
              </div>
            </div>
          </div>
          <div
            class="footer col-xs-12 mt-10 p-0 d-flex justify-content-end col-gap-15"
          >
            <BaseButton @click="closeRootCauseInfo" variant="secondary">
              Cancel
            </BaseButton>
            <BaseButton @click="suggestRootCause"> Submit </BaseButton>
          </div>
        </div>
        <loader :loadingStatus="loaderStatus"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { suggestRootCause } from '../../../apis/rootCauseAnalysis';
import Loader from '../../UIComponents/Loader.vue';
import { validateData } from './validator';
import BaseButton from '../../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../../apis/marketo';
import { useVuelidate } from '@vuelidate/core'

export default {
  props: ['rootCauseModalInfo'],
  data() {
    return {
      formDetails: {},
      userName: null,
      emailAddress: null,
      detailMessage: null,
      loaderStatus: false,
      formData: {
        userName: '',
        emailAddress: '',
        detailMessage: ''
      },
      userData: {}
    };
  },
  components: {
    Loader,
    BaseButton
  },
  setup() {
    return { $v: useVuelidate() }
  },
  validations: {
    formData: validateData
  },
  mounted() {
    this.getUserData();
  },

  methods: {
    getUserData() {
      this.userData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : {};
      this.formData.emailAddress = this.userData.email;
      this.formData.userName = `${this.userData.first_name} ${this.userData.last_name}`;
    },
    closeRootCauseInfo() {
      this.resetForm();
      $('#suggest-root-cause').modal('hide');
    },
    resetForm() {
      this.formData.detailMessage = '';
      this.getUserData();
    },
    async suggestRootCause() {
      this.loaderStatus = true;
      const marketoForm = {
        first_name: this.userData.first_name,
        last_name: this.userData.last_name,
        unstandardized_name: this.formData.userName,
        email: this.userData.email,
        alternative_email: this.formData.emailAddress,
        Last_Interest: 'Human Factors Research & Design',
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: 'Contact',
        form_control_details: 'Suggest a RCA',
        customer_comments: this.formData.detailMessage
      };
      postMarketoFormData(marketoForm);
      const payload = {
        detail_suggest: this.formData.detailMessage,
        email_address: this.formData.emailAddress,
        name: this.formData.userName
      };
      const response = await suggestRootCause(payload);
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: response.data
        });
        this.closeRootCauseInfo();
      } else if (response === undefined) {
        this.$notify({
          type: 'error',
          title: 'error',
          text: 'Message should not be null'
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
.modal-title {
  font-weight: 200;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}
.card {
  margin: 10px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.close-modal {
  float: right;
  margin-top: -8px;
  margin-right: 15px;
  color: #ffffff !important;
}
.w-130 {
  width: 130px;
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

.text-start {
  text-align: start;
}

.save-button {
  border: 1px solid #4c9e45;
  background-color: #4c9e45;
  color: #f2f2f2;
}

.save-button:hover {
  color: #f2f2f2;
}

.cancel-button {
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  text-align: center;
  color: #0b3c61;
  margin-right: 15px;
}

.cancel-button:hover {
  color: #0b3c61;
}

.flex-wrapper {
  display: flex;
  justify-content: flex-end;
}

.footer-btn-common-properties {
  border-radius: 5px;
  line-height: 21px;
  font-size: 18px;
  font-weight: 500;
}
</style>
