import axios from 'axios';

/**
 * Notifications to be displayed in /notifications page and on dashboard
 */

/* eslint-disable comma-dangle */

/**
 * Get all notifications of an user
 * @param {String} userId
 * @returns {Array<Notification} List of notifications
 */
export async function getNotifications(userId) {
  let notificationsList = [];
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userNotifications/list/${userId}`;
  await axios
    .get(url)
    .then((response) => {
      notificationsList = response.data.data;
    })
    .catch((err) => {
      console.log('get notifications list java api error', err);
    });
  return notificationsList;
}

/**
 * Get the list of notifications to be displayed on dashboard for an user
 *
 * @param {String} userId
 * @returns {Array<Notification>} Dashboard Notifications
 */
export async function getDashboardNotifications(userId) {
  let notificationsList = [];
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userNotifications/dashBoardList/${userId}`;
  await axios
    .get(url)
    .then((response) => {
      notificationsList = response.data.data;
    })
    .catch((err) => {
      console.log('get dashboard notifications list java api error', err);
    });
  return notificationsList;
}

/**
 * Delete all notifications of an user
 * @param {String} userId
 * @returns {Status} Status Object
 */
export async function dismissAllNotifications(userId) {
  let response;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userNotifications/list/${userId}`;
  await axios
    .delete(url)
    .then((resp) => {
      response = resp.data;
    })
    .catch((err) => {
      console.log('dismiss all notifications java api error', err);
    });
  return response;
}

/**
 * Dismiss notification of an user having an id
 * @param {String} userId - User ID
 * @param {String} id - Notification ID
 * @returns {Status} Status Object
 */
export async function dismissNotification(userId, id) {
  let response;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userNotifications/list/${userId}/${id}`;
  await axios
    .delete(url)
    .then((resp) => {
      response = resp.data;
    })
    .catch((err) => {
      console.log('dismiss notification java api error', err);
    });
  return response;
}

/**
 * Get notification count of an user having an id for showing count in sidebar
 * @param {String} userId - User ID
 * @returns {Status} Status Object
 */

export async function getAllNotificationCount(userId) {
  let notificationsList = [];
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userNotifications/count/${userId}`;
  await axios
    .get(url)
    .then((response) => {
      notificationsList = response.data.data;
    })
    .catch((err) => {
      console.log('get notifications count java api error', err);
    });
  return notificationsList;
}
