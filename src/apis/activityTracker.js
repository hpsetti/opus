/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2020-03-23 15:07:41
 * @modify date 2020-03-23 15:07:41
 * @desc [description]
 */
import axios from 'axios';

/* get account records */
export async function getAllAccount(formData) {
  let data = '';
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/data/account`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get account data api error', err);
    });
  return data;
}

/**
 * getAccountPreferences get API
 * to get the Account preferences list for Activity tracker page */
export async function getAccountPreferences() {
  let preferences = {};
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/preferences/account`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        preferences = response.data.data;
      }
    })
    .catch((err) => console.log('get user preferences java api error', err));
  return preferences;
}

/* accountPreferences put API
 * to update the Account Preferences */
export async function updateAccountPreferences(data) {
  let result = {};
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/preferences/account`,
      data
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('put preferences user java api error', err);
    });
  return result;
}

/* account deactviate delete API
 * to deactivate the account */
export async function deactivateAccount(formData) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/deactivate/account`;
  let result = '';
  await axios
    .delete(url, { data: formData })
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('deactivate account java api error', err);
    });
  return result;
}

/**
 * data/user get API
 * to get the users list */
export async function getAllUsers(formData) {
  let data = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/data/user`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get users java api error', err);
    });
  return data;
}
/**
 * preferences/user get API
 * to get the users preferences list */
export async function getUsersPreferences() {
  let preferences = {};
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/preferences/user`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        preferences = response.data.data;
      }
    })
    .catch((err) => console.log('get user preferences java api error', err));
  return preferences;
}

/* preferences/user put API
 * to update the Users Preferences */
export async function updateUsersPreferences(data) {
  let result = {};
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/preferences/user`,
      data
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('put preferences user java api error', err);
    });
  return result;
}

/* user deactviate delete API
 * to deactivate the user */
export async function deactivateUser(formData) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/deactivate/user`;
  let result = '';
  await axios
    .delete(url, { data: formData })
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('deactivate user java api error', err);
    });
  return result;
}

/* password/user get API
 * to reset password for the user */
export async function resetUserPassword(id) {
  let result = {};
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/password/user/${id}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('reset password user java api error', err);
    });
  return result;
}

/* export users post API
 * to get the users list and export the users to excel */
export async function exportUsers(data) {
  let result = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/export/user`,
      data
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('reset password user java api error', err);
    });
  return result;
}

/**
 * getPlanDetails get API
 * to get the Account details WRT Account id */
export async function getPlanServices(id) {
  let preferences = {};
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/plans/info/${id}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        preferences = response.data.data;
      }
    })
    .catch((err) => console.log('get user preferences java api error', err));
  return preferences;
}
