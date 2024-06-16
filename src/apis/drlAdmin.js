import axios from 'axios';

/* eslint-disable comma-dangle */
export async function addCategoryData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('CreateCategory Error', err);
    });
  return data;
}

export async function UpdateCategoryData(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('UpdateCategory Error', err);
    });
  return data;
}

export async function DeleteCategoryData(id) {
  let data;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlCategory/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('ClearCategory Error', err);
    });
  return data;
}

export async function getAllCategoryData() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlCategory`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get AllCategory Error', err);
    });
  return data;
}

export async function getSubCategoryById(id) {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlSubCategoryById/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get SubCategoryById Error', err);
    });
  return data;
}
export async function addSubCategoryData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlSubCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('CreateSubCategory Error', err);
    });
  return data;
}
export async function UpdateSubCategoryData(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlSubCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('UpdateSubCategory Error', err);
    });
  return data;
}
export async function DeleteSubCategoryData(id) {
  let data;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlSubCategory/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('ClearSubCategory Error', err);
    });
  return data;
}
export async function getAllSubCategoryData() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlSubCategory`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get AllSubCategory Error', err);
    });
  return data;
}
export async function getRecommendations(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlRecommendationPage`,
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

export async function addRecommendation(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlRecommendation`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('addRecommendation Error', err);
    });
  return data;
}
export async function deleteRecommendation(id) {
  let data;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlRecommendation/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('deleteRecommendations Error', err);
    });
  return data;
}
export async function updateRecommendation(formData) {
  let data;
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/drlRecommendation`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('updateRecommendation Error', err);
    });
  return data;
}

export async function getDropdownDocumentTypes() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/documents/types`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get AllSubCategory Error', err);
    });
  return data;
}