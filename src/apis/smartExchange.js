/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-09-26 11:55:09
 * @modify date 2020-09-26 11:55:09
 * @desc [description]
 */

import $ from 'jquery';

// Need to remove here ansd in hooks as well

export default async function checkSmartExchangeProjects(token) {
  return new Promise((resolve) => {
    // eslint-disable-line no-return-await
    $.ajax({
      url: `${import.meta.env.VITE_VUE_APP_RS_URL}/api/login`,
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      async: true,
      data: {
        nextUrl: '/dashboard/api/smartexchange',
        token,
        serviceType: 'smartExchange'
      },
      error(data) {
        console.log('smartExchange api error', data);
        resolve(false);
      },
      success(res) {
        resolve(res.data);
      }
    });
  });
}
