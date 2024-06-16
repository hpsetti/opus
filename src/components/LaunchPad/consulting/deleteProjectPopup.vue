<template>
  <div>
    <div id="modal_project_delete" class="modal" role="dialog">
      <div class="modal-dialog modal-lg">
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
            <div class="center pb-10">
              <p class="text-h4 pb-10">
                Are you sure you want to delete this project?
              </p>
              <p class="text-regular-large">
                Deleting project(s) will remove it permanently from the
                database.
              </p>
            </div>
            <div
              class="d-flex justify-content-center p-0 mt-20 col-gap-50 mb-20"
            >
              <BaseButton data-dismiss="modal" variant="secondary"
                >Cancel</BaseButton
              >
              <BaseButton variant="error" @click="publishDelete()"
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
  props: ['userId'],
  data() {
    return {};
  },
  components: {
    BaseButton
  },
  methods: {
    async publishDelete() {
      this.$emit('deleteConsultantProject');
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
</style>
