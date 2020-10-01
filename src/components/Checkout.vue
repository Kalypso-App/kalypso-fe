<template>
<v-container style="overflow-y:auto;">
    <div class="card-name">Payment Details</div>
    <v-divider class="divider-color"></v-divider>
    <div ref="card"></div>
    <div class="pricing-container">
        <div @click="onchangepricing(product)" v-for="(product, i) in products" :key="i" :class="product.selected ? 'selected' : ''" class="pricing-v2-card">
            <div class="pricing-v2-header">
                <div class="title-pricing dark-bg">{{product.name}}</div>
                <div class="pricing-v2-tag">${{product.price.unit_amount / 100}}</div>
                <div class="pricing-v2-billing">per {{product.price.recurring.interval}} / billed monthly</div>
                <img src="https://uploads-ssl.webflow.com/5e4d9bff0a8005acc9d4914a/5e4d9bff25ecd7bea7c5e00c_wave-bottom.svg" alt="" class="pricing-v2-wave">
                <div class="pricing-card-dots"></div>
                <img src="https://uploads-ssl.webflow.com/5e4d9bff0a8005acc9d4914a/5e4d9bff25ecd74b76c5dff1_circle-white.svg" alt="" class="pricing-card-circle">
            </div>
            <div class="pricing-v2-card-info">
                <div v-if="i==0" class="pricing-features">
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div class="text-block-4">Unlimited<strong class="bold-text-2"> Campaigns</strong></div>
                    </div>
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div><strong>Unlimited</strong> Reporting</div>
                    </div>
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div>Cancel Anytime<strong></strong></div>
                    </div>
                    <div class="pricing-feature no">
                        <div class="pricing-feature-icon no"></div>
                        <div>No Custom Branding</div>
                    </div>
                    <div class="pricing-feature no">
                        <div class="pricing-feature-icon no"></div>
                        <div>No Custom Add-Ons</div>
                    </div>
                </div>
                <div v-if="i!=0" class="pricing-features">
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div><strong>Unlimited</strong> Campaigns</div>
                    </div>
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div><strong>Unlimited</strong> Reporting</div>
                    </div>
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div>Cancel Anytime</div>
                    </div>
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div><strong>Your branding</strong> on reports</div>
                        <div class="info">
                            <div class="tooltip hidden" style="display: none; transform: translate3d(0px, 4px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; opacity: 0;">
                                <div>Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action.</div>
                                <div class="tooltip-arrow"></div>
                            </div>
                        </div>
                    </div>
                    <div class="pricing-feature">
                        <div class="pricing-feature-icon"></div>
                        <div>Done-for-you <strong>custom</strong> reporting add-ons</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!isFromSignup" class="pull-right pb-5">
        <v-btn color="primary" @click="createCustomer">Confirm</v-btn>
    </div>
</v-container>
</template>

<script>
import {
    basic_key
} from "../config";
import {
    pro_key
} from "../config";
import {
    stripePk
} from "../config";
import Vue from 'vue';

let style = {
    base: {
        border: "1px solid #D8D8D8",
        borderRadius: "4px",
        color: "#000",
    },

    invalid: {
        // All of the error styles go inside of here.
    },
};

export default {
    props: {
        email: String,
        checkout: Boolean,
        isFromSignup: Boolean
    },
    watch: {
        'checkout': function () {
            this.createCustomer();
        },
        'email': function () {
            console.log("email    =====  " + this.email);
        }
    },
    data: () => ({
        stripe: null,
        elements: null,
        card: null,
        isBasic: false,
        customer: {},
        products: []
    }),
    created: function () {

    },
    mounted: function () {
       this.$nextTick(() => {
        (this.stripe = Stripe(stripePk)),
        (this.elements = this.stripe.elements()),
        (this.card = undefined);

        let me = this;
        this.card = this.elements.create("card", style);
        this.card.mount(this.$refs.card);
        this.card.on('change', function (event) {
            if (event.complete) {
                me.$store.dispatch("checkoutModule/setCardValid", true);
                // enable payment button
            } else if (event.error) {
                me.$store.dispatch("checkoutModule/setCardValid", false);
                // show validation to customer
            }
        });
        this.getProducts();
       });
    },
    methods: {
        onchangepricing(product) {
            this.products.map(x => x.selected = false);
            product.selected = true;
        },
        async getProducts() {
            let response = await this.$http.get(`/stripe/products`, {});
            this.products = response.data.data;
        },
        redirectToCheckout() {
            let priceId = this.products.find(x => x.selected).price.id;
            // if(!this.isBasic){
            //   priceId = pro_key;
            // }
            self.stripe
                .redirectToCheckout({
                    lineItems: [{
                        price: priceId,
                        quantity: 1
                    }],
                    mode: 'subscription',
                })
                .then(handleResult);
        },
        async createCustomer() {
            let me = this;
            let name = this.email;
            let iValidCard = this.$store.getters["checkoutModule/isValidCard"]

            if (!iValidCard) {
                Vue.notify({
                    group: 'app',
                    type: "error",
                    title: 'Error',
                    text: `Please enter valid card details`
                });
                return false;
            }

            let response = await this.$http.post(`/stripe/create-customer`, {
                email: name,
            }).then((res) => {
                if (res.status == 200)
                    this.$store.dispatch("alertsModule/turnOnAlert", {
                        type: "success",
                        message: "Payment customer created."
                    });
                return res;
            });

            this.customer = response.data.customer;
            //let priceId = basic_key;
            let priceId = this.products.find(x => x.selected).price.id;
            // if(!this.isBasic){
            //   priceId = pro_key;
            // }
            me.stripe.createPaymentMethod({
                    type: 'card',
                    card: me.card,
                    billing_details: {
                        name: name,
                    },
                })
                .then((result) => {
                    if (result.error) {
                        console.log(result);
                        Vue.notify({
                            group: 'app',
                            type: "error",
                            title: 'Error',
                            text: result.error
                        });
                    } else {
                        // Create the subscription
                        me.createSubscription({
                            email: me.email,
                            customerId: me.customer.id,
                            paymentMethodId: result.paymentMethod.id,
                            priceId: priceId,
                        });
                    }
                });
        },
        createSubscription({
            email,
            customerId,
            paymentMethodId,
            priceId
        }) {
            let me = this;

            this.$http.post(`/stripe/create-subscription`, {
                    email: email,
                    customerId: customerId,
                    paymentMethodId: paymentMethodId,
                    priceId: priceId,
                })
                // If the card is declined, display an error to the user.
                .then((result) => {
                    if (result.error) {
                        // The card had an error when trying to attach it to a customer
                        Vue.notify({
                            group: 'app',
                            type: "error",
                            title: 'Error',
                            text: result.error
                        });

                        throw result;
                    }
                    return result;
                })
                // Normalize the result to contain the object returned
                // by Stripe. Add the addional details we need.
                .then((result) => {
                    if (!me.isFromSignup) {
                        me.$emit('subscriptionCompleted', result);
                    }
                    me.$router.push("/campaigns");
                    Vue.notify({
                        group: 'app',
                        type: "success",
                        title: 'Success',
                        text: "Payment completed."
                    });

                    return {
                        // Use the Stripe 'object' property on the
                        // returned result to understand what object is returned.
                        subscription: result,
                        paymentMethodId: paymentMethodId,
                        priceId: priceId,
                    };
                })
                .catch((error) => {
                    // An error has happened. Display the failure to the user here.
                    // We utilize the HTML element we created.
                    console.log(error);
                })
        }
    }
};
</script>

<style lang="scss">
.pricing-container {
    position: relative;
    display: -ms-grid;
    display: grid;
    width: 100%;
    grid-auto-columns: 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 64px;
    grid-template-columns: 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
    padding: 30px;
}

@media only screen and (max-width: 600px) {
 .pricing-container{
   grid-template-columns: 1fr;
  }
}

.selected {
    border: 5px solid #b87df9;
    transform: scale3d(1.05, 1.05, 1); // translate3d(0px, -1.23328%, 0px);
    transform-style: preserve-3d;
    will-change: transform;
}

.pricing-v2-card {
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 15px 30px 0 rgba(48, 54, 77, 0.1);
    text-align: center;
}

.title-pricing.dark-bg {
    background-color: hsla(0, 0%, 100%, 0.1);
    color: #fff;
}

.title-pricing {
    display: inline-block;
    margin-bottom: 16px;
    padding: 4px 7px 4px 8px;
    border-radius: 4px;
    background-color: #ededff;
    color: #9165f7;
    font-size: 11px;
    line-height: 16px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
}

.pricing-v2-tag {
    margin-bottom: 8px;
    font-family: 'Fira Sans', sans-serif;
    font-size: 40px;
    line-height: 48px;
    font-weight: 500;
}

.text-white-faded {
    color: hsla(0, 0%, 100%, 0.7);
}

.pricing-v2-card-info {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    padding: 20px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

.pricing-features {
    padding-top: 16px;
    padding-bottom: 32px;
    text-align: left;
}

.pricing-feature {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: -1px;
    padding-top: 8px;
    padding-bottom: 8px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-top: 1px solid #e6e8f0;
    border-bottom: 1px solid #e6e8f0;
    color: #30364d;
}

.pricing-feature.no {
    color: #a9aec3;
}

.pricing-feature-icon {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    background-image: url("https://uploads-ssl.webflow.com/5e4d9bff0a8005acc9d4914a/5e4d9bff25ecd77c0ec5df97_check-color.svg");
    background-position: 50% 50%;
    background-size: 20px;
}

.pricing-feature-icon.no {
    background-image: url("https://uploads-ssl.webflow.com/5e4d9bff0a8005acc9d4914a/5e4d9bff25ecd7899ec5df6e_x-dark.svg");
    opacity: 0.33;
}

.pricing-small-info {
    color: #798099;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
}

.pricing-v2-header {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    padding: 32px 32px 40px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-image: -webkit-gradient(linear, left top, right top, from(#b87df9), to(#6a4ee1));
    background-image: linear-gradient(90deg, #b87df9, #6a4ee1);
    color: #fff;
}

.pricing-v2-header.gradient-2 {
    background-image: -webkit-gradient(linear, left top, right top, from(#f8bb4b), to(#f85252));
    background-image: linear-gradient(90deg, #f8bb4b, #f85252);
}

.pricing-v2-header.gradient-3 {
    background-image: -webkit-gradient(linear, left top, right top, from(#62d1f8), to(#5c71d9));
    background-image: linear-gradient(90deg, #62d1f8, #5c71d9);
}

.pricing-v2-header.gradient-4 {
    background-image: -webkit-gradient(linear, left top, right top, from(#84f796), to(#11aeaf));
    background-image: linear-gradient(90deg, #84f796, #11aeaf);
}

.pricing-card-dots {
    position: absolute;
    left: -1%;
    top: auto;
    right: auto;
    bottom: 26%;
    width: 99px;
    height: 45px;
    background-image: url("https://uploads-ssl.webflow.com/5e4d9bff0a8005acc9d4914a/5e4d9bff25ecd79846c5dfec_circle-pattern-white.svg");
    background-position: 100% 0%;
    background-size: 12px;
    opacity: 0.12;
    background-repeat: repeat;
}

.pricing-card-circle {
    position: absolute;
    left: auto;
    top: -37%;
    right: -11%;
    bottom: auto;
    width: 160px;
    opacity: 0.08;
}

.pricing-v2-billing {
    font-size: 13px;
    line-height: 20px;
}

.pricing-v2-wave {
    position: absolute;
    top: auto;
    bottom: 0%;
    display: block;
    width: 100%;
    height: 48px;
    max-width: none;
}
</style>
