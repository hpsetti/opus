<template>
  <div class="row">
    <div class="col-sm-12 col-xs-12 col-md-12">
      <OpusTabs
        :tabs="tabs"
        showTabCount
        v-model="selectedTab"
        class="pl-20"
      ></OpusTabs>
      <OpusTable
        id="hfe-user-list"
        class="users-table responsive"
        :items="filteredList"
        :fields="fields"
        :currentPage="currentPage"
        @sort-changed="sortDateEvent"
      >
        <template #empty="">
          <span>No data found!</span>
        </template>
      </OpusTable>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import moment from 'moment';
import Loader from '../UIComponents/Loader.vue';
import OpusTabs from '../UIComponents/OpusTabs.vue';
import { getUserPurchaseData } from '../../apis/profile';
import OpusTable from '../UIComponents/OpusTable.vue';
// import OpusPagination from '../../UIComponents/OpusPagination.vue';

export default {
  components: {
    Loader,
    OpusTabs,
    OpusTable
  },
  props: ['roleId'],
  data() {
    return {
      selectedTab: 'viewAll',
      loaderStatus: false,
      tabs: [],
      items: [],
      types: {
        trainings: [
          'TRAINING',
          'INSTRUCTOR_TRAINING',
          'QNA_CONSULTING',
          'INSTRUCTOR_PRE_RECORDED_TRAINING'
        ],
        documents: ['DOCUMENTS'],
        tools: ['TOOLS'],
        consulting: ['CONSULTING']
      },
      fields: [
        { key: 'plan_name', label: 'Name', sortable: true, html: true },
        { key: 'plan_type', label: 'Service Type', sortable: true, html: true },
        { key: 'purchase_date', label: 'Purchase', sortable: true, html: true },
        { key: 'activation_date', label: 'Activation', sortable: true, html: true },
        { key: 'expiry_date', label: 'Expiry', sortable: true, html: true },
        { key: 'payment_mode', label: 'Payment Mode', sortable: true, html: true },
        { key: 'price', label: 'Price', html: true }
      ],
      filteredList: [],
      perPage: 200,
      currentPage: 1,
      totalPages: 0,
      totalItems: 0
    };
  },
  watch: {
    selectedTab: {
      handler() {
        this.getFilteredList();
        this.pageNo = 1;
      }
    }
  },
  async created() {
    this.loaderStatus = true;
    this.resetTabs();
    await this.getUserPurchaseDetails();
    this.setTabCount();
    this.setDateFormat();
    this.loaderStatus = false;
  },
  methods: {
    setDateFormat() {
      this.filteredList = this.items;
      this.filteredList = this.items.map((item) => {
        let currentActivationDate;
        let currentPurchaseDate;
        let expiryDate;
        let updatedPrice = item.price;
        if (!item.price > 0) {
          updatedPrice = 'N/A';
        } else {
          updatedPrice = `$${item.price}`;
        }
        if (item.activation_date !== null) {
          const activationDate = `${item.activation_date[0]} ${item.activation_date[1]} ${item.activation_date[2]}`;
          const purchaseDate = `${item.purchase_date[0]} ${item.purchase_date[1]} ${item.purchase_date[2]}`;
          const expiryDateArray = item.expiry_date ? `${item.expiry_date[0]} ${item.expiry_date[1]} ${item.expiry_date[2]}`:'';
          if (!item.expired) {
            if (item.expiry_days > 90) {
              expiryDate = expiryDateArray ? moment(expiryDateArray, 'YYYY M D').format('DD MMM YYYY'): 'N/A';
            } else if(item.expiry_days <= 90 && item.expiry_days > 10){
              expiryDate = expiryDateArray ? `<p class='orange-bg2 table-expiry-box'>${item.expiry_days} days</p>`: 'N/A';
            } else if(item.expiry_days <= 10 && item.expiry_days > 1){
              expiryDate = expiryDateArray ? `<p class='red-bg1 white-1 table-expiry-box'>${item.expiry_days} days</p>`: 'N/A';
            } else if(item.expiry_days === 1){
              expiryDate = expiryDateArray ? `<p class='red-bg1 white-1 table-expiry-box'>${item.expiry_days} day</p>`: 'N/A';
            }
            currentActivationDate = moment(activationDate, 'YYYY M D').format('DD MMM YYYY');
            currentPurchaseDate = moment(purchaseDate, 'YYYY M D').format('DD MMM YYYY');
          } else {
            if (item.plan_type === 'CONSULTING') {
              expiryDate = `<p class='text-disabled'>N/A</p>`;
              if (item.price === 0) {
                updatedPrice = `<p class='text-disabled'>N/A</p>`;
              }
            } else {
              expiryDate = `<p class='orange-bg3 table-expiry-box text-disabled'>Expired</p>`;
              if (!item.price > 0) {
                updatedPrice = `<p class='text-disabled'>N/A</p>`;
              } else {
                updatedPrice = `<p class='text-disabled'>$${item.price}</p>`;
              }
            }
            currentActivationDate = `<p class='text-disabled'>${moment(activationDate, 'YYYY M D').format('DD MMM YYYY')}</p>`;
            currentPurchaseDate = `<p class='text-disabled'>${moment(purchaseDate, 'YYYY M D').format('DD MMM YYYY')}</p>`;
            item.payment_mode = `<p class='text-disabled'>${item.payment_mode}</p>`;
            item.plan_type = `<p class='text-disabled'>${item.plan_type}</p>`;
            item.plan_name = `<p class='text-disabled'>${item.plan_name}</p>`;
          }
        } else {
          currentActivationDate = '-';
          expiryDate = '-';
          const purchaseDate = `${item.purchase_date[0]} ${item.purchase_date[1]} ${item.purchase_date[2]}`;
          currentPurchaseDate = moment(purchaseDate, 'YYYY M D').format('DD MMM YYYY');
        }
        return {
          ...item,
          activation_date: currentActivationDate,
          purchase_date: currentPurchaseDate,
          expiry_date: expiryDate,
          price: updatedPrice
        };
      });
    },
    sortDateEvent(e) {
      if (e.sortBy === 'purchase_date' && e.sortDesc === true) {
        this.filteredList.sort((a, b) => {
          return new Date(b.purchase_date) - new Date(a.purchase_date);
        });
      } else if (e.sortBy === 'purchase_date' && e.sortDesc === false) {
        this.filteredList.sort((a, b) => {
          return new Date(a.purchase_date) - new Date(b.purchase_date);
        });
      }

      if (e.sortBy === 'activation_date' && e.sortDesc === true) {
        this.filteredList.sort((a, b) => {
          return new Date(b.activation_date) - new Date(a.activation_date);
        });
      } else if (e.sortBy === 'activation_date' && e.sortDesc === false) {
        this.filteredList.sort((a, b) => {
          return new Date(a.activation_date) - new Date(b.activation_date);
        });
      }
    },
    async getUserPurchaseDetails() {
      const response = await getUserPurchaseData();
      this.items = response.data;
      this.emitter.emit('purchaseHistoryDetailsData',this.items.length);
    },
    async getFilteredList() {
      if (this.selectedTab === 'viewAll') {
        this.setDateFormat();
      } else {
        const response = await getUserPurchaseData();
        this.items = response.data;
        const filterByIdList = this.items.filter((item) =>
          this.types[this.selectedTab].includes(item.plan_type)
        );
        this.filteredList = filterByIdList.map((item) => {
          let currentActivationDate;
          let currentPurchaseDate;
        let expiryDate;
          let updatedPrice = item.price;
          if (!item.price > 0) {
            updatedPrice = 'N/A';
          } else {
            updatedPrice = `$${item.price}`;
          }
          if (item.activation_date !== null) {
          const activationDate = `${item.activation_date[0]} ${item.activation_date[1]} ${item.activation_date[2]}`;
          const purchaseDate = `${item.purchase_date[0]} ${item.purchase_date[1]} ${item.purchase_date[2]}`;
          const expiryDateArray = item.expiry_date ? `${item.expiry_date[0]} ${item.expiry_date[1]} ${item.expiry_date[2]}`:'';
          if (!item.expired) {
            if (item.expiry_days > 90) {
              expiryDate = expiryDateArray ? moment(expiryDateArray, 'YYYY M D').format('DD MMM YYYY'): 'N/A';
            } else if(item.expiry_days <= 90 && item.expiry_days > 10){
              expiryDate = expiryDateArray ? `<p class='orange-bg2 table-expiry-box'>${item.expiry_days} days</p>`: 'N/A';
            } else if(item.expiry_days <= 10 && item.expiry_days > 1){
              expiryDate = expiryDateArray ? `<p class='red-bg1 white-1 table-expiry-box'>${item.expiry_days} days</p>`: 'N/A';
            } else if(item.expiry_days === 1){
              expiryDate = expiryDateArray ? `<p class='red-bg1 white-1 table-expiry-box'>${item.expiry_days} day</p>`: 'N/A';
            }
            currentActivationDate = moment(activationDate, 'YYYY M D').format('DD MMM YYYY');
            currentPurchaseDate = moment(purchaseDate, 'YYYY M D').format('DD MMM YYYY');
          } else {
            if (item.plan_type === 'CONSULTING') {
              expiryDate = `<p class='text-disabled'>N/A</p>`;
              if (item.price === 0) {
                updatedPrice = `<p class='text-disabled'>N/A</p>`;
              }
            } else {
              expiryDate = `<p class='orange-bg3 table-expiry-box text-disabled'>Expired</p>`;
              if (!item.price > 0) {
                updatedPrice = `<p class='text-disabled'>N/A</p>`;
              } else {
                updatedPrice = `<p class='text-disabled'>$${item.price}</p>`;
              }
            }
            currentActivationDate = `<p class='text-disabled'>${moment(activationDate, 'YYYY M D').format('DD MMM YYYY')}</p>`;
            currentPurchaseDate = `<p class='text-disabled'>${moment(purchaseDate, 'YYYY M D').format('DD MMM YYYY')}</p>`;
            item.payment_mode = `<p class='text-disabled'>${item.payment_mode}</p>`;
            item.plan_type = `<p class='text-disabled'>${item.plan_type}</p>`;
            item.plan_name = `<p class='text-disabled'>${item.plan_name}</p>`;
          }
        } else {
            currentActivationDate = '-';
          expiryDate = '-';
            const purchaseDate = `${item.purchase_date[0]} ${item.purchase_date[1]} ${item.purchase_date[2]}`;
            currentPurchaseDate = moment(purchaseDate, 'YYYY M D').format('DD MMM YYYY');
          }
          return {
            ...item,
            activation_date: currentActivationDate,
            purchase_date: currentPurchaseDate,
            expiry_date: expiryDate,
            price: updatedPrice
          };
        });
      }
    },
    resetTabs() {
      this.tabs = [
        { name: 'View All', key: 'viewAll', count: 0 },
        { name: 'Trainings', key: 'trainings', count: 0 },
        { name: 'Documents', key: 'documents', count: 0 },
        { name: 'Tools', key: 'tools', count: 0 },
        { name: 'Consulting', key: 'consulting', count: 0 },
      ];
    },
    setTabCount() {
      this.tabs[0].count = this.items.length;
      this.items.forEach((item) => {
        Object.keys(this.types).forEach((type) => {
          if (this.types[type].includes(item.plan_type)) {
            const idx = this.tabs.findIndex((tab) => tab.key === type);
            if (idx !== -1) {
              this.tabs[idx].count += 1;
            }
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.opus-table-container.responsive {
  position: absolute;
  overflow-y: scroll;
  max-height: 80vh;
  width: 90%;
  height: 45vh;
}

.users-table >>> thead tr th {
  min-width: 145px;
}

.users-table >>> tbody tr td:nth-child(2),
.users-table >>> tbody tr td:nth-child(3),
.users-table >>> tbody tr td:nth-child(4),
.users-table >>> tbody tr td:nth-child(6) {
  min-width: 120px !important;
}

.users-table >>> tbody tr td:nth-child(2),
.users-table >>> tbody tr td:nth-child(3),
.users-table >>> tbody tr td:nth-child(4),
.users-table >>> tbody tr td:nth-child(6) {
  /* width: 140px !important; */
}

.users-table >>> tbody tr td.first-col span {
  width: 175px;
  display: block;
}

@media (min-width: 1024px) {
  .opus-table-container.responsive {
    height: 55vh;
  }
}
</style>
