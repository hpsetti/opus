import axios from 'axios';

/**
 * services get api
 * to get all the plans related premium services */
export async function getPlans() {
  let plans = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan`)
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get plans java api error', err);
    });
  return plans;
}

// get subscribed plans based on account id
export async function getSubscribedPlans(accountId) {
  let plans = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/account/${accountId}`)
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get plans java api error', err);
    });
  return plans;
}

// get plan price
export async function getPlanPrice(planId, accountId) {
  let plans;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/price/${planId}/${accountId}`
    )
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get plan price java api error', err);
    });
  return plans;
}

// service plan mapping
export async function getMapping() {
  let plans = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/service/mapping`)
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
        localStorage.setItem('mappingServices', JSON.stringify(plans));
      }
    })
    .catch((err) => {
      console.log('get plans mapping java api error', err);
    });
  return plans;
}

// service plan mapping
export async function getActivePlansList(accountId) {
  let plans = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/summary/account/${accountId}`
    )
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get plans java api error', err);
    });
  return plans;
}
