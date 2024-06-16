import axios from 'axios';

export async function getDocumentLibraryTypes() {
  let libraryTypes = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/library/types`)
    .then((response) => {
      if (response.data.data) {
        libraryTypes = response.data.data;
      }
    })
    .catch((err) => console.log('get document librray types error', err));
  return libraryTypes;
}

export async function getSasToken(formData) {
  let token;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/sastoken/genratetoken`, formData)
    .then((response) => {
      token = response.data;
    })
    .catch((err) => {
      console.log('genratetoken java api error', err);
    });
  return token;
}

export async function getPurchasedDocuments(userId) {
  let purchaseDocumentsList = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/purchasedBy/user/${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        purchaseDocumentsList = response.data.data;
      }
    })
    .catch((err) => console.log('get purchase documents list error', err));
  return purchaseDocumentsList;
}

export async function getAvailableDocumentsList(userId) {
  let availableDocumentsList = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/available/user/${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        availableDocumentsList = response.data.data;
      }
    })
    .catch((err) => console.log('get available documents list error', err));
  return availableDocumentsList;
}

export async function getQuestionAnswersDetails(userId) {
  let questionAnswers = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/qnaDetails/${userId}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        questionAnswers = response.data.data;
      }
    })
    .catch((err) => console.log('get Question and Answers list error', err));
  return questionAnswers;
}

export async function getDocumentsListByType(userId, documentTypeId) {
  let documentsList = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/user/${userId}/type/${documentTypeId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        documentsList = response.data.data;
      }
    })
    .catch((err) => console.log('get documents list by type error', err));
  return documentsList;
}

export async function getDocumentsMappingList() {
  let documentsList = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/bundle/mapping`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        documentsList = response.data.data;
      }
    })
    .catch((err) => console.log('get documents list by type error', err));
  return documentsList;
}

export async function getUnparchasedTemplatesForBundles(userId) {
  let documentsList = [];
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/documents/remaining/templates/bundle/user/${userId}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        documentsList = response.data.data;
      }
    })
    .catch((err) => console.log('get unpurchased templates list error', err));
  return documentsList;
}

/**
 * admin/documents get api
 * to get the all documents list for Admin */
export async function getAdminDocs() {
  let documentsList = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/documents`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        documentsList = response.data.data;
      }
    })
    .catch((err) => console.log('get all documents list error', err));
  return documentsList;
}

export async function updateAdminDoc(formData) {
  let data;
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/documents/${formData.document_id}`,
      formData,
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('updateAdminDoc Error', err);
    });
  return data;
}

export async function getDocumentDetailsById(id) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/documents/${id}`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('updateAdminDoc Error', err);
    });
  return data;
}

/**
 * Delete Documents(single) */
export async function deleteDocument(documentId) {
  let result = {};
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/documents/${documentId}`)
    .then((response) => {
      if (response && response.data.status_code === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('Delete document java api error', err);
    });
  return result;
}

export async function addDocumentLibraryType(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/library/types`, formData)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('Add Document Library type java api error', err);
    });
  return data;
}

export async function getDocumentLibraryTypeData(id) {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/library/types/${id}`
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('Get Document Library Type Data Error', err);
    });
  return data;
}

export async function updateDocumentLibraryType(formData) {
  let data;
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/library`,
      formData,
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('update Document Library Type Error', err);
    });
  return data;
}

export async function addDocumentData(formData) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/addDocuments`, formData)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      data = err.response.data;
      console.log('Add Document Library type java api error', err);
    });
  return data;
}
export async function updateDocument(data) {
  let result = {};
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/updateDocument`,
      data
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('put preferences user java api error', err);
    });
  return result;
}