import axios from 'axios';

export async function fetchPurchasedConsultings({ userId }) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/consulting/requestQuoteList?userId=${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Opus Consultings Error', err);
    });
  return data;
}

export async function fetchMarketplaceConsultings({ userId }) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/consulting/courseList?userId=${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Opus Consultings Error', err);
    });
  return data;
}

export async function fetchConsultingDetails({ userId, courseId }) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/consulting/courseDetailsList?userId=${userId}&courseId=${courseId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Opus Consultings Error', err);
    });
  return data;
}

export async function quoteConsulting(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/consulting/requestAQuoteForConsulting`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus Consultings Error', err);
    });
  return data;
}

export async function contactUs(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/consulting/contactus`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus Consultings Error', err);
    });
  return data;
}
