import axios from 'axios';

export async function addCategoryData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/CreateCategory`, formData)
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
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/UpdateCategory`, formData)
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
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/ClearCategory/${id}`)
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
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/AllCategory`)
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
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/SubCategoryById/${id}`)
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
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/CreateSubCategory`,
      formData
    )
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
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/UpdateSubCategory`,
      formData
    )
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
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/ClearSubCategory/${id}`)
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
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/AllSubCategory`)
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
export async function getRootCauseData() {
  let data;
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/AllRootCauseTitle`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Get AllRootCauseTitle Error', err);
    });
  return data;
}

export async function addRcatitleData(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/CreateRootCauseTitle`,
      formData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('CreateRootCauseTitle Error', err);
    });
  return data;
}
export async function DeleteRcaData(id) {
  let data;
  await axios
    .delete(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/ClearRootCauseTitle/${id}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('ClearRootCauseTitle Error', err);
    });
  return data;
}
export async function UpdateRootCauseTitle(formData) {
  let data;
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/UpdateRootCauseTitle`,
      formData
    )
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

export async function getRootCauseTitleData(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/RootCauseTitlePage`,
      formData
    )
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
