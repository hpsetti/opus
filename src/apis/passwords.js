/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-04-07 13:15:47
 * @modify date 2020-04-07 13:15:47
 * @desc [description]
 */
import axios from 'axios';

/**
 * forgot post api
 * to post the email for forgot password */
export async function postForgotEmail(data) {
  let result = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/forgot_password`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('forgot_password python api error', err);
    });
  return result;
}

/**
 * /reset/${token} post api
 * to reset the password */
export async function resetPassword(data, token) {
  let result = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/reset/${token}`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('/reset/token post python api error', err);
    });
  return result;
}

/**
 * /register/${token} post api
 * to register the password for new account */
export async function confirmRegisterPassword(data, token) {
  let result = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/register/${token}`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('/register/token post python api error', err);
    });
  return result;
}

/**
 * /reset/${token} get api
 * to validate the reset password token */
export async function validateResetToken(token) {
  let result = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/reset/${token}`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('/reset/token get python api error', err);
    });
  return result;
}

/**
 * /register/${token} get api
 * to validate the register token */
export async function validateRegisterToken(token) {
  let result = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/register/${token}`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('/register/token get python api error', err);
    });
  return result;
}

/**
 * /changePassword put api
 * to update the password */
export async function changePassword(data) {
  let result = '';
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/change_password`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('change_password python api error', err);
    });
  return result;
}
