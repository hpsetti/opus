<template>
  <div class="content-wrappper">
    <div class="row m-0">
      <div class="col-md-12">
        <form @submit.prevent="submitForm">
          <div class="row mb-25 mt-20">
            <div class="col-md-5">
              <label>Full Name</label><span class="required-asterisk">*</span>
              <input
                class="form-control"
                type="text"
                :class="{ field_error: v$.formData.full_name.$error }"
                :maxLength="formDataLengthLimit['full_name']"
                v-model.trim="v$.formData.full_name.$model"
                @input="resolveUserDataLength('full_name')"
              />
              <div class="error_text" v-if="v$.formData.full_name.$error">
                <div v-if="v$.formData.full_name.required">
                  Full Name is required
                </div>
                <div
                  v-if="
                    v$.formData.full_name.required &&
                    !v$.formData.full_name.minLength
                  "
                >
                  Minimum 2 characters required
                </div>
                <div v-if="!v$.formData.full_name.maxLength">
                  Maximum 250 characters required
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-md-5">
              <label>Business Email</label
              ><span class="required-asterisk">*</span>
              <input
                class="form-control"
                type="text"
                :maxLength="formDataLengthLimit['business_email_address']"
                :class="{
                  field_error: v$.formData.business_email_address.$error
                }"
                v-model.trim="v$.formData.business_email_address.$model"
                @input="resolveUserDataLength('business_email_address')"
              />
              <div
                class="error_text"
                v-if="v$.formData.business_email_address.$error"
              >
                <div v-if="!v$.formData.business_email_address.required">
                  Business Email is required
                </div>
                <div
                  v-if="
                    v$.formData.business_email_address.required &&
                    !v$.formData.business_email_address.isValidMail
                  "
                >
                  Please enter valid email
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-md-5">
              <label>Phone (include country code)</label>
              <input
                class="form-control"
                type="text"
                :class="{ field_error: v$.formData.phone_number.$error }"
                v-model.trim="v$.formData.phone_number.$model"
              />
              <div class="error_text" v-if="v$.formData.phone_number.$error">
                <div v-if="!v$.formData.phone_number.isPhoneValidOrEmpty">
                  Please enter valid Phone
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-md-5">
              <label>Company</label>
              <input
                class="form-control"
                :maxLength="formDataLengthLimit['company']"
                type="text"
                :class="{ field_error: v$.formData.company.$error }"
                v-model.trim="v$.formData.company.$model"
                @input="resolveUserDataLength('company')"
              />
              <div class="error_text" v-if="v$.formData.company.$error">
                <div v-if="!v$.formData.company.minLength">
                  Minimum 2 characters required
                </div>
                <div v-if="!v$.formData.company.isAlphaNumOrEmpty">
                  First character should be alphanumeric
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-md-10 form-group">
              <label
                >How may we help you? (Please provide as much detail as
                possible)</label
              >
              <textarea
                type="text"
                class="form-control"
                rows="6"
                :maxlength="formDataLengthLimit['detail_description']"
                :class="{ field_error: v$.formData.detail_description.$error }"
                v-model.trim="v$.formData.detail_description.$model"
                @input="resolveUserDataLength('detail_description')"
              ></textarea>
              <div
                class="error_text"
                v-if="v$.formData.detail_description.$error"
              >
                <div v-if="!v$.formData.detail_description.minLength">
                  Minimum 3 characters required
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-md-10 txt-rt">
              <BaseButton type="submit">Submit</BaseButton>
            </div>
          </div>
        </form>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import { validateData } from './validator';
import addContactUs from '../../apis/contactus';
import Loader from '../UIComponents/Loader.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../apis/marketo';
import { useVuelidate } from '@vuelidate/core'


export default {
  props: ['account_id', 'userId', 'roleId'],
  
  data() {
    return {
      userData: {},
      formData: {
        full_name: '',
        business_email_address: '',
        phone_number: '',
        company: '',
        detail_description: '',
        account_id: '',
        created_date: ''
      },
      loaderStatus: false,
      formDataLengthLimit: {
        full_name: 65,
        company: 65,
        business_email_address: 65,
        detail_description: 2000
      },
      marketoActivities: {
        'ask-a-question': 'Ask a Question',
        'request-a-demo': 'Demo Request',
        'hf-validation': 'HF Validation Calculator',
        'hfe-project-scope': 'HF Project Scope'
      }
    };
  },
  components: {
    Loader,
    BaseButton
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations: {
    formData: validateData
  },
  methods: {
    resolveUserDataLength(fieldName) {
      if (this.formData[fieldName]) {
        this.formData[fieldName] = this.formData[fieldName].substr(
          0,
          this.formDataLengthLimit[fieldName]
        );
      }
    },
    async submitForm() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.formData.account_id = this.account_id;
        this.formData.created_date = new Date();
        this.loaderStatus = true;
        const response = await addContactUs(this.formData);
        this.loaderStatus = false;
        if (response) {
          const formControlDetails = this.$route.params.referrer
            ? this.marketoActivities[this.$route.params.referrer]
            : 'Contact Us';
          const marketoForm = {
            first_name: this.userData.first_name,
            last_name: this.userData.last_name,
            unstandardized_name: this.formData.full_name,
            email: this.userData.email,
            alternative_email: this.formData.business_email_address,
            phone: this.formData.phone_number,
            company: this.formData.company,
            unstandardized_country: this.userData.country,
            Last_Interest: 'Human Factors Research & Design',
            page_urlextended: window.location.href,
            page_urlreferral_extended: document.referrer,
            o_psinquiry_type: 'Sales',
            form_control: 'Contact',
            form_control_details: formControlDetails,
            customer_comments: this.formData.detail_description
          };
          postMarketoFormData(marketoForm);
          this.formReset();
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Form submitted successfully!'
          });
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'contact_us_form_submission',
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Please try again later!'
          });
        }
      }
    },
    formReset() {
      this.v$.$reset();
      this.formData = {
        full_name: '',
        business_email_address: '',
        phone_number: '',
        company: '',
        numberof_employees: '',
        location: '',
        business_unit: '',
        detail_description: '',
        account_id: '',
        created_date: ''
      };
    }
  },
  mounted() {
    this.userData = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : {};
    this.formData.business_email_address = this.userData.email;
  }
};
</script>
<style scoped>
.required-asterisk {
  padding-left: 5px;
  color: red;
}

label {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
.mt-20 {
  margin-top: 20px;
}
.mb-25 {
  margin-bottom: 25px;
}
textarea {
  resize: none;
}
.submit_button {
  background: #4c9e45;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 6px 40px;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  outline: none;
  border: none;
}
.submit_button:hover {
  opacity: 0.8;
}
button[disabled],
button[disabled]:hover {
  cursor: not-allowed;
  opacity: 0.4;
}
.txt-rt {
  text-align: right;
}
</style>
