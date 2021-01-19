<template>
  <v-card width="400" class="mx-auto my-4">
    <div class="text-center padding-title login">
      <img width="24" height="24" src="@/assets/images/logo.png" />
      <h5 class="project-name">Sign in</h5>
      <p>
        Don't have an account yet?
        <br />
        <router-link to="/signup">Sign up here instead.</router-link>
      </p>
      <div class="linking-btn mx-auto py-0 px-0">
        <!-- <f-b-login-button title="Login with Facebook"></f-b-login-button> -->
        <!-- <g-signin-button
                    class="google-btn"
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                <img src="@/assets/images/google.svg" alt="">
                Continue with Google
        </g-signin-button>-->
      </div>

      <p class="mt-4">or sign in using email</p>
    </div>
    <v-card-text class="pb-0">
      <v-form ref="form">
        <v-text-field
          label="Email Address"
          v-model="email"
          :rules="emailRules"
          placeholder="Email Address"
          solo
        ></v-text-field>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          solo
          :rules="[v => !!v || 'Password is required']"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword=!showPassword"
          v-on:keyup.enter="onEnter"
        />
         <v-card-actions>
      <v-btn @click="login" color="info">Sign In</v-btn>
    </v-card-actions>
      </v-form>
    </v-card-text>
    <v-card-actions>
        <FB-login-button :title="'Login with Facebook'" />
    </v-card-actions>
    <div class="text-center reset-pass">
      <div>Forgot your password?</div>
      <router-link to="/forget">Reset it here.</router-link>
    </div>
  </v-card>
</template>

<script>
import FBLoginButton from "@/components/FBLoginButton";
import { fbMixin } from "../mixins/fbMixin";
import Vue from 'vue';

export default {
  name: "Login",
  mixins: [fbMixin],
  components: {
    FBLoginButton,
  },

  methods: {
    onEnter: function(){
      this.login();
    },
    login: function () {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        let email = this.email;
        let password = this.password;
        this.$store
          .dispatch("authModule/login", { email, password })
          .then(async (response) => {
            this.isLoading = false;
            this.$router.push("/campaigns");
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
            this.$store.dispatch("alertsModule/turnOnAlert", {
              type: "error",
              message: err.message ? err.message : "Invalid Credentials",
            });
             Vue.notify({
              group: 'app',
              type: "error",
              title: 'Error',
              duration: 400000,
              text: err.message ? err.message : "Invalid Credentials"
            });
          });
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
          this.$store.dispatch("alertsModule/turnOnAlert", {
            type: "error",
            message: err.message,
          });
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
  },
  data: () => ({
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    // googleSignInParams: {
    //   client_id:
    //     "40778277127-961igbirua8rjhtmgv245ced5nf23nup.apps.googleusercontent.com",
    // },
    showPassword: false,
    justify: ["center"],
    email: "",
    password: "",
    isLoading: false
  }),
};
</script>

<style lang="scss" >
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

.project-name {
  font-size: 20px;
  line-height: 25px;
  color: #30364d;
  font-family: "Fira Sans", sans-serif;
  word-break: break-word;
  padding: 20px 0;
}

.padding-title {
  padding: 20px 16px 0 16px;

  & a {
    text-decoration: none;
  }
  & h6 {
    padding: 15px 0 0 0;
    font-size: 12px;
  }
}

.v-card__actions > .v-btn.v-btn {
  width: 100%;
}

.reset-pass a {
  text-decoration: none;
}

.v-card__actions {
  padding: 0 16px 16px 16px;
}

.reset-pass {
  padding-bottom: 20px;
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
.linking-btn button.fb.btn {
  width: 100% !important;
}
</style>