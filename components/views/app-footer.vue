<template>
  <div class="footer">
    <div class="footer__content">
      <span class="title">Join our Team of Writers</span>
      <span class="text"
        >On dasdas, writers earn a living doing what they love. Getting started
        is easy. Just pay a one time $25 fee and everything is ready to
        go.</span
      >

       <span style="visibility:hidden"><flutterwave-pay-button ref="flutterwave" v-bind="paymentData">
        </flutterwave-pay-button></span>

      <button class="button" @click="$refs.flutterwave.showPaymentModal()">JOIN US</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentData: {
        tx_ref: this.generateReference(),
        amount: 25,
        currency: "USD",
        payment_options: "card",
        meta: {
          counsumer_id: "7898",
          consumer_mac: "kjs9s8ss7dd"
        },
        customer: {
          name: "John Doe",
          email: "xceldeveloper@gmail.com",
          phone_number: "0818450***44"
        },
        customizations: {
          title: "Join our team of writers",
          description: "Family",
          logo: "https://www.xceldeveloper.com/_nuxt/img/icon.0d9d8b5.jpg"
        },
        callback: this.makePaymentCallback,
        onclose: this.closedPaymentModal
      }
    };
  },
  methods: {
    makePaymentCallback(response) {
    //  console.log("Pay", response);
      this.closePaymentModal(5);
    },
    closedPaymentModal() {
     // console.log("payment is closed");
    },
    generateReference() {
      let date = new Date();
      return date.getTime().toString();
    }
  }
};
</script>

<style lang="scss">
.footer {
  min-height: pxToRem(300);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    .title {
      display: block;
      text-align: center;
      font-size: pxToRem(20);
      font-weight: 600;

      @include media-breakpoint-up(md) {
        font-size: pxToRem(25);
      }
    }

    .text {
      display: block;
      max-width: 90%;
      text-align: center;
      line-height: pxToRem(22);
      font-size: pxToRem(16);
      margin: pxToRem(8) auto;

      @include media-breakpoint-up(md) {
        font-size: pxToRem(18);
        line-height: pxToRem(27);
        max-width: 600px;
        margin: pxToRem(10) auto;
      }
    }

    .button {
      display: block;
      background-color: #000;
      color: #fff;
      margin: auto;
      border-radius: 3px;
      padding: pxToRem(13) pxToRem(30);

      @include media-breakpoint-up(md) {
        padding: pxToRem(14) pxToRem(40);
      }
    }
  }

  @include media-breakpoint-up(lg) {
  }
}
</style>
