import axios from 'axios';

/**
 * login get api
 * to get the autorization token on successful login */
export async function loginUser(formData) {
  let respData = {};
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/login`, formData)
    .then((response) => {
      if (response.status && response.headers.authorization) {
        document.cookie = `Authorization = ${response.headers.authorization}; path=/;`;
      }
      respData = response.data;
    })
    .catch((err) => {
      console.log('login JAVA api error', err);
    });
  return respData;
}
/**
 * login_with_account post api
 * to get the autorization token on successful login if user has multiple accounts */
// export async function proceedLogin(formData) {
//   let respData;
//   await axios
//     .post(`${import.meta.env.VITE_VUE_APP_PYTHON_API_URL}/login_with_account`, formData)
//     .then((response) => {
//       if (response.data.status && response.headers.access_token) {
//         document.cookie = `Authorization = Bearer ${response.headers.access_token}; path=/;`;
//       }
//       respData = response.data;
//     })
//     .catch((err) => {
//       console.log('login_with_account java api error', err);
//     });
//   return respData;
// }

/**
 * confirm_email get api
 * to get confirm the user account */
export async function confirmLogin(token) {
  let respData = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/confirm_email/${token}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        respData = response.data;
      }
    })
    .catch((err) => {
      console.log('confirm_email java api error', err);
    });
  return respData;
}

/**
 * refresh get api
 * to get the authentication refresh token */
export async function getRefreshToken() {
  let result = false;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/token/refresh`)
    .then((response) => {
      if (response.data.status_code === 200 && response.headers.authorization) {
        document.cookie = `Authorization = ${response.headers.authorization}; path=/;`;
        result = true;
      }
    })
    .catch((err) => {
      console.log('getRefreshToken java api err', err);
    });
  return result;
}

/**
 * /rbac/service/accounts/userId api
 * to get the permissions based on userId,accountId,roleId */
export async function getAccountsList() {
  const userId = JSON.parse(localStorage.getItem('userId'));
  let result = '';
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/service/accounts/userId/${userId}`
    )
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('getSwitchAccounts java api error', err);
    });
  return result;
}

/**
 * /rbac/service/switchAccount api
 * Switch to selected account */
export async function switchToNewAccount(data) {
  let result = '';
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/service/switchAccount`,
      data
    )
    .then((response) => {
      if (
        response &&
        response.data.status_code === 200 &&
        response.headers.authorization
      ) {
        document.cookie = `Authorization = ${response.headers.authorization}; path=/;`;
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('switchToNewAccount java api error', err);
    });
  return result;
}

export async function getLogoutLogs() {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/Logout`)
    .then((response) => {
      if (response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('get Logout Logs java api error', err);
    });
  return result;
}
