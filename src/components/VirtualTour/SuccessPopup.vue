<template>
  <div class="tour-popup">
    <div
      id="modal_endtour"
      class="modal welcome-modal"
      data-backdrop="static"
      role="dialog"
      :class="{ displayBlock: displaySide }"
    >
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <img
              src="/static/images/icons/modal_close.svg"
              class="close-btn cursor-pointer"
              data-dismiss="modal"
              @click="endTour"
            />
            <img
              class="img-responsive logo-rams"
              src="/static/images/dashboard/logo_tour.png"
              alt="rams-logo"
            />
          </div>
          <div class="modal-body">
            <p class="body-txt">Congratulations!</p>
            <p class="body-txt sub-text">
              The tour is complete and you’re ready to take your HFE work to the
              next level.
            </p>
            <p class="body-txt sub-text">
              Take this tour again any time by clicking on arrow next to your
              name in the upper right.
            </p>
          </div>
          <div class="text-center">
            <BaseButton class="mb-10" data-dismiss="modal" @click="endTour()">
              Close Tour
            </BaseButton>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventBus from '../../utils/event-bus';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  props: ['displaySide'],
  components: {
    BaseButton
  },
  data() {
    return {
      userData: {}
    };
  },
  methods: {
    endTour() {
      this.emitter.emit('tourEnd');
      this.emitter.emit('highlightNav', this.$route.path);
    }
  }
};
</script>

<style scoped>
.welcome-modal .modal-dialog {
  width: 580px;
}
.modal-content {
  border-radius: 10px;
}
.displaySide {
  display: block !important;
}
.tour-popup .logo-rams {
  margin: 32px auto 26px auto;
  left: 0;
  right: 0;
  text-align: center;
}
.tour-popup .start-btn {
  min-width: 103px;
  height: 44px;
  margin-top: 35px;
}
.modal-footer {
  background: url('/static/images/icons/tour/tour_bg.svg') no-repeat;
  color: #ffffff;
  height: 90px;
  border-radius: 0 0 10px 10px;
}
.body-txt {
  text-align: center;
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 0px;
}
.sub-text {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  width: 340px;
  margin: 20px auto 0;
}
.check-txt {
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #0b3c61;
}
.tour-popup .modal-dashbrd .btn-modal-footer {
  margin-top: 0px;
}
.skip-link {
  color: #0c3859;
  font-size: 16px;
  margin-bottom: 8px;
  margin-top: 2px;
}
@media screen and (max-width: 767px) {
  .welcome-modal {
    display: none !important;
  }
}
</style>
