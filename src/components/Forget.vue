<template>
  <v-card width="400" class="mx-auto my-4">
    <div class="text-center padding-title login">
      <img width="24" height="24" src="@/assets/images/logo.png" />
      <h5 class="project-name">Reset your password</h5>
      <p>
        Don't have an account yet?
        <br />
        <router-link to="/signup">Sign up here instead.</router-link>
      </p>
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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="sendForget" color="info">Send</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import FBLoginButton from "@/components/FBLoginButton";
import { fbMixin } from "../mixins/fbMixin";

export default {
  name: "Login",
  mixins: [fbMixin],
  components: {},

  methods: {
    async sendForget() {
      try {
        let response = await this.$http.post(`/forgot-password`, {
          email: this.email
        });
        if(response){
          this.$store.dispatch("alertsModule/turnOnAlert", {
            type: "success",
            message: "Please check your inbox(spam too!)"
          });
        }
      } catch (error) {
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: error.message
        });
      }
    }
  },
  data: () => ({
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],

    showPassword: false,
    justify: ["center"],
    email: "",
    password: ""
  })
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