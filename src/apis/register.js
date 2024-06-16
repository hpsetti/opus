import axios from 'axios';

/**
 * /getCountryInfo get api
 * to get the countrieslist for register page */
export async function getCountries() {
  let result = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/country_info`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('get country_info python api error', err);
    });
  return result;
}

/**
 * /blockOpusEmail get api
 * to get the blocked competitor emails for register page */
export async function getBlockedEmails() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/blockOpusEmail`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Java Get BlockedEmails Error', err);
    });
  return data;
}

/**
 * /EmailBlockStatus get api
 * to get the blocked email status to activate for different environments for register/profile page */
 export async function getEmailBlockStatus() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/blockOpusEmailStatus`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java Get BlockedEmailStatus Error', err);
    });
  return data;
}

/**
 * register post api
 * to register your account */
export async function postRegister(formData) {
  let result;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/sign_up`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('sign_up java api error', err);
    });
  return result;
}

/**
 * validateUserInfo post api
 * to validate User email */
export async function validateUserInfo(formData) {
  let result;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/validate_user_info`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('validate_user_info java api error', err);
    });
  return result;
}
