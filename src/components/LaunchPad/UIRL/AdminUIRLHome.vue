<template>
  <div>
    <div class="content-wrappper">
      <div class="row m-0">
        <div class="mt-20 pr-20 pl-20">
          <div
            class="col-xs-12 mb-10 d-flex align-items-center col-gap-10 mb-20 p-0"
          >
            <img
              @click="navigateToLaunchPad"
              class="back-img cursor-pointer"
              src="/static/images/icons/back_arrow.svg"
              alt=""
            />
            <router-link class="text-subtitle-2 blue-1" to="/launchpad"
              >Launchpad</router-link
            >
          </div>
          <div class="text-h3">User Interface Requirements Library</div>
          <div
            class="d-flex justify-content-end col-gap-15 row-gap-10 flex-wrap"
          >
            <BaseButton variant="secondary" has-icon @click="addCategory">
              <img
                src="/static/images/icons/plus_icon_blue.svg"
                alt="Add Category"
                class="preview-svg"
              />
              <span>Categories</span>
            </BaseButton>
            <BaseButton variant="secondary" has-icon @click="addSubCategory">
              <img
                src="/static/images/icons/plus_icon_blue.svg"
                alt="Add Subcategory"
                class="preview-svg"
              />
              <span>Sub categories</span>
            </BaseButton>
            <BaseButton variant="secondary" has-icon @click="addRecommendation">
              <img
                src="/static/images/icons/plus_icon_blue.svg"
                alt="Add Requirement"
                class="preview-svg"
              />
              <span>Add Requirement</span>
            </BaseButton>
          </div>
        </div>
        <UIRLGrid></UIRLGrid>
      </div>
      <UIRLCategoryModal></UIRLCategoryModal>
      <UIRLSubCategoryModal></UIRLSubCategoryModal>
      <AddUIRLModal
        :allCategoryList="allCategoryList"
        :getAvailableTags="getAvailableTags"
      ></AddUIRLModal>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import BaseButton from '../../UIComponents/BaseButton.vue';
import UIRLGrid from './UIRLGrid.vue';
import UIRLCategoryModal from './UIRLCategoryModal.vue';
import UIRLSubCategoryModal from './UIRLSubCategoryModal.vue';
import AddUIRLModal from './AddUIRLModal.vue';
import EventBus from '../../../utils/event-bus';
import {
  getAllCategoryData
  // getSubCategoryById,
} from '../../../apis/uirlAdmin';

export default {
  name: 'AdminUIRLHome',
  components: {
    UIRLGrid,
    UIRLCategoryModal,
    UIRLSubCategoryModal,
    AddUIRLModal,
    BaseButton
  },
  data() {
    return {
      allCategoryList: [],
      getAvailableTags: []
    };
  },
  async created() {
    this.emitter.on('getAllSubCategories', async () => {
      await this.getAllCategoriesData();
    });
    await this.getAllCategoriesData();
  },

  // Test it out later
  // async mounted() {
  //   this.emitter.on(['getAllSubCategories', 'getAllCategories'], async () => {
  //     await this.getAllCategoriesData();
  //   });
  // },
  methods: {
    async getAllCategoriesData() {
      const response = await getAllCategoryData();
      this.allCategoryList = response.filter((item) => item.active === true);
    },
    addCategory() {
      this.type = 'new_role';
      this.header = 'Category';
      $('#drl-cat').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    addSubCategory() {
      this.type = 'new_role';
      this.header = 'Sub Category';
      $('#drl-subcat').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    addRecommendation() {
      $('#add-new-rec').modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    navigateToLaunchPad() {
      this.$router.push('/launchpad');
    }
  }
};
</script>
