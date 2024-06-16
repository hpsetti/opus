<template>
  <div id="edit-content-popup" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content p-10">
        <div class="modal-header pt-10 pr-0">
          <div class="col-xs-12 p-0 flex-between">
            <div class="top-header">Edit RCA</div>
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
            <div class="col-xs-12 col-sm-8">
              <label>Sub Categories & Tags</label
              ><span style="color: red">*</span>
              <multiselect
                :showLabels="false"
                :close-on-select="true"
                :allow-empty="true"
                class="multiselect-single-dropdown"
                :searchable="true"
                :multiple="true"
                :options="getAllSubCategories.map((list) => list.id)"
                :custom-label="
                  (option) =>
                    getAllSubCategories.find((list) => list.id == option)
                      .sub_category_name
                "
                v-model="formDetails.sub_category_list"
                :open-direction="'bottom'"
                placeholder="Select Sub Category"
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
import {
  getAllCategoryData,
  getSubCategoryById,
  UpdateRootCauseTitle,
  getAllSubCategoryData
} from '../../../apis/rcaAdmin';

export default {
  components: {
    Multiselect,
    Loader
  },
  props: ['editDetails'],

  data() {
    return {
      allCategoryList: [],
      tagsList: [],
      loaderStatus: false,
      selectedAddCategory: null,
      categoryName: null,
      getSubCategoryById: null,
      UpdateNewCategoryNew: null,
      getAllSubCategories: [],
      formDetails: {
        active: true,
        back_ground_info: '',
        id: '',
        rca_commentary: '',
        rca_title: '',
        sample_error: '',
        sample_product: '',
        category_id: '',
        sub_category_list: '',
        tags: []
      }
    };
  },

  async created() {
    this.emitter.on('getAllSubCategoryDataEmit', async () => {
      await this.getSubCategories();
    });
    await this.getSubCategories();
  },

  watch: {
    editDetails() {
      if (this.editDetails) {
        this.formDetails = cloneDeep(this.editDetails);
      }
    }
  },

  methods: {
    async getSubCategories() {
      this.getAllSubCategories = await getAllSubCategoryData();
      this.getAllSubCategories = this.getAllSubCategories.filter(
        (item) => item.active === true
      );
    },
    async getAllCategoryData() {
      const response = await getAllCategoryData();
      this.allCategoryList = response.filter((item) => item.active === true);
    },
    async getSubCategoriesById(selectedOption) {
      this.loaderStatus = true;
      this.UpdateNewCategoryNew = '';
      this.getSubCategoryById = await getSubCategoryById(selectedOption);
      this.loaderStatus = false;
    },
    closeAddNewContentPopUp() {
      $('#edit-content-popup').modal('hide');
    },
    setDefaultValues() {
      this.formDetails = {
        back_ground_info: '',
        id: '',
        rca_commentary: '',
        rca_title: '',
        sample_error: '',
        sample_product: '',
        category_id: '',
        sub_category_list: '',
        tags: []
      };
      $('#edit-content-popup').modal('hide');
    },

    async saveRcaData() {
      this.loaderStatus = true;
      this.formDetails.active = true;
      const requestBody = cloneDeep(this.formDetails);
      const response = await UpdateRootCauseTitle(requestBody);
      if (response) {
        if (response.data === 'RootCauseTitle Already exist') {
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
.multiselect-single-dropdown >>> .multiselect__tags {
  height: auto !important;
  display: block;
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
