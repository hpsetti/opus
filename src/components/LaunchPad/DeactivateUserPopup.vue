<template>
  <div id="deactivateUserPopup" class="modal" role="dialog">
    <div class="modal-dialog modal-md request-modal">
      <div class="modal-content col-xs-12">
        <div class="modal-header pl-0 pb-10 mb-10">
          <div class="d-flex justify-content-between">
            <div class="font-32 title">Deactivate User</div>
            <img
              data-dismiss="modal"
              class="cursor-pointer"
              src="/static/images/icons/close_icon.svg"
              alt=""
            />
          </div>
        </div>
        <div
          class="modal-body col-xs-12 mb-20 font-18 text-start d-flex justify-content-center"
        >
          Are you sure you want to Deactivate the User?
        </div>
        <div class="footer col-xs-12 mb-30">
          <div class="col-xs-12 p-0 d-flex justify-content-end col-gap-15">
            <button data-dismiss="modal" class="emergo-white-button">No</button>
            <button class="emergo-green-button" @click="deactivateUser">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {};
  },
  methods: {
    deactivateUser() {
      this.$emit('deActivateUser');
    }
  }
};
</script>

<style scoped>
.modal-header {
  background: #ffffff;
  color: #333333;
  border: none;
}

.border-bottom {
  border-bottom: 1px solid #bdbdbd;
}

#addRemoveCartPopup {
  z-index: 1060;
}

.title {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}

.added-to-cart-text {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #4c9e45;
}
</style>
