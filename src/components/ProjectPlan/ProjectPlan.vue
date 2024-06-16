<template>
  <div>
    <div class="row m-0">
      <div class="col-md-12 p-0">
        <form ref="form" method="post" target="my_frame">
          <input type="hidden" name="token" value v-model="token" />
          <input type="hidden" name="nextUrl" v-model="nextUrl" />
          <input type="hidden" name="serviceType" v-model="serviceType" />
          <input type="hidden" name="opusId" v-model="opusId" />
          <input type="hidden" name="projectPhase" v-model="projectPhase" />
          <input type="hidden" name="processName" v-model="processName" />
        </form>
        <iframe
          name="my_frame"
          class="iframe-content"
          @load="loaderStatus = false"
          frameborder="0"
        ></iframe>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>
<script>
import { getCookie } from '../../utils/common';
import Loader from '../UIComponents/Loader.vue';
// import * as urls from '../../utils/RS_Urls';

export default {
  data() {
    return {
      token: '',
      nextUrl: '/dashboard/home',
      serviceType: 'smartExchange',
      projectPhase: '',
      loaderStatus: false,
      opusId: '',
      processName: ''
    };
  },
  components: { Loader },
  created() {
    [, this.token] = getCookie('Authorization').split('Bearer ');
    this.projectPhase = this.$route.params.path
      ? this.$route.params.path.toLowerCase()
      : this.$route.name.toLowerCase();
    this.opusId = this.$route.params.id;
    this.processName = this.$route.params.selectedItem;
    this.submitProjectPhase();
  },
  watch: {
    $route() {
      this.projectPhase = '';
      this.loaderStatus = true;
      this.projectPhase = this.$route.params.path
        ? this.$route.params.path.toLowerCase()
        : this.$route.name.toLowerCase();
      this.opusId = this.$route.params.id;
      this.processName = this.$route.params.selectedItem;
      this.submitProjectPhase();
    }
  },
  mounted() {
    this.loaderStatus = true;
    this.$refs.form.action = `${import.meta.env.VITE_VUE_APP_RS_URL}/api/login`;
  },
  methods: {
    submitProjectPhase() {
      this.$nextTick(() => {
        this.$refs.form.submit();
      });
    }
  }
};
</script>
<style scoped>
.submission-content {
  margin: 20px 5px;
}
.iframe-content {
  width: 100%;
  height: 89vh;
}
.m-0 {
  margin: 0;
}
.p-0 {
  padding: 0;
}
</style>
