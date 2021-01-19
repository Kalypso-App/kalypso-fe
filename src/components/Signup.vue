<template>
  <div class="register-page">
    <v-container>
      <v-card width="768" class="mx-auto">
        <div class="d-flex justify-start align-center">
          <v-list-item class="padding-logo">
            <v-list-item-avatar>
              <img :src="logo" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-bold project-name"
                >Kalypso</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-form v-model="valid" ref="form1">
          <v-row class="px-6 pt-8">
            <v-col cols="12" sm="12" class="py-0">
              <div class="card-name">Account Details</div>
              <v-divider class="divider-color"></v-divider>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                label="Full Name"
                v-model="name"
                :rules="nameRules"
                class="input-style"
                background="#F8F8FF"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                :rules="emailRules"
                v-model="email"
                label="Email Address"
                class="input-style"
                background="#F8F8FF"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                placeholdr="Password"
                label="Password"
                v-model="password"
                filled
                :rules="[(v) => !!v || 'Password is required']"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                class="input-style"
                background="#F8F8FF"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col cols="12" sm="6" class="py-0">
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                placeholdr="Repeat Password"
                label="Repeat Password"
                v-model="confirmPassword"
                :rules="[(v) => !!v || 'Password confirmation is required']"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                class="input-style"
                background="#F8F8FF"
                filled
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            </v-row>
        </v-form>
        <!-- <div class="separator">Or</div> -->
        <v-row class="mx-auto d-flex align-center justify-center">
          <div class="linking-btn"></div>
        </v-row>
        <Checkout ref="checkout" :isFromSignup="true" :email="email" :name="name" :checkout="checkout"/>
        <div class="pull-right pb-5 py-4">
          <v-btn @click="$router.push('/login')">
            <v-icon>mdi-arrow-left</v-icon>Back
          </v-btn>

          <v-btn color="primary" @click="signup">Confirm</v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>

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

import Logo from "@/assets/images/logo.png";
import Checkout from "@/components/Checkout";
import Stripe from "@/components/stripe/Stripe";
import Vue from 'vue';

export default {
  name: "Signup",
  components: {
    Checkout
  },
  data: () => ({
    // googleSignInParams: {
    //   client_id:
    //     "40778277127-961igbirua8rjhtmgv245ced5nf23nup.apps.googleusercontent.com",
    // },
    stripe: null,
    elements: null,
    card: null,
    showPassword: false,
    logo: Logo,
    name: "",
    e1: 1,
    email: "",
    checkout: false,
    password: "",
    confirmPassword: "",
    checkbox: false,
    valid: false,
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
  }),
  methods: {
    // purchase: async function(secret) {
    //   let self = this;
    //   try {
    //     let response = await self.stripe.confirmCardPayment(secret, {
    //       payment_method: {
    //         card: self.card,
    //         billing_details: {
    //           name: this.name,
    //         },
    //       },
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // getSecret: async function() {
    //   let self = this;
    //   let secret = "";

    //   try {
    //     let response = await self.$http.get("/stripe/secret");

    //     secret = response.data.client_secret;
    //     console.log(secret, response);
    //     return response.data.client_secret;
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
    validateStep1() {
      if (this.$refs.form1.validate()) {
        this.e1 = 2;
      }
    },
    onSignInSuccess(googleUser) {
      console.log(googleUser);
      // `googleUser` is  the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      console.log(profile);

      let name = profile.getName();
      let email = profile.getEmail();
      let password = profile.getId();
      let image = profile.getImageUrl();

      let url = "/google-login";
      this.$store
        .dispatch("authModule/signup", { name, email, password, url, image })
        .then(() => this.$router.push("/campaigns"))
        .catch((err) => {
          console.log("Google sign up/in error, ", err);
          this.$store.dispatch("alertsModule/turnOnAlert", {
            type: "error",
            message: err.error,
          });
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    signup: async function() {
   
      if (this.$refs.form1.validate()) {
        if (this.password !== this.confirmPassword) {
           Vue.notify({
            group: 'app',
            type: "error",
            title: 'Error',
            text: `Passwords don't match!`
          });

          return false;
        } 
        let iValidCard = this.$store.getters["checkoutModule/isValidCard"]

        if(!iValidCard){
          Vue.notify({
            group: 'app',
            type: "error",
            title: 'Error',
            text: `Please enter valid card details`
          });
          return false;
        }

          let data = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          this.$store
            .dispatch("authModule/signup", data)
            .then(async () => {
              this.checkout = true;
                Vue.notify({
                group: 'app',
                type: "success",
                title: 'Success',
                text: "Account Created! Please verify your email address first."
              });
            })
            .catch((err) => {
              console.log(err.message, err);
                Vue.notify({
                group: 'app',
                type: "error",
                title: 'Error',
                text:err.message
              });
              this.$store.dispatch("alertsModule/turnOnAlert", {
                type: "error",
                message: err.message,
              });
            });
        
      
      }
      else{
          Vue.notify({
            group: 'app',
            type: "error",
            title: 'Error',
            text: `Please enter all the details`
          });
      }
    },
  },
};
</script>
<style lang="scss">
/*.project-name {*/
/*font-size: 20px;*/
/*line-height: 25px;*/
/*color: #30364D;*/
/*font-family: 'Fira Sans', sans-serif;*/
/*word-break: break-word;*/
/*padding: 20px 0;*/
/*}*/

/*.padding-title {*/
/*padding: 20px 20px 0 20px;*/

/*& a {*/
/*text-decoration: none;*/
/*}*/
/*}*/

.v-card__actions > .v-btn.v-btn {
  width: 100%;
}

/*.reset-pass a {*/
/*text-decoration: none;*/
/*}*/

.v-card__actions {
  padding: 0 16px 16px 16px;
}

.reset-pass {
  padding-bottom: 20px;
}
.input-style {
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-top: 0;

  &:focus {
    outline: none;
  }
  & .v-input__slot {
    border-radius: 4px !important;
    box-shadow: inset 0px -1px 0px #7982a3;
    background: #f8f8ff !important;
    padding-left: 15px;

    &:before {
      border-color: transparent !important;
    }
    &:after {
      border-color: transparent !important;
    }
    & .primary--text {
      color: #bcc0cc !important;
    }
    & label {
      color: #7982a3;
    }
    & input {
      color: #30364d;
    }
  }
}

.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  border-radius: 4px;
}

::-webkit-input-placeholder {
  /* Edge */
  color: #7982a3;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #7982a3;
}

::placeholder {
  color: #7982a3;
}
.theme--light.v-stepper .v-stepper__step__step {
  font-family: " Fira Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
}

.theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background: #ededff !important;
  color: black;
}

.stepper-padding {
  margin: 0 16%;
}

.v-stepper__header {
  box-shadow: none;
}

.theme--light.v-stepper {
  background: transparent;
}

.v-stepper {
  box-shadow: none;
}

.v-stepper__step__step.primary {
  background-color: red !important;
  border-color: red !important;
}

.v-stepper__step__step {
  width: 40px !important;
  height: 40px !important;
}

.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: linear-gradient(327.48deg, #6a4ee1 0%, #b87df9 100%) !important;
  color: white !important;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 40px !important;
  border-radius: 32px;
  background: #ededff;
  color: #9165f7;
  margin-right: 24px;
}

.v-divider.divider-color {
  border-color: #f8f8ff;
}

.register-page {
  & hr {
    margin-bottom: 15px;
  }
  & .card-name {
    padding: 15px 0;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #30364d;
  }
}
.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #30364d;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #7982a3;
  margin: 0 23px;
}
.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e6e8f0;
}
.separator::before {
  margin-right: 0.25em;
}
.separator::after {
  margin-left: 0.25em;
}
.google-btn {
  background-color: white;
  cursor: pointer;
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  & img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    float: left;
  }
}
.linking-btn {
  width: fit-content;
  padding: 28px 8px;
  height: auto;

  & .btn,
  & .google-btn {
    width: inherit !important;
    background: #db5a3c;
    border-radius: 32px;
    padding: 10px 24px !important;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    & img {
      margin-right: 8px;
    }
  }
  & .fb.btn {
    background: #3b5998;
    border-radius: 32px;
    padding: 10px 24px !important;
    color: white;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    opacity: 1;
  }
}
.connect-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 124px;

  & .connect-account {
    border: 1px solid #e6e8f0;
    border-radius: 4px;
    width: 196px;
    height: 196px;
    margin: 0 8px;
    color: #7982a3;
    padding: 0 20px;
    & img {
      margin-bottom: 16px;
    }
  }
}
.pull-right {
  .v-btn__content {
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
}
@media only screen and (max-width: 768px) {
  .linking-btn {
    padding: 5px 8px;
    & .google-btn {
      margin-bottom: 20px !important;
    }
  }
}
.theme--light.v-stepper .v-stepper__step--complete .v-stepper__label,
.theme--light.v-stepper .v-stepper__label {
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #7982a3;
}
</style>
