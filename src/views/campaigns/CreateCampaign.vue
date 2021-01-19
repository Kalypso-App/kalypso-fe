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
                                    <v-text-field prepend-inner-icon="mdi-currency-usd" v-model="amount" type="number" label="Budget" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
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
                        <h2 class="card-name text-center">
                            Select the specific posts and video you posted on behalf of this campaign.<br /> Ex: 2 Instagram Story slides and 1 Instagram feed post
                        </h2>
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
                                                            <video aspect-ratio="1" preload="metadata" controls loop muted class="v-responsive ma-0" align="center" justify="center" v-if="isVideo(post.media_url)">
                                                                <source :src="`${post.media_url}$t=0.1`" type="video/mp4">
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
                                                <v-icon v-bind:style="this.postsCursor.paging && this.postsCursor.paging.previous ? 'color:#8f8f8f': 'color:#cdcdcd' " @click="getIgFeedLeft()">mdi-arrow-left</v-icon>
                                                <v-spacer></v-spacer>
                                                <v-icon v-bind:style="this.postsCursor.paging && this.postsCursor.paging.next ? 'color:#8f8f8f': 'color:#cdcdcd' " @click="getIgFeedRight()">mdi-arrow-right</v-icon>
                                            </v-card-actions>
                                        </v-card>

                                    </v-dialog>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="addStoryDialog" scrollable max-width="448px">
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>{{this.editStory ? 'Edit': 'Add'}} Instagram Story</h1>
                                                </div>
                                            </div>

                                            <div class="instagram-profile" v-if="campaignIgDetail">
                                                <div class="instagram-info pl-8 pt-8 d-inline-flex justify-space-between align-center">
                                                    <div class="d-flex align-center">
                                                        <v-img class="instagram-info-logo-story-upload" :src="campaignIgDetail.profile_picture_url"></v-img>
                                                        <v-img class="instagram-logo-story-upload" src="@/assets/images/instagram.png" alt></v-img>

                                                        <div style="padding-left:5px;">
                                                            <h5 class="instagram-name py-0 pl-2">
                                                                @{{ campaignIgDetail.username }}
                                                            </h5>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <v-card-text style="height: 592px;">
                                                <v-form ref="form1">
                                                    <v-row class="px-6 pt-8">
                                                        <v-col v-if="isEditOlderStory" cols="12" sm="12" class="py-0">
                                                            <v-file-input v-model="oldStory" label="Upload Story" filled class="input-style" background="#F8F8FF" @change="onFileStoryChange"></v-file-input>
                                                        </v-col>
                                                        <v-col v-if="isEditOlderStory && editStory" cols="12" sm="12" class="py-0">
                                                            <video height="40px" aspect-ratio="1" preload="metadata" controls loop muted class="v-responsive ma-0" align="center" justify="center" v-if="isVideo(oldStorySrc)">
                                                                <source :src="`${oldStorySrc}$t=0.1`" type="video/mp4">
                                                            </video>
                                                            <v-img height="60px" width="60px" v-else :src="oldStorySrc" aspect-ratio="1">
                                                                <template v-slot:placeholder>
                                                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                    </v-row>
                                                                </template>
                                                            </v-img>
                                                        </v-col>
                                                        <v-col v-if="isEditOlderStory" cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="impressions" type="number" label="Impressions" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                        <v-col v-if="isEditOlderStory" cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="reach" type="number" label="Reach" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                        <v-col v-if="isEditOlderStory" cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="taps_back" type="number" label="Taps Back" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                        <v-col v-if="isEditOlderStory" cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="replies" type="number" label="Replies" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                         <v-col cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="swipe_ups" type="number" label="Swipe Ups" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn @click="onSaveStoryClick()" width="100%" class="modal-btn">
                                                    {{ this.editStory ? 'Edit' : 'Add' }} Story
                                                </v-btn>
                                            </v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-divider></v-divider>
                                        </v-card>
                                    </v-dialog>
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
                                            <div style="margin:10px 50px;">
                                                <v-btn @click="onAddStoryClick()" width="100%" class="modal-btn">
                                                    Add Older Instagram Stories
                                                </v-btn>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text v-loading="dashboardLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(story, i) in stories" @click="toggleStory(i)" :key="story.id" class="d-flex child-flex" cols="4">
                                                        <v-card flat tile class="d-flex" :class="
                                  story.is_selected ? 'selected-post' : ''
                                ">
                                                            <div class="older-story">
                                                                <v-icon  v-if="story.isOlderStory" @click.stop="onOldStoryDelete(story)">mdi-delete</v-icon>
                                                                <v-icon @click.stop="onOldStoryEdit(story)">mdi-pencil</v-icon>
                                                            </div>
                                                            <video style="max-height:220px;height:220px;" preload="metadata" controls loop muted height="220px" v-if="isVideo(story.media_url, story.media_type)" aspect-ratio="1" class="v-responsive ma-0 test" align="center" justify="center">
                                                                <source :src="`${story.media_url}#t=0.1`" type="video/mp4">
                                                            </video>
                                                            <v-img height="220px" v-else :src="story.media_url" aspect-ratio="1">
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
                                    <v-dialog v-model="deleteStory" max-width="550" height="250">
                                        <v-card class="delete-modal-title">
                                            <h3>Are you sure?</h3>
                                            <div class="txt-delete">Do you really want to delete your Story?</div>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn style="width: auto" class="cancel-gray" @click="deleteStory = false">Cancel</v-btn>
                                                <v-btn style="width: auto" class="confirm-purple" @click="onDeleteStoryConfrim()">Delete</v-btn>
                                            </v-card-actions>
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
                                            <v-select class="px-4" :items="googleViews" label="Choose Google View" dense @change="getStatistics" rounded v-model="selectedGoogleView" item-value="id" item-text="websiteUrl" append-icon="mdi-chevron-down" outlined></v-select>
                                            <v-menu class="px-4" ref="menu" v-model="menuDate" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field  v-model="dateFormattedGA" label="Blog Published Date" class="px-4 input-style" append-icon="mdi-calendar-blank-outline" @blur="dateGA = parseDate(dateFormattedGA)" v-on="on" v-on:click:append="menuDate=true"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="dateGA" no-title>
                                                    <v-spacer></v-spacer>
                                                    <v-btn width="auto" text color="primary" @click="menuDate = false">Cancel</v-btn>
                                                    <v-btn width="auto" text color="primary" @click="$refs.menu.save(dateFormattedGA)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                            <v-card-text v-loading="blogdashboardLoading" style="height: 592px;">
                                                <v-row v-if="blogPages.data">
                                                    <v-text-field class="input-search px-4" v-model="searchBlogText" placeholder="Search" append-icon="mdi-magnify" @click:append="searchBlogs" v-on:keyup.enter="searchBlogs" hide-details single-line></v-text-field>
                                                    <v-col v-for="(post, i) in blog_pages" @click="toggleBlogPost(i)" :key="i" class cols="6">
                                                        <v-card :title="post['insights']['ga:pageTitle']" flat tile class="d-flex blog_post" :class="post.is_selected ? 'selected-post' : ''">
                                                            <span style="overflow:hidden">{{ post["insights"]["ga:pagePath"] }}</span>
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
                                    <v-dialog v-model="dialog6" scrollable max-width="448px">
                                        <template v-slot:activator="{  }">
                                            <v-btn @click="openFacebookDialog" class="modal-btn">
                                                <img width="42px" src="@/assets/images/facebook-logo.png" alt />
                                                <p>
                                                    Add Facebook
                                                    <br />Post
                                                </p>
                                                <div v-if="selectedFacebook.length" class="no-of-posts">
                                                    <span>{{selectedFacebook.length}}</span>
                                                </div>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select one or more Facebook posts</h1>
                                                    <p>
                                                        Select one or more Facebook posts that you want
                                                        to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog6=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedFacebook.length }}
                                                        {{
                              selectedFacebook.length > 0
                              ? "Selected"
                              : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text v-loading="dashboardLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(facebook, i) in facebooks" @click="toggleFacebook(i)" :key="i" class="d-flex child-flex" cols="6">
                                                        <v-card style="flex-direction:column" flat tile class="d-flex" :class="facebook.is_selected ? 'selected-post' : ''">
                                                            <p :title="facebook.message" v-if="facebook.message" class="facebook-post-message">{{facebook.message}}</p>
                                                            <p :title="facebook.story" v-else class="facebook-post-message">{{facebook.story}}</p>
                                                            <div v-if="facebook.attachments && facebook.attachments.data">
                                                                <video style="max-height:220px;height:220px;" preload="metadata" controls loop muted height="220px" v-if="isVideo(facebook.attachments.data[0].media.image.src)" aspect-ratio="1" class="v-responsive ma-0 test" align="center" justify="center">
                                                                    <source :src="`${facebook.attachments.data[0].media.image.src}#t=0.1`" type="video/mp4">
                                                                </video>
                                                                <v-img height="220px" v-else :src="facebook.attachments.data[0].media.image.src" aspect-ratio="1">
                                                                    <template v-slot:placeholder>
                                                                        <v-row class="fill-height ma-0" align="center" justify="center">
                                                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                        </v-row>
                                                                    </template>
                                                                </v-img>
                                                            </div>
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
                                    <v-dialog v-model="dialog8" scrollable max-width="448px">
                                        <template v-slot:activator="{  }">
                                            <v-btn @click="openReelsDialog" class="modal-btn">
                                                <img width="42px" src="@/assets/images/ig-reels.png" alt />
                                                <p>
                                                    Add Instagram
                                                    <br />Reel
                                                </p>
                                                <div v-if="selectedReels.length" class="no-of-posts">
                                                    <span>{{selectedReels.length}}</span>
                                                </div>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select one or more Instagram Reels</h1>
                                                    <p>
                                                        Select one or more Instagram Reels that you want
                                                        to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog8=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedReels.length }}
                                                        {{
                              selectedReels.length > 0
                              ? "Selected"
                              : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style="margin:10px 50px;">
                                                <v-btn @click="onAddReelClick()" width="100%" class="modal-btn">
                                                    Manually Add Instagram Reels
                                                </v-btn>
                                                <span style="font-weight: normal;font-size: 12px; line-height: 16px; margin-bottom: 0;">Instagram does not yet allow us to automatically pull Reels data. Upload your video and type in data. </span>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text v-loading="dashboardLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(reel, i) in reels" @click="toggleReel(i)" :key="i" class="d-flex child-flex" cols="6">
                                                        <v-card style="flex-direction:column" flat tile class="d-flex" :class="reel.is_selected ? 'selected-post' : ''">
                                                            <div class="older-story">
                                                                <v-icon @click.stop="onOldReelDelete(reel)">mdi-delete</v-icon>
                                                                <v-icon @click.stop="onOldReelEdit(reel)">mdi-pencil</v-icon>
                                                            </div>
                                                            <video style="max-height:220px;height:220px;" preload="metadata" controls loop muted height="220px" v-if="isVideo(reel.media_url)" aspect-ratio="1" class="v-responsive ma-0 test" align="center" justify="center">
                                                                <source :src="`${reel.media_url}#t=0.1`" type="video/mp4">
                                                            </video>

                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="addReelDialog" scrollable max-width="448px">
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>{{this.editReel ? 'Edit': 'Add'}} Instagram Reel</h1>
                                                </div>
                                            </div>

                                            <div class="instagram-profile" v-if="campaignIgDetail">
                                                <div class="instagram-info pl-8 pt-8 d-inline-flex justify-space-between align-center">
                                                    <div class="d-flex align-center">
                                                        <v-img class="instagram-info-logo-story-upload" :src="campaignIgDetail.profile_picture_url"></v-img>
                                                        <v-img class="instagram-logo-story-upload" src="@/assets/images/instagram.png" alt></v-img>

                                                        <div style="padding-left:5px;">
                                                            <h5 class="instagram-name py-0 pl-2">
                                                                @{{ campaignIgDetail.username }}
                                                            </h5>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <v-card-text style="height: 592px;">
                                                <v-form ref="form1">
                                                    <v-row class="px-6 pt-8">
                                                        <v-col cols="12" sm="12" class="py-0">
                                                            <v-file-input accept="video/*" v-model="oldReel" label="Upload Video" filled class="input-style" background="#F8F8FF" @change="onFileReelChange"></v-file-input>
                                                        </v-col>
                                                        <v-col v-if="editReel" cols="12" sm="12" class="py-0">
                                                            <video height="70px" aspect-ratio="1" preload="metadata" controls loop muted class="v-responsive ma-0" align="center" justify="center" v-if="isVideo(oldReelSrc)">
                                                                <source :src="`${oldReelSrc}#t=0.1`" type="video/mp4">
                                                            </video>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="reel_views" type="number" label="Views" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="reel_likes" type="number" label="Likes" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12" class="py-0">
                                                            <v-text-field v-model="reel_comments" type="number" label="Comments" filled class="input-style amount-input" background="#F8F8FF"></v-text-field>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-btn @click="onSaveReelClick()" width="100%" class="modal-btn">
                                                    {{ this.editReel ? 'Edit' : 'Add' }} Reel
                                                </v-btn>
                                            </v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-divider></v-divider>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="deleteReel" max-width="550" height="250">
                                        <v-card class="delete-modal-title">
                                            <h3>Are you sure?</h3>
                                            <div class="txt-delete">Do you really want to delete Reel?</div>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn style="width: auto" class="cancel-gray" @click="deleteReel = false">Cancel</v-btn>
                                                <v-btn style="width: auto" class="confirm-purple" @click="onDeleteReelConfrim()">Delete</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-col>
                            <v-col cols="12" md="4" xs="12">
                                <div class="modal-mask">
                                    <v-dialog v-model="dialog7" scrollable max-width="448px">
                                        <template v-slot:activator="{  }">
                                            <v-btn @click="openTikTokDialog" class="modal-btn">
                                                <img width="64px" src="@/assets/images/TikTok-Logo.png" alt />
                                                <p>
                                                   Add Tik Tok 
                                                    <br />Video
                                                </p>
                                                <div v-if="selectedTiktok.length" class="no-of-posts">
                                                    <span>{{selectedTiktok.length}}</span>
                                                </div>
                                            </v-btn>
                                        </template>
                                        <v-card class="modal-padding">
                                            <div class="modal-header">
                                                <div class="title-part">
                                                    <h1>Select one or more Tik Tok videos</h1>
                                                    <p>
                                                       Select one or more Tik Tok videos that you want
                                                        to
                                                        <br />add to your campaign
                                                    </p>
                                                </div>
                                                <v-spacer></v-spacer>
                                                <div class="add-btn" @click="dialog7=false" style="cursor:pointer">
                                                    <v-icon color=" white">mdi-plus</v-icon>
                                                    <span>
                                                        {{ selectedTiktok.length }}
                                                        {{
                              selectedTiktok.length > 0
                              ? "Selected"
                              : "Add"
                              }}
                                                    </span>
                                                </div>
                                            </div>
                                            <v-divider></v-divider>
                                            <v-card-text v-loading="dashboardLoading" style="height: 592px;">
                                                <v-row>
                                                    <v-col v-for="(tiktok, i) in tiktoks" @click="toggleTiktok(i)" :key="i" class="d-flex child-flex" cols="4">
                                                        <v-card flat tile class="d-flex" :class="tiktok.is_selected ? 'selected-post' : ''">
                                                            <!-- <video aspect-ratio="1"  preload="metadata" controls loop muted class="v-responsive ma-0" align="center" justify="center">
                                                                 <source :src="`${post.videoUrl}$t=0.1`" type="video/mp4">
                                                             </video>-->
                                                            <v-img height="220px" :src="tiktok.covers.default" aspect-ratio="1">
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
import {
    pro_key
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
        dateGA: new Date().toISOString().substr(0, 10),
        dateFormattedGA: vm.formatDate(new Date().toISOString().substr(0, 10)),
        menu: false,
        menuDate: false,
        modal: false,
        menu2: false,
        first: "",
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        dialog6: false,
        dialog7: false,
        dialog8: false,
        addStoryDialog: false,
        amount: 0,
        campaignName: "",
        brandName: "",
        images: [],
        posts: [],
        tiktoks: [],
        postsCursor: [],
        stories: [],
        facebooks: [],
        reels: [],
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
        oldStory: null,
        oldStorySrc: null,
        oldStoryExtension: null,
        oldStoryFile: null,
        impressions: 0,
        reach: 0,
        taps_forward: 0,
        taps_back: 0,
        exits: 0,
        replies: 0,
        swipe_ups:0,
        isEditOlderStory: false,
        deleteStory: false,
        deleteStoryId: null,
        editStory: false,
        editStoryData: null,
        oldReel: null,
        oldReelSrc: null,
        oldReelExtension: null,
        oldReelFile: null,
        deleteReel: false,
        deleteReelId: null,
        editReel: false,
        editReelData: null,
        addReelDialog: false,
        reel_views: 0,
        reel_likes: 0,
        reel_comments: 0,

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
        isVideo(filename, type = "IMAGE") {
            return ( /\.mp4|\.mov/.test(filename) || type == "VIDEO");
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
            this.facebooks = this.campaign.fbposts;
            this.tiktoks = this.campaign.tiktoks;
            this.reels = this.campaign.reels;
            if(this.campaign.ga_blog_date){
                this.dateGA = new Date(this.campaign.ga_blog_date).toISOString().substr(0, 10);
            }
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
        async openFacebookDialog() {
            this.dialog6 = true;
            this.dashboardLoading = true;
            let me = this;

            let response = await this.$http.get(`/instagram/fbposts`);
            response.data.forEach((item) => {
                item.is_selected = false;
                if (me.isEdit && me.campaign) {
                    let isSelected = me.campaign.fbposts.findIndex(x => x.id == item.id);
                    if (isSelected != -1) {
                        item.is_selected = true;
                    }
                }
            });
            this.facebooks = response.data;

            this.dashboardLoading = false;

        },
        async openReelsDialog() {
            this.dialog8 = true;
            this.dashboardLoading = true;
            let me = this;

            let response = await this.$http.get(`/instagram/reels`);
            response.data.forEach((item) => {
                item.is_selected = false;
                if (me.isEdit && me.campaign) {
                    let isSelected = me.campaign.reels.findIndex(x => x.id == item.id);
                    if (isSelected != -1) {
                        item.is_selected = true;
                    }
                }
            });
            this.reels = response.data;
            this.dashboardLoading = false;
        },
        async openTikTokDialog() {
            this.dialog7 = true;
            this.dashboardLoading = true;
            let me = this;
            let response = await this.$http.get(`/tiktok/posts`);
            response.data.collector.forEach(item => {
                item.is_selected = false;
            });
            this.tiktoks = response.data.collector;

            this.dashboardLoading = false;
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
                let webUrl = this.googleViews.find(x=>x.id == this.selectedGoogleView).websiteUrl;
                if(webUrl){
                    this.searchBlogText = this.searchBlogText.replace(webUrl,"");
                }
                let response = await this.$http.get(
                    `auth/gareport/${this.user._id}/${this.selectedGoogleView}?search=${this.searchBlogText}`
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
        async getIgFeedLeft() {
            if (this.postsCursor && this.postsCursor.paging && this.postsCursor.paging.previous) {
                let before = this.postsCursor.paging.cursors.before;
                await this.getInstagramPosts(`before=${before}`);
            }
        },
        async getIgFeedRight() {
            if (this.postsCursor && this.postsCursor.paging && this.postsCursor.paging.next) {
                let after = this.postsCursor.paging.cursors.after;
                await this.getInstagramPosts(`after=${after}`);
            }
        },
        async getInstagramPosts(params = "") {
            this.dashboardLoading = true;
            let me = this;
            //let response = await this.$http.get("/instagram/igposts");
            let response = await this.$http.get(`/instagram/posts?${params}`);
            response.data.data.forEach((item) => {
                item.is_selected = false;
                if (me.isEdit && me.campaign) {
                    if (me.campaign.posts.findIndex(x => x.id == item.id) != -1) {
                        item.is_selected = true;
                    }
                }
                if (me.posts) {
                    if (me.posts.findIndex(x => x.id == item.id) != -1) {
                        item.is_selected = true;
                    }
                }
            });
            if (me.isEdit && me.campaign) {
                let campaignPosts = me.campaign.posts.filter(x => response.data.data.findIndex(y => y.id == x.id) == -1);
                response.data.data.unshift(...campaignPosts);
                console.log(me.campaign.posts);

            } else if (params) {
                let selectedPosts = this.posts.filter(x => x.is_selected && response.data.data.findIndex(y => y.id == x.id) == -1);
                response.data.data.unshift(...selectedPosts);
            }

            this.posts = response.data.data;
            if (response.data && response.data.paging) {
                this.postsCursor = response.data;
            }
            this.dashboardLoading = false;
        },
        async getInstagramStories() {
            let me = this;
            this.dashboardLoading = true;
            let response = await this.$http.get("/instagram/stories");

            if (me.isEdit && me.campaign) {
                response.data = response.data.filter(y => me.campaign.stories.findIndex(x => x.id == y.id) == -1);
            }
            response.data.forEach((item) => {
                item.is_selected = false;
            });
            me.stories = [];

            if (me.isEdit && me.campaign) {
                me.stories.push(...me.campaign.stories);
            }
            me.stories.push(...response.data);
            console.log(me.stories.length);
            me.dashboardLoading = false;
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
        toggleTiktok: function (i) {
            let value = this.tiktoks[i].is_selected;
            if (typeof this.tiktoks[i].is_selected === "undefined") {
                value = false;
            }
            console.log(value);

            this.tiktoks[i].is_selected = !value;
        },
        toggleFacebook: function (i) {
            let value = this.facebooks[i].is_selected;
            if (typeof this.facebooks[i].is_selected === "undefined") {
                value = false;
            }
            console.log(value);

            this.facebooks[i].is_selected = !value;
        },
        toggleReel: function (i) {
            let value = this.reels[i].is_selected;
            if (typeof this.reels[i].is_selected === "undefined") {
                value = false;
            }

            this.reels[i].is_selected = !value;
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
                fbposts: this.selectedFacebook,
                reels: this.selectedReels,
                tiktoks: this.selectedTiktok,
                ga_blog_date: this.dateGA,
                brand_logo: this.getCampaignImage(),
            };

            if (pro_key == this.user.priceId) {
                data.isProCampaign = true;
            } else {
                data.isProCampaign = false;
            }

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
        onAddStoryClick() {
            this.oldStory = null;
            this.oldStorySrc = null;
            this.oldStoryExtension = null;
            this.oldStoryFile = null;
            this.impressions = 0;
            this.reach = 0;
            this.taps_forward = 0;
            this.taps_back = 0;
            this.exits = 0;
            this.replies = 0;
            this.swipe_ups = 0;
            this.isEditOlderStory = true;    
            this.addStoryDialog = true;
            this.editStory = false;
            this.editStoryData = null;
        },
        onFileStoryChange(e) {
            if (!e)
                return;
            let vm = this;
            this.oldStoryFile = e;
            var extension = e.name.split('.').pop().toLowerCase()
            var fr = new FileReader();
            fr.onload = function () {
                vm.oldStorySrc = fr.result;
                vm.oldStoryExtension = extension;
            }
            fr.readAsDataURL(e);
        },
        async onSaveStoryClick() {

            if (this.isEditOlderStory && this.oldStorySrc == null) {
                return;
            }

            let data = new FormData();
            data.append('oldStoryFile', this.oldStoryFile);
            data.append('impressions', this.impressions);
            data.append('reach', this.reach);
            data.append('taps_back', this.taps_back);
            data.append('taps_forward', 0);
            data.append('exits', 0);
            data.append('replies', this.replies);
            data.append('swipe_ups', this.swipe_ups);
            data.append('oldStoryExtension', this.oldStoryExtension);
            data.append('isEditOlderStory', this.isEditOlderStory);

            let successMsg = "created";
            
            if (this.editStoryData) {
                data.append('olderStoryId', this.editStoryData.id);
                successMsg = "updated";
            }

           
            let response = await this.$http.post(`/campaigns/add-story`, data).then((res) => {
                return res;
            });

            if (response) {
                this.$store.dispatch("alertsModule/turnOnAlert", {
                    type: "success",
                    message: `Story ${successMsg} successfully`
                });
                this.addStoryDialog = false;
                this.editStory = false;
                this.editStoryData = null;
                await this.getInstagramStories();
            }
        },
        async onOldStoryEdit(story) {
            this.editStory = true;
            this.isEditOlderStory = true;
            this.editStoryData = story;
            if(story.isOlderStory){
                this.oldStorySrc = story.media_url;
                this.impressions = story.insights.impressions;
                this.reach = story.insights.reach;
                this.taps_forward = story.insights.taps_forward;
                this.taps_back = story.insights.taps_back;
                this.exits = story.insights.exits;
                this.replies = story.insights.replies;
                this.swipe_ups = story.insights.swipe_ups;
            }
            else{
                this.isEditOlderStory = false;
                this.swipe_ups = story?.insights?.swipe_ups || 0;
            }
            this.addStoryDialog = true;

        },
        async onOldStoryDelete(story) {
            this.deleteStory = true;
            this.deleteStoryId = story.id;
        },
        async onDeleteStoryConfrim() {
            this.deleteStory = false;
            let response = await this.$http.get(`/campaigns/delete-story/${this.deleteStoryId}`);
            if (response) {
                await this.getInstagramStories();
            }
        },
        async getInstagramReels() {
            let me = this;
            this.dashboardLoading = true;
            let response = await this.$http.get("/instagram/reels");

            if (me.isEdit && me.campaign) {
                response.data = response.data.filter(y => me.campaign.reels.findIndex(x => x.id == y.id) == -1);
            }
            response.data.forEach((item) => {
                item.is_selected = false;
            });
            this.reels = [];

            if (me.isEdit && me.campaign) {
                this.reels = me.campaign.reels;
            }
            this.reels.push(...response.data);
            this.dashboardLoading = false;

        },
        onAddReelClick() {
            this.oldReel = null;
            this.oldReelSrc = null;
            this.oldReelExtension = null;
            this.oldReelFile = null;
            this.reel_views = 0;
            this.reel_likes = 0;
            this.reel_comments = 0;
            this.addReelDialog = true;
            this.editReel = false;
            this.editReelData = null;
        },
        onFileReelChange(e) {
            if (!e)
                return;
            let vm = this;
            this.oldReelFile = e;
            var extension = e.name.split('.').pop().toLowerCase()
            var fr = new FileReader();
            fr.onload = function () {
                vm.oldReelSrc = fr.result;
                vm.oldReelExtension = extension;
            }
            fr.readAsDataURL(e);
        },
        async onSaveReelClick() {

            if (this.oldReelSrc == null) {
                return;
            }

            let data = new FormData();
            data.append('oldReelFile', this.oldReelFile);
            data.append('reel_views', this.reel_views);
            data.append('reel_likes', this.reel_likes);
            data.append('reel_comments', this.reel_comments);

            data.append('oldReelExtension', this.oldReelExtension);

            if (this.editReelData) {
                data.append('olderReelId', this.editReelData.id);
            }

            let response = await this.$http.post(`/campaigns/add-reel`, data).then((res) => {
                return res;
            });

            if (response) {
                this.$store.dispatch("alertsModule/turnOnAlert", {
                    type: "success",
                    message: "Reel created successfully"
                });
                this.addReelDialog = false;
                this.editReel = false;
                this.editReelData = null;
                this.reels = [];
                await this.getInstagramReels();
            }
        },
        async onOldReelEdit(reel) {
            this.editReel = true;
            this.editReelData = reel;
            this.oldReelSrc = reel.media_url;
            this.reel_views = reel.insights.reel_views;
            this.reel_likes = reel.insights.reel_likes;
            this.reel_comments = reel.insights.reel_comments;
            this.addReelDialog = true;

        },
        async onOldReelDelete(reel) {
            this.deleteReel = true;
            this.deleteReelId = reel.id;
        },
        async onDeleteReelConfrim() {
            this.deleteReel = false;
            let response = await this.$http.get(`/campaigns/delete-reel/${this.deleteReelId}`);
            if (response) {
                this.getInstagramReels();
            }
        }
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
        selectedFacebook: function () {
            let selected;

            selected = this.facebooks.filter((facebook) => {
                return facebook.is_selected;
            });

            return selected;
        },
        selectedReels: function () {
            let selected;

            selected = this.reels.filter((reel) => {
                return reel.is_selected;
            });

            return selected;
        },
        selectedTiktok: function () {
            let selected;

            selected = this.tiktoks.filter((tiktok) => {
                return tiktok.is_selected;
            });

            return selected;
        },
        campaignIgDetail: function () {
            if (this.user && this.user.ig_detail) {
                return this.user.ig_detail.profile;
            }

            return null;
        }
    },
    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date);
        },
        dateGA(val) {
            this.dateFormattedGA = this.formatDate(this.dateGA);
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

.facebook-post-message {
    overflow: hidden;
    height: 60px;
}

.instagram-info-logo-story-upload {
    height: 72px;
    width: 72px;
    border-radius: 50%;
    border: 2px solid #7756e5;
}

.instagram-logo-story-upload {
    position: relative;
    bottom: 0px;
    margin-left: -24px;
    margin-bottom: -56px;
    width: 24px;
}

.older-story {
    width: 100%;
    position: absolute;
    z-index: 11;
   
    button {
        opacity: 1;
        background: white;
        color: #9b9494 !important;
        border-radius: 50%;
        font-size: 16px !important;
        width: 24px;
        height: 24px;
        cursor: pointer !important;
        float: right;
        top: 5px;
        right: 2px
    }
}
</style>
