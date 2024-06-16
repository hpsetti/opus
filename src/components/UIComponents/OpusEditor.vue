<template>
  <!-- TODO: We need to update this plugin in main reason being last updated at 6 years ago. -->
  <div class="htmleditor">
    <vue-html5-editor
      ondrag="return false"
      ondrop="return false"
      autocomplete="off"
      :id="id"
      :height="145"
      :auto-height="false"
      :content="desc"
      @change="update"
      :placeholder="placeholder"
      :disabled="disabled"
    ></vue-html5-editor>
    <div v-if="isLimited && limitReached" class="red-1">
      <div class="text-regular-xsmall">Maximum character limit exceeded</div>
    </div>
    <!-- <div v-if="disabled" class="red-1">
      <div class="text-regular-xsmall">Editor is disabled!</div>
    </div>
    <div v-else-if="required && consumed === 0" class="red-1">
      <div class="text-regular-xsmall">Please enter a value</div>
    </div>
    <div v-else-if="isLimited">
      <div v-if="limitReached" class="red-1">
        <div class="text-regular-xsmall">Maximum character limit reached</div>
      </div>
      <div v-else>
        <div
          >{{ remaining }} Characters Remaining (includes generated html)</div
        >
      </div>
    </div> -->
  </div>
</template>
<script>
import { createApp } from 'vue';
import VueHtml5Editor from 'vue-html5-editor';

const app = createApp();

app.use(VueHtml5Editor, {
  // new VueHtml5Editor(options)
  // global component name
  name: 'vue-html5-editor',
  // if set true,will append module name to toolbar after icon
  showModuleName: false,
  // class，font-awesome
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: 'fa fa-pencil',
    color: 'fa fa-paint-brush',
    align: 'fa fa-align-justify',
    list: 'fa fa-list',
    link: 'fa fa-chain',
    unlink: 'fa fa-chain-broken',
    tabulation: 'fa fa-table',
    image: 'fa fa-file-image-o',
    hr: 'fa fa-minus',
    eraser: 'fa fa-eraser',
    undo: 'fa-undo fa',
    'full-screen': 'fa fa-arrows-alt',
    info: 'fa fa-info'
  },

  image: {
    sizeLimit: 512 * 1024,
    upload: {
      url: null,
      headers: {},
      params: {},
      fieldName: {}
    },
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    //
    uploadHandler(responseText) {
      // default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      const json = JSON.parse(responseText);
      if (!json.ok) {
        return '';
      }
      return json.data;
    }
  },
  language: 'en-us',
  hiddenModules: [],
  visibleModules: [
    'text',
    'color',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'hr',
    'eraser',
    'undo'
  ],
  modules: {
    // omit,reference to source code of build-in modules
  }
});

export default {
  name: 'OpusEditor',
  props: {
    /**
     * Initial value of the editor content
     */
    desc: {
      type: String,
      default: ''
    },
    /**
     * id to uniquely identify this editor instance
     */
    id: {
      type: String,
      default: 'vue-editor'
    },
    /**
     * Maximum number of characters in the editor \
     * includes count of html formatting \
     * e.g. <p>Text</p> will count as 11 characters instead of 4 \
     * even though only 4 characters are visible in the editor \
     * 0 indicates no limit
     */
    maxlength: {
      type: Number,
      default: 0
    },
    /**
     * Is the input element a required field.
     * Currently NOT used
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Disable the editor
     * FIXME NOT WORKING
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Placeholder content
     */
    placeholder: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'desc',
    event: 'change'
  },
  data() {
    return {
      limitReached: false,
      consumed: 0
    };
  },
  computed: {
    /**
     * Does the editor has maxlength defined?
     */
    isLimited() {
      return this.maxlength > 0;
    },
    /**
     * Number of characters remaining that the user can type in
     * (includes html formatting)
     */
    remaining() {
      return this.maxlength - this.consumed;
    }
  },
  methods: {
    // Always emit transformed user input
    // Let the component processing the input decide if the input should be
    // accepted or not by disabling the form etc.
    update(value) {
      this.consumed = value.length;
      if (this.isLimited && this.consumed <= this.maxlength) {
        this.limitReached = false;
      } else if (this.isLimited && this.consumed > this.maxlength) {
        this.limitReached = true;
      }
      this.$emit('change', value);
    }
  }
};
</script>
<style>
.htmleditor .vue-html5-editor {
  z-index: 0 !important;
}
.htmleditor .vue-html5-editor > .toolbar {
  z-index: 10 !important;
}
.htmleditor .vue-html5-editor > .content ul,
.htmleditor .vue-html5-editor > .content ol {
  padding-left: 20px !important;
}
</style>
