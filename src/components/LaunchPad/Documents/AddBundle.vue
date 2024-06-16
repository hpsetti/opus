<template>
  <div id="bundle-type" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div class="text-h5 blue-1">New Bundle</div>
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
                Bundle Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <input
                  type="text"
                  placeholder="Add New Bundle"
                  class="form-control"
                  maxlength="56"
                  v-model="formDetails.bundle_name"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Docuuments In Bundle <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="false"
                  :multiple="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.document_id"
                  open-direction="bottom"
                  placeholder="Select Document Library Type"
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
                Bundle Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <input
                  type="text"
                  placeholder="Add New Bundle"
                  class="form-control"
                  maxlength="56"
                  v-model="formDetails.bundle_name"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                select Bundle <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="false"
                  :multiple="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.bundleType"
                  open-direction="bottom"
                  placeholder="Select a Bundle"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Docuuments In Bundle <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="false"
                  :multiple="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.document_List"
                  open-direction="bottom"
                  placeholder="Select Documents For The Bundle"
                >
                </multiselect>
              </div>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Delete'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Bundle <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="false"
                  :multiple="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.bundle_name"
                  open-direction="bottom"
                  placeholder="Select A Bundle"
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
// import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
// import {
//   UpdateCategoryData,
// } from '../../../apis/drlAdmin';
import {
  getDocumentDetailsById,
  getAdminDocs,
  // deleteDocumentData
} from '../../../apis/documents';

export default {
  components: {
    Loader,
    Multiselect,
    BaseButton
  },
  data() {
    return {
      formDetails: {
        bundle_name: '',
        document_id: '',
        is_bundle: true,
      },
      maxlength: {
        title: 256,
        content: 10000
      },
      allDocumentList: [],
      documentLibraryTypeName: '',
      documentLibraryTypeIcon: '',
      selectedDoc: {},
      selectedFile: null,
      categoryActionSelect: ['Add', 'Update', 'Delete'],
      actionSelected: '',
      loaderStatus: false,
      selectedUpdateDocumentType: null,
      UpdateCategoryNew: ''
    };
  },
  // async created() {
  //   await this.getDocs();
  // },
  computed: {
    canSave() {
      return (
        (this.actionSelected === 'Add' &&
          this.formDetails.bundle_name &&
          this.formDetails.document_id) ||
        (this.actionSelected === 'Update' &&
          this.formDetails.bundle_name &&
          this.formDetails.document_id) ||
        (this.actionSelected === 'Delete' &&
          this.formDetails.bundle_name &&
          this.formDetails.document_id)
      )
    }
  },
  methods: {
    async getDocs() {
      this.allDocumentList = await getAdminDocs();
    },
    async getDocumentDetails() {
      this.loaderStatus = true;
      const data = await getDocumentDetailsById(102);
      this.formDetails = data;
      this.loaderStatus = false;
    },
    async getCategoryData() {
      this.loaderStatus = true;
      this.documentLibraryTypeName = '';
      this.selectedUpdateDocumentType = null;
      this.UpdateCategoryNew = '';
      await this.getDocs();
      this.loaderStatus = false;
    },
    cancelPermissions() {
      this.emptyObject();
      this.actionSelected = '';
      $('#bundle-type').modal('hide');
    },
    emptyObject() {
      this.formDetails = {
        document_name: '',
        description: '',
        price: null,
        contents: '',
        icon: '',
        preview_url: '',
        document_path: '',
        display_plan_type: '' // Dropdown for plan type get details fro get docmunts lib types api
      };
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        this.cancelPermissions();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Added new Document'
        });
        // console.log('data', this.formDetails)
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
        //     $('#bundle-type').modal('hide');
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
        this.formDetails = {
          ...this.formDetails,
          document_id: this.formDetails.document_id
        };
        this.cancelPermissions();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Added new Document'
        });
        // console.log('data', this.formDetails)
        // const response = await UpdateCategoryData(this.formDetails);
        // if (response) {
        //   if (response.data === 'Category name already Exist') {
        //     this.$notify({
        //       type: 'warning',
        //       title: 'Warning',
        //       text: response.data
        //     });
        //     this.UpdateCategoryNew = '';
        //   } else {
        //     this.$notify({
        //       type: 'success',
        //       title: 'Success',
        //       text: response.data
        //     });
        //     this.selectedUpdateDocumentType = null;
        //     this.UpdateCategoryNew = '';
        //     this.actionSelected = '';
        //     $('#bundle-type').modal('hide');
        //     this.emitter.emit('getAllCategories');
        //   }
        // } else if (response === undefined) {
        //   this.$notify({
        //     type: 'error',
        //     title: 'error',
        //     text: 'Category name should not be null'
        //   });
        // } else {
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     text: response.data
        //   });
        // }
      } else if (this.actionSelected === 'Delete') {
        this.cancelPermissions();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Added new Document'
        });
        // const data = this.selectedDeleteSubCategory;
        // const response = await deleteDocumentData(data);
        // if (response) {
        //   this.$notify({
        //     type: 'success',
        //     title: 'Success',
        //     text: response.data
        //   });
        //   this.selectedDeleteCategory = null;
        //   this.selectedDeleteSubCategory = null;
        //   this.actionSelected = '';
        //   $('#drl-subcat').modal('hide');
        //   this.emitter.emit('getAllSubCategories');
        // } else if (response === undefined) {
        //   // this need to change from server as we are not dealing with 400 differed for now
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     text: 'Category/Sub Category name should not be null'
        //   });
        // } else {
        //   this.$notify({
        //     type: 'error',
        //     title: 'Error',
        //     text: response.data
        //   });
        // }
        // await this.getAllCategoryData();
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
.multiselect-single-dropdown >>> .multiselect__tags {
  height: auto !important;
  padding: 10px 40px 10px 14px;
  display: block;
}
.multiselect-single-dropdown >>> .multiselect__select {
  top: 5px;
}
.multiselect-single-dropdown >>> .multiselect__placeholder {
  padding: 0px 0px 0px 5px !important;
}
</style>
