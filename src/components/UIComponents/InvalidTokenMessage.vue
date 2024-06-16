<template>
  <div>
    <div class="page_wrapper">
      Token has expired.
      <p v-if="page === 'confirmregister' || 'resetpassword'">
        To resend, please try again
        <router-link to="/forgot"> <u>here</u> </router-link>.
      </p>
      <!-- <p v-if="page === 'resetpassword'">
        To resend, please try again
        <router-link to="/forgot"> <u>here</u> </router-link>.
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['page'],
  data() {
    return {};
  }
};
</script>
<style scoped>
.banner-container,
.security_logos {
  display: none;
}
.page_wrapper {
  margin-top: 25vh;
  font-size: 22px;
  line-height: 25px;
  color: gray;
}
.page_wrapper > div > a {
  color: #013a68;
  text-decoration: underline;
}
</style>
