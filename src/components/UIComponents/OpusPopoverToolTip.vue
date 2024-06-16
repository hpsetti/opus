<template>
  <div
    class="opus-popover popover-main"
    :class="{
      'top-popover': position === 'top',
      'bottom-popover': position === 'bottom',
      'left-popover': position === 'left',
      'right-popover': position === 'right'
    }"
    ref="opusPopoverTooltipMain"
    v-bind="$attrs"
  >
    <div class="content-slot" ref="popoverContent">
      <slot name="content">
        <div class="content">
          <div class="title blue-1">{{ title }}</div>
          <hr />
          <div class="text-regular-small blue-1">{{ content }}</div>
        </div>
      </slot>
    </div>

    <span @click="popOverClickEvent" slot="reference" class="reference-slot">
      <slot name="default" class="default-slot"></slot>
    </span>
  </div>
</template>

<script>
/**
 * A wrapper component on el-popover.
 * Wrapping a bootstrap popover is prone to issues.
 * TODO
 * 1. Check if all properties are satisfied properly
 */
export default {
  name: 'OpusPopoverDup',
  props: {
    /**
     * Title of the popover
     */
    title: {
      type: String
    },

    triggerClick : {
      type: Boolean,
    },
    /**
     * Content of the popover
     */
    content: {
      type: String
    },
    position: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      popoverToggle: true
    };
  },
  mounted() {
    if(this.triggerClick) {
        this.$refs.opusPopoverTooltipMain.classList.remove('popover-main');
      }
  },
  methods: {
    popOverClickEvent() {
      this.$emit('popoverToggle', this.popoverToggle);
      // console.dir(this.$refs.opusPopoverTooltipMain);
      
      this.popoverToggle = !this.popoverToggle;
      // this.$refs.opusPopoverTooltipMain.classList.add('left-popover');
      if(!this.popoverToggle) {
      this.$refs.popoverContent.classList.add('visible');
      }else {
      this.$refs.popoverContent.classList.remove('visible');
      }
    }
  }
};
</script>

<style scoped>
.opus-popover {
  position: relative;
  /* margin-top: 1.5rem; */
  display: inline-block;
}

.opus-popover .content-slot {
  opacity: 0;
  display: none;
  position: absolute;
  /* left: -150px; */
  transform: translate(0, 10px);
  background-color: #ffffff;
  padding: 1.5rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  width: 330px;
}

.opus-popover .content-slot:before {
  position: absolute;
  z-index: -1;
  /* content: ' '; */
  border-style: solid;
  transition-duration: 0.3s;
  transition-property: transform;
}

.opus-popover.right-popover .content-slot:before {
  border-width: 10px 10px 10px 10px;
  border-color: transparent #ffffff transparent transparent;
  top: 25px;
  right: 100%;
}

.opus-popover.left-popover .content-slot:before {
  border-width: 10px 10px 10px 10px;
  border-color: transparent transparent transparent #ffffff;
  top: 25px;
  left: 100%;
}

.opus-popover.bottom-popover .content-slot:before {
  border-width: 10px 10px 10px 10px;
  border-color: transparent transparent #ffffff transparent;
  top: -18px;
  right: calc(100% - 30px);
}

.opus-popover.top-popover .content-slot:before {
  border-width: 10px 10px 10px 10px;
  border-color: #ffffff transparent transparent transparent;
  bottom: -18px;
  right: calc(100% - 30px);
}

.content-slot {
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
}

/* .opus-popover:hover .content-slot {
  z-index: 55;
  opacity: 1;
  display: block;
  transform: translate(0, -20px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
} */

.popover-main:hover .content-slot {
  z-index: 55;
  opacity: 1;
  display: block;
  transform: translate(0, -20px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}

.opus-popover:hover.right-popover .content-slot {
  left: calc(100% + 15px);
}

.opus-popover:hover.left-popover .content-slot {
  right: calc(100% + 6px);
}

.opus-popover:hover.bottom-popover .content-slot {
  top: calc(100% + 25px);
}

.opus-popover:hover.top-popover .content-slot {
  bottom: calc(100% - 10px);
  right: 0;
}
.opus-popover .title {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.opus-popover .content-slot hr {
  margin-top: 7px;
  margin-bottom: 7px;
}

/* clickable content */

.opus-popover:hover .content-slot.hide {
  display: none;
}

.opus-popover .content-slot.visible {
  z-index: 25;
  opacity: 1;
  display: block;
  transform: translate(0, -20px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}

.opus-popover.right-popover .content-slot {
  left: calc(100% + 15px);
}

.opus-popover.left-popover .content-slot {
  right: calc(100% + 6px);
}

.opus-popover.bottom-popover .content-slot {
  top: calc(100% + 25px);
}

.opus-popover.top-popover .content-slot {
  bottom: calc(100% - 10px);
}
</style>
