<template>
    <div class="activateServiceDateExpiryPopup modal" id="activateServiceDateExpiryPopup" role="dialog">
      <div class="modal-dialog modal-md request-modal">
        <div class="modal-content col-xs-12">
          <div class="modal-header pl-0 pb-10 mb-10">
            <div class="d-flex justify-content-between">
              <div class="font-32 title">Update Expiry Date</div>
              <img
                data-dismiss="modal"
                class="cursor-pointer"
                src="/static/images/icons/close_icon.svg"
                alt=""
                @click="dateNotUpdated"
              />
            </div>
          </div>
          <div
            class="modal-body col-xs-12 mb-20 font-18 text-start d-flex justify-content-center flex-direction-column"
          >
            <p>Set the Date of Expiry for</p>
            <date-picker
            type="date"
            lang="en"
            v-model:value="expiryDate"
            valueType="format"
            format="DD-MMM-YYYY"
            placeholder="xx/xx/xxxx"
            :disabled-date="disabledBefore"
          >
          </date-picker>
          </div>
          <div class="footer col-xs-12 mb-30">
            <div data-dismiss="modal" class="col-xs-12 p-0 d-flex justify-content-end col-gap-15">
              <button  class="emergo-white-button" @click="dateNotUpdated">Cancel</button>
              <button  class="emergo-green-button" @click="dateConfirmed" :disabled="!expiryDate">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import dayjs from 'dayjs'
  import DatePicker from 'vue-datepicker-next';

  export default {
    props: {
    },
    components: {
        DatePicker
    },
    data() {
      return {
        expiryDate: '',
        testDate:''
      };
    },
    methods: {
        dateConfirmed() {
        this.$emit('activateServiceDateExpiry',this.dateModifier);
        this.expiryDate = '';
      },
      dateNotUpdated() {
        this.$emit('activateServiceDateExpiryNotUpdated',false);
        this.expiryDate = '';
      },
      disabledBefore(date) {
        date = date <= dayjs().subtract(0, 'days')
      return date;
    },
    },
    computed:{
        dateModifier() {
            const newDate = dayjs(this.expiryDate).utc(true).format();
            return newDate ;
        }
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
  