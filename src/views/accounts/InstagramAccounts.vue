<template>
  <v-container v-loading="isAuthorizing">
    <div class="mb-12" color="white" height="350px">
      <h2
        class="card-name pt-12 text-center"
      >To create a high-level overview of how your brand campaign performed, we need to connect all possible social platforms</h2>

      <div class="connect-holder">
        <div class="d-flex align-center">
        <a :href="`${this.facebookUrl}`" class="connect-account">
          <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
            <div v-if="user.fb_access_token && user.chosen_instagram_account" style="flex-direction: row; display: flex;margin-bottom:5px;">
               <v-img style="width:35px;margin-bottom:0px" v-if="user.ig_detail && user.ig_detail.picture && user.ig_detail.picture.data" :src="user.ig_detail.picture.data.url" aspect-ratio="1">
               </v-img>
               <div style="margin: auto 5px;">{{user.ig_detail.name}}</div>
            </div>
            <div>
              <img src="@/assets/images/instagram.png" alt />
              <div>
                Connect Instagram
                Account
              </div>
            </div>
          </div>
        </a>
        <v-col sm="4">
          <v-select
                  :items="businessAccounts"
                  label="Choose Your Business Account"
                  dense
                  rounded
                  v-model="selectedAccount"
                  @change="setInstagramAccount"
                  item-value="id"
                  item-text="name"
                  append-icon="mdi-chevron-down"
                  outlined
          ></v-select>
        </v-col>
        </div>
       <!--
        <a class="connect-account">
          <div class="d-flex align-center justify-center text-center" style="height: 100%;">
            <div>
              <img width="55" src="@/assets/images/pinterest.png" alt />
              <div>
                Connect Pinterest
                Account - COMING SOON
              </div>
            </div>
          </div>
        </a> -->
        <a :disabled="isGoogleAuthorized" :href="googleAuthUrl" class="connect-account">
          <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
            <div v-if="user.google_ga_tokens && user.google_ga_tokens.length && user.google_detail" style="flex-direction: row; display: flex;margin-bottom:5px;">
               <v-img style="width:35px;margin-bottom:0px" v-if="user.google_detail && user.google_detail.picture" :src="user.google_detail.picture" aspect-ratio="1">
               </v-img>
               <div style="margin: auto 5px;">{{user.google_detail.name}}</div>
            </div>
            <div>
              <img width="35" src="@/assets/images/analytics.png" alt />
              <div>
                Connect Google
                Analytics
              </div>
            </div>
          </div>
        </a>
        <a :disabled="isGoogleAuthorized" :href="googleYoutubeAuthUrl" class="connect-account">
          <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
            <div v-if="user.google_tokens && user.google_tokens.length && user.google_detail" style="flex-direction: row; display: flex;margin-bottom:5px;">
               <v-img style="width:35px;margin-bottom:0px" v-if="user.google_detail && user.google_detail.picture" :src="user.google_detail.picture" aspect-ratio="1">
               </v-img>
               <div style="margin: auto 5px;">{{user.google_detail.name}}</div>
            </div>
            <div>
              <img width="35" src="@/assets/images/youtube.png" alt />
              <div>
                Connect YouTube
              </div>
              <div><br/></div>
            </div>
          </div>
        </a>
      </div>
    </div>



  </v-container>
</template>

<script>
export default {
  components: {},
  async created() {
      this.fetchFacebookUrl();
      //this.fetchInstagramUrl();
      await this.getBusinessAccounts();
      this.fetchGoogleUrl();
      this.fetchYoutubeUrl();
      await this.getUser();
    this.$store.dispatch("youtubeModule/gapiAuthInit");
  },
  methods: {
    async setInstagramAccount() {
      try {
        let response = await this.$http.post(
          `instagram/set-account/${this.selectedAccount}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: error.message,
        });
      }
    },
    async getBusinessAccounts() {
      try {
        let response = await this.$http.get(`instagram/accounts`);
        console.log(response);
        this.businessAccounts = response.data.data;      
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: "Something went wrong!",
        });
      }
    },
    async getUser() {
      try {
        console.log("get-user");
        let response = await this.$http.get(`get-user`);
        this.user = response.data;
        if(this.user && this.user.ig_detail){
          this.selectedAccount = this.user.ig_detail.id;

          this.$http
          .post(`https://graph.facebook.com/v8.0/${this.user.ig_detail.id}/subscribed_apps?subscribed_fields=feed&access_token=${this.user.ig_detail.access_token}`)
          .then((resp) => {

          })
          .catch((e)=>{

          });
         

        }
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: "Something went wrong!",
        });
      }
    },
    async fetchFacebookUrl() {
      try {
        let response = await this.$http.get(`get-facebook-url`);
        this.facebookUrl = response.data;
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: "Something went wrong!",
        });
      }
    },
     async fetchInstagramUrl() {
      try {
        let response = await this.$http.get(`get-instagram-url`);
        this.instagramUrl = response.data;
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: "Something went wrong!",
        });
      }
    },
    async fetchGoogleUrl() {
      try {
        let response = await this.$http.get(`get-google-ga-url`);
        this.googleAuthUrl = response.data;
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: "Something went wrong!",
        });
      }
    },
     async fetchYoutubeUrl() {
      try {
        let response = await this.$http.get(`get-google-yt-url`);
        this.googleYoutubeAuthUrl = response.data;
      } catch (error) {
        console.log(error);
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: "Something went wrong!",
        });
      }
    },

    authenticate() {
      return this.$store.dispatch("youtubeModule/gapiAuthenticate");
    },
    loadClient() {
      return this.$store.dispatch("youtubeModule/gapiLoadClient");
    },
    // Make sure the client is loaded and sign-in is complete before calling this method.
    execute() {
      return this.$store.dispatch("youtubeModule/gapiExecute");
    },

    getUploadedVideos() {
      return this.$store.dispatch("youtubeModule/getUploadedVideos");
    },
  },

  data: () => ({
    accounts: [],
    user: {},
    selectedAccount: null,
    businessAccounts: [],
    facebookUrl: "",
    instagramUrl: "",
    googleAuthUrl: "",
    googleYoutubeAuthUrl: ""
  }),

  computed: {
    isAuthorizing() {
      return this.$store.getters["youtubeModule/isAuthorizing"];
    },

    isGoogleAuthorized: function () {
      return this.$store.getters["authModule/isGoogleAuthorized"];
    },
    userId: function () {
      return this.$store.getters["authModule/userId"];
    },
  },
};
</script>
<style lang="scss" scoped>
.connect-holder {
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  padding-top: 60px;

  & .connect-account {
    border: 1px solid #e6e8f0;
    border-radius: 4px;
    margin: 20px 8px;
    width: 196px;
    display: block;
    height: 196px;
    color: #7982a3;
    padding: 0 20px;
    & img,
    .v-image {
      margin-bottom: 16px;
    }
  }
}
</style>
