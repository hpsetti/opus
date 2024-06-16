/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2020-02-26 15:07:41
 * @modify date 2020-02-26 15:07:41
 * @desc [description]
 */
import axios from 'axios';

/**
 * update team member put api
 * to update Team Member role and permissions */
export async function updateTeamMember(data) {
  let result = '';
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/team_member`, data)
    .then((response) => {
      if (response.status === 200 && response.data) result = response.data;
    })
    .catch((err) => {
      console.log('set team_member python api error', err);
    });
  return result;
}
/**
 * removeTeamMember delete api
 * to delete Team Member */
export async function removeTeamMember(formData) {
  let data = '';
  await axios
    .delete(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/team_member`, {
      data: formData
    })
    .then(() => {
      data = {
        status: true
      };
    })
    .catch((err) => {
      data = {
        status: false
      };
      console.log('remove team member python api error', err);
    });
  return data;
}
/**
 * getTeamMembers get api
 * to get Team Members list */
export async function getTeamMembers(typeId) {
  let result = [];
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/team_member/${typeId}`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('get team_member python api error', err);
    });
  return result;
}
/**
 * addTeamMember post api
 * to add new Team Member */
export async function addTeamMember(data) {
  let result = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/team_member`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('add team member python api error', err);
    });
  return result;
}

/**
 * Team Member restriction post api
 * to check the team member has to be restricted or not */
export async function getTeamMemberRestriction(data) {
  let result = '';
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/team_member_restriction`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('post team_member_restriction Java api error', err); // eslint-disable-line no-console
    });
  return result;
}
/**
 *
 * @returns List of user account details with referral counts
 */
export async function getReferTeamMember() {
  let result = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/referTeamMemberDetails`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get refer team members java api error', err);
    });
  return result;
}
/**
 * @summary Get consent details of the logged in user
 * @returns consent for email preferences of an user
 */
export async function getConsent() {
  let result = {};
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/user`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get consent for user api error', err);
    });
  return result;
}

/**
 * @summary Update consent details of the logged in user
 * @returns consent for email preferences of an user
 */
export async function updateConsent(consent) {
  let result = {};
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/user/${consent}`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('update consent for user api error', err);
    });
  return result;
}

/**
 *
 * @returns {Object}
 */
export async function getUserConsentCountries() {
  let result = {};
  await axios
    .get('/static/json/userconsent-countries.json')
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('unable to get countries list for consent', err);
    });
  return result;
}

/**
 *
 * @returns {Array} List of hfe users
 */
export async function getHFEUsers(data) {
  let result = {};
  await axios
    .post(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/admin/user_info`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('unable to get hfe users list', err);
    });
  return result;
}

/**
 * China consent check post api
 * to check the team member has to be restricted or not */
 export async function postChinaValidity(data) {
   let result = '';
  await axios
    .put(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/chinaConsent`, data)
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('post China Validity Java api error', err); // eslint-disable-line no-console
    });
  return result;
}
/**
 *
 * @returns China consent check
 */
export async function getChinaValidity() {
  let result = '';
  const userId = JSON.parse(localStorage.getItem('userId'));
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/userConsent/chinaConsent?userId=${userId}`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('get china validity java api error', err);
    });
  return result;
}
