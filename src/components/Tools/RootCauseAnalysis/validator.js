import { required, minLength } from '@vuelidate/validators';

export function isAllowedCharacters(value) {
  const regex = /^[^*?<>!@#$“%^]*$/;
  return regex.test(value);
}
export function isAlphaNum(value) {
  const regex = /^[a-zA-Z0-9].*$/;
  return regex.test(value);
}
export function isNumber(value) {
  const regex = /^[\d\+\-\.\(\)\/\s]*$/; //eslint-disable-line
  return regex.test(value);
}
export function isPostalCode(value) {
  if (value.length <= 0) return true;
  const regex = /^\w{2,14}(?:[-\s]\w{2,5})?$/;
  return regex.test(value);
}
export function isValidMail(value) {
  const regex =
    /^([a-zA-Z0-9_\-\+\.]+)@([a-zA-Z-0-9-]+)((\.([a-zA-Z0-9-]){2,63}){1,3})$/; //eslint-disable-line
  return regex.test(value);
}
export function isContainsUpperCase(value) {
  return /^(?=.*?[A-Z])/.test(value);
}
export function isContainsLowerCase(value) {
  return /^(?=.*?[a-z])/.test(value);
}
export function isContainsDigit(value) {
  return /^(?=.*?[0-9])/.test(value);
}
export function isContainsSpecialChar(value) {
  return /^(?=.*?[!@#$.,+=( )_%^&*])/.test(value);
}

export function checkConditions(value) {
  let counter = 0;
  if (isContainsUpperCase(value)) counter += 1;
  if (isContainsLowerCase(value)) counter += 1;
  if (isContainsDigit(value)) counter += 1;
  if (isContainsSpecialChar(value)) counter += 1;
  return counter;
}
export const validateData = {
  userName: {
    required,
    minLength: minLength(2)
  },
  emailAddress: {
    required,
    isValidMail
  },
  detailMessage: {
    required,
    minLength: minLength(6)
  }
};
