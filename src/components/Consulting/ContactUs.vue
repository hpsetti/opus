<template>
  <div class="col-xs-12 p-0 wrapper">
    <div
      class="col-xs-12 p-0 pr-15 pl-15 header d-flex align-items-center justify-content-between"
    >
      <span class="header-text"> Contact us </span>
      <span @click="$emit('close')">
        <img
          class="close-icon cursor-pointer"
          src="/static/images/icons/close_icon.svg"
        />
      </span>
    </div>
    <div class="col-xs-12 p-0 pl-30 pr-30 content mt-30">
      <div><span class="content-title">Consulting Project</span></div>
      <div class="col-xs-12 p-0">
        <p class="content-desciption">
          Thank you for reaching out to us about consulting project. Complete
          form below and we'll get back to you.
        </p>
      </div>
      <div class="col-xs-12 p-0 mt-20">
        <div class="form-group">
          <label
            >Full name<span class="mandatory-field-indicator">*</span></label
          >
          <input
            v-model.trim="$v.formData.full_name.$model"
            type="text"
            placeholder="Full name"
            :class="{ 'error-input': $v.formData.full_name.$error }"
            class="form-control contact-us-input"
            @input="handleUserDataLimit('full_name')"
          />
          <div v-if="$v.formData.full_name.$error" class="custom-error-class">
            Full name is required
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0 mt-5">
        <div class="form-group">
          <label
            >Company name<span class="mandatory-field-indicator">*</span></label
          >
          <input
            v-model.trim="$v.formData.company_name.$model"
            type="text"
            placeholder="Company name"
            :class="{ 'error-input': $v.formData.company_name.$error }"
            class="form-control contact-us-input"
            @input="handleUserDataLimit('company_name')"
          />
          <div
            v-if="$v.formData.company_name.$error"
            class="custom-error-class"
          >
            Company name is required
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0 mt-5">
        <div class="form-group">
          <label>Email<span class="mandatory-field-indicator">*</span></label>
          <input
            v-model.trim="$v.formData.email_address.$model"
            type="text"
            placeholder="Email"
            :class="{ 'error-input': $v.formData.email_address.$error }"
            class="form-control contact-us-input"
            @input="handleUserDataLimit('email_address')"
          />
          <div
            class="custom-error-class"
            v-if="$v.formData.email_address.$error"
          >
            <div v-if="!$v.formData.email_address.required">
              Email address is required
            </div>
            <div
              v-if="
                $v.formData.email_address.required &&
                !$v.formData.email_address.isValidMail
              "
            >
              Please enter valid email address
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0 mt-5">
        <div class="form-group">
          <label>Phone<span class="mandatory-field-indicator">*</span></label>
          <input
            v-model.trim="$v.formData.phone_number.$model"
            type="phone_number"
            placeholder="xxx xxx xxxx"
            :class="{ 'error-input': $v.formData.phone_number.$error }"
            class="form-control contact-us-input"
          />
          <div
            class="custom-error-class"
            v-if="$v.formData.phone_number.$error"
          >
            <div v-if="!$v.formData.phone_number.required">
              Phone number is required
            </div>
            <div v-else-if="!$v.formData.phone_number.isPhoneValidOrEmpty">
              Please enter valid phone number
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0 mt-5">
        <div class="form-group">
          <label
            >Question about your project<span class="mandatory-field-indicator"
              >*</span
            ></label
          >
          <textarea
            v-model.trim="$v.formData.question.$model"
            rows="5"
            :class="{ 'error-input': $v.formData.question.$error }"
            class="textarea p-10"
            placeholder="Question"
            @input="handleUserDataLimit('question')"
          />
          <div
            v-if="$v.formData.full_name.$error"
            class="custom-error-class custom-error-textarea"
          >
            Question is required
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0">
        <p class="content-desciption">
          Your message will be sent to our consulting team, who will be in touch
          within two business days.
        </p>
      </div>
    </div>
    <p v-if="errorMessage" class="error-message text-justify">
      {{ errorMessage }}
    </p>
    <div class="col-xs-12 p-0 pt-10 pb-10 d-flex justify-content-end footer col-gap-15">
      <BaseButton variant="secondary" @click="close">Cancel</BaseButton>
      <BaseButton :disabled="loadingStatus" @click="handleSubmit">
        Submit
      </BaseButton>
    </div>
    <loader :loadingStatus="loadingStatus" />
  </div>
</template>
<script>
import { contactUs } from '../../apis/consultings';
import Loader from '../UIComponents/Loader.vue';
import BaseButton from '../UIComponents/BaseButton.vue';
import { validateData } from './contactUsValidations';
import { useVuelidate } from '@vuelidate/core'


export default {
  name: 'ContactUs',
  props: {
    consulting: { type: Object, default: () => ({}) }
  },
  components: { Loader, BaseButton },
  setup() {
    return { $v: useVuelidate() }
  },
  validations: {
    formData: validateData
  },
  data() {
    return {
      formData: {
        full_name: '',
        company_name: '',
        email_address: '',
        phone_number: '',
        question: ''
      },
      userDataLengthLimit: {
        full_name: 65,
        company_name: 65,
        email_address: 65,
        question: 2000
      },
      loadingStatus: false,
      errorMessage: ''
    };
  },
  computed: {
    isUserDataValid() {
      return (
        Object.values(this.formData).every(
          (quoteDataValue) => !!quoteDataValue
        ) && this.isNumber(this.formData.phone_number)
      );
    }
  },
  beforeMount() {
    this.resetFields();
  },
  methods: {
    resetFields() {
      this.$v.$reset();
      this.formData = {
        full_name: '',
        company_name: '',
        email_address: '',
        phone_number: '',
        question: ''
      };
      this.loadingStatus = false;
      this.errorMessage = '';
    },
    isNumber(data) {
      if (!data) return false;
      const regex =
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //eslint-disable-line
      return regex.test(data);
    },
    handleUserDataLimit(fieldName) {
      if (this.formData[fieldName]) {
        this.formData[fieldName] = this.formData[fieldName].substr(
          0,
          this.userDataLengthLimit[fieldName]
        );
      }
    },
    buildPayload() {
      return {
        ...this.formData,
        consulting_id: this.consulting.consulting_id
      };
    },
    async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.errorMessage = '';
        this.loadingStatus = true;
        const response = await contactUs(this.buildPayload());
        if (response && response.status_code === 200) {
          this.$emit('submit');
        } else {
          this.errorMessage =
            (response && (response.data || response.message)) ||
            'Something went wrong';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
        this.loadingStatus = false;
      }
    },
    close() {
      this.resetFields();
      this.$emit('close');
    }
  }
};
</script>
<style scoped>
.wrapper {
  padding: 24px 24px 24px 32px;
}
.header-text {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
  color: #333333;
}
.content-title {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}
.content-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}
.textarea {
  border: 1px solid lightgray;
  width: 100%;
  border-radius: 5px;
  resize: none;
}
.textarea:focus,
.device-type:focus {
  border: 1px solid rgb(64, 154, 255);
  outline: none;
}
.form-group label {
  margin-bottom: 0px;
}
.custom-error-class {
  background-color: #ffebeb;
  padding: 5px 3px;
  color: #b00505;
  list-style-type: none;
  display: block;
  font-size: 12px;
  line-height: 14px;
  text-align: left;
}
.custom-error-textarea {
  margin-top: -6px;
  margin-bottom: 10px;
}
.mandatory-field-indicator {
  color: red;
  margin-left: 5px;
}

.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.cancel {
  border: 1px solid #0b3c61;
  color: #0b3c61;
  box-sizing: border-box;
  font-size: 16px;
  background-color: transparent;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.submit,
.submit:hover {
  color: white;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.submit,
.cancel {
  padding-left: 20px;
  padding-right: 20px;
}
.submit:hover {
  color: white;
}
.error-input {
  border: 1px solid red !important;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>
