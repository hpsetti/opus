<template>
  <div id="add-new-rec" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content p-10">
        <div class="modal-header">
          <div class="col-xs-12 p-0 flex-between">
            <div class="top-header">Add Requirement</div>
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
            <div class="col-xs-3 mb-10">
              <label>Number</label><span class="text-required"> *</span>
              <div class="form-group">
                <input
                  v-model="formDetails.requirement_number"
                  type="text"
                  class="form-control common-input"
                  :maxlength="maxlength.title"
                  placeholder="Add Requirement number"
                />
              </div>
            </div>
            <div class="col-xs-9 mb-10">
              <label>Title</label><span class="text-required"> *</span>
              <div class="form-group">
                <input
                  v-model="formDetails.requirement_title"
                  type="text"
                  class="form-control common-input"
                  :maxlength="maxlength.title"
                  placeholder="Add Requirement title"
                />
              </div>
            </div>
            <div class="col-xs-12 mb-10">
              <label>Requirement Content</label
              ><span class="text-required"> *</span>
              <div class="col-xs-12 p-0">
                <OpusEditor
                  id="add-rec-content"
                  v-model.trim="formDetails.requirement_content"
                  placeholder="Add Requirement content"
                  :maxlength="maxlength.content"
                  required
                ></OpusEditor>
              </div>
            </div>
            <div class="col-xs-12">
              <label>Sub Category Name</label
              ><span class="text-required"> *</span>
              <multiselect
                :showLabels="false"
                :close-on-select="true"
                :allow-empty="true"
                :class="[
                  UpdateNewCategoryNew.length ? 'has-values' : 'no-values'
                ]"
                class="multiselect-single-dropdown multiple"
                :searchable="true"
                :multiple="true"
                :options="getAllSubCategories.map((list) => list.id)"
                :custom-label="getSubCategoryNames"
                v-model="UpdateNewCategoryNew"
                open-direction="top"
                placeholder="Select Sub Category"
              >
              </multiselect>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-end col-gap-10">
            <BaseButton variant="secondary" @click="closeAddNewContentPopUp"
              >Cancel</BaseButton
            >
            <BaseButton :disabled="!canUpload" @click="saveRecommendation"
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
import cloneDeep from 'lodash/cloneDeep';
import Multiselect from 'vue-multiselect';
import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import OpusEditor from '../../UIComponents/OpusEditor.vue';

import {
  addRecommendation,
  getAllSubCategoryData
} from '../../../apis/uirlAdmin';

export default {
  components: {
    Multiselect,
    Loader,
    BaseButton,
    OpusEditor
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
      UpdateNewCategoryNew: [],
      getAllSubCategories: [],
      subCategoriesPayload: [],
      formDetails: {
        active: true,
        id: 0,
        subcategory_ids: [],
        requirement_number: null,
        requirement_content: '',
        requirement_title: '',
        recommendation_image_path: ''
      },

      formDetailsCopy: null,

      previewCode: null,

      maxlength: {
        title: 256,
        content: 10000
      }
    };
  },

  async created() {
    this.emitter.on('getAllSubCategories', async () => {
      await this.getSubCategories();
    });
    await this.getSubCategories();
  },
  computed: {
    canUpload() {
      return (
        this.formDetails.requirement_title &&
        this.formDetails.requirement_title.length <= this.maxlength.title &&
        this.formDetails.requirement_content &&
        this.formDetails.requirement_number &&
        this.formDetails.requirement_content.length <= this.maxlength.content &&
        this.UpdateNewCategoryNew.length > 0
      );
    }
  },
  methods: {
    // uploadFile,
    getSubCategoryNames(option) {
      const subcat = this.getAllSubCategories.find(
        (list) => list.id === option
      );
      return subcat ? subcat.sub_category_name : '';
    },
    async getSubCategories() {
      this.getAllSubCategories = await getAllSubCategoryData();
      this.getAllSubCategories = this.getAllSubCategories.filter(
        (item) => item.active === true
      );
    },
    closeAddNewContentPopUp() {
      this.setDefaultValues();
      $('#add-new-rec').modal('hide');
    },

    setDefaultValues() {
      this.UpdateNewCategoryNew = [];
      this.tagsList = [];
      this.formDetails = {
        active: true,
        id: 0,
        subcategory_ids: [],
        requirement_content: '',
        requirement_title: '',
        requirement_number: ''
      };
    },

    async saveRecommendation() {
      this.loaderStatus = true;
      this.formDetails.subcategory_ids = this.getAllSubCategories.filter((w) =>
        this.UpdateNewCategoryNew.includes(w.id)
      );
      const requestBody = cloneDeep(this.formDetails);
      const response = await addRecommendation(requestBody);
      if (response) {
        if (response.status_code === 500) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
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
      this.emitter.emit('getRecommendations');
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
