<template>
<div>
    <h3 class="page-name"></h3>
    <div class="inline">
        <img class="homeicon" @click="$router.push('/campaigns')" src="@/assets/images/home.svg" alt />
        <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
        <v-breadcrumbs :items="items">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :href="item.href" class="active-link" :disabled="item.disabled">
                    <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
                <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
    </div>
    <v-container>
        <v-stepper class="stepper-padding" v-model="e1">
            <v-stepper-header>
                <v-stepper-step color="#9165F7" :complete="e1 > 1" step="1">Campaign Details</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step color="#9165F7" :complete="e1 > 2" step="2">Campaign Content</v-stepper-step>

                <!-- <v-divider></v-divider> -->

                <!-- <v-stepper-step color="#9165F7" step="3">Documentation</v-stepper-step> -->
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-12" color="white" height="350px">
                        <div class="card-name">Main Info</div>
                        <v-divider class="divider-color"></v-divider>
                        <v-form ref="form1">
                            <v-row class="px-6 pt-8">
                                <v-col cols="12" sm="6" class="py-0">
                                    <v-text-field v-model="campaignName" label="Campaign name (ex: Deoderant Launch)" :rules="[(v) => !!v || 'Campaign Name is required']" filled class="input-style" background="#F8F8FF"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="py-0">
                                    <v-text-field v-model="brandName" :rules="[(v) => !!v || 'Brand name is required']" label="Brand name (ex: Kopari)" filled class="input-style" background="#F8F8FF"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="picker">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="dateFormatted" label="Published Date" class="input-style" append-icon="mdi-calendar-blank-outline" @blur="date = parseDate(dateFormatted)" v-on="on" v-on:click:append="menu=true"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title>
                                            <v-spacer></v-spacer>
                                            <v-btn width="auto" text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn width="auto" text color="primary" @click="$refs.menu.save(dateFormatted)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6" class="py-0">
                                    <v-text-field prepend-inner-icon="mdi-currency-usd" v-model="amount" type="number" label="Budget" :rules="[(v) => !!v || 'Budget is required']" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="py-0">
                                    <v-file-input v-model="logo" label="Campaign logo" filled class="input-style" background="#F8F8FF" @change="onFileChange"></v-file-input>
                                </v-col>
                                <v-col cols="12" sm="6" class="py-0">
                                    <img class="logo-img" ref="logoImg" src="" alt />
                                </v-col>
                            </v-row>
                        </v-form>

                        <div class="pull-right py-4">
                            <v-btn @click="$router.push('/campaigns')" text>Cancel</v-btn>
                            <v-btn color="primary" @click="validateStep1">Confirm</v-btn>
                        </div>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <div class="mb-12" color="white" height="350px">
                        <v-row>
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="dialog" scrollable max-width="448px">
                                        <template v-slot:activator="{}">
                                            <v-btn @click="openInstagramPostsDialog" class="modal-btn">
                                                <img src="@/assets/images/instagram.png" alt />
                                                Add Instagram
                                                <br />Post
                                                <div v-if="selectedPosts.length" class="no-of-posts">
                                                    <span>{{selectedPosts.length}}</span>
                                                </div>
                                            </v-btn>

                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select Instagram Post</h1>
                                                    <p>
                                                        Select one or more posts you delivered
                                                        <br />for this campaign.
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedPosts.length }}
                                                        {{ selectedPosts > 0 ? "Selected" : "Add" }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text v-loading="dashboardLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(post, i) in posts" @click="togglePost(i)" :key="i" class="d-flex child-flex" cols="4">
                                                        <v-card flat tile class="d-flex" :class="post.is_selected ? 'selected-post' : ''">
                                                            <video aspect-ratio="1" controls class="v-responsive ma-0" align="center" justify="center" v-if="isVideo(post.media_url)">
                                                                <source :src="post.media_url" type="video/mp4">
                                                            </video>
                                                            <v-img v-else :src="post.media_url" aspect-ratio="1">
                                                                <template v-slot:placeholder>
                                                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                    </v-row>
                                                                </template>
                                                            </v-img>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-icon v-bind:style="this.postsCursor.paging && this.postsCursor.paging.previous ? 'color:#8f8f8f': 'color:#cdcdcd' " @click="getIgFeedLeft()" >mdi-arrow-left</v-icon>
                                                <v-spacer></v-spacer>
                                                <v-icon  v-bind:style="this.postsCursor.paging && this.postsCursor.paging.next ? 'color:#8f8f8f': 'color:#cdcdcd' " @click="getIgFeedRight()" >mdi-arrow-right</v-icon>
                                            </v-card-actions>
                                        </v-card>

                                    </v-dialog>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="dialog2" scrollable max-width="448px">
                                        <template v-slot:activator="{  }">
                                            <v-btn @click="openInstagramStoriesDialog" class="modal-btn">
                                                <img src="@/assets/images/instagram.png" alt />
                                                Add Instagram
                                                <br />Story
                                                <div v-if="selectedStories.length" class="no-of-posts">
                                                    <span>{{selectedStories.length}}</span>
                                                </div>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select Instagram Story</h1>
                                                    <p>
                                                        Select one or more stories that you want to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div @click="dialog2=false" style="cursor:pointer" class="add-btn">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedStories.length }}
                                                        {{
                              selectedStories.length > 0 ? "Selected" : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text v-loading="dashboardLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(story, i) in stories" @click="toggleStory(i)" :key="i" class="d-flex child-flex" cols="4">
                                                        <v-card flat tile class="d-flex" :class="
                                  story.is_selected ? 'selected-post' : ''
                                ">
                                                            <video v-if="isVideo(story.media_url)" aspect-ratio="1" controls class="v-responsive ma-0" align="center" justify="center">
                                                                <source :src="story.media_url" type="video/mp4">
                                                            </video>
                                                            <v-img v-else :src="story.media_url" aspect-ratio="1">
                                                                <template v-slot:placeholder>
                                                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                    </v-row>
                                                                </template>
                                                            </v-img>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="dialog3" scrollable max-width="448px">
                                        <template v-slot:activator="{}">
                                            <v-btn @click="openYoutubeDialog" class="modal-btn">
                                                <img src="@/assets/images/youtube.png" alt />
                                                Add YouTube
                                                <br />Video
                                                <div v-if="selectedYtVideos.length" class="no-of-posts">
                                                    <span>{{selectedYtVideos.length}}</span>
                                                </div>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select YouTube Video</h1>
                                                    <p>
                                                        Select one or more videos that you want to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog3=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedYtVideos.length }}
                                                        {{
                              selectedYtVideos.length > 0 ? "Selected" : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-select :items="ytChannels" label="Choose YouTube Channel" dense @change="getYoutubeVideos" rounded v-model="selectedYtChannel" item-value="contentDetails.relatedPlaylists.uploads" item-text="snippet.title" append-icon="mdi-chevron-down" outlined></v-select>
                                            <v-select v-if="false" :items="ytPlaylists" label="Choose YouTube Playlist" :disabled="playlistsLoading" :loading="playlistsLoading" dense @change="getYoutubeVideos" rounded v-model="selectedYtPlaylist" item-value="id" item-text="snippet.title" append-icon="mdi-chevron-down" outlined></v-select>
                                            <v-card-text v-loading="ytVideosLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(video, i) in yt_videos" @click="toggleVideo(i)" :key="i" class cols="6">
                                                        <v-card flat tile class="videos" :class="
                                  video.is_selected ? 'selected-post' : ''
                                ">
                                                            <img v-if="
                                    video.snippet &&
                                      video.snippet.thumbnails &&
                                      video.snippet.thumbnails.default
                                  " :src="video.snippet.thumbnails.default.url" />
                                                        </v-card>
                                                        <div :class="
                                  video.is_selected ? 'selected-video' : ''
                                " class="video-title">{{ video.snippet.title }}</div>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-col>
                            <!--
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="dialog4" scrollable max-width="448px">
                                        <template v-slot:activator="{ on }">
                                            <v-btn class="modal-btn" v-on="on">
                                                <img src="@/assets/images/pinterest.svg" alt />
                                                <p>
                                                    Select one
                                                    <br />or more pins
                                                </p>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select Pinterest</h1>
                                                    <p>
                                                        Select one or more pinterest that you want to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog4=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedBlogPosts.length }}
                                                        {{
                              selectedBlogPosts.length > 0
                              ? "Selected"
                              : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text style="height: 592px;">
                                                <v-row>
                                                    <v-col class cols="6"></v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-col>
                            -->
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="dialog5" scrollable max-width="448px">
                                        <template v-slot:activator="{  }">
                                            <v-btn @click="openBlogsDialog" class="modal-btn">
                                                <img src="@/assets/images/google.svg" alt />
                                                <p>
                                                    Select one or
                                                    <br />more blog posts
                                                </p>
                                                <div v-if="selectedBlogPosts.length" class="no-of-posts">
                                                    <span>{{selectedBlogPosts.length}}</span>
                                                </div>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select one or more blog posts</h1>
                                                    <p>
                                                        Select one or more google analytics that you want
                                                        to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog5=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedBlogPosts.length }}
                                                        {{
                              selectedBlogPosts.length > 0
                              ? "Selected"
                              : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-select :items="googleViews" label="Choose Google View" dense @change="getStatistics" rounded v-model="selectedGoogleView" item-value="id" item-text="websiteUrl" append-icon="mdi-chevron-down" outlined></v-select>
                                            <v-card-text v-loading="blogdashboardLoading" style="height: 592px;">
                                                <v-row v-if="blogPages.data">
                                                    <v-text-field class="input-search px-4" v-model="searchBlogText" placeholder="Search" append-icon="mdi-magnify" @click:append="searchBlogs" v-on:keyup.enter="searchBlogs" hide-details single-line></v-text-field>
                                                    <v-col v-for="(post, i) in blog_pages" @click="toggleBlogPost(i)" :key="i" class cols="6">
                                                        <v-card :title="post['insights']['ga:pageTitle']" flat tile class="d-flex blog_post" :class="post.is_selected ? 'selected-post' : ''">
                                                            <span>{{ post["insights"]["ga:pagePath"] }}</span>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="pull-right py-4">
                        <v-btn @click="e1 = 1" text>
                            <v-icon>mdi-arrow-left</v-icon>Back
                        </v-btn>
                        <v-btn color="primary" @click="createCampaign">Confirm</v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</div>
</template>

<script>
import {
    FbAppId
} from "../../config";

export default {
    name: "CreateCampaign",
    components: {},
    props: {
        isEdit: Boolean,
    },
    data: (vm) => ({
        warning: false,
        warningMessage: false,
        ytChannels: [],
        yt_videos: [],
        ytPlaylists: [],
        selectedYtPlaylist: null,
        playlistsLoading: null,
        selectedYtChannel: null,
        ytVideosLoading: false,
        e1: 1,
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu: false,
        modal: false,
        menu2: false,
        first: "",
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        amount: 0,
        campaignName: "",
        brandName: "",
        images: [],
        posts: [],
        postsCursor: [],
        stories: [],
        brand_logo: null,
        googleViews: [],
        blogPages: [],
        blog_pages: [],
        selectedGoogleView: null,
        user: {},
        dashboardLoading: true,
        blogdashboardLoading: false,
        logo: null,
        logoSrc: null,
        searchBlogText: "",
        items: [{
                text: "Campaigns",
            },
            {
                text: "New Campaign",
            },
        ],
    }),
    async created() {
        if (this.isEdit) {
            this.items = [{
                    text: "Campaigns",
                },
                {
                    text: "Edit Campaign",
                }
            ];
        }
        if (this.$route.params.id) {
            await this.getCampaign(this.$route.params.id)
        }
        this.getUser();
        //.then(this.getYtChannels);
    },
    methods: {
        isVideo(filename) {
            return /\.mp4/.test(filename)
        },
        onFileChange(e) {
            let vm = this;
            var fr = new FileReader();
            fr.onload = function () {
                vm.$refs.logoImg.src = fr.result;
                vm.logoSrc = fr.result;
            }
            fr.readAsDataURL(e);
            console.log(e.name);
        },
        async getCampaign(id) {
            let vm = this;
            await this.$store.dispatch("campaignsModule/fetchCampaign", id);
        },
        async setEditCampaign() {
            console.log("set edit = " + this.campaign.name);
            this.campaignName = this.campaign.name;
            this.brandName = this.campaign.brand_name;
            this.date = new Date(this.campaign.due_date).toISOString().substr(0, 10);
            this.amount = this.campaign.amount;
            this.$refs.logoImg.src = this.campaign.brand_logo;
            this.logoSrc = this.campaign.brand_logo;
            this.posts = this.campaign.posts;
            this.stories = this.campaign.stories;
            this.yt_videos = this.campaign.yt_videos;
            this.blog_pages = this.campaign.blog_pages;

        },
        getCampaignImage() {
            if (this.logoSrc) {
                return this.logoSrc;
            }
            if (
                this.selectedYtVideos.length &&
                this.selectedYtVideos[0] &&
                this.selectedYtVideos[0].snippet
            ) {
                let snippet = this.selectedYtVideos[0].snippet;
                let image = snippet.thumbnails.default.url;
                return image;
            } else if (this.selectedPosts.length) {
                return this.selectedPosts[0].media_url;
            } else {
                return null;
            }
        },
        async getUser() {
            try {
                let response = await this.$http.get(`get-user`);
                this.user = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        openInstagramPostsDialog() {
            if (!this.user.fb_access_token) {
                this.warning = "true";
                this.warningMessage =
                    "Please complete your Instagram Authorization on Social Accounts page.";
                return;
            }
            this.dialog = true;
            this.initAndFetchInstagramStuff();
        },
        openBlogsDialog() {
            if (
                !(
                    this.user.google_ga_tokens &&
                    this.user.google_ga_tokens[0] &&
                    this.user.google_ga_tokens[0].access_token
                )
            ) {
                this.warning = "true";
                this.warningMessage =
                    "Please complete your Google Authorization on Social Accounts page";
                return;
            }
            this.getBlogs();

            this.dialog5 = true;
        },
        openInstagramStoriesDialog() {
            if (!this.user.fb_access_token) {
                this.warning = "true";
                this.warningMessage =
                    "Please complete your Instagram Authorization on Social Accounts page.";
                return;
            }
            this.dialog2 = true;
            this.initAndFetchInstagramStuff();
        },
        openYoutubeDialog() {
            if (
                !(
                    this.user.google_tokens &&
                    this.user.google_tokens[0] &&
                    this.user.google_tokens[0].access_token
                )
            ) {
                this.warning = "true";
                this.warningMessage =
                    "Please complete your Google Authorization on Social Accounts page";
                return;
            }
            this.dialog3 = true;
            this.getYtChannels();
        },
        async getYoutubeVideos() {
            try {
                let me = this;
                this.ytVideosLoading = true;
                let ytVideosResponse = await this.$http.get(
                    `/auth/get-ytvideos/${this.user._id}/${this.selectedYtChannel}`
                );
                if (ytVideosResponse.data.data && ytVideosResponse.data.data.items) {
                    ytVideosResponse.data.data.items.forEach((item) => {
                        item.is_selected = false;
                        if (me.isEdit && me.campaign) {
                            let isSelected = me.campaign.yt_videos.findIndex(x => x.id == item.id);
                            if (isSelected != -1) {
                                item.is_selected = true;
                            }
                        }
                    });
                    this.yt_videos = ytVideosResponse.data.data.items;
                }
                this.ytVideosLoading = false;
            } catch (e) {
                console.error(e);
            }
        },
        async getYoutubePlaylists() {
            this.playlistsLoading = true;
            try {
                let playlistResponse = await this.$http.get(
                    `/auth/get-ytchannels/${this.user._id}/${this.selectedYtChannel}`
                );
                this.ytPlaylists = playlistResponse.data.data.items;
            } catch (e) {
                console.error(e);
            } finally {
                this.playlistsLoading = false;
            }
        },
        async getYtChannels() {
            if (
                !(
                    this.user.google_tokens &&
                    this.user.google_tokens[0] &&
                    this.user.google_tokens[0].access_token
                )
            ) {
                this.warning = "true";
                this.warningMessage =
                    "Please complete your Google Authorization on Social Accounts page";
                return;
            }
            try {
                let response = await this.$http.get(
                    `/auth/get-ytchannels/${this.user._id}`
                );
                if (response.data.data && response.data.data.items) {
                    this.ytChannels = response.data.data.items;
                }
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        },
        async getBlogs() {
            if (
                !(
                    this.user.google_ga_tokens &&
                    this.user.google_ga_tokens[0] &&
                    this.user.google_ga_tokens[0].access_token
                )
            ) {
                this.warning = "true";
                this.warningMessage =
                    "Please complete your Google Authorization on Social Accounts page";
                return;
            }
            try {
                let response = await this.$http.get(`/auth/get-views/${this.user._id}`);
                this.googleViews = response.data.data.items;
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        },
        async getStatistics() {
            try {
                this.blogdashboardLoading = true;
                let me = this;
                //this.blog_pages = [];
                let response = await this.$http.get(
                    `auth/gareport/${this.user._id}/${this.selectedGoogleView}/${this.searchBlogText}`
                );
                /*
                 let response = await this.$http.get(
                  `auth/gareport/${this.userId}/${this.selectedGoogleView}`
                );
                */
                if (response.data.data.rows) {
                    let blogs = [];
                    response.data.data.rows.forEach((item, i) => {
                        let newObject = {};
                        let insights = {};

                        Object.keys(item).forEach((key, index) => {
                            if (response.data.data.columnHeaders[index]) {
                                insights[response.data.data.columnHeaders[index].name] =
                                    item[index];
                            }
                        });
                        newObject.viewid = this.selectedGoogleView;
                        newObject.insights = insights;
                        newObject.is_selected = false;
                        if (me.isEdit && me.campaign) {
                            let isSelected = me.campaign.blog_pages.findIndex(x => x.insights["ga:pagePath"] == newObject.insights["ga:pagePath"]);
                            if (isSelected != -1) {
                                newObject.is_selected = true;
                            }
                        }
                        blogs.push(newObject);
                        this.dashboardLoading = false;
                    });
                    this.blog_pages = blogs;

                }

                this.blogPages = response.data;
                this.blogdashboardLoading = false;
                console.log(response);
            } catch (e) {
                console.error(e);
            }
        },
        async searchBlogs() {
            await this.getStatistics();
        },
        async initAndFetchInstagramStuff() {
            try {
                // IG post dialog
                if (this.dialog && (!this.posts.length || this.isEdit)) {
                    this.getInstagramPosts();
                }
                // IG story dialog
                if (this.dialog2 && (!this.stories.length || this.isEdit)) {
                    this.getInstagramStories();
                }
            } catch (e) {
                console.error(e);
            }
        },

        fileUploaded(file, response) {
            this.brand_logo = response.data.Location;
        },
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${month}/${day}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [month, day, year] = date.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        },
        validateStep1() {
            console.log(this.$refs.form1);
            if (this.$refs.form1.validate()) {
                this.e1 = 2;
            }
        },
        async getIgFeedLeft(){
            if(this.postsCursor && this.postsCursor.paging && this.postsCursor.paging.previous){
                let before =  this.postsCursor.paging.cursors.before;
                await this.getInstagramPosts(`before=${before}`);
            }
        },
        async getIgFeedRight(){
            if(this.postsCursor && this.postsCursor.paging && this.postsCursor.paging.next){
                let after =  this.postsCursor.paging.cursors.after;
                await this.getInstagramPosts(`after=${after}`);
            }
        },
        async getInstagramPosts(params="") {
            this.dashboardLoading = true;
            let me = this;
            //let response = await this.$http.get("/instagram/igposts");
            let response = await this.$http.get(`/instagram/posts?${params}`);
            response.data.data.forEach((item) => {
                item.is_selected = false;
                if (me.isEdit && me.campaign) {
                    let isSelected = me.campaign.posts.findIndex(x => x.id == item.id);
                    if (isSelected != -1) {
                        item.is_selected = true;
                    }
                }
            });
            this.posts = response.data.data;
            if(response.data && response.data.paging){
                this.postsCursor = response.data;
            }
            this.dashboardLoading = false;
        },
        async getInstagramStories() {
            let me = this;
            this.dashboardLoading = true;
            let response = await this.$http.get("/instagram/stories");
            console.log(response.data);

            if (me.isEdit && me.campaign) {
                response.data = response.data.filter(y => me.campaign.stories.findIndex(x => x.id == y.id) == -1);
            }
            response.data.forEach((item) => {
                item.is_selected = false;
                // if (me.isEdit && me.campaign) {
                //     let isSelected = me.campaign.stories.findIndex(x => x.id == item.id);
                //     if (isSelected != -1) {
                //         item.is_selected = true;
                //     }
                // }
            });
            this.stories = [];

            if (me.isEdit && me.campaign) {
                this.stories = me.campaign.stories;
            }
            this.stories.push(...response.data);

            console.log(this.stories);
            this.dashboardLoading = false;
        },
        togglePost: function (i) {
            let value = this.posts[i].is_selected;
            if (typeof this.posts[i].is_selected === "undefined") {
                value = false;
            }
            console.log(value);

            this.posts[i].is_selected = !value;
        },
        toggleBlogPost: function (i) {
            let value = this.blog_pages[i].is_selected;
            if (typeof this.blog_pages[i].is_selected === "undefined") {
                value = false;
            }
            console.log(value);

            this.blog_pages[i].is_selected = !value;
        },

        toggleVideo: function (i) {
            let value = this.yt_videos[i].is_selected;
            if (typeof this.yt_videos[i].is_selected === "undefined") {
                value = false;
            }

            this.yt_videos[i].is_selected = !value;
        },
        toggleStory: function (i) {
            let value = this.stories[i].is_selected;
            if (typeof this.stories[i].is_selected === "undefined") {
                value = false;
            }
            console.log(value);

            this.stories[i].is_selected = !value;
        },
        async createCampaign() {
            if (this.googleViews && this.selectedGoogleView) {
                this.selectedBlogPosts.map(x => x.websiteUrl = this.googleViews.find(y => y.id == this.selectedGoogleView).websiteUrl);
            }
            let data = {
                name: this.campaignName,
                brand_name: this.brandName,
                due_date: this.date,
                amount: this.amount,
                posts: this.selectedPosts,
                stories: this.selectedStories,
                yt_videos: this.selectedYtVideos,
                blog_pages: this.selectedBlogPosts,
                brand_logo: this.getCampaignImage(),
            };

            if (this.isEdit) {
                try {
                    data._id = this.campaign._id;
                    let response = await this.$http.post(`/campaigns/edit-campaigns`, data).then((res) => {
                        if (res.status == 200)
                            this.$store.dispatch("alertsModule/turnOnAlert", {
                                type: "success",
                                message: "Campaign created successfully"
                            });
                        return res;
                    });
                    this.$router.push("/dashboard/" + response.data._id);
                } catch (error) {
                    console.log(error);
                    this.$store.dispatch("alertsModule/turnOnAlert", {
                        type: "error",
                        message: error.message,
                    });
                }
            } else {
                try {
                    let response = await this.$http.post(`/campaigns`, data).then((res) => {
                        if (res.status == 200)
                            this.$store.dispatch("alertsModule/turnOnAlert", {
                                type: "success",
                                message: "Campaign created successfully"
                            });
                        return res;
                    });
                    this.$router.push("/dashboard/" + response.data._id);
                } catch (error) {
                    console.log(error);
                    this.$store.dispatch("alertsModule/turnOnAlert", {
                        type: "error",
                        message: error.message,
                    });
                }
            }
        },
    },
    computed: {
        campaign() {
            return this.$store.getters["campaignsModule/getCampaign"];
        },
        isGoogleAuthorized: function () {
            return this.$store.getters["authModule/isGoogleAuthorized"];
        },
        userId: function () {
            return this.$store.getters["authModule/userId"];
        },
        selectedPosts: function () {
            let selectedPosts;

            selectedPosts = this.posts.filter((post) => {
                return post.is_selected;
            });

            return selectedPosts;
        },
        videos: {
            get() {
                console.log(this.$store);
                return this.$store.state.youtubeModule.videos;
            },

            set(value) {
                this.$store.commit("update_video", value);
            },
        },
        selectedStories: function () {
            let selectedStories;

            selectedStories = this.stories.filter((story) => {
                return story.is_selected;
            });

            console.log(selectedStories);

            return selectedStories;
        },
        selectedYtVideos: function () {
            let selectedVideos;

            selectedVideos = this.yt_videos.filter((video) => {
                return video.is_selected;
            });

            return selectedVideos;
        },
        selectedBlogPosts: function () {
            let selectedBlogPosts;

            selectedBlogPosts = this.blog_pages.filter((post) => {
                return post.is_selected;
            });

            return selectedBlogPosts;
        },
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
        amount: function (newValue) {
            this.amount = newValue;
        },
        'campaign': function () {
            this.setEditCampaign();
        }
    },
};
</script>

<style lang="scss">
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

.v-dialog {
    overflow: hidden;
}

.inline {
    display: flex;
    align-items: center;
    padding-left: 32px;
}

.page-name {
    padding: 36px 0 0 32px;
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #30364d;
}

.active-link {
    color: #7982a3;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
}

.v-breadcrumbs {
    padding: 8px 5px;
}

.v-breadcrumbs li:nth-child(even) {
    padding: 0 5px;
}

.inline i {
    font-size: 16px !important;
}

.inline img {
    padding-right: 5px;
}

.theme--light.v-stepper .v-stepper__step__step {
    font-family: " Fira Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
}

.theme--light.v-stepper .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error) .v-stepper__step__step {
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
    background: linear-gradient(360deg, #6a4ee1 0%, #b87df9 100%) !important;
    color: white !important;
}

.v-btn:not(.v-btn--round).v-size--default {
    height: 40px !important;
    border-radius: 32px;
    background: #ededff;
    color: #9165f7;
    margin-right: 8px;
}

.v-divider.divider-color {
    border-color: #f8f8ff;
}

.card-name {
    padding: 18px 24px;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #30364d;
}

.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #30364d;
}

.v-text-field__slot label {
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
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

.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)>.v-input__control>.v-input__slot,
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

.picker {
    & .v-input__slot {
        height: 56px;

        & .v-text-field__slot {
            top: 10px;
        }

        & .theme--light.v-icon {
            color: #7982a3;
        }

        .v-input__icon {
            margin: 13px 8px;
        }
    }

    & .v-input {
        margin-top: -24px;
    }
}

.date-picker {
    & .v-picker__title {
        display: none;
    }
}

.pull-right {
    text-align: right;
}

.v-stepper__wrapper .modal-mask .modal-btn.v-btn:not(.v-btn--round).v-size--default {
    border: 1px solid #e6e8f0;
    box-sizing: border-box;
    border-radius: 4px !important;
    width: 195px;
    margin: auto;
    height: 195px !important;
    background: transparent !important;
    box-shadow: none;

    & span {
        color: #7982a3;
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        text-transform: capitalize;
        display: flex;
        flex-direction: column;
        justify-items: center;
        height: 100%;

        & img {
            margin-bottom: 16px;
        }
    }
}

.modal-header {
    display: flex;
    padding: 18px 24px;

    .title-part {
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        color: #30364d;

        & h1 {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 4px;
        }

        & p {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            margin-bottom: 0;
        }
    }

    .add-btn {
        background: linear-gradient(360deg, #6a4ee1 0%, #b87df9 100%);
        border-radius: 32px;
        width: 103px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: white;
        height: 40px;
        justify-content: center;
        align-items: center;
        display: flex;

        & i {
            font-style: normal;
            font-weight: 300;
            font-size: 16px;
            line-height: 24px;
        }
    }
}

.blog_post {
    border: 1px solid #cccccc !important;
    padding: 8px;
}

.selected-post {
    border: 1px solid #9165f7;
    box-sizing: border-box;
    border-radius: 4px;
    border-color: #9165f7 !important;
    padding: 8px;

    & .v-image {
        border-radius: 0 !important;
    }
}

.videos {
    &.selected-post {}

    & img {
        width: 100%;
        height: 100%;
    }
}

.selected-video {
    color: #9165f7 !important;
}

.video-title {
    color: #30364d;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
}

.video-info {
    color: #7982a3;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
}

@media only screen and (max-width: 768px) {
    .stepper-padding {
        margin: 0 !important;
    }

    .v-card {
        height: auto !important;
    }

    .pull-right {
        padding-bottom: 20px;
    }

    .modal-mask {
        text-align: center;
    }
}

.vue-dropzone {
    width: 196px;
    border: 1px dashed #e6e8f0;
    border-radius: 4px;
    margin: auto;
    height: 196px;
    background: transparent;
    margin-bottom: 32px;

    .dropzone-title {
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #7982a3;
        margin-top: 16px;

        & strong {
            color: #31364e;
        }
    }
}

.logo-img {
    height: 75px;
}

.no-of-posts {
    width: 20px;
    height: 20px;
    background: linear-gradient(360deg, rgb(121, 88, 231) 0%, rgb(175, 119, 246) 100%);
    position: absolute;
    top: 5px;
    right: 0px;
    border-radius: 50%;

    span {
        color: white !important;
    }
}
</style>
