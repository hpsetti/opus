/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2019-08-07 09:21:03
 * @modify date 2019-08-07 09:21:03
 * @desc common helper functions page
 */

import axios from 'axios';

/** javaApiResponseInterceptor()
 * to logout if the user is unauthorised
 */
async function javaApiResponseInterceptor(response) {
  if (response && response.status === 401) {
    document.cookie =
      'Authorization=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = `redirect_url = ${window.location.pathname}; path=/;`;
    localStorage.clear();
    window.location.href = '/login';
  }
}
/** response interceptor
 * to perform common operations on all the api responses
 */
export default function apiResponseInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      javaApiResponseInterceptor(error.response);
      return Promise.reject(error);
    }
  );
}
