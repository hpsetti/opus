<template>
  <div class="tour-popup">
    <div
      id="modal_accounts"
      class="modal modal-dashbrd"
      :class="{
        'left in': windowInnerWidth <= 1300,
        'right in': windowInnerWidth > 1300
      }"
      role="dialog"
    >
      <div class="modal-dialog modal-md">
        <div class="modal-content acct-settings-left">
          <div
            :class="{
              'modal-arrow-account': windowInnerWidth > 1300,
              'modal-arrow': windowInnerWidth <= 1300,
              'custom-modal-arrow': windowInnerWidth > 1300 && roleId === 5
            }"
          ></div>
          <div class="modal-body">
            <div class="modal-header">
              <img
                src="/static/images/icons/popup_close.svg"
                class="close-btn"
                data-dismiss="modal"
                @click="closePopup"
              />
              <div class="dashboard-heading">
                <!-- <img src="/static/images/icons/settings_white_icon.svg" alt="" class="tour-icon"> -->
                Account Settings
              </div>
              <img
                src="https://ramsdevstorage.blob.core.windows.net/customererrorpage/Header_swoop.png"
                class="header-swoop"
              />
            </div>
            <div>
              <p class="dashbrd-txt tour-title-text">
                Control your account and team’s access
              </p>
            </div>
            <div class="description-txt pr-15">
              <ul>
                <li>Control your team’s access to premium services</li>
                <li>Customize frequency of alerts and notifications</li>
                <li>Easily add or remove team members who receive updates</li>
                <li>
                  Customize the OPUS dashboard for the data you need to manage
                  your business
                </li>
              </ul>
            </div>
            <div class="btn-next-div">
              <button
                type="button"
                class="btn custom-btn mr-16 emergo-white-button"
                @click="backTour()"
              >
                Back
              </button>
              <router-link to="/home">
                <button
                  type="button"
                  class="btn custom-btn emergo-green-button"
                  @click="
                    endTour();
                    emitEvent();
                  "
                >
                  Next
                </button>
              </router-link>
            </div>
            <div class="row">
              <span
                v-for="index in tourlength"
                :key="index"
                class="round-button"
              ></span>
              <span class="active-round-button"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <success-popup />
  </div>
</template>

<script>
import $ from 'jquery';
import debounce from 'lodash/debounce';
import SuccessPopup from './SuccessPopup.vue';
import EventBus from '../../utils/event-bus';

export default {
  components: {
    SuccessPopup
  },
  data() {
    return {
      windowInnerWidth: window.innerWidth,
      eventFunction: '',
      roleId: 0
    };
  },
  props: ['previousTour', 'tourlength'],
  created() {
    this.eventFunction = debounce(() => {
      this.windowInnerWidth = window.innerWidth;
    }, 500);
    window.addEventListener('resize', this.eventFunction);
    this.roleId = parseInt(localStorage.getItem('roleId'), 10);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.eventFunction);
  },
  methods: {
    emitEvent() {
      this.$emit('mobilesidebar');
    },
    closePopup() {
      this.emitter.emit('tourEnd');
      this.emitter.emit('closeDrpDwnAccount');
    },
    backTour() {
      this.emitter.emit('openRender');
      this.emitter.emit('closeDrpDwnAccount');
    },
    endTour() {
      $('#modal_accounts').modal('hide');
      this.emitter.emit('closeDrpDwnAccount');
      $('#modal_endtour').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  }
};
</script>

<style scoped>
.tour-popup .modal .modal-body {
  padding-bottom: 0px !important;
}
.modal-dashbrd .modal-body {
  height: calc(100vh - 80px);
  padding: 0px !important;
  max-height: unset !important;
  scrollbar-width: thin;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: darkgray;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray;
}
.tour-title-text {
  color: #00518a;
  font-size: 24px;
}
.description-txt ul li {
  margin: 20px 0;
  font-size: 15px;
  color: #0b3c61;
  line-height: 19px;
}
.check-txt {
  margin-top: 10px;
}
.btn-next-div {
  margin-top: 30px;
  margin-bottom: 30px;
}
.custom-btn {
  width: 133px;
  margin-top: 8px;
}
.dashboard-heading {
  margin: 70px auto;
}
.modal-arrow-account {
  right: -32px;
  top: 30px;
  position: fixed;
  height: 0;
  border-style: solid;
  border-width: 14px 6px 14px 26px;
  border-color: transparent transparent transparent #1363a0;
}
.custom-modal-arrow {
  right: -32px;
  top: 2px;
  position: fixed;
  height: 0;
  border-style: solid;
  border-width: 14px 6px 14px 26px;
  border-color: transparent transparent transparent #1363a0;
}
.btn-modal-footer {
  color: #f2f2f2 !important;
  background: #4c9e45;
  border-radius: 30px;
  width: 133px;
  margin-top: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
}
.modal.left.in .modal-dialog {
  left: 230px;
}
.modal.right.in .modal-dialog {
  right: 228px;
  left: unset;
}
.tour-icon {
  width: 26px;
  margin-top: -4px;
}
.acct-settings-left .modal-arrow {
  top: 47px;
}
.mr-16 {
  margin-right: 16px;
}
.row {
  width: 100%;
  text-align: center;
  margin: -15px 0 30px;
}
.round-button,
.active-round-button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  float: none;
  border: 0.5px solid #0b3c61;
  margin: 0 4px;
}
.active-round-button {
  background: #0b3c61;
}
@media only screen and (max-width: 1300px) {
  .modal-content.acct-settings-left {
    left: 0px;
  }
}
</style>
