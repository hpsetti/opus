import axios from 'axios';

/* eslint-disable comma-dangle */
export async function getBlockedEmails() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/blockOpusEmail`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Java Get Blocked Emails Error', err);
    });
  return data;
}
export async function addCompetitorMails(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/blockOpusEmail`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      data = err.response.data;
      console.log('Java Post add HFE Insight Error', err);
    });
  return data;
}
export async function updateCompetitorMails(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/blockOpusEmail`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java Update blocked Emails Error', err);
      data = err.response.data;
    });
  return data;
}

export async function deleteCompetitorMails(id) {
  let data = [];
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/blockOpusEmail/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Java Delete blocked Emails Error', err);
    });
  return data;
}
