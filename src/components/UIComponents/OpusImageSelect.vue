<template>
  <div>
    <input
      @change="setSelectedFile"
      type="file"
      :accept="validTypes"
      :ref="id"
      :id="id"
      style="display: none"
      class="form-control common-input"
    />
    <div class="d-flex align-items-center col-gap-15">
      <BaseButton has-icon variant="secondary" @click="selectImage" :disabled="disabled">
        <img src="/static/images/icons/upload_blue.svg" class="preview-svg" />
        <span>{{ btnText }}</span>
      </BaseButton>
      <span v-if="!selectedFile || errorTxt" class="text-regular-small ml-30">{{
        file ? file.name : ''
      }}</span>
      <span class="text-regular-small ml-30">{{
        selectedFile && !errorTxt ? selectedFile.name : 'No file selected'
      }}</span>
      <img
        v-if="selectedFile && !errorTxt"
        @click="clearFile"
        class="cursor-pointer"
        src="/static/images/icons/danger_close_icon.svg"
      />
    </div>
    <div v-if="selectedFile && errorTxt" class="red-1 pb-10">
      {{ errorTxt }}
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import BaseButton from './BaseButton.vue';

export default {
  name: 'OpusImageSelect',
  components: { BaseButton },
  props: {
    id: {
      type: String,
      required: true
    },
    validTypes: {
      type: String,
      default: '.png, .jpg, .jpeg'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorTxtProp: {
      type: String,
      default: 'Please select a valid image i.e. png/jpeg only'
    },
    file: {
      type: Object,
      default: null
    },
    btnText: {
      type: String,
      default: 'Upload'
    }
  },
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    selectImage() {
      $(`#${this.id}`).click();
    },
    setSelectedFile() {
      if (!this.$refs[this.id].files.length) return;
      const [selectedFile] = this.$refs[this.id].files;
      this.validateFileType(selectedFile);
      if (!this.errorTxt) {
        this.$emit('select', selectedFile);
      } else {
        this.$emit('select', null);
      }
    },
    validateFileType(file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      this.selectedFile = file;
      if (!this.validTypes.includes(fileExtension)) {
        this.errorTxt = this.errorTxtProp;
      } else {
        this.errorTxt = '';
      }
    },
    reset() {
      // Clear file input
      this.$refs[this.id].value = null;
      this.selectedFile = null;
      this.errorTxt = '';
    },
    clearFile() {
      this.$emit('select', null);
      this.reset();
    }
  }
};
</script>
