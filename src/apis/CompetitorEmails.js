import axios from 'axios';

export default async function getCompetitorEmails() {
  let data;
  await axios
    .get('/static/json/competitor-emails.json')
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
