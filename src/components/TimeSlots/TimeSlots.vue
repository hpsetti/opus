<template>
  <div class="content-wrappper">
    <div class="h-100">
      <OpusBreadCrumb class="mb-10" variant="sm" @click="navigateToLaunchPad"
        >Launchpad</OpusBreadCrumb
      >
      <div class="ml-20 text-h3">Time Slots</div>
      <div class="col-xs-12 mt-10 p-0 ml-10">
        <div class="col-xs-12 col-md-4">
          <label>Training name</label>
          <multiselect
            :showLabels="false"
            :close-on-select="true"
            :allow-empty="false"
            :searchable="false"
            class="multiselect-single-dropdown"
            v-model="selectedCounrseId"
            placeholder="Select course"
            :show-labels="false"
            :options="iltCoursesList.map((course) => course.course_id)"
            :custom-label="
              (opt) => iltCoursesList.find((x) => x.course_id === opt).title
            "
            @select="getSlotsList"
          ></multiselect>
        </div>
        <div class="col-xs-12 col-sm-5 col-md-3">
          <label>Start Date And Time</label>
          <date-picker
            v-model:value="startTime"
            type="datetime"
            lang="en"
            value-type="format"
            :format="UTCFormat"
            placeholder="Select start Date And time"
            :disabled-date="notBeforeTodayAfterEndDate"
            :disabled-time="notBeforeTimeAfterEndTime"
            :default-value="defaultStartTime"
            :editable="false"
            @change="selectedStartDate()"
          ></date-picker>
        </div>
        <div class="col-xs-12 col-sm-5 col-md-3">
          <label>End Date And Time</label>
          <date-picker
            v-model:value="endTime"
            type="datetime"
            :editable="false"
            lang="en"
            value-type="format"
            :format="UTCFormat"
            :disabled="disableEndDate"
            :disabled-date="notBeforeStartDate"
            :disabled-time="notBeforeStartTime"
            :default-value="defaultEndTime"
            placeholder="Select End Date And Time"
          >
          </date-picker>
        </div>
        <div class="col-xs-12 col-sm-2 mt-25 xs-text-right">
          <button
            @click="addNewTimeSlot"
            class="emergo-green-button text-nowrap"
            :class="{
              'gray-cover': !startTime || !endTime || !selectedCounrseId
            }"
            :disabled="!startTime || !endTime || !selectedCounrseId"
          >
            Add <span class="sm-hide">New Slot</span>
          </button>
        </div>
      </div>
      <div class="col-xs-12 mt-20 table-wrapper">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Training Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slot in timeSlotsList" :key="slot.slot_id">
              <td>{{ courseListWithIds[selectedCounrseId] }}</td>
              <td>{{ formatDateToLocalStandard(slot.slot_start_time) || slot.slot_start_time }}</td>
              <td>{{ formatDateToLocalStandard(slot.slot_end_time) || slot.slot_end_time }}</td>
              <td>
                <button
                  @click="deleteSlot(slot.slot_id)"
                  class="danger-btn font-500"
                  :class="[slot.deletable ? 'deletable' : 'not-deletable']"
                  :disabled="!slot.deletable"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="col-xs-12 mt-20 text-center no-data-text font-22 fw-700"
        v-if="!selectedCounrseId"
      >
        Please select a course to view the available slots
      </div>
      <div
        class="col-xs-12 text-center no-data-text font-22 fw-700"
        v-else-if="selectedCounrseId && !timeSlotsList.length && !loaderStatus"
      >
        No Slots available for selected training
      </div>
    </div>
    <confirm-slot-delete-modal
      :selectedSlotId="selectedSlotId"
      @closeDeleteSlot="closeDeleteSlotModal"
    ></confirm-slot-delete-modal>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import Multiselect from 'vue-multiselect';
import DatePicker from 'vue-datepicker-next';
import OpusBreadCrumb from '../UIComponents/OpusBreadCrumb.vue';
import ConfirmSlotDeleteModal from './ConfirmSlotDeleteModal.vue';
import Loader from '../UIComponents/Loader.vue';
import {
  getInstructorTrainingList,
  getTimeSlortForCourseId,
  addNewTimeSlotForSelectedCourseId
} from '../../apis/instructorLedTraining';

export default {
  data() {
    return {
      loaderStatus: false,
      selectedCounrseId: null,
      courseListWithIds: {},
      startTime: '',
      endTime: '',
      timeSlotsList: [],
      iltCoursesList: [],
      UTCFormat: 'YYYY-MM-DD HH:mm',
      dateCheckFormat: 'YYYY-MM-DD',
      timeCheckFormat: 'YYYY-MM-DD HH:mm',
      defaultEndTime: '',
      defaultStartTime: '',
      selectedSlotId: null
    };
  },
  components: {
    Multiselect,
    DatePicker,
    Loader,
    ConfirmSlotDeleteModal,
    OpusBreadCrumb
  },
  async created() {
    this.loaderStatus = true;
    await this.getCoursesList();
    this.loaderStatus = false;
  },
  computed: {
    disableEndDate() {
      if (this.startTime) return false;
      return true;
    }
  },
  methods: {
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    formatDateToLocalStandard(value) {
      if (value) {
        return dayjs.utc(`${value}`).local().format('YY-MM-DD hh:mm A');
      }
      return value;
    },
    async getCoursesList() {
      this.iltCoursesList = await getInstructorTrainingList();
      this.courseListWithIds = this.iltCoursesList.reduce((acc, value) => {
        acc[value.course_id] = value.title;
        return acc;
      }, {});
    },
    async getSlotsList(selectedOption) {
      this.loaderStatus = true;
      this.timeSlotsList = await getTimeSlortForCourseId(selectedOption);
      this.loaderStatus = false;
    },

    // For End Date previous Dates Disable
    notBeforeStartDate(date) {
      return (
        dayjs(date).format(this.dateCheckFormat) <
        dayjs(this.startTime).format(this.dateCheckFormat)
      );
    },

    //  For disabling the times which are before startDateTime
    notBeforeStartTime(date) {
      return (
        dayjs(date).format(this.timeCheckFormat) <=
        dayjs(this.startTime).format(this.timeCheckFormat)
      );
    },

    notBeforeTimeAfterEndTime(date) {
      if (this.endTime) {
        return (
          dayjs(date).format(this.timeCheckFormat) <=
            dayjs().format(this.timeCheckFormat) ||
          dayjs(date).format(this.timeCheckFormat) >=
            dayjs(this.endTime).format(this.timeCheckFormat)
        );
      }
      return (
        dayjs(date).format(this.timeCheckFormat) <=
        dayjs().format(this.timeCheckFormat)
      );
    },

    notBeforeTodayAfterEndDate(date) {
      if (this.endTime) {
        return (
          dayjs(date).format(this.dateCheckFormat) <
            dayjs().format(this.dateCheckFormat) ||
          dayjs(date).format(this.dateCheckFormat) >
            dayjs(this.endTime).format(this.dateCheckFormat)
        );
      }
      return (
        dayjs(date).format(this.dateCheckFormat) <
        dayjs().format(this.dateCheckFormat)
      );
    },
    selectedStartDate() {
      if (this.startTime) {
        this.defaultEndTime =
          dayjs(dayjs(this.startTime).format(this.UTCFormat)).valueOf() +
          1000 * 61;
      } else if (!this.startTime) {
        this.endTime = '';
        this.defaultStartTime = this.createDefaultStartTime();
      }
    },
    createDefaultStartTime() {
      return dayjs(dayjs().format(this.UTCFormat)).valueOf() + 1000 * 60;
    },
    async addNewTimeSlot() {
      this.loaderStatus = true;
      const payload = {
        course_id: this.selectedCounrseId,
        start_time: dayjs(dayjs(this.startTime).toLocaleString())
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        end_time: dayjs(dayjs(this.endTime).toLocaleString())
          .utc()
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      };
      const response = await addNewTimeSlotForSelectedCourseId(payload);
      this.loaderStatus = false;
      if (response.status_code === 200) {
        this.startTime = '';
        this.endTime = '';
        this.$notify({
          type: 'success',
          title: 'Success',
          text: `${response.data}`
        });
        this.getSlotsList(this.selectedCounrseId);
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: `${response.message}`
        });
      }
    },
    deleteSlot(slotId) {
      this.selectedSlotId = slotId;
      $('#delete-slot-modal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    closeDeleteSlotModal() {
      $('#delete-slot-modal').modal('hide');
      this.getSlotsList(this.selectedCounrseId);
    }
  }
};
</script>

<style>
.h-100 {
  height: 100vh;
}

.grayout {
  opacity: 0.5;
}

.list-header {
  border-bottom: 1px dashed #ccc;
}

.mt-25 {
  margin-top: 25px;
}

.slot-item {
  padding: 20px 15px 20px 15px;
  border-bottom: 1px dashed #ccc;
}

.table-wrapper > .table > thead > tr > th {
  font-weight: bold !important;
}

.table-wrapper > .table thead {
  background-color: #fff;
}

tbody > tr:hover {
  cursor: pointer;
}

.table-wrapper > .table > tbody > tr > td {
  padding: 10px 7px 10px 7px !important;
}

.danger-btn {
  color: #dc3545;
  background-color: transparent;
  border: 1px solid #dc3545;
  padding: 5px;
  border-radius: 5px;
  min-width: 100px;
}

.deletable:hover {
  background: #dc3545;
  color: #fff;
}

.not-deletable {
  opacity: 0.5;
}

/* .danger-btn.grayout:hover {
  background: #fff;
  color: #dc3545;
} */

.gray-cover {
  opacity: 0.5;
}

@media screen and (max-device-width: 450px) {
  .xs-text-right {
    text-align: right;
  }
}

@media screen and (min-device-width: 450px) and (max-device-width: 1023px) {
  .sm-hide {
    display: none;
  }
}
</style>
