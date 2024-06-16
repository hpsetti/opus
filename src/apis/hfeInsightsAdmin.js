import axios from 'axios';

/* eslint-disable comma-dangle */
export async function getHfeData() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/hfeInsight`)
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
export async function addHfe(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/hfeInsight`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java Post add HFE Insight Error', err);
    });
  return data;
}
export async function updateHfeViewingOrder(formData) {
  let data = {
    hfe_insight_list: formData
  };
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/hfeInsight`, data)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java put add HFE Insight viewing order Error', err);
    });
  return data;
}
export async function deleteHfe(id) {
  let data = {
    ids: id
  };
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/hfeInsight`, {
      data
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java Delete HFE Insight Error', err);
    });
  return data;
}

export async function updateHfe(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/hfeInsight`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java Update HFE Insight Error', err);
    });
  return data;
}
