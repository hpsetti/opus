import axios from 'axios';

/* eslint-disable comma-dangle */
export async function getResources() {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/premium/services`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get resources for marketplace api error', err);
    });
  return result;
}

export async function getResourcesListById(id, userId) {
  let result = {};
  const params = {
    serviceTypeId: id,
    userId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/marketPlaceItems`, {
      params
    })
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('remove from cart java api error', err);
    });
  return result;
}

export async function getMarketplaceSubscriptions() {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/subscriptions`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get marketplace subscriptions api error', err);
    });
  return result;
}

export async function getRequestQuotePremiumFeatures() {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/featureItems`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get marketplace requestQuotePremiumFeatures api error', err);
    });
  return result;
}

export async function postRequestQuote(payload) {
  let result = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/requestQuote
    `,
      payload
    )
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('post marketplace requestQuote api error', err);
    });
  return result;
}
