import axios from 'axios';

export async function getProjectTypes() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/projectDetails`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get list of project types java error', err);
    });
  return data;
}

export async function getConsultingTypes() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/consultingTypeList`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get list of project types java error', err);
    });
  return data;
}

export async function getProjectListByType(type) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/consultingList?ConsultingType=${type}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get list of project types java error', err);
    });
  return data;
}

export async function getRecentProjects() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/requestQuoteList`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get list of project types java error', err);
    });
  return data;
}

export async function projectsByConsultantType(ConsultantType) {
  let newProjectResponse;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/requestQuoteListByPage`;
  await axios
    .post(url, ConsultantType)
    .then((response) => {
      newProjectResponse = response.data.data;
    })
    .catch((err) => {
      console.log('Post project list by consulting type java error', err);
    });
  return newProjectResponse;
}
export async function getprojectsById(projectId) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/requestQuoteList/${projectId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get list of project types java error', err);
    });
  return data;
}
export async function updateProjectDetails(id, data) {
  let projectDetails = [];
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/updateRequestedQuote/${id}`,
      data
    )
    .then((response) => {
      if (response.data) {
        projectDetails = response.data;
      }
    })
    .catch((err) => {
      console.log('post RequestedQuote java api error', err);
    });
  return projectDetails;
}

export async function deleteProjectById(data) {
  let result;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/removeConsultingByIds`, {
      data
    })
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.log('delete consulting java api error', err);
    });
  return result;
}

export async function getConsultingStatusList() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/consultingStatusList`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get list of project types java error', err);
    });
  return data;
}

export async function updatePurchseStatus(paylod) {
  let data;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/updatePurchaseStatus`;
  await axios
    .post(url, paylod)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('Post project list by consulting type java error', err);
    });
  return data;
}
