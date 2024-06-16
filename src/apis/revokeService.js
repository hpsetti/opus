import axios from 'axios';

/* get account records */
export async function getUsersList(search) {
  const params = {
    searchBy: search
  };
  let data = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/search`, {
      params
    })
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

export async function getAvailableService(userId) {
  let availableServices = {};
  const params = {
    userId
  };
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/allPurchasedServices`,
      {
        params
      }
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        availableServices = response.data.data;
      }
    })
    .catch((err) =>
      console.log('get Available Services  in Admin API error', err)
    );
  return availableServices;
}

export async function deactivateUserAccount(accountId) {
  let deactivateUser = {};
  const data = {
    account_ids: [accountId]
  };
  await axios
    .delete(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/deactivate/account`,
      {
        data
      }
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        deactivateUser = response.data;
      }
    })
    .catch((err) =>
      console.log('get Available Services  in Admin API error', err)
    );
  return deactivateUser;
}

export async function revokeServicesByPlanIds(payload) {
  let activatePlansSelected = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/revokePlans`,
      payload
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        activatePlansSelected = response.data;
      }
    })
    .catch((err) => {
      console.log('Activate Plans API  in Admin API error', err);
      activatePlansSelected = err.response.data;
    });
  return activatePlansSelected;
}
