<template>
  <div class="col-xs-12 p-0">
    <div v-if="filteredList.length">
      <div class="col-xs-12 d-flex sorting-container mb-20 mt-10 xs-hide-content-650">
        <div
          class="col-xs-6 p-0 xs-flex-column d-flex align-items-center name--filter"
          @click="setSorting('name')"
        >
          <span class="text-primary cursor-pointer pr-10">Name</span>
          <img
            :class="{ desc: orderBy.name === 'desc' }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'name'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
          />
        </div>
        <div
          class="col-xs-6 p-0 xs-flex-column d-flex align-items-center type--filter"
          @click="setSorting('type')"
          v-if="docSubTypes.includes(docType.id)"
        >
          <span class="text-primary cursor-pointer pr-10">Type</span>
          <img
            :class="{ desc: orderBy.type === 'desc' }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'type'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
          />
        </div>
        <div
          class="col-xs-6 p-0 xs-flex-column d-flex align-items-center date--filter"
          @click="setSorting('date')"
        >
          <span class="text-primary cursor-pointer">Purchased date</span>
          <img
            :class="{ desc: orderBy.date === 'desc' }"
            class="sorting-icon cursor-pointer"
            :src="
              sortingType === 'date'
                ? '/static/images/icons/caret_up.svg'
                : '/static/images/icons/caret_up_light.svg'
            "
            alt=""
            v-if="filteredList && filteredList.length > 1"
          />
        </div>
      </div>
      <div
        class="col-xs-12 p-0"
        v-for="(documentDetails, index) in filteredList"
        :key="`${documentDetails.document_id}${index}`"
      >
        <document-details
          @showMoreInfo="openMoreInfoPopup"
          :userId="userId"
          :documentDetails="documentDetails"
        ></document-details>
      </div>
    </div>
    <div v-else-if="!loader && !filteredList.length">
      <div class="col-xs-12 d-flex mt-20 col-gap-20 align-items-center">
        <img src="/static/images/icons/single_document.svg" alt="" />
        <div>
          <div class="text-h3 black-3">Start building your library!</div>
          <div>
            <a class="cursor-pointer" @click.prevent="navigateToMarketPlace"
              >Visit Marketplace</a
            >
            <span class="black-3">to purchase documents and templates</span>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
    <purchased-documents-info
      :templateInfo="documentInfo"
      :userId="userId"
      @downloadDoc="downloadDoc"
    ></purchased-documents-info>
  </div>
</template>

<script>
import $ from 'jquery';
import dayjs from 'dayjs';
import cloneDeep from 'lodash/cloneDeep';
import DocumentDetails from './DocumentDetails.vue';
import Loader from '../UIComponents/Loader.vue';
import downloadZipFile from '../UIComponents/mixins/documentsMixin';
import PurchasedDocumentsInfo from '../UIComponents/Modals/PurchasedDocumentsInfo.vue';

export default {
  mixins: [downloadZipFile],
  props: {
    purchasedBundlesList: {
      type: Array,
      default: () => [],
      required: true
    },
    purchasedList: {
      type: Array,
      default: () => [],
      required: true
    },
    documentTypes: {
      type: Array,
      default: () => [],
      required: true
    },
    docSubTypes: {
      type: Array,
      default: () => [],
      required: true
    },
    docType: {
      type: Object,
      default: () => {},
      required: true
    },
    loader: {
      type: Boolean
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      filteredList: [],
      documentInfo: {},
      loaderStatus: false,
      sortingType: 'name',
      orderBy: { name: 'asc', type: 'asc' }
    };
  },
  components: {
    DocumentDetails,
    Loader,
    PurchasedDocumentsInfo
  },
  watch: {
    purchasedList: {
      handler: 'filterList',
      immediate: true
    },
    docType: {
      handler: 'filterList',
      immediate: true
    }
  },
  methods: {
    downloadDoc(downloadPath) {
      this.downloadZipFile(downloadPath);
    },
    openMoreInfoPopup(details) {
      this.documentInfo = details;
      $('#purchased-document-info').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    filterList() {
      // if (this.docType && this.docType.id !== 0) {
      //   this.filteredList = cloneDeep(this.purchasedList.filter((doc) => doc.document_library_type_id === this.docType.id));
      // } else {
      //   this.filteredList = cloneDeep(this.purchasedList);
      // }

      if (this.docType && this.docType.id !== 0) {
        let purchasedDocsList = cloneDeep(
          this.purchasedList.filter(
            (doc) => doc.document_library_type_id === this.docType.id
          )
        );
        if ([2, 3].includes(this.docType.id))
          purchasedDocsList = [
            ...purchasedDocsList,
            ...this.purchasedBundlesList
          ];
        this.filteredList = purchasedDocsList;
      } else {
        this.filteredList = cloneDeep([
          ...this.purchasedList,
          ...this.purchasedBundlesList
        ]);
      }
      this.sortItems();
    },
    /* setFilteredList(setListWithTabTypes = false) {
      let uniqueList = {};
      if (setListWithTabTypes) {
        const lisWithTypes = this.getListWithTabTypes(this.purchasedList);
        this.listWithTabTypes = Object.keys(lisWithTypes).reduce((acc, key) => {
          acc[key] = lisWithTypes[key].sort(
            (a, b) => Number(b.is_bundle) - Number(a.is_bundle)
          );
          return acc;
        }, {});
        uniqueList = [
          ...new Set(this.purchasedList.map((item) => item.document_id))
        ];
        this.setCountForTabs(Object.keys(uniqueList).length);
      }
      if (this.activeTabName === 'all') {
        const uniqueIDList = this.getUniqueList();
        const listIds = uniqueList.length
          ? uniqueList
          : [...new Set(this.purchasedList.map((item) => item.document_id))];
        this.filteredList = listIds.map((docId) => uniqueIDList[docId]);
      } else {
        this.filteredList =
          this.listWithTabTypes[this.purchasedTabs[this.activeTabName]] || [];
      }
      this.sortItems();
    },

    getUniqueList() {
      return this.purchasedList.reduce((acc, value) => {
        acc[value.document_id] = value;
        return acc;
      }, {});
    },

    setCountForTabs(allCount = 0) {
      const counts = Object.keys(this.purchasedTabs).reduce((acc, value) => {
        const list = this.listWithTabTypes[this.purchasedTabs[value]] || [];
        acc[value] = list.length;
        return acc;
      }, {});
      this.purchasedTabCount = {
        all: allCount,
        ...counts
      };
    },

    getListWithTabTypes(list) {
      return list.reduce((acc, value) => {
        const previousList = acc[value.document_type_for_tab] || [];
        previousList.push(value);
        acc[value.document_type_for_tab] = previousList;
        return acc;
      }, {});
    }, */
    navigateToMarketPlace() {
      this.$router.push('/market-place');
    },
    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] =
        this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
      this.sortItems();
    },
    setDateTime() {
      this.filteredList.forEach((item) => {
        const formattedDateArray = [
          item.purchase_date_time[0],
          item.purchase_date_time[1] - 1,
          item.purchase_date_time[2]
        ];
        item.formattedDate = dayjs(formattedDateArray).format('D MMMM YYYY');
      });
    },
    sortItems() {
      let arrayUniqueByKey = this.filteredList;
      if (this.docType.name === 'View all') {
        arrayUniqueByKey = [
          ...new Map(
            this.filteredList.map((document) => [
              document.document_id,
              document
            ])
          ).values()
        ];
      }
      this.setDateTime();
      const list = JSON.parse(JSON.stringify(arrayUniqueByKey));
      list.sort((a, b) => this.sortList(a, b));
      this.filteredList = list;
      // const list = JSON.parse(JSON.stringify(this.filteredList));
      // list.sort((a, b) => this.sortList(a, b));
      // this.filteredList = list;
    },
    sortList(a, b) {
      if (this.sortingType === 'name') {
        if (a.name.toLowerCase() === b.name.toLowerCase()) return 0;
        if (this.orderBy.name === 'asc') {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        }
        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
      }

      if (this.sortingType === 'date') {
        if (this.orderBy.date === 'desc') {
          let sortedDate =
            new Date(
              b.purchase_date_time[0],
              b.purchase_date_time[1],
              b.purchase_date_time[2]
            ) -
            new Date(
              a.purchase_date_time[0],
              a.purchase_date_time[1],
              a.purchase_date_time[2]
            );
          if (sortedDate === 0) {
            sortedDate = a.name.trim().localeCompare(b.name.trim());
          }
          return sortedDate;
        }
        let sortedDate =
          new Date(
            a.purchase_date_time[0],
            a.purchase_date_time[1],
            a.purchase_date_time[2]
          ) -
          new Date(
            b.purchase_date_time[0],
            b.purchase_date_time[1],
            b.purchase_date_time[2]
          );
        if (sortedDate === 0) {
          sortedDate = b.name.trim().localeCompare(a.name.trim());
        }
        return sortedDate;
      }
      if (a.category === null && b.category === null) return 0;
      if (this.orderBy.type === 'asc') {
        if (a.category === null) return -1;
        if (b.category === null) return 1;
        return a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1;
      }
      if (a.category === null) return 1;
      if (b.category === null) return -1;
      return a.category.toLowerCase() > b.category.toLowerCase() ? -1 : 1;
    }
  }
};
</script>

<style scoped>
.name--filter {
  flex: 4;
}

.type--filter {
  flex: 2.5;
}

.date--filter {
  flex: 0.65;
}

.date--filter span {
  width: 120px;
}

@media screen and (max-width:650px) {
  .xs-hide-content-650 {
    display: none;
  }
}
</style>
