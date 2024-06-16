/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-03-13 10:42:52
 * @modify date 2020-03-13 10:42:52
 * @desc [description]
 */
import axios from 'axios';

/**
 * /banner/types get API
 * to get the banner types */
export async function getBannerTypes() {
  let banners = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/open/banner/types`)
    .then((response) => {
      banners = response.data.data;
    })
    .catch((err) => {
      console.log('banner/types java api error', err);
    });
  return banners;
}

/**
 * banner post API
 * to add new banner */
export async function addBanner(formData) {
  let result = false;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/banner`, formData)
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
      console.log('banner add java api error', err);
    });
  return result;
}

/**
 * banner get API
 * to get all the banners */
export async function getAllNotifications() {
  let notifications = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/banner`)
    .then((response) => {
      notifications = response.data.data;
    })
    .catch((err) => {
      console.log('banner get java api error', err);
    });
  return notifications;
}

/**
 * banner put API
 * to update the banner */
export async function updateBanner(formData) {
  let result = false;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/banner`, formData)
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
      console.log('banner put java api error', err);
    });
  return result;
}

/**
 * banner/active get API
 * to get the active banner */
export async function getActiveBanner() {
  let banners = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/open/banner/active`)
    .then((response) => {
      banners = response.data.data;
    })
    .catch((err) => {
      console.log('banner/active java api error', err);
    });
  return banners;
}
