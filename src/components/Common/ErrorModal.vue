<template>
  <div class="modal fade" id="ErrorMsgModal" data-backdrop="static">
    <div class="modal-dialog error-modal-wrapper">
      <div class="modal-content expiry-modal-content">
        <div class="modal-header">
          <!-- <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button> -->
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/static/images/icons/expiry.svg"
                class="expiry_logo card-img-top"
              />
              <div class="card-title">
                <p class="first-card-title update-failed">Update Failed</p>
              </div>
              <div class="card-text">
                <p class="error-message">{{ errorMessage }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 ok-btn">
                <button
                  class="btn btn-primary btn-block stay-on-page"
                  @click="closePopup"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: ['errorMessage'],
  data() {
    return {};
  },
  methods: {
    closePopup() {
      $('#ErrorMsgModal').modal('hide');
    }
  }
};
</script>

<style scoped>
.modal-open .modal {
  overflow: hidden;
}
.modal .modal-dialog .modal-content {
  border-radius: 10px;
}
.modal .modal-dialog .modal-content .modal-header {
  background: #f2f2f2;
  border-radius: 10px;
}
.card .card-body .card-title p.first-card-title {
  font-size: 25px;
  padding-top: 30px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 500;
}

.card .card-body .card-text p.first-card-text {
  padding-top: 30px;
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 19px;
}

.stay-on-page {
  background: #0b3c61;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  border-radius: 20px;
  color: #f2f2f2;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 6px;
}

img.expiry_logo.card-img-top {
  width: 50px;
  height: 50px;
}
.error-message {
  padding-top: 10px;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 28px;
  font-size: 18px;
  font-weight: 300;
}
.ok-btn {
  width: 50%;
  margin: auto;
  float: initial;
}

.modal-dialog {
  margin: 20px auto;
}

@media screen and (min-width: 768px) {
  .error-modal-wrapper {
    width: 500px;
  }
}
</style>
