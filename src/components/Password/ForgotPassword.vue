<template>
  <div class="flex-container">
    <div class="forgot-whitebox">
      <h1>Forgot your password?</h1>
      <p class="desc">
        Enter your email address and we will send you instructions for resetting
        your password.
      </p>
      <div class="forgot-container">
        <div class="forgot-input">
          <input
            class="forgot-input-box required form-control"
            type="email"
            placeholder="E-mail address"
            v-model="email"
          />
          <i class="fa fa-envelope"></i>
        </div>
      </div>
      <div class="error-msg-holder" v-if="errorMessage">
        <strong class="error-message">{{ errorMessage }}</strong>
        <br />
      </div>
      <button
        class="button btn button_forgot btn-success"
        type="button"
        @click="postEmail"
        :disabled="disableButton"
      >
        {{ btnTxt }}
      </button>
      <p class="desc mt-20">
        Please contact OPUS Support at
        <a href="mailto:opushelp@ul.com">opushelp@ul.com</a> in case you have
        not received the Password reset email.
      </p>
    </div>
  </div>
</template>
<script>
import { postForgotEmail } from '../../apis/passwords';
import { isValidMail } from '../Register/validator';

export default {
  data() {
    return {
      email: '',
      errorMessage: '',
      enableBtn: true,
      btnTxt: 'E-mail me instructions'
    };
  },
  methods: {
    async postEmail() {
      this.errorMessage = '';
      this.btnTxt = 'Submitting Form...';
      const result = await postForgotEmail({ email: this.email });
      if (result.status) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: result.message
        });
        this.$router.push('/login');
      } else if (!result.status) {
        this.errorMessage = result.message;
      }
      this.btnTxt = 'E-mail me instructions';
    }
  },
  computed: {
    disableButton() {
      if (isValidMail(this.email)) {
        return false;
      }
      return true;
    }
  }
};
</script>
<style scoped>
.flex-container {
  margin-top: 30px;
  text-align: center;
}
.forgot-whitebox {
  padding: 0 10px;
  max-width: 450px;
  min-width: 450px;
}
.forgot-container {
  font-size: 16px;
  position: relative;
  padding-bottom: 10px;
}
.forgot-whitebox > h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 48px;
  margin-bottom: 16px;
  line-height: 1;
}
.forgot-input-box {
  padding: 25px 35px 25px 50px;
}
.desc {
  margin-bottom: 20px;
  font-size: 15px;
  color: black;
}
.btn {
  padding: 7px 30px 8px 30px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
}
.mt-20 {
  margin-top: 20px;
}
.forgot-container .forgot-input > i.fa {
  position: absolute;
  top: 18px;
  left: 20px;
}
.button_forgot {
  margin-top: 15px;
  background: #4c9e45;
  border: 1px solid #4c9e45;
}
.button_forgot:hover,
.button_forgot:active,
.button_forgot:focus,
.button_forgot.active.focus,
.button_forgot.active:focus,
.button_forgot.active:hover,
.button_forgot:active.focus,
.button_forgot:active:focus,
.button_forgot:active:hover {
  border: 1px solid #4c9e45;
  background: #4c9e45;
  box-shadow: none;
}
@media screen and (max-width: 640px) {
  .forgot-whitebox {
    min-width: 95vw !important;
  }
}
@media screen and (max-width: 1024px) {
  .flex-container {
    margin: 15px !important;
  }
}
@media (min-width: 320px) and (max-width: 374px) {
  .forgot-whitebox > h1 {
    font-size: 42px;
  }
  .desc {
    font-size: 13px;
  }
}
</style>
