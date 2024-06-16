<template>
  <div id="document-plan" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div class="text-h5 blue-1">Plan</div>
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
                Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Add Plan Name"
                  class="form-control"
                  maxlength="56"
                  v-model="planName"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                description <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Add Plan Description"
                  class="form-control"
                  maxlength="56"
                  v-model="planDescription"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                price <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="number"
                  placeholder="Plan Price"
                  class="form-control"
                  maxlength="56"
                  v-model="planPrice"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Bundle Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="bundleList"
                  v-model="selectedBundleName"
                  open-direction="bottom"
                  placeholder="Select Bundle"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Is Bundle <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="isBundleList"
                  v-model="selectedIsBundle"
                  open-direction="bottom"
                  placeholder="Select Bundle"
                >
                </multiselect>
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
                  :options="documentLibraryTypeList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      documentLibraryTypeList.find((list) => list.id == option)
                        .name
                  "
                  v-model="selectedUpdateDocumentType"
                  open-direction="bottom"
                  placeholder="Select Category"
                >
                </multiselect>
                <input
                  v-if="selectedUpdateDocumentType"
                  type="text"
                  placeholder="Update Category"
                  class="form-control mt-10"
                  maxlength="56"
                  v-model="UpdateCategoryNew"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding"
          v-if="actionSelected === 'Add' || actionSelected === 'Update'"
        >
          <div class="d-flex justify-content-end col-gap-15">
            <BaseButton variant="secondary" @click="cancelPermissions">
              Cancel
            </BaseButton>
            <BaseButton @click="addCategory" :disabled="!canSave"
              >Save</BaseButton
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
import { UpdateCategoryData } from '../../../apis/drlAdmin';

export default {
  components: {
    Loader,
    Multiselect,
    BaseButton
  },
  data() {
    return {
      planName: '',
      planDescription: '',
      planPrice: '',
      selectedBundleName: '',
      bundleList: [
        'Template Bundle',
        'Deliverable Bundle',
        'Product Packages',
        'null'
      ],
      selectedIsBundle: '',
      isBundleList: ['True', 'False'],
      documentLibraryTypeName: '',
      documentLibraryTypeIcon: '',
      selectedDoc: {},
      selectedFile: null,
      categoryActionSelect: ['Add', 'Update'],
      actionSelected: '',
      documentLibraryTypeList: [],
      loaderStatus: false,
      selectedUpdateDocumentType: null,
      UpdateCategoryNew: ''
    };
  },
  async created() {
    await this.getAllDocLibTypeData();
  },
  computed: {
    canSave() {
      return (
        (this.actionSelected === 'Add' &&
          this.planName &&
          this.planDescription &&
          this.planPrice &&
          this.selectedBundleName &&
          this.selectedIsBundle) ||
        (this.actionSelected === 'Update' &&
          this.UpdateCategoryNew &&
          this.selectedUpdateDocumentType)
      );
    }
  },
  methods: {
    emptyPlanObject() {
      this.planName = '';
      this.planDescription = '';
      this.planPrice = '';
      this.selectedBundleName = '';
      this.selectedIsBundle = '';
    },
    async getCategoryData() {
      this.loaderStatus = true;
      this.emptyPlanObject();
      this.loaderStatus = false;
    },
    cancelPermissions() {
      this.documentLibraryTypeName = '';
      this.selectedUpdateDocumentType = null;
      this.UpdateCategoryNew = '';
      this.actionSelected = '';
      $('#document-plan').modal('hide');
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        const data = {
          name: this.planName,
          description: this.planDescription,
          price: this.planPrice,
          bundle_name: this.selectedBundleName,
          display: true,
          feature: false, // Can make dynamic and need to add in UI if the Feature list to be enabled in Market Place
          is_active: true,
          is_bundle: this.selectedIsBundle,
          plan_type_id: 2
        };
        console.log('Add plan data', data);
        // const response = await addCategoryData(data);
        // if (response) {
        //   if (response.data === 'Category name already exist') {
        //     this.$notify({
        //       type: 'warning',
        //       title: 'Warning',
        //       text: response.data
        //     });
        //     this.documentLibraryTypeName = '';
        //   } else {
        //     this.$notify({
        //       type: 'success',
        //       title: 'Success',
        //       text: response.data
        //     });
        //     this.documentLibraryTypeName = '';
        //     this.actionSelected = '';
        //     $('#document-plan').modal('hide');
        //     this.emitter.emit('getAllCategories');
        //   }
        // } else if (response === undefined) {
        //   // this need to change from server as we are not dealing with 400 differed for now
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     text: 'Category name should not be null'
        //   });
        // } else {
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     text: response.data
        //   });
        // }
      } else if (this.actionSelected === 'Update') {
        const data = {
          category_name: this.UpdateCategoryNew,
          category_id: this.selectedUpdateDocumentType
        };
        const response = await UpdateCategoryData(data);
        if (response) {
          if (response.data === 'Category name already Exist') {
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
            this.selectedUpdateDocumentType = null;
            this.UpdateCategoryNew = '';
            this.actionSelected = '';
            $('#document-plan').modal('hide');
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
