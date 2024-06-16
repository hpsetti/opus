import axios from 'axios';

/* eslint-disable comma-dangle */
export async function addCategoryData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('CreateCategory Error', err);
      data = err.response.data
    });
  return data;
}

export async function UpdateCategoryData(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('UpdateCategory Error', err);
      data = err.response.data
    });
  return data;
}

export async function DeleteCategoryData(id) {
  let data;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlCategory/${id}`)
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
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlCategory`)
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
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlSubCategoryById/${id}`)
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
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlSubCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('CreateSubCategory Error', err);
      data = err.response.data
    });
  return data;
}
export async function UpdateSubCategoryData(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlSubCategory`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('UpdateSubCategory Error', err);
      data = err.response.data
    });
  return data;
}
export async function DeleteSubCategoryData(id) {
  let data;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlSubCategory/${id}`)
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
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlSubCategory`)
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
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlRequirementPageInfo`,
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

export async function getSearchRecommendations(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/uirl/uirlRequirementPageInfoBySearch`,
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
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlRequirement`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('addRecommendation Error', err);
      data = err.response.data
    });
  return data;
}
export async function deleteRecommendation(id) {
  let data;
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlRequirement/${id}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('delete Requirements Error', err);
    });
  return data;
}
export async function updateRecommendation(formData) {
  let data;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/uirlRequirement`, formData)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('updateRecommendation Error', err);
      data = err.response.data
    });
  return data;
}
