<template>
  <div class="modal fade" id="successMsgModal">
    <div class="modal-dialog success-modal-wrapper">
      <div class="modal-content expiry-modal-content">
        <div class="modal-header">
          <div class="card text-center">
            <img
              src="/static/images/icons/checkbox.svg"
              class="success_logo card-img-top"
            />
            <!-- <div v-if="showMessage" class="card-body">
              <div class="card-title">
                <p class="first-card-title update-failed title_text">Thank you for your purchase</p>
              </div>
            </div> -->
            <div class="card-title">
              <p class="first-card-title update-success title_text">Success</p>
            </div>
            <div class="row">
              <div class="col-lg-12 card-text">
                <p class="success-message">{{ successMessage }}</p>
              </div>
              <!-- <div v-if="showMessage" class="col-lg-12 error-message">View services and billing under your
                <div><a @click="redirectToServices">account settings</a></div>
              </div> -->
            </div>
            <div class="row" v-if="payment_option == 1">
              <div class="col-lg-12 card-text">
                <h5 class="success-message">
                  * Clicking on OK would redirect you to Emergo pay to continue
                  your payment with Credit
                </h5>
              </div>
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
</template>

<script>
import $ from 'jquery';
import EventBus from '../../utils/event-bus';

export default {
  props: ['successMessage', 'redirection', 'payment_option', 'showMessage'],
  methods: {
    redirectToServices() {
      $('#successMsgModal').modal('hide');
      this.emitter.emit('openAccountSettingsPopup', 'services');
      this.$router.push('/market-place');
    },
    submitModal() {
      if (this.redirection) {
        if (this.payment_option === 1) {
          window.open('https://www.emergobyul.com/pay', '_blank');
          this.$router.push(this.redirection);
        } else {
          this.$router.push(this.redirection);
        }
      }
      this.$emit('closeParent');
      $('#successMsgModal').modal('hide');
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
img.success_logo.card-img-top {
  width: 50px;
  height: 50px;
  background-color: #94d66b;
  border-radius: 50%;
  padding: 10px;
  margin-top: 5px;
}
.error-message,
.success-message {
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
p.first-card-title.update-success {
  font-size: 25px;
  padding-top: 25px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 500;
}
@media screen and (min-width: 768px) {
  .success-modal-wrapper {
    width: 500px;
  }
}
</style>
