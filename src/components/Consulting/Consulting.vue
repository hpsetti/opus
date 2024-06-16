<template>
  <div class="consulting-wrapper p-0">
    <div
      :class="[isAvailable ? '' : 'purchased']"
      class="consulting-container col-xs-12 p-0 pt-10 d-flex flex-wrap"
    >
      <div class="col-sm-6 col-md-6 p-0 d-flex title-container">
        <div class="icon-container d-flex">
          <img
            class="icon"
            src="/static/images/icons/consulting_item.svg"
            alt="consulting_item"
          />
        </div>
        <div class="details-container" :class="!isAvailable ? 'w-80' : ''">
          <div class="consulting-type">
            <span>Consulting</span>
          </div>
          <div class="consulting-title ellipsis-text">
            <span>
              {{ consultingData['title'] || consultingData.consulting_name }}
            </span>
          </div>
          <div
            v-if="isAvailable"
            class="consulting-time d-flex align-items-center mt-5"
          >
            <img src="/static/images/newMarketplace/clock.svg" />
            <span style="margin-left: 5px; margin-top: 3px">
              {{
                consultingData.duration_hours + consultingData.duration_type
              }}</span
            >
          </div>
        </div>
      </div>
      <template v-if="!isAvailable">
        <div
          class="col-xs-6 col-sm-2 col-md-2 p-0 d-flex align-items-center consulting-status"
        >
          <p class="consulting-status" :class="consulting.consulting_status">
            {{ consulting.consulting_status }}
          </p>
        </div>
        <!-- <div
          class="col-xs-6 col-sm-2 col-md-2 p-0 d-flex align-items-center consulting-modified-date"
        >
          <p class="requested_date">
            {{ consulting.modified_date | formatToHumanDate }}
          </p>
        </div> -->
      </template>
      <div
        :class="[isAvailable ? 'col-md-6' : 'col-md-2']"
        class="col-xs-12 col-sm-12 section actions-container p-0 d-flex flex-wrap"
      >
        <div
          class="col-xs-12 col-sm-6 col-md-12 d-flex p-0 justify-content-end price-info"
        >
          <template v-if="isAvailable">
            <span class="price-label">Price</span>
            <span class="price ml-20">${{ consultingData.price }}+</span>
          </template>
          <template v-else>
            <p class="requested_date">
              {{ formatToHumanDate(consulting.modified_date) || consulting.modified_date  }}
            </p>
          </template>
        </div>
        <div
          class="col-xs-12 col-sm-6 col-md-12 d-flex p-0 justify-content-end actions align-items-center flex-wrap"
        >
          <div class="action">
            <span
              class="view-details cursor-pointer"
              @click="ScheduleConsulting"
              >View Details</span
            >
          </div>
          <div v-if="isAvailable" class="action">
            <BaseButton class="ml-15" @click="requestQuote">
              <span>{{ isCompleted ? 'Repurchase' : 'Request quote' }}</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import BaseButton from '../UIComponents/BaseButton.vue';

export default {
  name: 'ConsultingCard',
  props: {
    consulting: {
      type: Object,
      required: true
    }
  },
  components: { BaseButton },
  data() {
    return {};
  },
  computed: {
    consultingData() {
      if (this.consulting.modified_date)
        return this.consulting.consulting_basic_details_dto;
      return this.consulting;
    },
    isAvailable() {
      return !this.isModified || this.isCompleted;
    },
    isModified() {
      return this.consulting.modified_date;
    },
    isCompleted() {
      return this.consulting.completed_date;
    }
  },
  methods: {
    formatToHumanDate(date) {
      return dayjs(date).format('Do MMM YYYY');
    },
    requestQuote() {
      this.$emit('request-quote', this.consulting);
    },
    ScheduleConsulting() {
      const urlName = this.consultingData.consulting_name
        .trim()
        .replace(/[^a-zA-Z0-9- ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();
      this.$router.push({
        path: `/schedule-consulting/${urlName}`,
        query: { consultingId: this.consultingData.consulting_id }
      });
    }
  }
};
</script>
<style scoped>
.flex-wrap {
  flex-wrap: wrap;
}
.consulting-container {
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  padding-left: 12px;
  padding-right: 16px;
  padding-bottom: 10px;
}
.consulting-container .icon-container .icon {
  width: 75px;
  height: 75px;
}
.section {
  padding-left: 10px;
}
.section.details-container {
  align-items: center;
}
.section.actions-container {
  align-content: space-between;
}

.purchased .title-container {
  width: 60%;
}

.purchased .actions-container,
.purchased .consulting-status {
  width: 20%;
}

.purchased .consulting-status p {
  width: unset;
}
.details-container .consulting-type {
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #0b3c61;
}
.details-container .consulting-title {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #0b3c61;
}
.details-container .consulting-time {
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.7);
}
.actions-container .view-details {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #00518a;
}
.actions-container .price {
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}
.actions-container .price-label {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}
.actions-container .quote {
  padding: 5px 32px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: white;
}
.consulting-status {
  padding: 1px 8px;
  border-radius: 2px;
}
.consulting-status.Requested {
  background: rgba(255, 211, 98, 0.3);
}
.consulting-status.Inprogress {
  background: rgba(236, 141, 37, 0.3);
}
.consulting-status.Completed {
  background: rgba(76, 158, 69, 0.3);
}
.requested_date {
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}
/*MEDIA QUERIES*/
@media screen and (max-width: 768px) {
  .title-container {
    flex-wrap: wrap;
  }
  .consulting-container {
    padding: 20px;
  }
  .icon-container,
  .actions,
  .price-info {
    justify-content: center;
  }
  .details-container {
    margin-bottom: 20px;
  }

  .actions-container {
    border-top: 1px solid #efefef;
    padding-bottom: 10px;
    padding-top: 10px;
    border-radius: 5px;
  }
  .action {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .consulting-modified-date {
    justify-content: flex-end;
    margin-top: 20px;
  }
  .consulting-status {
    margin-top: 10px;
  }
}
.consulting-container.purchased .action {
  margin-bottom: 4px;
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .actions-container .price-info {
    justify-content: flex-start;
  }
  .actions-container {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #efefef;
  }
}

@media screen and (min-width: 768px) {
  .ellipsis-text {
    white-space: unset;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  .details-container {
    margin-left: 20px;
  }
}

@media screen and (max-width: 800px) {
  .title-container {
    width: 100%;
    flex-wrap: unset;
  }
  .details-container {
    margin-left: 20px;
    width: 100%;
  }

  .price-info {
    justify-content: flex-end;
  }

  .actions {
    justify-content: flex-end;
    flex-direction: row;
    flex-wrap: unset;
  }

  .action {
    width: unset;
  }
}
</style>
