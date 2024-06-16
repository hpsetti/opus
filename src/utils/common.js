/**
 * @author Pawan Sadvale
 * @email Pawan.Sadvale@ul.com
 * @create date 2019-08-07 09:21:03
 * @modify date 2019-08-07 09:21:03
 * @desc common helper functions page
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import getSasToken from '../apis/sasToken';
import upload from '../apis/azureUpload';
import fileDownload from './file-download';
dayjs.extend(utc);


/* eslint-disable comma-dangle */
/** passwordValidation pattern */
// eslint-disable-next-line operator-linebreak
export const PasswordValidation =
  /(^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})|^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$.,+=( )_%^&*])(?=.{10,})|^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$.,+=( )_%^&*])(?=.{10,})|^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$.,+=( )_%^&*])(?=.{10,}))/;

export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/** removeEncodedChar method
 * to replace the special characters in place of encoded characters
 */
export function removeEncodedChar(str) {
  return str
    .replace(/%21/g, '!')
    .replace(/%27/g, "'")
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2A/g, '*')
    .replace(/%20/g, ' ')
    .replace(/%2C/g, ',')
    .replace(/%26/g, '&')
    .replace(/%40/g, '@')
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
    .replace(/%5F/g, '_');
}

/** deleteAllCookies method
 * to remove all the cookies on logout
 */
export function deleteAllCookies() {
  return new Promise((resolve) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
}

/**
 * Get value of a key
 * @param {String} key
 * @param {Boolean} convertToObject
 * @returns Object
 */
export function getItemFromLS(key, convertToObject = false) {
  const value = window.localStorage.getItem(key) || null;
  if (convertToObject) {
    return value ? JSON.parse(value) : null;
  }
  return value;
}

/**
 * Put an item into localstorage
 * @param {String} key
 * @param {String} value
 * @returns null
 */
export function putItemIntoLS(key, value) {
  if (typeof key === 'string' && typeof value === 'string') {
    window.localStorage.setItem(key, value);
  }
  return null;
}

/**
 * Return date in May 03, 2022 format
 * @param {Date} value
 * @returns String
 */
export function getDateFormat(date) {
  let value = '';
  if (!date || date === 'null') return value;
  try {
    value = dayjs(date).format('MMM DD, YYYY');
  } catch (error) {
    console.error(`Invalid Date : ${error.message}`);
  }
  return value;
}

/**
 * Takes a slot object as input and returns the date in specific format
 * @param {*} slot
 * @returns {String} Slot Date in Wed, Jan 19, 2022 format
 */
export function getSlotDate(slot) {
  if (slot) {
    return dayjs
      .utc(`${slot.slot_start_time}`)
      .local()
      .format('ddd, MMM D, YYYY');
  }
  return '';
}

/**
 * Takes a slot as input and returns time range in specific format
 * @param {*} slot
 * @returns {String} Returns time in 4:00 PM - 5:00 PM
 */
export function getSlotTimeRange(slot) {
  if (slot) {
    const startTime = dayjs
      .utc(`${slot.slot_start_time}`)
      .local()
      .format('h:mm A');
    const endTime = dayjs
      .utc(`${slot.slot_end_time}`)
      .local()
      .format('h:mm A');
    return `${startTime} - ${endTime}`;
  }
  return '';
}

/**
 * Upload a file into azure blob store
 * @desc
 * Step#1: Obtain the sas token with appropriate permissions \
 * Step#2: Upload/Download the file
 * @param {File} selectedFile File object that needs to be uploaded
 * @param {Object} tokenProps Props to generate sasToken e.g.\
 * {\
 *   container_name: 'tools',\
 *   file_name: 'test',\
 *   folder_name: 'DRL',\
 *   permissions: 'write',\
 *   storage_name: 'opus-storage-java',\
 *  }
 * @returns {String} Location of the blob when successful otherwise null
 * ${container_name}/${folder_name}/$file_name}
 */
export async function uploadFile(selectedFile, tokenProps) {
  let path = null;
  const locationPrefix = `${tokenProps.container_name}/${tokenProps.folder_name}`;
  const location = `${locationPrefix}/${selectedFile.name}`;
  if (selectedFile) {
    const sasToken = await getSasToken(tokenProps);
    if (sasToken) {
      const filePath = await upload(
        selectedFile,
        tokenProps.folder_name,
        sasToken,
        tokenProps.container_name,
        false
      );
      if (filePath) {
        path = location;
      }
    }
  }
  if (!path) {
    console.error('Unable to upload file to container');
  }
  return path;
}

/**
 * @summary Download any file from azure blob storage
 * @param {String} path Blob path
 * @param {Object} tokenProps Props to generate sasToken e.g.\
 * {\
 *   container_name: 'documents',\
 *   permissions: 'read',\
 *   storage_name: 'opus-storage-java',\
 *  }
 * @returns {Object} response of fileDownload method
 */
export async function downloadFile(path, tokenProps) {
  const fullPath = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${path}`;
  const sasToken = await getSasToken(tokenProps);
  if (!sasToken) return null;
  const url = `${fullPath}${sasToken}`;
  const response = await fileDownload(url);
  return response;
}

/**
 * A no operation method that returns null
 * @returns {null}
 */
export function noop() {
  return null;
}

/**
 * Takes a slot object as input and returns the date in specific format
 * @param {*} slot
 * @returns {String} Slot Date in Wed, Jan 19, 2022 format
 */
export function getNotificationStartDate(slot) {
  if (slot) {
    return dayjs.utc(`${slot.start_date}`).local().format('dddd, MMMM D');
  }
  return '';
}

export function getNotificationEndDate(slot) {
  if (slot) {
    return dayjs.utc(`${slot.end_date}`).local().format('dddd, MMMM D');
  }
  return '';
}

/**
 * Takes a slot as input and returns start time and end time in specific format
 * @param {*} slot
 * @returns {String} Returns time in 4:00 PM
 */
export function getNotificationStartTime(slot) {
  if (slot) {
    const startTime = dayjs.utc(`${slot.start_date}`).local().format('h:mm A');
    return `${startTime}`;
  }
  return '';
}
export function getNotificationEndTime(slot) {
  if (slot) {
    const endTime = dayjs.utc(`${slot.end_date}`).local().format('h:mm A');
    return `${endTime}`;
  }
  return '';
}

/**
 * Construct class string from a string or array of strings
 * @param {String|Array<String>} classList
 * @return {String|null}
 */
export function parseClasses(classList) {
  if (Array.isArray(classList)) {
    return classList.join(' ');
  }
  if (typeof classList === 'string' && classList !== '') {
    return classList;
  }
  return null;
}

/**
 * @summary Show success notification
 * @param {String} text
 * @param {String} title
 * @param {Object} params
 * @return {null}
 */
export function successNotification(text, title = 'Success', params = {}) {
  this.$notify({
    type: 'success',
    title,
    text,
    ...params,
  });
}

/**
 * @summary Show error notification
 * @param {String} text
 * @param {String} title
 * @param {Object} params
 * @return {null}
 */
export function errorNotification(text, title = 'Error', params = {}) {
  this.$notify({
    type: 'error',
    title,
    text,
    ...params,
  });
}
/**
 * @summary Show warning notification
 * @param {String} text
 * @param {String} title
 * @param {Object} params
 * @return {null}
 */
export function warningNotification(text, title = 'Warning', params = {}) {
  this.$notify({
    type: 'warning',
    title,
    text,
    ...params,
  });
}
/**
 * Generate capitalized string format
 * Convert special characters to spaces and first chars to capitals
 * @param {String} wordList
 * @return {String}
 * @example capitalize("Abc  abc aBC") returns "Abc Abc ABC"
 */
export function capitalize(wordList) {
  const regex = /[~!@#$%^&*_\-+=\\|'";?/.,<>]/g;
  if (wordList && typeof wordList === 'string') {
    return wordList
      .replaceAll(regex, ' ')
      .trim()
      .split(' ')
      .filter((word) => word !== '')
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(' ');
  }
  return '';
}

/**
 * @summary Returns a number between 0 to max
 * @param {Number} max
 * @returns Number
 * @example getRandomInt(25) returns 4
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
