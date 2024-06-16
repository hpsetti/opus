<template>
    <div id="clear-all-popup" class="modal" role="dialog">
      <div class="modal-dialog modal-md request-modal">
        <div class="modal-content col-xs-12">
          <div class="modal-header">
            <div class="d-flex justify-content-end col-gap-30">
              <img
                @click="closeClearallPopup"
                class="cursor-pointer align-self-flex-start"
                src="/static/images/icons/close_icon.svg"
                alt=""
              />
            </div>
          </div>
          <div class="modal-body col-xs-12" ref="formWrapper">
            <div class="text-h4 mb-10 text-center">
              Do you want to clear your search?
            </div>
            <div class="text-regular-large text-center mt-20">
              In clearing your search, you will lose any results and must restart
              the search process.
            </div>
            <div class="mt-20 text-center">
              <BaseButton
                variant="secondary"
                @click="closeClearallPopup"
                >Cancel</BaseButton
              >
              <BaseButton
                class="button ml-15 primary sm"
                @click="clearSearch"
                >Yes, clear search</BaseButton
              >
            </div>
          </div>
          <loader :loadingStatus="loaderStatus"></loader>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Loader from '../UIComponents/Loader.vue';
  import BaseButton from '../UIComponents/BaseButton.vue';
  
  export default {
    data() {
      return {
        loaderStatus: false
      };
    },
  
    components: {
      Loader,
      BaseButton
    },
    async created() {
      //   await this.getPremiumFeatures();
    },
  
    methods: {
      closeClearallPopup() {
        this.$emit('closeClearallPopup');
      },
      clearSearch() {
        this.$emit('clearSearch');
        this.$emit('closeClearallPopup');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-header {
    background: none;
    border: 0;
  }
  
  .modal-body {
    max-height: 65vh;
    overflow-y: auto;
    margin-bottom: 20px;
    scrollbar-width: thin;
  }
  .align-self-flex-start {
    align-self: flex-start;
  }
  .gray-out {
    opacity: 0.5;
  }
  
  .header-text {
    font-size: 24px;
    line-height: 33px;
    color: #0b3c61;
    flex: 0 0 90%;
  }
  
  .required-asterisk {
    padding-left: 5px;
    color: red;
  }
  </style>
  