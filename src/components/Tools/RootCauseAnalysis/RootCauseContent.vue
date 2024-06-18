<template>
  <div class="root-cause-main-content">
    <div class="row">
      <div class="col-sm-4 col-md-3 filters-main p-0 view-filters-main">
        <div class="pt-20 filters-select-card pl-10 pb-10">
          <div class="flex pl-10">
            <p class="step-common step-style"><span class="number">1</span></p>
            <p class="filter-text pr-10">Select Filters</p>
          </div>
          <div
            class="d-flex flex-wrap justify-content-center col-gap-15 pt-10 pb-10"
          >
            <button class="btn btn-light reset-text" @click="resetFilters">
              Reset all
            </button>
            <BaseButton
              :disabled="!selectedFilterId.length"
              @click="getRCAData(selectedFilterId)"
              >Apply</BaseButton
            >
          </div>
        </div>
        <div>
          <div
            class="panel-group"
            id="accordion0"
            role="tablist"
            aria-multiselectable="true"
          >
            <div
              class="panel panel-default"
              v-for="(item, index) in rootCauseFilters"
              :key="index"
            >
              <div
                class="panel-heading"
                role="tab"
                id="headingTwo"
                v-if="!isPurchased"
              >
                <h4
                  class="panel-title"
                  :class="
                    index === 0 ? 'not-disable-filters' : 'disable-filters'
                  "
                >
                  <a
                    class="collapsed"
                    role="button"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    :href="'#collapse' + index"
                    :aria-controls="'#collapse' + item"
                    @click.prevent
                  >
                    <span class="main-list-header">{{ item.filter_name }}</span>
                  </a>
                </h4>
              </div>
              <div class="panel-heading" role="tab" id="headingTwo" v-else>
                <h4 class="panel-title">
                  <a
                    class="collapsed"
                    role="button"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    :href="'#collapse' + index"
                    :aria-controls="'#collapse' + item"
                    @click.prevent
                  >
                    <span class="main-list-header">{{ item.filter_name }}</span>
                  </a>
                </h4>
              </div>
              <div
                :id="'collapse' + index"
                class="panel-collapse collapse"
                role="tabpanel"
                aria-labelledby="headingTwo"
              >
                <div
                  class="pt-10"
                  v-for="selected in item.sub_categories"
                  :key="selected.id"
                >
                  <div class="row">
                    <div
                      class="pl-40 flex"
                      :class="
                        !isPurchased &&
                        !['Software', 'Hardware'].includes(
                          selected.sub_category_name
                        )
                          ? 'disable-filters'
                          : 'not-disable-filters'
                      "
                    >
                      <div class="select-box">
                        <div class="checkbox">
                          <label>
                            <input
                              type="checkbox"
                              :value="selected.id"
                              v-model="selectedFilterId"
                              :disabled="
                                !isPurchased &&
                                !['Software', 'Hardware'].includes(
                                  selected.sub_category_name
                                )
                              "
                            />
                            <span class="cr">
                              <i class="cr-icon glyphicon glyphicon-ok"></i>
                            </span>
                          </label>
                        </div>
                      </div>
                      <p class="pl-20">{{ selected.sub_category_name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tags">
          <div
            id="tagDropdown"
            class="col-xs-12 pb-20"
            :class="!isPurchased ? 'disable-filters' : 'not-disable-filters'"
          >
            <label>Tags</label>
            <multiselect
              :close-on-select="false"
              :allow-empty="true"
              :searchable="true"
              :multiple="true"
              :class="[enteredTag.length ? 'has-values' : 'no-values']"
              class="multiselect-single-dropdown"
              v-model="enteredTag"
              placeholder="Select Tags"
              :options="rootCauseTags.map((tag) => tag.id)"
              :custom-label="
                (opt) =>
                  rootCauseTags.find((x) => x.id === opt).sub_category_name
              "
              :show-labels="false"
              :open-direction="'top'"
              @select="pushTags"
              :disabled="!isPurchased"
            ></multiselect>
          </div>
        </div>
        <div class="learn-more-main">
          <div class="col-xs-12 pb-20 d-flex learn-more" @click="viewPdf">
            <img
              class="new_member_img"
              src="/static/images/icons/learn-more-filters.svg"
            />
            <p class="learn-filters">Learn about filters</p>
          </div>
        </div>
      </div>
      <div
        class="col-sm-8 col-md-9 p-0"
        :class="{ 'view-results-main': rootCauseInfo.length > 0 }"
      >
        <div class="pt-20 pl-10 pb-10">
          <!-- Use flex in place of grid as much as possible -->
          <div class="flex justify-content-between align-items-center">
            <div class="flex pl-10">
              <span
                class="step-common step-no-style"
                v-if="!rootCauseInfo.length"
                >2</span
              >
              <span class="step-common step-style" v-else>2</span>
              <p class="filter-text pr-10">View Results</p>
            </div>
            <div class="mr-10 custom-width" v-if="isPurchased">
              <div>
                <div
                  v-if="hasExpand"
                  class="cursor-pointer"
                  :class="
                    isActive ? 'search-container-expand' : 'search-container'
                  "
                >
                  <img
                    class="image-search"
                    src="/static/images/icons/search_icon.svg"
                    alt="Search"
                    @click="makeBarExpand"
                  />
                  <input
                    v-if="isActive"
                    type="text"
                    class="search-bar p-10"
                    :placeholder="placeholder"
                    v-model="searchText"
                    @keydown.enter="search"
                  />
                </div>
                <div
                  v-else
                  class="search-container-expand pl-10 pr-10 cursor-pointer"
                >
                  <img
                    class="image-search"
                    src="/static/images/icons/search_icon.svg"
                    @click="search"
                    alt="Search"
                  />
                  <input
                    type="text"
                    class="search-bar p-10"
                    :placeholder="placeholder"
                    v-model="searchText"
                    @keydown.enter="search"
                  />
                  <!-- @keyup="search" -->
                  <img
                    v-if="searchText"
                    @click="clear"
                    src="/static/images/icons/danger_close_icon.svg"
                    alt="Clear search query"
                  />
                </div>
              </div>
              <!-- <OpusSearchBar placeholder="Search" :hasExpand="true" :searchOnEnter="true" @search="searchRootCause"></OpusSearchBar> -->
            </div>
          </div>
          <div
            class="d-flex align-items-center justify-content-end pt-20 pb-10 pr-15"
          >
            <span
              class="pl-10 margin-right-auto"
              v-if="rootCauseInfo.length > 0"
              >{{ rootCauseInfo.length }} items</span
            >
            <div class="d-flex col-gap-10">
              <BaseButton
                variant="secondary"
                has-icon
                class=""
                :disabled="!rootCauseInfo.length"
                @click="selectedFilesRca"
              >
                <img
                  src="/static/images/icons/rca_copy.svg"
                  class="preview-svg"
                />
                <span>Copy</span>
              </BaseButton>
              <BaseButton
                has-icon
                :disabled="!rootCauseInfo.length"
                @click="downloadRootCause"
              >
                <img
                  src="/static/images/icons/rca_download.svg"
                  class="preview-svg"
                />
                <span>Download</span>
              </BaseButton>
            </div>
          </div>
        </div>
        <div class="col-xs-12 mt-20 table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 40px !important">
                  <div class="select-box" v-if="rootCauseInfo.length > 0">
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          id="select_all"
                          class="form-control"
                          v-model="selectAllFiles"
                        />
                        <span class="cr">
                          <i class="cr-icon glyphicon glyphicon-ok"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                </th>
                <th class="root-heading">Root cause title</th>
                <th class="root-heading">Sample use error title</th>
              </tr>
            </thead>
            <tbody v-if="rootCauseInfo.length > 0">
              <tr
                v-for="(root, index) in rootCauseInfo"
                :key="index"
                :class="
                  !isPurchased && index >= 5
                    ? 'disable-filters'
                    : 'not-disable-filters'
                "
              >
                <td class="pl-15" style="width: 40px !important">
                  <div class="select-box">
                    <div class="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          id="select_all"
                          class="form-control"
                          v-model="selectedFiles"
                          :value="root.id"
                          :disabled="isPurchased === 1 && index >= 5"
                        />
                        <span class="cr">
                          <i class="cr-icon glyphicon glyphicon-ok"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                </td>
                <td class="root-title" @click.stop="openInfoModal(root, index)">
                  {{ root.rca_title }}
                </td>
                <td class="root-error">{{ root.sample_error }}</td>
              </tr>
            </tbody>
            <div
              class="col-xs-12 mt-20 no-data center"
              v-else
              :class="isEmpty ? 'display-none' : 'display-block'"
            >
              <img
                class="new_member_img"
                src="/static/images/icons/rca_select_filters.svg"
              />
              <h3 class="select-filter-text text-color">
                Select and apply filters to <br />
                view matching root causes
              </h3>
              <p class="text-color ft-18">
                Select additional filters to view more results
              </p>
            </div>
            <div
              class="col-xs-12 mt-20 no-data center"
              v-if="rootCauseInfo.length === 0"
              :class="isEmpty ? 'display-block' : 'display-none'"
            >
              <img
                class="new_member_img"
                src="/static/images/icons/rca_filter_not_found.svg"
              />
              <h3 class="select-filter-text text-color">
                Sorry, no results found
              </h3>
              <p class="text-color ft-18">
                Try again by adjusting your filters for different results
              </p>
            </div>
          </table>
          <div class="pagination-wrapper" v-if="rootCauseInfo.length > 0">
            <pagination
              :totalPages="totalPages"
              v-if="total"
              :maxVisibleButtons="maxVisiblePages"
              :total="total"
              :perPage="perPage"
              :currentPage="currentPage"
              @pagechanged="pagechanged"
            ></pagination>
          </div>
          <!-- Not purchased block -->
          <div
            class="col-xs-12 mt-20 center tool-freeversion-image"
            v-if="!isPurchased && rootCauseInfo.length > 0"
          >
            <img
              class="new_member_img"
              src="/static/images/icons/tools_freeversion_lock.svg"
            />
            <h3 class="tool-free-text">
              To access all results and use all <br />
              filters, purchase RCA Wizard
            </h3>
            <market-place-tools
              :loader="loaderStatus"
              :userId="userId"
              toolName="Root Cause Analysis Wizard"
            ></market-place-tools>
          </div>
        </div>
      </div>
    </div>
    <root-cause-info-modal
      :rootCauseModalInfo="rootCauseModalInfo"
      :index="rcaIndex"
      @EmitNextRootCause="EmitNextRootCause"
      @EmitPreviousRootCause="EmitPreviousRootCause"
      :totalCurrentRecords="rootCauseInfo.length"
    ></root-cause-info-modal>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>
<script>
import $ from "jquery";
import FileSaver from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import Multiselect from "vue-multiselect";
import dayjs from "dayjs";
import Loader from "../../UIComponents/Loader.vue";
import RootCauseInfoModal from "./RootCauseInfoModal.vue";
import {
  getRootCauseData,
  getRootCauseFilters,
  getSelectedRootCause,
  getRcaFiltersPDF,
  getSearchRootCause,
} from "../../../apis/rootCauseAnalysis";
import { getToolsPurchaseData } from "../../../apis/designRecommendationLibrary";
import { getResourcesListById } from "../../../apis/marketPlaceResources";
import Pagination from "../../LaunchPad/Pagination.vue";
import marketPlaceTools from "../marketPlaceTools.vue";
import BaseButton from "../../UIComponents/BaseButton.vue";
import postMarketoFormData from "../../../apis/marketo";

export default {
  props: ["userId"],
  data() {
    return {
      loaderStatus: false,
      selectAllFiles: false,
      selectedFiles: [],
      rootCauseInfo: {},
      rootCauseFilters: {},
      selectedFilterId: [],
      rootCauseModalInfo: {},
      enteredTag: "",
      totalPages: 1,
      total: 0,
      perPage: 20,
      fromRecords: 1,
      currentPage: 1,
      maxVisiblePages: 4,
      rootCauseTags: [],
      copiedData: [],
      finalData: [],
      response: {},
      toolsData: {},
      isPurchased: 1,
      isEmpty: false,
      rcaIndex: -1,
      totalCurrentRecords: "",
      searchText: "",
      isActive: false,
      hasExpand: true,
      placeholder: "Search",
      selectedAllFilesIndeterminate: false,
    };
  },
  components: {
    Multiselect,
    Loader,
    RootCauseInfoModal,
    Pagination,
    marketPlaceTools,
    BaseButton,
  },
  async created() {
    this.loaderStatus = true;
    await Promise.all([this.getRootCauseFilters(), this.getList()]);
    this.loaderStatus = false;
  },

  watch: {
    enteredTag(newValue, oldValue) {
      this.selectedFilterId = this.selectedFilterId.filter(
        (item) => !oldValue.includes(item)
      );
      const seletedTag = [...this.selectedFilterId, ...this.enteredTag];
      this.selectedFilterId = [...new Set(seletedTag)];
    },
    selectAllFiles() {
      if (this.selectAllFiles) {
        this.selectedFiles = this.rootCauseInfo.map((item) => item.id);
        this.selectedAllFilesIndeterminate = false;
      } else if (this.selectedAllFilesIndeterminate === false) {
        this.selectedAllFilesIndeterminate = false;
        this.selectedFiles = [];
      }
    },
    selectedFiles() {
      if (
        this.selectedFiles.length === this.rootCauseInfo.length &&
        this.rootCauseInfo.length !== 0
      ) {
        this.selectAllFiles = true;
      } else {
        this.selectedAllFilesIndeterminate = true;
        this.selectAllFiles = false;
      }
    },
  },

  methods: {
    makeBarExpand() {
      this.isActive = !this.isActive;
      this.clear();
    },
    async search() {
      if (this.searchText !== "") {
        this.fromRecords = 1;
        this.currentPage = 1;
        this.searchRootCause(this.searchText);
      }
      this.setSelectionsAsEmpty();
      this.isEmpty = false;
      this.selectedFilterId = [];
      this.rootCauseInfo = [];
      this.enteredTag = [];
    },
    clear() {
      this.searchText = "";
    },
    async viewPdf() {
      this.loaderStatus = true;
      const response = await getRcaFiltersPDF();
      this.loaderStatus = false;
      this.$router.push({
        name: "RootCausePdfViewer",
        query: {
          pdfPath: response,
          pdfName: "RCA Wizard – Learn About Filters",
          id: 2,
        },
      });
    },
    async searchRootCause(query) {
      const formData = {
        pagination: {
          current_page: this.fromRecords,
          result_per_page: this.perPage,
        },
        search: query,
      };
      this.loaderStatus = true;
      const data = await getSearchRootCause(formData);
      this.rootCauseInfo = data.data.result_data;
      if (data) {
        this.total = data.data.total_records_count;
        this.totalRecordsCount =
          this.total > this.totalRecordsCount
            ? this.total
            : this.totalRecordsCount;
        this.totalPages = Math.ceil(this.total / this.perPage);
      }
      this.loaderStatus = false;
    },
    EmitNextRootCause() {
      this.rcaIndex += 1;
      if (this.rcaIndex === this.rootCauseInfo.length) {
        this.rcaIndex = 0;
      }
      this.rootCauseModalInfo = this.rootCauseInfo[this.rcaIndex];
    },
    EmitPreviousRootCause() {
      this.rcaIndex -= 1;
      if (this.rcaIndex === -1) {
        this.rcaIndex = this.rootCauseInfo.length - 1;
      }
      this.rootCauseModalInfo = this.rootCauseInfo[this.rcaIndex];
    },
    async getList() {
      this.loaderStatus = true;
      const [purchasedData, toolsData] = await Promise.all([
        getToolsPurchaseData(+this.userId),
        getResourcesListById(1, this.userId),
      ]);
      this.toolsData = toolsData;
      // this.toolsData = await getResourcesListById(1, this.userId);
      // const purchasedData = await getToolsPurchaseData(+this.userId);
      this.isPurchased = purchasedData[1].enrolled;
      this.loaderStatus = false;
    },
    async selectedFilesRca() {
      this.loaderStatus = true;
      this.finalData = [];
      this.copiedData = [];
      this.response = await getSelectedRootCause(this.selectedFiles);
      for (let i = 0; i < this.response.length; i += 1) {
        const title = `${this.response[i].title}\n`;
        const commentary = `${this.response[i].commentary}\n\n`;
        this.copiedData.push(title);
        this.copiedData.push(commentary);
        this.finalData = [...this.copiedData].join("");
      }
      if (this.finalData.length > 0) {
        this.$copyText(this.finalData).then(
          () => {
            this.$notify({
              type: "success",
              title: "Success",
              text: "Copied successfully!",
            });
          },
          () => {
            this.$notify({
              type: "error",
              title: "Error",
              text: "Copy failed!",
            });
          }
        );
        const marketoForm = {
          email: JSON.parse(localStorage.getItem("userData")).email,
          Last_Interest: "Human Factors Research & Design",
          page_urlextended: window.location.href,
          page_urlreferral_extended: document.referrer,
          form_control: "Copy",
          form_control_details: "Root Causes",
        };
        postMarketoFormData(marketoForm);
      } else {
        this.$notify({
          type: "error",
          title: "Error",
          text: "Select atleast one root cause to copy!",
        });
      }
      this.loaderStatus = false;
    },
    async downloadRootCause() {
      this.loaderStatus = true;
      this.finalData = [];
      this.copiedData = [];
      const response = await getSelectedRootCause(this.selectedFiles);
      for (let i = 0; i < response.length; i += 1) {
        const title = new Paragraph({
          text: `${response[i].title.trim()}`,
          style: "default-paragraph",
        });
        const commentary = new Paragraph({
          text: `${response[i].commentary}`,
          style: "default-paragraph",
        });
        const newLine = new Paragraph("");
        this.copiedData.push(title);
        this.copiedData.push(commentary);
        this.copiedData.push(newLine);
      }
      this.finalData = [...this.copiedData];
      const rcaDate = dayjs().format("MMDDYYYY");
      if (this.finalData.length > 0) {
        const doc = new Document({
          styles: {
            paragraphStyles: [
              {
                id: "default-paragraph",
                name: "Default Paragraph",
                run: {
                  font: "Calibri",
                },
              },
            ],
          },
          sections: [
            {
              properties: {},
              children: [...this.finalData],
            },
          ],
        });
        if (this.selectedFiles.length > 1) {
          Packer.toBlob(doc).then((blob) => {
            FileSaver.saveAs(blob, `RCA_${rcaDate}.docx`);
          });
        } else {
          Packer.toBlob(doc).then((blob) => {
            FileSaver.saveAs(blob, `${response[0].title}_${rcaDate}.docx`);
          });
        }
        const marketoForm = {
          email: JSON.parse(localStorage.getItem("userData")).email,
          Last_Interest: "Human Factors Research & Design",
          page_urlextended: window.location.href,
          page_urlreferral_extended: document.referrer,
          form_control: "Download",
          form_control_details: "Root Causes",
        };
        postMarketoFormData(marketoForm);
      } else {
        this.$notify({
          type: "error",
          title: "Error",
          text: "Select atleast one root cause to download!",
        });
      }
      this.loaderStatus = false;
    },
    async getRootCauseFilters() {
      const data = await getRootCauseFilters();
      const rcaFilters = data.filters;
      this.rootCauseFilters = rcaFilters.filter((item) => item.active === true);
      this.rootCauseTags = data.tags;
    },
    async pagechanged(currentPage) {
      if (currentPage) this.currentPage = currentPage;
      this.fromRecords = this.currentPage;
      this.setSelectionsAsEmpty();
      // this.selectAllFiles = false;
      await this.getRCADataPagination(this.selectedFilterId);
    },
    async pushTags(selectedOption) {
      const selectedTagName = this.rootCauseTags.filter(
        (item) => item.id === selectedOption
      );
      this.rootCauseFilterTags = selectedTagName;
    },
    addListFilters(selectedOption) {
      this.selectedFilterId.push(selectedOption);
    },
    openInfoModal(info, index) {
      this.rootCauseModalInfo = info;
      this.rcaIndex = index;
      $("#root-cause-info").modal("show");
    },
    getFormData() {
      const formData = {
        pagination: {
          current_page: this.fromRecords,
          result_per_page: this.perPage,
        },
        sub_category_ids: this.selectedFilterId,
      };
      this.searchText = this.searchText
        ? (formData.search = this.searchText.trim())
        : "";
      this.filterObj =
        Object.keys(this.filterObj).length !== 0
          ? (formData.filter = this.filterObj)
          : {};
      return formData;
    },
    async getRCAData(filterList) {
      // this.selectAllFiles = false;
      this.isActive = false;
      this.searchText = "";
      this.setSelectionsAsEmpty();
      this.currentPage = 1;
      const formData = {
        pagination: {
          current_page: 1,
          result_per_page: this.perPage,
        },
        sub_category_ids: filterList,
      };
      this.loaderStatus = true;
      const data = await getRootCauseData(formData);
      if (!this.isPurchased) {
        this.rootCauseInfo = data.data.result_data.slice(0, 5);
      } else {
        this.rootCauseInfo = data.data.result_data;
        if (this.rootCauseInfo.length > 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
        if (data) {
          this.total = data.data.total_records_count;
          this.totalRecordsCount =
            this.total > this.totalRecordsCount
              ? this.total
              : this.totalRecordsCount;
          this.totalPages = Math.ceil(this.total / this.perPage);
        }
      }
      const marketoForm = {
        email: JSON.parse(localStorage.getItem("userData")).email,
        Last_Interest: "Human Factors Research & Design",
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: "Apply RCA Filter",
        form_control_details: filterList.join(", "),
      };
      postMarketoFormData(marketoForm);
      this.loaderStatus = false;
    },
    async getRCADataPagination(filterList) {
      const formData = {
        pagination: {
          current_page: this.fromRecords,
          result_per_page: this.perPage,
        },
        sub_category_ids: filterList,
      };
      this.loaderStatus = true;
      const data = await getRootCauseData(formData);
      this.rootCauseInfo = data.data.result_data;
      if (data) {
        this.total = data.data.total_records_count;
        this.totalRecordsCount =
          this.total > this.totalRecordsCount
            ? this.total
            : this.totalRecordsCount;
        this.totalPages = Math.ceil(this.total / this.perPage);
      }
      this.loaderStatus = false;
    },
    resetFilters() {
      this.setSelectionsAsEmpty();
      this.isEmpty = false;
      this.selectedFilterId = [];
      this.rootCauseInfo = [];
      this.enteredTag = [];
      this.isActive = false;
    },

    setSelectionsAsEmpty() {
      this.selectAllFiles = false;
      this.selectedFiles = [];
    },
  },
};
</script>

<style scoped>
.disable-filters {
  opacity: 0.4;
}
.custom-width {
  width: 65%;
}
.learn-filters {
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #00518a;
  margin-bottom: 0px;
  margin-left: 10px;
}
.learn-more {
  cursor: pointer;
  border-top: 1px solid #cdcdcd;
  padding-top: 15px;
}
.tool-freeversion-image {
  background-image: url(/static/images/tools/tools-freeversion.jpg);
}
.text-color {
  color: #828282;
}
.ft-18 {
  font-size: 18px;
  font-weight: 300;
}
.tool-free-text {
  font-size: 24px;
  font-weight: 300;
  line-height: 33px;
}
.select-filter-text {
  font-size: 32px;
  font-weight: 400;
  line-height: 44px;
}
.filters-main {
  margin-left: -5px;
  min-height: 80vh;
}
.view-results-main {
  border-left: 1px solid #cdcdcd;
  height: auto;
}
.view-filters-main {
  border-right: 1px solid #cdcdcd;
  height: auto;
}
.multiselect-single-dropdown >>> .multiselect__tags {
  height: auto !important;
  padding: 10px 40px 10px 14px;
  display: block;
}
.multiselect-single-dropdown.no-values >>> .multiselect__tags {
  height: 40px !important;
}
.multiselect-single-dropdown >>> .multiselect__select {
  top: 5px;
}
.multiselect-single-dropdown >>> .multiselect__placeholder {
  padding: 0px 0px 0px 5px !important;
}

.multiselect-single-dropdown >>> .multiselect__option {
  font-family: "Nunito";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}
.panel-default > .panel-heading {
  color: #333;
  background-color: #ffffff !important;
  border-color: #ffffff;
}
.panel-default {
  border-color: #ffffff !important;
}
.panel {
  -webkit-box-shadow: 0 0px 0px rgb(0 0 0 / 5%) !important;
  box-shadow: 0 0px 0px rgb(0 0 0 / 5%) !important;
}
.step-common {
  font-weight: 300;
  font-size: 16px;
  line-height: 30px;
  margin-top: 8px;
  text-align: center;
  color: #333333;
  background: #ffffff;
  -webkit-box-shadow: 2.97297px 2.97297px 7.43243px rgb(0 0 0 / 25%);
  box-shadow: 2.97297px 2.97297px 7.43243px rgb(0 0 0 / 25%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.step-style {
  border: 5px solid #4c9e45 !important;
}
.step-no-style {
  border: 5px solid #757575 !important;
}
.filter-text {
  font-size: 24px;
  line-height: 38px;
  padding: 8px 0px 0px 20px;
}
.filters-select-card {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
.main-list-header {
  word-wrap: break-word;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #4d4d4d;
}
.main-list-header:after {
  content: url(/static/images/icons/chevron_down_black.svg);
  position: absolute;
  right: 14px;
}
a[aria-expanded="false"] .main-list-header:after {
  content: url(/static/images/icons/chevron_down_black.svg);
  position: absolute;
  right: 14px;
}

a[aria-expanded="true"] .main-list-header:after {
  content: url(/static/images/icons/chevron_down_black.svg);
  position: absolute;
  right: 14px;
  top: 6px;
  transform: rotate(180deg);
}
.panel-title {
  position: relative !important;
}

.no-data {
  position: absolute;
}
.root-title {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #0c3859;
}
.root-error {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #0c3859;
}
.root-title:hover {
  text-decoration: underline;
}
.root-heading {
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
}
.copy-btn {
  display: flex;
  padding: 5px 16px;
  height: 36px;
  color: #0b3c61;
  font-size: 18px;
  font-weight: 600;
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}
.download-btn {
  display: flex;
  padding: 5px 16px;
  height: 36px;
  background: #4c9e45;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

/* Tag related classes */
.el-tag {
  margin-right: 10px !important;
  margin-bottom: 7px;
}

.el-tag {
  background-color: #ffeec1;
  border-color: #e9e9eb;
  color: #333333;
}
.form-field {
  height: auto;
  min-height: 44px;
  border: 1px solid #000000;
  cursor: text;
  border-radius: 3px;
}

.form-field > input {
  display: block;
  box-sizing: border-box;
  height: 44px;
  border: none;
  display: inline-block;
  background-color: transparent;
}

.form-field > input:focus {
  outline: none;
}
.checkbox {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.reset-text {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  align-items: center;
  text-align: center;
  color: #0b3c61;
}
.result-items {
  position: absolute;
  margin-top: 15px;
  padding-left: 20px;
}
.sortKey.asc:before {
  content: url("/static/images/icons/sortDesc.svg");
  position: relative;
  top: -3px;
  left: 2px;
}
.sortKey.dsc:before {
  content: url("/static/images/icons/sortDesc.svg");
  display: inline-block;
  transform: rotate(180deg);
  position: relative;
  top: 3px;
  left: 2px;
}
/* For search bar, TO DO:  can make as seperate component */
.search-container {
  border: 1px solid rgba(0, 0, 0);
  border-radius: 22px;
  display: flex;
  height: 40px;
  width: 40px;
  float: right;
}
.image-search {
  width: 24px;
  height: 24px;
  margin-left: 8px;
  margin-top: 8px;
}
.search-container-expand {
  border: 0.5px solid rgba(0, 0, 0);
  border-radius: 22px;
  display: flex;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
.search-bar {
  /* flex: 1; */
}
.search-bar::placeholder {
  color: rgba(0, 0, 0, 0.5);
}
.search-bar:focus::placeholder {
  color: #333;
}
.search-bar::-webkit-input-placeholder {
  /* Edge */
  color: rgba(0, 0, 0, 0.5);
}
.search-bar:focus::-webkit-input-placeholder {
  /* Edge */
  color: #333;
}
.search-bar,
.search-bar:focus {
  border: none;
  width: auto;
  outline: none;
}
</style>
