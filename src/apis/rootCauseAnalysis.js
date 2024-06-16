import axios from 'axios';

export async function getRootCauseData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/rcaTitles`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('rootcauseData Error', err);
    });
  return data;
}
export async function getRootCauseFilters() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/filters`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('rootcauseData Error', err);
    });
  return data;
}
export async function getSelectedRootCause(id) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/rcaRootCauseTitlesById`, id)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('rootcauseData Error', err);
    });
  return data;
}

export async function suggestRootCause(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/suggest`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('rootcauseData Error', err);
    });
  return data;
}

export async function getRcaWriteupPDF() {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/rcaPdfUrl`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('rootcause writeup PDF Error', err);
    });
  return data;
}

export async function getRcaFiltersPDF() {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/rcaLearnAboutFiltersPdfurl`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('rootcause writeup PDF Error', err);
    });
  return data;
}

export async function getSearchRootCause(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rca/rcaTitlesInfoList`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('rootcauseData Error', err);
    });
  return data;
}
