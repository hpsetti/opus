<template>
  <div id="alreadyActivatedPlans" class="modal" role="dialog">
    <div class="modal-dialog modal-lg request-modal">
      <div class="modal-content col-xs-12">
        <div class="modal-header pl-0 pb-10 mb-10">
          <div class="justify-content-between">
            <img
              data-dismiss="modal"
              class="cursor-pointer float-right"
              src="/static/images/icons/close_icon.svg"
              alt=""
            />
          </div>
        </div>
        <div
          class="modal-body col-xs-12 mb-20 font-18 text-start justify-content-center"
        >
          <div class="text-h4-bold">{{formDetails.message}}/s</div>
          <hr>
          <div class="pb-10" v-for="user in formDetails.already_purchased_plans" :key="user.user_id">
            <p class="pt-10 pl-10 text-h4"><b>User -</b> {{user.email}}</p>
            <div class="pl-30">
              <ul class="pl-10" v-for="(list, index) in user.plan_names" :key="index">
              <li>{{list}}</li>
            </ul>
            </div>
            <hr>
          </div>
        </div>
        <div class="footer col-xs-12 mb-30">
          <div class="col-xs-12 p-0 d-flex justify-content-end col-gap-15">
            <button data-dismiss="modal" class="emergo-white-button">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formDetails: {
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style scoped>
.modal-header {
  background: #ffffff;
  color: #333333;
  border: none;
}

.border-bottom {
  border-bottom: 1px solid #bdbdbd;
}

#addRemoveCartPopup {
  z-index: 1060;
}

.title {
  font-weight: 400;
  font-size: 32px;
  line-height: 44px;
}

.added-to-cart-text {
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #4c9e45;
}
</style>
