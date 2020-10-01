import { FbAppId } from "../config";

export const fbMixin = {
  created() {
    console.log("MIXIN THIS", this);
    //await this.loadFacebookSDK(document, "script", "facebook-jssdk");
    //await this.initFacebook();
  },

  methods: {
    logInWithFacebook: async function() {
      
      console.log(this, window.FB);
      window.FB.login(
        async (response) => {
          let realResponse = response.authResponse;
          console.log(realResponse);
          if (realResponse) {
            window.appVue.$store
              .dispatch("authModule/fbLogin", {
                access_token: realResponse.accessToken,
              })
              .then(() => {
                window.appVue.$router.push("/campaigns");
              })
              .catch((err) => {
                window.appVue.$store.dispatch("alertsModule/turnOnAlert", {
                  type: "error",
                  message: err.message,
                });
              });

            console.log(response);
          } else {
            alert("User cancelled login or did not fully authorize.");
          }
        },
        {
          scope:
            "email,public_profile, instagram_basic, instagram_manage_insights, pages_show_list, pages_manage_metadata", // comma seperated string
        }
      );
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: FbAppId, //You will need to change this
          cookie: true, // This is important, it's not enabled by default
          version: "v6.0",
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
  },
};
