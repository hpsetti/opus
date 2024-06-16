// This file consists of static data for OPUS tools page, URL: /tools

import axios from 'axios';

export default async function getToolsDta() {
  let data;
  await axios
    .get('/static/json/opus-tools.json')
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
