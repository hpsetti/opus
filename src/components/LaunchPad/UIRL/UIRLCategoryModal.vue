<template>
  <div id="drl-cat" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div class="text-h5 blue-1">Category</div>
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
                  open-direction="bottom"
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
                  open-direction="bottom"
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
          <div class="d-flex justify-content-end col-gap-15">
            <BaseButton variant="secondary" @click="cancelPermissions">
              Cancel
            </BaseButton>
            <BaseButton
              :variant="actionSelected !== 'Delete' ? 'primary' : 'error'"
              @click="addCategory"
              :disabled="!canSave"
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
  addCategoryData,
  getAllCategoryData,
  UpdateCategoryData,
  DeleteCategoryData
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
      actionSelected: '',
      allCategoryList: [],
      loaderStatus: false,
      selectedUpdateCategory: null,
      selectedDeleteCategory: null,
      UpdateCategoryNew: ''
    };
  },
  async created() {
    await this.getAllCategoryData();
  },
  computed: {
    canSave() {
      return (
        (this.actionSelected === 'Add' && this.categoryName !== '') ||
        (this.actionSelected === 'Update' &&
          this.UpdateCategoryNew &&
          this.selectedUpdateCategory) ||
        (this.actionSelected === 'Delete' && this.selectedDeleteCategory)
      );
    }
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
      $('#drl-cat').modal('hide');
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        const data = {
          category_name: this.categoryName
        };
        const response = await addCategoryData(data);
        if (response) {
          if (response.message === 'Category name already exist') {
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
            this.categoryName = '';
            this.actionSelected = '';
            $('#drl-cat').modal('hide');
            this.emitter.emit('getAllCategories');
          }
        } else if (response === undefined) {
          // this need to change from server as we are not dealing with 400 differed for now
          this.$notify({
            type: 'error',
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
          category_id: this.selectedUpdateCategory
        };
        const response = await UpdateCategoryData(data);
        if (response) {
          if (response.message === 'Category name already exist') {
            this.$notify({
              type: 'error',
              title: 'Error',
              text: response.message
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
            $('#drl-cat').modal('hide');
            this.emitter.emit('getAllCategories');
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
          $('#drl-cat').modal('hide');
          this.emitter.emit('getAllCategories');
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
        this.emitter.emit('getAllSubCategories');
      }
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
</style>
