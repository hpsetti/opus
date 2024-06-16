<template>
  <div class="wrapper">
    <div class="main-panel" v-if="loadPage">
      <dashboard-content></dashboard-content>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import DashboardContent from './Content.vue';
import { getCookie } from '../../utils/common';

export default {
  data() {
    return {
      loadPage: false
    };
  },
  components: {
    DashboardContent
  },
  beforeUnmount() {
    this.emitter.off();
    $('.modal-backdrop').remove();
  },
  created() {
    localStorage.removeItem('reLoad');
    if (!getCookie('Authorization')) {
      document.cookie = `redirect_url = ${window.location.href}; path=/;`;
      window.location.href = '/login';
      this.loadPage = false;
    } else {
      this.loadPage = true;
    }
  }
};
</script>
