import axios from 'axios';

export async function isDashboardCustomizable(accountId, roleId) {
  let isCustomizable = false;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/available?accountId=${accountId}&roleId=${roleId}`
    )
    .then((response) => {
      if (response.data.data) {
        isCustomizable = response.data.data;
      }
    })
    .catch((err) => {
      console.log('is Dashboard customization available api error', err);
    });
  return isCustomizable;
}

export async function getPanelInfo() {
  let panelInfo = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/panel/info`
    )
    .then((response) => {
      if (response.data) {
        panelInfo = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get panel info api error', err);
    });
  return panelInfo;
}

export async function getCardTypeInfo() {
  let cardInfo = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/panel/card/type/info`
    )
    .then((response) => {
      if (response.data) {
        cardInfo = response.data.data;
      }
    })
    .catch((err) => {
      console.log('getCardTypeInfo api error', err);
    });
  return cardInfo;
}

export async function getPanelCardWidgetInfo() {
  let cardWidgetInfo = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/panel/card/widget/info`
    )
    .then((response) => {
      if (response.data) {
        cardWidgetInfo = response.data.data;
      }
    })
    .catch((err) => {
      console.log('getPanelCardWidgetInfo api error', err);
    });
  return cardWidgetInfo;
}

export async function getWidgetListForAccount(accountId, roleId) {
  let widgetList = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/panel/widget/info?accountId=${accountId}&roleId=${roleId}`
    )
    .then((response) => {
      if (response.data) {
        widgetList = response.data.data;
      }
    })
    .catch((err) => {
      console.log('getWidgetListForAccount api error', err);
    });
  return widgetList;
}

export async function postUserPreferences(formData) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/user/preferences`;
  let result;
  await axios
    .post(url, formData)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('post userPreferences java api error', err);
    });
  return result;
}

export async function isDefaultDashboard(accountId, userId) {
  let isDefault = false;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/default?accountId=${accountId}&userId=${userId}`
    )
    .then((response) => {
      if (response.data.data) {
        isDefault = response.data.data;
      }
    })
    .catch((err) => {
      console.log('isDefaultDashboard api error', err);
    });
  return isDefault;
}

export async function getUserDashboardPreference(accountId, userId) {
  let preferences = null;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/user/preferences?accountId=${accountId}&userId=${userId}`
    )
    .then((response) => {
      if (response.data.data) {
        preferences = response.data.data;
      }
    })
    .catch((err) => {
      console.log('getUserDashboardPreference api error', err);
    });
  return preferences;
}

export async function putUserPreferences(formData) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/user/preferences`;
  let result;
  await axios
    .put(url, formData)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('put userPreferences java api error', err);
    });
  return result;
}

export async function setDefaultPreference(formData) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/default`;
  let result;
  await axios
    .put(url, formData)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('put defaultPreferences java api error', err);
    });
  return result;
}

export async function displayNotification(accountId, userId) {
  let preferences = null;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/notification/available?accountId=${accountId}&userId=${userId}`
    )
    .then((response) => {
      if (response.data.data) {
        preferences = response.data.data;
      }
    })
    .catch((err) => {
      console.log('displayNotification api error', err);
    });
  return preferences;
}

export async function getNotificationTypes() {
  let notifications = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/customization/notification/type`
    )
    .then((response) => {
      if (response.data) {
        notifications = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get panel info api error', err);
    });
  return notifications;
}
