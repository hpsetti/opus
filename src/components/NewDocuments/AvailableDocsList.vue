<template>
  <div class="col-xs-12 p-0">
    <div v-if="filteredList.length">
      <div class="col-xs-12 d-flex sorting-container mb-20 mt-10 xs-hide-content-650">
        <div
          class="col-xs-6 p-0 xs-flex-column d-flex align-items-center"
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
          class="col-xs-6 p-0 xs-flex-column d-flex align-items-center"
          @click="setSorting('type')"
          v-if="
            docSubTypes.includes(docType.id) && totalDocumentCategoryCount !== 0
          "
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
      </div>
      <div
        class="col-xs-12 p-0"
        v-for="(documentDetails, index) in filteredList"
        :key="`${documentDetails.document_id}${index}`"
      >
        <document-details
          @showMoreInfo="openMoreInfoPopup"
          @setCartInfo="setCartInfo"
          :userId="userId"
          :documentDetails="documentDetails"
        ></document-details>
      </div>
    </div>
    <div v-if="!filteredList.length && !loader" class="col-xs-12 mt-20 mb-20">
      <div
        class="col-xs-12 col-sm-10 col-md-8 d-flex col-gap-10 align-items-start"
      >
        <img src="/static/images/purchased_resources.svg" alt="" />
        <div class="col-xs-12 d-flex flex-direction-column row-gap-10">
          <span class="text-h3 black-3"
            >You currently have full access to all available resources</span
          >
          <span class="text-subtitle-2 black-2"
            >We will notify you of any new resources as they become available
            for purchase</span
          >
        </div>
      </div>
    </div>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
    <loader :loadingStatus="loaderStatus"></loader>
    <documents-info
      :loader="loaderStatus"
      :templateInfo="documentInfo"
      :userId="userId"
      @setCartInfo="setCartInfo"
    ></documents-info>
  </div>
</template>

<script>
import $ from 'jquery';
import cloneDeep from 'lodash/cloneDeep';
import AddRemoveCartPopup from '../NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import DocumentDetails from './DocumentDetails.vue';
import DocumentsInfo from '../UIComponents/Modals/DocumentsMoreInfo.vue';
import Loader from '../UIComponents/Loader.vue';
import { removeFromCart } from '../../apis/cart';
import EventBus from '../../utils/event-bus';

export default {
  props: {
    bundlesList: {
      type: Array,
      default: () => [],
      required: true
    },
    availableList: {
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
      loaderStatus: false,
      cartInfo: {},
      documentInfo: {},
      docTypes: [],
      selectedCartItem: {},
      filteredList: [],
      sortingType: 'name',
      orderBy: { name: 'asc', type: 'asc' }
    };
  },
  components: {
    AddRemoveCartPopup,
    DocumentDetails,
    DocumentsInfo,
    Loader
  },

  watch: {
    availableList: {
      handler: 'filterList',
      immediate: true
    },
    docType: {
      handler: 'filterList',
      immediate: true
    }
  },

  methods: {
    openMoreInfoPopup(details) {
      this.documentInfo = details;
      $('#document-more-info').modal({
        backdrop: 'static',
        keyboard: false
      });
    },

    filterList() {
      if (this.docType && this.docType.id !== 0) {
        let availableDocsList = cloneDeep(
          this.availableList.filter(
            (doc) => doc.document_library_type_id === this.docType.id
          )
        );
        if ([2, 3].includes(this.docType.id))
          availableDocsList = [...availableDocsList, ...this.bundlesList];
        this.filteredList = availableDocsList;
      } else {
        const firstFiltredData = cloneDeep([
          ...this.availableList,
          ...this.bundlesList
        ]);
        const finalFilteredData = cloneDeep(firstFiltredData);
        const finalData = finalFilteredData.map((item) => {
          if (item.cart_status.purchase_status === 'REMOVE_FROM_CART') {
            item.cart_status.purchase_status = 'GO_TO_CART';
          }
          return item;
        });
        this.filteredList = finalData;
      }
      this.sortItems();
    },
    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] =
        this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
      this.sortItems();
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
      const list = JSON.parse(JSON.stringify(arrayUniqueByKey));
      list.sort((a, b) => this.sortList(a, b));
      this.filteredList = list;

      const finalData = this.filteredList.map((item) => {
          if (item.cart_status.purchase_status === 'REMOVE_FROM_CART') {
            item.cart_status.purchase_status = 'GO_TO_CART';
          }
          return item;
        });
      this.filteredList = finalData;
    },
    sortList(a, b) {
      if (this.sortingType === 'name') {
        if (a.name.toLowerCase() === b.name.toLowerCase()) return 0;
        if (this.orderBy.name === 'asc') {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        }
        return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
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
    },

    setCartInfo(cartDetails) {
      this.cartInfo = { ...cartDetails.cartInfo };
      this.selectedCartItem = cartDetails.item;
      if (
        $('#document-more-info').hasClass('in') &&
        this.cartInfo.type === 'add'
      ) {
        $('#document-more-info').modal('hide');
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
      // if (this.cartInfo.type === 'add') {
      //   this.$emit('fetchNewList');
      // }
    },
    closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.$emit('fetchNewList');
    },
    async removeFromCart() {
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const res = await removeFromCart(
        this.selectedCartItem.cart_status.cart_id
      );
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if ($('#document-more-info').hasClass('in')) {
          $('#document-more-info').modal('hide');
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        this.$emit('fetchNewList');
        this.emitter.emit('cart-items-updated');
      }
    }
  },
  computed: {
    totalDocumentCategoryCount() {
      let totalDocumentDetailsCategoryCount = 0;
      this.filteredList.forEach((item) => {
        if (item.category) {
          totalDocumentDetailsCategoryCount += 1;
        }
      });

      return totalDocumentDetailsCategoryCount;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width:650px) {
  .xs-hide-content-650 {
    display: none;
  }
}
</style>