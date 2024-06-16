<template>
  <div class="row mr-0">
    <div class="col-xs-12 welcome-banner mr-0">
      <div class="col-xs-12 p-0 d-flex align-items-center mb-10">
        <img
          @click="navigateToMarketplace"
          class="cursor-pointer"
          src="/static/images/icons/chevron_left_white.svg"
          alt=""
        />
        <div class="welcome-common-header fw-300 pl-20">Documents</div>
      </div>
      <div class="col-xs-12 tools-desc col-xs-12 col-sm-6 font-14 fw-400 pl-30">
        Develop the pivotal HFE documents that are required at each stage of
        product development. From user profiles and use environment
        descriptions, to HF validation protocols and HFE reports, OPUS has you
        covered.
      </div>
    </div>
    <div
      class="col-xs-12 p-30 mb-10 subscription-options content-padding mb-10"
    >
      <div class="col-xs-12 featured-title pl-20">Featured Document</div>
      <div class="col-xs-12 col-sm-6 pl-20 mb-15">
        This template describes the contents of an HFE report. The purchase
        includes a 1-hour briefing to walkthrough the template and answer your
        questions
      </div>
      <template v-if="documentsData.featured_list">
        <div
          class="col-xs-12 pl-20"
          v-for="(documentDetails, index) in documentsData.featured_list"
          :key="`${documentDetails.plan_id}-${index}`"
        >
          <div class="purchased-tiles--container pl-10">
            <div
              v-if="windowWidth > 850"
              class="col-xs-12 d-flex mb-10 mt-15 pl-0 pr-0 dashed-border"
            >
              <div
                class="col-xs-10 xs-flex-column p-0 d-flex align-items-center pl-15"
              >
                <span class="text-primary cursor-pointer pr-10 sort-label">
                  Name
                </span>
              </div>
              <div
                class="col-xs-2 p-0 xs-flex-column d-flex align-items-center date--filter justify-content-end"
                v-if="documentDetails.purchase_date"
              >
                <span class="text-primary cursor-pointer pr-10"
                  >Purchased date</span
                >
              </div>
            </div>
            <training-details
              :userId="userId"
              :trainingDetails="documentDetails"
              @setSelectedTrainingItem="setSelectedTrainingItem"
              @setCartInfo="setCartInfo($event, 'documents')"
            />
          </div>
        </div>
      </template>
    </div>
    <div class="col-xs-12 content-padding">
      <div
        class="col-xs-12 sm-pl-15 mb-20 d-flex column-gap-10p xs-flex-column"
      >
        <img
          class="flex-desktop"
          src="/static/images/newMarketplace/documents_desktop.svg"
          alt=""
        />
        <div class="d-flex flex-direction-column flex-50">
          <div class="header-main mt-10 mb-20">
            Individual documents and bundles
          </div>
          <div class="fw-300 text-secondary">
            The Document Libraries contain dozens of HFE documents that help you
            efficiently produce high-quality HFE documentation, while also
            ensuring that your work aligns with the latest regulatory
            expectations and industry best practices. Use an OPUS document as a
            starting point or use it to identify opportunities to enhance
            documentation that you have already developed.
          </div>
          <div class="fw-300 text-secondary pr-15">
            Validity - 1 year access
          </div>
        </div>
      </div>
    </div>
    <!-- Tabs List -->
    <div class="col-xs-12 pl-30 pr-30">
      <div
        class="d-flex pl-20 align-items-center justify-content-between xs-flex-column-marketplace"
      >
        <div class="text-h3 black-2">Marketplace</div>
        <div
          style="
            width: 375px;
            max-width: 100%;
            margin-top: 10px;
            white-space: nowrap;
          "
          class="xs-width-100-650 mb-10"
        >
          <OpusSelect
            class="document-select"
            v-model="docType.available"
            :options="docTypes.available"
            trackBy="id"
            :custom-label="customLabel"
          ></OpusSelect>
        </div>
      </div>
    </div>
    <div class="col-xs-12 pl-30">
      <!-- <div class="col-xs-12 pl-20">
        <tabs v-model="activeTabName" :tabs="tabs" :tabCount="tabCount"></tabs>
      </div> -->
      <template v-if="selectedListItems.length">
        <div
          v-if="selectedListItems.length > 1"
          class="col-xs-12 d-flex dashed-border mx-20 mb-20 mt-10 xs-display-none"
        >
          <div
            class="col-xs-6 p-0 xs-flex-column d-flex align-items-center"
            @click="setSorting('name')"
          >
            <span class="text-primary cursor-pointer pr-10"> Name </span>
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
              docType.available.name === 'View all' ||
              docType.available.name === 'User Profiles' ||
              docType.available.name === 'Use Environment Descriptions'
            "
          >
            <span class="text-primary cursor-pointer pr-10"> Type </span>
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
          class="col-xs-12 pl-20"
          v-for="(documentDetails, index) in selectedListItems"
          :key="index"
        >
          <training-details
            :userId="userId"
            :trainingDetails="documentDetails"
            @setSelectedTrainingItem="setSelectedTrainingItem"
            @setCartInfo="setCartInfo($event, 'documents')"
          />
        </div>
      </template>
      <div
        v-if="!selectedListItems.length && !loaderStatus"
        class="col-xs-12 mt-20 mb-20"
      >
        <div
          class="col-xs-12 col-sm-10 col-md-8 d-flex col-gap-10 align-items-start"
        >
          <img src="/static/images/purchased_resources.svg" alt="" />
          <div class="col-xs-12 d-flex flex-direction-column row-gap-10">
            <span class="fw-400 purchased-text"
              >You currently have full access to all available resources</span
            >
            <span class="fw-300 font-18"
              >We will notify you of any new resources as they become available
              for purchase</span
            >
          </div>
        </div>
      </div>
    </div>
    <add-remove-cart-popup
      @closeAddRemoveCart="closeAddRemoveCart"
      :cartInfo="cartInfo"
      @removeFromCart="removeFromCart('documents')"
    ></add-remove-cart-popup>
    <documents-info
      :loader="loaderStatus"
      :templateInfo="selectedDocument"
      :userId="userId"
      @setCartInfo="setCartInfo($event, 'documents')"
    />
    <loader :loadingStatus="loaderStatus" />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
// import Tabs from '../../NewDocuments/Tabs.vue';
import TrainingDetails from './TrainingDetails.vue';
import DocumentsInfo from '../../UIComponents/Modals/DocumentsMoreInfo.vue';
import OpusSelect from '../../UIComponents/OpusSelect.vue';
import AddRemoveCartPopup from '../Modals/AddRemoveCartPopup.vue';
import Loader from '../../UIComponents/Loader.vue';
import { getResourcesListById } from '../../../apis/marketPlaceResources';
import { getDocumentLibraryTypes } from '../../../apis/documents';
import cartMixin from '../Mixins/shared';

export default {
  props: ['userId'],
  mixins: [cartMixin],
  data() {
    return {
      cartInfo: {},
      loaderStatus: false,
      windowWidth: window.innerWidth,
      selectedDocument: {},
      documentsData: {},
      activeTabName: 'all',
      tabCount: {
        all: 0,
        templates: 0,
        useEnvironment: 0,
        userProfiles: 0
      },
      selectedListItems: [],
      tabs: {
        templates: 'Templates',
        useEnvironment: 'Use Environment Descriptions',
        userProfiles: 'User Profiles'
      },
      documentTypes: [],
      docTypes: {
        available: []
      },
      docType: {
        available: {}
      },
      listWithTabTypes: {},
      sortingType: 'name',
      orderBy: { name: 'asc', type: 'asc' },
      typeExists: true
    };
  },
  async created() {
    await this.getList();
  },

  watch: {
    docType: {
      handler() {
        this.filterList();
      },
      deep: true
    }
  },
  components: {
    AddRemoveCartPopup,
    DocumentsInfo,
    // Tabs,
    OpusSelect,
    TrainingDetails,
    Loader
  },
  methods: {
    async getList() {
      this.loaderStatus = true;
      const resId = this.$route.params.id ? Number(this.$route.params.id) : 3;
      [this.docTypes.available, this.documentsData] = await Promise.all([
        getDocumentLibraryTypes(),
        getResourcesListById(resId, this.userId)
      ]);
      const finalData = this.documentsData.item_list.map((obj) => {
        const planType = obj.plan_type;
        if (!obj[planType].cart_status) return obj;
        if (obj[planType].cart_status.purchase_status === 'REMOVE_FROM_CART')
          obj[planType].cart_status.purchase_status = 'GO_TO_CART';
        return obj;
      });
      const finalFeatureData = this.documentsData.featured_list.map((obj) => {
        const planType = obj.plan_type;
        if (!obj[planType].cart_status) return obj;
        if (obj[planType].cart_status.purchase_status === 'REMOVE_FROM_CART')
          obj[planType].cart_status.purchase_status = 'GO_TO_CART';
        return obj;
      });
      this.documentsData.item_list = finalData;
      this.documentsData.featured_list = finalFeatureData;
      this.setTabInfo();
      this.loaderStatus = false;
    },

    setTabInfo(selectedDoc = '') {
      const all = {
        id: 0,
        name: 'View all',
        icon: '/icons/document-library/templates.png',
        no_of_documents: 0,
        sequence: 0
      };
      const availableTab = all;
      const types = cloneDeep(this.docTypes.available);
      let allCount = 0;
      let bundle = false;
      types.reduce((acc, value, index) => {
        acc[value.name] = this.documentsData.item_list.filter(
          (doc) => doc[value.name]
        );
        const typeCount = acc[value.name].length;
        this.docTypes.available[index].no_of_documents = typeCount;
        allCount += typeCount;
        this.documentsData.item_list.forEach((item) => {
          if (
            item.plan_name === 'All Access: User Profiles and Use Environments'
          ) {
            bundle = true;
          }
        });
        return acc;
      }, {});
      if (bundle === true) {
        allCount -= 1;
      }
      all.no_of_documents = allCount;
      this.docTypes.available = [...[all], ...this.docTypes.available];
      availableTab.no_of_documents = allCount;
      if (!this.docType.available.name) {
        this.docType.available = selectedDoc
          ? this.docTypes.available.find(
              (tab) =>
                tab.name.replaceAll(' ', '').toLowerCase() ===
                selectedDoc.toLowerCase()
            )
          : availableTab;
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

    navigateToMarketplace() {
      this.$router.push('/market-place');
    },
    setSorting(type) {
      this.sortingType = type || 'name';
      this.orderBy[this.sortingType] =
        this.orderBy[this.sortingType] === 'asc' ? 'desc' : 'asc';
      this.sortItems();
    },
    sortItems() {
      let arrayUniqueByKey = this.selectedListItems;
      if (this.docType.available?.name === 'View all') {
        arrayUniqueByKey = [
          ...new Map(
            this.selectedListItems.map((document) => [
              document.plan_id,
              document
            ])
          ).values()
        ];
      }
      const list = JSON.parse(JSON.stringify(arrayUniqueByKey));
      list.sort((a, b) => this.sortList(a, b));
      // list.forEach((item) => {
      //   if (item[item.plan_type]) console.log(item[item.plan_type].category);
      // });
      this.selectedListItems = list;
    },
    sortList(a, b) {
      if (this.sortingType === 'name') {
        if (a.plan_name.toLowerCase() === b.plan_name.toLowerCase()) return 0;
        if (this.orderBy.name === 'asc') {
          return a.plan_name.toLowerCase() > b.plan_name.toLowerCase() ? 1 : -1;
        }
        return a.plan_name.toLowerCase() > b.plan_name.toLowerCase() ? -1 : 1;
      }
      const aVal = a[a.plan_type].category;
      const bVal = b[b.plan_type].category;
      if (aVal === null && bVal === null) return 0;
      if (this.orderBy.type === 'asc') {
        if (aVal === null) return -1;
        if (bVal === null) return 1;
        return aVal.toLowerCase() > bVal.toLowerCase() ? 1 : -1;
      }
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      return aVal.toLowerCase() > bVal.toLowerCase() ? -1 : 1;
    },
    filterList() {
      if (this.docType && this.docType.available.id !== 0) {
        this.selectedListItems = cloneDeep(
          this.documentsData.item_list.filter((doc) => {
            return doc[this.docType.available.name];
          })
        );
      } else {
        this.selectedListItems = cloneDeep(this.documentsData.item_list);
      }
      this.sortItems();
    },
    customLabel(option) {
      return `${option.name} (${option.no_of_documents})`;
    }
  }
};
</script>

<style scoped>
.welcome-banner {
  background: url('/static/images/newMarketplace/welcomebanner.svg') no-repeat;
  background-size: cover;
}

.document-select-container {
  max-width: 100%;
}

.document-select >>> .opus-multiselect.multiselect,
.opus-multiselect.multiselect.sm {
  width: 327px;
}

.content-padding {
  padding: 30px 15px 24px 50px;
}

.subscription-options,
.other-info {
  background: #ecf7fc;
}

.column-gap-10p {
  column-gap: 10%;
}

.flex-50 {
  flex: 0 0 50%;
}

.no-data-text {
  color: #d3d6d9;
}

@media screen and (min-width: 757px) {
  .sm-pl-15 {
    padding-left: 15px;
  }
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }

  .content-padding {
    padding: 30px 15px 24px 30px;
  }

  .xs-display-none {
    display: none;
  }

  .xs-flex-column-marketplace {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 600px) {
  .xs-flex-column-marketplace {
    flex-direction: column;
    row-gap: 10px;
    align-items: flex-start;
  }
}
.xs-width-100-650 >>> .opus-multiselect.multiselect,
.xs-width-100-650 >>> .opus-multiselect.multiselect.sm {
  max-width: 100%;
}

.xs-width-100-650 >>> .opus-multiselect.sm .multiselect__tags {
  min-height: 36px;
  height: auto;
}
</style>
