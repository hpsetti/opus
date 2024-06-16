<template>
  <div class="opus-toggle-tab">
    <p
      class="start text-subtitle-1 cursor-pointer"
      :class="{ 'selected': selected === 'start' }"
      @click="setTab('start')"
      >{{ labels.start }}</p
    >
    <p
      class="end text-subtitle-1 cursor-pointer"
      :class="{ 'selected': selected === 'end' }"
      @click="setTab('end')"
      >{{ labels.end }}</p
    >
  </div>
</template>

<script>
export default {
  name: 'OpusToggleTab',
  props: {
    labels: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  model: {
    event: 'click',
    prop: 'value',
  },
  data() {
    return {
      selected: null,
    };
  },
  watch: {
    value: {
      handler(value) {
        this.selected = value;
      },
      immediate: true,
    },
  },
  methods: {
    setTab(pos) {
      this.selected = pos;
      this.$emit('click', pos);
    },
  },
};
</script>

<style>
.opus-toggle-tab {
  display: flex;
}
.opus-toggle-tab p {
  margin: 0;
}
.opus-toggle-tab .start,
.opus-toggle-tab .end {
  min-width: 200px;
  display: block;
  padding: 11px 22px;
  border-radius: 42px;
  word-wrap: break-word;
  white-space: normal;
}
.opus-toggle-tab {
  background: rgb(211, 214, 217, 0.3);
  border-radius: 42px;
  width: fit-content;
}
.opus-toggle-tab .start.selected,
.opus-toggle-tab .end.selected {
  background: #4c9e45;
  color: #fff;
}
</style>
