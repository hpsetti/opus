import { required } from '@vuelidate/validators';

export function isAllowedCharacters(value) {
  const regex = /^[^*?<>!@#$“%^]*$/;
  return regex.test(value);
}

export function isPhoneValidOrEmpty(value) {
  const regex =
    /^$|^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; //eslint-disable-line
  return regex.test(value);
}

export const validateData = {
  project_name: {
    required
  },
  device_type: {
    required
  },
  phone_number: {
    required,
    isPhoneValidOrEmpty
  },
  start_date: {
    required
  },
  end_date: {
    required
  },
  other_details: {
    required
  }
};
