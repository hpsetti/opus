import axios from 'axios'; 
 
 export async function getCountryConsentType(countryId) {
   let res = {};
   await axios
     .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/cosent/type/${countryId}`)
     .then((response) => {
       if (response.status === 200 && response.data) {
         res = response.data.data;
       }
     })
     .catch((err) => console.log('get user consent java api error', err)); // eslint-disable-line no-console
   return res;
 }

 export async function getSurvey() {
  let res = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userSurvey/user`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        res = response.data.data;
      }
    })
    .catch((err) => console.log('get survey java api error', err)); // eslint-disable-line no-console
  return res;
}
 
 export async function getCountryConsent(consentId) {
   let res = {};
   await axios
     .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/cosent`, consentId)
     .then((response) => {
       if (response.status === 200 && response.data) {
         res = response.data.data;
       }
     })
     .catch((err) => console.log('get user consent java api error', err)); // eslint-disable-line no-console
   return res;
 }
 export async function updateSurveyConsent(payload) {
  const surveyResponse = payload[0];
  const surveyItemIds = payload[1];
   let responseFlag = null;
   await axios
     .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userSurvey/${surveyResponse}`, surveyItemIds)
     .then((response) => {
       if (response.status === 200 && response.data) {
         responseFlag = response.data;
       }
     })
     .catch((err) => console.log('put user survey consent java api error', err)); // eslint-disable-line no-console
   return responseFlag;
 }
 export async function updateConsent(payload) {
  let responseFlag = null;
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/update`, payload)
    .then((response) => {
      if (response.status === 200 && response.data) {
        responseFlag = response.data;
      }
    })
    .catch((err) => console.log('put user consent java api error', err)); // eslint-disable-line no-console
  return responseFlag;
}