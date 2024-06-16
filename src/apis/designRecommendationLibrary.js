import axios from 'axios';

export async function getDesignLibraryData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/drl/drlRecommendation`, formData)
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
export async function getdrlFilters() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/drl/filters`)
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
export async function getToolsPurchaseData(userId) {
  let result = [];
  const params = {
    userId
  };
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/Tool/marketPlaceToolsItems`, {
      params
    })
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Purchase list Java error', err);
    });
  return result;
}
export async function getPopularSearch() {
  let result = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/drl/drlSubCategory`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Popular search list Java error', err);
    });
  return result;
}

export async function drlRecommendationBySearch(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/drl/drlRecommendationBySearch`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get getRecommendations Error', err);
    });
  return data;
}