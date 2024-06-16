/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-04-15 13:14:39
 * @modify date 2020-04-15 13:14:39
 * @desc [description]
 */
import axios from 'axios';

/* getUserData get api
 * to get the user data */
export async function getUserData() {
  let result = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/user_data`)
    .then((response) => {
      if (response.status === 200 && response.data) result = response.data;
    })
    .catch((err) => {
      console.log('get user_data Java api error', err);
    });
  return result;
}

/* updateUserData put api
 * to update the user data */
export async function updateUserData(data) {
  let result = false;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/user_data`, data)
    .then((response) => {
      if (response.status === 200) {
        result = true;
      }
    })
    .catch((err) => {
      console.log('put user_data java api error', err);
    });
  return result;
}

/* getRolesList get api
 * to get roles list */
export async function getRolesList() {
  let result = [];
  const accountTypeId = JSON.parse(
    localStorage.getItem('userData')
  ).account_type_id;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/roles/${accountTypeId}`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('get roles python api error', err); // eslint-disable-line no-console
    });
  return result;
}

/* getUserPurchaseData get api
 * to get the user purchase data */
export async function getUserPurchaseData() {
  let result = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/purchaseHistory/user`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('get user purchase data Java api error', err);
    });
  return result;
}

export async function downloadPurchaseHistory() {
  let purchaseHistory = {};
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/purchaseHistory/purchase_history_download`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        purchaseHistory = response.data;
      }
    })
    .catch((err) => {
      console.log('Purchase History API  in Admin API error', err);
      purchaseHistory = err.response.data;
    });
  return purchaseHistory;
}
