<template>
  <div>
    <div id="modal_ilt_video" class="modal" role="dialog">
      <div class="modal-dialog modal-lg request-modal">
        <!-- Modal content-->
        <div class="modal-content col-xs-12 p-20" v-if="displayData">
          <div class="modal-header">
            <div class="col-xs-12 p-0 text-start header">
              <img
                src="/static/images/icons/lms/info-modal-training-icon.svg"
                class="lms-training-icon"
              />
              Instructor Led Trainings
            </div>
          </div>

          <div class="modal-body col-xs-12 text-start">
            <div class="col-xs-12 p-0">
              <div class="col-xs-12 p-0 training-type">
                {{ displayData.training_type }}
              </div>
              <div class="col-xs-12 p-0 training-title mb-5">
                {{ displayData.title }}
              </div>
              <div class="col-xs-11 p-0 font-14 mb-10">
                {{ displayData.description }}
              </div>
            </div>
            <div class="col-xs-12 pr-0 purchase-info-main mt-10">
              <div class="col-xs-10 purchase-info p-0 font-18 font-bold pl-10 pr-10">
                {{ getPurchaseStatus(displayData.included) }}
              </div>
              <div class="col-xs-2 font-18 font-bold text-right p-0 pr-10">
                ${{ displayData.price }}
              </div>
            </div>
          </div>
          <div class="footer col-xs-12 p-0 flex-wrapper">
            <div class="col-md-4 col-sm-4 footer-cancel-btn">
              <button
                type="button"
                data-dismiss="modal"
                class="btn btn-block cancel-button footer-btn-common-properties w-180"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  props: ['trainingInfo'],

  data() {
    return {
      displayData: null,
      paramId: ''
    };
  },

  watch: {
    trainingInfo() {
      this.displayData = this.trainingInfo;
    }
  },

  methods: {
    getPurchaseStatus(purchansed) {
      switch (purchansed) {
        case 'yes':
          return 'Included In Trial';
        default:
          return 'Price';
      }
    },
    reset() {
      $('#modal_video').modal('hide');
    }
  }
};
</script>

<style scoped>
.w-180 {
  width: 230px;
  height: 36px;
}

.header {
  background: #1695a5;
  padding: 5px 0px 5px 15px;
  color: #ffffff;
  border-radius: 5px;
}
.play-icon {
  height: 35px;
  padding-right: 10px;
}
.modal-body {
  padding-left: 0px;
  padding-bottom: 50px;
}
.course-contents {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  line-height: 19px;
}

li {
  list-style-type: none;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
}

li:before {
  content: '\00b7';
  font-size: 30px;
  vertical-align: sub;
}

@media (min-width: 375px) and (max-width: 1200px) {
  .request-modal {
    width: 75%;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
  }
}

.modal-header {
  font-size: 24px;
  padding: 0px;
  border-bottom: none;
  background-color: #fff;
}

.modal-footer {
  background: #fff;
  border-top: none;
}

.mt-15 {
  margin-top: 15px;
}

.modal-body {
  background: #fff;
}

.training-details {
  font-weight: 400;
  color: #000000;
  font-size: 18px;
  margin-bottom: 15px;
}

.text-start {
  text-align: start;
}

.course-info {
  text-align: justify;
  margin-top: 10px;
  padding-right: 15px;
}

.save-button {
  border: 1px solid #4c9e45;
  background-color: #4c9e45;
  color: #f2f2f2;
}
.save-button:hover {
  color: #f2f2f2;
}

.footer-btn-common-properties {
  border-radius: 20px;
  line-height: 21px;
  font-size: 18px;
  font-weight: 500;
}

.cancel-button {
  background: #ffffff;
  border: 1px solid #0b3c61;
  box-sizing: border-box;
  text-align: center;
  color: #0b3c61;
}
.cancel-button:hover {
  color: #0b3c61;
}

.flex-wrapper {
  display: flex;
  justify-content: flex-end;
}

ul {
  padding-left: 10px;
}

.training-type {
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #00518a;
}

.training-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  color: #0b3c61;
  margin-top: 5px;
}

.purchase-info {
  line-height: 21px;
  color: rgba(0, 0, 0, 0.7);
}
.purchase-info-main {
  padding: 15px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
@media (min-width: 768px) {
  .modal-dialog {
    margin: 80px auto !important;
  }
}
</style>
