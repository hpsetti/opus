<template>
  <div class="col-xs-12 p-0 quote-request-container">
    <div
      class="col-xs-12 p-0 pr-15 pl-15 header d-flex align-items-center justify-content-between"
    >
      <div class="header-text d-flex align-items-center">
        <img
          src="/static/images/icons/consulting_item.svg"
          class="header-icon"
        />
        <p class="header-icon-text">Consulting Request</p>
      </div>
      <span>
        <img
          class="close-icon cursor-pointer"
          src="/static/images/icons/close_icon_white.svg"
          @click="close"
        />
      </span>
    </div>
    <div class="col-xs-12 p-0 pl-30 content mt-30">
      <div><span class="content-title">Provide us more details</span></div>
      <div>
        <p class="content-desciption">
          To provide resources of the best skill set for your needs, let us know
          a few more details about your project.
        </p>
      </div>
      <div>
        <div class="form-group">
          <label
            >Project name<span class="mandatory-field-indicator">*</span></label
          >
          <input
            type="text"
            v-model.trim="v$.formData.project_name.$model"
            :class="{ error: v$.formData.project_name.$error }"
            class="project-name form-control"
            placeholder="Enter Project name"
            @input="handleQuoteDataLength('project_name')"
          />
          <div
            v-if="v$.formData.project_name.$error"
            class="custom-error-class"
          >
            Project name is required
          </div>
        </div>
      </div>
      <div>
        <div class="form-group">
          <label
            >Device Type<span class="mandatory-field-indicator">*</span></label
          >
          <input
            type="text"
            v-model.trim="v$.formData.device_type.$model"
            :class="{ error: v$.formData.device_type.$error }"
            class="device-type form-control"
            placeholder="Enter Device Type"
            @input="handleQuoteDataLength('device_type')"
          />
          <div v-if="v$.formData.device_type.$error" class="custom-error-class">
            Device type is required
          </div>
        </div>
      </div>
      <div>
        <div class="form-group">
          <label>Phone<span class="mandatory-field-indicator">*</span></label>
          <input
            v-model.trim="v$.formData.phone_number.$model"
            :class="{ error: v$.formData.phone_number.$error }"
            type="phone_number"
            placeholder="xxx xxx xxxx"
            class="device-type form-control"
          />
          <div
            class="custom-error-class"
            v-if="v$.formData.phone_number.$error"
          >
            <div v-if="v$.formData.phone_number.required">
              Phone number is required
            </div>
            <div v-else-if="!v$.formData.phone_number.isPhoneValidOrEmpty">
              Please enter valid phone number
            </div>
          </div>
        </div>
      </div>
      <div
        class="row-gap-30 col-gap-30 d-flex flex-wrap"
      >
        <div class="col-xs-12 col-sm-5 col-md-3 p-0">
          <div class="form-group">
            <label
              >Preferred start date<span class="mandatory-field-indicator"
                >*</span
              ></label
            >
            <date-picker
              type="date"
              format="MM-DD-YYYY"
              class="quote-date-picker"
              valueType="format"
              lang="en"
              :editable="false"
              placeholder="DD-MM-YYYY"
              v-model:value="v$.formData.start_date.$model"
              :class="{ error: v$.formData.start_date.$error }"
              :disabled-date="disabledStartDate"
              @input="handleStartDateChange"
            />
            <div
              v-if="v$.formData.start_date.$error"
              class="custom-error-class"
            >
              Start date is required
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-5 col-md-3 p-0">
          <div class="form-group">
            <label
              >End date<span class="mandatory-field-indicator">*</span></label
            >
            <date-picker
              type="date"
              format="MM-DD-YYYY"
              class="quote-date-picker"
              valueType="format"
              lang="en"
              :editable="false"
              placeholder="DD-MM-YYYY"
              v-model:value="v$.formData.end_date.$model"
              :class="{ error: v$.formData.end_date.$error }"
              :disabled="!formData.start_date"
              :disabled-date="disabledEndDate"
            />
            <div v-if="v$.formData.end_date.$error" class="custom-error-class">
              End date is required
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          >Other details<span class="mandatory-field-indicator">*</span></label
        >
        <textarea
          v-model.trim="v$.formData.other_details.$model"
          :class="{ error: v$.formData.other_details.$error }"
          rows="5"
          class="other-details textarea p-10"
          placeholder="Tell us more...."
          @input="handleQuoteDataLength('other_details')"
        />
        <div
          v-if="v$.formData.other_details.$error"
          class="custom-error-class custom-error-textarea"
        >
          Other details is required
        </div>
      </div>
      <div>
        <p class="mt-10">
          Your message will be sent to our consulting team, who will be in touch
          within two business days.
        </p>
      </div>
    </div>
    <p v-if="submitErrorMessge" class="error-message text-center">
      {{ submitErrorMessge }}
    </p>
    <div
      class="col-xs-12 p-0 pl-15 pt-10 footer d-flex flex-wrap align-items-center justify-content-end"
    >
      <BaseButton variant="secondary" @click="close">Cancel</BaseButton>
      <BaseButton :disabled="loadingStatus" class="ml-10" @click="handleSubmit"
        >Request a quote</BaseButton
      >
    </div>
    <loader :loadingStatus="loadingStatus" />
  </div>
</template>
<script>
import DatePicker from 'vue-datepicker-next';
import Loader from '../UIComponents/Loader.vue';
import { quoteConsulting } from '../../apis/consultings';
import { validateData } from './requestQuoteValidations';
import BaseButton from '../UIComponents/BaseButton.vue';
import { useVuelidate } from '@vuelidate/core';

export default {
  name: 'RequestQuote',
  props: { consulting: { type: Object, default: () => ({}) } },
  components: { DatePicker, Loader, BaseButton },
  setup() {
    return { v$: useVuelidate() }
  },
  validations: {
    formData: validateData
  },
  data() {
    return {
      formData: {
        device_type: null,
        project_name: null,
        end_date: null,
        start_date: null,
        other_details: '',
        phone_number: null
      },
      startDate: null,
      endDate: null,
      deviceType: null,
      phoneNumber: '',
      projectName: null,
      otherDetails: '',
      errorMessage: '',
      loadingStatus: false,
      submitErrorMessge: '',
      quoteDataCharLimit: {
        other_details: 2000
      },
      defaultMaxCharLength: 65
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
      this.v$.$reset();
      this.formData = {
        device_type: null,
        project_name: null,
        end_date: null,
        start_date: null,
        other_details: '',
        phone_number: null
      };
      this.errorMessage = '';
    },
    isNumber(phoneNumber) {
      if (!phoneNumber) return false;
      const regex =
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //eslint-disable-line
      return regex.test(phoneNumber);
    },
    disabledStartDate(date) {
      const currentDate = new Date();
      return date && currentDate.valueOf() >= date.valueOf();
    },
    disabledEndDate(date) {
      if (this.formData.start_date) {
        const startDate = new Date(
          this.formatDMYToYMD(this.formData.start_date)
        );
        return startDate.valueOf() >= date.valueOf();
      }
      return true;
    },
    close() {
      this.resetFields();
      this.$emit('close');
    },
    handleStartDateChange() {
      if (
        this.formData.end_date &&
        (!this.formData.start_date ||
          new Date(this.formData.start_date).valueOf() >=
            new Date(this.formData.end_date).valueOf())
      ) {
        this.formData.end_date = null;
      }
    },
    handleQuoteDataLength(fieldName) {
      if (this.formData[fieldName]) {
        this.formData[fieldName] = this.formData[fieldName].substr(
          0,
          this.quoteDataCharLimit[fieldName] || this.defaultMaxCharLength
        );
      }
    },
    formatDMYToYMD(date) {
      const [month, day, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
    buildPayload() {
      const startDate = new Date(
        `${this.formatDMYToYMD(this.formData.start_date)} 12:00:00`
      ).toISOString();
      const endDate = new Date(
        `${this.formatDMYToYMD(this.formData.end_date)} 12:00:00`
      ).toISOString();
      return {
        ...this.formData,
        end_date: endDate,
        start_date: startDate,
        consulting_basic_dto: {
          consulting_id: this.consulting.consulting_id
        },
        consulting_status: {
          status_id: 0
        }
      };
    },
    validateQuoteData() {
      this.errorMessage = '';
      if (!this.isUserDataValid) {
        this.errorMessage = 'Please fill all the fields';
        return false;
      }
      return true;
    },
    async handleSubmit() {
      this.v$.$touch();
      if (this.validateQuoteData()) {
        this.loadingStatus = true;
        const response = await quoteConsulting(this.buildPayload());
        if (response && response.status_code === 200) {
          this.$emit('submit');
        } else {
          this.submitErrorMessge =
            (response && (response.data || response.message)) ||
            'Something went wrong';
          setTimeout(() => {
            this.submitErrorMessge = '';
          }, 5000);
        }
        this.loadingStatus = false;
      }
    }
  }
};
</script>
<style scoped>


.quote-request-container {
  padding: 17px 15px;
}
.header {
  height: 70px;
  background: #79b0de;
  border-radius: 5px;
  color: white;
}
.header-icon-text {
  line-height: 30px;
  margin: 0;
}
.header-text {
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
}
.close-icon {
  width: 20px;
  height: 20px;
}
.content-title {
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}
.content-desciption {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}
.row-gap-30 {
  row-gap: 30px;
}
.device-type {
  border: 1px solid lightgray;
}
.header-icon {
  width: 60px;
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
/* .form-group {
  margin-bottom: -10px;
} */
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
  row-gap: 10px;
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
.quote-date-picker.error >>> .mx-input-wrapper input,
.device-type.error,
.project-name.error,
.other-details.error {
  border: 1px solid red;
}
.error-message {
  color: red;
  font-size: 14px;
}
</style>
