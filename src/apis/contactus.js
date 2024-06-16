/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2020-12-26 09:21:03
 * @modify date 2020-12-26 09:21:03
 * @desc api services page
 */
import axios from 'axios';

/**
 * Post contact us */
export default async function addContactUs(formData) {
  let result = false;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/user/contactus`, formData)
    .then((response) => {
      if (
        response &&
        response.data.status_code === 200 &&
        response.data.message === 'success'
      ) {
        result = true;
      }
    })
    .catch((err) => {
      console.log('contact us java api error', err);
    });
  return result;
}
