<template>
  <div id="maintainence-banner" class="maintainence-banner">
    <div class="banner-container">
      <div class="align-right pb-20">
        <img
          src="/static/images/icons/close_icon.svg"
          alt
          class="cursor-pointer"
          @click="setBannerStatus"
        />
      </div>
      <div class="content-box">
        <div class="banner-content">
          <div
            class="col-xs-12 p-0 d-flex col-gap-20 align-items-center xs-flex-column"
          >
            <img
              class="training-img"
              src="/static/images/tools/tool_available.svg"
              alt=""
            />
            <div class="col-xs-12 p-0">
              <div class="fw-300 text-primary mb-5 justify-content-between">
                <div class="tool-heading">New Tool</div>
              </div>
              <div class="title mb-10">Root Cause Analysis Wizard</div>
              <div class="tool-desc mb-10">
                <p>Save time identifying and writing root causes</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-4 col-md-5 p-0 d-flex flex-direction-column justify-content-center"
        >
          <div>
            <div class="col-xs-12 d-flex pl-0 justify-end mb-10 col-gap-20">
              <span class="font-18 fw-700">Price</span>
              <span class="text-strike tool-price"
                >${{
                  notification.tools_details_dto.discount.price_before_discount
                }}</span
              >
            </div>
            <div class="col-xs-12 d-flex pl-0 justify-end mb-10 col-gap-20">
              <span class="font-18 fw-700">Promotional Price</span>
              <span class="tool-price"
                >${{ notification.tools_details_dto.price }}</span
              >
            </div>
            <p class="tool-desc">
              Available until
              {{
                formatedDate(notification.tools_details_dto.discount.discount_valid_till)||notification.tools_details_dto.discount.discount_valid_till
                
              }}
            </p>
          </div>
          <div
            class="col-xs-12 d-flex col-gap-20 xs-flex-column justify-content-end align-items-center pl-0 cursor-pointer price"
          >
            <!-- For All Non Purchased items -->
            <div>
              <div>
                <button
                  class="br-20 d-flex align-items-center col-gap-10 emergo-green-button"
                  @click="goToolsPage"
                >
                  <span>Try Free version now</span>
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
import dayjs from 'dayjs';
import { getPricingCounter } from '../../apis/dashboard';

export default {
  data() {
    return {
      counter: 0
    };
  },
  props: ['notification'],
  methods: {
    async goToolsPage() {
      this.$router.push('/tools/root-cause-analysis-wizard');
    },
    formatedDate(value) {
      if (value) {
        let [, month, date] = value;
        if (value[1] < 10) month = `0${value[1]}`;
        if (value[2] < 10) date = `0${value[2]}`;
        const actualDate = dayjs(`${value[0]}-${month}-${date}`).format(
          'MMM YYYY'
        );
        return actualDate;
      }
      return '';
    },
    async getPricingCounter() {
      const userId = JSON.parse(localStorage.getItem('userId'));
      await getPricingCounter(userId);
    },
    async setBannerStatus() {
      this.getPricingCounter();
      $('#maintainence-banner').hide();
    }
  }
};
</script>
<style scoped>
.tool-heading {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #4c9e45;
}
.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
}
.tool-desc {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  margin-right: 10px;
}
.tool-price {
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
}
.maintainence-banner {
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border-top: 10px;
  border-style: solid;
  border-width: 10px 0 0 0;
  border-color: #4b9e45;
  display: inline-block;
}
.banner-container {
  padding: 20px 25px;
}
.training-img {
  height: 85px;
  width: 85px;
  object-fit: cover;
  border-radius: 5px;
}
.flex-50 {
  flex: 0 0 65%;
}

.content-box {
  display: flex;
  padding: 0;
  justify-content: left;
}

.banner-content {
  text-align: left;
  padding-left: 22px;
}

.banner-content .banner-type {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 5px 0;
  font-family: Roboto;
}

.banner-content .banner-time {
  font-size: 22px;
  margin: 0 0 5px 0;
  font-family: Roboto;
  line-height: 22px;
}

.banner-content .banner-message {
  font-size: 16px;
  margin: 0;
  color: #4f4f4f;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
}
.banner-content .banner-message.wd-500 {
  width: 500px;
}
.banner-content .banner-message.wd-600 {
  width: 600px;
}
.banner-message:first-letter,
.banner-type:first-letter {
  text-transform: capitalize;
}

.maintainence-banner .logo-box {
  border-radius: 4px;
  transform: rotate(45deg);
  min-width: 50px;
  height: 50px;
  max-width: 50px;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.maintainence-banner .logo-box img {
  transform: rotate(-45deg);
  width: 30px;
  height: 30px;
  display: block;
  margin: auto;
}

@media screen and (max-width: 767px) {
  .banner-container {
    padding: 20px;
  }

  .content-box {
    padding: 0;
  }
  .banner-content .banner-message.wd-500 {
    width: auto;
  }
  .training-img {
    width: 100%;
    height: 100%;
  }
  .maintainence-banner {
    width: 100%;
    margin-left: 0px;
  }
}
@media screen and (max-width: 1200px) {
  .banner-content .banner-message.wd-600 {
    width: auto;
  }
}
</style>
