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

export const validateData = {
  first_name: {
    required,
    minLength: minLength(2)
  },
  last_name: {
    required,
    minLength: minLength(2)
  },
  email_address: {
    required,
    isValidMail
  },
  city: {
    required,
    minLength: minLength(3),
    isAllowedCharacters
  },
  state: {
    required,
    isAllowedCharacters
  },
  country: {
    required
  },
  phone_number: {
    required,
    isNumber
  },
  address: {
    required,
    isAllowedCharacters
  },
  zipcode: {
    required,
    minLength: minLength(2),
    isPostalCode
  }
};

export const purchaseOrderObject = {
  first_name: {
    required,
    minLength: minLength(2)
  },
  last_name: {
    required,
    minLength: minLength(2)
  },
  email_address: {
    required,
    isValidMail
  },
  city: {
    required,
    minLength: minLength(3),
    isAllowedCharacters
  },
  state: {
    required,
    isAllowedCharacters
  },
  country: {
    required
  },
  phone_number: {
    required,
    isNumber
  },
  address: {
    required,
    isAllowedCharacters
  },
  zipcode: {
    required,
    minLength: minLength(2),
    isPostalCode
  },
  purchase_order: {
    required
  }
};
