import axios from 'axios';
import $ from 'jquery';

export default async function postMarketoFormData(formData) {
  // Do not trigger events other than in production
  if (import.meta.env.VITE_NODE_ENV !== 'production') return null;
  // if (import.meta.env.VITE_NODE_ENV === 'production') return null;
  const pFormId = formData.form_control === 'Contact' ? 3538 : 3537;
  const data = {
    form_id: pFormId,
    input: [
      {
        lead_form_fields: formData,
        visitor_data: {
          page_url: window.location.href,
          lead_client_ip_address: '',
          user_agent_string: ''
        },
        cookie: ''
      }
    ]
  };
  let returnData = '';

  await $.getJSON(await 'https://api.ipify.org?format=json', (response) => {
    data.input[0].visitor_data.lead_client_ip_address = response.ip;
  });

  let browser;
  if (
    (window.navigator.userAgent.indexOf('Opera') ||
      window.navigator.userAgent.indexOf('OPR')) !== -1
  ) {
    browser = 'Opera';
  } else if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
    browser = 'Chrome';
  } else if (window.navigator.userAgent.indexOf('Safari') !== -1) {
    browser = 'Safari';
  } else if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
    browser = 'Firefox';
  } else if (window.navigator.userAgent.indexOf('Edg') !== -1) {
    browser = 'Firefox';
  } else {
    browser = 'Unknown';
  }
  data.input[0].visitor_data.user_agent_string = browser;
  // Call readCookie function to get value of user's Marketo cookie
  const cookiename = '_mkto_trk=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(cookiename) === 0)
      data.input[0].cookie = c.substring(cookiename.length, c.length);
  }
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/marketo/submit/form`, data)
    .then((response) => {
      returnData = response.data;
    })
    .catch((err) => {
      console.log('post marketo data java api error', err); // eslint-disable-line no-console
    });
  return returnData;
}
