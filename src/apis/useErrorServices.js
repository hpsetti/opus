import axios from 'axios';

export default async function getUseErrorContentDta() {
  let data;
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/useErrorWizard/useErrorWizardDetails`
    )

    .then((response) => {
      if (response.status === 200 && response.data) {
        data = response.data;
      }
    })

    .catch((err) => {
      console.log('Opus Use Error json Error', err);
    });
  return data;
}

// uncomment below for testing
// export default async function getUseErrorContentDta() {
//   let data;
//   await axios
//     .get(`/static/json/UseErrorWizard/use-error-content.json`)

//     .then((response) => {
//       if (response.status === 200 && response.data) {
//         data = response.data;
//       }
//     })

//     .catch((err) => {
//       console.log('Opus Use Error json Error', err);
//     });
//   return data;
// }
