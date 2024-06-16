<template>
  <div class="opus-notification">
    <div class="d-flex justify-content-between">
      <div class="d-flex notification-content">
        <div class="icon-container">
          <img
            class="opus-icon lg"
            :src="getNotificationIcon()"
            alt="Notification Icon"
          />
        </div>
        <div class="flex-grow">
          <div
            class="d-flex full-height flex-direction-column justify-content-center"
          >
            <div class="text-subtitle-1 blue-1 d-flex align-items-center">
              <span class=""
                >{{ notification.title }}
                <span
                  v-if="!notification.is_seen && screenWidth > 500"
                  class="ml-10 opus-tag green text-regular-xsmall black-2"
                  >New</span
                >
              </span>
            </div>
            <div class="text-regular-small">{{ notification.message }}</div>
            <span
              class="d-flex justify-content-between notification-action-container-xs"
              :class="
                notification.is_seen
                  ? 'justity-content-right'
                  : 'justify-content-between'
              "
              v-if="screenWidth <= 500"
            >
              <OpusTag
                v-if="!notification.is_seen"
                variant="green"
                style="max-width: 45px"
                >New</OpusTag
              >
              <span class="text-regular-small">
                {{ getDateFormat(notification.creation_date) }}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="action-container" v-if="screenWidth > 500">
        <div
          class="d-flex full-height flex-direction-column justify-content-between align-items-end"
        >
          <div class="text-regular-small">
            {{ getDateFormat(notification.creation_date) }}
          </div>
          <div
            v-if="canDismiss"
            class="text-subtitle-1 blue-3 cursor-pointer"
            @click="emitEvents"
            :data-testid="`dismiss-${notification.id}`"
          >
            Dismiss
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDateFormat } from '../../utils/common';
import OpusTag from '../UIComponents/OpusTag.vue';

export default {
  name: 'NotificationItem',
  components: { OpusTag },
  props: {
    notification: {
      type: Object,
      required: true
    },
    canDismiss: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      screenWidth: 0
    };
  },
  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },
  methods: {
    getDateFormat,
    async emitEvents() {
      await this.$emit('dismiss');
    },
    getNotificationIcon() {
      let type = this.notification.type.toLowerCase();
      if (this.notification.type === 'INSTRUCTOR_PRE_RECORDED_TRAINING') {
        type = 'instructor_training';
      }
      return `/static/images/dashboard/${type}.svg`;
    },
    onScreenResize() {
      window.addEventListener('resize', () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  }
};
</script>

<style>
.opus-notification {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  /* margin: 20px 35px 10px 35px; */
  margin: 20px 0;
}
.opus-notification .icon-container {
  padding: 24px;
}
.opus-notification .action-container {
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: right;
}

.notification-action-container-xs {
  margin-right: 24px;
  margin-bottom: 25px;
}

.opus-tag.green {
  background-color: rgba(76, 158, 69, 0.3);
  padding-left: 8px;
  padding-right: 8px;
}
</style>
