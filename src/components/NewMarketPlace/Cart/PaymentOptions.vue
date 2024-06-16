<template>
  <div class="payment_method_wrapper">
    <div class="col-lg-12 col-md-12 col-sm-12 payment-container">
      <div v-for="payment in paymentModes" :key="payment.id">
        <div
          class="col-lg-12 col-md-12 col-sm-12 box-border-wrapper mr-bt-10"
          :class="{ 'selected-box': payment_option == payment.id }"
          v-if="payment.display"
        >
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <input
                type="radio"
                :id="'payment-method_' + payment.id"
                name="payment-radio-group"
                v-model="payment_option"
                @change="emitValues()"
                :value="payment.id"
              />
              <label class="default-label" :for="'payment-method_' + payment.id"
                >{{ payment.mode }}
                <span v-if="payment.id === 1 && payment_option === 1"
                  >(Total Amount: ${{ totalPrice }})</span
                >
              </label>
            </div>
          </div>
          <div class="pl-20" v-if="payment.id === 1 && payment_option === 1">
            <div id="secureFrameWrapper">
              <iframe
                id="secureFrame"
                class="secureFrame"
                style="border: none; backgroundcolor: #f4f4f4"
                height="510px"
                width="100%"
                :src="`${chaseurl}/hpf/1_1/?uID=${uID}`"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :loadingStatus="loadingStatus"></loader>
  </div>
</template>
<script>
import { getChaseUID } from '../../../apis/chasePaymentAPI';
import Loader from '../../UIComponents/Loader.vue';

export default {
  props: ['paymentModes', 'existingPayment', 'totalPrice'],
  data() {
    return {
      payment_option: '',
      uID: '',
      loadingStatus: false,
      chaseurl: ''
    };
  },
  components: { Loader },
  methods: {
    emitValues() {
      this.$emit('paymentOpts', this.payment_option);
    },
    async chaseuID() {
      const formData = {
        amount: this.totalPrice,
        form_type_id: 0
      };
      const response = await getChaseUID(formData);
      this.uID = response.uid;
      this.$emit('uID', {
        id: response.id
      });
    }
  },
  watch: {
    existingPayment() {
      this.payment_option = this.existingPayment;
      this.emitValues();
    },
    async payment_option() {
      if (this.payment_option === 1) {
        this.loadingStatus = true;
        await this.chaseuID();
        this.loadingStatus = false;
      }
    }
  },
  created() {
    this.chaseurl = `${import.meta.env.VITE_VUE_APP_CHASE_URL}`;
  },
  mounted() {}
};
</script>
<style scoped>
.payment_method_wrapper {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.7);
  padding-bottom: 80px;
}
.box-border-wrapper.selected-box {
  border: 3px solid #4c9e45;
}
.selected-box >>> .default-label {
  color: #0b3c61;
  font-weight: 500;
}
.mr-bt-10 {
  margin-bottom: 10px;
}
.box-border-wrapper {
  padding-top: 25px;
  padding-bottom: 20px;
  border: 1px solid #d3d6d9;
  border-radius: 10px;
}

.default-label {
  font-size: 20px;
  line-height: 17px;
}

.secureFrame {
  max-width: 800px;
}

/* for radio button*/
[type='radio']:checked,
[type='radio']:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type='radio']:checked + label,
[type='radio']:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
}
[type='radio']:checked + label:before,
[type='radio']:not(:checked) + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: 1px solid #0b3c61;
  border-radius: 100%;
  background: #fff;
}
[type='radio']:checked + label:after,
[type='radio']:not(:checked) + label:after {
  content: '';
  width: 12px;
  height: 12px;
  background: #0b3c61;
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type='radio']:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type='radio']:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
