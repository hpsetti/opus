<template>
  <div>
    <div class="content-wrappper">
      <div class="row rbac-header">
        <div class="col-xs-12 col-sm-12 header-props mt-10">
          <div
            class="col-lg-offset-5 col-md-offset-4 col-sm-offset-3 col-xs-offset-0 sx-align-right"
          >
            <button
              type="button"
              class="btn emergo-white-button margin"
              @click="addCategory"
            >
              <span class="text-color-blue"
                ><i class="fa fa-plus"></i> Categories</span
              >
            </button>
            <button
              type="button"
              class="btn emergo-white-button margin"
              @click="addSubCategory"
            >
              <span class="text-color-blue"
                ><i class="fa fa-plus"></i> Sub Categories</span
              >
            </button>
            <button
              type="button"
              class="btn emergo-white-button margin"
              @click="addRootCause"
            >
              <span class="text-color-blue"
                ><i class="fa fa-plus"></i> Root Cause</span
              >
            </button>
          </div>
        </div>
      </div>
      <RCAGrid></RCAGrid>
      <RCACategoryModal :type="type" :header="header"></RCACategoryModal>
      <RCASubCategoryModal :type="type" :header="header"></RCASubCategoryModal>
      <add-rca-modal
        :allCategoryList="allCategoryList"
        :getAvailableTags="getAvailableTags"
      ></add-rca-modal>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import RCAGrid from './RCAGrid.vue';
import RCACategoryModal from './RCACategoryModal.vue';
import RCASubCategoryModal from './RCASubCategoryModal.vue';
import AddRCAModal from './AddRCAModal.vue';
import EventBus from '../../../utils/event-bus';
import { getAllCategoryData, getSubCategoryById } from '../../../apis/rcaAdmin';

export default {
  components: {
    RCAGrid,
    RCACategoryModal,
    RCASubCategoryModal,
    'add-rca-modal': AddRCAModal
  },
  data() {
    return {
      header: '',
      type: '',
      roleData: {},
      selectedRoleIdToUpload: '',
      enableAddRole: false,
      allCategoryList: [],
      getAvailableTags: []
    };
  },
  async created() {
    this.emitter.on('getAllSubCategoryTags', () => {
      this.getAllCategoriesData();
    });
    await this.getAllCategoriesData();
  },
  methods: {
    async getAllCategoriesData() {
      const response = await getAllCategoryData();
      this.allCategoryList = response.filter((item) => item.active === true);
      const subCatId = response.find((item) => item.category_name === 'Tags');
      const tagsData = await getSubCategoryById(subCatId.id);
      this.getAvailableTags = tagsData.filter((item) => !!item.active);
    },
    addCategory() {
      this.type = 'new_role';
      this.header = 'Category';
      $('#addCategoryModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    addSubCategory() {
      this.type = 'new_role';
      this.header = 'Sub Category';
      $('#addSubCategoryModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    addRootCause() {
      $('#add-new-content-popup').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  }
};
</script>
<style scoped>
.rbac-header {
  margin-right: 0px;
  margin-left: 0px;
}
.header-props {
  padding: 15px;
}
.margin {
  margin-left: 10px;
}
.tracker-images {
  width: 18px;
  height: 18px;
  margin-right: 4px;
  vertical-align: top;
  margin-top: 1px;
}
@media screen and (max-width: 410px) {
  .margin {
    margin: 10px 0px 0px 35px;
    padding: 6px 25px;
  }
}
@media screen and (min-width: 768px) {
  .sx-align-right {
    text-align: right;
  }
}
</style>
