import axios from 'axios';

export async function getKPAToolOptions() {
  let data;
  await axios
    .get('/static/json/KPA/KnownProblemAnalysis.json')
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus KPA Tool Options Error', err);
    });
  return data;
}
export async function getKPAToolDataWithCode(payload, reportOption) {
  let data;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/kpa/device/events?reportOption=${reportOption}`, payload)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus KPA Tool Options Error', err);
    });
  return data;
}
