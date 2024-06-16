<template>
  <div :id="id" class="modal" role="dialog">
    <div class="modal-dialog" :class="`modal-${size}`">
      <div class="modal-content">
        <slot v-if="!noHeader" name="header">
          <div class="modal-header p-0" :class="parseClasses(headerClasses)">
            <div class="view-header">
              <span class="text-h3">{{ header }}</span>
              <img
                v-if="!noClose"
                data-dismiss="modal"
                class="cursor-pointer close-icon"
                src="/static/images/icons/close_icon.svg"
                alt="Close modal"
                @click="$emit('cancel')"
              />
            </div>
            <hr style="width: 94%" class="mx-auto" />
          </div>
        </slot>
        <slot name="body">
          <div
            class="modal-body opus-scrollbar"
            :class="parseClasses(bodyClasses)"
          >
            <div class="mx-auto text-center w-80">
              <span class="mt-30 text-h4 pr-20 pl-20">{{ title }}</span>
              <div class="text-subtitle-1 pt-20 pb-20">{{ desc }}</div>
              <p v-if="note" class="text-regular-large pt-20">{{ note }}</p>
            </div>
          </div>
        </slot>
        <slot v-if="!noFooter" name="footer">
          <div class="modal-footer">
            <div
              class="d-flex justify-content-center col-gap-15 p-0"
              :class="parseClasses(footerClasses)"
            >
              <BaseButton
                data-dismiss="modal"
                :variant="cancelVariant"
                @click="$emit('cancel')"
                >{{ cancelText }}</BaseButton
              >
              <BaseButton :variant="okVariant" @click="$emit('ok')">{{
                okText
              }}</BaseButton>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @summary Show a simple confirmation dialog with some information
 * TODO
 * 1. Add slot properties to slot
 * 2. Allow user defined classes to override all properties of the modal
 * FIXME
 */
import BaseButton from './BaseButton.vue';
import { parseClasses } from '../../utils/common';

export default {
  name: 'OpusDialog',
  components: {
    BaseButton
  },
  props: {
    /**
     * Unique id of the modal dialog
     */
    id: {
      type: String,
      default: 'opus-dialog'
    },
    /**
     * Size of the modal dialog
     */
    size: {
      type: String,
      default: 'md',
      validator: (t) => ['sm', 'md', 'ld', 'xl'].includes(t)
    },
    /**
     * Modal header string of the modal dialog
     */
    header: {
      type: String
    },
    /**
     * Title string of the modal dialog
     */
    title: {
      type: String
    },
    /**
     * desc of the modal dialog
     */
    desc: {
      type: String
    },
    /**
     * note message at the bottom of the modal content (optional)
     */
    note: {
      type: String
    },
    /**
     * Text to be shown in the OK button
     */
    okText: {
      type: String,
      default: 'OK'
    },
    /**
     * button variant to be applied on the OK button
     */
    okVariant: {
      type: String,
      default: 'primary',
      validator: (t) =>
        ['primary', 'secondary', 'tertiary', 'error'].includes(t)
    },
    /**
     * text to be shown on the Cancel button
     */
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    /**
     * button variant to be applied on the cancel button
     */
    cancelVariant: {
      type: String,
      default: 'secondary',
      validator: (t) =>
        ['primary', 'secondary', 'tertiary', 'error'].includes(t)
    },
    /**
     * list of classes to be applied to header section
     */
    headerClasses: {
      type: [String, Array],
      default: ''
    },
    /**
     * list of classes to be applied to body section
     */
    bodyClasses: {
      type: [String, Array],
      default: ''
    },
    /**
     * list of classes to be applied to footer section
     */
    footerClasses: {
      type: [String, Array],
      default: ''
    },
    /**
     * do not display header section?
     */
    noHeader: {
      type: Boolean,
      default: false
    },
    /**
     * do not display close icon
     */
    noClose: {
      type: Boolean,
      default: false
    },
    /**
     * do not display footer section?
     */
    noFooter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    parseClasses
  }
};
</script>

<style scoped>
.modal-header {
  background: none;
  border: 0;
}
.modal-header .close-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 24px;
  right: 24px;
}
.modal-header .view-header {
  padding-top: 20px;
  padding-left: 24px;
  padding-right: 72px;
  border-radius: 5px;
}
.modal-body {
  padding-top: 0;
  max-height: 50vh;
  overflow-y: auto;
}
.modal-footer {
  background-color: #fff;
  border-top: unset;
  padding-top: 15px;
  padding-bottom: 32px;
}
</style>
