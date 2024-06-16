import axios from 'axios';

export async function getTrainingData() {
  let data = [];
  const userId = JSON.parse(localStorage.getItem('userId'));
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/lmsController/courseList/${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Training dashboard api', err);
    });
  return data;
}

export async function getSelectedCourses(id) {
  let data = [];
  const userId = JSON.parse(localStorage.getItem('userId'));
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/lmsController/courseListPurchaseScreen/${userId}?selectedCourseIds=${id}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Selected Courses api', err);
    });
  return data;
}

export async function addSelectedCources(formData) {
  let result = false;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/add`, formData)
    .then((response) => {
      if (
        response &&
        response.data.status_code === 200 &&
        response.data.message === 'success'
      ) {
        result = true;
      }
    })
    .catch((err) => {
      console.log('Add Plans/courses java api error', err);
    });
  return result;
}

export async function getBillingInfo() {
  let billingInfo = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info`)
    .then((response) => {
      if (response.data) {
        billingInfo = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get billingInfo java api error', err);
    });
  return billingInfo;
}

export async function getCCBillingInfo(orderId) {
  let billingInfo = {};
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info/billing/info/${orderId}`
    )
    .then((response) => {
      if (response.data) {
        billingInfo = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get CC billingInfo java api error', err);
    });
  return billingInfo;
}

export async function postBillingInfo(data) {
  let billingInfo = [];
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info`, data)
    .then((response) => {
      if (response.data) {
        billingInfo = response.data;
      }
    })
    .catch((err) => {
      console.log('post billingInfo java api error', err);
    });
  return billingInfo;
}

export async function updateBillingInfo(data) {
  let billingInfo = [];
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info`, data)
    .then((response) => {
      if (response.data) {
        billingInfo = response.data;
      }
    })
    .catch((err) => {
      console.log('post billingInfo java api error', err);
    });
  return billingInfo;
}

export default async function getScheduleTrainingData() {
  let data;
  await axios
    .get('/static/json/schedule-training.json')
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus tools Error', err);
    });
  return data;
}

export async function getLmsAssertionCode() {
  let data;
  const userId = JSON.parse(localStorage.getItem('userId'));
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/saml/generateSamlAssertion/${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Opus SAML Code Error', err);
    });
  return data;
}
export async function getLmsAssertionHtml() {
  let data;
  const userId = JSON.parse(localStorage.getItem('userId'));
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/saml/generateSamlAssertionHTML/${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus SAML Html Error', err);
    });
  return data;
}
