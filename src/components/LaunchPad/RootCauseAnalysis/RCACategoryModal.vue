<template>
  <div id="addCategoryModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div class="modal-title">{{ header }}</div>
          <hr />
        </div>
        <div class="modal-body">
          <div class="col-xs-12 col-sm-12 add-role mb-10">
            <p class="search-label sub-heading">
              Actions<span style="color: red">*</span>
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
                @click="getCategoryData"
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
                Category Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Add New Category"
                  class="form-control"
                  maxlength="56"
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
                Category Name <span style="color: red">*</span>
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
                  :open-direction="'bottom'"
                  placeholder="Select Category"
                >
                </multiselect>
                <input
                  v-if="selectedUpdateCategory"
                  type="text"
                  placeholder="Update Category"
                  class="form-control mt-10"
                  maxlength="56"
                  v-model="UpdateCategoryNew"
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
                Category Name <span style="color: red">*</span>
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
                  value="Select Category"
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
          <div
            class="col-md-3 col-md-offset-6 col-sm-offset-5 col-sm-3 col-xs-5 xs-pd-lt-0"
          >
            <button
              type="button"
              class="btn btn-block emergo-white-button"
              @click="cancelPermissions"
            >
              Cancel
            </button>
          </div>
          <div class="col-md-3 col-sm-4 col-xs-7 xs-pd-lt-0 xs-pd-rt-0">
            <button
              type="button"
              class="btn btn-block emergo-green-button"
              @click="addCategory"
            >
              Save
            </button>
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
import {
  addCategoryData,
  getAllCategoryData,
  UpdateCategoryData,
  DeleteCategoryData
} from '../../../apis/rcaAdmin';

export default {
  components: {
    Loader,
    Multiselect
  },
  props: ['type', 'roleInfo', 'header'],
  data() {
    return {
      categoryName: '',
      categoryActionSelect: ['Add', 'Update', 'Delete'],
      serviceSelected: {},
      actionSelected: '',
      allCategoryList: [],
      selectedRoleId: '',
      accountTypeList: [],
      loaderStatus: false,
      serviceId: null,
      services: [],
      selectedUpdateCategory: null,
      selectedDeleteCategory: null
    };
  },
  async created() {
    await this.getAllCategoryData();
  },
  methods: {
    async getCategoryData() {
      this.loaderStatus = true;
      this.categoryName = '';
      this.selectedUpdateCategory = null;
      this.UpdateCategoryNew = '';
      this.selectedDeleteCategory = null;
      await this.getAllCategoryData();
      this.loaderStatus = false;
    },
    async getAllCategoryData() {
      const response = await getAllCategoryData();
      this.allCategoryList = response.filter((item) => item.active === true);
    },
    cancelPermissions() {
      this.categoryName = '';
      this.selectedUpdateCategory = null;
      this.UpdateCategoryNew = '';
      this.selectedDeleteCategory = null;
      this.actionSelected = '';
      $('#addCategoryModal').modal('hide');
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        const data = {
          category_name: this.categoryName
        };
        const response = await addCategoryData(data);
        if (response) {
          if (response.data === 'Category name already exist') {
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
            this.categoryName = '';
            this.actionSelected = '';
            $('#addCategoryModal').modal('hide');
          }
        } else if (response === undefined) {
          // this need to change from server as we are not dealing with 400 differed for now
          this.$notify({
            type: 'error',
            // type: 'warning',
            title: 'Error',
            text: 'Category name should not be null'
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
          category_name: this.UpdateCategoryNew,
          id: this.selectedUpdateCategory
        };
        const response = await UpdateCategoryData(data);
        if (response) {
          if (response.data === 'CategoryName Already Exist') {
            this.$notify({
              type: 'warning',
              title: 'Warning',
              text: response.data
            });
            this.UpdateCategoryNew = '';
          } else {
            this.$notify({
              type: 'success',
              title: 'Success',
              text: response.data
            });
            this.selectedUpdateCategory = null;
            this.UpdateCategoryNew = '';
            this.actionSelected = '';
            this.getCategoryData();
            $('#addCategoryModal').modal('hide');
          }
        } else if (response === undefined) {
          this.$notify({
            type: 'error',
            title: 'error',
            text: 'Category name should not be null'
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
      } else if (this.actionSelected === 'Delete') {
        const data = this.selectedDeleteCategory;
        const response = await DeleteCategoryData(data);
        if (response) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.selectedDeleteCategory = null;
          this.actionSelected = '';
          $('#addCategoryModal').modal('hide');
        } else if (response === undefined) {
          this.$notify({
            type: 'error',
            title: 'error',
            text: 'Category name should not be null'
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
        await this.getAllCategoryData();
        this.emitter.emit('getAllSubCategoryDataEmit');
      }
      this.emitter.emit('getRootCauseTitleData');
      this.emitter.emit('getAllCategoryDataEmit');
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
