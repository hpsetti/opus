<template>
  <div v-if="projectDetails">
    <div class="col-xs-12 mt-20 p-0">
      <div class="col-xs-12 search-header">
        <div
          class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 pl-20"
          @click="navigateToLaunchPad"
        >
          <img
            class="back-img cursor-pointer"
            src="/static/images/icons/back_arrow.svg"
            alt=""
          />
          <p class="text-subtitle-2 blue-1 pt-10" to="/launchpad">
            Consulting Hours
          </p>
        </div>
        <div>
          <div class="row pl-20">
            <div class="col-xs-10">
              <p class="text-h5">{{ projectDetails.project_name }}</p>
            </div>
            <div
              class="col-xs-2 d-flex cursor-pointer"
              @click="editProject(projectId)"
            >
              <img
                class="back-img"
                src="/static/images/consulting/edit.svg"
                alt=""
              />
              <p class="text-subtitle-1 pt-10 pl-5 blue-3">Edit</p>
            </div>
          </div>
          <div class="row pl-20">
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">
                Device Type<span>: </span>
              </p>
              <p class="col-xs-10 text-regular-large pl-60">
                {{ projectDetails.device_type }}
              </p>
            </div>
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">User<span>: </span></p>
              <p class="col-xs-10 text-regular-large pl-60">
                {{ projectDetails.user_name }}
              </p>
            </div>
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">
                Email<span>: </span>
              </p>
              <p class="col-xs-10 text-regular-large pl-60">
                {{ projectDetails.email_address }}
              </p>
            </div>
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">
                Company<span>: </span>
              </p>
              <p class="col-xs-10 text-regular-large pl-60">
                {{ projectDetails.company_name }}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div class="row pl-20">
            <div class="col-xs-10">
              <p class="text-h4">Project Info</p>
            </div>
          </div>
          <div class="row pl-20">
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">Type<span>: </span></p>
              <p class="col-xs-10 text-regular-large pl-60">
                {{ projectDetails.consulting_type }}
              </p>
            </div>
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">
                Service<span>: </span>
              </p>
              <p class="col-xs-10 text-regular-large pl-60">
                {{ projectDetails.consulting_name }}
              </p>
            </div>
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">
                Requested Date<span>: </span>
              </p>
              <p class="col-xs-10 text-regular-large pl-60">{{ startTime }}</p>
            </div>
            <div class="col-xs-12 d-flex">
              <p class="col-xs-2 text-button-label pl-0">
                Last modified<span>: </span>
              </p>
              <p class="col-xs-10 text-regular-large pl-60">{{ endTime }}</p>
            </div>
            <div class="col-xs-12">
              <p class="text-button-label pl-0">
                Other details:<span>: </span>
              </p>
              <p class="text-regular-large pr-20">
                {{ projectDetails.other_details }}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-xs-12 col-sm-4 select" v-if="formDetails">
            <label>Consulting Status</label><span style="color: red">*</span>
            <multiselect
              :showLabels="false"
              :close-on-select="true"
              :allow-empty="false"
              class="multiselect-single-dropdown"
              :options="projectStatusList.map((list) => list.id)"
              :custom-label="
                (option) =>
                  projectStatusList.find((list) => list.id == option)
                    .status_type
              "
              v-model="formDetails.requested_status_id"
            >
            </multiselect>
          </div>
          <div
            class="col-xs-12 col-sm-4 select"
            v-if="[2, 3].includes(formDetails.requested_status_id)"
          >
            <label>Payment Status</label><span style="color: red">*</span>
            <multiselect
              :showLabels="false"
              :close-on-select="true"
              :allow-empty="false"
              class="multiselect-single-dropdown"
              :disabled="projectDetails.payment_received ? true : false"
              :options="paymentStatusList.map((list) => list.id)"
              :custom-label="
                (option) =>
                  paymentStatusList.find((list) => list.id == option)
                    .status_type
              "
              v-model="formDetails.payment_received"
            >
            </multiselect>
          </div>
          <!-- <div class="col-xs-12 col-sm-4 select" v-if="projectDetails.payment_received">
            <p class="mt-30">Payment Completed Date: {{ formatToHumanDate(projectDetails.modified_date) || projectDetails.modified_date }}</p>
          </div>
          <div class="col-xs-12 col-sm-4 select mb-30" v-else>
            <label>Payment Completed On</label><span style="color: red;">*</span>
            <date-picker v-model="formDetails.payment_received_date" type="date" lang="en" value-type="format" placeholder="XX-Month-XXXX" @change="selectedStartDate()" :disabled="projectDetails.payment_received || formDetails.payment_received ? false : true"></date-picker>
          </div> -->
          <div
            class="col-xs-12 mt-20 mb-10"
            v-if="
              formDetails.requested_status_id === 2 &&
              !projectDetails.payment_request_sent
            "
          >
            <div class="col-xs-12 p-0">
              Payment Options <span class="required-asterisk">*</span>
            </div>
            <div
              class="col-xs-12 col-sm-3"
              v-for="option in paymentOptions"
              :key="option.id"
            >
              <label class="radio">
                <input
                  type="radio"
                  class="radio__input"
                  :value="option.id"
                  v-model="formDetails.payment_mode"
                />
                <div class="radio__radio"></div>
                <div class="font-18 text-primary">{{ option.name }}</div>
              </label>
            </div>
            <div
              class="col-xs-12 col-sm-4 mb-20 p-0"
              v-if="formDetails.payment_mode === 2"
            >
              <label>Invoice Details</label
              ><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                v-model.trim="formDetails.invoice"
                placeholder="Enter Invoice ID"
              />
            </div>
            <div
              class="col-xs-12 col-sm-4 mb-20 p-0"
              v-else-if="formDetails.payment_mode === 3"
            >
              <label>Purchase Order Details</label
              ><span class="required-asterisk">*</span>
              <input
                maxlength="65"
                class="form-control"
                type="text"
                v-model.trim="formDetails.purchase_order"
                placeholder="Enter Purchase Order ID"
              />
            </div>
            <div class="col-xs-12 p-0">
              <div class="col-xs-12 col-sm-4 mt-20 mb-20 p-0">
                <label>Total Price</label>
                <input
                  class="form-control"
                  type="number"
                  v-model.trim="formDetails.paid_price"
                />
              </div>
            </div>
            <div class="col-xs-12 p-0">
              <div class="col-xs-12 col-sm-4 p-0">
                <label>Comments</label>
                <textarea
                  maxlength="1500"
                  type="text"
                  class="form-control comments"
                  rows="5"
                  v-model.trim="formDetails.comments"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="row pb-40 mb-30">
          <div class="col-xs-12 col-sm-4 select mb-30">
            <label>Completion date</label><span style="color: red">*</span>
            <date-picker
              v-model:value="completedDate"
              type="date"
              lang="en"
              value-type="format"
              :format="UTCFormat"
              placeholder="XX-Month-XXXX"
              @change="selectedStartDate()"
              :disabled="
                formDetails.requested_status_id === 3 &&
                !this.projectDetails.project_completed
                  ? false
                  : true
              "
            ></date-picker>
          </div>
        </div>
        <div class="row p-20 d-flex col-gap-10 justify-content-end cart-footer">
          <BaseButton variant="secondary" @click="cancelStatus"
            >Cancel</BaseButton
          >
          <BaseButton @click="updatePaymentStatus" :disabled="!canSave"
            >Save Changes</BaseButton
          >
        </div>
        <!-- <button class="button" @click="updatePaymentStatus">Save changes</button> -->
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Multiselect from 'vue-multiselect';
import DatePicker from 'vue-datepicker-next';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import {
  getprojectsById,
  getConsultingStatusList,
  updatePurchseStatus
} from '../../../apis/consultingAdmin';
dayjs.extend(utc);

export default {
  props: {
    activeProjectList: {
      type: Array,
      default: () => []
    },
    consultingProjectType: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loaderStatus: false,
      projectId: null,
      enableButton: false,
      startTime: '',
      payment_received_date: '',
      endTime: '',
      completedDate: '',
      UTCFormat: 'DD-MMM-YYYY',
      dateCheckFormat: 'DD-MM-YYYY',
      defaultEndTime: '',
      defaultStartTime: '',
      setProjectStatus: null,
      projectDetails: null,
      projectStatusList: [],
      accountId: null,
      requestedUserId: null,
      requestedAccountId: null,
      formDetails: {
        account_id: '',
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        requested_status_id: null,
        paid_price: 0
      },
      paymentStatusList: [
        { id: 0, status_type: 'Pending' },
        { id: 1, status_type: 'Completed' }
      ],
      paymentOptions: [
        {
          id: 2,
          name: 'Invoice'
        },
        {
          id: 3,
          name: 'Purchase Order'
        },
        {
          id: 4,
          name: 'Others'
        }
      ]
    };
  },

  components: {
    Multiselect,
    DatePicker,
    Loader,
    BaseButton
  },
  async created() {
    this.projectId = +this.$route.params.id;
    this.accountId = JSON.parse(localStorage.getItem('userId'));
    await this.getprojectsById();
  },
  computed: {
    canSave() {
      return (
        (this.formDetails.requested_status_id === 2 &&
          this.formDetails.payment_mode === 2 &&
          this.formDetails.invoice !== '') ||
        (this.formDetails.requested_status_id === 2 &&
          this.formDetails.payment_mode === 3 &&
          this.formDetails.purchase_order !== '') ||
        (this.formDetails.requested_status_id === 2 &&
          this.formDetails.payment_mode === 4) ||
        (this.formDetails.requested_status_id === 3 &&
          this.completedDate !== '' &&
          this.completedDate !== null)
      );
    }
  },
  methods: {
    navigateToLaunchPad() {
      this.$router.go(-1);
    },
    formatToHumanDate(date) {
      return dayjs.utc(`${date}`).local().format('DD-MMM-YYYY');
    },
    async getprojectsById() {
      this.loaderStatus = true;
      this.projectDetails = await getprojectsById(this.projectId);
      this.projectStatusList = await getConsultingStatusList();
      this.startTime = dayjs(this.projectDetails.requested_date).format(
        this.UTCFormat
      );
      this.endTime = dayjs(this.projectDetails.modified_date).format(
        this.UTCFormat
      );
      if (this.projectDetails.completion_date !== 'null') {
        this.completedDate = dayjs(this.projectDetails.completion_date).format(
          this.UTCFormat
        );
      }
      this.requestedAccountId =
        this.projectDetails.request_account_id.account_id;
      this.requestedUserId = this.projectDetails.request_account_id.user_id;
      const defaultState = this.projectStatusList.find(
        (project) =>
          project.status_type === this.projectDetails.consulting_status
      );
      if (this.projectDetails.payment_received) {
        this.formDetails.payment_received = 1;
      } else {
        this.formDetails.payment_received = 0;
      }
      this.formDetails = {
        ...this.formDetails,
        requested_status_id: defaultState.id
      };
      this.loaderStatus = false;
    },
    clearForm() {
      this.formDetails = {
        account_id: '',
        account_owner_id: '',
        comments: '',
        invoice: '',
        purchase_order: '',
        payment_mode: null,
        requested_status_id: null,
        paid_price: 0
      };
    },
    async cancelStatus() {
      await this.getprojectsById();
      this.clearForm();
    },
    async updatePaymentStatus() {
      if (this.formDetails.requested_status_id === 3) {
        const completedNewDate = dayjs(
          dayjs(this.completedDate).toLocaleString()
        )
          .utc()
          .add(1, 'days')
          .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        this.formDetails = {
          plan_add_admin_request: {
            account_id: this.requestedAccountId,
            account_owner_id: this.requestedAccountId,
            comments: this.formDetails.comments,
            invoice: this.formDetails.invoice,
            purchase_order: this.formDetails.purchase_order,
            payment_mode: this.formDetails.payment_mode,
            plan_price: +this.formDetails.paid_price,
            user_id: this.requestedUserId,
            plan_info_list: [
              {
                ilt_slot_id: 0,
                plan_id: this.projectDetails.plan_id
              }
            ]
          },
          payment_received: this.formDetails.payment_received,
          payment_received_date: dayjs(
            dayjs(this.formDetails.payment_received_date).toLocaleString()
          )
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
          consulting_id: this.projectDetails.consulting_user_info_id,
          plan_id: this.projectDetails.plan_id,
          requested_status_id: this.formDetails.requested_status_id,
          completion_date: completedNewDate
        };
      } else {
        this.formDetails = {
          plan_add_admin_request: {
            account_id: this.requestedAccountId,
            account_owner_id: this.requestedAccountId,
            comments: this.formDetails.comments,
            invoice: this.formDetails.invoice,
            purchase_order: this.formDetails.purchase_order,
            payment_mode: this.formDetails.payment_mode,
            plan_price: +this.formDetails.paid_price,
            user_id: this.requestedUserId,
            plan_info_list: [
              {
                ilt_slot_id: 0,
                plan_id: this.projectDetails.plan_id
              }
            ]
          },
          payment_received: this.formDetails.payment_received,
          payment_received_date: dayjs(
            dayjs(this.formDetails.payment_received_date).toLocaleString()
          )
            .utc()
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
          consulting_id: this.projectDetails.consulting_user_info_id,
          plan_id: this.projectDetails.plan_id,
          requested_status_id: this.formDetails.requested_status_id
        };
      }
      const response = await updatePurchseStatus(this.formDetails);
      if (response.message === 'warning') {
        this.$notify({
          type: 'warning',
          title: 'Warning',
          text: response.data
        });
      } else if (response.message === 'success') {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: response.data
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data
        });
      }
      this.getprojectsById();
    },
    editProject(projectId) {
      const { type } = this.$route.params;
      this.$router.push({
        path: `/launchpad/consulting-hours/projects/${type}/edit/${projectId}`
      });
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
    }
  }
};
</script>

<style scoped>
.select >>> .multiselect-single-dropdown .multiselect__tags {
  border-radius: 0px !important;
}
.required-asterisk {
  padding-left: 5px;
  color: red;
}
.cart-footer {
  position: fixed;
  background: #ffffff;
  box-shadow: 4px 0px 10px rgb(0 0 0 / 25%);
  border-radius: 0px;
  bottom: 0;
  z-index: 2;
  width: calc(100% - 250px);
}
.comments {
  resize: none;
  height: 130px;
}

@media screen and (max-width: 1024px) {
  .cart-footer {
    width: 100%;
  }
}
</style>
