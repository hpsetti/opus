/* eslint-disable no-alert */
((global) => {
  global.cancelPayment = () => {
    window.swal({
      icon: 'warning',
      text: `You have canceled the payment.`,
      closeOnClickOutside: false,
      confirmButtonColor: '#4c9e45',
      html: true,
      closeOnEsc: false,
      button: "OK",
    })
    .then((value) => {
      if (value) {
        const reloadEvent = new Event('reloadPage');
        window.addEventListener('reloadPage', function() {
          // Reload the page when the custom reload event is dispatched
          location.reload();
        });
      
        // Dispatch the custom reload event to reload the page
        window.dispatchEvent(reloadEvent);
      }
    });
  };
  global.hpfReady = () => {
    console.log('HPF Form finished loading.');
  };
  global.handlePaymentErrors = (data) => {
    const chaseErrorCodes = {
      100: 'Merchant Identifier left blank or not valid. The transaction was not processed.',
      110: 'Session Identifier left blank. The transaction was not processed.',
      118: 'Too many CAPTCHA retries.',
      200: 'Name not present.',
      300: 'Amount not specified or invalid value entered',
      310: 'Credit card number left blank.',
      315: 'Credit card number is invalid.',
      320: 'Credit card type left blank or invalid.',
      330: 'Expiration month left blank.',
      340: 'Expiration year left blank.',
      350: 'CVV2 field submitted but does not match the card.',
      355: 'CVV2 required but not present.',
      357: 'An invalid character was entered, such as a letter in a numeric field.',
      360: 'Payment declined by financial institution, or some other error has occurred (returned from Orbital).',
      365: 'The max user retries limit has been reached.',
      370: 'Expiration date invalid.',
      400: 'Transaction tracer value does not match.',
      500: 'Address one field required but left blank.',
      510: 'City field required but left blank.',
      520: 'State field required but left blank.',
      530: 'ZIP/postal code field required but left blank.',
      531: 'Invalid ZIP/postal code format received.',
      550: 'Country is missing.',
      600: 'Bank name was blank (ECP Only).',
      610: 'Routing Number is blank (ECP Only).',
      620: 'Checking Account number was blank (ECP Only)',
      640: 'Routing Number is invalid (ECP Only)',
    }
    const errorList = Object.values(data.errorCode);
    let Finallist = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const item of errorList) {
      if (errorList.includes(item)) {
        if (item.length > 0) {
          Finallist += `${chaseErrorCodes[item]}\n`;
        }
      }
    }
    window.swal({
      icon: 'error',
      title: 'Payment Error',
      text: `Unfortunately, it looks like a transaction error has occurred. \n ${Finallist} \n Please verify all required fields are complete, confirm your payment details or refresh the browser to try again.`,
      closeOnClickOutside: false,
      confirmButtonColor: '#4c9e45',
      html: true,
      closeOnEsc: false,
      buttons: {
        ok: true,
      },
    })
  };
  global.completePayment = (data) => {
    console.log(data);
    window
      .swal({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Click Activate Service to initiate activation of your purchase(s) and redirect to confirmation screen',
        closeOnClickOutside: false,
        confirmButtonColor: '#4c9e45',
        html: true,
        closeOnEsc: false,
        button: "Activate Service",
      })
      .then((value) => {
        if (value) {
          const clickEvent = new Event('successClick');
          window.dispatchEvent(clickEvent);
        }
      });
    // alert('Payment successful. Click on Continue to proceed.');
  };
})(window);
