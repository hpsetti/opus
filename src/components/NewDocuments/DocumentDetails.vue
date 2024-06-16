<template>
  <div
    class="details-wrapper col-xs-12 p-10 mb-10 d-flex xs-flex-column-650"
  >
    <div
      class="col-xs-12 p-0 d-flex col-gap-24  align-items-center"
    >
      <img
        class="training-img"
        :src="getImageUrl(documentDetails.icon)"
        alt=""
      />
      <div class="d-flex flex-direction-column col-xs-12 p-0">
        <div
          class="text-regular-large blue-1 mb-5 d-flex justify-content-between xs-flex-column"
        >
          <div
            :class="{
              'flex-50': documentDetails.category && !documentDetails.is_bundle
            }"
            class="d-flex justify-content-between"
          >
           <span>{{ documentDetails.display_plan_type }} </span> 
          <span class="black-2 lg-hide-650 ml-10 text-center">{{ documentDetails.formattedDate }}</span>

          </div>
        </div>

        <div
          class="text-subtitle-1 blue-1 mb-10 d-flex justify-content-between xs-flex-column"
        >
          <div>{{ documentDetails.name }}</div>
        </div>
        <div
          class="d-flex align-items-center cursor-pointer"
          @click="navigateToPreview()"
          v-if="!documentDetails.enrolled && !documentDetails.is_bundle"
        >
          <img
            class="pr-10"
            src="/static/images/documents/doc_preview.svg"
            alt=""
          />
          <span class="text-button-label blue-3">Preview</span>
        </div>
        <div
            v-if="documentDetails.category && !documentDetails.is_bundle"
            class="lg-hide-650 text-regular-large blue-1 mr-15"
          >
            {{ documentDetails.category }}
          </div>
      </div>
    </div>
    <!-- Action section -->
    <div
      class="col-xs-12 p-0 d-flex flex-direction-column justify-content-center"
    >
      <div
        v-if="documentDetails.is_purchased"
        class="d-flex justify-content-between xs-justify-end-650"
      >
        <div
          class="xs-hide-content-650 document-category text-primary d-flex justify-content-center mr-15"
        >
          {{ documentDetails.category }}
        </div>
        <div class="d-flex expiry-card">
          <div class="xs-hide-content-650" v-if="documentDetails.expiry_days > 90">
            <p class="text-regular-large pr-10">Expires: {{ formatPurchaseDate(documentDetails.expiry_date_time) }}</p>
          </div>
          <div class="xs-hide-content-650" v-else-if="documentDetails.expiry_days <= 90 && documentDetails.expiry_days > 10 ">
            <p class="text-regular-large orange-bg2 expiry-box">Expires: {{ documentDetails.expiry_days }} days</p>
          </div>
          <div class="xs-hide-content-650" v-else-if="documentDetails.expiry_days <= 10 && documentDetails.expiry_days > 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ documentDetails.expiry_days }} days</p>
          </div>
          <div class="xs-hide-content-650" v-else-if="documentDetails.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ documentDetails.expiry_days }} day</p>
          </div>
          <div class="document-purchasedDate xs-hide-content-650 w-120">
            {{ documentDetails.formattedDate }}
          </div>
        </div>
      </div>
      <div class="col-xs-12 p-0" v-if="!documentDetails.is_purchased">
        <div class="d-flex justify-content-between align-items-center xs-justify-end-650 mb-10">
          <div
            v-if="documentDetails.category && !documentDetails.is_bundle"
            class="xs-hide-content-650 text-regular-large blue-1 mr-15"
          >
            {{ documentDetails.category }}
          </div>
          <div class="d-flex pl-0 justify-end col-gap-20 flex-grow xs-flex-grow-unset-650">
            <span class="text-subtitle-1 black-2">Price</span>
            <span class="price-text">${{ documentDetails.price }}</span>
          </div>
        </div>
        <div
          class="d-flex pl-0 justify-end col-gap-24 align-items-center price"
        >
          <span
            class="cursor-pointer text-button-label blue-3"
            @click="openMoreInfo"
            >View Details</span
          >
          <BaseButton
            @click="addRemoveCart(documentDetails)"
            class="br-20 d-flex align-items-center"
            :has-icon="
              documentDetails.cart_status.purchase_status === 'REMOVE_FROM_CART'
            "
            :class="{
              'gray-out':
                documentDetails && documentDetails.disable_as_bundle_added_to_cart,
              primary:
                documentDetails.cart_status.purchase_status === 'ADD_TO_CART',
              secondary:
                documentDetails.cart_status.purchase_status === 'REMOVE_FROM_CART',
              tertiary:
                documentDetails.cart_status.purchase_status ===
                'GO_TO_CART'
            }"
          >
            <img
              src="/static/images/newMarketplace/goto_arrow.svg"
              v-if="
                documentDetails.cart_status.purchase_status ===
                'GO_TO_CART'
              "
              alt=""
              class="preview-svg"
            />
            <img
              src="/static/images/newMarketplace/trash.svg"
              v-if="
                documentDetails.cart_status.purchase_status ===
                'REMOVE_FROM_CART'
              "
              alt=""
              class="preview-svg"
            />
            <span>{{
              cartStatus[documentDetails.cart_status.purchase_status]
            }}</span>
          </BaseButton>
        </div>
      </div>
      <div
        class="col-xs-12 p-0 d-flex col-gap-24 justify-content-end align-items-center"
        v-else-if="documentDetails.is_purchased"
      >
        <span
          class="cursor-pointer text-button-label blue-3"
          @click="openMoreInfo"
          >View Details</span
        >
        <BaseButton
          @click="
            downLoadDocument(documentDetails.document_path, documentDetails)
          "
          has-icon
          variant="tertiary"
        >
          <img src="/static/images/icons/download_icon_white.svg" alt="" />
          <span class="pl-10">Download</span>
        </BaseButton>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import moment from 'moment';
import { cartStatus } from '../../utils/constants';
import Loader from '../UIComponents/Loader.vue';
import { addToCart } from '../../apis/cart';
import downloadZipFile from '../UIComponents/mixins/documentsMixin';
import BaseButton from '../UIComponents/BaseButton.vue';
import EventBus from '../../utils/event-bus';

export default {
  mixins: [downloadZipFile],
  props: {
    documentDetails: {
      type: Object,
      default: () => {}
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loaderStatus: false,
      cartStatus
    };
  },

  components: {
    Loader,
    BaseButton
  },
  methods: {
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return moment(formattedDateArray).format('D MMM YYYY');
      }
      return '';
    },
    getImageUrl(filePath) {
      if (filePath) {
        return `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${filePath}`;
      }
      return null;
    },
    navigateToPreview() {
      const docType = this.getQueryType();
      this.$router.push({
        path: `/documents/${this.documentDetails.document_id}`,
        query: { docType }
      });
    },

    getQueryType() {
      switch (this.documentDetails.display_plan_type) {
        case 'Use Environment Descriptions':
          return 3;
        case 'User Profiles':
          return 2;
        case 'Design Documents':
          return 5;
        case 'Use-Related Risk Analyses':
          return 6;
        case 'Known Problems Analyses':
          return 7;
        case 'Product Packages':
          return 8;
        default:
          return 1;
      }
    },
    async addRemoveCart(documentDetails) {
      const planId = documentDetails.document_id;
      const { purchase_status: purchaseStatus } = documentDetails.cart_status;
      if (purchaseStatus === 'GO_TO_CART') {
        this.$router.push('/market-place/cart');
      } else if (purchaseStatus === 'REMOVE_FROM_CART') {
        const cartInfo = {
          type: 'remove',
          body: 'Are you sure you want to remove this item?'
        };
        this.$emit('setCartInfo', {
          cartInfo,
          item: documentDetails
        });
        } else if (purchaseStatus === 'ADD_TO_CART') {
        this.loaderStatus = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'add_to_cart_button_click',
          add_to_cart_type: documentDetails.display_plan_type,
          add_to_cart_title: documentDetails.name
        });
        const body = {
          user_id: this.userId,
          plan_id: planId
        };
        const res = await addToCart(body);
        this.loaderStatus = false;
        if (res.data && res.data.status_code === 200) {
          const cartInfo = {
            type: 'add',
            body: ''
          };
          this.$emit('setCartInfo', {
            cartInfo,
            item: documentDetails
          });
          this.emitter.emit('cart-items-updated');
        }
      }
    },

    downLoadDocument(docPtah, documentDetails) {
      this.downloadZipFile(docPtah);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'download_button_click',
        download_type: documentDetails.display_plan_type,
        download_title: documentDetails.name
      });
    },

    openMoreInfo() {
      this.$emit('showMoreInfo', this.documentDetails);
    }
  }
};
</script>

<style scoped>
.details-wrapper {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.training-img {
  height: 85px;
  width: 85px;
  object-fit: cover;
  border-radius: 5px;
}

.flex-50 {
  flex: 0 0 65%;
}

.gray-out {
  opacity: 0.5;
  pointer-events: none;
}

.price-text {
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  min-width: 60px;
  text-align: right;
}

.document-category {
  width: 27%;
  text-align: center;
}

@media  screen and (min-width: 651px) {
  .lg-hide-650 {
    display: none;
  }
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .training-img {
    /* width: 100%;
    height: 100%; */
  }

  .flex-title {
    flex: 0 0 100%;
  }
}

@media screen and (max-width: 650px) {
  .xs-flex-column-650 {
    flex-direction: column;
    margin-top: 30px;
  }

  .xs-justify-end-650 {
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .xs-flex-column-justify-end {
    flex-direction: column;
    align-items: flex-end;
  }

  .xs-flex-grow-unset-650 {
    flex-grow: unset;
  }

  .xs-hide-content-650 {
    display: none;
  }
}
</style>
