<template>
  <v-container>
    <div ref="card"></div>
    <!-- <v-row class="mx-auto d-flex align-center justify-center">
      <v-btn color="info" @click="purchase">Purchase</v-btn>
    </v-row>-->
  </v-container>
</template>

<script>
import { stripePk } from "../../config";

let style = {
  base: {
    border: "1px solid #D8D8D8",
    borderRadius: "4px",
    color: "#000"
  },

  invalid: {
    // All of the error styles go inside of here.
  }
};
export default {
  data: function() {
    return {
      stripe: null,
      elements: null,
      card: null
    };
  },
  created: function() {
    (this.stripe = Stripe(stripePk)),
      (this.elements = this.stripe.elements()),
      (this.card = undefined);
  },
  mounted: function() {
    console.log("===========")
    this.card = this.elements.create("card", style);
    this.card.mount(this.$refs.card);
  },

  methods: {
    purchase: async function() {
      let self = this;
      let secret = "";

      try {
        let response = await self.$http.get("/stripe/secret");
        secret = response.data.client_secret;
        console.log(secret, response);
      } catch (e) {
        console.error(e);
      }
      try {
        let response = await self.stripe.confirmCardPayment(secret, {
          payment_method: {
            card: self.card,
            billing_details: {
              name: "Jenny Rosen"
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>