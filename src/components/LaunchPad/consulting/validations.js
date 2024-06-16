import { required } from '@vuelidate/validators';

const validateData = {
  project_name: {
    required
  },
  device_type: {
    required
  },
  other_details: {
    required
  }
};

export default validateData;
