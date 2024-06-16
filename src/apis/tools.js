/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2019-07-26 09:21:03
 * @modify date 2019-07-26 09:21:03
 * @desc api services page
 */
import axios from 'axios';

/**
 * 510k/${category}/values get api
 * to the values based on category */
export async function getSearchCategoryData(category) {
  let dropDownData;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/tools/device/510k/${category}/values`
    )
    .then((response) => {
      dropDownData = response.data;
    })
    .catch((err) => {
      console.log('510k/category/values java api error', err);
    });
  return dropDownData;
}

/**
 * /510k/calculate/results post api
 * to the calculated values for processing time */
export async function getProcessingTime(formData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/tools/device/510k/calculate/results`,
      formData
    )
    .then((response) => {
      data = response.data;
    })
    .catch((err) => {
      console.log('/510k/calculate/results java api error', err);
    });
  return data;
}

/**
 * hfeProjectScopeTool PDF get api
 * View / Download HFE Project Scope Tool PDF */
export async function getScopeToolData(requestData) {
  let responseData;
  let requestURL = '';
  const sasReq = {
    container_name: 'preview',
    permissions: 'read',
    storage_name: 'opus-storage-java'
  };
  if (requestData.market.length === 2) {
    requestURL = `/hfeProjectScopeTool/pdf?market=${requestData.market[0]}&market=${requestData.market[1]}&product_type=${requestData.product_type}&change_type=${requestData.change_type}&duration=${requestData.duration}`;
  } else {
    requestURL = `/hfeProjectScopeTool/pdf?market=${requestData.market[0]}&product_type=${requestData.product_type}&change_type=${requestData.change_type}&duration=${requestData.duration}`;
  }
  await axios
    .all([
      axios.post(
        `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/sastoken/genratetoken`,
        sasReq
      ),
      axios.get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}${requestURL}`)
    ])
    .then(
      axios.spread((sasResponse, response) => {
        if (response.status === 200 && response.data) {
          responseData = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${response.data.data}?${sasResponse.data.data}`;
        }
      })
    )
    .catch((err) => {
      console.log('hfeProjectScopeTool/pdf java api error', err);
    });
  return responseData;
}

/**
 * Fetching standard resolutions in touch target tool
 */
export async function getStandardResolutions() {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/minTouchTargetTool/standardResolutionDetails`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Error while fetching standard resolutions', err);
    });
  return data;
}

/**
 * Fetching standard references in touch target tool
 */
export async function getStandardReferences() {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/minTouchTargetTool/standardResolutionAnalysisDetails`
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Error while fetching standard resolutions', err);
    });
  return data;
}

/**
 * Calculating pixel dimensions from screensize, resolution and standard
 */
export async function calculatePixelDimensions(fotmData) {
  let data;
  await axios
    .post(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/minTouchTargetTool/calculateSize`,
      fotmData
    )
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Error while fetching standard resolutions', err);
    });
  return data;
}

/**
 * Checking if the user has enrolled in Use Error Wizard Tool
 */

export async function getUseErrorWizardData(userId) {
  let data;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/useErrorWizard/userDetails?userId=${userId}`;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('Error while fetching Use Error Wizard Data', err);
    });
  return data;
}
