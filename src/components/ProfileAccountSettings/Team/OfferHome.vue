<template>
  <div>
    <div class="col-xs-12 p-0"><hr class="m-0" /></div>
    <div class="refer-offer col-sm-12 col-xs-12 col-md-12 p-0">
      <div
        class="d-flex align-items-center col-gap-15 mb-20 mt-20"
        @click="goBack"
      >
        <img
          class="cursor-pointer ml-20"
          src="/static/images/icons/back_arrow.svg"
          alt=""
        />
        <span class="blue-1 cursor-pointer text-subtitle-2">Back</span>
      </div>
      <div class="offer pb-20">
        <img src="/static/images/promotions/refer_5.svg" />
        <div class="text-h5 title">
          For a limited time, add five team members and receive a free OPUS
          eLearning training*
        </div>
        <div class="text-regular-large desc">
          *Your free OPUS eLearning training will be added to your account once
          all five invited team members activate their OPUS account.
        </div>
        <BaseButton variant="secondary" @click="addNew"
          >Add new member(s)</BaseButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from '../../UIComponents/BaseButton.vue';

export default {
  components: {
    BaseButton
  },
  methods: {
    goBack() {
      this.$emit('showScreen', 'team');
    },
    addNew() {
      this.$emit('addNew');
    }
  }
};
</script>

<style scoped>
.refer-offer {
  height: 65vh;
  overflow-y: auto;
}
.offer {
  /* margin-right: auto;
  margin-left: auto;
  max-width: 560px; */
  padding-right: 15%;
  padding-left: 15%;
  text-align: center;
}
.offer img {
  margin-bottom: 40px;
}
.offer .title {
  margin-bottom: 30px;
}
.offer .desc {
  margin-bottom: 50px;
}
@media (min-width: 768px) and (max-width: 1024px) {
  .refer-offer {
    height: 35vh;
  }
}
</style>
