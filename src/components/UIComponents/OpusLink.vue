<template>
  <div class="opus-link" :class="{[`${size}`]: size}">
    <router-link class="cursor-pointer" v-if="to" :to="to"><slot></slot></router-link>
    <a class="cursor-pointer" v-else v-bind="$attrs"><slot></slot></a>
  </div>
</template>

<script>
export default {
  name: 'OpusLink',
  props: {
    to: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
  },
};
</script>

<style>
.opus-link.md a {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #00518A;
}
.opus-link.sm a {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #00518A;
}
.opus-link a:hover {
  color: #0A99FF;
}
.opus-link a:disabled {
  opacity: 0.3;
}
.opus-link a:active {
  color: #0B3C61;
}
</style>
