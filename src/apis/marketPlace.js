import axios from 'axios';
import $ from 'jquery';
import sortBy from 'lodash/sortBy';
import { getCookie } from '../utils/common';
/**
 * services get api
 * to get all the premium services */
/* eslint-disable comma-dangle  */
export async function getServices() {
  let services = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/premium/services`)
    .then((response) => {
      if (response.data) {
        services = sortBy(response.data.data.premium_services, 'sequence');
        localStorage.setItem('services', JSON.stringify(services));
      }
    })
    .catch((err) => {
      console.log('get services java api error', err);
    });
  return services;
}

/**
 * services/description get api
 * to get the description for services */
export async function getServiceDesc() {
  let services = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/premium/services/description`
    )
    .then((response) => {
      if (response.data && response.data.status_code === 200) {
        services = response.data.data;
      }
    })
    .catch((err) => {
      console.log('services/description java api error', err);
    });
  return services;
}

/**
 * services/summary get api
 * to get the summary based on the given service id */
export async function getServiceSummary(serviceId) {
  let services = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/premium/services/summary/${serviceId}`
    )
    .then((response) => {
      if (response.data) {
        services = response.data.data;
      }
    })
    .catch((err) => {
      console.log('services/summary java api error', err);
    });
  return services;
}

/**
 * premium/services/add post api
 * to add the premium service to account */
export async function addService(formData) {
  let data = '';
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/premium/services/add`,
      formData
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('services/add java api error', err);
    });
  return data;
}

/**
 * activate/service post api
 * to activate the service for accountid */
export async function activateService(formData) {
  let data = '';
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/activate/service`,
      formData
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('activate/service java api error', err);
    });
  return data;
}

/**
 * /remove/service put api
 * to remove the activated service */
export async function removeService(formData) {
  let data = '';
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/remove/service`,
      formData
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('/remove/service java api error', err);
    });
  return data;
}

/**
 * /request/submit post api
 * to request the service */
export async function requestService(formData) {
  let data = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/quote/request/submit`, formData)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('/request/submit java api error', err);
    });
  return data;
}

/**
 * getAccountDetails get api
 * to get the account details for activation */
export async function getAccountDetails(accountId) {
  return new Promise((resolve, reject) => {
    // eslint-disable-line no-return-await
    $.ajax({
      url: `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/account/${accountId}`,
      type: 'GET',
      headers: {
        Authorization: getCookie('Authorization')
      },
      success(result) {
        resolve(result);
      },
      error(error) {
        reject(error.responseJSON);
      }
    });
  });
}

// export async function getAccountDetails(accountId) {
//   let data = '';
//   await axios
//     .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/account/${accountId}`)
//     .then(response => {
//       data = response.data;
//     })
//     .catch(err => {
//       console.log('/admin/account java api error', err);
//     });
//   return data;
// }

/**
 * /gg/request post api
 * to post the gg request */
export async function requestGreenLightService(formData) {
  let data = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/gg/quote/request`, formData)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('/gg/quote.request python api error', err);
    });
  return data;
}
