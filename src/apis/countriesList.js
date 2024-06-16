/**
 * @author SwathiDivya Bhavaraju
 * @email SwathiDivya.Bhavaraju@ul.com
 * @create date 2019-07-26 10:17:56
 * @modify date 2019-07-26 10:17:56
 * @desc [description]
 */
import axios from 'axios';

/**
 * getCountriesList get api
 * to get the countries list for regs and guidance page */
export async function getCountriesList() {
  let countries = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/reg/guide/countries`)
    .then((response) => {
      if (response.data.data) {
        countries = response.data.data;
      }
    })
    .catch((err) => console.log('get countries java api error', err));
  return countries;
}
/**
 * getCountryList get api
 * to get the all the countries list */
export async function getAllCountries() {
  let countries = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/country_info`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        countries = response.data;
        localStorage.setItem('countryList', JSON.stringify(countries));
      }
    })
    .catch((err) => console.log('get country python api error', err));
  return countries;
}
