<template>
  <div>
    <div id="purchased-document-info" class="modal" role="dialog">
      <div class="modal-dialog modal-lg custom-modal-class">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20" v-if="templateInfo">
          <div class="modal-header">
            <div
              class="col-xs-12 p-0 text-start header d-flex align-items-center col-gap-20"
              :class="{
                documents: templateDetails.is_documents,
                tools: templateDetails.is_tools
              }"
            >
              <template v-if="templateDetails.is_documents">
                <img
                  class="header-image"
                  v-if="templateDetails.document_type_for_tab === 'Templates'"
                  src="/static/images/documents/document_header_template.svg"
                />
                <img
                  class="header-image"
                  v-else
                  src="/static/images/documents/document_header.svg"
                />
                <span>Document</span>
              </template>
              <template v-if="templateDetails.is_tools">
                <img
                  class="tool-img"
                  src="/static/images/tools/tool_available.svg"
                />
                <span>Tools</span>
              </template>
            </div>
          </div>

          <div class="modal-body col-xs-12 text-start">
            <div class="col-xs-12 p-0 template-subheader">
              {{ templateDetails.display_plan_type }}
            </div>
            <div class="col-xs-8 p-0">
              <div class="col-xs-12 p-0 template-header">
                {{ templateDetails.name }}
              </div>
              <div
                class="col-xs-11 p-0 font-14 template-description"
                v-html="templateDetails.description"
              ></div>
              <div class="fw-700 font-14 text-secondary pr-15 validity-text">
                Validity - {{ templateDetails.validity_days }} days access
              </div>
            </div>
            <div class="col-xs-4 p-0">
              <template
                v-if="
                  templateDetails.contents && templateDetails.contents.length
                "
              >
                <div class="col-xs-12 template-contents p-0">Contents</div>
                <div class="col-xs-12 p-0 mt-10 pl-20">
                  <ul class="custom-bullet">
                    <li
                      class="font-14 white-space"
                      v-for="(content, index) in templateDetails.contents"
                      :key="index"
                    >
                      {{ content }}
                    </li>
                  </ul>
                </div>
              </template>
            </div>
            <div class="col-xs-12 p-0 mt-15">
              <div
                class="col-xs-12 p-0 template-contents document-types mt-15 mb-10"
              >
                <ul v-if="templateDetails.is_documents">
                  <li
                    class="mb-10"
                    v-for="docType in templateDetails.document_types"
                    :key="docType"
                  >
                    {{ docType }}
                  </li>
                </ul>
                <span v-else-if="templateDetails.is_tools">{{
                  templateDetails.purchase_type
                }}</span>
              </div>
              <div class="col-xs-12 pr-0 purchase-info-main">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <div class="purchase-info p-0 font-18 font-bold pr-10">
                      {{ templateDetails.is_purchased ? 'Purchased' : 'Price' }}
                    </div>
                    <div
                    class="pl-15 pb-15"
                    v-if="
                      templateDetails.previous_purchase_date
                    "
                  >
                    <p class="text-regular-large orange-bg2 expiry-box">
                      Previously purchased: {{ formatPurchaseDate(templateDetails.previous_purchase_date) }}
                    </p>
                  </div>
                    <div
                      class="pl-15 pb-15"
                      v-if="templateDetails.expiry_days > 90"
                    >
                      <p class="text-regular-large">
                        Expires:
                        {{
                          formatPurchaseDate(templateDetails.expiry_date_time)
                        }}
                      </p>
                    </div>
                    <div
                      class="pl-15 pb-15"
                      v-else-if="
                        templateDetails.expiry_days <= 90 &&
                        templateDetails.expiry_days > 10
                      "
                    >
                      <p class="text-regular-large orange-bg2 expiry-box">
                        Expires: {{ templateDetails.expiry_days }} days
                      </p>
                    </div>
                    <div class="pl-15 pb-15" v-else-if="templateDetails.expiry_days <= 10 && templateDetails.expiry_days > 1">
                      <p class="text-regular-large red-bg1 expiry-box white-1">
                        Expires: {{ templateDetails.expiry_days }} days
                      </p>
                    </div>
                    <div class="pr-15 pb-15" v-else-if="templateDetails.expiry_days == 1">
            <p class="text-regular-large red-bg1 expiry-box white-1">Expires: {{ templateDetails.expiry_days }} day</p>
          </div>
                  </div>
                  <div class="font-18 font-bold text-right p-0">
                    ${{ templateDetails.price }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="footer col-xs-12 mt-10 p-0 d-flex xs-flex-column"
            :class="{
              'justify-content-between':
                templateDetails.is_tools && !templateDetails.is_purchased
            }"
          >
            <div
              class="d-flex col-gap-20"
              :class="{
                'flex-auto':
                  templateDetails.is_documents ||
                  (templateDetails.is_tools && templateDetails.is_purchased)
              }"
            >
              <BaseButton data-dismiss="modal" variant="secondary">
                Cancel
              </BaseButton>
              <BaseButton
                v-if="templateDetails.is_purchased"
                variant="tertiary"
                @click="downloadDocument(templateDetails.document_path)"
              >
                <img
                  src="/static/images/documents/download.svg"
                  alt=""
                  class="preview-svg"
                />
                <span class="xs-hide">Download</span>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import BaseButton from '../BaseButton.vue';

export default {
  props: {
    templateInfo: {
      type: Object
    },
    moduleType: {
      type: String,
      default: 'documents'
    },
    userId: {
      type: Number,
      required: true
    },
    isRca: {
      type: Boolean,
      default: false
    },
    loader: {
      type: Boolean
    }
  },
  data() {
    return {
      contentsForLibrary: {},
      templateDetails: {}
    };
  },

  components: {
    BaseButton
  },

  watch: {
    templateInfo() {
      this.templateDetails = this.templateInfo || {};
    }
  },

  methods: {
    formatPurchaseDate(value) {
      if (value) {
        const formattedDateArray = [value[0], value[1] - 1, value[2]];
        return moment(formattedDateArray).format('D MMM YYYY');
      }
      return '';
    },
    downloadDocument(downloadPath) {
      this.$emit('downloadDoc', downloadPath);
    }
  }
};
</script>

<style scoped>
.document-types ul li {
  list-style-type: none !important;
}

.template-description {
  color: rgba(0, 0, 0, 0.7);
}

.header {
  padding: 5px 0px 5px 15px;
  color: #ffffff;
  border-radius: 5px;
  font-size: 32px;
  height: 60px;
}

.documents {
  background: #1695a5;
}

.tools {
  background: #92c83e;
}

.flex-auto {
  flex: 1 1 auto;
  justify-content: end;
}

.modal-body {
  padding-left: 9px;
  padding-right: 0px;
  padding-bottom: 10px;
}

.template-contents {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 19px;
  font-weight: 700;
}

li {
  list-style-type: none;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.7);
}

.custom-bullet li:before {
  content: '\00b7';
  font-size: 30px;
  vertical-align: bottom;
  margin-left: -10px !important;
}

.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}

.modal-footer {
  background: #fff;
  border-top: none;
}

.modal-body {
  background: #fff;
  max-height: 60vh;
  overflow: auto;
}

.text-start {
  text-align: start;
}

ul {
  padding-left: 0px;
}

.try-free-version {
  line-height: 25px;
  color: #00518a;
}

.template-header {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}
.template-subheader {
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #00518a;
}

.purchase-info {
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
}

.header-image {
  height: 38px;
  width: 50px;
}
.tool-img {
  height: 50px;
  width: 38px;
  object-fit: cover;
  border-radius: 5px;
}

.visible-hidden {
  visibility: hidden;
}

.purchase-info-main {
  padding: 15px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.validity-text {
  position: relative;
  top: 10px;
}

@media screen and (max-width: 757px) {
  .xs-flex-column {
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
