<template>
  <div class="content-wrappper">
    <div class="col-xs-12">
      <div class="row fixed-nav-bar">
        <div class="col-xs-12 p-0 font-18">
          <div class="col-xs-12 col-sm-8 p-0">
            <div
              class="col-xs-1 width-auto p-0 cursor-pointer"
              @click="navigateToScopeToolPage"
            >
              <img
                class="back-img"
                src="/static/images/icons/chevron_left_icon.svg"
                alt=""
              />
            </div>
            <div
              class="col-xs-11 whitePaperName p-0 cursor-pointer ml-10"
              @click="navigateToScopeToolPage"
            >
              <p v-if="$route.params.id === 1">View example RCA write up</p>
              <p v-else>RCA Wizard – Learn About Filters</p>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4 text-right">
            <span class="cursor-pointer" @click="downLoadWhitePaper">
              <img src="/static/images/icons/download_icon.svg" alt="" />
              <span class="pl-10">Download</span>
            </span>
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
  </div>
</template>

<script>
import Loader from "../../UIComponents/Loader.vue";
import PDFViewer from "../../PDFViewer/PDFViewer.vue";
import { pdfFileDownload } from "../../../utils/pdf-file-download";
import { getSasToken } from "../../../apis/documents";
import {
  getRcaFiltersPDF,
  getRcaWriteupPDF,
} from "../../../apis/rootCauseAnalysis";
import postMarketoFormData from "../../../apis/marketo";

export default {
  props: ["pdfPath", "stepper"],
  data() {
    return {
      displayPdf: true,
      loaderStatus: false,
      filePath: "",
    };
  },
  components: {
    PDFViewer,
    Loader,
  },
  methods: {
    clearNotifications() {
      this.$notify({
        clear: true,
      });
    },
    async getPDFDetails(path) {
      this.loaderStatus = true;
      this.filePath = path;
      const formData = {
        container_name: "tools",
        permissions: "read",
        storage_name: "opus-storage-java",
      };
      const sasToken = await getSasToken(formData);
      this.filePath = `${import.meta.env.VITE_VUE_APP_AZURE_BLOB_URL}${this.filePath}?${sasToken.data}`;
      this.displayPdf = true;
      this.loaderStatus = false;
    },
    async downLoadWhitePaper() {
      const marketoForm = {
        email: JSON.parse(localStorage.getItem("userData")).email,
        Last_Interest: "Human Factors Research & Design",
        page_urlextended: window.location.href,
        page_urlreferral_extended: document.referrer,
        form_control: "Download",
        form_control_details: "RCA Writeup Preview",
      };
      postMarketoFormData(marketoForm);
      const response = await pdfFileDownload(this.filePath);
      if (response && response.error) {
        this.clearNotifications();
        this.$notify({
          type: "error",
          title: "Error",
          text: response.error.errorMessage,
        });
      }
    },

    documentErrored() {
      this.displayPdf = false;
    },
    navigateToScopeToolPage() {
      this.$router.push({
        name: "Root Cause Analysis",
      });
    },
  },
  // Know what watch is doing here and remove if not necessary
  watch: {
    async $route() {
      if (this.$route.params.id === 1) {
        const response = await getRcaWriteupPDF();
        await this.getPDFDetails(response);
      } else {
        const response = await getRcaFiltersPDF();
        await this.getPDFDetails(response);
      }
    },
  },
  async created() {
    console.log("Route in pdf viewer", this.$route);
    if (+this.$route.params.id === 1) {
      const response = await getRcaWriteupPDF();
      await this.getPDFDetails(response);
    } else {
      const response = await getRcaFiltersPDF();
      await this.getPDFDetails(response);
    }
  },
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
