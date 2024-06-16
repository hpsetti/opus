<template>
  <div :id="id" class="modal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div v-if="!noHeader" class="modal-header p-0" :class="parseClasses(headerClasses)">
          <slot name="header">
            <div class="view-header d-flex align-items-center">
              <span class="text-h3 flex-grow">{{ title }}</span>
              <img
                data-dismiss="modal"
                class="cursor-pointer opus-icon"
                src="/static/images/icons/close_icon.svg"
                alt="Close modal"
              />
            </div>
              <hr/>
          </slot>
        </div>
        <div class="modal-body p-0 opus-scrollbar" :class="parseClasses(bodyClasses)">
            <div class="view-body">
              <slot></slot>
            </div>
        </div>
        <div v-if="!noFooter" class="modal-footer p-0" :class="parseClasses(footerClasses)">
          <slot name="footer">
            <div class="view-footer">
              <div class="d-flex align-items-center justify-content-end col-gap-15">
                <BaseButton
                  data-dismiss="modal"
                  :variant="cancelVariant"
                  @click="$emit('cancel')"
                  >{{ cancelText }}</BaseButton
                >
                <BaseButton :variant="okVariant" @click="$emit('ok')"
                  >{{ okText }}</BaseButton
                >
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @summary Show a versatile modal dialog with customizable props and slots
 * TODO
 * 1. Allow user defined classes to override all properties of the modal
 * 4. Test with real data
 * FIXME
 */
import BaseButton from './BaseButton.vue';
import { parseClasses } from '../../utils/common';

export default {
  name: 'OpusModal',
  components: {
    BaseButton,
  },
  props: {
    /**
     * Unique id of the modal dialog
     */
    id: {
      type: String,
      default: 'opus-modal',
    },
    /**
     * Text to be shown in the OK button
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Text to be shown in the OK button
     */
    okText: {
      type: String,
      default: 'OK',
    },
    /**
     * button variant to be applied on the OK button
     */
    okVariant: {
      type: String,
      default: 'primary',
      validator: (t) => ['primary', 'secondary', 'tertiary', 'error'].includes(t),
    },
    /**
     * text to be shown on the Cancel button
     */
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * button variant to be applied on the cancel button
     */
    cancelVariant: {
      type: String,
      default: 'secondary',
      validator: (t) => ['primary', 'secondary', 'tertiary', 'error'].includes(t),
    },
    /**
     * list of classes to be applied to header section
     */
    headerClasses: {
      type: [String, Array],
      default: '',
    },
    /**
     * list of classes to be applied to body section
     */
    bodyClasses: {
      type: [String, Array],
      default: '',
    },
    /**
     * list of classes to be applied to footer section
     */
    footerClasses: {
      type: [String, Array],
      default: '',
    },
    /**
     * do not display header section?
     */
    noHeader: {
      type: Boolean,
      default: false,
    },
    /**
     * do not display footer section?
     */
    noFooter: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    parseClasses,
  },
};
</script>

<style scoped>
.modal-header {
  background: none;
  border: 0;
}
.modal-header hr {
  margin-left: 24px;
  margin-right: 24px;
}
.view-header {
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 5px;
}
.modal-body {
  padding-top: 0;
  height: 450px;
  overflow-y: auto;
}
.view-body {
  padding-left: 24px;
  padding-right: 24px;
}
.modal-footer {
  background-color: #fff;
  border-top: unset;
}
.view-footer {
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
}
</style>
