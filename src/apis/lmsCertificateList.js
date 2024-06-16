import axios from 'axios';

export default async function getCertificateList() {
  let data;
  const url = `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/launchpad/admin/certificateUsers`;
  await axios
    .get(url)
    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })
    .catch((err) => {
      console.log('Opus tools Error', err);
    });
  return data;
}
