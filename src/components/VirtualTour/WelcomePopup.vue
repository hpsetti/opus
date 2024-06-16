<template>
  <div class="tour-popup">
    <div
      id="modal_welcome"
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
              @click="stopTour()"
            />
            <img
              class="img-responsive logo-rams"
              src="/static/images/dashboard/logo_tour.png"
              alt="rams-logo"
            />
          </div>
          <div class="modal-body">
            <p class="body-txt">Welcome {{ userName }}!</p>
            <p class="body-txt sub-text">
              Walk through each feature using our guided tour.
            </p>
          </div>
          <div class="text-center">
            <div>
              <router-link to="/home" />
              <BaseButton
                type="button"
                class="mt-15"
                @click="
                  startTour();
                  emitEvent();
                "
              >
                Start Tour
              </BaseButton>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-link skip-link"
                data-dismiss="modal"
                @click="stopTour()"
              >
                Skip Tour
              </button>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { updateOpusTour } from '../../apis/dashboard';
import EventBus from '../../utils/event-bus';
import { getUserData } from '../../apis/profile';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  props: ['displaySide', 'currentTour'],
  components: {
    BaseButton
  },
  data() {
    return {
      userData: {}
    };
  },
  methods: {
    emitEvent() {
      this.emitter.emit('tourStart');
    },
    async startTour() {
      $('#modal_welcome').modal('hide');
      $('#modal_dashboard').modal({
        backdrop: 'static',
        keyboard: false
      });
      await this.stopTour();
      this.emitter.emit('highlightNav', this.currentTour.url);
    },
    async stopTour() {
      const userId = JSON.parse(localStorage.getItem('userId'));
      const tourId = JSON.parse(localStorage.getItem('tourId'));
      const data = {
        id: tourId,
        new_user: false,
        user_id: userId
      };
      await updateOpusTour(data);
      this.emitter.emit('highlightNav', this.$route.path);
    },
    async setupUserData() {
      this.userData = localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData'))
        : await getUserData();
    }
  },
  computed: {
    userName() {
      let firstName = this.userData.first_name;
      let lastName = this.userData.last_name;
      if (firstName && firstName.length > 16)
        firstName = `${firstName.substr(0, 15)}..`;
      if (lastName && lastName.length > 16)
        lastName = `${lastName.substr(0, 15)}..`;
      return `${firstName} ${lastName}`;
    }
  },
  mounted() {
    this.emitter.on('updateProfile', this.setupUserData);
    this.setupUserData();
  },
  beforeUnmount() {
    this.emitter.on('updateProfile', this.setupUserData);
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
.modal-footer {
  background: url('/static/images/icons/tour/tour_bg.svg') no-repeat;
  color: #ffffff;
  height: 90px;
  border-radius: 0 0 10px 10px;
}
.tour-popup .start-btn {
  width: 143px;
  height: 44px;
  margin-top: 15px;
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
  width: 270px;
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
  color: #00518a;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 12px;
  margin-top: 14px;
}
#modal_welcome.modal {
  z-index: 1049;
}

@media screen and (max-width: 767px) {
  .welcome-modal {
    display: none !important;
  }
}
</style>
