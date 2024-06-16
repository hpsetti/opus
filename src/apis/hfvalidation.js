import axios from 'axios';

export default async function getCalculationData(params) {
  let data = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/hfValidationCalculator`, {
      params
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data.data;
      }
    })
    .catch((err) => {
      console.log('hfValidationCalculator api error', err);
    });
  return data;
}
