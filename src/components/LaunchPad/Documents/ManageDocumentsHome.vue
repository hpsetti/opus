<template>
  <div class="content-wrappper">
    <div class="row m-0">
      <div>
        <OpusBreadCrumb class="mb-10" variant="sm" @click="navigateToLaunchPad"
          >Launchpad</OpusBreadCrumb
        >
        <div class="ml-20 text-h3">Manage Documents</div>
      </div>
      <div class="d-flex justify-content-end col-gap-15 row-gap-10 flex-wrap pr-20">
        <!-- <BaseButton variant="secondary" has-icon @click="addCategory">
          <img
            src="/static/images/icons/plus_icon_blue.svg"
            alt="Add Category"
            class="preview-svg"
          />
          <span>Categories</span>
        </BaseButton> -->
        <BaseButton variant="secondary" has-icon @click="addDocument">
          <img
            src="/static/images/icons/plus_icon_blue.svg"
            alt="Add Subcategory"
            class="preview-svg"
          />
          <span>Documents</span>
        </BaseButton>
        <!-- <BaseButton variant="secondary" has-icon @click="addBundle">
          <img
            src="/static/images/icons/plus_icon_blue.svg"
            alt="Add Recommendation"
            class="preview-svg"
          />
          <span>Bundle</span>
        </BaseButton> -->
      </div>
      <div class="text-subtitle-2 text-secondary mt-10 mb-10 ml-20">
        {{ items.length }} Documents
      </div>
      <OpusTable
        id="manage-docs"
        class="docs-table"
        :items="items"
        :fields="fields"
        :currentPage="currentPage"
        :perPage="inSearch ? perPage : 0"
      >
        <template #empty="">
          <span>No documents found!</span>
        </template>
        <template #cell(path)="data">
          <img
            v-show="!isEmptyDoc(data.item)"
            src="/static/images/documents/doc_preview.svg"
            @click="downloadDoc(data.item.path, 'documents')"
          />
        </template>
        <template #cell(preview)="data">
          <img
            v-show="!isEmptyPreviewDoc(data.item)"
            src="/static/images/documents/doc_preview.svg"
            @click="downloadDoc(data.item.preview, 'preview')"
          />
        </template>
      </OpusTable>
      <div class="docs-pagination">
        <OpusPagination
          :total="items.length"
          :perPage.sync="perPage"
          :currentPage.sync="currentPage"
        ></OpusPagination>
      </div>
      <OpusDialog
        id="clear-doc"
        header="Clear Document"
        :title="clearDialog[clearDialogSelection].title"
        :desc="selectedDoc ? selectedDoc.name : ''"
        note="Clearing will delete the record from the database permanently"
        okText="Yes, Clear"
        okVariant="error"
        cancelText="OK, Cancel"
        @ok="clearDialog[clearDialogSelection].fn"
      ></OpusDialog>
      <OpusFormModal
        id="replace-doc"
        :title="updateDialog[updateDialogSelection].title"
        okText="Upload"
        @ok="updateDialog[updateDialogSelection].fn"
      >
        <form class="opus-form">
          <div class="form-group">
            <label for="replace-doc-modal-id">Document ID</label>
            <input
              type="text"
              class="form-control"
              id="replace-doc-modal-id"
              disabled
              :value="selectedDoc ? selectedDoc.id : ''"
            />
          </div>
          <div class="form-group">
            <label for="replace-doc-modal-name">Document Name</label>
            <input
              type="text"
              class="form-control"
              id="replace-doc-modal-name"
              disabled
              :value="selectedDoc ? selectedDoc.name : ''"
            />
          </div>
          <div class="form-group">
            <label for="replace-doc-file"
              >File<span class="text-required"> *</span></label
            >
            <OpusImageSelect
              id="replace-doc-file"
              ref="replace-doc-file"
              @select="setSelectedFile"
              validTypes="'.doc, .zip, .docx, .pdf, .xls'"
              :file="{
                name:
                  selectedDoc && selectedDoc.path
                    ? selectedDoc.path.split('/').pop()
                    : ''
              }"
              btnText="Select"
            ></OpusImageSelect>
          </div>
        </form>
      </OpusFormModal>
      <AddDocumentCategory></AddDocumentCategory>
      <AddDocument></AddDocument>
      <!-- <AddBundle></AddBundle> -->
      <loader :loadingStatus="loaderStatus"></loader>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import AddDocumentCategory from './AddDocumentCategory.vue';
import AddDocument from './AddDocument.vue';
// import AddBundle from './AddBundle.vue';
import BaseButton from '../../UIComponents/BaseButton.vue';
import OpusBreadCrumb from '../../UIComponents/OpusBreadCrumb.vue';
import OpusTable from '../../UIComponents/OpusTable.vue';
import Loader from '../../UIComponents/Loader.vue';
import OpusPagination from '../../UIComponents/OpusPagination.vue';
import OpusImageSelect from '../../UIComponents/OpusImageSelect.vue';
import OpusDialog from '../../UIComponents/OpusDialog.vue';
import OpusFormModal from '../../UIComponents/OpusFormModal.vue';
import {
  getDocumentLibraryTypes,
  getAdminDocs,
  updateAdminDoc
} from '../../../apis/documents';
import {
  uploadFile,
  downloadFile,
  errorNotification,
  successNotification
} from '../../../utils/common';
import EventBus from '../../../utils/event-bus';

export default {
  name: 'ManageDocuments',
  components: {
    OpusTable,
    OpusBreadCrumb,
    OpusPagination,
    OpusFormModal,
    OpusImageSelect,
    OpusDialog,
    BaseButton,
    // AddBundle,
    AddDocumentCategory,
    AddDocument,
    Loader
  },
  async created() {
    this.loaderStatus = true;
    this.types = await getDocumentLibraryTypes();
    this.emitter.on('getAllDocumentList', () => {
      this.getDocs();
    });
    this.getDocs();
    this.loaderStatus = false;
  },
  data() {
    return {
      loaderStatus: false,
      types: [],
      items: [],
      /* eslint-disable object-curly-newline */
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
      ],
      menuOptions: [
        {
          key: 'replace-doc',
          icon: '/static/images/icons/edit_icon_new.svg',
          name: 'Edit',
          fn: this.openDocModal
        },
        // {
        //   key: 'replace-doc-preview',
        //   icon: '/static/images/icons/danger_close_icon.svg',
        //   name: 'Delete',
        //   fn: this.openPreviewDocModal
        // }
      ],
      perPage: 10,
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      inSearch: true,
      clearDialog: {
        path: {
          title: 'Are you sure you want to clear the actual document?',
          fn: this.clearDoc
        },
        preview: {
          title: 'Are you sure you want to clear the preview document?',
          fn: this.clearPreviewDoc
        }
      },
      updateDialog: {
        path: {
          title: 'Select a file for document',
          fn: this.updateDoc
        },
        preview: {
          title: 'Select a file for preview document',
          fn: this.updatePreviewDoc
        }
      },
      clearDialogSelection: 'path',
      updateDialogSelection: 'path',
      selectedDoc: {},
      selectedFile: null
    };
  },
  methods: {
    errorNotification,
    successNotification,
    addCategory() {
      this.type = 'new_role';
      this.header = 'Category';
      $('#document-category').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    addBundle() {
      this.header = 'Bundle';
      $('#bundle-type').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    addDocument() {
      this.type = 'new_role';
      this.header = 'Category';
      $('#document-type').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async getDocs() {
      const items = await getAdminDocs();
      this.items = items.map((item) => this.getDoc(item));
    },
    getDoc(item) {
      const docType = this.types.find(
        (type) => type.id === item.document_library_type_id
      );
      return {
        id: item.document_id,
        name: item.document_name,
        type: docType ? docType.name : '',
        category: item.category,
        path: item.document_path,
        preview: item.preview_url,
        price: item.price
      };
    },
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    },
    async updateDoc() {
      this.closeDocModal();
      this.loaderStatus = true;
      const doc = this.selectedDoc;
      const filePath = doc.path ? doc.path.substring(1, doc.path.length) : '';
      const tokens = filePath.split('/');
      const containerName = tokens[0];
      const folderName = tokens.length
        ? tokens.slice(1, tokens.length - 1).join('/')
        : '';
      const path = await uploadFile(this.selectedFile, {
        container_name: containerName,
        file_name: `${this.selectedFile.name}`,
        folder_name: folderName,
        permissions: 'write',
        storage_name: 'opus-storage-java'
      });
      const formData = {
        document_id: doc.id,
        document_path: `/${path}`,
        preview_url: doc.preview
      };
      const response = await updateAdminDoc(formData);
      if (response && response.status_code === 200) {
        await this.getDocs();
        this.successNotification('Successfully updated document');
      } else {
        this.errorNotification('Error updating document');
      }
      this.loaderStatus = false;
    },
    async updatePreviewDoc() {
      this.loaderStatus = true;
      this.closeDocModal();
      const doc = this.selectedDoc;
      const filePath = doc.preview
        ? doc.preview.substring(1, doc.preview.length)
        : '';
      const tokens = filePath.split('/');
      const containerName = tokens[0];
      const folderName = tokens.length
        ? tokens.slice(1, tokens.length - 1).join('/')
        : '';
      const path = await uploadFile(this.selectedFile, {
        container_name: containerName,
        file_name: `${this.selectedFile.name}`,
        folder_name: folderName,
        permissions: 'write',
        storage_name: 'opus-storage-java'
      });
      const formData = {
        document_id: doc.id,
        document_path: doc.path,
        preview_url: `/${path}`
      };
      const response = await updateAdminDoc(formData);
      if (response && response.status_code === 200) {
        await this.getDocs();
        this.successNotification('Successfully updated preview document');
      } else {
        this.errorNotification('Error updating preview document');
      }
      this.loaderStatus = false;
    },
    async clearDoc() {
      this.closeClearDocModal();
      const idx = this.selectedDoc.path.lastIndexOf('/');
      const truncatedPath = this.selectedDoc.path.substring(0, idx);
      const formData = {
        document_id: this.selectedDoc.id,
        document_path: `${truncatedPath}/`,
        preview_url: this.selectedDoc.preview
      };
      this.loaderStatus = true;
      const response = await updateAdminDoc(formData);
      if (response && response.status_code === 200) {
        await this.getDocs();
        this.successNotification('Successfully cleared document');
      } else {
        this.errorNotification('Error clearing document');
      }
      this.loaderStatus = false;
    },
    async clearPreviewDoc() {
      this.closeClearDocModal();
      const idx = this.selectedDoc.preview.lastIndexOf('/');
      const truncatedPath = this.selectedDoc.preview.substring(0, idx);
      const formData = {
        document_id: this.selectedDoc.id,
        document_path: this.selectedDoc.path,
        preview_url: `${truncatedPath}/`
      };
      this.loaderStatus = true;
      const response = await updateAdminDoc(formData);
      this.loaderStatus = false;
      if (response && response.status_code === 200) {
        await this.getDocs();
        this.successNotification('Successfully cleared preview document');
      } else {
        this.errorNotification('Error clearing preview document');
      }
      this.loaderStatus = false;
    },
    async downloadDoc(path, container) {
      this.loaderStatus = true;
      const tokenProps = {
        container_name: container,
        permissions: 'read',
        storage_name: 'opus-storage-java'
      };
      const response = await downloadFile(path, tokenProps);
      if (response && response.error) {
        this.errorNotification(response.error.errorMessage);
      } else {
        this.successNotification('Successfully downloaded document');
      }
      this.loaderStatus = false;
    },
    isEmptyDoc(doc) {
      if (!doc.path) return true;
      return doc.path.split('/').pop() === '';
    },
    isEmptyPreviewDoc(doc) {
      if (!doc.preview) return true;
      return doc.preview.split('/').pop() === '';
    },
    setSelectedFile(file) {
      this.selectedFile = file;
    },
    openDocModal(doc) {
      this.selectedDoc = doc;
      this.updateDialogSelection = 'path';
      $('#replace-doc').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    openPreviewDocModal(doc) {
      this.selectedDoc = doc;
      this.updateDialogSelection = 'preview';
      $('#replace-doc').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    closeDocModal() {
      $('#replace-doc').modal('hide');
    },
    openClearDocModal(doc) {
      this.selectedDoc = doc;
      this.clearDialogSelection = 'path';
      $('#clear-doc').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    openClearPreviewDocModal(doc) {
      this.selectedDoc = doc;
      this.clearDialogSelection = 'preview';
      $('#clear-doc').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    closeClearDocModal() {
      $('#clear-doc').modal('hide');
    }
  }
};
</script>
<style scoped>
.docs-table {
  margin-bottom: 60px;
}
.docs-pagination {
  border-top: 0.5px solid #bdbdbd;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 24px;
  padding-left: 24px;
  background: white;
}
</style>
