import axios from 'axios';

export default async function askUsHFE(formData) {
  let token;
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/user/addHfeQuestion`, formData)
    .then((response) => {
      token = response.data;
    })
    .catch((err) => {
      console.log('askUsHFE java api error', err);
    });
  return token;
}
