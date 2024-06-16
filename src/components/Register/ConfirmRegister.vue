<template>
  <div
    class="container-fluid password-container"
    :class="{ hide_banner: !isTokenValid }"
  >
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 txt-alg-ctr">
        <div
          class="login-whitebox landinglayout_box_wrapper"
          v-if="isTokenValid"
        >
          <h1>Create an account</h1>
          <form @submit.prevent="confirmAccount">
            <p class="mb-20">
              Please enter a password below to create your account.
            </p>
            <div class="login-container">
              <div class="login-input">
                <input
                  class="login-input-box landing-input-field"
                  v-model.trim="v$.data.password.$model"
                  v-model="data.password"
                  type="password"
                  name="password"
                  placeholder="New password"
                  :class="{ field_error: v$.data.password.$error }"
                />
                <i class="fa fa-lock"></i>
              </div>
              <div class="error_text" v-if="v$.data.password.$error">
                <div v-if="!v$.data.password.required">
                  Password is required.
                </div>
                <div
                  v-if="
                    v$.data.password.required &&
                    !v$.data.password.passwordValidation
                  "
                >
                  Password must include at least 10 characters
                  <br />Your password must meet 3 of these 4 criteria: 1 capital
                  letter (A-Z), 1 lowercase letter (a-z), 1 number (1-9), and
                  one special character (!@#$.,+=( )_%^&*)
                </div>
              </div>
            </div>
            <div class="login-container">
              <div class="login-input">
                <input
                  class="login-input-box landing-input-field"
                  v-model.trim="v$.data.confirm_password.$model"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  :class="{ field_error: v$.data.confirm_password.$error }"
                />
                <i class="fa fa-lock"></i>
              </div>
              <div class="error_text" v-if="v$.data.confirm_password.$error">
                <div v-if="!v$.data.confirm_password.required">
                  Please confirm your password
                </div>
                <div
                  v-if="
                    v$.data.confirm_password.required &&
                    !v$.data.confirm_password.sameAsPassword
                  "
                >
                  The password doesn't match the password above
                </div>
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                value="true"
                v-model.trim="v$.data.terms_conditions.$model"
              />
              <span class="terms-conditions">
                I acknowledge that I have read and agree to the
                <span class="term-priv">
                  <a href="/terms-of-service" target="_blank"
                    >OPUS Software-as-a-Service Agreement</a
                  >
                </span>
              </span>
              <div class="error_text" v-if="v$.data.terms_conditions.$error">
                <div v-if="!v$.data.terms_conditions.checked">
                  You must accept the Privacy and Cookie Policies to create an
                  account
                </div>
              </div>
            </div>
            <div class="error-msg-holder" v-if="errorMessage">
              <span class="error-message">{{ errorMessage }}</span>
              <br />
            </div>
            <button
              class="btn btn-modal-footer submit-btn"
              type="submit"
              :disabled="disableButton"
            >
              {{ ButtonText }}
            </button>
          </form>
        </div>
        <div v-else>
          <invalid-token-message
            :page="'confirmregister'"
          ></invalid-token-message>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, sameAs, helpers } from '@vuelidate/validators';
import {
  confirmRegisterPassword,
  validateRegisterToken
} from '../../apis/passwords';
import { PasswordValidation } from '../../utils/common';
import InvalidTokenMessage from '../UIComponents/InvalidTokenMessage.vue';

const passwordValidation = helpers.regex(
  'passwordValidation',
  PasswordValidation
);

export default {
  data() {
    return {
      data: { password: '', confirm_password: '', terms_conditions: '' },
      errorMessage: '',
      isTokenValid: true,
      disableButton: false,
      ButtonText: 'Confirm Account'
    };
  },
  components: {
    InvalidTokenMessage
  },
  validations: {
    data: {
      password: {
        required,
        passwordValidation
      },
      confirm_password: {
        required,
        sameAsPassword: sameAs(function () { //eslint-disable-line
          return this.data.password;
        }),
      },
      terms_conditions: {
        checked(value) {
          return value;
        }
      }
    }
  },
  async created() {
    await this.validateToken();
  },
  methods: {
    async confirmAccount() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disableButton = true;
        this.ButtonText = 'Submitting...';
        const result = await confirmRegisterPassword(
          this.data,
          this.$route.params.token
        );
        this.disableButton = true;
        this.ButtonText = 'Confirm Account';
        if (result.token && result.token === 'invalid') {
          this.isTokenValid = false;
        } else if (result.status) {
          this.$router.push({
            name: 'login',
            params: { successMessage: result.message }
          });
        } else if (!result.status) {
          this.errorMessage = result.message;
        }
      }
    },
    async validateToken() {
      const result = await validateRegisterToken(this.$route.params.token);
      if (result.token !== 'valid') {
        this.isTokenValid = false;
      }
    }
  }
};
</script>
<style scoped>
.terms-conditions {
  font-weight: 400;
  font-size: 16px;
}
.txt-alg-ctr {
  text-align: center;
}
.submit-btn {
  border-radius: 20px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 16px;
  background: #4c9e45;
  border: 1px solid #4c9e45;
  margin-top: 30px;
  font-weight: bold;
  color: #fff;
}
.mb-20 {
  margin-bottom: 20px;
}
.password-container {
  color: #000;
  font-family: 'Roboto', sans-serif;
}
.password-container h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 48px;
  margin-bottom: 16px;
  line-height: 1;
}
.password-container p {
  font-size: 16px;
}
.password-container a {
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  color: rgb(20, 150, 60);
  -webkit-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;
  border: 0;
  padding-bottom: 5px;
}
.password-container a:hover,
.password-container a.active {
  border-bottom: 2px solid rgb(20, 150, 60);
}
</style>
