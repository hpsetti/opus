<template>
  <div class="OverviewCard">
    <div>
      <div
        v-for="(urraitem, i) in urraList"
        :key="`${urraitem.document_id}${i}`"
        class="overview-cards"
      >
        <document-details
          @showMoreInfo="openMoreInfoPopup"
          @setCartInfo="setCartInfo"
          :userId="userInfo.id"
          :documentDetails="urraitem"
          :key="`${urraitem.document_id}${i}`"
        ></document-details>
      </div>
    </div>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart"
    ></add-remove-cart-popup>
    <documents-info
      :templateInfo="documentInfo"
      :userId="userInfo.id"
      @setCartInfo="setCartInfo"
      @downloadDoc="downloadDocument"
    ></documents-info>
  </div>
</template>
<script>
import $ from 'jquery';

import { getDocumentsListByType } from '@apis/documents';
import EventBus from '@utils/event-bus';
import { removeFromCart } from '@apis/cart';
import DocumentsInfo from '@/components/UIComponents/Modals/DocumentsMoreInfo.vue';
import DocumentDetails from '@/components/NewDocuments/DocumentDetails.vue';
import AddRemoveCartPopup from '@/components/NewMarketPlace/Modals/AddRemoveCartPopup.vue';
import downloadZipFile from '@/components/UIComponents/mixins/documentsMixin';

export default {
  name: 'OverviewCard',
  mixins: [downloadZipFile],
  props: ['userInfo'],
  components: {
    AddRemoveCartPopup,
    DocumentDetails,
    DocumentsInfo
  },
  data() {
    return {
      urraList: [],
      documentInfo: {},
      cartInfo: {},
      loaderStatus: false
    };
  },
  async created() {
    await this.getURRAList();
  },
  methods: {
    async closeAddRemoveCart() {
      $('#addRemoveCartPopup').modal('hide');
      await this.getURRAList();
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
        await this.getURRAList();
        this.emitter.emit('cart-items-updated');
      }
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
    },
    openMoreInfoPopup(details) {
      this.documentInfo = details;
      $('#document-more-info').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    async getURRAList() {
      this.loader = true;
      const response = await getDocumentsListByType(this.userInfo.id, 6);
      this.urraList = response;
      const finalData = this.urraList.map((item) => {
          if (item.cart_status.purchase_status === 'REMOVE_FROM_CART') {
            item.cart_status.purchase_status = 'GO_TO_CART';
          }
          return item;
        });
        this.urraList = finalData;
      this.loader = false;
    },
    downloadDocument(downloadPath) {
      this.downloadZipFile(downloadPath);
    }
  }
};
</script>
<style scoped>
.OverviewCard {
  margin-bottom: 20px;
}
</style>
