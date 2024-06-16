/**
 * @author SwathiDivya Bhavaraju
 * @email swathidivya.bhavaraju@ul.com
 * @create date 2020-09-16 16:55:10
 * @modify date 2020-09-16 16:55:10
 * @desc [description]
 */
import axios from 'axios';
/**
 * getUserPermissions get api
 * to get the permissions based on user/team member */
export async function getUserPermissions(userId, accountId, roleId) {
  let result = '';
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/permissions/${userId}/${accountId}/${roleId}`
    )
    .then((response) => {
      if (response.status === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('permissions template based on role java api error', err);
    });
  return result;
}
/**
 * updateUserPermissions put api
 * to update the user/team permissions */
export async function updateUserPermissions(data, roleId) {
  let result = '';
  await axios
    .put(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/permissions/${data.user_id}/${data.account_id}/${roleId}`,
      data
    )
    .then((response) => {
      if (response.status === 200) {
        result = response.data;
      }
    })
    .catch((err) => {
      console.log('permissions template based on role java api error', err);
    });
  return result;
}
/**
 * getRoleBasedPermissions get api
 * to get the default permissions based on role */
export async function getRoleBasedPermissions(roleId) {
  let result = '';
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/permissions/template/${roleId}`
    )
    .then((response) => {
      if (response.status === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('permissions template based on role java api error', err);
    });
  return result;
}
/**
 * /rbac/permissionss get API
 * to get the permissions based on userId,accountId,roleId */
export async function getPermissionsData() {
  let data = {};
  const userId = JSON.parse(localStorage.getItem('userId'));
  const roleId = JSON.parse(localStorage.getItem('roleId'));
  const accountId = JSON.parse(localStorage.getItem('accountId'));
  await axios
    .get(
      `${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/permissions/${userId}/${accountId}/${roleId}`
    )
    .then((response) => {
      data = response.data.data.services;
    })
    .catch((err) => {
      console.log('/rbac/permissions get java api error', err);
    });
  return data;
}

/**
 * getListOfRoleNames get api
 * to Get List of all roles, id and name. */
export async function getListOfRoleNames() {
  let result = '';
  await axios
    .get(`${import.meta.env.VITE_VUE_APP_JAVA_API_URL}/rbac/roleInfo`)
    .then((response) => {
      if (response.status === 200) {
        result = response.data.data;
      }
    })
    .catch((err) => {
      console.log('getListOfRoleNames java api error', err); // eslint-disable-line no-console
    });
  return result;
}
