<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div class="tour-popup">
    <div id="modal_dashboard" class="modal left modal-dashbrd" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content" :style="getModalContentPosition">
          <div class="modal-body">
            <div class="modal-header">
              <img
                src="/static/images/icons/modal_close.svg"
                class="close-btn"
                data-dismiss="modal"
                @click="closePopup"
              />
              <div class="dashboard-heading">
                <img :src="currentTour.image" alt="" class="tour-icon" />
                <span v-if="currentTour.image">{{ currentTour.type }} </span>
              </div>
              <div
                src="/static/images/dashboard/tour_banner.png"
                class="header-swoop"
              ></div>
            </div>
            <div>
              <p class="dashbrd-txt" v-html="currentTour.title"></p>
            </div>
            <div class="list-item" v-html="currentTour.content"></div>
            <div class="btn-next-div">
              <div
                class="modal-arrow"
                :style="[
                  {
                    'border-color': `${
                      currentTour.key === 9
                        ? 'transparent #4c9e45 transparent transparent'
                        : ''
                    }`,
                    top: `${currentTour.key === 0 ? 10 : currentOffset - 85}px`
                  }
                ]"
              ></div>
              <BaseButton
                variant="secondary"
                size="lg"
                class="mr-16"
                @click="previousTour()"
                v-if="currentTour.key >= 0"
              >
                Back
              </BaseButton>
              <BaseButton size="lg" @click="playNextTour()"> Next </BaseButton>
            </div>
          </div>
          <div class="modal-footer">
            <div class="row tour-status">
              <span
                v-for="index in tourObjectLength"
                :key="index"
                v-bind:class="
                  tourIndex === index - 1
                    ? 'active-round-button'
                    : 'round-button'
                "
              ></span>
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
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  data() {
    return {
      currentOffset: null
    };
  },
  components: { BaseButton },
  props: [
    'roleId',
    'displayRep',
    'currentTour',
    'playNextTour',
    'previousTour',
    'showSElink',
    'tourObjectLength',
    'tourIndex'
  ],
  watch: {
    currentTour(e) {
      if (e.type === 'Documents') {
        this.emitter.emit('contentTypeChanged');
      }

      if (e.type === 'Training') {
        this.emitter.emit('contentTypeChangedBack');
      }
      const currentType = $('.menu_item.active-icon.active');
      this.currentOffset = currentType.offset().top;
    }
  },
  methods: {
    closePopup() {
      this.emitter.emit('tourEnd');
      this.emitter.emit('highlightNav', this.$route.path);
    }
  },
  computed: {
    getModalContentPosition() {
      const tourTypePosition = {
        Consulting: 30,
        Notifications: -120,
        Marketplace: -120,
        'Contact Us': -80
      };
      if (tourTypePosition[this.currentTour.type]) {
        return {
          bottom: `${tourTypePosition[this.currentTour.type]}px`
        };
      }
      return {};
    }
  }
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
/* .modal.left .modal-content {
  height: 530px;
} */
/* .modal.left .modal-body,
.modal.right .modal-body {
  height: 530px !important;
  overflow-y: auto;
  padding-bottom: 30px;
}
.modal.left .modal-body {
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
} */
.description-txt {
  padding: 5px 15px 15px 15px;
}
.btn-next-div {
  margin-top: 30px;
  margin-bottom: 25px;
}
.mr-16 {
  margin-right: 16px;
}
.custom-btn {
  width: 133px;
  margin-top: 8px;
}
.dashboard-heading {
  margin: 30px auto 22px auto;
}
.tour-title-text {
  color: #00518a;
  font-size: 24px;
}
.modal.left.in .modal-dialog {
  left: 275px;
}
.tour-icon {
  width: 28px;
  margin-top: -4px;
  margin-right: 12px;
}
.list-item {
  display: list-item;
  margin-right: 32px;
  margin-left: 48px;
}
.list-item >>> sup {
  top: -0.1em;
  font-size: 100%;
}
.list-item >>> ul li {
  margin: 12px 0;
  font-weight: 300;
  font-size: 16px;
  color: #4f4f4f;
  line-height: 22px;
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
  border: 0.5px solid #ffffff;
  margin: 0 4px;
}
.active-round-button {
  background: #ffffff;
}
.modal-footer {
  background: url('/static/images/icons/tour/tour_bg.svg') no-repeat;
  color: #ffffff;
  height: 90px;
  border-radius: 0 0 10px 10px;
}
.modal-footer .tour-status {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
@media screen and (max-width: 767px) {
  .modal-dashbrd {
    display: none !important;
  }
}
</style>
