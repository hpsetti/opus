<template>
  <div :id="id" class="modal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div v-if="!noHeader" class="modal-header p-0" :class="parseClasses(headerClasses)">
          <slot name="header">
            <div class="view-header d-flex align-items-center" :class="details.background">
              <img
                class="view-icon"
                :src="details.icon"
                alt="Modal icon"
              />
              <span class="text-h3 white-1 flex-grow">{{ details.resource_category }}</span>
              <img
                data-dismiss="modal"
                class="cursor-pointer close-icon opus-icon"
                src="/static/images/icons/close_icon_white.svg"
                alt="Close modal"
              />
            </div>
          </slot>
        </div>
        <div class="modal-body p-0 opus-scrollbar" :class="parseClasses(bodyClasses)">
          <slot name="body">
            <div class="view-body">
              <span class="text-subtitle-2 blue-3">{{ details.sub_category }}</span>
              <div class="row m-0">
                <div class="col-xs-7 pl-0">
                  <div class="text-h4-bold mb-10 blue-1">{{ details.title }}</div>
                  <div class="text-body-light black-2">{{ details.desc }}</div>
                </div>
                <div class="col-xs-5 pr-0">
                  <p class="text-regular-large text-secondary">Contents</p>
                  <ul class="pl-30">
                    <li
                      v-for="(item, index) in details.items"
                      :key="index"
                      class="text-body-light text-secondary"
                    >{{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </slot>
        </div>
        <div v-if="!noFooter" class="modal-footer p-0" :class="parseClasses(footerClasses)">
          <slot name="footer">
            <div class="view-footer">
              <div class="row m-0">
                <div class="price">
                  <hr class="m-0"/>
                  <div class="pt-10 pb-10 d-flex align-items-center justify-content-between">
                    <span class="text-subtitle-1 text-secondary">Price</span>
                    <span class="text-subtitle-1 text-secondary">$ {{ details.price }}</span>
                  </div>
                  <hr class="m-0">
                </div>
              </div>
              <div class="row m-0">
                <div class="d-flex align-items-center justify-content-end col-gap-15">
                  <OpusLink class="flex-grow text-left" @click="$emit('preview')">Preview</OpusLink>
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
 * 2. Show preview icon
 * 3. Emit an event on click of preview text
 * 4. Test with real data
 * 5. Show resource's meta data as well
 * FIXME
 * 1. The header height is not accurate
 */
import BaseButton from './BaseButton.vue';
import OpusLink from './OpusLink.vue';
import { parseClasses } from '../../utils/common';

export default {
  name: 'OpusModal',
  components: {
    BaseButton,
    OpusLink,
  },
  props: {
    /**
     * Unique id of the modal dialog
     */
    id: {
      type: String,
      default: 'opus-modal',
    },
    details: {
      type: Object,
      default: () => {},
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
.view-header {
  margin: 16px 12px;
  border-radius: 5px;
  height: 40px;
}
.view-header .view-icon {
  width: 36px;
  height: 36px;
  margin-left: 22px;
  margin-right: 25px;
}
.view-header .close-icon {
  margin-right: 16px;
}
.modal-body {
  padding-top: 0;
  height: 400px;
  overflow-y: auto;
}
.view-body {
  padding-left: 24px;
  padding-right: 24px;
}
.view-footer .price {
  padding-bottom: 24px;
}
.modal-footer {
  background-color: #fff;
  border-top: unset;
}
.view-footer {
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
}
</style>
