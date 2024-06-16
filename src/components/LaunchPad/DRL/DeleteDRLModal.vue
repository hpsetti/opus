<template>
  <div>
    <div id="delete_drl" class="modal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex justify-content-between float-right">
              <img
                data-dismiss="modal"
                class="cursor-pointer"
                src="/static/images/icons/close_icon.svg"
                alt=""
              />
            </div>
          </div>
          <div class="modal-body">
            <div class="center center-block w-80">
              <span class="text-h4 pr-20 pl-20"
                >Are you sure you want to delete this design
                recommendation?</span
              >
              <div class="text-subtitle-1 pt-20 pb-20">
                {{ rec.recommendation_title }}
              </div>
              <p class="text-regular-large pt-20">
                Deleting will remove this permanently from the database.
              </p>
            </div>
            <div
              class="d-flex justify-content-center p-0 mt-20 col-gap-10 mb-20"
            >
              <BaseButton data-dismiss="modal" variant="secondary"
                >Cancel</BaseButton
              >
              <BaseButton variant="error" @click="$emit('delete')"
                >Yes, Delete</BaseButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  props: ['rec'],
  components: {
    BaseButton
  }
};
</script>

<style scoped>
.modal-header {
  background: none;
  border: 0;
}

.modal-body {
  padding-top: 0;
  max-height: 65vh;
  overflow-y: auto;
  margin-bottom: 20px;
  scrollbar-width: thin;
}
</style>
