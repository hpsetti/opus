<template>
  <div class="col-xs-12 p-0">
    <div id="delete-slot-modal" class="modal" role="dialog">
      <div class="modal-dialog modal-md request-modal">
        <div class="modal-content col-xs-12 p-20">
          <div class="modal-header">
            <div class="col-xs-12 p-0 text-center header">Delete Slot</div>
          </div>
          <div class="modal-body text-center col-xs-12 text-start">
            Are You sure you want to delete the slot?
          </div>
          <div class="footer flex-wrapper col-xs-12">
            <button
              type="button"
              class="btn emergo-white-button cancel-btn footer-btn"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="btn emergo-red-button br-20 ml-20 footer-btn"
              @click="deleteSelectedSlot"
            >
              Delete
            </button>
          </div>
          <loader :loadingStatus="loaderStatus"></loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../UIComponents/Loader.vue';
import { deleteILTSlotBySlotId } from '../../apis/instructorLedTraining';

export default {
  props: ['selectedSlotId'],
  data() {
    return {
      loaderStatus: false
    };
  },
  components: {
    Loader
  },
  methods: {
    async deleteSelectedSlot() {
      this.loaderStatus = true;
      const response = await deleteILTSlotBySlotId(this.selectedSlotId);
      this.loaderStatus = false;
      if (response.status_code === 200) {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: `${response.data}`
        });
        this.$emit('closeDeleteSlot');
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Delete Failed!'
        });
      }
    }
  }
};
</script>

<style scoped>
.modal-body {
  padding-left: 0px;
  padding-bottom: 30px;
}

@media (min-width: 375px) and (max-width: 1200px) {
  .request-modal {
    width: 75%;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
}

.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}

.footer-btn {
  font-weight: 600;
  font-size: 18px !important;
  padding: 5px 30px;
}

.modal-footer {
  background: #fff;
  border-top: none;
}

.modal-body {
  background: #fff;
}

.flex-wrapper {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1024px) {
  .flex-wrapper {
    padding-right: 15px;
  }
}

@media (min-width: 768px) {
  .modal-dialog {
    margin: 80px auto !important;
  }
}
</style>
