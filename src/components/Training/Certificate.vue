<template>
  <div class="Certificate">
    <div class="Certificate__container d-flex flex-column align-items-center">
      <div class="Certificate--heading">
        <h1 class="fw-600">Certificate of Training</h1>
      </div>
      <div class="Certificate--content text-center">
        <h4 class="fw-600">Awarded to</h4>
        <h3
          class="fw-600 text-emergo-green"
          :class="recipientName.length >= 35 ? 'minified-text' : ''"
        >
          {{ recipientName }}
        </h3>
        <h5 class="fw-600">
          For successfully completing the certificate titled:
        </h5>
        <h2 class="fw-700 certificate-name">{{ certificateName }}</h2>
      </div>
      <div class="Certificate--footer d-flex justify-content-between">
        <div class="opus-logo__container">
          <img
            class="opus-logo"
            src="/static/images/logos/OPUS_Logo.png"
            alt="opus-logo"
          />
        </div>
        <div class="certificate-logo__container">
          <img
            class="certificate-logo"
            src="/static/images/hfe_certificate_training_logo.svg"
            alt="certificate-logo"
          />
        </div>
        <div
          class="certificate-details__container d-flex align-items-end fw-500"
        >
          <div
            class="certificate-details__container--fields d-flex justify-content-between flex-column align-right"
          >
            <p>Issued by</p>
            <p>Date Issued</p>
            <p>Certificate No.</p>
          </div>
          <div
            class="certificate-details__container--values d-flex justify-content-between flex-column"
          >
            <p>Emergo by UL</p>
            <p>{{ dateIssued }}</p>
            <p>{{ generateCertificateNumber }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Certificate',
  props: {
    recipientName: {
      type: String,
      required: true
    },
    certificateName: {
      type: String
    },
    // certificateLogoPath: {
    //   type: String,
    //   required: true,
    // },
    dateIssued: {
      type: String,
      required: true
    },
    certificateDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    generateCertificateNumber() {
      return this.certificateDetails.certificate_number;
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}

.Certificate {
  min-height: 985px;
  width: 1752px;
  background-color: #fff;
  position: relative;
  left: 47px;
}
.Certificate__container {
  border: 20px solid #479143;
}

.Certificate--heading {
  margin-top: 62px;
}

.Certificate--heading h1 {
  font-size: 120px;

  margin: 0px;
  line-height: 164px;
}

.Certificate--content h4 {
  font-size: 64px;

  line-height: 87px;

  position: relative;
  bottom: 12px;
}

.Certificate--content h3 {
  font-size: 96px;
  line-height: 131px;

  position: relative;
  bottom: 9px;
}

.minified-text {
  font-size: 45px !important;
}
.Certificate--content h5 {
  font-size: 48px;
  line-height: 65px;

  margin-top: 2px;
}

.Certificate--content h2 {
  font-style: normal;

  font-size: 100px;
  line-height: 98px;
  margin-top: 5px;
  color: #245938;
}

.Certificate--footer {
  margin-top: 35px;
  width: 100%;
  height: 100%;

  margin-bottom: 51px;
}

.Certificate--footer .opus-logo__container {
  align-self: center;
  position: relative;
  left: 60px;
  top: 50px;
}

.Certificate--footer .opus-logo {
  width: 272px;
  height: 150.94px;
}

.Certificate--footer .certificate-logo {
  width: 348px;
  height: 241.86px;
}

.Certificate--footer .certificate-details__container {
  font-family: 'Roboto', sans-serif;

  font-size: 24px;
  line-height: 28px;
  position: relative;
  right: 46px;
  top: 10px;
}

.Certificate--footer
  .certificate-details__container
  .certificate-details__container--fields,
.certificate-details__container--values {
  height: 155px;
}

.certificate-details__container--fields {
  position: relative;
  right: 82px;
}
</style>
