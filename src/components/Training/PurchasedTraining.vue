<template>
  <div class="training-container justify-content-between col-xs-12 p-10">
    <div
      class="training--contents-container d-flex align-items-center col-gap-30"
    >
      <div
        class="col-xs-12 col-sm-12 col-md-5 p-0 d-flex align-items-center name-container"
      >
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
              <div
                class="d-flex align-items-center white-space"
                v-if="isILT && !isPrerec"
              >
                <img
                  class="preview-svg"
                  src="/static/images/icons/lms/location.svg"
                  alt=""
                />
                <span>{{ training.training_location }}</span>
              </div>
              <div
                class="d-flex align-items-center white-space"
                v-else-if="!isPrerec && !training.qna_consulting"
              >
                <img
                  class="preview-svg"
                  src="/static/images/newMarketplace/book.svg"
                  alt=""
                />
                <span>
                  {{ training.course_count || 1 }}
                  {{ training.course_count > 1 ? "courses" : "course" }}
                </span>
              </div>
              <div
                class="d-flex align-items-center white-space"
                v-if="!training.qna_consulting"
              >
                <img
                  class="preview-svg"
                  src="/static/images/newMarketplace/clock.svg"
                  alt=""
                />
                <span class="font-14 fw-300">
                  {{
                    isILT
                      ? `${training.duration_hours} Hours`
                      : `${training.duration_minutes} Minutes`
                  }}
                </span>
              </div>
              <div
                v-if="isILT && !isPrerec"
                class="font-14 fw-300 d-flex align-items-center white-space"
              >
                <img
                  class="preview-svg"
                  src="/static/images/icons/lms/calender.svg"
                  alt=""
                />
                {{ formatToLocalDate(getTimeSlotFromTraining(training)) }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="p-0 d-flex justify-content-start status-container mr-20">
            <span v-if="!isILT && training.deep_link" class="text-primary">
              {{ statusMap[training.course_status] || training.course_status }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="training-detail-actions">
      <div class="d-flex expiry-card">
        <div class="p-0 d-flex justify-content-start status-container mr-20">
          <span
            v-if="isPrerec || training.training_type !== 'Instructor Led'"
            class="white-space"
          >
            <div
              class="pr-15 pb-15 xs-hide-content-650"
              v-if="training.expiry_days > 90"
            >
              <p class="text-regular-large">
                Expires:
                {{ formatPurchaseDate(training.expiry_date) }}
              </p>
            </div>
            <div
              class="pr-15 pb-15 xs-hide-content-650"
              v-else-if="
                training.expiry_days <= 90 && training.expiry_days > 10
              "
            >
              <p class="text-regular-large orange-bg2 expiry-box">
                Expires: {{ training.expiry_days }} days
              </p>
            </div>
            <div
              class="pr-15 pb-15 xs-hide-content-650"
              v-else-if="training.expiry_days <= 10 && training.expiry_days > 1"
            >
              <p class="text-regular-large red-bg1 expiry-box white-1">
                Expires: {{ training.expiry_days }} days
              </p>
            </div>
            <div
              class="pr-15 pb-15 xs-hide-content-650"
              v-else-if="training.expiry_days == 1"
            >
              <p class="text-regular-large red-bg1 expiry-box white-1">
                Expires: {{ training.expiry_days }} day
              </p>
            </div>
          </span>
          <!-- {{ training.training_type }} -->
        </div>
        <div
          class="white-space w-120"
          :class="{
            'pb-50': training.training_type === 'Instructor Led',
            'pb-20': training.training_type != 'Instructor Led',
            'mb-30': training.training_type === 'Certificate',
          }"
        >
          {{ formatPurchaseDate(training.purchase_date) }}
        </div>
      </div>
      <div class="d-flex">
        <div
          class="d-flex align-items-end justify-content-end details--container pr-10"
        >
          <div v-if="isILT || isPrerec">
            <span
              @click="viewIlt(training.course_id, training.plan_id)"
              class="text-button-label blue-3 cursor-pointer"
              >View Details</span
            >
          </div>
          <div v-else>
            <span
              @click="viewElearning(training)"
              class="text-button-label blue-3 cursor-pointer"
              >View Details</span
            >
          </div>
        </div>
        <div
          class="p-0 align-items-center justify-content-end play-btn--container"
        >
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div
              v-if="training.deep_link"
              :class="[
                training.course_status === 'Incomplete'
                  ? 'continue-button'
                  : 'bg-emergo-green text-white',
              ]"
              class="d-flex align-items-center col-gap-10 pr-15 pl-15 pt-5 cursor-pointer play-button font-18"
              @click="playTraining(training)"
            >
              <img
                class="play-icon"
                :src="
                  training.course_status === 'Incomplete'
                    ? '/static/images/icons/lms/play_blue.svg'
                    : '/static/images/icons/play.svg'
                "
              />
              <span>{{
                training.course_status === "Incomplete"
                  ? "Continue"
                  : "Play course"
              }}</span>
            </div>
            <div v-if="training.deep_link_text">
              <BaseButton
                v-if="training.course_status === 'Incomplete'"
                variant="secondary"
                has-icon
                @click="playTraining(training)"
              >
                <img
                  class="play-icon"
                  src="/static/images/icons/lms/play_blue.svg"
                />
                Continue
              </BaseButton>
              <BaseButton
                v-else
                variant="primary"
                has-icon
                @click="playTraining(training)"
              >
                <img
                  class="play-icon"
                  src="/static/images/icons/lms/play.svg"
                />
                Play course
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import BaseButton from "../UIComponents/BaseButton.vue";
dayjs.extend(utc);

export default {
  name: "PurchasedTraining",
  props: ["account_id", "userId", "training"],
  components: { BaseButton },
  data() {
    return {
      statusMap: {
        "Not Started": "Enrolled",
        Incomplete: "In progress",
      },
      trainingTypeClass: {
        eLearning: "eLearning",
        "Instructor Led": "instructorLed",
      },
    };
  },
  computed: {
    isPrerec() {
      return (
        this.training.plan_type === "Instructor Led" &&
        this.training.training_type === "Pre-recorded course"
      );
    },
    isILT() {
      return this.training.plan_type === "Instructor Led";
    },
    expiryDays() {
      if (!this.isPrerec) return -1;
      return this.training.expiry_days;
    },
  },
  methods: {
    formatToLocalDate(value) {
      console.log('value', value);
      if (value) {
        return dayjs
          .utc(`${value}`)
          .local()
          .format("ddd MMM DD , YYYY");
      }
      return "";
    },
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return dayjs(formattedDateArray).format("D MMM YYYY");
      }
      return "";
    },
    getImageUrl(training) {
      let filePath = "";
      if (training.plan_type === "Instructor Led") {
        filePath = training.blob_course_icon_url;
      } else if (training.plan_type === "Consulting") {
        filePath = training.image_path;
      } else {
        filePath = training.status_icon_path;
      }
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    getTimeSlotFromTraining(training) {
      if (training.booked_time_slot)
        return training.booked_time_slot.slot_start_time;
      if (training.upcoming) return training.upcoming.slot_start_time;
      return "More dates coming soon";
    },
    getTrainingType(training) {
      if (training.plan_type) return training.plan_type;
      if (training.training_type === "Course") return "eLearning";
      if (training.training_type === "Certificate") return "Certificate";
      return "Course";
    },
    playTraining(training) {
      if (training.deep_link) {
        window.open(training.deep_link);
      }
    },
    viewElearning(details) {
      this.$emit("setElearning", details);
    },
    viewIlt(courseId, planId) {
      const urlName = this.training.title.replace(/ /g, "-").toLowerCase(); // Making url more understandable for publically publishing url's
      localStorage.setItem("scheduleTrainingId", JSON.stringify(courseId));
      localStorage.setItem("schedulePlanId", JSON.stringify(courseId));
      this.$router.push({
        path: `/trainings/schedule-training/${urlName}`,
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
  /* flex-wrap: wrap; */
  align-items: stretch;
  word-wrap: break-word;
}

.training--contents-container {
  width: 66%;
}

.name-container {
  width: 78%;
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

/* .status-container {

} */
.text-white {
  color: white;
}
.details--container {
  width: fit-content;
}
.play-btn--container {
  width: 170px;
  margin-right: 7px;
}
.play-button {
  font-weight: 600;
  border-radius: 5px;
  padding-bottom: 5px;
  width: 158px;
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

.training-detail-actions {
  align-self: flex-end;
  margin-bottom: 2px;
}
.time-container {
  white-space: nowrap;
}

@media screen and (max-width: 850px) {
  .name-container {
    width: fit-content;
  }
  .training-container {
    flex-direction: column;
  }

  .training-detail-actions {
    justify-content: flex-end;
  }
}

@media screen and (max-width: 550px) {
  .time-container {
    white-space: unset;
  }
}

@media screen and (max-width: 500px) {
  .ilt-purchased-details {
    row-gap: 10px;
    display: flex;
    align-items: flex-start;
  }
  .training--contents-container {
    width: unset;
    margin-bottom: 10px;
  }
}
</style>
