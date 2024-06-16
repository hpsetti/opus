<template>
  <div class="register-wrapper row d-flex mr-0 ml-0 p-0">
    <div class="col-xs-4 show-md mobile-menu-btn pr-0">
      <div
        class="d-flex menu-btn align-items-end flex-direction-column row-gap-5"
        type="button"
        aria-expanded="false"
        data-toggle="collapse"
        data-target="#NavBar_DropDown_Register"
      >
        <div class="x"></div>
        <div class="y"></div>
        <div class="z"></div>
      </div>
    </div>
    <ul
      id="NavBar_DropDown_Register"
      aria-expanded="false"
      class="collapse p-20"
    >
      <li>
        <router-link
          data-toggle="collapse"
          data-target="#NavBar_DropDown_Register"
          to="/login"
          >Log in</router-link
        >
      </li>
      <li>
        <router-link
          data-toggle="collapse"
          data-target="#NavBar_DropDown_Register"
          to="/register"
          >Sign up</router-link
        >
      </li>
      <li>
        <router-link
          data-toggle="collapse"
          data-target="#NavBar_DropDown_Register"
          to="/terms-of-service"
          >OPUS SaaS agreement</router-link
        >
      </li>
      <li>
        <a href="https://www.emergobyul.com/terms-of-use?action" target="_blank"
          >Emergo by UL Terms of Use</a
        >
      </li>
      <li>
        <a href=" https://www.emergobyul.com/privacy-policy" target="_blank"
          >Privacy Policy</a
        >
      </li>
    </ul>
    <div class="col-xs-12 col-sm-5 p-0 img-wrapper">
      <div class="col-xs-12 image-content">
        <div class="col-xs-12 p-0">
          <img
            class="opus-image"
            alt="opus-img"
            src="/static/images/logos/opus-logo.svg"
          />
        </div>
        <div class="opus-acct col-xs-12 p-0 fw-300">
          Create a free OPUS account
        </div>
        <div class="opus-para col-xs-12 p-0">
          Access valuable HFE resources like tools, trainings, and templates
          from Emergo by UL’s Human Factors Research & Design.
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-7 h-100 form-details">
      <div
        class="col-xs-12 d-flex justify-content-end col-gap-30 md-hide action-buttons mt-20 font-18"
      >
        <router-link to="/login">Log in</router-link>
        <a href="https://www.emergobyul.com/services/human-factors-research-design#show-modal">Contact us</a>
      </div>
      <div class="col-xs-12 create-account crt-acct mb-20 fw-300">
        Create Account
      </div>
      <div class="col-xs-12 account-info mb-20">
        Advanced access for Emergo by UL clients
      </div>
      <div class="col-xs-12 form-container pb-30">
        <form @submit.prevent="submit">
          <div class="col-md-12 p-0">
            <div class="col-md-6 pl-0">
              <div class="form-group">
                <label for="first-name">First Name</label>
                <input
                  id="first-name"
                  class="form-control comn_border"
                  :class="v$.user_data.first_name.$error ? 'invalid' : ''"
                  v-model.trim="user_data.first_name"
                  type="text"
                  placeholder="First Name"
                  maxlength="65"
                  @blur="v$.user_data.first_name.$touch()"
                />
                <div v-if="v$.user_data.first_name.$error">
                  <div
                    class="custom-error-class"
                    v-if="v$.user_data.first_name.required.$invalid"
                  >
                    Complete required field
                  </div>
                  <div
                    class="custom-error-class"
                    v-else-if="v$.user_data.first_name.minLength"
                  >
                    Minimum 2 characters required.
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 pl-0">
              <div class="form-group">
                <label for="last-name">Last Name</label>
                <input
                  id="last-name"
                  class="form-control comn_border"
                  :maxlength="userDataMaxCharLength['last_name']"
                  :class="v$.user_data.last_name.$error ? 'invalid' : ''"
                  type="text"
                  placeholder="Last Name"
                  v-model.trim="user_data.last_name"
                  @blur="v$.user_data.last_name.$touch()"
                  @input="resolveUserDataLength('last_name')"
                />
                <div v-if="v$.user_data.last_name.$error">
                  <div
                    class="custom-error-class"
                    v-if="v$.user_data.last_name.required.$invalid"
                  >
                    Complete required field
                  </div>
                  <div
                    class="custom-error-class"
                    v-else-if="v$.user_data.last_name.minLength"
                  >
                    Minimum 2 characters required.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 pl-0">
            <div class="form-group">
              <label for="email-id">Email</label>
              <input
                id="email-id"
                class="form-control comn_border"
                :class="{
                  'invalid-border': v$.user_data.email.$error || isFreeDomain
                }"
                type="text"
                placeholder="Email"
                v-model.trim="user_data.email"
                maxlength="65"
                @input="checkEmailIsValid()"
              />
              <div v-if="v$.user_data.email.$error">
                <div
                  class="custom-error-class"
                  v-if="v$.user_data.email.required.$invalid"
                >
                  Complete required field
                </div>
                <div
                  class="custom-error-class"
                  v-else-if="v$.user_data.email.isValidMail"
                >
                  Invalid email format. Valid entries include:
                  someone@example.com.
                </div>
              </div>
              <template v-else>
                <div class="custom-error-class" v-if="isFreeDomain">
                  To combat fraudulent account creation, we have restricted
                  certain domain email addresses from creating new accounts.
                </div>
              </template>
            </div>
          </div>
          <div class="col-md-12 pl-0">
            <div class="form-group">
              <label for="company-id">Company</label>
              <input
                id="company-id"
                class="form-control comn_border"
                :class="v$.user_data.company_name.$error ? 'invalid' : ''"
                type="text"
                placeholder="Company name"
                v-model.trim="user_data.company_name"
                maxlength="65"
                @blur="v$.user_data.company_name.$touch()"
              />
              <div v-if="v$.user_data.company_name.$error">
                <div
                  class="custom-error-class"
                  v-if="v$.user_data.company_name.required.$invalid"
                >
                  Complete required field
                </div>
                <div
                  class="custom-error-class"
                  v-else-if="v$.user_data.company_name.minLength"
                >
                  Minimum 2 characters required.
                </div>
                <div
                  class="custom-error-class"
                  v-else-if="v$.user_data.company_name.isAlphaNum"
                >
                  First character should be alphanumeric
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 pl-0">
            <div class="form-group">
              <label>Country</label>
              <multiselect
                class="VMSelectCss overflow-country mr-bt--6"
                :class="v$.user_data.country.$error ? 'invalid' : ''"
                :allow-empty="false"
                placeholder="Select a country"
                label="countryName"
                v-model="user_data.country"
                :show-labels="false"
                :options="countriesList.map((type) => type.alpha_three_code)"
                :custom-label="
                  (opt) =>
                    countriesList.find((x) => x.alpha_three_code === opt)
                      .country_name
                "
              ></multiselect>
              <div
                class="custom-error-class"
                v-if="
                  v$.user_data.country.required && v$.user_data.country.$error
                "
              >
                Complete required field
              </div>
            </div>
          </div>
          <div class="col-md-12 pl-0">
            <div class="form-group mb-0">
              <div>
                <i
                  class="fa fa-check"
                  id="checkbox-img"
                  aria-hidden="true"
                  :class="passwordError && user_data.password ? 'tick' : ''"
                  v-if="passwordError && user_data.password"
                ></i>
              </div>
              <label for="password">Password</label>
              <input
                id="password"
                class="form-control comn_border password-color"
                :class="!passwordError && submitStatus ? 'invalid' : ''"
                type="password"
                maxlength="65"
                placeholder="Password"
                v-model="user_data.password"
                autocomplete="new-password"
                @input="validate"
              />
              <span>
                <img
                  src="/static/images/logos/eye-logo.svg"
                  alt="eye-image"
                  id="togglePassword"
                  @click="switchVisibility()"
                />
              </span>
              <div
                class="col-md-12 col-xs-12 col-sm-12 alert alert-dismissible alert-danger"
                id="divPasswordValidationResult"
                v-if="!passwordError && user_data.password"
              >
                <p
                  id="length"
                  class="password-must mt-10 title"
                  v-if="!isPasswordLength"
                >
                  Password must have at least 10 characters
                </p>
                <ul class="password-cond">
                  <div v-if="counter < 3">
                    <p class="password-must pb-5">
                      Your password must meet 3 out of 4 criteria :
                    </p>
                    <div :key="item.message" v-for="item of verification">
                      <li
                        id="capital"
                        class="mandatory-field"
                        v-if="!item.valid"
                      >
                        {{ item.message }}
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
              <div
                class="custom-error-class"
                v-if="!this.user_data.password && submitStatus"
              >
                Please enter a password
              </div>
            </div>
          </div>
          <div
            class="check-content pl-0 col-xs-12 d-flex align-items-center"
            :class="{
              'terms-container': !(!passwordError && user_data.password)
            }"
          >
            <input
              type="checkbox"
              id="terms"
              class="checkbox-register"
              @click="checkTerms"
              name="terms"
              v-model="user_data.terms"
            />
            <span class="terms-conditions">
              I agree to the
              <span class="terms-service">
                <a href="/terms-of-service" target="_blank"
                  >OPUS Software-as-a-Service Agreement</a
                >
              </span>
            </span>
          </div>
          <div class="custom-error-class col-xs-12 mb-10" v-if="termsErr">
            {{ termsErr }}
          </div>
          <div class="complt_cret_acct mt-30 mb-30 form-button col-xs-12 p-0">
            <BaseButton
              type="submit"
              value="validate"
              id="confirmButton"
              :disabled="submitStatus === 'PENDING'"
            >
              {{ btnTxt }}
            </BaseButton>
          </div>
          <div class="existing-acct mb-30">
            Already have an account?
            <router-link to="/login">Log in</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import * as freeDomainNames from 'free-email-domains';
import {
  getCountries,
  postRegister,
  validateUserInfo,
  getBlockedEmails,
  getEmailBlockStatus
} from '../../apis/register';
import {
  validateData,
  isContainsUpperCase,
  isContainsLowerCase,
  isContainsDigit,
  isContainsSpecialChar,
  checkConditions
} from './validator';
import BaseButton from '../UIComponents/BaseButton.vue';
import postMarketoFormData from '../../apis/marketo';
import { useVuelidate } from '@vuelidate/core'

export default {
  components: {
    Multiselect,
    BaseButton
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations: {
    user_data: validateData
  },
  data() {
    return {
      user_data: {
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        company_name: '',
        country: '',
        mobile: '',
        card_address: '',
        city: '',
        state: '',
        zipcode: '',
        password: '',
        cpassword: '',
        terms: false
      },
      countriesList: [],
      responsibilitiesList: [],
      btnTxt: 'Create free account',
      submitStatus: null,
      termsErr: false,
      isFreeDomain: false,
      specialCharacterErrMsg:
        'The following characters are not allowed: * ? < > ! @ # $ “ % ^',
      counter: 0,
      verification: [
        { message: 'Have at least one capital letter', valid: false },
        { message: 'Have at least one lowercase letter', valid: false },
        { message: 'Have at least one number', valid: false },
        {
          message: 'Have at least one special character from !@#$.,+=()_%^&*',
          valid: false
        }
      ],
      isPasswordLength: false,
      passwordError: false,
      userDataMaxCharLength: {
        last_name: 50
      },
      defaultMaxCharLength: 65,
      blockedEmailDomains: [],
      isEmailBlocked: false,
    };
  },
  
  async created() {
    if (this.$route.query) {
      localStorage.setItem('utm_codes', JSON.stringify(this.$route.query));
    }
    await this.getEmailStatus();
    await this.loadCountries();
    // remove/add ! for Prod/dev.
    if (this.isEmailBlocked) {
      await this.fetchBlockedEmails();
    }
  },
  methods: {
    resolveUserDataLength(fieldName) {
      if (this.user_data[fieldName]) {
        this.user_data[fieldName] = this.user_data[fieldName].substring(
          0,
          this.userDataMaxCharLength[fieldName] || this.defaultMaxCharLength
        );
      }
    },
    // to restrict public emails
    async checkEmailIsValid() {
      this.v$.user_data.email.$touch();
      if (
        // remove/add ! for Prod/dev.
        this.user_data.email.includes('@') && (this.isEmailBlocked)
      ) {
        const emailToSpit = this.user_data.email.split('@');
        const domainName = emailToSpit[emailToSpit.length - 1].toLowerCase();
        const filteredBlockList = this.blockedEmailDomains.map(element => {
          return element.toLowerCase();
        });
        this.isFreeDomain =
          this.v$.user_data.email.isValidMail &&
          (freeDomainNames.default.includes(domainName) ||
            filteredBlockList.includes(domainName));
      }
    },
    validate() {
      this.counter = 0;
      if (this.user_data.password) {
        this.verification[0].valid = isContainsUpperCase(
          this.user_data.password
        );
        this.verification[1].valid = isContainsLowerCase(
          this.user_data.password
        );
        this.verification[2].valid = isContainsDigit(this.user_data.password);
        this.verification[3].valid = isContainsSpecialChar(
          this.user_data.password
        );
      }
      this.counter = checkConditions(this.user_data.password);
      this.isPasswordLength = false;
      if (this.user_data.password.length >= 10) this.isPasswordLength = true;

      this.passwordError = false;
      if (this.isPasswordLength && this.counter >= 3) {
        this.passwordError = true;
      }
    },
    checkTerms() {
      this.termsErr = '';
      if (this.user_data.terms) {
        this.termsErr =
          'Check box to accept the Terms & Conditions in order to create an account';
        this.btnTxt = 'Confirm and Create account';
      } else {
        this.btnTxt = 'Create free account';
      }
    },
    switchVisibility() {
      const passwordField = document.querySelector('#password');
      if (passwordField.getAttribute('type') === 'password') {
        passwordField.setAttribute('type', 'text');
      } else {
        passwordField.setAttribute('type', 'password');
      }
    },
    async submit() {
      this.v$.$touch();
      this.termsErr = '';
      if (this.v$.$invalid) {
        this.submitStatus = 'ERROR';
      } else if (!this.passwordError) {
        this.submitStatus = 'ERROR';
      } else if (this.isFreeDomain) {
        this.submitStatus = 'ERROR';
      } else if (!this.user_data.terms) {
        this.termsErr = 'You must accept the terms to create an account';
        this.btnTxt = 'Confirm and Create account';
      } else {
        ['last_name'].forEach((userDataField) =>
          this.resolveUserDataLength(userDataField)
        );
        this.submitStatus = 'PENDING';
        const validatedata = {
          email: this.user_data.email
        };
        const result = await validateUserInfo(validatedata);
        if (result && result.status) {
          this.termsErr = 'Email already registered.';
          this.submitStatus = null;
        } else if (result && !result.status) {
          this.submitStatus = 'PENDING';
          const getCountryRecord = this.countriesList.filter(
            (item) => item.alpha_three_code === this.user_data.country
          );
          const data = this.user_data;
          const postData = {
            card_location: getCountryRecord[0].country_name,
            alpha_three_code: getCountryRecord[0].alpha_three_code,
            title: data.title,
            card_postal: data.zipcode,
            card_state: data.state,
            card_city: data.city,
            card_address: data.card_address,
            phone: data.mobile,
            company: data.company_name,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
            terms: data.terms
          };
          Object.keys(postData).forEach((key) => {
            if (
              postData[key] === null ||
              postData[key] === undefined ||
              postData[key] === ''
            ) {
              delete postData[key];
            }
          });
          this.registrationFail = false;
          this.termsErr = '';
          this.btnTxt = 'Submitting Form...';
          const utmCodes = JSON.parse(localStorage.getItem('utm_codes'));
          const marketoForm = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            company: data.company_name,
            unstandardized_country: getCountryRecord[0].country_name,
            Last_Interest: 'Human Factors Research & Design',
            page_urlextended: window.location.href,
            page_urlreferral_extended: document.referrer,
            form_control: 'Confirm and Create account'
          };
          if (utmCodes) {
            marketoForm.gAKeyword = utmCodes.keyword;
            marketoForm.utmcampaign = utmCodes.utm_campaign;
            marketoForm.utmcontent = utmCodes.utm_content;
            marketoForm.utmmedium = utmCodes.utm_medium;
            marketoForm.utmmktoadid = utmCodes.utm_mktoadid;
            marketoForm.utmmktocampaign = utmCodes.utm_mktocampaign;
            marketoForm.utmsource = utmCodes.utm_source;
            marketoForm.utmterm = utmCodes.utm_term;
          }
          postMarketoFormData(marketoForm);
          const path = `${this.$route.path}`;
          if (path === '/register/compliancewire') {
            postData.compliance = true;
          } else {
            postData.compliance = false;
          }
          const response = await postRegister(postData);
          this.btnTxt = 'Confirm and Create account';
          this.submitStatus = null;
          if (response) {
            if (response.status) {
              this.$router.push({
                name: 'login',
                query: { successMessage: response.message }
              });
            } else {
              this.termsErr = response.message;
            }
          }
        }
      }
    },
    async loadCountries() {
      this.countriesList = await getCountries();
    },
    async fetchBlockedEmails() {
      const blockedEmailArray = await getBlockedEmails();
      this.blockedEmailDomains = blockedEmailArray.map((item) => item.email);
    },
    async getEmailStatus() {
      const data = await getEmailBlockStatus();
      this.isEmailBlocked = data.block_email;
    },
  }
};
</script>
<style scoped>
.image-content {
  width: 80%;
  padding-left: 90px;
}

.action-buttons a {
  font-weight: 600;
  color: #0b3c61;
}

.form-details {
  height: 100%;
  padding-left: 35px;
}

.account-info {
  font-weight: 400;
  font-size: 20px;
  color: #333333;
}

.img-wrapper {
  background: url('/static/images/logos/SideImage.jpg') no-repeat;
  background-size: cover;
}

/* .left-curve-img {
  width: 100%;
  object-fit: fill;
} */

.opus-para {
  padding-top: 21px;
  font-size: 24px;
  line-height: 33px;
  color: #ffffff;
  padding-bottom: 30px;
}
.opus-acct {
  /* font-weight: 300; */
  font-size: 36px;
  line-height: 49px;
  color: #ffffff;
}

.register-wrapper {
  padding-bottom: 30px;
  min-height: 100vh;
  position: relative;
}

.mobile-menu-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
}

.crt-acct {
  /* font-weight: 300; */
  font-size: 36px;
  line-height: 49px;
  color: #333333;
  /* margin-top: 0; */
  /* margin-bottom: 20px; */
  text-align: left;
}

/* .advance-emergo {
  font-size: 20px;
  line-height: 27px;
  color: #333333;
  padding-bottom: 23px;
} */

label {
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}

.content {
  padding-bottom: 14px;
}
.comp-info {
  padding-top: 24px;
  font-size: 18px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 21px;
  text-align: left;
}
.sign-up {
  font-weight: 500;
  font-size: 32px;
  line-height: 37px;
  color: #0b3c61;
  padding-top: 0px;
  text-align: left;
}
.opus-image {
  padding-top: 75px;
  padding-bottom: 75px;
}

.contact-login {
  text-align: end;
  padding-top: 28px;
}
.contact-login a {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}

.log-in {
  padding-right: 44px;
  padding-top: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.terms-conditions {
  font-family: Nunito;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 27px;
  color: #333333;
  margin-left: 16px;
  margin-top: 3px;
}

input[type='checkbox'] {
  top: 0px;
}

.check-content {
  text-align: left;
}

.complt_cret_acct {
  /* margin-top: 15px; */
  /* margin-bottom: 20px; */
  text-align: left;
}
.comn_border {
  background: #ffffff;
  border: 0.5px solid #000000;
  box-sizing: border-box;
  border-radius: 3px;
}
/* .btn {
  width: auto;
  padding: 7px 30px 8px 30px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #ffffff;
} */
.existing-acct {
  font-size: 18px;
  line-height: 21px;
  color: #333333;
}
.existing-acct a {
  color: #2f80ed;
}

.terms-service a {
  color: #2f80ed;
}
.check-content input {
  width: auto;
}

.VMSelectCss >>> .multiselect__content-wrapper .multiselect__option--highlight {
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
  border-radius: 3px;
  min-height: 0;
  height: 33px;
  line-height: 12px;
  border: 1px solid black;
  padding-top: 6px;
}
.VMSelectCss >>> .multiselect__placeholder {
  padding-top: 4px;
}
.mr-bt--6 {
  margin-bottom: -6px;
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
}

.custom-error-class {
  background-color: #ffebeb;
  padding: 3px;
  color: #b00505;
  list-style-type: none;
  display: block;
  font-size: 12px;
  line-height: 14px;
  text-align: left;
}

.password-must {
  text-align: left;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
  padding-top: 5px;
}
.password-must.title {
  padding-left: 13px;
}

ul.password-cond {
  list-style-type: none;
  text-align: left;
  padding-left: 26px;
  padding-bottom: 10px;
}

.mandatory-field {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.7);
}

li.mandatory-field::before {
  content: '\f111';
  font-family: FontAwesome;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  color: #b00505;
  font-size: 11px;
  padding-right: 6.38px;
}

#divPasswordValidationResult {
  display: block;
  padding: 0px;
  background: #ffffff;
  border: 1px solid #b00505;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

#checkbox-img.fa-check,
.confirm-checkbox-img.fa-check {
  display: none;
}
#checkbox-img.fa-check.tick {
  display: block;
  position: absolute;
  right: -14px;
  top: 28px;
  background: #4c9e45;
  padding: 5px;
  border-radius: 50%;
  color: #ffffff;
  border: 0.5px solid #ffffff;
}
#confirm-checkbox-img.fa-check.tick {
  display: block;
  position: absolute;
  left: -14px;
  top: 4px;
  background: #4c9e45;
  padding: 5px;
  border-radius: 50%;
  color: #ffffff;
  border: 0.5px solid #ffffff;
}

.invalid {
  border-color: #a20000;
}

.check-content input[type='checkbox'] {
  width: 24px;
  height: 24px;
}

#password,
#cpassword {
  color: #828282;
}

#togglePassword {
  cursor: pointer;
  float: right;
  position: relative;
  top: -25px;
  right: 18px;
}

/* Burger menu */
div.x,
div.y,
div.z {
  height: 3px;
  width: 27px;
  background: #0b3c61;
  border-radius: 2px;
  -webkit-transition: all 200ms ease-out;
  -o-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
}

.menu-btn[aria-expanded='true'] > div.x {
  transform: rotate(40deg);
  transform-origin: top left;
  background: #ffffff;
}
.menu-btn[aria-expanded='true'] > div.y {
  background: #ffffff;
  display: none;
}
.menu-btn[aria-expanded='true'] > div.z {
  transform: rotate(-45deg);
  background: #ffffff;
  transform-origin: bottom left;
  margin: 10px 1px 3px 3px;
}

#NavBar_DropDown_Register {
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 0px;
  background-image: url('/static/images/logos/sign-in.png');
}

#NavBar_DropDown_Register li {
  list-style: none;
  margin-bottom: 10px;
}

#NavBar_DropDown_Register li a {
  color: #fff;
}

.terms-container {
  margin-top: 75px;
}

.form-group.mb-0 {
  margin-bottom: 0px;
}

@media screen and (max-width: 767px) {
  .btn {
    width: 100%;
  }

  .terms-container {
    margin-top: 50px;
  }

  .check-content {
    align-items: flex-start;
  }

  .terms-service a {
    font-size: 16px;
  }

  div.x,
  div.y,
  div.z {
    height: 3px;
    width: 27px;
    background: #ffffff;
    border-radius: 2px;
    -webkit-transition: all 200ms ease-out;
    -o-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
  }

  .opus-acct {
    font-size: 24px;
  }

  .opus-image {
    padding-bottom: 30px;
    font-weight: 300;
    padding-top: 20px;
  }

  .create-account {
    margin-top: 15px;
  }

  .account-info {
    font-size: 16px;
  }

  .sign-up {
    margin-bottom: 40px;
  }

  .image-content {
    padding-left: 30px;
  }
}

@media only screen and (min-width: 570px) and (max-width: 768px) {
  .opus-image {
    height: 280px;
  }
}

/* @media screen and (max-width: 850px) {
  .sm-pl-0 {
    padding-left: 0px;
  }
} */

@media screen and (max-width: 1024px) {
  .img-wrapper {
    background: url('/static/images/logos/signup_left_medium_device.svg')
      no-repeat;
    background-size: cover;
  }

  .form-details {
    padding-left: 30px;
  }

  .opus-para {
    font-size: 18px;
    font-weight: 300;
  }

  .image-content {
    width: 100%;
    padding-left: 46px;
  }

  .register-wrapper {
    padding-bottom: 0px;
  }
}

@media screen and (max-width: 765px) {
  .register-wrapper {
    flex-direction: column;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .sign-up {
    margin-bottom: 40px;
  }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
  .check-content input {
    width: 40px;
    height: 18px;
  }
}

@media only screen and (min-width: 1025px) {
  .show-md {
    display: none;
  }

  #NavBar_DropDown_Register {
    display: none !important;
  }
}

@media only screen and (max-width: 1024px) {
  .form-details {
    padding-left: 15px;
  }

  .show-md {
    display: block;
  }

  .md-hide {
    display: none;
  }
}
</style>
