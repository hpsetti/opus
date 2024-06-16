<template>
  <div>
    <router-view :userId="userId"></router-view>
  </div>
</template>

<script>
// import getResoucesData from '../../apis/resourcesDashboard';

export default {
  props: ['account_id', 'userId', 'roleId'],
  data() {
    return {
      // resourcesData: '',
    };
  }
  // async created() {
  //   await this.getResoucesData();
  // },
  // methods: {
  //   async getResoucesData() {
  //     this.resourcesData = await getResoucesData();
  //   },
  // },
};
</script>
<style></style>
