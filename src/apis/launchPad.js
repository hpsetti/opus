/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2020-03-23 15:07:41
 * @modify date 2020-03-23 15:07:41
 * @desc [description]
 */
import axios from 'axios';

export default async function getActivityTrackerData() {
  let data = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/activity/tracker/count`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('launchpad activity tracker /count api error', err);
    });
  return data;
}
