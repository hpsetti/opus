span
<template>
  <div>
    <div id="root-cause-info" class="modal" role="dialog">
      <div class="modal-dialog modal-lg custom-modal-class">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20">
          <div class="modal-header">
            <div class="col-xs-12 p-0 text-start header">
              <img src="/static/images/documents/document_header.svg" />
              <span class="pl-20"> Root cause preview </span>
              <img
                class="cursor-pointer close-modal"
                data-dismiss="modal"
                src="/static/images/icons/close_icon_white.svg"
                alt=""
              />
            </div>
          </div>
          <div
            class="next-previous-main pl-10 pt-20 pb-10 d-flex align-items-center"
          >
            <img
              class="new_member_img"
              src="/static/images/icons/rca_previous.svg"
              @click="PreviousRootcause"
            />
            <span class="pl-10 pr-10"
              >{{ index + 1 }} of {{ totalCurrentRecords }}</span
            >
            <img
              class="new_member_img"
              src="/static/images/icons/rca_next.svg"
              @click="nextRootCause"
            />
          </div>
          <div class="row card pt-20 pb-20 mt-20">
            <div class="col-xs-7">
              <p class="root-cause-titles m-0">Root cause title</p>
              <h3 class="m-0 pb-10 rca-title">
                {{ rootCauseModalInfo.rca_title }}
              </h3>
            </div>
            <div class="col-xs-5 col-gap-15 d-flex justify-content-end">
              <BaseButton
                variant="secondary"
                has-icon
                @click="copySelectedRootCause"
              >
                <img src="/static/images/icons/rca_copy.svg" alt="Copy RCA" />
                <span class="pl-10">Copy</span>
              </BaseButton>
              <BaseButton has-icon @click="downloadRootCause">
                <img
                  src="/static/images/icons/rca_download.svg"
                  alt="Download RCA"
                />
                <span class="pl-10">Download</span>
              </BaseButton>
            </div>
            <div class="col-xs-12 mt-20">
              <p class="root-cause-titles mb-15">Root cause commentary</p>
              <p class="root-cause-desc">
                {{ rootCauseModalInfo.rca_commentary }}
              </p>
            </div>
          </div>

          <div class="col-xs-12 mt-10 text-start addl-info">
            <div class="p-0">
              <h2 class="add-info">Additional Info</h2>
              <p class="root-cause-titles m-0">Sample product</p>
              <h3 class="m-0 pb-20">{{ rootCauseModalInfo.sample_product }}</h3>
              <p class="root-cause-titles m-0">Sample use error</p>
              <h3 class="m-0 pb-20">{{ rootCauseModalInfo.sample_error }}</h3>
              <p class="root-cause-titles m-0">Background information</p>
              <p class="root-cause-desc m-0">
                {{ rootCauseModalInfo.back_ground_info }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import FileSaver from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  props: ['rootCauseModalInfo', 'index', 'totalCurrentRecords'],
  data() {
    return {};
  },
  watch: {},

  methods: {
    closeRootCauseInfo() {
      $('#root-cause-info').modal('hide');
    },
    nextRootCause() {
      this.$emit('EmitNextRootCause');
    },
    PreviousRootcause() {
      this.$emit('EmitPreviousRootCause');
    },
    downloadRootCause() {
      const title = new Paragraph(this.rootCauseModalInfo.rca_title);
      const commentary = new Paragraph(this.rootCauseModalInfo.rca_commentary);
      // const filepath = `${title} \n${commentary}`;
      const filepath = [title, commentary];
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [...filepath]
          }
        ]
      });
      Packer.toBlob(doc).then((blob) => {
        FileSaver.saveAs(blob, `${this.rootCauseModalInfo.rca_title}.docx`);
      });
    },
    copySelectedRootCause() {
      const title = this.rootCauseModalInfo.rca_title;
      const commentary = this.rootCauseModalInfo.rca_commentary;
      const filepath = `${title} \n${commentary}`;
      this.$copyText(filepath).then(
        () => {
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Copied successfully!'
          });
        },
        () => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Copy failed!'
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.card {
  margin: 10px 0px 10px 0px;
  background: #ffffff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
}
.root-cause-titles {
  font-weight: 700;
  color: #595958;
  margin-bottom: 5px;
}
.root-cause-desc {
  height: 100px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.addl-info {
  height: 250px;
  overflow-y: auto;
  scrollbar-width: thin;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: darkgray;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: gray;
}
.add-info {
  font-weight: 300;
  font-size: 24px;
  line-height: 33px;
  margin-top: 0px !important;
  color: #595958;
}
.close-modal {
  float: right;
  margin-top: 9px;
  height: 25px;
  margin-right: 15px;
  color: #ffffff !important;
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
.document-download {
  color: #ffffff;
  border-radius: 18px;
  border: 1px solid #0b3c61;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 3px 20px 3px 20px;
}

.document-download:focus,
.document-download:active,
.document-download:hover {
  color: #ffffff;
}

.w-230 {
  width: 230px;
}

.document-types ul li {
  list-style-type: none !important;
}

.template-description {
  color: rgba(0, 0, 0, 0.7);
}

.header {
  background: #4c9e45;
  padding: 5px 0px 5px 15px;
  color: #ffffff;
  border-radius: 5px;
}

.modal-body {
  padding-left: 0px;
  padding-bottom: 50px;
}

.template-contents {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 19px;
}

#template-info {
  z-index: 10000;
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

@media (min-width: 375px) and (max-width: 1200px) {
  .request-modal {
    width: 75%;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
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

.mt-15 {
  margin-top: 15px;
}

.modal-body {
  background: #fff;
  max-height: 60vh;
  overflow: auto;
}

.training-details {
  font-weight: 400;
  color: #000000;
  font-size: 18px;
  margin-bottom: 15px;
}

.text-start {
  text-align: start;
}

.course-info {
  text-align: justify;
  margin-top: 10px;
  padding-right: 15px;
}

.save-button {
  border: 1px solid #4c9e45;
  background-color: #4c9e45;
  color: #f2f2f2;
}

.save-button:hover {
  color: #f2f2f2;
}

.footer-btn-common-properties {
  border-radius: 20px;
  line-height: 21px;
  font-size: 18px;
  font-weight: 500;
}

.cancel-button {
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  text-align: center;
  color: #0b3c61;
}

.cancel-button:hover {
  color: #0b3c61;
}

.flex-wrapper {
  display: flex;
  justify-content: flex-end;
}

ul {
  padding-left: 10px;
}

.template-header {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
}

.training-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
  margin-top: 5px;
}

.purchase-info {
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
}

.purchase-info-main {
  padding: 15px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.header-buttons {
  margin-left: 50px;
}
.new_member_img {
  cursor: pointer;
}
.new_member_img.disabled {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}
.rca-title {
  min-height: 62px;
  overflow-y: auto;
}
@media screen and (min-width: 450px) {
  .sm-ml-20 {
    margin-left: 20px;
  }
}

@media screen and (max-width: 450px) {
  .flex-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .xs-mb-10 {
    margin-bottom: 10px;
  }
}
</style>
