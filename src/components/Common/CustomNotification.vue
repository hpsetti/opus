<template>
  <notifications
    id="custom-notification-bottom"
    class="custom-notification"
    :duration="5000"
    position="bottom right"
  >
    <template #body="props">
      <div class="notif-content">
        <div class="content">
          <div class="success-template">
            <div class="success-template-icon">
              <div class="success-icon" v-if="props.item.type === 'success'">
                <img
                  src="/static/images/icons/check_icon.svg"
                  alt="check-icon"
                />
              </div>
              <div class="error-icon" v-else-if="props.item.type === 'error'">
                <img
                  src="/static/images/icons/alert_triangle.svg"
                  alt="alert-icon"
                />
              </div>
              <div
                class="warning-icon"
                v-else-if="props.item.type === 'warning'"
              >
                <img
                  src="/static/images/icons/warning_notif.svg"
                  alt="warning-icon"
                />
              </div>
            </div>
            <div class="success-template-content">
              <div
                class="title-header"
                :class="{
                  'success-template-title': props.item.type === 'success',
                  'error-template-title': props.item.type === 'error',
                  'warning-template-title': props.item.type === 'warning'
                }"
              >
                {{ props.item.title }}
              </div>
              <div class="success-template-text" v-html="props.item.text"></div>
            </div>
            <div
              class="success-template-close"
              @click="props.close"
              v-if="
                !props.item.data ||
                (props.item.data && props.item.data.showDismiss)
              "
            >
              <img src="/static/images/icons/close_icon.svg" alt="close-icon" />
            </div>
          </div>
        </div>
        <div
          class="actions d-flex justify-content-end"
          v-if="props.item.data && props.item.data.hasDismissAndUndo"
        >
          <BaseButton variant="secondary" @click="props.item.data.undo"
            >Undo</BaseButton
          >
          <div class="dismiss" @click="props.close">Dismiss</div>
        </div>
        <div
          class="actions d-flex justify-content-end"
          v-else-if="props.item.data && props.item.data.actionName"
        >
          <BaseButton @click="props.item.data.action">{{
            props.item.data.actionName
          }}</BaseButton>
        </div>
        <div
          class="actions d-flex justify-content-end"
          v-else-if="
            !props.item.data || (props.item.data && props.item.data.showDismiss)
          "
        >
          <div class="dismiss" @click="props.close">Dismiss</div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<script>
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  components: {
    BaseButton
  }
};
</script>

<!--
// Using action button layout
  this.$notify({
    type: 'warning',
    title: 'Warning',
    text: 'Downloaded Successfully as a PDF.',
    data: { actionName: 'Checkout Now', action: this.checkout },
  });
// Using dismiss and undo button layout
  this.$notify({
    type: 'warning',
    title: 'Warning',
    text: 'Downloaded Successfully as a PDF.',
    data: { hasDismissAndUndo: true, undo: this.undo },
  });
// Do not show dismiss and close icon
  this.$notify({
    type: 'warning',
    title: 'Warning',
    text: 'Downloaded Successfully as a PDF.',
    data: { showDismiss: false },
  });
 -->
<style scoped>
.custom-notification {
  width: 480px !important;
}
.custom-notification-bottom-80 {
  bottom: 80px !important;
}
.notif-content {
  display: flex;
  flex-direction: column;
  margin: 16px;
  border-radius: 5px;
  background: #ffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  /* padding: 10px; */
}
.actions {
  text-align: right;
  margin-right: 16px;
  margin-bottom: 16px;
}
.actions .dismiss {
  padding: 5.5px 17.5px;
  margin-left: 21px;
  color: #00518a;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  cursor: pointer;
}
.success-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  position: relative;
}
.success-template,
.success-template > div {
  box-sizing: border-box;
}
.success-template-icon {
  flex: 0 1 auto;
  font-size: 32px;
  padding: 24px 0 0 24px;
}
.success-icon {
  background: #4c9e45;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  padding: 5px 10px;
}
.success-icon img {
  width: 18px;
  height: 18px;
}
.success-template-close {
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
}
.success-template-close:hover {
  opacity: 0.8;
}
.success-template-content {
  padding: 16px;
  /* padding: 10px 40px 10px 15px; */
}
.title-header {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
}
.success-template-title {
  color: #4c9e45;
}
.warning-template-title {
  color: #333333;
}
.error-template-title {
  color: #b00505;
}
.warning-icon img {
  height: 38px;
  width: 38px;
}
.success-template-text {
  font-family: Nunito;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}
.error-icon img {
  width: 40px;
  height: 40px;
}

@media screen and (max-width: 767px) {
  .custom-notification {
    width: 100% !important;
  }
  .success-template-content {
    padding: 10px 20px 10px 15px;
  }
}
</style>
