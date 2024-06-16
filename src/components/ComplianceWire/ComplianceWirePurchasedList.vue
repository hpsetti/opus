<template>
  <div class="training-container col-xs-12 p-10">
    <div class="col-xs-12 col-sm-12 col-md-7 p-0 d-flex align-items-center">
      <img
        class="training-img"
        :class="trainingTypeClass[training.plan_type]"
        :src="getImageUrl(training)"
        alt=""
      />
      <div
        :class="trainingTypeClass[training.plan_type]"
        class="d-flex col-xs-12 col-sm-12 flex-direction-column training-title"
      >
        <div class="text-primary fw-300 mb-5">
          {{ !isPrerec ? training.plan_type : training.training_type }}
        </div>
        <div class="text-primary font-bold mb-5">
          <span>{{ training.title }}</span>
        </div>
        <div class="text-light-black mb-5">
          <div class="font-14 fw-300 d-flex align-items-center col-gap-30">
            <div class="d-flex align-items-center">
              <img
                class="preview-svg"
                src="/static/images/icons/lms/location.svg"
                alt=""
              />
              <span>{{ training.training_location }}</span>
            </div>
            <div class="d-flex align-items-center">
              <img
                class="preview-svg"
                src="/static/images/newMarketplace/clock.svg"
                alt=""
              />
              <span class="font-14 fw-300">
                {{ training.duration_hours }} Hours
              </span>
            </div>
            <div
              class="font-14 fw-300 d-flex align-items-center"
            >
              <img
                class="preview-svg"
                src="/static/images/icons/lms/calender.svg"
                alt=""
              />
              {{ getTimeSlotFromTraining(training) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div
        class="col-xs-12 col-sm-12 col-md-2 pt-10 pb-10 d-flex align-items-end justify-content-end flex-grow"
      >
        <div>
          <span
            @click="viewIlt(training.course_id, training.plan_id)"
            class="text-button-label blue-3 cursor-pointer"
            >View Details</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';

export default {
  name: 'PurchasedTraining',
  props: ['account_id', 'userId', 'training'],
  components: { },
  data() {
    return {
      statusMap: {
        'Not Started': 'Enrolled',
        Incomplete: 'In progress',
      },
      trainingTypeClass: {
        eLearning: 'eLearning',
        'Instructor Led': 'instructorLed',
      },
    };
  },
  computed: {
    isPrerec() {
      return (
        this.training.plan_type === 'Instructor Led'
        && this.training.training_type === 'Pre-recorded course'
      );
    },
    isILT() {
      return this.training.plan_type === 'Instructor Led';
    },
    expiryDays() {
      if (!this.isPrerec) return -1;
      return this.training.expiry_days;
    },
  },
  methods: {
    formatToLocalDate(value) {
      if (value) {
        return dayjs
          .utc(`${value}`)
          .local()
          .format('ddd MMM DD , YYYY');
      }
      return '';
    },
    getImageUrl(training) {
      let filePath = '';
      if (training.plan_type === 'ComplianceWire Training') {
        filePath = training.blob_course_icon_url;
      }
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    dateConvert(time) {
      const newTime = dayjs.utc(`${time.slot_start_time}`).format('MMM DD');
      const newTime2 = dayjs.utc(`${time.slot_end_time}`).format('MMM DD');
      const newTime3 = dayjs.utc(`${time.slot_end_time}`).format('YYYY');
      const newTime4 = dayjs.utc(`${time.slot_start_time}`).format('hh A');
      const newTime5 = dayjs.utc(`${time.slot_end_time}`).format('hh A');
      const fullTime = `${newTime}-${newTime2}, ${newTime3} ${newTime4} to ${newTime5} ET`;
      return fullTime;
    },
    getTimeSlotFromTraining(training) {
      if (training.booked_time_slot) {
        return this.dateConvert(training.booked_time_slot);
      }
      if (training.upcoming) return training.upcoming.slot_start_time;
      return 'More dates coming soon';
    },
    getTrainingType(training) {
      if (training.plan_type) return training.plan_type;
      if (training.training_type === 'Course') return 'eLearning';
      if (training.training_type === 'Certificate') return 'Certificate';
      return 'Course';
    },
    playTraining(training) {
      if (training.deep_link) {
        window.open(training.deep_link, '_blank');
      }
    },
    viewIlt(courseId, planId) {
      const urlName = this.training.title.replace(/®/g, '').replace(/ /g, '-').toLowerCase();
      localStorage.setItem('scheduleTrainingId', JSON.stringify(courseId));
      localStorage.setItem('schedulePlanId', JSON.stringify(courseId));
      this.$router.push({
        path: `/compliancewire-marketplace/details/${urlName}`,
        query: { planId },
      });
    },
  },
};
</script>
<style scoped>
.training-container {
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  word-wrap: break-word;
}
.training-img {
  /* object-fit: cover; */
  border-radius: 5px;
  height: 85px;
  width: 85px;
}
/* .training-img.eLearning {
  width: 56px;
  height: 56px;
  margin-left: 6px;
}
.training-img.instructorLed {
  width: 66px;
  height: 66px;
} */
.text-white {
  color: white;
}
.play-button {
  font-weight: 600;
  border-radius: 5px;
  padding-bottom: 5px;
}
/* .play-icon {
  height: 35px;
  padding-right: 10px;
} */
.continue-button {
  color: #0b3c61;
  border: 1px solid #0b3c61;
}
.training-title.eLearning {
  padding-left: 19px;
}
</style>
