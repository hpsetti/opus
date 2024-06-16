import { required, minLength, maxLength } from '@vuelidate/validators';

export function isAllowedCharacters(value) {
  const regex = /^[^*?<>!@#$“%^]*$/;
  return regex.test(value);
}

export function isAlphaNumOrEmpty(value) {
  const regex = /^$|^[a-zA-Z0-9]+/;
  return regex.test(value);
}

export function isPhoneValidOrEmpty(value) {
  const regex =
    /^$|^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //eslint-disable-line
  return regex.test(value);
}

export function isAlphaNum(value) {
  const regex = /^[$a-zA-Z0-9].*$/;
  return regex.test(value);
}
export function isPhone(value) {
  const regex =
    /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //eslint-disable-line
  return regex.test(value);
}
export function isValidMail(value) {
  const regex =
    /^([a-zA-Z0-9_\-\+\.]+)@([a-zA-Z-0-9-]+)((\.([a-zA-Z0-9-]){2,63}){1,3})$/; //eslint-disable-line
  return regex.test(value);
}
export function isNumber(value) {
  const regex = /^[0-9]*$/; //eslint-disable-line
  return regex.test(value);
}

export const validateData = {
  full_name: {
    required,
    minLength: minLength(2),
    maxLength: maxLength(250)
  },
  business_email_address: {
    required,
    isValidMail
  },
  phone_number: {
    isPhoneValidOrEmpty
  },
  company: {
    minLength: minLength(2),
    isAlphaNumOrEmpty
  },
  detail_description: {
    minLength: minLength(3)
  }
};
