<template>
  <div id="subscription-popup" class="modal" role="dialog">
    <div class="modal-dialog modal-lg request-modal">
      <div class="modal-content col-xs-12">
        <div class="modal-header">
          <div class="d-flex justify-content-between col-gap-30">
            <div class="header-text">
              Request a Quote -
              {{
                this.selectedSubscription.id === 1
                  ? 'Individual Subscription'
                  : 'Team and enterprise subscriptions'
              }}
            </div>
            <img
              @click="closeSubscriptionPopup"
              class="cursor-pointer align-self-flex-start"
              src="/static/images/icons/close_icon.svg"
              alt=""
            />
          </div>
        </div>
        <div class="modal-body col-xs-12" ref="formWrapper">
          <div class="col-xs-12 p-0 text-primary mb-10">
            Thank you for your interest in OPUS’ premium features. Complete the
            form below to tell us more about how you would like to use OPUS
          </div>
          <form @submit.prevent="submitForm">
            <div class="col-xs-12 p-0 mb-10">
              <label>Full Name</label><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                :class="{ field_error: v$.formData.full_name.$error }"
                v-model.trim="v$.formData.full_name.$model"
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
                  Maximum 65 characters required
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0 mb-10">
              <label>Email</label><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                :class="{
                  field_error: v$.formData.business_email_address.$error
                }"
                v-model.trim="v$.formData.business_email_address.$model"
              />
              <div
                class="error_text"
                v-if="v$.formData.business_email_address.$error"
              >
                <div v-if="v$.formData.business_email_address.required">
                  Business Email is required
                </div>
                <div
                  v-else-if="
                    !v$.formData.business_email_address.required &&
                    !v$.formData.business_email_address.isValidMail
                  "
                >
                  Please enter valid email
                </div>
                <div v-else-if="!v$.formData.business_email_address.maxLength">
                  Maximum 65 characters required
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0 mb-10">
              <label>Phone (include country code)</label
              ><span class="required-asterisk">*</span>
              <input
                class="form-control"
                type="text"
                :class="{ field_error: v$.formData.phone_number.$error }"
                v-model.trim="v$.formData.phone_number.$model"
              />
              <div class="error_text" v-if="v$.formData.phone_number.$error">
                <div v-if="v$.formData.phone_number.required">
                  Phone number is required
                </div>
                <div v-if="!v$.formData.phone_number.isPhoneValidOrEmpty">
                  Please enter valid Phone
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0 mb-10">
              <label>Company</label><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                :class="{ field_error: v$.formData.company.$error }"
                v-model.trim="v$.formData.company.$model"
              />
              <div class="error_text" v-if="v$.formData.company.$error">
                <div v-if="v$.formData.company.required">
                  Company is required
                </div>
                <div v-else-if="!v$.formData.company.minLength">
                  Minimum 2 characters required
                </div>
                <div v-else-if="!v$.formData.company.isAlphaNumOrEmpty">
                  First character should be alphanumeric
                </div>
                <div v-else-if="!v$.formData.business_email_address.maxLength">
                  Maximum 65 characters required
                </div>
              </div>
            </div>
            <div
              class="col-xs-12 p-0 mb-10"
              v-if="selectedSubscription.id === 2"
            >
              <label
                >Approximately how many people would you like to have access to
                OPUS premium features:
                <span class="required-asterisk">*</span></label
              >
              <input
                maxlength="5"
                class="form-control"
                type="text"
                :class="{ field_error: v$.formData.employee_count.$error }"
                v-model.trim="v$.formData.employee_count.$model"
                @input="changeCount"
              />

              <div class="error_text" v-if="v$.formData.employee_count.$error">
                <div v-if="!v$.formData.employee_count.required">
                  Employee count is required
                </div>
                <div v-if="!v$.formData.employee_count.isMaxRange">
                  Max Employee count is 99999
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0 mb-10">
              <label>Which premium features are you most interested in? <span class="required-asterisk">*</span></label
              >
              <ul>
                <li class="d-flex col-gap-10 align-items-center">
                  <input
                    @change="selectAll"
                    type="checkbox"
                    value="selectAll"
                    v-model="isCheckAll"
                  />
                  <div>Everything!</div>
                </li>
                <li
                  v-for="feature in premiumFeatures"
                  :key="feature"
                  class="d-flex col-gap-10 align-items-center"
                >
                  <input
                    type="checkbox"
                    @change="checkAllPremiumFeatures"
                    :value="feature"
                    v-model="v$.formData.features_interested_in.$model"
                  />
                  <div>{{ feature }}</div>
                </li>
              </ul>
            </div>
            <div class="col-xs-12 p-0 mb-10">
              <label>Is there anything else you would like us to know?</label>
              <textarea
                maxlength="2000"
                type="text"
                class="form-control"
                rows="6"
                :class="{ field_error: v$.formData.detail_description.$error }"
                v-model.trim="v$.formData.detail_description.$model"
              ></textarea>
              <div
                class="error_text"
                v-if="v$.formData.detail_description.$error"
              >
                <div v-if="!v$.formData.detail_description.maxLength">
                  Maximum 2000 characters required
                </div>
              </div>
            </div>
            <div class="col-xs-12 p-0 text-primary mt-20">
              Your request will be sent to our sales team, who will be in touch
              with any follow up questions and to provide a quote.
            </div>
            <div
              class="col-xs-12 d-flex justify-content-end p-0 mt-20 col-gap-15"
            >
              <BaseButton @click="closeSubscriptionPopup" variant="secondary"
                >Cancel</BaseButton
              >
              <BaseButton
                type="submit"
                :class="{ 'gray-out': v$.formData.$invalid }"
                :disabled="v$.formData.$invalid"
                >Submit</BaseButton
              >
            </div>
          </form>
        </div>
        <loader :loadingStatus="loaderStatus"></loader>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../../UIComponents/Loader.vue';
import {
  individualSubscriptions,
  teamSubscriptions,
  formFields
} from '../validations/validator';
import {
  getRequestQuotePremiumFeatures,
  postRequestQuote
} from '../../../apis/marketPlaceResources';
import BaseButton from '../../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../../apis/marketo';
import { useVuelidate } from '@vuelidate/core'


export default {
  props: {
    userId: {
      type: Number,
      required: true
    },
    selectedSubscription: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  watch: {
    selectedSubscription() {
      const formContainer = this.$refs.formWrapper;
      if (formContainer.scrollTop > 0) {
        formContainer.scrollTop = 0;
      }
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations: {
    formData: formFields
  },
  data() {
    return {
      loaderStatus: false,
      isCheckAll: false,
      formData: { ...formFields },
      premiumFeatures: []
    };
  },

  components: {
    Loader,
    BaseButton
  },

  async created() {
    await this.getPremiumFeatures();
  },
  

  methods: {
    changeCount(event) {
      const { value } = event.target;
      if (value) {
        this.v$.formData.employee_count.$model = value.replace(/[^0-9]+/, '');
      }
    },
    async submitForm() {
      if (!this.v$.formData.$invalid) {
        this.loaderStatus = true;
        const payload = {
          ...this.formData,
          user_id: this.userId,
          subscription_type_id: this.selectedSubscription.id
        };
        if (this.selectedSubscription.id === 1) delete payload.employee_count;
        else payload.employee_count = +payload.employee_count;
        const res = await postRequestQuote(payload);
        this.loaderStatus = false;
        if (res.status_code === 200) {
          const userData = JSON.parse(localStorage.getItem('userData'));
          const marketoForm = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            unstandardized_name: this.formData.full_name,
            email: userData.email,
            alternative_email: this.formData.business_email_address,
            phone: this.formData.phone_number,
            company: this.formData.company,
            unstandardized_country: userData.country,
            Last_Interest: 'Human Factors Research & Design',
            page_urlextended: window.location.href,
            page_urlreferral_extended: document.referrer,
            o_psinquiry_type: 'Sales',
            form_control: 'Contact',
            form_control_details: 'Request a quote',
            customer_comments:
              `${
                this.selectedSubscription.id === 1
                  ? 'Individual'
                  : 'Team & Enterprise'
              } Subscription; ` +
              `Features: ${this.formData.features_interested_in.join(', ')}; ` +
              `Comments: ${this.formData.detail_description}`
          };
          postMarketoFormData(marketoForm);
          this.$notify({
            type: res.message,
            title: 'Success',
            text: res.data
          });
          this.closeSubscriptionPopup();
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Please try again later!'
          });
        }
      }
    },

    closeSubscriptionPopup() {
      this.formData = {
        ...formFields
      };
      this.isCheckAll = false;
      this.v$.formData.$reset();
      this.$emit('closeSubscriptionPopup');
    },

    checkAllPremiumFeatures() {
      this.isCheckAll =
        this.formData.features_interested_in.length ===
        this.premiumFeatures.length;
    },

    selectAll() {
      if (this.isCheckAll)
        this.formData.features_interested_in = [...this.premiumFeatures];
      else this.formData.features_interested_in = [];
    },

    async getPremiumFeatures() {
      this.premiumFeatures = await getRequestQuotePremiumFeatures();
    }
  },
  validations() {
    if (this.selectedSubscription.id === 1) {
      return {
        formData: individualSubscriptions
      };
    }
    return {
      formData: teamSubscriptions
    };
  }
};
</script>

<style scoped>
.modal-header {
  background: none;
  border: 0;
}

.modal-body {
  max-height: 65vh;
  overflow-y: auto;
  margin-bottom: 20px;
  scrollbar-width: thin;
}
.align-self-flex-start {
  align-self: flex-start;
}
.gray-out {
  opacity: 0.5;
}

.header-text {
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
  flex: 0 0 90%;
}

.required-asterisk {
  padding-left: 5px;
  color: red;
}

textarea {
  resize: none;
}

label {
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  margin: 0;
  top: 0;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  box-shadow: none;
  background-color: #ffffff;
}

::-webkit-scrollbar-thumb {
  background: darkgray;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray;
}
</style>
