<template>
  <div></div>
</template>
<script>
import { confirmLogin } from '../../apis/login';

export default {
  created() {
    if (this.$route.params.token) {
      this.confirmLogin(this.$route.params.token);
    }
  },
  methods: {
    async confirmLogin(token) {
      const response = await confirmLogin(token);
      if (response.status === false) {
        this.$router.push({
          name: 'login',
          params: { errorMessage: response.message }
        });
      } else if (response.status) {
        this.$router.push({
          name: 'login',
          params: { successMessage: response.message }
        });
      }
    }
  }
};
</script>
