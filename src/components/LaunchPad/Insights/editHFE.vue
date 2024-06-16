<template>
  <div id="edit-hfe" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content p-10">
        <div class="modal-header">
          <div class="col-xs-12 p-0 flex-between">
            <div class="top-header">Edit HFE Insight</div>
            <div>
              <img
                src="/static/images/icons/close_icon.svg"
                alt
                class="cursor-pointer"
                @click="closeAddNewContentPopUp"
              />
            </div>
          </div>
        </div>
        <hr class="mr-15 ml-15 my-0" />
        <div class="modal-body">
          <div class="row mb-20">
            <div class="col-xs-12 mb-10">
              <label>HFE Insight Headline</label
              ><span class="text-required"> *</span>
              <div class="form-group">
                <input
                  v-model="formDetails.hfe_insight_headline"
                  type="text"
                  class="form-control common-input"
                  placeholder="Enter headline text"
                  maxlength="256"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Author’s full name</label>
              <div class="form-group">
                <input
                  v-model="formDetails.authors_name"
                  type="text"
                  class="form-control common-input"
                  maxlength="256"
                  placeholder="Enter Author’s full name"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Author’s work title</label>
              <div class="form-group">
                <input
                  v-model="formDetails.authors_work_title"
                  type="text"
                  class="form-control common-input"
                  maxlength="256"
                  placeholder="Enter Author’s work title"
                />
              </div>
            </div>
            <div class="col-xs-4 mb-10">
              <label>Select date</label><span class="text-required"> *</span>
              <div class="form-group">
                <date-picker
                  v-model:value="formDetails.date_created"
                  type="date"
                  lang="en"
                  valueType="YYYY-MM-DDTHH:mm"
                  :format="UTCFormat"
                  placeholder="XX-XX-XXXX"
                ></date-picker>
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <p class="text-button-label">Insight content</p>
              <label>Insight content</label
              ><span class="text-required"> *</span>
              <div class="col-xs-12 p-0">
                <OpusEditor
                  id="add-hfe-content"
                  v-model="formDetails.insight_content"
                  :maxlength="maxlength"
                ></OpusEditor>
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-end col-gap-20">
            <BaseButton variant="secondary" @click="closeAddNewContentPopUp"
              >Cancel</BaseButton
            >
            <BaseButton @click="updateHfe" :disabled="!canSave"
              >Save</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import DatePicker from 'vue-datepicker-next';
import cloneDeep from 'lodash/cloneDeep';
import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import OpusEditor from '../../UIComponents/OpusEditor.vue';
import { updateHfe } from '../../../apis/hfeInsightsAdmin';
import { getDateFormat } from '../../../utils/common';

export default {
  components: {
    Loader,
    DatePicker,
    BaseButton,
    OpusEditor
  },
  props: ['editDetails'],

  data() {
    return {
      allCategoryList: [],
      tagsList: [],
      UTCFormat: 'DD-MMM-YYYY',
      maxlength: 10000,
      loaderStatus: false,
      selectedAddCategory: null,
      categoryName: null,
      getSubCategoryById: null,
      UpdateNewCategoryNew: null,
      getAllSubCategories: [],
      formDetails: {
        authors_name: '',
        authors_work_title: '',
        date_created: '',
        hfe_insight_headline: '',
        id: null,
        insight_content: '',
        website_link: ''
      },
      selectedFile: null,
      errorTxt: ''
    };
  },

  async created() {
    $('#edit-hfe').on('shown.bs.modal', () => {
      this.formDetails = cloneDeep(this.editDetails);
    });
  },

  watch: {
    editDetails: {
      handler(value) {
        if (value) {
          this.formDetails = cloneDeep(value);
        }
      },
      immediate: true
    }
  },

  computed: {
    canSave() {
      return (
        this.formDetails.hfe_insight_headline &&
        this.formDetails.insight_content &&
        this.formDetails.date_created &&
        this.errorTxt === '' &&
        this.formDetails.insight_content.length < this.maxlength
      );
    }
  },

  methods: {
    getDateFormat,
    formatDMYToYMD(date) {
      const [month, day, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
    closeAddNewContentPopUp() {
      $('#edit-hfe').modal('hide');
      if (this.editDetails) this.formDetails = cloneDeep(this.editDetails);
    },
    setDefaultValues() {
      this.formDetails = {
        authors_name: '',
        authors_work_title: '',
        date_created: '',
        hfe_insight_headline: '',
        id: null,
        insight_content: '',
        website_link: ''
      };
      $('#edit-hfe').modal('hide');
    },
    async updateHfe() {
      this.loaderStatus = true;
      this.formDetails.active = true;
      this.formDetails.hfe_viewing_order = this.formDetails.viewing_order;
      const payload = {
        hfe_insight_list: [this.formDetails]
      };
      const requestBody = cloneDeep(payload);
      const response = await updateHfe(requestBody);
      if (response) {
        if (response.data === 'HfeHeadline already Exist') {
          this.$notify({
            type: 'warning',
            title: 'Warning',
            text: response.data
          });
          this.categoryName = '';
        } else {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.setDefaultValues();
          $('#add-new-rec').modal('hide');
        }
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data
        });
      }
      this.setDefaultValues();
      this.emitter.emit('getHfeData');
      this.loaderStatus = false;
    }
  }
};
</script>

<style scoped>
textarea {
  scrollbar-width: thin;
}

.modal {
  z-index: 100;
}
.form-control:focus {
  border-color: #96c8da;
  box-shadow: none;
}

textarea.form-control {
  border: 1px solid #000000;
}

.modal-body {
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
}

.common-input {
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 3px;
}

label {
  font-size: 14px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.7);
}

.modal-header,
.modal-footer {
  border: 0;
  background: #ffffff;
}

#edit-content-popup .modal-content {
  border-radius: 10px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.top-header {
  font-weight: 300;
  font-size: 28px;
  color: #000000;
}

.common-properties {
  width: 170px;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.form-group {
  margin-bottom: 7px;
  height: 34px;
}

.el-select-dropdown__item {
  height: auto;
  line-height: normal;
  padding-top: 10;
  padding-bottom: 10;
}
.multiselect-single-dropdown.multiple >>> .multiselect__tags {
  height: auto !important;
  display: block;
}
.multiselect-single-dropdown.multiple >>> .multiselect__tags {
  padding: 10px 40px 0px 14px !important;
  min-height: 44px !important;
}
.multiselect-single-dropdown.no-values >>> .multiselect__tags {
  padding: 8px 40px 0px 14px;
  height: 36px !important;
}
.multiselect-single-dropdown >>> .multiselect__select {
  top: 3px;
}
.multiselect-single-dropdown.multiple >>> .multiselect__select {
  top: 6px;
}
.multiselect-single-dropdown >>> .multiselect__placeholder {
  padding: 0px 0px 0px 5px !important;
  font-family: 'Nunito';
}
.multiselect-single-dropdown >>> .multiselect__tag {
  background-color: rgba(255, 198, 47, 0.3) !important;
  border-color: #e9e9eb !important;
  color: #333333 !important;
  border-radius: 2px !important;
}
.multiselect-single-dropdown >>> .multiselect__tag-icon:hover {
  background: rgba(255, 198, 47, 0.4) !important;
}
.flex-wrapper {
  display: flex;
  justify-content: space-between;
}

.w-230 {
  word-break: break-word;
  white-space: break-spaces;
  padding: 7px;
  color: rgba(0, 0, 0, 0.7);
}

.selectedListItem {
  color: #0b3c61;
  font-weight: 500;
}

#upload-file {
  display: none;
}

.events-none {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
  pointer-events: none;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px black;
  background-color: white;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: darkgray;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray;
}
.multiselect-single-dropdown .multiselect__tags {
  border: 1px solid #000000 !important;
  padding: 10px 15px 10px 10px !important;
}
</style>
