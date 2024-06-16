import axios from 'axios';

export async function addToCart(body) {
  let result = {};
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/cart`, body)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response;
      }
    })
    .catch((err) => {
      console.log('add to cart java api error', err);
    });
  return result;
}

export async function removeFromCart(cartId) {
  let result = {};
  const params = {
    cartId
  };
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/cart`, {
      params
    })
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response;
      }
    })
    .catch((err) => {
      console.log('remove from cart java api error', err);
    });
  return result;
}

export async function getCartList(UserId) {
  let result = [];
  const params = {
    UserId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/cart`, {
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
export async function getExpiryList() {
  let result = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/toBeExpireServices`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get expiry list java api error', err);
    });
  return result;
}

export async function purchaseCartItems(payload) {
  let result = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/purchaseCart`,
      payload
    )
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('purchase cart items java api error', err);
    });
  return result;
}
export async function addToCartRenew(body) {
  let result = {};
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/market/place/v2/cart`, body)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response;
      }
    })
    .catch((err) => {
      console.log('add to cart Renew services java api error', err);
    });
  return result;
}
