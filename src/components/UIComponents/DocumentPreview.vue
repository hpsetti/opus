<template>
  <div class="col-xs-12">
    <div class="row fixed-nav-bar">
      <div class="col-xs-12 p-0 font-18">
        <div class="col-xs-12 col-sm-8 p-0">
          <div
            class="col-xs-1 width-auto p-0 cursor-pointer"
            @click="getInsightHome"
          >
            <img
              class="back-img"
              src="/static/images/icons/chevron_left_icon.svg"
              alt=""
            />
          </div>
          <div
            class="col-xs-11 whitePaperName p-0 cursor-pointer ml-10"
            @click="getInsightHome"
          >
            {{ pdfDetails.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="paper-preview">
      <div class="pdf-div">
        <PDFViewer
          :url="filePath"
          @document-errored="documentErrored"
        ></PDFViewer>
      </div>
    </div>
    <loader :loadingStatus="loaderStatus"></loader>
  </div>
</template>

<script>
import Loader from './Loader.vue';
import PDFViewer from '../PDFViewer/PDFViewer.vue';
import { getDocumentsListByType, getSasToken } from '../../apis/documents';
import { pdfFileDownload } from '../../utils/pdf-file-download';

export default {
  props: ['userId'],
  data() {
    return {
      whitePaperDetails: {},
      pdfDetails: {},
      displayPdf: true,
      filePath: '',
      loaderStatus: false
    };
  },
  components: {
    PDFViewer,
    Loader
  },
  methods: {
    clearNotifications() {
      this.$notify({
        clear: true
      });
    },
    async getInsightDetails(id, documentType) {
      this.loaderStatus = true;
      this.whitePaperDetails = await getDocumentsListByType(
        this.userId,
        documentType
      );
      this.pdfDetails = this.whitePaperDetails.find(
        (item) => item.document_id === +id
      );
      const formData = {
        container_name: 'preview',
        permissions: 'read',
        storage_name: 'opus-storage-java'
      };
      const sasToken = await getSasToken(formData);
      this.filePath = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${this.pdfDetails.preview_url}?${sasToken.data}`;
      this.displayPdf = true;
      this.$forceUpdate();
      this.loaderStatus = false;
    },

    async downLoadWhitePaper() {
      const response = await pdfFileDownload(this.filePath);
      if (response && response.error) {
        this.clearNotifications();
        this.$notify({
          type: 'error',
          title: 'Error',
          text: response.error.errorMessage
        });
      }
    },
    documentErrored() {
      this.displayPdf = false;
    },
    getInsightHome() {
      this.$router.go(-1);
    }
  },
  watch: {
    async $route() {
      await this.getInsightDetails(this.$route.params.documentId);
    }
  },
  async created() {
    const documentType = +this.$route.query.docType;
    if ([1, 2, 3, 5, 6, 7, 8].includes(documentType)) {
      await this.getInsightDetails(this.$route.params.documentId, documentType);
    } else {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.fixed-nav-bar {
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 10px;
}
.whitePaperName {
  display: inline-block;
  color: rgba(0, 0, 0, 0.7);
}
.back-img {
  height: 20px;
}
.pdf-div {
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.25);
  border: 4px;
}
.width-auto {
  width: auto;
}
@media screen and (max-width: 767px) {
  .pl-xs-0 {
    padding-left: 0px;
  }
}
</style>
