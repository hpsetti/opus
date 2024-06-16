<template>
  <router-view
    :userId="userId"
    :roleId="roleId"
    :serviceId="serviceId"
  ></router-view>
</template>
<script>
import { getServices } from '../../apis/marketPlace';

export default {
  props: ['userId', 'roleId'],
  data() {
    return {
      serviceId: ''
    };
  },
  components: {},
  methods: {
    async getServiceId() {
      const services = JSON.parse(localStorage.getItem('services'))
        ? JSON.parse(localStorage.getItem('services'))
        : await getServices();
      services.forEach((service) => {
        if (service.name === 'Smart Builder') {
          this.serviceId = service.id;
        }
      });
    }
  },
  created() {
    this.getServiceId();
    if (this.roleId !== 5 && this.roleId !== 11) {
      this.$router.push('/home');
    }
  }
};
</script>
<style scoped></style>
