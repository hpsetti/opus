/**
 * @author SwathiDivya Bhavaraju
 * @email SwathiDivya.Bhavaraju@ul.com
 * @create date 2019-08-20 15:05:17
 * @modify date 2019-08-20 15:05:17
 * @desc [description]
 */
import axios from 'axios';

/**
 *  genratetoken post api
 *  for get the token to upload the file to the azure blob storage */
export default async function getSasToken(data) {
  let token = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/sastoken/genratetoken`, data)
    .then((response) => {
      if (
        response.data &&
        response.data.status_code === 200 &&
        response.data.data
      ) {
        token = `?${response.data.data}`;
      }
    })
    .catch((err) => {
      console.log('genratetoken java api error', err);
    });
  return token;
}
