<template>
  <div>
    <div class="row toolbar_wrapper">
      <div class="col-md-2 col-lg-2 col-sm-3 col-xs-4">
        <!-- <span class="icon_wrapper" :class="{ 'opacity_0_4': scale <= optimalScale }" @click="zoomOut"><img src="/static/images/icons/zoom_out_icon.svg"></span>
        <span class="icon_wrapper ml-20" :class="{ 'opacity_0_4': scale > 4 }" @click="zoomIn"><img src="/static/images/icons/zoom_in_icon.svg"></span> -->
      </div>
      <div class="col-md-8 txt-alg-ctr col-lg-8 col-sm-7 col-xs-8 mt-10">
        <!-- <span class="icon_wrapper" :class="{ 'opacity_0_4': currentPage === 1 }" @click="pageDown"><img src="/static/images/icons/arrow_down_icon.svg"></span> -->
        <!-- <span class="ml-20">{{currentPage}}</span> of <span>{{pageCount}}</span> -->
        <!-- <span class="icon_wrapper ml-20" :class="{ 'opacity_0_4': currentPage === pageCount }" @click="pageUp"><img src="/static/images/icons/arrow_up_icon.svg"></span> -->
      </div>
    </div>
    <div class="pdf-viewer">
      <PDFData
        class="pdf-viewer__main"
        :url="url"
        @page-count="updatePageCount"
        @page-focus="updateCurrentPage"
        @document-rendered="onDocumentRendered"
        @document-errored="onDocumentErrored"
      >
        <PDFDocument
          class="pdf-viewer__document"
          slot="document"
          slot-scope="{ pages }"
          :class="{ 'preview-enabled': isPreviewEnabled }"
          v-bind="{
            pages,
            scale,
            optimalScale,
            fit,
            currentPage,
            pageCount,
            isPreviewEnabled
          }"
          @scale-change="updateScale"
        />
      </PDFData>
    </div>
  </div>
</template>
<script>
import PDFDocument from './PDFDocument.vue';
import PDFData from './PDFData.vue';

function floor(value, precision) {
  const multiplier = precision ? 10 ** precision : 10 ** 0;
  return Math.floor(value * multiplier) / multiplier;
}
export default {
  name: 'PDFViewer',
  components: {
    PDFDocument,
    PDFData
  },
  props: {
    url: String
  },
  data() {
    return {
      scale: undefined,
      optimalScale: undefined,
      fit: undefined,
      currentPage: 1,
      pageCount: undefined,
      isPreviewEnabled: false
    };
  },
  methods: {
    zoomOut() {
      this.scale = parseFloat(
        this.scale > this.optimalScale
          ? (this.scale - 1).toFixed(2)
          : this.scale
      );
    },
    zoomIn() {
      this.scale = parseFloat(this.scale < 5 ? this.scale + 1 : this.scale);
    },
    pageDown() {
      this.currentPage = parseInt(
        this.currentPage > 1 ? this.currentPage - 1 : this.currentPage,
        10
      );
    },
    pageUp() {
      this.currentPage = parseInt(
        this.pageCount > this.currentPage
          ? this.currentPage + 1
          : this.currentPage,
        10
      );
    },
    onDocumentRendered() {
      this.$emit('document-errored', this.url);
    },
    onDocumentErrored(e) {
      this.$emit('document-errored', e);
    },
    updateScale({ scale, isOptimal = false }) {
      const roundedScale = floor(scale, 2);
      if (isOptimal) this.optimalScale = roundedScale;
      this.scale = roundedScale;
    },
    updateFit(fit) {
      this.fit = fit;
    },
    updatePageCount(pageCount) {
      this.pageCount = pageCount;
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    togglePreview() {
      this.isPreviewEnabled = !this.isPreviewEnabled;
    }
  },
  watch: {
    url() {
      this.currentPage = 1;
    }
  },
  mounted() {
    document.body.classList.add('overflow-hidden');
  }
};
</script>
<style scoped>
.icon_wrapper > img {
  width: 38px;
  height: 41px;
}
.txt-alg-ctr {
  text-align: center;
}
.opacity_0_4 {
  opacity: 0.4;
}
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 1em;
  position: relative;
  z-index: 99;
}
.header-item {
  margin: 0 2.5em;
}
.pdf-viewer__document.preview-enabled {
  width: 85%;
  left: 15%;
}
.pdf-viewer {
  height: 700px;
  overflow-x: auto;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.25);
}
.toolbar_wrapper {
  margin-bottom: 10px;
  margin-top: 10px;
}
@media print {
  header {
    display: none;
  }
}
</style>
