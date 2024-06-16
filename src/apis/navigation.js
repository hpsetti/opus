/**
 * @author Hemanth Alluddla
 * @create date 2020-07-128
 * @desc [description]
 */

import $ from 'jquery';

export default async function getNavigationList(token) {
  let navigationList = {};
  await new Promise((resolve) => {
    // eslint-disable-line no-return-await
    $.ajax({
      url: `${import.meta.env.VITE_VUE_APP_RS_URL}/dashboard/navigation`,
      xhrFields: {
        withCredentials: true
      },
      type: 'POST',
      async: true,
      data: {
        token,
        serviceType: 'smartExchange'
      },
      error(data) {
        console.log('Navigation api error', data);
        resolve(false);
      },
      success(res) {
        resolve(res);
        navigationList = res;
      }
    });
  });
  return navigationList;
}
