<template>
  <div class="row pl-15">
    <div class="col-xs-12 learning-header pl-0">Your certificate progress</div>
    <div v-if="hasProgress" class="row pl-15 pr-15 progress-container">
      <!-- E learning stuff -->
      <div
        v-if="this.eLearningLatesActivity"
        class="col-xs-12 col-md-6 mt-15 fw-300 course-status-card elt-card"
      >
        <div class="col-xs-12 p-0 flex-between border-bottom">
          <div class="col-xs-9 p-0 font-bold learning-card-header font-18">
            eLearning Courses
          </div>
          <div
            @click="viewAllProgress('eLearning')"
            class="col-xs-3 p-0 font-14 fw-300 link cursor-pointer view-all-progress"
          >
            view all progress
          </div>
        </div>
        <div class="col-xs-12 mt-10 pl-10 mb-15" v-if="eLearningLatesActivity">
          <div class="col-xs-9 pl-0 d-flex">
            <img
              class="eLearning-min-height"
              :src="getImageUrl(eLearningLatesActivity.status_icon_path)"
              alt=""
            />
            <div class="font-14 fw-300 pl-15">
              <div class="link">
                {{ eLearningLatesActivity.training_type }}
              </div>
              <div class="course-title">{{ eLearningLatesActivity.title }}</div>
            </div>
          </div>
          <div class="col-xs-3 col-sm-3 pr-0 font-14 fw-300">
            <div class="link">status</div>
            <div>
              {{
                statusMap[eLearningLatesActivity.course_status] ||
                eLearningLatesActivity.course_status
              }}
            </div>
            <div>
              {{
                formatToDateFormat(eLearningLatesActivity.last_updated_time)
              }}
            </div>
          </div>
        </div>
        <div v-else class="text-light-black text-center mt-50">
          <span> You have not purchased any eLearning courses. </span>
        </div>
      </div>
      <!-- Instructor lead stuff -->
      <div
        v-if="this.iltLatestActivity"
        class="col-xs-12 col-md-6 mt-15 fw-300 course-status-card ilt-card"
      >
        <div class="col-xs-12 p-0 flex-between border-bottom">
          <div class="font-bold learning-card-header font-18">
            Instructor Led Courses
          </div>
          <div
            @click="viewAllProgress('instructorLed')"
            class="font-14 fw-300 link cursor-pointer view-all-progress"
          >
            view all progress
          </div>
        </div>
        <div class="col-xs-12 mt-10 p-0 mb-15">
          <div class="col-xs-12 col-sm-12 pl-0 font-14 fw-300">
            <div class="link">Upcoming</div>
            <div
              class="upcoming-training"
              :class="[
                iltLatestActivity && iltLatestActivity.title
                  ? 'course-title'
                  : 'font-14 fw-300'
              ]"
            >
              {{
                iltLatestActivity
                  ? iltLatestActivity.title
                  : `You don't have any upcoming courses`
              }}
            </div>
          </div>
          <div
            v-if="iltLatestActivity"
            class="ilt-status-container col-xs-12 p-0 d-flex flex-wrap"
          >
            <div
              class="col-xs-12 col-sm-3 p-0 font-14 fw-300 mt-10 ilt-availability d-flex align-items-start"
            >
              <img src="/static/images/icons/lms/location.svg" alt="" />
              <div class="text-light-black ml-10">
                {{ iltLatestActivity ? iltLatestActivity.location : 'Online' }}
              </div>
            </div>
            <div
              class="col-xs-12 col-sm-9 p-0 font-14 fw-300 ilt-slotdate mt-5 d-flex align-items-center"
            >
              <img src="/static/images/icons/lms/calender.svg" alt="" />
              <div
                class="ml-10 text-light-black"
                v-if="
                  iltLatestActivity &&
                  iltLatestActivity.upcoming_booked_time_slot
                "
              >
                {{
                  formatDate(iltLatestActivity.upcoming_booked_time_slot.slot_start_time)
                }}
              </div>
              <div class="ml-10 text-light-black" v-else>N/A</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="col-xs-12 d-flex col-gap-20 align-items-center mt-15 pb-20"
    >
      <img
        class="no-learnings-image"
        :src="
          getImageUrl('/icons/LMS-icons/not_enrolled/Certificate 2/State 1.svg')
        "
        alt=""
      />
      <div>
        <div class="not-purchased no-data-color">
          Earn certificates in HF for Medical Technology
        </div>
        <div class="mt-10">
          <span class="no-data-color font-14">
            Take our training courses and work your way to a certification in
            <br />applying HF to Medical technology or Advanced HF in Medical
            Technology.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';

export default {
  props: {
    eLearningLatesActivity: {
      type: Object,
      default: null
    },
    iltLatestActivity: {
      type: Object,
      default: null
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      statusMap: {
        'Not Started': 'Enrolled',
        Incomplete: 'In progress'
      }
    };
  },
  computed: {
    hasProgress() {
      return this.eLearningLatesActivity || this.iltLatestActivity;
    }
  },
  methods: {
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    viewAllProgress(type) {
      this.$emit('viewAllProgress', type);
    },
    formatDate(value) {
      if (value) {
        return dayjs.utc(`${value}`).local().format('ddd MMM DD , YYYY');
      }
      return value;
    },
    formatToDateFormat(value) {
      if (value) {
        return dayjs.utc(`${value}`).local().format('MM/DD/YYYY');
      }
      return 'N/A';
    }
  }
};
</script>

<style scoped>
.progress-container {
  align-items: stretch;
  display: flex;
}
@media only screen and (max-width: 991px) {
  .progress-container {
    flex-wrap: wrap;
  }
}
@media only screen and (min-width: 991px) {
  .ilt-card {
    margin-left: 10px;
  }
}
.learning-header {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #000000;
  border-bottom: 1px solid #bdbdbd;
}
.course-status-card {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.view-all-progress {
  width: 110px;
  white-space: nowrap;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px 5px 0px;
}
.ilt-status-container {
  display: flex;
  align-items: center;
  width: 100%;
}
.border-bottom {
  border-bottom: 1px solid #d3d6d9;
}

.learning-card-header {
  color: #333333;
}

.link {
  color: #00518a;
  line-height: 19px;
}

.course-title {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}

.mt-5 {
  margin-top: 5px;
}
.eLearning-min-height {
  height: 66px;
  width: 66px;
}
.no-learnings-image {
  height: 80px;
}
.upcoming-training {
  line-height: 25px;
}
.not-purchased {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}
.no-data-color {
  color: #828282;
}
</style>
