<template>
  <div class="maintainence-banner" v-if="Object.keys(notification).length" v-bind:style="{ 'border-color': notification.color }">
    <div class="banner-container">
      <div class="content-box">
        <div>
          <img
            :src="`/static/images/banner-icon.png`"
            v-if="notification.logo_location"
          />
        </div>
        <div class="banner-content">
          <p class="banner-type" v-bind:style="{ color: notification.color }">{{ notification.header }}</p>
          <p class="banner-time">{{ getNotificationStartDate(notification) }}, {{ getNotificationStartTime(notification) }} to {{ getNotificationEndDate(notification) }}, {{ getNotificationEndTime(notification) }}</p>
          <p class="banner-message" id="banner-message">{{ notification.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getNotificationStartDate, getNotificationEndDate, getNotificationStartTime, getNotificationEndTime,
} from '../../utils/common';

export default {
  data() {
    return {};
  },
  props: ['notification'],
  methods: {
    getNotificationStartDate,
    getNotificationEndDate,
    getNotificationStartTime,
    getNotificationEndTime,
    getNotificationUrl(logo) {
      if (logo) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${logo}`;
      }
      return null;
    },
  },
};
</script>
<style scoped>
.maintainence-banner {
  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border-top: 10px;
  border-style: solid;
  border-width: 10px 0 0 0;
  margin: auto;
  display: inline-block;
}
.banner-container {
  padding: 20px 25px;
}

.content-box {
  display: flex;
  padding: 25px;
  justify-content: center;
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
}
@media screen and (max-width: 1200px) {
  .banner-content .banner-message.wd-600 {
    width: auto;
  }
}
</style>
