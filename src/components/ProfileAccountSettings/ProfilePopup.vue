<template>
  <div>
    <div class="col-sm-12 col-xs-12 col-md-12">
    </div>
    <div v-if="!passwordFlag">
      <div id="profile-body" class="col-sm-12 col-md-12 col-xs-12">
        <div id="profile-icon" class="col-sm-5 pt-15">
          <div class="col-sm-12 col-xs-5 xs-pd-lt-0">
            <div
              class="profile-pic-edit profile-pic-title-edit"
              v-if="loggedInInitialsFlag"
            >
              {{ getInitials(loggedInUser.first_name, loggedInUser.last_name) }}
            </div>
            <img
              class="profile-pic-edit"
              v-if="!loggedInInitialsFlag"
              :src="imageData"
            />
          </div>
          <div class="col-sm-12 col-xs-7 pt-20">
            <div class="col-xs-12 pd-0">
              <BaseButton variant="secondary"
                >Change Photo
                <input
                  type="file"
                  ref="fileImage"
                  @change="previewImage"
                  accept="image/*"
                  class="file-upload-hide cursor-pointer"
              /></BaseButton>
            </div>
            <div class="col-xs-12 pt-20">
              <button
                class="cursor-pointer text-subtitle-1 blue-3"
                :disabled="loggedInInitialsFlag"
                @click="removePhotoUseInitials"
              >
                Remove Photo
              </button>
            </div>
          </div>
        </div>
        <div
          id="profile-details"
          class="col-sm-7 col-md-7 col-xs-12 pt-10"
          v-if="Object.keys(loggedInUser).length"
        >
          <div class="row">
            <div class="col-sm-12 col-xs-12 text-body-light black-2">
              First Name <span class="required">*</span>
            </div>
            <div class="col-sm-12 col-xs-12 mb-20 xs-mr-bt-0">
              <input
                type="text"
                class="form-control"
                maxlength="65"
                @input="checkUpdatedFields"
                v-model="loggedInUser.first_name"
              />
            </div>
            <div class="col-sm-12 col-xs-12 text-body-light black-2">
              Last Name <span class="required">*</span>
            </div>
            <div class="col-sm-12 col-xs-12 mb-20 xs-mr-bt-0">
              <input
                :maxlength="maxCharLength"
                v-model="loggedInUser.last_name"
                type="text"
                class="form-control"
                @input="resolveUserDataLength('last_name')"
              />
            </div>
            <div class="col-sm-12 col-xs-12 text-body-light black-2">Title</div>
            <div class="col-sm-12 col-xs-12 mb-20 xs-mr-bt-0">
              <input
                type="text"
                class="form-control"
                :maxlength="titleMaxCharLength"
                @input="resolveUserDataLength('title')"
                v-model="loggedInUser.title"
              />
            </div>
            <div class="col-sm-12 col-xs-12 text-body-light black-2">Company</div>
            <div class="col-sm-12 col-xs-12 mb-20 xs-mr-bt-0">
              <input
                type="text"
                class="form-control"
                disabled="disabled"
                v-model="loggedInUser.company"
              />
            </div>
            <div class="col-sm-12 col-xs-12 text-body-light black-2">Email</div>
            <div class="col-sm-12 col-xs-12 mb-20 xs-mr-bt-0">
              <input
                :title="loggedInUser.email"
                type="text"
                class="form-control"
                disabled="disabled"
                v-model="loggedInUser.email"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-xs-12 text-regular-large mt-15">Security</div>
          <div class="col-sm-12 col-xs-12">
            <hr />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="row">
              <div class="col-sm-4 col-xs-8 mt-20">
                <BaseButton variant="secondary" @click="redirectChangePassword">Change Password</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer col-xs-12 col-sm-12">
        <div class="d-flex col-gap-15 justify-content-end">
          <BaseButton variant="secondary" @click="$emit('closepopup', 'closeBasePopup')">Cancel</BaseButton>
          <BaseButton variant="primary" @click="updateProfile" :disabled="disableButtonForProfile || loaderStatus">Save Changes</BaseButton>
        </div>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
    <div v-else id="change-password">
      <div id="body" class="col-sm-6 col-md-6 col-xs-12 changepassword_wrapper">
        <div class="row">
          <div class="col-xs-12 col-sm-12">
            <div class="col-xs-12 col-sm-12">Current password</div>
            <div class="col-xs-12 col-sm-12 mb-20 password-form-container">
              <input
                :type="
                  visiblePasswords['currentPassword'] ? 'text' : 'password'
                "
                class="form-control"
                placeholder="Current password"
                v-model="password.current"
                @input="handleCurrentPasswordChange"
              />
              <span
                class="visibility-toggle"
                @click="togglePasswordVisibility('currentPassword')"
              >
                <img
                  src="/static/images/logos/eye-logo.svg"
                  alt="eye-image"
                  id="toggleCurrentPassword"
                />
              </span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="col-xs-12 col-sm-12">New password</div>
            <div class="col-xs-12 col-sm-12 mb-20 password-form-container">
              <input
                :type="visiblePasswords['newPassword'] ? 'text' : 'password'"
                class="form-control"
                placeholder="New password"
                v-model.trim="password.newPassword"
                @input="validate"
              />
              <span
                class="visibility-toggle"
                @click="togglePasswordVisibility('newPassword')"
              >
                <img
                  src="/static/images/logos/eye-logo.svg"
                  alt="eye-image"
                  id="toggleNewPassword"
                />
              </span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12">
            <div class="col-xs-12 col-sm-12">Confirm password</div>
            <div class="col-xs-12 col-sm-12 mb-20 password-form-container">
              <input
                :type="
                  visiblePasswords['confirmPassword'] ? 'text' : 'password'
                "
                class="form-control"
                placeholder="Confirm password"
                v-model.trim="password.reTypeNewPassword"
                @input="validate"
              />
              <span
                class="visibility-toggle"
                @click="togglePasswordVisibility('confirmPassword')"
              >
                <img
                  src="/static/images/logos/eye-logo.svg"
                  alt="eye-image"
                  id="toggleConfirmPassword"
                />
              </span>
            </div>
          </div>
          <div
            v-if="!isCurrentPasswordMatchesPattern"
            class="col-xs-12 col-sm-12 validation-message pl-30 pr-0"
          >
            Current Password Mismatch
          </div>
          <div
            class="col-xs-12 col-sm-12 validation-message pl-30 pr-0"
            v-if="password.newPassword && PasswordError"
          >
            {{ PasswordError }}
          </div>
          <div class="col-xs-12 col-sm-12" v-if="changePasswordError.length">
            <div class="col-xs-12 col-sm-12 validation-message">
              {{ changePasswordError }}
            </div>
          </div>
        </div>
      </div>
      <div class="footer col-xs-12 col-sm-12">
        <div class="d-flex col-gap-15 justify-content-end">
          <BaseButton class="secondary" @click="unsetPasswordFlag">
            Cancel
          </BaseButton>
          <BaseButton
            class="primary"
            @click="updatePassword"
            :disabled="disableButtonForChangePassword || loaderStatus"
          >
            Save Changes
          </BaseButton>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
    <div id="confirmPopup" class="modal fade" role="dialog">
      <div class="modal-dialog profile-confirm-poup">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header confirmpopup-bgcolor">
            <button
              type="button"
              class="close"
              data-toggle="modal"
              data-target="#confirmPopup"
            >&times;</button>
          </div>
          <div class="modal-body confirm-body">
            Would you like to save your changes before leaving the page?
          </div>
          <div class="modal-footer confirmpopup-bgcolor">
            <div class="col-md-6 col-sm-6 col-xs-12 profile-footer-save">
              <BaseButton
                variant="primary"
                @click="confirmChanges"
              >
                Save Changes
              </BaseButton>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <BaseButton
                variant="secondary"
                @click="cancelConfirmPopUp"
              >
                Discard Changes
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Loader from '../UIComponents/Loader.vue';
import EventBus from '../../utils/event-bus';
import { updateUserData, getUserData } from '../../apis/profile';
import { changePassword } from '../../apis/passwords';
import {
  isContainsUpperCase,
  isContainsLowerCase,
  isContainsDigit,
  isContainsSpecialChar,
  checkConditions
} from '../Register/validator';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  components: {
    Loader,
    BaseButton,
  },
  props: ['closeSubPage'],
  data() {
    return {
      errors: [],
      loaderStatus: false,
      loggedInInitialsFlag: false,
      imageData: '',
      imageExists: false,
      loggedInUser: {},
      passwordFlag: false,
      password: {
        current: '',
        newPassword: '',
        reTypeNewPassword: ''
      },
      disableButtonForProfile: true,
      changePasswordNavHold: false,
      closeBasePopup: 'default',
      changePasswordError: [],
      verification: [
        { message: 'Have at least one capital letter', valid: false },
        { message: 'Have at least one lowercase letter', valid: false },
        { message: 'Have at least one number', valid: false },
        { message: 'Have at least one special character', valid: false }
      ],
      maxCharLength: 50,
      maxPasswordCharLength: 65,
      titleMaxCharLength: 5,
      visiblePasswords: {
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
      },
      isCurrentPasswordMatchesPattern: true
    };
  },
  created() {
    if (!this.passwordFlag) this.loadProfile();
  },
  watch: {
    closeSubPage(val) {
      if (val === 'close') {
        this.unsetPasswordFlag();
      }
    }
  },
  computed: {
    disableButtonForChangePassword() {
      if (this.passwordFlag) {
        if (
          this.password.current !== '' &&
          this.password.newPassword !== '' &&
          this.password.reTypeNewPassword !== '' &&
          this.password.newPassword === this.password.reTypeNewPassword
        ) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    resolveUserDataLength(fieldName) {
      const fieldMaxLengths = {
        title: this.titleMaxCharLength
      };
      if (this.loggedInUser[fieldName]) {
        this.loggedInUser[fieldName] = this.loggedInUser[fieldName].substring(
          0,
          fieldMaxLengths[fieldName] || this.maxCharLength,
        );
      }
      this.checkUpdatedFields();
    },
    handleCurrentPasswordChange() {
      if (this.password.current) {
        this.password.current = this.password.current.substr(
          0,
          this.maxPasswordCharLength,
        );
      }
    },
    validate() {
      this.counter = 0;
      if (this.password.newPassword) {
        this.password.newPassword = this.password.newPassword.substr(
          0,
          this.maxPasswordCharLength,
        );
      }
      if (this.password.reTypeNewPassword) {
        this.password.reTypeNewPassword =
          this.password.reTypeNewPassword.substr(0, this.maxPasswordCharLength);
      }
      if (this.password.newPassword) {
        this.verification[0].valid = isContainsUpperCase(this.password.newPassword);
        this.verification[1].valid = isContainsLowerCase(this.password.newPassword);
        this.verification[2].valid = isContainsDigit(this.password.newPassword);
        this.verification[3].valid = isContainsSpecialChar(this.password.newPassword);
      }
      this.counter = checkConditions(this.password.newPassword);
      this.isPasswordLength = false;
      if (this.password.newPassword.length >= 10) this.isPasswordLength = true;

      this.PasswordError =
        'Your password must be at least 10 characters and meet any 3 of these 4 criteria: 1 capital letter (A-Z), 1 lowercase letter ( a-z), 1 number (1-9), and one special character (!@#$.,+=( )_%^&*)';
      if (this.isPasswordLength && this.counter >= 3) {
        if (
          this.password.reTypeNewPassword && this.password.newPassword !== this.password.reTypeNewPassword
        ) {
          this.PasswordError = "The confirm password doesn't match the new password above";
        } else {
          this.PasswordError = false;
        }
      }
    },
    async confirmChanges() {
      $('#confirmPopup').modal('toggle');
      await this.updateProfile();
    },
    cancelConfirmPopUp() {
      this.disableButtonForProfile = true;
      $('#confirmPopup').modal('toggle');
      if (this.changePasswordNavHold) {
        this.setPasswordFlag();
      } else {
        this.$emit('closedConfirmPopup', this.closeBasePopup);
        this.closeBasePopup = 'default';
      }
    },
    toggleConfirmPopUp(closeBasePopup = 'default') {
      this.closeBasePopup = closeBasePopup;
      $('#confirmPopup').modal('toggle');
    },
    checkUpdatedFields() {
      if (this.loggedInUser.first_name && this.loggedInUser.last_name) {
        this.disableButtonForProfile = false;
      } else {
        this.disableButtonForProfile = true;
      }
    },
    redirectChangePassword() {
      if (this.disableButtonForProfile) {
        this.setPasswordFlag();
      } else {
        this.changePasswordNavHold = true;
        this.toggleConfirmPopUp();
      }
    },
    async updatePassword() {
      if (this.validateCurrentPassword()) {
        this.isCurrentPasswordMatchesPattern = true;
      } else {
        this.isCurrentPasswordMatchesPattern = false;
        return;
      }
      this.loaderStatus = true;
      const data = {
        current_password: this.password.current,
        new_password: this.password.newPassword
      };
      const response = await changePassword(data);
      if (!response) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Updating password failed!'
        });
      } else if (response && !response.status) {
        this.changePasswordError = response.message;
      } else {
        this.changePasswordError = [];
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Password updated successfully!'
        });
        this.passwordFlag = false;
        this.unsetPasswordFlag();
      }
      this.loaderStatus = false;
    },
    setPasswordFlag() {
      this.changePasswordNavHold = false;
      this.passwordFlag = true;
      this.$emit('emitBreadCrumb', 'Change Password');
      this.visiblePasswords = {
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
      };
    },
    unsetPasswordFlag() {
      this.password = { current: '', newPassword: '', reTypeNewPassword: '' };
      this.passwordFlag = false;
      this.changePasswordError = [];
      this.$emit('emitBreadCrumb', false);
      this.loadProfile();
    },
    removePhotoUseInitials() {
      this.loggedInInitialsFlag = true;
      this.imageData = '';
      this.checkUpdatedFields();
      if (this.imageExists === false && !this.disableButtonForProfile) {
        this.disableButtonForProfile = true;
      }
    },
    async updateProfile() {
      this.loaderStatus = true;
      const data = {
        first_name: this.loggedInUser.first_name,
        last_name: this.loggedInUser.last_name,
        company: this.loggedInUser.company,
        email: this.loggedInUser.email,
        id: this.loggedInUser.id,
        allow_support_access: true
      };
      if (this.loggedInUser.title) data.title = this.loggedInUser.title;
      if (this.imageData) data.user_image = this.imageData;
      const response = await updateUserData(data);
      if (response) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Profile updated successfully!'
        });
        this.updateProfileInmemory();
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Please try again later!'
        });
      }
      this.disableButtonForProfile = true;
      this.loaderStatus = false;
    },

    updateProfileInmemory() {
      if (localStorage.getItem('userData')) {
        const response = JSON.parse(localStorage.getItem('userData'));
        response.first_name = this.loggedInUser.first_name;
        response.last_name = this.loggedInUser.last_name;
        response.title = this.loggedInUser.title;
        response.company = this.loggedInUser.company;
        response.email = this.loggedInUser.email;
        response.id = this.loggedInUser.id;
        response.allow_support_access = true;
        response.user_image = this.imageData;
        localStorage.setItem('userData', JSON.stringify(response));
      }
      this.emitter.emit('updateProfile', true);
    },

    previewImage(event) {
      const input = event.target;
      const that = this;
      const fileLoader = this.$refs.fileImage;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.imageData = e.target.result;
          that.loggedInInitialsFlag = false;
          fileLoader.value = null;
        };
        reader.readAsDataURL(input.files[0]);
      }
      this.checkUpdatedFields();
    },

    async loadProfile() {
      this.loaderStatus = true;
      this.loggedInUser = {};
      const response = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : await getUserData();
      this.loaderStatus = false;
      this.loggedInUser = response;
      this.imageData = response.user_image;
      this.imageExists = true;
      localStorage.setItem('userData', JSON.stringify(response));
      if (this.imageData === '' || this.imageData == null) {
        this.loggedInInitialsFlag = true;
        this.imageExists = false;
      } else {
        this.loggedInInitialsFlag = false;
      }
      this.emitter.emit('updateProfile', true);
    },
    getInitials(firstname, lastname) {
      return `${firstname ? firstname.charAt(0).toUpperCase() : ''}${
        lastname ? lastname.charAt(0).toUpperCase() : ''
      }`;
    },
    togglePasswordVisibility(fieldName) {
      this.visiblePasswords[fieldName] = !this.visiblePasswords[fieldName];
    },
    validateCurrentPassword() {
      const currentPassword = this.password.current;
      let isValid = false;
      if (currentPassword) {
        if (
          currentPassword.length >= 10 && checkConditions(currentPassword) > 2
        ) {
          isValid = true;
        }
      }
      return isValid;
    }
  }
};
</script>

<style scoped>
.profile-footer-save {
  float: right;
}
.profile-confirm-poup {
  width: 500px;
}
.confirm-body {
  padding: 5% 12%;
  margin-bottom: 10%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
}
.modal-header .close {
  background: unset;
  opacity: 1;
  line-height: unset;
  width: unset;
  border-radius: unset;
  color: unset;
  font-weight: 300;
  font-size: 30px;
}
.confirmpopup-bgcolor {
  background-color: #ffffff;
  border: 0px;
  border-radius: 10px;
}
#profile-icon {
  text-align: center;
}
@media (min-width: 768px) {
  #profile-icon {
    float: right;
  }
}
.chng-passwd {
  background: #0b3c61;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  color: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
}
.chng-passwd:hover,
.chng-passwd:active,
.chng-passwd:focus,
.chng-passwd.active.focus,
.chng-passwd.active:focus,
.chng-passwd.active:hover,
.chng-passwd:active.focus,
.chng-passwd:active:focus,
.chng-passwd:active:hover {
  background-color: #0b3c61;
  border-color: #0b3c61;
  color: #fff;
  box-shadow: none;
}
.password-form-container {
  display: flex;
  align-items: center;
}
.password-form-container .visibility-toggle {
  margin-left: 15px;
  cursor: pointer;
}
.pt-15 {
  padding-top: 15px;
}
.pl-20 {
  padding-left: 20px;
}
.pr-20 {
  padding-right: 20px;
}
.font-properties {
  font-family: Roboto;
  font-style: normal;
}
.emergo-drk-blue {
  color: #0b3c61;
}
.fs-14 {
  font-size: 14px;
}
.fs-16 {
  font-size: 16px;
}
.fs-28 {
  font-size: 28px;
}
.line-ht-33 {
  line-height: 33px;
}
.line-ht-16 {
  line-height: 16px;
}
.ln-ht19 {
  line-height: 19px;
}
.font-weight-normal {
  font-weight: normal;
}
.font-weight-bold {
  font-weight: bold;
}
.font-weight-prop {
  font-weight: 300;
}
.prd-dtls-pd {
  padding: 10px 0px 0px 0px;
}
.header-profile {
  padding: 15px 0px 0px 20px;
  font-size: 28px;
  line-height: 33px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
}
.chng-photo {
  width: 170px;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  background: #ffff;
  color: #0b3c61;
  margin: 10px 0 10px 0;
  font-size: 18px;
  font-weight: 500;
  opacity: unset !important;
}
.sec-pad {
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61;
}
.sec-pad-line {
  padding: 10px 20px 0px 20px;
}
.save-btn {
  float: right;
  border-radius: 20px;
  border: 1px solid #4c9e45;
  background: #4c9e45;
  margin-right: 10px;
  height: 25px;
}
.cancel-btn {
  float: right;
  margin-right: 10px;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  color: #0b3c61 !important;
  border-radius: 20px;
  background: #ffff;
  height: 25px;
}
.icon-close {
  color: #828282 !important;
}
.form-control {
  padding: 6px 12px !important;
}
.ml-10 {
  margin-left: 10px;
}
.header-chng-pwd {
  padding: 10px 0px 0 20px;
  font-size: 19px;
  line-height: 33px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
}
.search-button {
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 16px;
}
.search-button:hover,
.search-button:hover,
.search-button:active,
.search-button:focus,
.search-button.active.focus,
.search-button.active:focus,
.search-button.active:hover,
.search-button:active.focus,
.search-button:active:focus,
.search-button:active:hover {
  box-shadow: none;
}
.save-button {
  border: 1px solid #4c9e45;
  background-color: #4c9e45 !important;
  border-radius: 20px;
  color: #ffffff !important;
  font-size: 16px;
}
.save-button:hover,
.save-button:hover,
.save-button:active,
.save-button:focus,
.save-button.active.focus,
.save-button.active:focus,
.save-button.active:hover,
.save-button:active.focus,
.save-button:active:focus,
.save-button:active:hover {
  background-color: #4c9e45;
  border-color: #4c9e45;
  color: #fff;
  box-shadow: none;
}
.profile-pic-edit {
  width: 170px;
  height: 170px;
  line-height: 170px;
  float: unset;
}
.cursor_pointer {
  cursor: pointer;
}
.profile-pic-title-edit {
  display: inline-block !important;
}
.pd-0 {
  padding: 0px;
}
.footer {
  position: absolute;
  bottom: 0%;
  padding-bottom: 2%;
  right: 0;
  background-color: #fff;
}
.file-upload-hide {
  margin: 0 auto;
  width: 170px;
}
#profile-body {
  max-height: calc(84vh - 142px);
  overflow-y: auto;
}
.required {
  color: red;
}
hr {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}
@media screen and (max-width: 374px) {
  .profile-confirm-poup {
    width: 250px;
  }
  .profile-pic-edit {
    width: 55px;
    height: 55px;
    line-height: 55px;
    float: unset;
  }
  .chng-photo {
    width: 120px;
    font-size: 14px;
  }
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 375px) {
  #profile-body {
    max-height: none;
  }
}
@media (min-width: 375px) and (max-width: 767px) {
  .profile-confirm-poup {
    width: 300px;
  }
  .confirm-body {
    padding: 5% 5%;
    margin-bottom: 10%;
    font-size: 18px;
    line-height: 21px;
  }
  .profile-pic-edit {
    width: 85px;
    height: 85px;
    line-height: 85px;
    float: unset;
  }
  .chng-photo {
    width: 150px;
  }
}
@media screen and (max-width: 767px) {
  .profile-footer-save {
    float: unset;
    margin-bottom: 14px;
  }
  .footer {
    padding-bottom: 5%;
  }
  .xs-pd-lt-0 {
    padding-left: 0px;
  }
  .xs-pd-rt-0 {
    padding-right: 0px;
  }
}
@media (min-width: 992px) and (max-width: 1024px) {
  #profile-body {
    max-height: calc(84vh - 295px);
  }
}
</style>
