<template>
  <div id="document-category" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
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
                Document Library Type Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Add New Library Type"
                  class="form-control"
                  maxlength="56"
                  v-model="documentLibraryTypeName"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                <label for="add-doc-icon"
                  >Document Library Type Icon<span class="text-required"> *</span></label
                >
              </div>
              <OpusImageSelect
                class="col-xs-12 pt-20 pl-15"
                id="add-doc-icon"
                ref="add-doc-icon"
                errorTxtProp='Please select a valid image i.e. svg only'
                @select="setSelectedFile"
                validTypes="'.svg'"
                :file="{ name: null }"
                btnText="Select"
              ></OpusImageSelect>
            </div>
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Update'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Select Document Library Type Name <span style="color: red">*</span>
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
                  v-model="getLibraryType"
                  @select="getLibraryDetails"
                  open-direction="bottom"
                  placeholder="Select Library Type"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                New Document Library Type Name
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Update Library Type "
                  class="form-control"
                  maxlength="56"
                  v-model="updatedDocumentLibraryTypeName"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                <label for="add-doc-icon"
                  >Document Library Type Icon</label
                >
              </div>
              <p class="pl-30 text-bold">{{displayFileName}}</p>
              <!-- <OpusImageSelect
                class="col-xs-12 pt-20 pl-15"
                id="add-doc-icon"
                ref="add-doc-icon"
                errorTxtProp='Please select a valid image i.e. svg only'
                @select="setSelectedFile"
                validTypes="'.svg'"
                disabled="true"
                :file="{
                  name: selectedFile
                    ? selectedFile.split('/').pop()
                    : ''
                }"
                btnText="Select"
              ></OpusImageSelect> -->
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding"
          v-if="
            actionSelected === 'Add' ||
            actionSelected === 'Update'
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
import OpusImageSelect from '../../UIComponents/OpusImageSelect.vue';
// import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import {
  // addCategoryData,
  // UpdateCategoryData,
} from '../../../apis/drlAdmin';
import {
  getDocumentLibraryTypes,
  getDocumentLibraryTypeData,
  addDocumentLibraryType,
  updateDocumentLibraryType,
} from '../../../apis/documents';
import { uploadFile } from '../../../utils/common';

export default {
  components: {
    Loader,
    Multiselect,
    OpusImageSelect,
    BaseButton
  },
  data() {
    return {
      documentLibraryTypeName: '',
      documentLibraryTypeIcon: '',
      updatedDocumentLibraryTypeName: '',
      selectedDoc: {},
      selectedFile: null,
      categoryActionSelect: ['Add', 'Update'],
      actionSelected: '',
      documentLibraryTypeList: [],
      loaderStatus: false,
      getLibraryType: null,
      displayFileName: '',
    };
  },
  async created() {
    await this.getAllDocLibTypeData();
  },
  computed: {
    canSave() {
      return (
        (this.actionSelected === 'Add' && this.documentLibraryTypeName && this.selectedFile) ||
        (this.actionSelected === 'Update' &&
          this.selectedFile &&
          this.getLibraryType)
      );
    }
  },
  methods: {
    uploadFile,
    setSelectedFile(file) {
      this.selectedFile = file;
    },
    async getCategoryData() {
      this.loaderStatus = true;
      this.documentLibraryTypeName = '';
      this.getLibraryType = null;
      this.updatedDocumentLibraryTypeName = '';
      await this.getAllDocLibTypeData();
      this.loaderStatus = false;
    },
    async getAllDocLibTypeData() {
      this.documentLibraryTypeList = await getDocumentLibraryTypes();
    },
    async getLibraryDetails(id) {
      const response = await getDocumentLibraryTypeData(id);
      this.selectedFile = response.data.icon;
      this.displayFileName = this.selectedFile.split('/').pop()
    },
    cancelPermissions() {
      this.emptyObject();
      this.actionSelected = '';
      $('#document-category').modal('hide');
    },
    emptyObject() {
      this.documentLibraryTypeName = '';
      this.selectedFile= null;
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        const path = await uploadFile(this.selectedFile, {
          container_name: 'icons',
          file_name: `${this.selectedFile.name}`,
          folder_name: 'document-library',
          permissions: 'write',
          storage_name: 'opus-storage-java'
        });
        const data = {
          icon: `/${path}`,
          name: this.documentLibraryTypeName,
          sequence: 0,
        };
        const response = await addDocumentLibraryType(data);
        if (response) {
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
            text: response.data
          });
        }
      } else if (this.actionSelected === 'Update') {
        const data = {
          name: this.updatedDocumentLibraryTypeName,
          id: this.getLibraryType,
          icon: this.selectedFile,
        };
        const response = await updateDocumentLibraryType(data);
        if (response) {
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
