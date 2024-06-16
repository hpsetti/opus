/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2020-04-14 09:21:03
 * @modify date 2020-04-14 09:21:03
 * @desc common helper functions page
 */

import axios from 'axios';
import { getCookie } from './common';

/** request interceptor
 * to add authorization token in header of api request
 */
export default function apiRequestInterceptor() {
  axios.interceptors.request.use((config) => {
    const customConfig = config;
    const token = getCookie('Authorization');
    if (
      customConfig.url.search(import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL) === -1 &&
      token
    ) {
      customConfig.headers.Authorization = token;
    }
    return customConfig;
  });
}
