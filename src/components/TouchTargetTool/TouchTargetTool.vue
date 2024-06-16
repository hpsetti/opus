<template>
  <div class="content-wrappper">
    <div class="row welcome-banner mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center">
        <img
          @click="navigateToTools"
          class="cursor-pointer"
          src="/static/images/icons/chevron_left_white.svg"
          alt=""
        />
        <div class="welcome-common-header pl-25 fw-300">Touch Target Tool</div>
      </div>
      <div class="col-xs-12 font-18 fw-700 pl-40 mb-5">Tool instructions</div>
      <div
        class="col-xs-12 tools-desc pl-40 d-flex flex-wrap align-items-end pr-0"
      >
        <div class="col-xs-12 col-sm-7 font-14 fw-400 p-0">
          This tool calculates recommended minimum touch target dimensions based
          on screen size and common HFE standards. Following the touch target
          recommendation ensures selection accuracy and reduces errors.
        </div>
        <div
          class="col-xs-12 col-sm-5 p-0 d-flex justity-content-right col-gap-10"
        >
          <BaseButton variant="secondary" class="br-5" @click="clearAll"
            >Clear All</BaseButton
          >
        </div>
      </div>
    </div>
    <touch-target-content ref="content" />
  </div>
</template>
<script>
import TouchTargetContent from './TouchTargetContent.vue';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  name: 'TouchTargetTool',
  components: { TouchTargetContent, BaseButton },
  props: {},
  data() {
    return {};
  },
  methods: {
    navigateToTools() {
      this.$router.push('/tools');
    },
    clearAll() {
      this.$refs.content.clearAllInputs();
    }
  }
};
</script>
