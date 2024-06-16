import axios from 'axios';

export async function getChaseUID(formData) {
  let resp;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/payment/init`, formData)
    .then((response) => {
      resp = response.data.data;
    })
    .catch((err) => {
      console.log('chase uID java api error', err);
    });
  return resp;
}

export async function getPaymentDetails(formData) {
  let resp;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/payment/request`, formData)
    .then((response) => {
      resp = response.data.data;
    })
    .catch((err) => {
      console.log('chase uID java api error', err);
    });
  return resp;
}
