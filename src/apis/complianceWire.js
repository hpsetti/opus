import axios from 'axios';

/* eslint-disable comma-dangle */
export async function getMarketplaceComplianceWire(id) {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/complianceWireTraining/courseList?userId=${id}`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get marketplace subscriptions api error', err);
    });
  return result;
}

export async function getComplianceWireDetails(planId, userId) {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/complianceWireTraining/courseList?planId=${planId}&userId=${userId}`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get marketplace subscriptions api error', err);
    });
  return result;
}

export async function addToBookmark(courseId) {
  let data = {};
  const params = {
    courseId,
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/complianceWireTraining/bookmark`, {
      params,
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((error) => {
      data = error.response.data;
      console.log('ILT Latest Activity Api error', error);
    });
  return data;
}
