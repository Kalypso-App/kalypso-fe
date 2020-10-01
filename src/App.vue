<template>
<v-app v-loading="isLoading">
    <notifications group="app" />
    <navigation :drawer="drawer" v-on:onDrawerChange="onDrawerChange" v-if="isLoggedIn" />
    <v-content class="main-bg-color">
        <alerts />
        <div class="modal-mask">
            <v-dialog persistent v-model="isPaymentRequired" scrollable width="unset" min-width="448px" max-width="948px">
                <v-card style="min-width:940px" class="modal-padding">
                    <div style="display: flex;padding: 5px;">
                        <h5 style="flex-grow: 1;padding:5px 25px"> * Please add payment method to continue use Kalypso.
                        </h5>
                        <v-btn width="100" color="primary" @click="logout">
                            Logout</v-btn>
                    </div>
                    <Checkout ref="checkout" :isFromSignup="false" :email="getEmail" :checkout="checkout" v-on:subscriptionCompleted="subscriptionCompleted" />
                </v-card>
            </v-dialog>
        </div>
        <horizontal-navigation :drawer="drawer" v-on:onDrawerChange="onDrawerChange" v-if="isLoggedIn" />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>
    </v-content>
</v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import HorizontalNavigation from "@/components/HorizontalNavigation";
import Alerts from "@/components/Alerts";
import "./assets/css/main.css";
import {
    FbAppId
} from "../src/config";
import Vue from 'vue';
import Checkout from "@/components/Checkout";

export default {
    components: {
        HorizontalNavigation,
        Navigation,
        Alerts,
        Checkout
    },
    data: (vm) => ({
        paymentDialog: false,
        email: "",
        checkout: false,
        drawer: true
    }),
    computed: {
        isLoading: function () {
            return this.$store.getters["loadingModule/isLoading"];
        },
        isLoggedIn: function () {
            let name = this.$store.getters["authModule/user_name"];
            let email = this.$store.getters["authModule/user_email"];
            if (name && email) {
                window.Intercom("boot", {
                    app_id: "debh4qt6",
                    name: name, // Full name
                    email: email, // Email address             
                });
            } else {
                window.Intercom("boot", {
                    app_id: "debh4qt6"
                });
            }

            let vm = this;
            if (vm.$route.name === "Signup" ||
                vm.$route.name === "Login" ||
                vm.$route.name === "Forget" ||
                vm.$route.name === "Reset") {
                return false;
            }
            return this.$store.getters["authModule/isLoggedIn"];
        },
        getEmail: function () {
            return this.$store.getters["authModule/user_email"];
        },
        isPaymentRequired: function () {
            let vm = this;
            if (vm.$route.name === "Signup" ||
                vm.$route.name === "Login" ||
                vm.$route.name === "Forget" ||
                vm.$route.name === "Reset" ||
                vm.$route.name === "share-campaign") {
                return false;
            }

            let paymentEndDate = this.$store.getters["authModule/paymentEndDate"];
            if (paymentEndDate && paymentEndDate * 1000 > new Date().getTime()) {
                return false;
            }
            if (paymentEndDate && paymentEndDate * 1000 <= new Date().getTime()) {
                //return false; 
            }
            return true;

        }
    },

    created: async function () {
        document.title = "Kalypso - Brand Deal Reporting for Influencers";
        await this.loadFacebookSDK(document, "script", "facebook-jssdk");
        await this.initFacebook();
        this.updatePaymentEndDate();
        const vm = this;

        vm.$http.interceptors.response.use(
            (response) => {
                this.$store.dispatch("loadingModule/setLoading", false);
                return response;
            },
            (err) => {
                this.$store.dispatch("loadingModule/setLoading", false);
                let isAuthRoute =
                    vm.$route.name === "Signup" ||
                    vm.$route.name === "Login" ||
                    vm.$route.name === "Forget" ||
                    vm.$route.name === "Reset";
                console.log("is route", isAuthRoute);
                if (err.status && err.response) {
                    if (!isAuthRoute) {
                        const responseData = err.response.data;
                        const responseStatus = err.response.status;
                        console.log(err, responseStatus);
                        return new Promise((resolve, reject) => {
                            if (responseStatus === 401 && !isAuthRoute) {
                                this.logout();
                            } else {
                                reject(err.response.data);
                            }
                        });
                    } else {
                        return new Promise((resolve, reject) => {
                            reject(err.response.data);
                        });
                    }
                } else if (err.response && err.response.status) {
                    if (!isAuthRoute && err.response.status == 401) {
                        this.logout();
                    }
                    return new Promise((resolve, reject) => {
                        reject({
                            message: err.response.data.error,
                        });
                    });
                } else {
                    return new Promise((resolve, reject) => {
                        reject({
                            message: "Something went wrong",
                        });
                    });
                }
            }
        );
    },

    methods: {
        async updatePaymentEndDate() {
            let paymentEndDate = this.$store.getters["authModule/paymentEndDate"];
            if (paymentEndDate && paymentEndDate * 1000 <= new Date().getTime()) {
                let response = await this.$http.get(`get-user`);
                if (response && response.data) {
                    this.$store.dispatch("authModule/setPaymentEndDate", response.data.paymentEndDate);
                    localStorage.setItem("paymentEndDate", response.data.paymentEndDate);
                    this.isPaymentRequired;
                }
            }
        },
        async subscriptionCompleted(subscription) {
            let response = await this.$http.get(`get-user`);
            if (response && response.data) {
                //commit("set_paymentEndDate", response.data.paymentEndDate);
                this.$store.dispatch("authModule/setPaymentEndDate", response.data.paymentEndDate);
                localStorage.setItem("paymentEndDate", response.data.paymentEndDate);
                console.log(this.isPaymentRequired);
                this.isPaymentRequired;

            }
        },
        async initFacebook() {
            window.fbAsyncInit = function () {
                window.FB.init({
                    appId: FbAppId, //You will need to change this
                    cookie: true, // This is important, it's not enabled by default
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v6.0'
                });
            };
        },
        async loadFacebookSDK(d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        },
        logout: function () {
            this.$store
                .dispatch("authModule/logout")
                .then((ee) => {
                    this.$router.push("/login");
                    setTimeout(() => {
                        window.location.reload();
                    }, 300)
                })
                .catch((error) => {
                    console.warn(error);
                });
        },
        onDrawerChange: function(){
            this.drawer = !this.drawer;
        }
    },
};
</script>

<style lang="scss">
.main-bg-color {
    background-color: #F4F7FC;
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.vue-notification {
    font-size: 14px !important;
}

.v-application--is-ltr .v-list--shaped .v-list-item,
.v-application--is-ltr .v-list--shaped .v-list-item::before,
.v-application--is-ltr .v-list--shaped .v-list-item>.v-ripple__container {
    border-bottom-right-radius: 10px !important;
    border-top-right-radius: 10px !important;
}

.v-navigation-drawer__border {
    background-color: #fff !important;
}

.instagram-content-stats {
    .theme--light.v-icon {
        color: #97A0C3 !important;
    }
}

.v-tooltip__content {
    border: 1px solid #EAEDF7 !important;
    background: #FFFFFF !important;
    border-radius: 8px !important;
    padding: 10px 10px !important;
}
</style>
