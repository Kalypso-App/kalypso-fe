<template>
<v-container v-loading="isAuthorizing">
    <div class="mb-12" color="white" height="350px">
        <h2 class="card-name pt-12 text-center">To create a high-level overview of how your brand campaign performed, we need to connect your social media accounts. Please accept all permissions throughout each process, or Kalypso will be unable to read your data appropriately. We are directly partnered and verified by both Google and Facebook and exceed all security and privacy requirements. For step-by-step walkthroughs, <a target="_blank" href='https://intercom.help/kalypsoapp/en/collections/2557154-social-media-accounts-faq'> click here.</a></h2>

        <div class="row connect-holder">
            <div class="col-sm-12 col-md-6 d-flex align-center">
                <a :href="`${this.facebookUrl}`" class="connect-account">
                    <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
                        <v-icon v-if="user.fb_access_token && user.chosen_instagram_account && user.ig_detail" class="connect-check">mdi-checkbox-marked-circle</v-icon>
                        <div v-if="user.fb_access_token && user.chosen_instagram_account && user.ig_detail" style="flex-direction: row; display: flex;margin-bottom:5px;">
                            <v-img style="width:35px;margin-bottom:0px" v-if="user.ig_detail && user.ig_detail.profile" :src="user.ig_detail.profile.profile_picture_url" aspect-ratio="1">
                            </v-img>
                            <div style="margin: auto 5px;">{{user.ig_detail.profile ? user.ig_detail.profile.username : user.ig_detail.name}}</div>
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
                <v-col v-if="businessAccounts.length" sm="6">
                    <v-select :items="businessAccounts" label="Choose Your Business Account" dense rounded v-model="selectedAccount" @change="setInstagramAccount" item-value="id" item-text="name" append-icon="mdi-chevron-down" outlined></v-select>
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
            <a :disabled="isGoogleAuthorized" :href="googleAuthUrl" class="col-sm-12 col-md-3 connect-account">
                <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
                    <v-icon  v-if="user.google_ga_tokens && user.google_ga_tokens.length && user.google_ga_detail" class="connect-check">mdi-checkbox-marked-circle</v-icon>
 
                    <div v-if="user.google_ga_tokens && user.google_ga_tokens.length && user.google_ga_detail" style="flex-direction: row; display: flex;margin-bottom:5px;">
                        <v-img style="width:35px;margin-bottom:0px" v-if="user.google_ga_detail && user.google_ga_detail.picture" :src="user.google_ga_detail.picture" aspect-ratio="1">
                        </v-img>
                        <div style="margin: auto 5px;">{{user.google_ga_detail.name}}</div>
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
            <a :disabled="isGoogleAuthorized" :href="googleYoutubeAuthUrl" class="col-sm-12 col-md-3 connect-account">
                <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
                    <v-icon v-if="user.google_tokens && user.google_tokens.length && user.google_detail" class="connect-check">mdi-checkbox-marked-circle</v-icon>
 
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
                        <div><br /></div>
                    </div>
                </div>
            </a>
        </div>
        <div class="connect-holder d-flex align-center justify-start text-center">
            <a :href="`${this.facebookPageUrl}`" class="connect-account">
                <div class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
                    <v-icon v-if="user.fb_access_token && user.fb_detail" class="connect-check">mdi-checkbox-marked-circle</v-icon>
 
                    <div v-if="user.fb_access_token && user.fb_detail" style="flex-direction: row; display: flex;margin-bottom:5px;">
                        <v-img style="width:35px;margin-bottom:0px" v-if="user.fb_detail && user.fb_detail.picture && user.fb_detail.picture.data" :src="user.fb_detail.picture.data.url" aspect-ratio="1">
                        </v-img>
                        <div style="margin: auto 5px;">{{user.fb_detail.name}}</div>
                    </div>
                    <div>
                        <img style="height:24px;padding-left:10px;" src="@/assets/images/facebook-logo.png" alt />
                        <div>
                            Connect Facebook
                            Account
                        </div>
                    </div>
                </div>
            </a>
            <v-col v-if="businessAccountsPage.length" sm="3">
                <v-select :items="businessAccountsPage" label="Choose Your Facebook Page" dense rounded v-model="selectedAccountPage" @change="setFacebookAccount" item-value="id" item-text="name" append-icon="mdi-chevron-down" outlined></v-select>
            </v-col>
            <a class="connect-account">
                <div @click="onSetTiktokUser" class="d-flex align-center justify-center text-center" style="height: 100%;flex-direction:column">
                    <v-icon v-if="user.tiktok_detail && user.tiktok_detail.user" class="connect-check">mdi-checkbox-marked-circle</v-icon>
 
                    <div v-if="user.tiktok_detail" style="flex-direction: row; display: flex;margin-bottom:5px;">
                        <v-img style="width:35px;margin-bottom:0px" v-if="user.tiktok_detail && user.tiktok_detail.user && user.tiktok_detail.user.avatarThumb" :src="user.tiktok_detail.user.avatarThumb" aspect-ratio="1">
                        </v-img>
                        <div v-if="user.tiktok_detail.user && user.tiktok_detail.user.nickname" style="margin: auto 5px;">{{user.tiktok_detail.user.nickname}}</div>
                    </div>
                    <div>
                        <img width="35" src="@/assets/images/TikTok-Logo.png" alt />
                        <div>
                            Connect TikTok
                        </div>
                        <div><br /></div>
                    </div>
                </div>
            </a>
            <v-col sm="3">
                <div>
                    <v-text-field v-model="tiktokName" label="Enter TikTok User Name" filled class="input-style" background="#F8F8FF"></v-text-field>
                </div>
            </v-col>
        </div>

    </div>

</v-container>
</template>

<script>
export default {
    components: {},
    async created() {
        this.fetchFacebookUrl();
        this.fetchFacebookPageUrl();
        //this.fetchInstagramUrl();
        await this.getBusinessAccounts();
        await this.getBusinessAccountsFacebook();
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
        async setFacebookAccount() {
            try {
                let response = await this.$http.post(
                    `instagram/set-facebook-account/${this.selectedAccountPage}`
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
        async getBusinessAccountsFacebook() {
            try {
                let response = await this.$http.get(`instagram/facebook-accounts`);
                this.businessAccountsPage = response.data.data;
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
                if (this.user && this.user.ig_detail) {
                    this.selectedAccount = this.user.ig_detail.id;

                    this.$http
                        .post(`https://graph.facebook.com/v8.0/${this.user.ig_detail.id}/subscribed_apps?subscribed_fields=feed&access_token=${this.user.ig_detail.access_token}`)
                        .then((resp) => {

                        })
                        .catch((e) => {

                        });

                }
                if (this.user && this.user.fb_detail) {
                    this.selectedAccountPage = this.user.fb_detail.id;
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
        async fetchFacebookPageUrl() {
            try {
                let response = await this.$http.get(`get-facebook-page-url`);
                this.facebookPageUrl = response.data;
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
        async onSetTiktokUser() {
            try {
                let response = await this.$http.get(`tiktok/user/${this.tiktokName}`);
                if (response && response.data) {
                    let response = await this.$http.get(`get-user`);
                    this.user = response.data;
                }
            } catch (error) {
                console.log(error);
                this.$store.dispatch("alertsModule/turnOnAlert", {
                    type: "error",
                    message: "Something went wrong!",
                });
            }
        },
        /*
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
        */
    },

    data: () => ({
        accounts: [],
        user: {},
        selectedAccount: null,
        businessAccounts: [],
        businessAccountsPage: [],
        selectedAccountPage: null,
        facebookUrl: "",
        instagramUrl: "",
        googleAuthUrl: "",
        googleYoutubeAuthUrl: "",
        tiktokName: "",
        facebookPageUrl: ""
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
    justify-content: flex-start;
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
        max-width: 200px;

        & img,
        .v-image {
            margin-bottom: 16px;
        }
    }

    .connect-check{
        color: green;
        align-self: flex-end;
        font-size: 16px;
    }
}
</style>
