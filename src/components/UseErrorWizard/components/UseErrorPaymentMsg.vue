<template>
  <div class="UseErrorPaymentMsg">
    <div
      class="UseErrorPaymentMsg__container d-flex align-items-center justify-content-center flex-direction-column"
    >
      <img src="/static/images/icons/useErrorWizardTool/lock_icon.svg" />
      <h1 class="text-center text-h4">
        {{ heading }}
      </h1>
      <marketPlaceTools
        :loader="loaderStatus"
        :userId="userInfo.id"
        toolName="Use Error Wizard"
      />
    </div>
  </div>
</template>
<script>
import marketPlaceTools from '@/components/Tools/marketPlaceTools.vue';

export default {
  name: 'UseErrorPaymentMsg',
  components: {
    marketPlaceTools
  },
  data() {
    return {
      heading:
        'To access the all tips and practices, purchase \nthe Use Error Wizard',
      loaderStatus: false,
      userInfo: {}
    };
  },
  created() {
    if (localStorage.getItem('userData')) {
      const response = JSON.parse(localStorage.getItem('userData'));

      this.userInfo.id = response.id;
    }
  }
};
</script>
<style scoped>
.UseErrorPaymentMsg {
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.UseErrorPaymentMsg__container {
  width: 800px;
}
.UseErrorPaymentMsg__container h1 {
  white-space: break-spaces;
}
</style>
