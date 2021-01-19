<template>
<div class="modal-mask">
    <v-dialog v-model="dialog" scrollable width="unset" min-width="448px" max-width="948px">
        <v-card style="min-width:940px" class="modal-padding">
            <div class="modal-header">
                <div class="title-part">
                    <h1>Account Settings</h1>
                </div>
            </div>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-card-text style="height: 592px;">
                <v-row>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Profile Settings</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-form v-model="valid" ref="profileform">
                                    <v-row class="px-6 pt-8">
                                        <v-col cols="12" sm="6" class="py-0">
                                            <v-text-field label="Full Name" v-model="name" :rules="nameRules" class="input-style" background="#F8F8FF" filled></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="py-0">
                                            <v-text-field :rules="emailRules" v-model="email" label="Email Address" class="input-style" background="#F8F8FF" filled readonly disabled></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" class="py-0">
                                            <v-text-field v-if="user.password" :type="showPassword ? 'text' : 'password'" placeholdr="Password" label="Password" v-model="password" filled :rules="[(v) => !!v || 'Password is required']" class="input-style" background="#F8F8FF" />
                                        </v-col>
                                        <v-col cols="12" sm="6" class="py-0">
                                            <v-text-field v-if="user.password" :type="showPassword ? 'text' : 'password'" placeholdr="Repeat Password" label="Repeat Password" v-model="confirmPassword" :rules="[(v) => !!v || 'Password confirmation is required']" class="input-style" background="#F8F8FF" filled />
                                        </v-col>
                                    </v-row>
                                    <v-row class="px-6 pt-8">
                                        <v-col cols="12" sm="6" class="py-0">
                                            <v-file-input  accept="image/*" v-model="accountLogo" label="Upload Logo" filled class="input-style" background="#F8F8FF" @change="onFileChange"></v-file-input>
                                        </v-col>
                                        <v-col v-if="user.account_logo" cols="12" sm="6" class="py-0">
                                            <img height="60px" :src="user.account_logo" />
                                        </v-col>
                                    </v-row>
                                    <v-btn color="primary" @click="updateProfile()">Update Profile</v-btn>
                                </v-form>

                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>Manage Payment</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <div class="col-md-12">
                                    <div style="display:flex" class="flex acc-detail">
                                        <div>Current price</div>
                                        <v-spacer></v-spacer>
                                        <div class="font-bold text-xl mb-2">
                                            {{selectedProducted}}
                                        </div>
                                    </div>
                                    <div style="display:flex" class="flex acc-detail">
                                        <div class="text-xl text-gray-600">Credit card</div>
                                        <v-spacer></v-spacer>
                                        <span id="credit-card-last-four" class="font-bold text-xl text-gray-600">
                                            {{customerPaymentMethod}}
                                        </span>
                                    </div>
                                    <div style="display:flex" class="flex acc-detail">
                                        <div class="text-xl text-gray-600">Next payment date</div>
                                        <v-spacer></v-spacer>
                                        <span id="credit-card-last-four" class="font-bold text-xl text-gray-600">
                                            {{new Date(nextPaymentDate).toLocaleString().slice(0,10).replace(',', '') }}
                                        </span>
                                    </div>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-header>Change Plan</v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <v-btn v-if="isNewSelected != isOriginalBasic" color="primary" @click="updatePlan()">Update Plan</v-btn>
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
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                    <v-expansion-panels>
                                        <v-expansion-panel>
                                            <v-expansion-panel-header>Cancel Subscription</v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <v-btn color="primary" @click="cancelPlan()">Cancel Plan</v-btn>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    basic_key
} from "../../config";
import {
    pro_key
} from "../../config";
import Vue from 'vue';

export default {
    name: "ManageAccount",
    data: (vm) => ({
        dialog: false,
        user: {},
        valid: false,
        selectedProducted: "",
        customerPaymentMethod: "",
        isOriginalBasic: null,
        isNewSelected: null,
        nextPaymentDate: null,
        showPassword: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        products: [],
        nameRules: [
            (v) => !!v || "Full name required",
            (v) => v.length <= 20 || "Name must be less than 20 characters",
        ],
        number_Rules: [(v) => !!v || "Number of card required"],
        holder_Rules: [(v) => !!v || "Holder of card required"],
        emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        accountLogo: null,
        accountLogoSrc: null,
        accountLogoExtension: null,
    }),
    methods: {
        async getProducts() {
            let response = await this.$http.get(`/stripe/products`, {});
            this.products = response.data.data;
        },
        async updateProfile() {
            if (this.$refs.profileform.validate()) {
                if (this.password !== this.confirmPassword) {
                    Vue.notify({
                        group: 'app',
                        type: "error",
                        title: 'Error',
                        text: `Passwords don't match!`
                    });

                    return false;
                }
                let data = new FormData();
                if(this.accountLogo){
                    data.append('accountLogo', this.accountLogo);
                    data.append('accountLogoExtension', this.accountLogoExtension);
                }
                data.append('email', this.user.email);
                data.append('name', this.name);
                data.append('password', this.password);

                let response = await this.$http.post(`/update-user`, data).then((res) => {
                    if (res.status == 200)
                        this.$store.dispatch("alertsModule/turnOnAlert", {
                            type: "success",
                            message: "Your profile updated successfully!"
                        });
                    return res;
                });
            }
        },
        onchangepricing(product) {
            this.isNewSelected = product.price.id;
            this.products.map(x => x.selected = false);
            product.selected = true;
        },
        async updatePlan() {
            if (this.isNewSelected != this.isOriginalBasic) {
                let newPriceId = this.isNewSelected;
                //   if(this.isBasic){
                //     newPriceId = basic_key;
                //   }
                let response = await this.$http.post(`/stripe/update-subscription`, {
                    email: this.user.email,
                    subscriptionId: this.user.subscriptionId,
                    newPriceId: newPriceId
                }).then((res) => {
                    if (res.status == 200)
                        this.$store.dispatch("alertsModule/turnOnAlert", {
                            type: "success",
                            message: "Your subscription updated!"
                        });
                    return res;
                });
                this.dialog = false;
            }
        },
        async cancelPlan() {
            let response = await this.$http.post(`/stripe/cancel-subscription`, {
                subscriptionId: this.user.subscriptionId,
                email: this.user.email
            }).then((res) => {
                if (res.status == 200)
                    this.$store.dispatch("alertsModule/turnOnAlert", {
                        type: "success",
                        message: "You've cancel your subscription from Kalypso"
                    });
                return res;
            });
            this.dialog = false;
        },
        async openManage() {
            this.dialog = true;
            let res = await this.$http.get(`get-user`);
            this.user = res.data;
            if(this.user.account_logo){
                this.user.account_logo += `?t=${+new Date()}`;
            }
            this.name = this.user.name;
            this.email = this.user.email;
            if (this.user.password) {
                this.password = this.user.password;
                this.confirmPassword = this.user.password;
            }
            if (this.user.paymentEndDate) {
                this.nextPaymentDate = new Date(this.user.paymentEndDate * 1000);
            }
            await this.getProducts();
            await this.retriveSubscription();
            await this.retrivePaymentMethod();
        },
        async retriveSubscription() {
            let response = await this.$http.post(`/stripe/retrive-subscription`, {
                email: this.user.email,
            });
            if (response && response.data) {
                this.products.map(x => x.selected = false);
                this.isOriginalBasic = response.data.plan.id;
                this.isNewSelected = response.data.plan.id;
                let product = this.products.find(x => x.price.id == this.isOriginalBasic);
                product.selected = true;

                //   if(response.data.plan.id == basic_key){
                //     this.isBasic = true;
                //     this.isOriginalBasic = true;
                //     this.selectedProducted = "BASIC";
                //   }
                //   if(response.data.plan.id == pro_key){
                //     this.isBasic = false;
                //     this.isOriginalBasic = false;
                //     this.selectedProducted = "PRO";
                //   }
            }
        },
        async retrivePaymentMethod() {
            let response = await this.$http.post(`/stripe/retrieve-customer-payment-method`, {
                paymentMethodId: this.user.paymentMethodId,
            });

            this.customerPaymentMethod = response.data.card.brand + " ****" + response.data.card.last4;
        },
        async onFileChange(e) {
            if (!e)
                return;
            let vm = this;
            this.accountLogo = e;
            this.accountLogoExtension = e.name.split('.').pop().toLowerCase()
            var fr = new FileReader();
            fr.onload = function () {
                vm.user.account_logo = fr.result;
            }
            fr.readAsDataURL(e);
        },
    },
    components: {

    },

};
</script>

<style lang="scss" scoped>
.font-bold {
    font-weight: bold;
}

.acc-detail {
    padding: 5px;
}

.v-input--is-disabled {
    opacity: 0.7;
}
</style>
