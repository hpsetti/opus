<template>
  <div id="add-new-content-popup" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content p-10">
        <div class="modal-header pt-10 pr-0">
          <div class="col-xs-12 p-0 flex-between">
            <div class="top-header">Add RCA</div>
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

        <div class="modal-body">
          <div class="row mb-20">
            <div class="col-xs-12 mb-10">
              <label>RCA Title</label><span style="color: red">*</span>
              <div class="form-group">
                <input
                  v-model="formDetails.rca_title"
                  type="text"
                  class="form-control common-input"
                  maxlength="256"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>RCA Commentry</label><span style="color: red">*</span>
              <div class="col-xs-12 p-0">
                <textarea
                  class="form-control"
                  style="resize: none"
                  rows="4"
                  cols="20"
                  maxlength="2500"
                  v-model.trim="formDetails.rca_commentary"
                ></textarea>
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Sample Product</label><span style="color: red">*</span>
              <div class="form-group">
                <input
                  v-model="formDetails.sample_product"
                  type="text"
                  class="form-control common-input"
                  maxlength="256"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Sample use error</label><span style="color: red">*</span>
              <div class="form-group">
                <input
                  v-model="formDetails.sample_error"
                  type="text"
                  class="form-control common-input"
                  maxlength="256"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Background information</label
              ><span style="color: red">*</span>
              <textarea
                class="form-control"
                style="resize: none"
                rows="4"
                cols="20"
                maxlength="2500"
                v-model.trim="formDetails.back_ground_info"
              ></textarea>
            </div>
            <div class="col-xs-12 col-sm-6">
              <label>Sub Category Name</label><span style="color: red">*</span>
              <multiselect
                :showLabels="false"
                :close-on-select="true"
                :allow-empty="true"
                class="multiselect-single-dropdown multiple"
                :searchable="true"
                :multiple="true"
                :options="getAllSubCategories.map((list) => list.id)"
                :custom-label="
                  (option) =>
                    getAllSubCategories.find((list) => list.id == option)
                      .sub_category_name
                "
                v-model="UpdateNewCategoryNew"
                open-direction="top"
                placeholder="Select Sub Category"
              >
              </multiselect>
            </div>
            <div class="col-xs-12 col-sm-6">
              <label>Tags</label>
              <multiselect
                :showLabels="false"
                :close-on-select="true"
                :allow-empty="true"
                class="multiselect-single-dropdown multiple"
                :searchable="true"
                :multiple="true"
                :options="getAvailableTags.map((list) => list.id)"
                :custom-label="
                  (option) =>
                    getAvailableTags.find((list) => list.id == option)
                      .sub_category_name
                "
                v-model="tagsList"
                open-direction="top"
                placeholder="Select Tags"
              >
              </multiselect>
            </div>
          </div>
          <div
            class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding"
          >
            <div
              class="col-md-3 col-md-offset-6 col-sm-offset-5 col-sm-3 col-xs-5 xs-pd-lt-0"
            >
              <button
                type="button"
                class="btn btn-block emergo-white-button"
                @click="closeAddNewContentPopUp"
              >
                Cancel
              </button>
            </div>
            <div class="col-md-3 col-sm-4 col-xs-7 xs-pd-lt-0 xs-pd-rt-0">
              <button
                type="button"
                class="btn btn-block emergo-green-button"
                @click="saveRcaData"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import $ from 'jquery';
import cloneDeep from 'lodash/cloneDeep';
import Multiselect from 'vue-multiselect';
import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import { addRcatitleData, getAllSubCategoryData } from '../../../apis/rcaAdmin';

export default {
  components: {
    Multiselect,
    Loader
  },
  props: {
    allCategoryList: {
      type: Array,
      default: () => []
    },
    getAvailableTags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      categoriesList: [],
      countriesList: [],
      tagsList: [],
      loaderStatus: false,
      selectedAddCategory: null,
      categoryName: null,
      getSubCategoryById: null,
      UpdateNewCategoryNew: null,
      getAllSubCategories: [],
      subCategoriesPayload: [],
      formDetails: {
        active: true,
        id: 0,
        back_ground_info: '',
        sub_category_list: '',
        rca_commentary: '',
        rca_title: '',
        sample_error: '',
        sample_product: ''
      },
      uploadedFileDetails: null,
      fileName: '',
      fileTypeError: '',
      formDetailsCopy: null,
      isFileUploaded: false,
      previewCode: null
    };
  },

  async created() {
    this.emitter.on('getAllSubCategoryDataEmit', async () => {
      await this.getSubCategories();
    });
    await this.getSubCategories();
    this.emitter.emit('getAllCategoryDataEmit');
  },
  // watch: {
  //   allCategoryList() {
  //     this.updateData();
  //   },
  // },
  methods: {
    async getSubCategories() {
      this.getAllSubCategories = await getAllSubCategoryData();
      this.getAllSubCategories = this.getAllSubCategories.filter(
        (item) => item.active === true
      );
    },
    closeAddNewContentPopUp() {
      this.setDefaultValues();
      $('#add-new-content-popup').modal('hide');
    },

    setDefaultValues() {
      this.UpdateNewCategoryNew = [];
      this.tagsList = [];
      this.formDetails = {
        active: true,
        id: 0,
        back_ground_info: '',
        sub_category_list: '',
        rca_commentary: '',
        rca_title: '',
        sample_error: '',
        sample_product: ''
      };
    },

    async saveRcaData() {
      this.loaderStatus = true;
      if (this.UpdateNewCategoryNew || this.tagsList.length > 0) {
        this.subCategoriesPayload = [
          ...this.UpdateNewCategoryNew,
          ...this.tagsList
        ];
      } else {
        this.subCategoriesPayload = [];
      }
      this.formDetails.sub_category_list = this.subCategoriesPayload;
      const requestBody = cloneDeep(this.formDetails);
      const response = await addRcatitleData(requestBody);
      if (response) {
        if (response.data === 'Root Cause title already exist') {
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
          $('#add-new-content-popup').modal('hide');
        }
      } else if (response === undefined) {
        // this need to change from server as we are not dealing with 400 differed for now
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Please enter all fields'
        });
      } else {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.data
        });
      }
      this.emitter.emit('getRootCauseTitleData');
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
.form-field {
  height: auto;
  min-height: 44px;
  border: 1px solid #000000;
  cursor: text;
  border-radius: 3px;
}

.form-field > input {
  display: block;
  box-sizing: border-box;
  height: 44px;
  border: none;
  display: inline-block;
  background-color: transparent;
}

.form-field > input:focus {
  outline: none;
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

#add-new-content-popup .modal-content {
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
</style>
