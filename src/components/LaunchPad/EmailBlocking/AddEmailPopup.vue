<template>
  <div id="block-email-popup" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div v-if="!actionSelected" class="text-h5 blue-1">
            New Email{{ actionSelected }}
          </div>
          <div v-else class="text-h5 blue-1">{{ actionSelected }} Email Domain</div>
          <hr />
        </div>
        <div class="modal-body">
          <div class="col-xs-12 col-sm-12 add-role mb-10">
            <p class="search-label sub-heading">
              Actions <span style="color: red">*</span>
            </p>
            <div
              class="col-xs-12 col-md-4"
              v-for="(plan, index) in categoryActionSelect"
              :key="index"
            >
              <input
                type="radio"
                name="optradio"
                :value="plan"
                v-model="actionSelected"
                @click="getBlockedEmailData"
              />
              <label class="pl-5">{{ plan }}</label>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Block'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Competitor Email Domain <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="boldinsight.com, corehf.com, dscience.com etc."
                  class="form-control"
                  maxlength="128"
                  v-model="formDetails.email"
                />
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Update'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Competitor Email Domain <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allBlockedEmailList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      allBlockedEmailList.find((list) => list.id == option)
                        .email
                  "
                  v-model="formDetails.blocked_id"
                  open-direction="bottom"
                  placeholder="Select a Email Domain"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Update Email Domain Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="boldinsight.com, corehf.com, dscience.com etc."
                  class="form-control"
                  maxlength="128"
                  v-model="formDetails.email"
                />
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'UnBlock'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Competitor Email Domain <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allBlockedEmailList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      allBlockedEmailList.find((list) => list.id == option)
                        .email
                  "
                  v-model="formDetails.blocked_id"
                  open-direction="bottom"
                  placeholder="Select a Email Domain"
                >
                </multiselect>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding"
          v-if="actionSelected === 'Block' || actionSelected === 'Update' || actionSelected === 'UnBlock'"
        >
          <div class="d-flex justify-content-end col-gap-15">
            <BaseButton variant="secondary" @click="cancelPermissions">
              Cancel
            </BaseButton>
            <BaseButton v-if="actionSelected === 'Block'" @click="addCategory" :disabled="!canSave"
              >Save</BaseButton
            >
            <BaseButton v-else-if="actionSelected === 'Update'" @click="addCategory" :disabled="!canSave"
              >Update</BaseButton
            >
            <BaseButton variant="error" v-else @click="addCategory" :disabled="!canSave"
              >UnBlock</BaseButton
            >
          </div>
        </div>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Multiselect from 'vue-multiselect';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import {
  getBlockedEmails,
  addCompetitorMails,
  updateCompetitorMails,
  deleteCompetitorMails
} from '../../../apis/emailBlock';
import EventBus from '../../../utils/event-bus';

export default {
  components: {
    Loader,
    Multiselect,
    BaseButton,
  },
  data() {
    return {
      loaderStatus: false,
      formDetails: {
        email: '',
        blocked_id: '',
      },
      maxlength: {
        title: 256,
        content: 10000
      },
      allBlockedEmailList: [],
      categoryActionSelect: ['Block', 'Update', 'UnBlock'],
      actionSelected: 'Block',
    };
  },
  computed: {
    // Use vuelidate
    canSave() {
      return (
        (this.actionSelected === 'Block' &&
          this.formDetails.email) ||
        (this.actionSelected === 'Update' &&
          this.formDetails.email) ||
          (this.actionSelected === 'UnBlock' &&
          this.formDetails.blocked_id)
      );
    }
  },
  methods: {
    async getEmailList() {
      this.loaderStatus = true;
      this.items = await getBlockedEmails();
      this.loaderStatus = false;
    },
    async getBlockedEmailData() {
      this.allBlockedEmailList = await getBlockedEmails();
    },
    cancelPermissions() {
      this.emptyObject();
      this.actionSelected = 'Block';
      $('#block-email-popup').modal('hide');
    },
    emptyObject() {
      this.formDetails = {
        email: '',
      };
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Block') {
        const emailid = this.formDetails.email.trim();
        const data = {
          email: emailid,
        };
        const response = await addCompetitorMails(data);
        if (response.status_code === 200) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.cancelPermissions();
        } else if (response.status_code === 500) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
          });
          this.formDetails.email = '';
        }else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
      } else if (this.actionSelected === 'Update') {
        const emailid = this.formDetails.email.trim();
        const data = {
          email: emailid,
          id: this.formDetails.blocked_id,
        };
        const response = await updateCompetitorMails(data);
        if (response.status_code === 500) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
          });
          this.formDetails.email = '';
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.cancelPermissions();
        }
      } else if (this.actionSelected === 'UnBlock') {
        const response = await deleteCompetitorMails(this.formDetails.blocked_id);
        if (response.status_code === 200) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.cancelPermissions();
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
          });
        }
      }
      this.emitter.emit('getAllBlockedEmailList');
      this.loaderStatus = false;
    }
  }
};
</script>
<style scoped>
.modal-body {
  height: 40vh;
  overflow: auto;
}
.modal-header {
  padding: 15px 30px;
}
.modal-header.modal-bgcolor {
  background-color: #ffffff;
  border: 0px;
  border-radius: 5px;
  padding-bottom: 0px;
}
.modal-header .close {
  background: none;
  opacity: 0.5;
  height: 17px;
  line-height: 28px;
  color: #828282;
  width: 17px;
  border-radius: 20px;
  font-weight: 300;
  outline: none;
  font-size: 38px;
  z-index: 1;
}
.modal-title {
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #0b3c61;
}
.mr-bt-5p {
  margin-bottom: 10px;
}

.footer {
  padding-top: 10px;
  bottom: 0%;
  padding-bottom: 2%;
  right: 0;
  background-color: #fff;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* Modal css */
.modal-lg {
  width: 70% !important;
  height: 70% !important;
}
.modal-content {
  height: 100% !important;
}
.modal-body {
  height: 55vh !important;
}
</style>
