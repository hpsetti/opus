<!-- import { RouterLink, RouterView } from 'vue-router' -->
<template>
  <div id="app">
    <!-- <notifications position="bottom right" /> -->
    <custom-notification></custom-notification>
    <router-view></router-view>
    <!-- <v-dialog /> -->
  </div>
</template>

<script>
// import $ from 'jquery';
import CustomNotification from './components/Common/CustomNotification.vue';

export default {
  name: 'app',
  components: {
    CustomNotification
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
  }
};
</script>

