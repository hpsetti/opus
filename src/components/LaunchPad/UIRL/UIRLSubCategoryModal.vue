<template>
  <div id="drl-subcat" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div class="text-h5 blue-1">Subcategory</div>
          <hr />
        </div>
        <div class="modal-body">
          <div class="col-xs-12 col-sm-12 add-role mb-10">
            <p class="search-label sub-heading">
              Actions <span class="text-required"> *</span>
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
                @click="clearAllFields"
              />
              <label class="pl-5">{{ plan }}</label>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Add'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Category Name <span class="text-required"> *</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allCategoryList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      allCategoryList.find((list) => list.id == option)
                        .category_name
                  "
                  v-model="selectedAddCategory"
                  :open-direction="'bottom'"
                  placeholder="Select Category"
                >
                </multiselect>
              </div>
              <div
                class="col-sm-12 col-xs-12 col-md-12 mb-5"
                v-if="selectedAddCategory"
              >
                Sub Category Name <span class="text-required"> *</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Add New Sub Category"
                  class="form-control"
                  maxlength="56"
                  v-if="selectedAddCategory"
                  v-model="categoryName"
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
                Category Name <span class="text-required"> *</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allCategoryList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      allCategoryList.find((list) => list.id == option)
                        .category_name
                  "
                  v-model="selectedUpdateCategory"
                  placeholder="Select Category"
                  :open-direction="'bottom'"
                  @select="getSubCategoriesById"
                >
                </multiselect>
              </div>
              <div
                class="col-sm-12 col-xs-12 col-md-12 mb-5"
                v-if="selectedUpdateCategory"
              >
                Sub Category Name <span class="text-required"> *</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  v-if="selectedUpdateCategory"
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="getSubCategoryById.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      getSubCategoryById.find((list) => list.id == option)
                        .sub_category_name
                  "
                  v-model="UpdateNewCategoryNew"
                  :open-direction="'bottom'"
                  placeholder="Select Sub Category"
                >
                </multiselect>
                <input
                  v-if="UpdateNewCategoryNew"
                  type="text"
                  placeholder="Update Sub Category"
                  maxlength="56"
                  class="form-control"
                  v-model="updateSubcategory"
                />
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Delete'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Category Name <span class="text-required"> *</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allCategoryList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      allCategoryList.find((list) => list.id == option)
                        .category_name
                  "
                  v-model="selectedDeleteCategory"
                  :open-direction="'bottom'"
                  placeholder="Select Category"
                  @select="getSubCategoriesById"
                >
                </multiselect>
              </div>
              <div
                class="col-sm-12 col-xs-12 col-md-12 mb-5"
                v-if="selectedDeleteCategory"
              >
                Sub Category Name <span class="text-required"> *</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  v-if="selectedDeleteCategory"
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="getSubCategoryById.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      getSubCategoryById.find((list) => list.id == option)
                        .sub_category_name
                  "
                  v-model="selectedDeleteSubCategory"
                  :open-direction="'bottom'"
                  placeholder="Select Sub Category"
                >
                </multiselect>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding"
          v-if="
            actionSelected === 'Add' ||
            actionSelected === 'Update' ||
            actionSelected === 'Delete'
          "
        >
          <div class="d-flex justify-content-end col-gap-15">
            <BaseButton variant="secondary" @click="cancelPermissions">
              Cancel
            </BaseButton>
            <BaseButton
              :variant="actionSelected !== 'Delete' ? 'primary' : 'error'"
              @click="addCategory"
              >{{ actionSelected !== 'Delete' ? 'Save' : 'Delete' }}</BaseButton
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
import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import {
  addSubCategoryData,
  getAllCategoryData,
  getAllSubCategoryData,
  UpdateSubCategoryData,
  DeleteSubCategoryData,
  getSubCategoryById
} from '../../../apis/uirlAdmin';

export default {
  components: {
    Loader,
    Multiselect,
    BaseButton
  },
  data() {
    return {
      categoryName: '',
      categoryActionSelect: ['Add', 'Update', 'Delete'],
      serviceSelected: {},
      actionSelected: '',
      allCategoryList: [],
      loaderStatus: false,
      selectedAddCategory: null,
      selectedUpdateCategory: null,
      selectedDeleteCategory: null,
      selectedDeleteSubCategory: null,
      getSelectedSubCategory: null,
      UpdateNewCategoryNew: null,
      updateSubcategory: null,
      getSubCategoryById: null
    };
  },
  async created() {
    this.emitter.on('getAllCategories', async () => {
      this.getAllCategoryData();
    });
    await this.getAllCategoryData();
  },
  methods: {
    clearAllFields() {
      this.loaderStatus = true;
      this.selectedAddCategory = null;
      this.categoryName = '';
      this.selectedUpdateCategory = null;
      this.UpdateNewCategoryNew = null;
      this.updateSubcategory = '';
      this.selectedDeleteCategory = null;
      this.selectedDeleteSubCategory = null;
      this.loaderStatus = false;
    },
    async getAllCategoryData() {
      this.loaderStatus = true;
      const response = await getAllCategoryData();
      this.allCategoryList = response.filter((item) => item.active === true);
      this.loaderStatus = false;
    },
    async getSubCategoriesById(selectedOption) {
      this.loaderStatus = true;
      // this.getSubCategoryById = await getSubCategoryById(selectedOption) || this.subCategories[selectedOption];
      this.getSubCategoryById = await getSubCategoryById(selectedOption);
      this.getSubCategoryById = this.getSubCategoryById.filter(
        (item) => item.active === true
      );
      this.loaderStatus = false;
    },
    async getSubCategoriesList() {
      this.loaderStatus = true;
      const response = await getAllSubCategoryData();
      this.getSelectedSubCategory = response.filter(
        (item) => item.id === this.selectedDeleteCategory
      );
      this.loaderStatus = false;
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        /* const data = {
          category_id: this.selectedAddCategory,
          filter_name: this.categoryName,
          sub_categories: [{
            sub_category_name: this.categoryName,
          }],
        }; */
        const data = {
          category_id: this.selectedAddCategory,
          sub_category_name: this.categoryName
        };
        const response = await addSubCategoryData(data);
        if (response) {
          if (response.message === 'Subcategory name already exist') {
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
            this.selectedAddCategory = null;
            this.categoryName = '';
            this.actionSelected = '';
            $('#drl-subcat').modal('hide');
            this.emitter.emit('getAllSubCategories');
          }
        } else if (response === undefined) {
          // this need to change from server as we are not dealing with 400 differed for now
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Category/Sub Category name should not be null'
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
      } else if (this.actionSelected === 'Update') {
        const data = {
          sub_category_name: this.updateSubcategory,
          id: this.UpdateNewCategoryNew
        };
        const response = await UpdateSubCategoryData(data);
        if (response) {
          if (response.message === 'Subcategory name already exist') {
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
            this.selectedUpdateCategory = null;
            this.UpdateNewCategoryNew = null;
            this.updateSubcategory = '';
            this.actionSelected = '';
            $('#drl-subcat').modal('hide');
            this.emitter.emit('getAllSubCategories');
          }
        } else if (response === undefined) {
          // this need to change from server as we are not dealing with 400 differed for now
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Category/Sub Category name should not be null'
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
      } else if (this.actionSelected === 'Delete') {
        const data = this.selectedDeleteSubCategory;
        const response = await DeleteSubCategoryData(data);
        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.selectedDeleteCategory = null;
          this.selectedDeleteSubCategory = null;
          this.actionSelected = '';
          $('#drl-subcat').modal('hide');
          this.emitter.emit('getAllSubCategories');
        } else if (response === undefined) {
          // this need to change from server as we are not dealing with 400 differed for now
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Category/Sub Category name should not be null'
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
        // await this.getAllCategoryData();
      }
      // this.emitter.emit('getRecommendations');
      // this.emitter.emit('getAllSubCategories');
      // this.emitter.emit('getAllSubCategoryTags');
      this.loaderStatus = false;
    },
    cancelPermissions() {
      this.actionSelected = '';
      this.clearAllFields();
      $('#drl-subcat').modal('hide');
    }
  }
  // mounted() {
  //   $('#drl-subcat').on('shown.bs.modal', async () => {
  //     this.loaderStatus = true;
  //     const response = await getAllSubCategoryData();
  //     this.allCategoryList = response.filter((item) => item.active === true);
  //     this.loaderStatus = false;
  //   });
  // },
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
.mr-bt-55p {
  margin-bottom: 55px;
}
.custom-dropdown >>> .el-input__inner {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #0b3c61 !important;
  border: 0.5px solid #828282 !important;
  border-radius: 20px;
}
.custom-dropdown >>> .el-select {
  width: 100%;
}
.footer {
  padding-top: 10px;
  bottom: 0%;
  padding-bottom: 2%;
  right: 0;
  background-color: #fff;
}
.txt-alg-rt {
  text-align: right;
}
.checkbox.cust_checkbox_rbac {
  display: inline-block;
  cursor: pointer;
}
.checkbox {
  position: relative;
  margin-top: 10px;
  margin-bottom: 5px;
}
input[type='checkbox'] {
  opacity: 0;
  position: absolute;
  z-index: 1;
  width: 18px !important;
  height: 18px !important;
  left: 0;
  top: 0;
  margin: 0 !important;
}
.checkbox label:before {
  content: '';
  width: 18px !important;
  height: 18px !important;
  border: 1px solid #0b3c61;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
}
.checkbox input[type='checkbox']:checked + label:before {
  background-color: #0b3c61;
  background-image: url(/static/images/icons/checkbox.svg);
  background-size: 12px 16px;
  background-repeat: no-repeat;
  background-position-x: center;
}
.bt-border {
  border-bottom: 1px solid #bdbdbd;
}
.cust_label {
  display: inline-block;
  margin-left: 15px;
  vertical-align: super;
  line-height: 37px;
  font-size: 14px;
  font-weight: 400;
}
.add-role .mr-bt-5p:last-child > .bt-border:last-child > div.row:last-child {
  padding-bottom: 20px;
}
.edit-lnk {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 37px;
  text-align: right;
  padding-right: 70%;
  color: #2f80ed;
  cursor: pointer;
}
.link-disabled {
  opacity: 0.4;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.pointer-events-edit {
  pointer-events: none;
}
.custom-dropdown >>> .el-tag.el-tag--info {
  background-color: #fff;
  border-color: #fff;
  color: #0b3c61;
  font-size: 14px;
  font-weight: 500;
}
.custom-dropdown >>> .el-tag .el-icon-close {
  font-size: 20px;
}
@media screen and (max-width: 410px) {
  .txt-alg-rt {
    padding: 0px;
  }
  .cust_label {
    margin-left: 1px;
  }
}
/* Multiselect multiple */
.multiselect-single-dropdown.multiselect-multiple
  >>> .multiselect__option
  .checkbox
  label:before {
  content: none;
}
</style>
