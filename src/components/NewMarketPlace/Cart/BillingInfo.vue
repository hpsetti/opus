<template>
  <div class="col-xs-12 p-10 billing-wrapper">
    <div class="col-xs-12 mb-10">Billing Contact’s Information</div>
    <!-- First Name and Last Name -->
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 col-sm-6">
        <div class="form-group">
          <label for="" class="header-label"
            >First Name<span class="required_astric" v-if="!userData.first_name"
              >*</span
            ></label
          >
          <input
            class="form-control"
            :class="v$.userData.first_name.$error ? 'invalid' : ''"
            v-model.trim="v$.userData.first_name.$model"
            type="text"
            placeholder="First Name"
            maxlength="65"
          />
          <div v-if="v$.userData.first_name.$error">
            <div
              class="custom-error-class text-center"
              v-if="v$.userData.first_name.required"
            >
              Complete required field
            </div>
            <div
              class="custom-error-class text-center"
              v-else-if="!v$.userData.first_name.minLength"
            >
              Minimum 2 characters required.
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="form-group">
          <label for="" class="header-label"
            >Last Name<span class="required_astric" v-if="!userData.last_name"
              >*</span
            ></label
          >
          <input
            class="form-control"
            :maxlength="userDataCharLimit['last_name']"
            :class="v$.userData.last_name.$error ? 'invalid' : ''"
            type="text"
            placeholder="Last Name"
            v-model.trim="v$.userData.last_name.$model"
            @input="resolvePaymentDataLength('last_name')"
          />
          <div v-if="v$.userData.last_name.$error">
            <div
              class="custom-error-class text-center"
              v-if="v$.userData.last_name.required"
            >
              Complete required field
            </div>
            <div
              class="custom-error-class text-center"
              v-else-if="!v$.userData.last_name.minLength"
            >
              Minimum 2 characters required.
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Email Address and Phone Number -->
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 col-sm-6">
        <div class="form-group">
          <label for="" class="header-label"
            >Email address<span
              class="required_astric"
              v-if="!userData.email_address"
              >*</span
            ></label
          >
          <input
            class="form-control"
            :class="v$.userData.email_address.$error ? 'invalid' : ''"
            type="text"
            placeholder="Email"
            v-model.trim="v$.userData.email_address.$model"
            maxlength="65"
          />
          <div v-if="v$.userData.email_address.$error">
            <div
              class="custom-error-class text-center"
              v-if="v$.userData.email_address.required"
            >
              Complete required field
            </div>
            <div
              class="custom-error-class text-center"
              v-else-if="!v$.userData.email_address.isValidMail"
            >
              Invalid email format. Valid entries include: someone@example.com.
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="form-group">
          <label for="" class="header-label"
            >Phone number<span
              class="required_astric"
              v-if="!userData.phone_number"
              >*</span
            ></label
          >
          <input
            class="form-control"
            :class="v$.userData.phone_number.$error ? 'invalid' : ''"
            type="text"
            size="15"
            maxlength="30"
            placeholder="Phone number"
            v-model.trim="v$.userData.phone_number.$model"
          />
          <div v-if="v$.userData.phone_number.$error">
            <div
              class="custom-error-class text-center"
              v-if="v$.userData.phone_number.required"
            >
              Complete required field
            </div>
            <div
              class="custom-error-class text-center"
              v-if="!v$.userData.phone_number.isNumber"
            >
              Please enter valid phone number
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- AddressBar -->
    <div class="col-xs-12 p-0">
      <div class="col-xs-12">
        <div class="form-group">
          <label for="" class="header-label"
            >Address<span class="required_astric" v-if="!userData.address"
              >*</span
            ></label
          >
          <input
            class="form-control comn_border"
            :max-length="userDataCharLimit['address']"
            :class="v$.userData.address.$error ? 'invalid' : ''"
            type="text"
            size="60"
            placeholder="Street Address"
            v-model.trim="v$.userData.address.$model"
            @input="resolvePaymentDataLength('address')"
          />
          <div v-if="v$.userData.address.$error">
            <div
              class="custom-error-class"
              v-if="v$.userData.address.required"
            >
              Complete required field
            </div>
            <div
              class="custom-error-class"
              v-if="!v$.userData.address.isAllowedCharacters"
            >
              {{ specialCharacterErrMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- City, State And Zip -->
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 col-sm-6">
        <div class="form-group">
          <label for="" class="header-label"
            >City<span class="required_astric" v-if="!userData.city"
              >*</span
            ></label
          >
          <input
            class="form-control comn_border"
            :class="v$.userData.city.$error ? 'invalid' : ''"
            type="text"
            size="60"
            maxlength="50"
            placeholder="City"
            v-model.trim="v$.userData.city.$model"
          />
          <div v-if="v$.userData.city.$error">
            <div class="custom-error-class" v-if="v$.userData.city.required">
              Complete required field
            </div>
            <div class="custom-error-class" v-if="!v$.userData.city.minLength">
              Minimum 3 characters required.
            </div>
            <div
              class="custom-error-class"
              v-else-if="!v$.userData.city.isAllowedCharacters"
            >
              {{ specialCharacterErrMsg }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-2">
        <div class="form-group">
          <label for="" class="header-label"
            >State<span class="required_astric" v-if="!userData.state"
              >*</span
            ></label
          >
          <input
            class="form-control comn_border"
            :class="v$.userData.state.$error ? 'invalid' : ''"
            type="text"
            size="60"
            maxlength="50"
            placeholder="State"
            v-model.trim="v$.userData.state.$model"
          />
          <div v-if="v$.userData.state.$error">
            <div class="custom-error-class" v-if="v$.userData.state.required">
              Complete required field
            </div>
            <div
              class="custom-error-class"
              v-if="!v$.userData.state.isAllowedCharacters"
            >
              {{ specialCharacterErrMsg }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-4">
        <div class="form-group">
          <label class="header-label"
            >Zip Code<span class="required_astric" v-if="!userData.zipcode"
              >*</span
            ></label
          >
          <input
            class="form-control comn_border"
            :class="v$.userData.zipcode.$error ? 'invalid' : ''"
            type="text"
            maxlength="15"
            placeholder="Zip / Postal code"
            v-model.trim="v$.userData.zipcode.$model"
          />
          <div v-if="v$.userData.zipcode.$error">
            <div
              class="custom-error-class"
              v-if="v$.userData.zipcode.required"
            >
              Complete required field
            </div>
            <div
              class="custom-error-class"
              v-if="!v$.userData.zipcode.minLength"
            >
              Minimum 2 characters required.
            </div>
            <div
              class="custom-error-class"
              v-else-if="!v$.userData.zipcode.isPostalCode && userData.zipcode"
            >
              Valid Zip/Postal Code Required
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Country and purchase order -->
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 col-sm-6 col-md-6" v-if="purchaseOrder">
        <div class="form-group">
          <label for="" class="header-label"
            >Purchase Order<span
              class="required_astric"
              v-if="!userData.purchase_order"
              >*</span
            ></label
          >
          <input
            class="form-control comn_border"
            :maxLength="userDataCharLimit['purchase_order']"
            :class="v$.userData.purchase_order.$error ? 'invalid' : ''"
            type="text"
            placeholder="Purchase Order"
            v-model.trim="v$.userData.purchase_order.$model"
            @input="resolvePaymentDataLength('purchase_order')"
          />
          <div v-if="v$.userData.purchase_order.$error">
            <div
              class="custom-error-class"
              v-if="v$.userData.purchase_order.required"
            >
              Complete required field
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="form-group">
          <label class="header-label"
            >Country<span class="required_astric" v-if="!userData.country"
              >*</span
            ></label
          >
          <OpusSelect
            :class="v$.userData.country.$error ? 'invalid' : ''"
            :allow-empty="false"
            :searchable="true"
            placeholder="Select a country"
            label="country_name"
            v-model.trim="v$.userData.country.$model"
            :show-labels="false"
            :options="countriesList.map((type) => type.country_name)"
            :custom-label="
              (opt) =>
                countriesList.find((x) => x.country_name === opt).country_name
            "
          ></OpusSelect>

          <div
            class="custom-error-class"
            v-if="v$.userData.country.required && v$.userData.country.$error"
          >
            Complete required field
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import OpusSelect from '../../UIComponents/OpusSelect.vue';
import { validateData, purchaseOrderObject } from './BillingValidator';
import loader from '../../UIComponents/Loader.vue';
import { useVuelidate } from '@vuelidate/core';

export default {
  props: ['purchaseOrder', 'billingData', 'countriesList'],
  data() {
    return {
      loaderStatus: false,
      userData: {
        first_name: '',
        last_name: '',
        email_address: '',
        country: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        purchase_order: ''
      },
      validateFormSubmit: false,
      specialCharacterErrMsg:
        'The following characters are not allowed: * ? < > ! # @ $ “ % ^',
      userDataCharLimit: {
        purchase_order: 65,
        address: 1000,
        last_name: 50
      }
    };
  },
  components: {
    loader,
    OpusSelect,
  },
  watch: {
    billingData: {
      deep: true,
      handler(newValue) {
        if (newValue && Object.keys(newValue)) {
          this.userData = { ...this.userData, ...newValue };
        }
      },
      immediate: true
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    if (this.purchaseOrder) {
      return { userData: purchaseOrderObject };
    }
    return { userData: validateData };
  },
  methods: {
    resolvePaymentDataLength(fieldName) {
      if (this.userData[fieldName]) {
        this.userData[fieldName] = this.userData[fieldName].substr(
          0,
          this.userDataCharLimit[fieldName]
        );
      }
    }
  }
};
</script>

<style scoped>
.billing-wrapper {
  border: 1px solid #d3d6d9;
  border-radius: 10px;
}

.required_astric {
  font-size: 12px;
  color: red;
  margin-left: 2px;
  vertical-align: top;
}

.custom-error-class {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #ffebeb;
  padding: 8px;
  color: #a20000;
  font-size: 14px;
}

.header-label {
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}

/* .VMSelectCss >>> .multiselect__content-wrapper .multiselect__option--highlight {
  color: #000000;
  height: 30px;
  background: #f5f5f5;
}
.VMSelectCss >>> .multiselect__option--selected:before {
  content: '\f00c';
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  color: green;
  float: right;
}
.VMSelectCss >>> .multiselect__tags {
  border-radius: 15px;
  min-height: 0;
  height: 33px;
  line-height: 12px;
  border: 1px solid black;
  padding-top: 6px;
}

.VMSelectCss >>> .multiselect__placeholder {
  padding-top: 4px;
}

.VMSelectCss >>> .multiselect__content-wrapper {
  min-height: 0px;
  max-height: 180px !important;
  border: 1px solid #aaa;
}
.overflow-country >>> .multiselect__content-wrapper {
  overflow-y: scroll;
}
.VMSelectCss >>> .multiselect__option {
  height: 30px;
  font-size: 13px;
}
.VMSelectCss >>> .multiselect__single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
.VMSelectCss >>> .multiselect__select {
  height: 35px;
}
.VMSelectCss >>> .multiselect__element .multiselect__option span {
  word-break: break-word;
  white-space: pre-wrap;
}
.VMSelectCss >>> .multiselect__select:before {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  border: 1px solid #0b3c61;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 4px;
  top: 0;
  content: '';
} */
</style>
