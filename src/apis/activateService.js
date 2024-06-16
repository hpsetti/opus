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
      console.log('get User data by User ID api error', err);
    });
  return data;
}
export async function getAccountList(search) {
  const params = {
    accountId: search
  };
  let data = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/search/account`, {
      params
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get account data By Account ID api error', err);
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
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/availableServices`,
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
export async function getAllAvailableService() {
  let availableServices = {};
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/allServices`
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
export async function getRequestedService(userId) {
  let availableServices = {};
  const params = {
    userId
  };
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/subscriptionRequestedServices`,
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
      console.log('get Requested Services  in Admin API error', err)
    );
  return availableServices;
}

export async function deactivateAccount(accountId) {
  let account = {};
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
        account = response.data;
      }
    })
    .catch((err) =>
      console.log('Deactivate account API error', err)
    );
  return account;
}

export async function deactivateUser(accountId, userId) {
  let account = {};
  const data = {
    account_id: accountId,
    user_id: userId
  };
  await axios
    .delete(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/deactivate/user`,
      {
        data
      }
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        account = response.data;
      }
    })
    .catch((err) =>
      console.log('Deactivate account API error', err)
    );
  return account;
}

export async function activatePlans(payload) {
  let activatePlansSelected = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/activatePlans`,
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
export async function activateBulkPlans(payload) {
  let activatePlansSelected = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/activatePlanForMultipleUser`,
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
export async function activateRequestedPlans(payload) {
  let activatePlansSelected = {};
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/activateRequestedPlans`,
      payload
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        activatePlansSelected = response.data;
      }
    })
    .catch((err) => {
      console.log('Activate Requested Plans API  in Admin API error', err);
      activatePlansSelected = err.response.data;
    });
  return activatePlansSelected;
}

export async function adminDownloadUserList() {
  let activatePlansSelected = {};
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/user_info_download`)
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
export async function getQuestionAnswersStatus(userId) {
  let questionAnswers = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/completeQna/${userId}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        questionAnswers = response.data;
      }
    })
    .catch((err) => console.log('get Question and Answers list error', err));
  return questionAnswers;
}
export async function getQuestionAnswersList(userId) {
  let questionAnswers = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/qnaDetails/${userId}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        questionAnswers = response.data.data;
      }
    })
    .catch((err) => console.log('get qnaDetails and Answers list error', err));
  return questionAnswers;
}
