<template>
  <div class="content-wrappper">
    <div class="col-xs-8 notification_box row">
      You currently do not have permissions to access this section, please
      contact your Admin.
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.notification_box {
  color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  background: #f2f2f2;
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  transform: translate(-40%, -50%);
  text-align: center;
  margin: 0 auto;
  padding: 20px 0px 20px 0px;
}
</style>
