<template>
  <div class="login-wrapper row mr-0 ml-0 p-0">
    <header>
      <div class="row d-flex align-items-center mr-0 ml-0">
        <div class="col-xs-8">
          <img
            class="opus-image"
            alt="opus-img"
            src="/static/images/logos/signin-opus-logo.svg"
            width="152"
            height="85"
          />
        </div>
        <div
          class="col-xs-4 pl-0 login-header-actions d-flex col-gap-30 justify-content-end md-hide"
        >
          <router-link to="/register" class="log-in font-bold font-18"
            >Create Account</router-link
          >
          <a
            class="font-bold font-18"
            href="https://www.emergobyul.com/services/human-factors-research-design#show-modal"
            >Contact us</a
          >
        </div>
        <div class="col-xs-4 show-md">
          <div
            class="d-flex menu-btn align-items-end flex-direction-column row-gap-5"
            type="button"
            aria-expanded="false"
            data-toggle="collapse"
            data-target="#NavBar_DropDown"
          >
            <div class="x"></div>
            <div class="y"></div>
            <div class="z"></div>
          </div>
        </div>
      </div>
    </header>
    <div class="col-xs-12 p-20 mobile-menu">
      <ul id="NavBar_DropDown" aria-expanded="false" class="collapse">
        <li>
          <router-link
            data-toggle="collapse"
            data-target="#NavBar_DropDown"
            to="/login"
            >Log in</router-link
          >
        </li>
        <li>
          <router-link
            data-toggle="collapse"
            data-target="#NavBar_DropDown"
            to="/register"
            >Sign up</router-link
          >
        </li>
        <li>
          <router-link
            data-toggle="collapse"
            data-target="#NavBar_DropDown"
            to="/terms-of-service"
            >OPUS SaaS agreement</router-link
          >
        </li>
        <li>
          <a
            href="https://www.emergobyul.com/terms-of-use?action"
            target="_blank"
            >Emergo by UL Terms of Use</a
          >
        </li>
        <li>
          <a href=" https://www.emergobyul.com/privacy-policy" target="_blank"
            >Privacy Policy</a
          >
        </li>
      </ul>
    </div>
    <main class="col-xs-12 p-0">
      <div class="col-xs-12 p-0 d-flex justify-content-center">
        <div class="login-whitebox">
          <form @submit.prevent="loginUser">
            <p class="page_header pt-20">Welcome back to OPUS!</p>
            <p class="login-card-desc">
              Please log in to access your existing account
            </p>
            <div class="login-container pl-40 pr-40 pb-20 pt-20">
              <div class="login-input">
                <label for="email" class="float-left">Email</label>
                <input
                  class="login-input-box-without-icon landing-input-field"
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  v-model="email"
                />
              </div>
            </div>
            <div class="login-container pl-40 pr-40 pt-20">
              <div class="login-input">
                <label for="password" class="float-left">Password</label>
                <input
                  id="password"
                  class="login-input-box-without-icon landing-input-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  v-model="password"
                />
                <span>
                  <img
                    src="/static/images/logos/eye-logo.svg"
                    alt="eye-image"
                    id="togglePassword"
                    width="18"
                    height="18"
                    @click="switchVisibility()"
                  />
                </span>
              </div>
              <div class="alert alert-danger mr-tp-15" v-if="errorMessage">
                <strong>{{ errorMessage }}</strong>
              </div>
              <div class="alert alert-success mr-tp-15" v-if="successMessage">
                <strong>{{ successMessage }}</strong>
              </div>
            </div>
            <!-- <div class="alert alert-danger mr-tp-15" v-if="errorMessage">
              <strong>{{ errorMessage }}</strong>
            </div>
            <div class="alert alert-success mr-tp-15" v-if="successMessage">
              <strong>{{ successMessage }}</strong>
            </div> -->
            <div class="pl-40 pr-40">
              <button
                class="btn btn-success button_signup mt-30 mb-30"
                :disabled="disableSubmit || disableFormSubmit"
                type="submit"
              >
                {{ LoginButton }}
              </button>
            </div>
            <div class="text-center pb-20">
              <router-link
                to="/forgot"
                class="link-text-login font-bold font-18"
                >Forgot your password?</router-link
              >
            </div>
            <div class="text-center pb-40">
              Don’t have an account yet?
              <router-link
                to="/register"
                class="link-text-login font-bold font-18"
                >Create Account</router-link
              >
            </div>
          </form>
        </div>
      </div>
      <div class="mt-20 col-xs-12 p-0 d-flex justify-content-center">
        <!-- <notification-banner
          :notification="banners[banners.length - 1]"
          v-if="banners.length"
        ></notification-banner> -->
      </div>
    </main>
    <div
      id="repAccountListModal"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      role="dialog"
    >
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content modal_wrapper">
          <div class="header_wrapper">
            <span
              class="close"
              data-toggle="modal"
              data-target="#repAccountListModal"
              >×</span
            >
            <h4 class="popup_header">Select Account</h4>
          </div>
          <div class="center p-10">
            <span v-if="accountList.length && accountList[0]['role_id'] == 10"
              >Select the account to display:</span
            >
            <span v-else>Select the REP client account to display:</span>
            <br />
            <!--DataList for predictive search-->
            <div id="dlInput">
              <!-- <multiselect
                v-model="selectedAccount"
                placeholder="Select Account"
                :options="accountList"
                :custom-label="(opt) => opt.company_name"
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
                class="custom-multiselect"
              ></multiselect> -->
            </div>
            <span class="error" id="showErrorMsg"
              >Please select a valid account and click on proceed</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
// import Multiselect from 'vue-multiselect';
import { loginUser } from '@apis/login';
import { getCookie } from '../../utils/common';
// import NotificationBanner from '../SystemNotifications/NotificationBanner.vue';
import { getActiveBanner } from '@apis/systemNotifications';

export default {
  data() {
    return {
      email: '',
      password: '',
      selectedAccount: '',
      accountList: [],
      errorMessage: '',
      LoginButton: 'Log in',
      successMessage: '',
      disableFormSubmit: false,
      banners: []
    };
  },
  components: {
    // Multiselect,
    // NotificationBanner
  },
  async created() {
    if (this.$route.query) {
      localStorage.setItem('utm_codes', JSON.stringify(this.$route.query));
    }
    $('#NavBar_DropDown').removeClass('in');
    this.banners = await getActiveBanner();
    if (this.$route.query.successMessage) {
      this.successMessage = this.$route.query.successMessage;
    }
    if (this.$route.query.errorMessage) {
      this.errorMessage = this.$route.query.errorMessage;
    }
  },
  computed: {
    disableSubmit() {
      if (this.email && this.password) {
        return false;
      }
      return true;
    }
  },
  methods: {
    getFormData() {
      return {
        email: this.email,
        password: this.password
      };
    },
    getRepCltFormData() {
      return {
        email: this.email,
        password: this.password,
        account_id: this.selectedAccount.account_id,
        role_id: this.selectedAccount.role_id,
        company_name: this.selectedAccount.company_name
      };
    },
    switchVisibility() {
      const passwordField = document.querySelector('#password');
      if (passwordField.getAttribute('type') === 'password') {
        passwordField.setAttribute('type', 'text');
      } else {
        passwordField.setAttribute('type', 'password');
      }
    },
    async loginUser() {
      if (getCookie('Authorization')) {
        this.$router.push('/home');
        return;
      }
      this.errorMessage = '';
      this.successMessage = '';
      const formData = this.getFormData();
      this.disableFormSubmit = true;
      this.LoginButton = 'Logging in...';
      const responseData = await loginUser(formData);
      if (responseData && responseData.status === true) {
        this.errorMessage = '';
        localStorage.setItem('roleId', responseData.role_id);
        localStorage.setItem('accountId', responseData.account_id);
        localStorage.setItem('userId', responseData.user_id);
        this.redirectUrl();
      } else {
        this.LoginButton = 'Log in';
        this.disableFormSubmit = false;
        this.errorMessage = responseData.message;
      }
    },
    redirectUrl() {
      const redirectUrl = getCookie('redirect_url');
      if (redirectUrl) {
        document.cookie =
          'redirect_url=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        window.location.href = redirectUrl;
      } else {
        const roleId = JSON.parse(localStorage.getItem('roleId'));
        if (roleId === 13) {
          this.$router.push('/compliancewire-marketplace');
        } else {
          this.$router.push('/home');
        }
      }
    }
  }
};
</script>
<style scoped>
.login-wrapper {
  position: relative;
  padding-bottom: 58px;
  min-height: 100vh;
  background-image: url('/static/images/logos/sign-in.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.login-header-actions a {
  color: #ffffff;
  line-height: 25px;
}

main {
  padding: 30px 20px;
}

footer {
  text-align: center;
  background-color: #333;
  color: #fff;
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.login-input-box-without-icon {
  padding: 18px 12px;
}
.login-input-box-without-icon > i {
  color: #808080;
}
.login-input-box-without-icon:focus > i {
  color: #2f2f2f;
}
.login-input-box-without-icon:focus {
  box-shadow: inset 0 0 0px 1px #85b7d9;
}
#togglePassword {
  cursor: pointer;
  float: right;
  position: relative;
  top: -35px;
  right: 18px;
}

.link-text-login {
  line-height: 25px;
  color: #00518a;
}

.login-card-desc {
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #333333;
}

.login-header-actions a {
  color: #ffffff;
  line-height: 25px;
}

.proceed_button {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  width: 160px;
}
.popup_header {
  margin-top: 0px;
  padding-left: 10px;
}
#dlInput {
  max-width: 450px;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}
#repAccountListModal {
  z-index: 1041;
}
#repAccountListModal > .modal-dialog {
  width: 50%;
}
.modal_wrapper {
  padding: 20px 0;
  width: 100%;
}
.header_wrapper {
  border-bottom: 1px solid #ccc;
  padding: 0px;
  margin: 0 0 15px 0;
  margin-left: 0px;
  padding-left: 0px;
}
.footer_wrapper {
  border-top: 1px solid #ccc;
  margin-top: 15px;
}
.button_signup {
  margin-top: 15px;
  background: #4c9e45;
  border: 1px solid #4c9e45;
}
.button_signup:hover,
.button_signup:active,
.button_signup:focus,
.button_signup.active.focus,
.button_signup.active:focus,
.button_signup.active:hover,
.button_signup:active.focus,
.button_signup:active:focus,
.button_signup:active:hover {
  border: 1px solid #4c9e45;
  background: #4c9e45;
  box-shadow: none;
}
.btn {
  padding: 7px 30px 8px 30px;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
}
a {
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
  color: rgb(20, 150, 60);
  -webkit-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;
  border-bottom: 0px solid rgb(20, 150, 60);
  padding-bottom: 5px;
}
.page_header {
  font-weight: 300;
  font-size: 42px;
  line-height: 57px;
  text-align: center;
  color: #333333;
}
.login-whitebox {
  display: inline-block;
  margin-top: 30px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.close {
  opacity: 1;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: -5px;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
select:focus {
  border: 1px solid #ccc !important;
}

.success-msg-holder {
  margin-top: 15px;
  border-radius: 5px;
  padding: 15px;
  color: darkgreen;
  background-color: #dcf0dd;
  border-color: #bee5eb;
  font-weight: bold;
}
#showErrorMsg {
  display: none;
}
.error {
  padding: 15px;
  color: #a20000;
}
.mb-30 {
  margin-bottom: 30px;
}
.mt-30 {
  margin-top: 30px;
}
.mr-tp-15 {
  margin-top: 15px;
}
.p-10 {
  padding: 10px;
}

@media only screen and (max-width: 1024px) {
  .login-wrapper {
    padding-bottom: 0px;
  }

  .show-md {
    display: block;
  }

  .md-hide {
    display: none;
  }
}

@media only screen and (min-width: 1025px) {
  .show-md {
    display: none;
  }

  .mobile-menu {
    display: none;
  }
}

@media only screen and (max-width: 991px) {
  #repAccountListModal > .modal-dialog {
    width: 95%;
    margin: 0px;
  }
}
@media screen and (max-width: 640px) {
  .login-whitebox {
    min-width: 90vw;
  }
}

/* Burger menu */

/* #burger_menu[aria-expanded="true"] > div.x {
  transform: rotate(45deg);
  transform-origin: top left;
}
#burger_menu[aria-expanded="true"] > div.y {
  background: #FFFFFF;
}
#burger_menu[aria-expanded="true"] > div.z {
  transform: rotate(-45deg);
  transform-origin: bottom left;
  margin: 7px 5px 5px 5px;
} */
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

.menu-btn[aria-expanded='true'] > div.x {
  transform: rotate(45deg);
  transform-origin: top left;
}
.menu-btn[aria-expanded='true'] > div.y {
  background: #ffffff;
  display: none;
}
.menu-btn[aria-expanded='true'] > div.z {
  transform: rotate(-45deg);
  transform-origin: bottom left;
  margin: 10px 1px 3px 3px;
}

.mobile-menu {
  position: absolute;
  width: 100%;
  z-index: 1;
  background-image: url('/static/images/logos/sign-in.png');
}

.mobile-menu li {
  list-style: none;
  margin-bottom: 10px;
}

.mobile-menu li a {
  color: #fff;
}
</style>
