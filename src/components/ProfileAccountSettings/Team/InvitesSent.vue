<template>
  <div id="invites-sent">
    <div class="col-sm-12 col-xs-12 col-md-12 p-0">
      <hr class="m-0" />
      <div class="offer">
        <img src="/static/images/promotions/refer_5.svg" />
        <div class="text-h5 title">Invite sent!</div>
        <div class="text-regular-large mb-10 text-left">
          As soon as your invited members create and activate their OPUS
          accounts, you’ll receive a free OPUS elearning training loaded into
          your training library. Please allow for up to 48 hours before your
          training shows up in your library.
        </div>
        <br />
        <div class="text-regular-large desc text-left">
          You can check on the status of each invited member by going to the
          <span
            class="blue-1 cursor-pointer text-bold"
            @click="goToAccountSettings"
            >Team</span
          >
          page under Account Settings.
        </div>
      </div>
    </div>
    <div class="footer text-end mb-20 pr-20">
      <BaseButton @click="goToAccountSettings">OK</BaseButton>
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
    goToAccountSettings() {
      this.$emit('getTeamMembers');
    }
  }
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
.offer {
  padding-top: 70px;
  /* margin-right: auto;
  margin-left: auto; */
  padding-left: 15%;
  padding-right: 15%;
  /* max-width: 560px; */
  overflow-y: auto;
  text-align: center;
  height: calc(65vh - 45px);
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
.text-end {
  text-align: end;
}
@media (min-width: 768px) and (max-width: 1024px) {
  .offer {
    height: 35vh;
  }
}
</style>
