/**
 * @author SwathiDivya Bhavaraju
 * @email SwathiDivya.Bhavaraju@ul.com
 * @create date 2019-08-08 14:45:11
 * @modify date 2019-08-08 14:45:11
 * @desc [description]
 */
import axios from 'axios';

/**
 * regulatoryheadlines get api
 *  is to get all the regualtory headlines */
/* eslint-disable comma-dangle */
export async function getRegulatoryHeadlines() {
  let result;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/opusheadlines/metadata`;
  await axios
    .get(url)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('get regulatoryheadlines java api error', err);
    });
  return result;
}

/**
 * regulatoryheadlines post api
 *  is to add new regualtory headlines */
export async function addHeadline(formData) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/opusheadlines/metadata`;
  let result;
  await axios
    .post(url, formData)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('add regulatoryheadlines java api error', err);
    });
  return result;
}

/**
 * regulatoryheadlines delete api
 * is to soft delete the regualtory headline */
export async function deleteHeadline(id, userId) {
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/opusheadlines/metadata/${id}/${userId}`;
  let result;
  await axios
    .delete(url)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('delete regulatoryheadlines java api error', err);
    });
  return result;
}

export async function getTopResourcesList() {
  let resourcesList;
  const url = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}/icons/top-resources.json`;
  await axios
    .get(url)
    .then((response) => {
      resourcesList = response.data;
    })
    .catch((err) => {
      console.log('get top resources list java api error', err);
    });
  return resourcesList;
}

export async function addNewProject(projectDetails) {
  let newProjectResponse;
  const url = `${import.meta.env.VITE_VUE_APP_RS_URL}/api/addproject`;
  await axios
    .post(url, projectDetails)
    .then((response) => {
      newProjectResponse = response;
    })
    .catch((err) => {
      console.log('post project details  php api error', err);
    });
  return newProjectResponse;
}

export default async function getServicesList() {
  let data;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/service/info`;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Opus tools Error', err);
    });
  return data;
}
/**
 * opus_tour get api
 * is to get is new user or not to show the tour popup */
export async function getOpusTour(userId) {
  let result;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/opus_tour${userId}`;
  await axios
    .get(url)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('get opus tour JAVA api error', err); // eslint-disable-line no-console
    });
  return result;
}

/**
 * opus_tour put api
 * is to update that user has seen or skipped the tour to db */
export async function updateOpusTour(data) {
  let result;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/opus_tour`;
  await axios
    .put(url, data)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('put opus tour python api error', err); // eslint-disable-line no-console
    });
  return result;
}

export async function getPricingData(toolName, userId) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/toolsNotificationDetails?toolName=${toolName}&userId=${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus tools Error', err);
    });
  return data;
}
export async function getPricingCounter(userId) {
  let data;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/dashboard/toolsNotificationCount/${userId}`;
  await axios
    .put(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus tools count Error', err);
    });
  return data;
}
export async function getHfeInsightByUser(id) {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/user/hfeInsight/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Java Get HFE Insights Error', err);
    });
  return data;
}
export async function getHfeUserData() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/user/hfeInsight`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Java Get HFE Insights Error', err);
    });
  return data;
}
