import axios from 'axios';

export default async function getCertificate(userId) {
  let data;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/lmsController/trainingCertificateDetails/${userId}`;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus training certificate error', err);
    });
  return data;
}
