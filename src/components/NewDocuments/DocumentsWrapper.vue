<template>
  <div class="content-wrappper">
    <router-view :userId="userId"></router-view>
  </div>
</template>

<script>
export default {
  props: ['userId'],
  data() {
    return {};
  }
};
</script>

<style scoped></style>
