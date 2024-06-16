import $ from 'jquery';
import EventBus from '../../../utils/event-bus';
import { removeFromCart } from '../../../apis/cart';

export const sharedCartMethods = {
  methods: {
    setSelectedTrainingItem(trainingInfo) {
      if (trainingInfo.moduleType === 'trainings') {
        this.selectedTraining = trainingInfo.item;
        if (trainingInfo.type === 'video') {
          this.videoInfo = trainingInfo.item;
          $('#preview_video').modal('show');
        } else if (trainingInfo.type === 'more info') {
          $('#modal_video').modal('show');
        }
      } else if (['documents', 'tools'].includes(trainingInfo.moduleType)) {
        this.selectedDocument = trainingInfo.item;
        $('#document-more-info').modal({
          backdrop: 'static',
          keyboard: false
        });
      }
    },
    /** For Cart Only we have remove from cart functionality not addToCart */
    async setCartInfo(cartDetails, type) {
      this.cartInfo = {
        ...cartDetails.cartInfo,
        selectedItem: cartDetails.item
      };
      const isIlt = type === 'ilt';
      if (!isIlt && cartDetails.item.is_trainings)
        this.selectedTraining = cartDetails.item;
      else if (
        !isIlt &&
        (cartDetails.item.is_tools || cartDetails.item.is_documents)
      ) {
        this.selectedDocument = cartDetails.item;
      }
      $('#addRemoveCartPopup').modal({
        backdrop: 'static',
        keyboard: false
      });
      /* For trainings in market place */
      if (['trainings', 'documents', 'tools'].includes(type)) {
        /* Once item is added to cart using more info modal then fetch newList as list needs to be updated */
        if (cartDetails.cartInfo.type === 'add') {
          if ($('#modal_video').hasClass('in')) {
            $('#modal_video').modal('hide');
          }
          if ($('#document-more-info').hasClass('in')) {
            $('#document-more-info').modal('hide');
          }
          this.emitter.emit('fetchCartList');
          // await this.getList();
          // this.emitter.emit('fetchCartList');
        }
      }
    },
    async removeFromCart(type) {
      const { selectedItem } = this.cartInfo;
      $('#addRemoveCartPopup').modal('hide');
      this.loaderStatus = true;
      const selectedCartItem =
        type === 'ilt' ? this.courseDetails : selectedItem;
      const { cart_id: cartId } = selectedCartItem.cart_status;
      const res = await removeFromCart(cartId);
      this.loaderStatus = false;
      if (res.data && res.data.status_code === 200) {
        if (type === 'ilt') {
          this.fetchCourseDetails();
        } else {
          /* For training more info pop up */
          if ($('#modal_video').hasClass('in')) {
            $('#modal_video').modal('hide');
          }
          if ($('#document-more-info').hasClass('in')) {
            $('#document-more-info').modal('hide');
          }
          this.emitter.emit('fetchCartList');
          this.emitter.emit('getDynimicCartdetails');
          if (['trainings', 'documents', 'tools'].includes(type))
            this.getList();
        }
        this.$notify({
          type: res.data.message,
          title: 'Success',
          text: res.data.data
        });
        this.emitter.emit('cart-items-updated');
      }
    },
    /**
     * Fetch list of marketplace resources only after closing the modal
     * To avoid additional API call to fetch list of marketplace items
     *  */
    async closeAddRemoveCart(isILTMoreInfo = false) {
      if (this.cartInfo?.type === 'add') {
        $('#addRemoveCartPopup').modal('hide');
        if (isILTMoreInfo) this.fetchCourseDetails();
        else await this.getList();
      }
    }
  }
};

export default sharedCartMethods;
