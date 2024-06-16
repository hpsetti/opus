import axios from 'axios';

/**
 * plans get api
 * to get all the plans for premium services */
export async function getPlans() {
  let plans = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan`)
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
        localStorage.setItem('plans', JSON.stringify(plans));
      }
    })
    .catch((err) => {
      console.log('get plans java api error', err);
    });
  return plans;
}

/**
 * plans to display for serviceId get api
 * to get all the plans for premium services */
export async function getDisplayPlans(serviceId) {
  let plans = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/service/${serviceId}`)
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get plans to display java api error', err);
    });
  return plans;
}

export async function getUtilization(addOnId, accountId) {
  let plans = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/addon/utilization/${addOnId}/${accountId}`
    )
    .then((response) => {
      if (response.data) {
        plans = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get addon utilization java api error', err);
    });
  return plans;
}

export async function getPlanServiceMapping() {
  let planmapping = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/service/mapping`)
    .then((response) => {
      if (response.data) {
        planmapping = response.data.data;
        localStorage.setItem('planmapping', JSON.stringify(planmapping));
      }
    })
    .catch((err) => {
      console.log('get planmapping java api error', err);
    });
  return planmapping;
}

export async function getAccountAddons() {
  let accountaddons = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/addon/account`)
    .then((response) => {
      if (response.data) {
        accountaddons = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get accountaddons java api error', err);
    });
  return accountaddons;
}

export async function getAddonDetails(accountId) {
  let addons = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/addon/account/${accountId}`)
    .then((response) => {
      if (response.data) {
        addons = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get addons java api error', err);
    });
  return addons;
}

export async function getPlanAddons(planId) {
  let addons = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/addon/plan/${planId}`)
    .then((response) => {
      if (response.data) {
        addons = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get addons java api error', err);
    });
  return addons;
}

export async function getPaymentModes() {
  let paymentModes = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/payment/modes`)
    .then((response) => {
      if (response.data) {
        paymentModes = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get paymentModes java api error', err);
    });
  return paymentModes;
}

export async function postPlan(data) {
  let plan = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/plan/add`, data)
    .then((response) => {
      if (response.data) {
        plan = response.data;
      }
    })
    .catch((err) => {
      console.log('post plan java api error', err);
    });
  return plan;
}

export async function getBillingInfo() {
  let billingInfo = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info`)
    .then((response) => {
      if (response.data) {
        billingInfo = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get billingInfo java api error', err);
    });
  return billingInfo;
}

export async function postBillingInfo(data) {
  let billingInfo = [];
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info`, data)
    .then((response) => {
      if (response.data) {
        billingInfo = response.data;
      }
    })
    .catch((err) => {
      console.log('post billingInfo java api error', err);
    });
  return billingInfo;
}

export async function updateBillingInfo(data) {
  let billingInfo = [];
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/billing/info`, data)
    .then((response) => {
      if (response.data) {
        billingInfo = response.data;
      }
    })
    .catch((err) => {
      console.log('post billingInfo java api error', err);
    });
  return billingInfo;
}

export async function upgradeAccountAddon(data) {
  let upgrade = {};
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/addon/account`, data)
    .then((response) => {
      if (response.data) {
        upgrade = response.data;
      }
    })
    .catch((err) => {
      console.log('put upgrade java api error', err);
    });
  return upgrade;
}
