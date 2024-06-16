<template>
  <div id="document-type" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content first-modal-content">
        <div class="modal-header modal-bgcolor">
          <button type="button" class="close" @click="cancelPermissions">
            &times;
          </button>
          <div v-if="!actionSelected" class="text-h5 blue-1">
            New Document{{ actionSelected }}
          </div>
          <div v-else class="text-h5 blue-1">{{ actionSelected }} Document</div>
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
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">Bundle</div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="bundleStatusList.map((list) => list.name)"
                  :custom-label="
                    (option) =>
                      bundleStatusList.find((list) => list.name == option).name
                  "
                  v-model="formDetails.is_bundle"
                  @select="getBundleTypeList"
                  open-direction="bottom"
                  placeholder="Select Document Library Type"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'True'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Bundle Icon <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    id="add-bundle-image"
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. svg only"
                    @select="setselectedBundleIcon"
                    validTypes="'.svg'"
                    :file="{ name: null }"
                    btnText="Select"
                  ></OpusImageSelect>
                </div>
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'True'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">Available Documents</div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.bundle_document_ids"
                  :multiple="true"
                  open-direction="bottom"
                  placeholder="Select list of Documents to add in the bundle"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'True'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Bundle Library Type <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <input
                  type="text"
                  placeholder="Add New Document Library Type"
                  class="form-control"
                  maxlength="256"
                  v-model="formDetails.bundle_library_type"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Library Type <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
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
                  v-model="formDetails.display_plan_type"
                  open-direction="bottom"
                  placeholder="Select Document Library Type"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-if="formDetails.is_bundle === 'True'">
                Bundle Name <span style="color: red">*</span>
              </div>
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-else>
                Document Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  placeholder="Add New Document Name"
                  class="form-control"
                  maxlength="128"
                  v-model="formDetails.document_name"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-if="formDetails.is_bundle === 'True'">
                Bundle Description <span style="color: red">*</span>
              </div>
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-else>
                Document Description <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <OpusEditor
                  v-model="formDetails.description"
                  id="add-rec-content"
                  placeholder="Add Document Description"
                  :maxlength="maxlength.content"
                  required
                ></OpusEditor>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-if="formDetails.is_bundle === 'True'">
                Bundle Contents <span style="color: red">*</span>
              </div>
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-else>
                Document Contents <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <input
                  type="text"
                  placeholder="Add Document contents with , separator"
                  class="form-control"
                  :maxlength="maxlength.content"
                  v-model="formDetails.contents"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-8 mb-5" v-if="formDetails.is_bundle === 'True'">Bundle Category Type</div>
              <div class="col-sm-8 mb-5" v-else>Document Category Type</div>
              <div class="col-xs-8">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="categoryList.map((list) => list.name)"
                  :custom-label="
                    (option) =>
                      categoryList.find((list) => list.name == option).name
                  "
                  v-model="formDetails.category"
                  open-direction="bottom"
                  placeholder="Select Document Category Type"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Type <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :multiple="true"
                  :allow-empty="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="documentList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      documentList.find((list) => list.id == option).name
                  "
                  v-model="formDetails.document_type"
                  open-direction="bottom"
                  placeholder="Select Word document, PDF etc..."
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'False'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Preview URL <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    id="add-preview-image"
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. PDF only"
                    @select="setselectedPreviewFile"
                    validTypes="'.pdf'"
                    :file="{ name: null }"
                    btnText="Select"
                  ></OpusImageSelect>
                </div>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Path <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    id="add-zip-image"
                    ref="add-zip-image"
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. ZIP only"
                    @select="setselectedDownloadFile"
                    validTypes="'.zip'"
                    :file="{ name: null }"
                    btnText="Select"
                  ></OpusImageSelect>
                  </div>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Price <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="number"
                  placeholder="Price (max: $20000)"
                  class="form-control"
                  maxlength="56"
                  v-model="formDetails.price"
                  v-on:keypress="validatePrice"
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
                Document Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.document_id"
                  @select="getDocumentDetails"
                  open-direction="bottom"
                  placeholder="Select a Document Name"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-if="formDetails.is_bundle === 'true'">
                Update Bundle Name <span style="color: red">*</span>
              </div>
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-else>
                Update Document Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="text"
                  :placeholder="formDetails.is_bundle?'Update Bundle Name':'Update Document Name'"
                  class="form-control"
                  maxlength="128"
                  v-model="formDetails.document_name"
                />
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle && formDetails.is_bundle === 'true'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Bundle Icon <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    id="add-bundle-image"
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. svg only"
                    @select="setselectedBundleIcon"
                    validTypes="'.svg'"
                    :file="{ name: formDetails.icon?formDetails.icon:null }"
                    btnText="Select"
                  ></OpusImageSelect>
                </div>
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'true'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">Available Documents</div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="UpdateAvailableDocuments"
                  :multiple="true"
                  open-direction="bottom"
                  placeholder="Select list of Documents to add in the bundle"
                >
                </multiselect>
              </div>
            </div>
            <!-- <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'true'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Bundle Library Type <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <input
                  type="text"
                  placeholder="Add New Document Library Type"
                  class="form-control"
                  maxlength="256"
                  v-model="formDetails.bundle_library_type"
                />
              </div>
            </div> -->
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Library Type <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="
                    documentLibraryTypeListFiltered.map((list) => list.id)
                  "
                  :custom-label="
                    (option) =>
                      documentLibraryTypeListFiltered.find(
                        (list) => list.id == option
                      ).name
                  "
                  v-model="formDetails.document_library_type_id"
                  open-direction="bottom"
                  placeholder="Select Document Library Type"
                >
                </multiselect>
              </div>
            </div>
              <div class="row mr-bt-5p">
              <div class="col-sm-8 mb-5" v-if="formDetails.is_bundle === 'true'">Bundle Category Type</div>
              <div class="col-sm-8 mb-5" v-else>Document Category Type</div>
              <div class="col-xs-8">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="categoryList.map((list) => list.name)"
                  :custom-label="
                    (option) =>
                      categoryList.find((list) => list.name == option).name
                  "
                  v-model="formDetails.category"
                  open-direction="bottom"
                  placeholder="Select Document Category Type"
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-if="formDetails.is_bundle === 'true'">
                Bundle Description <span style="color: red">*</span>
              </div>
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-else>
                Document Description <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <OpusEditor
                  v-model="formDetails.description"
                  id="add-rec-content"
                  placeholder="Add Document Description"
                  :maxlength="maxlength.content"
                  required
                ></OpusEditor>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-if="formDetails.is_bundle === 'true'">
                Bundle Contents <span style="color: red">*</span>
              </div>
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5" v-else>
                Document Contents <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <input
                  type="text"
                  placeholder="Add Document contents with , separator"
                  class="form-control"
                  :maxlength="maxlength.content"
                  v-model="formDetails.contents"
                />
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Type <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="false"
                  :allow-empty="true"
                  :multiple="true"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="documentList.map((list) => list.id)"
                  :custom-label="
                    (option) =>
                      documentList.find((list) => list.id == option).name
                  "
                  v-model="updateDocumentTypes"
                  open-direction="bottom"
                  placeholder="Select Word document, PDF etc..."
                >
                </multiselect>
              </div>
            </div>
            <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'false'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Preview URL <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    id="add-preview-image"
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. PDF only"
                    @select="setselectedPreviewFile"
                    validTypes="'.pdf'"
                    :file="{ name: null }"
                    btnText="Select"
                  ></OpusImageSelect>
                </div>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Path <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    id="add-zip-image"
                    ref="add-zip-image"
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. ZIP only"
                    @select="setselectedDownloadFile"
                    validTypes="'.zip'"
                    :file="{
                      name: formDetails.document_path
                        ? formDetails.document_path.split('/').pop()
                        : ''
                    }"
                    btnText="Select"
                  ></OpusImageSelect>
                </div>
              </div>
            </div>
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Price <span style="color: red">*</span>
              </div>
              <div class="col-xs-12 col-sm-6">
                <input
                  type="number"
                  placeholder="Price (max: $20000)"
                  class="form-control"
                  maxlength="56"
                  v-model="formDetails.price"
                  v-on:keypress="validatePrice"
                />
              </div>
            </div>
            <!-- <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">Bundle</div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="bundleStatusList.map((list) => list.name)"
                  :custom-label="
                    (option) =>
                      bundleStatusList.find((list) => list.name == option).name
                  "
                  :disabled="false"
                  v-model="formDetails.is_bundle"
                  @select="getBundleTypeList"
                  open-direction="top"
                  placeholder="Select Document Library Type"
                >
                </multiselect>
              </div>
            </div> -->
            <!-- <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'True'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Icon <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <div class="form-group">
                  <OpusImageSelect
                    class="col-xs-12 pt-20 pl-15"
                    errorTxtProp="Please select a valid image i.e. svg only"
                    @select="setSelectedFile"
                    :disabled="true"
                    validTypes="'.svg'"
                    :file="{
                      name: formDetails.icon
                        ? formDetails.icon.split('/').pop()
                        : ''
                    }"
                    btnText="Select"
                  ></OpusImageSelect>
                </div>
              </div>
            </div> -->
            <!-- <div class="row mr-bt-5p" v-if="formDetails.is_bundle === 'True'">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">Bundle Name</div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :disabled="true"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="bundleList.map((list) => list.name)"
                  :custom-label="
                    (option) =>
                      bundleList.find((list) => list.name == option).name
                  "
                  v-model="formDetails.bundle_name"
                  open-direction="bottom"
                  placeholder="Select Document Library Type"
                >
                </multiselect>
              </div>
            </div> -->
          </div>
          <div
            class="col-xs-12 col-sm-12 add-role"
            v-if="actionSelected === 'Delete'"
          >
            <div class="row mr-bt-5p">
              <div class="col-sm-12 col-xs-12 col-md-12 mb-5">
                Document Name <span style="color: red">*</span>
              </div>
              <div class="col-xs-12">
                <multiselect
                  :showLabels="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  class="multiselect-single-dropdown"
                  :searchable="true"
                  :options="allDocumentList.map((list) => list.document_id)"
                  :custom-label="
                    (option) =>
                      allDocumentList.find((list) => list.document_id == option)
                        .document_name
                  "
                  v-model="formDetails.document_id"
                  @select="getDocumentDetails"
                  open-direction="bottom"
                  placeholder="Select a Document Name"
                >
                </multiselect>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-xs-12 col-md-12 footer remove_button_padding"
          v-if="actionSelected === 'Add' || actionSelected === 'Update' || actionSelected === 'Delete'"
        >
          <div class="d-flex justify-content-end col-gap-15">
            <BaseButton variant="secondary" @click="cancelPermissions">
              Cancel
            </BaseButton>
            <BaseButton v-if="actionSelected === 'Add'" @click="addCategory" :disabled="!canSave"
              >Save</BaseButton
            >
            <BaseButton v-else-if="actionSelected === 'Update'" @click="addCategory" :disabled="!canSave"
              >Update</BaseButton
            >
            <BaseButton variant="error" v-else @click="addCategory" :disabled="!canSave"
              >Delete</BaseButton
            >
            <!-- <BaseButton @click="addCategory"
              >Save</BaseButton
            > -->
          </div>
        </div>
      </div>
      <loader :loadingStatus="loaderStatus"></loader>
    <delete-warning @deleteBundle="deleteProject" :userDeleteNumbers="userDeleteNumbers"></delete-warning>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Multiselect from 'vue-multiselect';
// import EventBus from '../../../utils/event-bus';
import Loader from '../../UIComponents/Loader.vue';
import OpusEditor from '../../UIComponents/OpusEditor.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import OpusImageSelect from '../../UIComponents/OpusImageSelect.vue';
import {
  getDropdownDocumentTypes,
} from '../../../apis/drlAdmin';
import deleteWarning from "./DeleteWarning.vue";
import {
  getDocumentLibraryTypes,
  getDocumentDetailsById,
  addDocumentData,
  getAdminDocs,
  updateDocument,
  deleteDocument
} from '../../../apis/documents';
import { uploadFile } from '../../../utils/common';
import EventBus from '../../../utils/event-bus';

export default {
  components: {
    Loader,
    Multiselect,
    OpusEditor,
    BaseButton,
    OpusImageSelect,
    deleteWarning
  },
  data() {
    return {
      // Move to constants file
      categoryList: [
        {
          id: 1,
          name: 'Healthcare professional',
          key: 'Healthcare professional'
        },
        {
          id: 2,
          name: 'Clinical',
          key: 'Clinical'
        },
        {
          id: 3,
          name: 'Layperson',
          key: 'Layperson'
        },
        {
          id: 4,
          name: 'Non-clinical',
          key: 'Non-clinical'
        }
      ],
      bundleStatusList: [
        {
          id: 0,
          name: 'False'
        },
        {
          id: 1,
          name: 'True'
        }
      ],
      documentList: [
        {
          id: 0,
          name: 'Excel File'
        },
        {
          id: 1,
          name: 'Word document,PDF'
        },
        {
          id: 2,
          name: 'Word document,PDF,1-hour Q&A'
        },
        {
          id: 3,
          name: 'Word document,PDF,2-hours Q&A'
        },
        {
          id: 4,
          name: 'Word document,Excel file,PDF,2-hours Q&A'
        },
        {
          id: 5,
          name: 'Adobe Illustrator, PDF'
        },
        {
          id: 6,
          name: 'Excel, Adobe Illustrator, PDF'
        }
      ],
      bundleList: [
        {
          id: 0,
          name: 'NULL'
        },
        {
          id: 1,
          name: 'Template Bundle'
        },
        {
          id: 2,
          name: 'Deliverable Bundle'
        },
        {
          id: 3,
          name: 'Product Packages'
        }
      ],
      formDetails: {
        document_name: '',
        description: '',
        price: null,
        is_bundle: false,
        isdisplay: true,
        category: '',
        contents: '',
        duration_in_years: 5,
        icon: '',
        preview_url: '',
        sequence: null,
        document_path: '',
        document_types: '',
        document_library_type_id: null,
        display_plan_type: '',
        document_id: null,
        bundle_document_ids: [],
        bundle_library_type: '',
      },
      maxlength: {
        title: 256,
        content: 10000
      },
      updateDocumentTypes:[],
      UpdateAvailableDocuments:[],
      allDocumentList: [],
      documentLibraryTypeName: '',
      documentLibraryTypeIcon: '',
      selectedDoc: {},
      selectedFile: null,
      selectedPreviewFile: null,
      selectedDownloadFile: null,
      selectedBundleIcon: null,
      categoryActionSelect: ['Add', 'Update', 'Delete'],
      actionSelected: 'Add',
      documentLibraryTypeList: [],
      documentLibraryTypeListFiltered: [],
      loaderStatus: false,
      selectedUpdateDocumentType: null,
      UpdateCategoryNew: '',
      getBundleList: [],
      defaultIcon: '',
      isSelectedPreviewFile: false,
      isSelectedDownloadFile: false,
      isSelectedFile: false,
      isSelectedBundleIcon: false,
      userDeleteNumbers:''
    };
  },
  async created() {
    await this.getAllDocLibTypeData();
  },
  watch: {
    actionSelected() {
      this.updateDocumentTypes = [];
    },
    formDetails: {
      handler(e) {
        e.price = e.price <= 20000 ? e.price : '';
      },
      deep: true
    }
  },
  computed: {
    // Use vuelidate
    canSave() {
      return (
        (this.actionSelected === 'Add' &&
          this.formDetails.document_name &&
          this.formDetails.price &&
          this.formDetails.contents &&
          this.formDetails.description &&
          this.selectedDownloadFile) ||
        (this.actionSelected === 'Update' &&
          this.formDetails.document_name &&
          this.formDetails.price &&
          this.formDetails.contents) ||
          (this.actionSelected === 'Delete' &&
          this.formDetails.document_name)
      );
    },
  }, 
  methods: {
    async deleteProject() {
      const response = await deleteDocument(this.formDetails.document_id);
        if (response.status_code === 200) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.cancelPermissions();
        $('#modal_project_delete').modal('hide');
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
          });
        }
    },
    validatePrice(evt) {
      evt = evt || window.event;
      const charCode = evt.which || evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
      return '';
    },
    uploadFile,
    setSelectedFile(file) {
      this.selectedFile = file;
      this.isSelectedFile = true;
    },
    setselectedPreviewFile(file) {
      this.selectedPreviewFile = file;
      this.isSelectedPreviewFile = true;
    },
    setselectedBundleIcon(file) {
      this.selectedBundleIcon = file;
      this.isSelectedBundleIcon = true;
    },
    setselectedDownloadFile(file) {
      this.selectedDownloadFile = file;
      this.isSelectedDownloadFile = true;
    },
    async getDocumentDetails(id) {
      this.loaderStatus = true;
      const data = await getDocumentDetailsById(id);
      this.formDetails = { ...data, is_bundle: `${data.is_bundle}` };
      this.updateDocumentTypes = this.formDetails.document_type_dtos.map((list) => {
        return list.id
      });
      if(this.actionSelected === 'Update') {
        this.UpdateAvailableDocuments = this.formDetails.avilable_document.map((doc) => {
          return doc.document_id
        })
      }
      if(this.actionSelected === 'Delete') {
        this.userDeleteNumbers = this.formDetails.number_of_user_purchased;
      }
      this.selectedFile = this.formDetails.icon;
      this.selectedPreviewFile = this.formDetails.preview_url;
      this.selectedDownloadFile = this.formDetails.document_path;
      this.loaderStatus = false;
    },
    async getBundleTypeList() {
      this.getBundleList = this.bundleList;
    },
    async getCategoryData() {
      this.loaderStatus = true;
      await this.getAllDocLibTypeData();
      this.loaderStatus = false;
    },
    async getAllDocLibTypeData() {
      this.emptyObject();
      const data = await getDropdownDocumentTypes()
      this.documentList = data;
      this.documentLibraryTypeList = await getDocumentLibraryTypes();
      this.documentLibraryTypeListFiltered = this.documentLibraryTypeList;
      this.selectedFile = this.documentLibraryTypeList.find(
        (item) => item.id === this.formDetails.display_plan_type
      );
      this.allDocumentList = await getAdminDocs();
      const bundleDocs = this.allDocumentList.map((item) => {
          if (item.is_bundle === true) {
            item.document_name = `${item.document_name} - (Bundle)`
          }
          return item;
        });
         this.allDocumentList = bundleDocs;
    },
    async getDropdownDocumentTypesList() {
      const data = await getDropdownDocumentTypes()
      this.updateDocumentTypes = [];
      this.documentList = data;
    },
    cancelPermissions() {
      if(this.$refs['add-zip-image']) {
        this.$refs['add-zip-image'].reset();
      }
      this.selectedDownloadFile = null;
      this.selectedPreviewFile = null;
      this.selectedBundleIcon = null;
      this.updateDocumentTypes = [];
      this.emptyObject();
      this.actionSelected = 'Add';
      $('#document-type').modal('hide');
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
        display_plan_type: '',
      };
    },
    emptyObjectOnlyName() {
      this.formDetails = {
        document_name: '',
        description: this.formDetails.description,
        price: this.formDetails.price,
        contents: this.formDetails.contents,
        display_plan_type: this.formDetails.display_plan_type,
        category: this.formDetails.category,
        document_type: JSON.parse(this.formDetails.document_type),
      };
    },
    async addCategory() {
      this.loaderStatus = true;
      if (this.actionSelected === 'Add') {
        const documentDownloadName = this.formDetails.document_type;
        let documentPreview = null;
        let documentDownload = null;
        if (this.formDetails.is_bundle === 'True') {
          this.formDetails.is_bundle = true;
          const bundleIcon = await uploadFile(this.selectedBundleIcon, {
            container_name: 'icons',
            file_name: `${this.selectedBundleIcon.name}`,
            folder_name: `document-library`,
            permissions: 'write',
            storage_name: 'opus-storage-java'
          });
          this.isSelectedDownloadFile = false;
          this.defaultIcon = `/${bundleIcon}`;
          documentDownload = await uploadFile(this.selectedDownloadFile, {
            container_name: 'documents',
            file_name: `${this.selectedDownloadFile.name}`,
            folder_name: 'bundle',
            permissions: 'write',
            storage_name: 'opus-storage-java'
          });
          this.isSelectedDownloadFile = false;
        } else {
          this.formDetails.is_bundle = false;
          const getIcon = this.documentLibraryTypeList.find(
            (item) => item.id === this.formDetails.display_plan_type
          );
          this.defaultIcon = getIcon.icon;
          const documentLibraryType = this.documentLibraryTypeList.find(
            (item) => item.id === this.formDetails.display_plan_type
          );
          const documentTypeFolderName = documentLibraryType.name;
          documentPreview = await uploadFile(this.selectedPreviewFile, {
            container_name: 'preview',
            file_name: `${this.selectedPreviewFile.name}`,
            folder_name: `documents/${documentTypeFolderName}`,
            permissions: 'write',
            storage_name: 'opus-storage-java'
          });
          this.isSelectedPreviewFile = false;
          documentDownload = await uploadFile(this.selectedDownloadFile, {
            container_name: 'documents',
            file_name: `${this.selectedDownloadFile.name}`,
            folder_name: `${documentTypeFolderName}`,
            permissions: 'write',
            storage_name: 'opus-storage-java'
          });
          this.isSelectedDownloadFile = false;
        }
        const data = {
          document_bundle_request: {
            bundle_document_ids: this.formDetails.bundle_document_ids
          },
          document_library_info_request_dto: {
            category: this.formDetails.category,
            contents: this.formDetails.contents,
            document_library_type_id: this.formDetails.display_plan_type,
            bundle_library_type: this.formDetails.bundle_library_type,
            document_path: `/${documentDownload}`,
            document_type: documentDownloadName,
            duration_in_years: 5,
            icon: this.defaultIcon,
            is_active: true,
            preview_url: `/${documentPreview}`
          },
          document_type_list: this.formDetails.document_type,
          market_place_premium_plan_request: {
            description: this.formDetails.description,
            display: true,
            feature: false,
            is_active: true,
            bundle: this.formDetails.is_bundle,
            name: this.formDetails.document_name,
            bundle_name: this.formDetails.document_name,
            plan_type_id: 2,
            price: this.formDetails.price,
            plan_id: this.formDetails.document_id
          }
        };
        const response = await addDocumentData(data);
        if (response.status_code === 200) {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: response.data
          });
          this.getAllDocLibTypeData();
          this.cancelPermissions();
        } else if (response.status_code === 500) {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.message
          });
          this.emptyObjectOnlyName();
        } else {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: response.data
          });
        }
      } else if (this.actionSelected === 'Update') {
        let documentPreview = '';
        let documentDownload = '';
        // this.getAllDocLibTypeData();
        // const category = this.categoryList.find((item) => item.name === this.formDetails.category);
        // const bundleName = this.bundleList.find(
        //   (item) => item.name === this.formDetails.bundle_name
        // );
        // await this.getDropdownDocumentTypesList();
        // const documentType = this.documentList.find(
        //   (item) => item.name === this.formDetails.document_type
        // );
        const documentType = this.updateDocumentTypes;
        const documentLibraryType = this.documentLibraryTypeListFiltered.find(
          (item) => item.id === this.formDetails.document_library_type_id
        );
        const documentTypeFolderName = documentLibraryType.name;
        if (this.formDetails.category === null) {
          this.formDetails.category = '';
        }
        if (this.isSelectedPreviewFile) {
          documentPreview = await uploadFile(this.selectedPreviewFile, {
            container_name: 'preview',
            file_name: `${this.selectedPreviewFile.name}`,
            folder_name: `documents/${documentTypeFolderName}`,
            permissions: 'write',
            storage_name: 'opus-storage-java'
          });
          documentPreview = `/${documentPreview}`;
        } else {
          documentPreview = this.selectedPreviewFile;
        }
        const documentDownloadName = documentType;
        if (this.isSelectedDownloadFile) {
          documentDownload = await uploadFile(this.selectedDownloadFile, {
            container_name: 'documents',
            file_name: `${this.selectedDownloadFile.name}`,
            folder_name: `${documentTypeFolderName}`,
            permissions: 'write',
            storage_name: 'opus-storage-java'
          });
          documentDownload = `/${documentDownload}`;
        } else {
          documentDownload = this.selectedDownloadFile;
        }
        if (this.formDetails.is_bundle === 'true') {
          this.formDetails.is_bundle = true;
          // this.bundleNamePayload = bundleName.name;
        } else {
          this.formDetails.is_bundle = false;
          // this.bundleNamePayload = '';
          const getIcon = this.documentLibraryTypeListFiltered.find(
            (item) => item.id === this.formDetails.document_library_type_id
          );
          this.defaultIcon = getIcon.icon;
        }
        const data = {
          document_bundle_request: {
            bundle_document_ids: this.UpdateAvailableDocuments
          },
          document_library_info_request_dto: {
            document_id: this.formDetails.document_id,
            category: this.formDetails.category,
            contents: this.formDetails.contents,
            document_library_type_id: this.formDetails.document_library_type_id,
            document_path: `${documentDownload}`,
            document_type: documentDownloadName,
            duration_in_years: 5,
            icon: this.defaultIcon,
            is_active: true,
            preview_url: `${documentPreview}`,
            sequence: this.formDetails.sequence
          },
          document_type_list: this.updateDocumentTypes,
          market_place_premium_plan_request: {
            description: this.formDetails.description,
            display: true,
            feature: false,
            is_active: true,
            bundle: this.formDetails.is_bundle,
            name: this.formDetails.document_name,
            plan_type_id: 2,
            price: this.formDetails.price,
            plan_id: this.formDetails.document_id
          }
        };
        const response = await updateDocument(data);
        if (response.status_code === 200) {
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
            text: response.message
          });
        }
      } else if (this.actionSelected === 'Delete') {
        $('#modal_project_delete').modal({
        backdrop: 'static',
        keyboard: false
      });
      }
      this.emitter.emit('getAllDocumentList');
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* Modal css */
.modal-lg {
  width: 70% !important;
  height: 90% !important;
}
.modal-content {
  height: 100% !important;
}
.modal-body {
  height: 55vh !important;
}
.multiselect-single-dropdown >>> .multiselect__tags {
  height: auto !important;
  padding: 10px 40px 10px 14px;
  display: block;
}
</style>
