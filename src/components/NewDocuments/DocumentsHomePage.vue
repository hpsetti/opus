<template>
  <div class="col-xs-12 p-20">
    <div class="col-xs-12 p-0">
      <div class="col-xs-12 col-sm-8">
        <div class="col-xs-12 p-0 mb-20 text-primary text-h2 blue-1">
          Your Documents
        </div>
        <div class="col-xs-12 col-sm-9 text-regular-large black-2 p-0">
          The Document Libraries contain dozens of HFE documents that help you
          efficiently produce high-quality HFE documentation, while also
          ensuring that your work aligns with the latest regulatory expectations
          and industry best practices. Use an OPUS document as a starting point
          or use it to identify opportunities to enhance documentation that you
          have already developed.
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 xs-hide-content-650">
        <img
          class="mt-10"
          src="/static/images/icons/new_documents.svg"
          alt=""
        />
      </div>
    </div>
    <div>
      <div class="col-xs-12 d-flex align-items-center justify-content-between xs-flex-column-650 xs-align-items-start-650" style="margin-top: 30px;">
        <div class="text-h3 black-2 ">Purchased</div>
        <div style="width: 375px; max-width: 100%;margin-top: 10px;" class="xs-width-100-650 mb-10">
          <OpusSelect
            v-model="docType.purchased"
            :options="docTypes.purchased"
            trackBy="id"
            :custom-label="customLabel"
          ></OpusSelect>
        </div>
      </div>
      <div class="col-xs-12 mb-30">
        <purchased-documents
          :loader="loaderStatus"
          :userId="userId"
          :purchasedList="purchasedDocsList"
          :documentTypes="documentTypes"
          :docSubTypes="docSubTypes"
          :docType="docType.purchased"
          :purchasedBundlesList="purchasedBundlesList"
        ></purchased-documents>
      </div>
      <div class="col-xs-12 d-flex align-items-center justify-content-between xs-flex-column-650 xs-align-items-start-650" style="margin-top: 30px;">
        <div class="text-h3 black-2">Marketplace</div>
        <div style="width: 375px; max-width: 100%;margin-top: 10px;" class="xs-width-100-650 mb-10">
          <OpusSelect
            v-model="docType.available"
            :options="docTypes.available"
            trackBy="id"
            :custom-label="customLabel"
          ></OpusSelect>
        </div>
      </div>
      <div class="col-xs-12">
        <available-docs-list
          :bundlesList="documentBundles"
          :loader="loaderStatus"
          @fetchNewList="fetchNewList"
          :userId="userId"
          :availableList="availableDocsList"
          :documentTypes="documentTypes"
          :docSubTypes="docSubTypes"
          :docType="docType.available"
        ></available-docs-list>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import PurchasedDocuments from './PurchasedDocumentsList.vue';
import AvailableDocsList from './AvailableDocsList.vue';
import Loader from '../UIComponents/Loader.vue';
import {
  getPurchasedDocuments,
  getAvailableDocumentsList,
  getDocumentLibraryTypes
} from '../../apis/documents';
import OpusSelect from '../UIComponents/OpusSelect.vue';

export default {
  props: ['userId'],
  data() {
    return {
      loaderStatus: false,
      purchasedDocsList: [],
      availableDocsList: [],
      documentTypes: [],
      // These document types has sub types that can be sorted against
      docSubTypes: [0, 2, 3],
      docType: {
        purchased: {},
        available: {}
      },
      docTypes: {
        purchased: [],
        available: []
      },
      documentBundles: [],
      purchasedBundlesList: []
    };
  },
  components: {
    Loader,
    AvailableDocsList,
    PurchasedDocuments,
    OpusSelect
  },
  async created() {
    const { name: selectedDoc } = this.$route.query;
    await this.getAllDocuments(selectedDoc);
  },
  methods: {
    async getAllDocuments(selectedDoc) {
      this.loaderStatus = true;
      let docsList = [];
      let bundlesList = [];
      const filteredDocsList = [];
      let purchasedDocsList = [];
      let purchasedBundlesList = [];
      const purchasedFilteredDocsList = [];
      [purchasedDocsList, docsList, this.documentTypes] = await Promise.all([
        getPurchasedDocuments(this.userId),
        getAvailableDocumentsList(this.userId),
        getDocumentLibraryTypes()
      ]);
      for (let i = 0; i < docsList.length; i += 1) {
        if (docsList[i].document_library_type_id === 4 && docsList[i].is_bundle)
          bundlesList.push(docsList[i]);
        else filteredDocsList.push(docsList[i]);
      }
      for (let i = 0; i < purchasedDocsList.length; i += 1) {
        if (
          purchasedDocsList[i].document_library_type_id === 4 &&
          purchasedDocsList[i].is_bundle
        )
          purchasedBundlesList.push(purchasedDocsList[i]);
        else purchasedFilteredDocsList.push(purchasedDocsList[i]);
      }
      bundlesList = [
        ...new Map(
          bundlesList.map((document) => [document.document_id, document])
        ).values()
      ];
      purchasedBundlesList = [
        ...new Map(
          purchasedBundlesList.map((document) => [
            document.document_id,
            document
          ])
        ).values()
      ];
      this.purchasedBundlesList = purchasedBundlesList;
      this.documentBundles = bundlesList;
      this.availableDocsList = filteredDocsList;
      this.purchasedDocsList = purchasedFilteredDocsList;
      this.populatePurchasedDocCount();
      this.populateAvailableDocCount(selectedDoc);
      this.loaderStatus = false;
    },
    async fetchNewList() {
      await this.getAllDocuments();
    },
    setCountForTab(allTab, bundleList, docsList) {
      const availableTab = allTab;
      const types = cloneDeep(this.documentTypes);
      types.forEach((t) => {
        t.no_of_documents = 0;
        if ([2, 3].includes(t.id)) t.no_of_documents += bundleList.length;
      });
      docsList.forEach((doc) => {
        availableTab.no_of_documents += 1;
        const idx = types.findIndex(
          (t) => t.id === doc.document_library_type_id
        );
        if (idx !== -1) {
          types[idx].no_of_documents += 1;
        }
      });
      return { types, availableTab };
    },
    populateAvailableDocCount(selectedDoc = '') {
      const all = {
        id: 0,
        name: 'View all',
        icon: '/icons/document-library/templates.png',
        no_of_documents: 0,
        sequence: 0
      };
      const countInfo = this.setCountForTab(
        all,
        this.documentBundles,
        this.availableDocsList
      );
      if (this.documentBundles.length > 0) {
        countInfo.availableTab.no_of_documents += 1;
      }
      this.docTypes.available = [all].concat(countInfo.types);
      if (!this.docType.available.name) {
        this.docType.available = selectedDoc
          ? this.docTypes.available.find(
              (tab) =>
                tab.name.replaceAll(' ', '').toLowerCase() ===
                selectedDoc.toLowerCase()
            )
          : countInfo.availableTab;
      } else {
        this.setSelectedTabInfo();
      }
    },
    setSelectedTabInfo() {
      const selectedTabInfo = this.docTypes.available.find(
        (tab) => tab.name === this.docType.available.name
      );
      this.docType.available = {
        ...this.docType.available,
        no_of_documents: selectedTabInfo.no_of_documents
      };
    },
    populatePurchasedDocCount() {
      const all = {
        id: 0,
        name: 'View all',
        icon: '/icons/document-library/templates.png',
        no_of_documents: 0,
        sequence: 0
      };
      const countInfo = this.setCountForTab(
        all,
        this.purchasedBundlesList,
        this.purchasedDocsList
      );
      if (this.purchasedBundlesList.length > 0) {
        countInfo.availableTab.no_of_documents += 1;
      }
      this.docTypes.purchased = [all].concat(countInfo.types);
      this.docType.purchased = countInfo.availableTab;
    },
    customLabel(option) {
      return `${option.name} (${option.no_of_documents})`;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 650px) {
  .xs-flex-column-650 {
    flex-direction: column;
  }

  .xs-align-items-start-650 {
    align-items: flex-start;
  }

  .xs-width-100-650 >>> .opus-multiselect.multiselect, .xs-width-100-650 >>> .opus-multiselect.multiselect.sm {
    max-width: 100%;
  }

  .xs-width-100-650 >>> .opus-multiselect.sm .multiselect__tags {
    min-height: 36px;
    height: auto;
  }

  .xs-hide-content-650 {
    display: none;
  }
}

</style>
