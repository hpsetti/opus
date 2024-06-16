<template>
  <div class="modal fade" id="warnMsgModal" data-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content expiry-modal-content">
        <div class="modal-header">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="/static/images/icons/warning.svg"
                class="expiry_logo card-img-top"
              />
              <div class="card-title">
                <p class="first-card-title update-failed">WARNING!</p>
              </div>
              <div class="card-text">
                <p class="error-message">{{ warnMessage }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 ok-btn">
                <button
                  class="btn btn-primary btn-block stay-on-page"
                  @click="submitModal"
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
  props: ['warnMessage', 'redirection'],
  methods: {
    submitModal() {
      if (this.redirection) {
        this.$router.push(this.redirection);
      } else {
        $('#warnMsgModal').modal('hide');
      }
    }
  }
};
</script>

<style scoped>
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
  line-height: 19px;
  font-size: 18px;
  font-weight: 300;
}
.ok-btn {
  width: 50%;
  margin: auto;
  float: initial;
}
.expiry-modal-content {
  max-width: fit-content;
  float: right;
}
</style>
