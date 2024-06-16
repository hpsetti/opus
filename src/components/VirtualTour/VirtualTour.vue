<template>
  <div>
    <div class="col-sm-12 col-xs-12 col-md-12">
    </div>
    <div class="col-sm-12 col-md-12 col-xs-12">
      <div class="virtual-tour-content mb-20">
        Walk through each feature using our guided tour
      </div>
      <BaseButton @click="openTour">
        <img
          class="preview-svg"
          src="/static/images/icons/virtual_tour_white_icon.svg"
          alt="Start a virtual tour"
        />
        <span>Start Tour</span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/event-bus';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  data() {
    return {};
  },
  methods: {
    openTour() {
      this.$emit('closepopup');
      this.emitter.emit('displayTour');
    }
  }
};
</script>

<style scoped>
.text_align_center {
  text-align: center;
}
.market_place_img {
  width: 18%;
  margin-top: 7%;
}
.cursor-pointer {
  cursor: pointer;
}
.tour-button {
  width: 185px;
  margin-top: 24px;
}
.tour-icon {
  padding-right: 15px;
  padding-bottom: 4px;
}
.start-tour {
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  font-family: Roboto;
}
.virtual-tour-content {
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
  width: 339px;
  margin-top: 1px;
  padding-left: 5px;
}
</style>
