<template>
<div class="campaign-detail">
    <div class="brand-info pl-8 pt-8 d-inline-flex justify-space-between align-center">
        <div class="d-flex align-center">
            <v-img class="brand-info-logo" :src="campaign.brand_logo ? campaign.brand_logo : logo"></v-img>
            <h2 class="brand-name page-name py-0 pl-2">{{campaign.name}}</h2>
        </div>
        <!--<h2 class="page-name py-0 pr-8">{{ new Date(campaign.due_date).toLocaleString().slice(0,10).replace(',', '') }}</h2>-->

    </div>
    <div class="overall-detail pl-8 pt-8 justify-space-between align-center">
        <h2 class="brand-name page-name py-0 px-0">Overall Campaign Performance</h2>
        <span class="px-0">See your data visualization</span>
    </div>
    <div>
        <div class="row px-8">
            <div class="text-center col-md-3 col-12">
                <v-card class="overall performance">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Campaign Performance</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Your campaign's overall performance</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-symbol">
                        <span>Low</span>
                        <img src="@/assets/images/campaign_graph.png" alt />
                        <v-icon class="overall-gauge" :style="{ transform: getOverAllPerformance(true) }">mdi-sign-pole</v-icon>
                        <span>High</span>
                    </div>
                    <div style="margin-top: -14px;">
                        <h3>{{getOverAllPerformance()}}%</h3>
                    </div>
                </v-card>
            </div>
            <div v-if="isIgAndYt() && !isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Impressions</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Total number of campaign impressions</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>{{getOverallImpressions()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_impression.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Pageviews</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Total number of pageviews</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>{{getOverallPageViews()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_impression.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="!isIgAndYt() && !isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Current Video Views</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Total number of video views.</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>{{getYtTotalViews()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_earn.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="!isIgAndYt() && !isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Projected Video Views</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Based on initial performance, estimated projection of video views in 90 days.</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>{{getYtProjectedViews()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_earn.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="!isIgAndYt() && !isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Avg. Completion Rate</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How much of your video was watched on average.</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>{{getYtAvgCompletion()}}%</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_impression.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="!isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Engagement</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Total campaign engagement</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>{{getOverallEngagement()}}%</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_engagement.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div class="text-center col-md-3 col-12">
                <v-card class="overall">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Earned Media Value</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Using an industry standard CPM comparison, industry standard conversion factor, and actual reached users, here is an estimated Earned Media Value.<br /> EMV is a standard PR metric used to calculate "buzz" or value of posting.</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>${{getOverallEarnedMediaValue()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_earn.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div class="text-center col-md-3 col-12">
                <v-card class="overall performance">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">CPM</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">Cost per thousand impressions. Industry standard metric for social</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>${{getOverallCPM()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_cpm.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="!isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall performance">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Pay Per Impression</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How much each impression cost based on campaign budget</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>${{getOverallPayPerImpression()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_cpm.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="!isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall performance">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Pay Per Engagement</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How much each engagement cost based on campaign budget</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>${{getOverallPayPerEngagement()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_engagement.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="isOnlyBlogs()" class="text-center col-md-3 col-12">
                <v-card class="overall performance">
                    <div class="stat-title">
                        <h4 style="color:#4C6072">Pay Per Pageview</h4>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How much each pageview cost based on campaign budget</span>
                        </v-tooltip>
                    </div>
                    <div class="stat-detail">
                        <div class="stat-data">
                            <h1>${{getOverallPayPerPageview()}}</h1>
                        </div>
                        <div>
                            <img src="@/assets/images/overall_engagement.png" alt />
                        </div>
                    </div>
                </v-card>
            </div>
        </div>

    </div>
    <!-- This is for Instagram Profile section -->
    <div class="instagram-profile" v-if="campaignIgDetail">
        <div class="instagram-info pl-8 pt-8 d-inline-flex justify-space-between align-center">
            <div class="d-flex align-center">
                <v-img class="instagram-info-logo" :src="campaignIgDetail.profile_picture_url"></v-img>
                <v-img class="instagram-logo" src="@/assets/images/instagram.png" alt></v-img>

                <div style="padding-left:5px;">
                    <h5 class="instagram-name py-0 pl-2">@{{campaignIgDetail.username}}</h5>
                    <div class="instagram-followers">
                        <h2 class="py-0 pl-2">{{intToString(campaignIgDetail.followers_count)}}</h2>
                        <span class="pl-1">Followers</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Render Instagram Feeds -->
    <div v-if="campaign.posts && campaign.posts.length">
        <div class="instagram-title px-8">
            <img class="instagram-logo pr-2" src="@/assets/images/instagram.png" alt />
            <span>Instagram Feed</span>
        </div>
        <div class="awareness px-8">
            <span class="grey-label">Awareness</span>
            <div class="row">
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats impression">
                        <div class="stat-symbol">
                            <v-icon>mdi-eye-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Impressions</h6>
                            <h3>{{getIgFeedImpression()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of times your post was seen</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_imression.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats reach">
                        <div class="stat-symbol">
                            <v-icon>mdi-account-circle-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Reach</h6>
                            <h3>{{getIgFeedReach()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of unique accounts that saw your post</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_reach.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats frequncy">
                        <div class="stat-symbol">
                            <v-icon>mdi-clock-time-five-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Frequency</h6>
                            <h3>{{getIgFeedFrequency()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">How many times did one person see your post?</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_frequncy.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats audience">
                        <div class="stat-data">
                            <h6>Audience Viewability</h6>
                        </div>
                        <div class="progress-bar">
                            <div :style="{ width: getIgFeedAudience() + '%' }" class="progress-bar-completed"></div>
                        </div>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">What % of your followers saw your post?</span>
                        </v-tooltip>
                        <h3>{{getIgFeedAudience()}}%</h3>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="engagement px-8">
            <span class="grey-label">Engagement</span>
            <div class="row">
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats engagement-rate">
                        <div class="stat-symbol">
                            <v-icon>mdi-heart-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Follower Engagement Rate</h6>
                            <h3>{{getIgFeedEngagementRate()}}%</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of likes, comments, post saves you received compared to your follower count</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_engagement_rate.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats engagement-rate">
                        <div class="stat-symbol">
                            <v-icon>mdi-heart-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Post Engagement Rate</h6>
                            <h3>{{getIgFeedPostEngagementRate()}}%</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of likes, comments, post saves you received compared post reach</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_engagement_rate.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats comments">
                        <div class="stat-symbol">
                            <v-icon>mdi-comment-processing-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Comments</h6>
                            <h3>{{getIgFeedEngagementComments()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of comments you received</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_imression.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats saves">
                        <div class="stat-symbol">
                            <v-icon>mdi-clock-time-five-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Save Rate</h6>
                            <h3>{{getIgFeedEngagementSaves()}}%</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Out of how many unique people saw your post, how many saved it for later?</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_frequncy.png" alt />
                        </div>
                    </v-card>
                </div>
            </div>
        </div>

        <!--
        <div class="type-holder" v-bind:key="i" v-for="(post, i) in campaign.posts" v-loading="dashboardLoading">
            <div class="headline">
                <span>Instagram Post #{{ (i+1) }} </span>
                <video v-if="post.media_url && isVideo(post.media_url)" width="40" height="40" align="center" justify="center">
                    <source :src="post.media_url" type="video/mp4">
                </video>
                <v-img v-if="post.media_url && !isVideo(post.media_url)" width="40" height="40" :src="post.media_url"></v-img>
            </div>
            <h4 v-if="post.error">{{post.error}}</h4>
            <div class="grid-story-chart">
                <div class="statistic">
                    <v-card v-for="(insight, i) in post.insights" v-bind:key="i" ml-6 class="text-center mb-6">
                        <h3>{{insight.values[0].value}}</h3>
                        <span>{{ insight.title }}</span>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">mdi-information-outline</v-icon>
                            </template>
                            <span>{{insight.description}}</span>
                        </v-tooltip>
                    </v-card>
                </div>
            </div>
        </div>
        -->
        <span class="content-label px-8">Content</span>
        <div class="row py-20 pl-8">
            <div class="col-md-4 col-12" v-bind:key="i" v-for="(post, i) in campaign.posts" v-loading="dashboardLoading">
                <v-card class="instagram-content" width="90%">
                    <div>
                        <img class="instagram-light" src="@/assets/images/instagram-light.png" />
                    </div>
                    <div class="instagram-content-image">
                        <video controls v-if="post.post_detail && post.post_detail.media_url && isVideo(post.post_detail.media_url)" align="center" justify="center">
                            <source :src="post.post_detail.media_url" type="video/mp4">
                        </video>
                        <img v-if="post.post_detail && post.post_detail.media_url && ! isVideo(post.post_detail.media_url)" :src="post.post_detail.media_url" />
                    </div>
                    <div class="instagram-content-caption">
                        <span>{{post.post_detail.caption}}</span>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-heart-outline</v-icon>
                            <span>Likes</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{post.post_detail.like_count || 0}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-comment-processing-outline</v-icon>
                            <span>Comments</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{post.post_detail.comments_count || 0}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-bookmark-outline</v-icon>
                            <span>Saves</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getIgPostSaves(post)}}</span>
                        </div>
                    </div>
                    <!--
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-share-variant-outline</v-icon>

                            <span>Shares</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">122</span>
                        </div>
                    </div>
                    -->
                </v-card>
            </div>
        </div>
    </div>
    <!-- Render Instagram Story -->
    <div v-if="campaign.stories && campaign.stories.length">
        <div class="instagram-title px-8">
            <img class="instagram-logo pr-2" src="@/assets/images/instagram.png" alt />
            <span>Instagram Story</span>
        </div>
        <div class="awareness px-8">
            <span class="grey-label">Awareness</span>
            <div class="row">
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats impression">
                        <div class="stat-symbol">
                            <v-icon>mdi-eye-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Impressions</h6>
                            <h3>{{getIgStoryImpression()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of times your Story was seen</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_imression.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats reach">
                        <div class="stat-symbol">
                            <v-icon>mdi-account-circle-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Reach</h6>
                            <h3>{{getIgStoryReach()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of unique viewers that saw your Story</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_reach.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats frequncy">
                        <div class="stat-symbol">
                            <v-icon>mdi-clock-time-five-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Frequency</h6>
                            <h3>{{getIgStoryFrequency()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">How many times did one viewer see your Story?</span>
                            </v-tooltip>
                            <img src="@/assets/images/frequncy_green.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats audience">
                        <div class="stat-data">
                            <h6>Audience Viewability</h6>
                        </div>
                        <div class="progress-bar">
                            <div :style="{ width: getIgStoryAudience() + '%' }" class="progress-bar-completed"></div>
                        </div>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">What % of your followers saw your Story?</span>
                        </v-tooltip>
                        <h3>{{getIgStoryAudience()}}%</h3>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="engagement px-8">
            <span class="grey-label">Engagement</span>
            <div class="row">
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats engagement-rate">
                        <div class="stat-symbol">
                            <v-icon>mdi-heart-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Engagement Rate</h6>
                            <h3>{{getIgStoryEngagementRate()}}%</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of replies, taps back compared to how many viewers saw your Story.</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_engagement_rate.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats replies">
                        <div class="stat-symbol">
                            <v-icon>mdi-send-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Replies</h6>
                            <h3>{{getIgStoryEngagementReplies()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of times a viewer directly responds to your Story via DM.</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_engagement_rate.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats tapbacks">
                        <div class="stat-symbol">
                            <v-icon>mdi-gesture-double-tap</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Tap Backs</h6>
                            <h3>{{getIgStoryEngagementTapBacks()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of times a viewer rewatched your Story.<br /> Means content is worth re-watching or that it caught a viewer's attention while they were speed tapping</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_tapbacks.png" alt />
                        </div>
                    </v-card>
                </div>
                <div v-if="this.campaign && this.campaign.stories && this.campaign.stories.length > 1" class="text-center col-md-3 col-12">
                    <v-card class="stats audience">
                        <div class="stat-data">
                            <h6>Retention Rate</h6>
                        </div>
                        <div class="progress-bar">
                            <div :style="{ width: getIgStoryRetention() + '%' }" class="progress-bar-completed"></div>
                        </div>
                        <h3>{{getIgStoryRetention()}}%</h3>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How many viewers consumed your entire Story series from beginning to end?</span>
                        </v-tooltip>
                    </v-card>
                </div>
            </div>
        </div>
        <!--
        <div class="type-holder" v-bind:key="i" v-for="(stories, i) in campaign.stories" v-loading="dashboardLoading">
            <div class="headline">
                <span>Instagram Story #{{ (i+1) }} </span>
                <video v-if="stories.media_url && isVideo(stories.media_url)" width="40" height="40" align="center" justify="center">
                    <source :src="stories.media_url" type="video/mp4">
                </video>
                <v-img v-if="stories.media_url && ! isVideo(stories.media_url)" width="40" height="40" :src="stories.media_url"></v-img>
            </div>
            <h4 v-if="stories.error">{{stories.error}}</h4>
            <div class="grid-story-chart">
                <div class="statistic">
                    <v-card v-for="(insight, i) in stories.insights" v-bind:key="i" ml-6 class="text-center mb-6">
                        <h3>{{insight}}</h3>
                        <span>{{ storyLables[i]}}</span>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">mdi-information-outline</v-icon>
                            </template>
                            <span>{{storyLables[i]}}</span>
                        </v-tooltip>
                    </v-card>
                </div>
            </div>
        </div>
        -->
        <span class="content-label px-8">Content</span>
        <div class="row py-20 pl-8">
            <div class="col-md-4 col-12" v-bind:key="i" v-for="(story, i) in campaign.stories" v-loading="dashboardLoading">
                <v-card class="instagram-content" width="90%">
                    <div>
                        <img class="instagram-light" src="@/assets/images/instagram-light.png" />
                    </div>
                    <div class="instagram-content-image">
                        <video controls v-if="story.post_detail && story.post_detail.media_url && isVideo(story.post_detail.media_url)" align="center" justify="center">
                            <source :src="story.post_detail.media_url" type="video/mp4">
                        </video>
                        <img v-if="story.post_detail && story.post_detail.media_url && ! isVideo(story.post_detail.media_url)" :src="story.post_detail.media_url" />
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-eye-outline</v-icon>
                            <span>Impressions</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getIgStoryImpressions(story)}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-send-outline</v-icon>
                            <span>Replies</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getIgStoryReplies(story)}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-gesture-double-tap </v-icon>
                            <span>Tap Backs</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getIgStoryTapBacks(story)}}</span>
                        </div>
                    </div>

                </v-card>
            </div>
        </div>
    </div>

    <!-- Render YouTube-->
    <!-- This is for Instagram Profile section -->
    <div class="instagram-profile" v-if="campaignYtDetail">
        <div class="instagram-info pl-8 pt-8 d-inline-flex justify-space-between align-center">
            <div class="d-flex align-center">
                <v-img class="instagram-info-logo" :src="campaignYtDetail.picture"></v-img>
                <v-img class="instagram-logo" src="@/assets/images/youtube.png" alt></v-img>

                <div style="padding-left:5px;">
                    <h5 class="instagram-name py-0 pl-2">{{campaignYtDetail.name}}</h5>
                    <div class="instagram-followers">
                        <h2 class="py-0 pl-2">{{intToString(campaignYtDetail.subscriberCount)}}</h2>
                        <span class="pl-1">Followers</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="campaign.yt_videos && campaign.yt_videos.length">

        <div class="instagram-title px-8">
            <img class="instagram-logo pr-2" src="@/assets/images/youtube.png" alt />
            <span>YouTube</span>
        </div>
        <div class="awareness px-8">
            <div class="row">
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats impression">
                        <div class="stat-symbol">
                            <v-icon>mdi-eye-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Video Views</h6>
                            <h3>{{getYtTotalViews()}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/ig_awareness_imression.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of times your video was watched.<br /> A YouTube video earns one view when it’s watched for 30 seconds or longer.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats frequncy">
                        <div class="stat-symbol">
                            <v-icon>mdi-clock-time-five-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Avg View Duration</h6>
                            <h3>{{getYtAvgDuration()}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/frequncy_green.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">How long did the average person watch your video?<br /> A higher view duration means YouTube will rank your video higher in searchs and increase the likelihood of appearing in Suggested and Recommended video lists.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats audience">
                        <div class="stat-data">
                            <h6>Audience Viewability</h6>
                        </div>
                        <div class="progress-bar">
                            <div :style="{ width: getYtAudience() + '%' }" class="progress-bar-completed"></div>
                        </div>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How many of your subscribers watched your video?</span>
                        </v-tooltip>
                        <h3>{{getYtAudience()}}%</h3>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats audience">
                        <div class="stat-data">
                            <h6>100% Completion Rate</h6>
                        </div>
                        <div class="progress-bar">
                            <div :style="{ width: getYtCompletion() + '%' }" class="progress-bar-completed"></div>
                        </div>
                        <v-tooltip class="my-tooltip" right>
                            <template v-slot:activator="{ on }">
                                <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                            </template>
                            <span class="tooltip-span">How many users watched above 98% of your video? These are high interest viewers.</span>
                        </v-tooltip>
                        <h3>{{getYtCompletion()}}%</h3>
                    </v-card>
                </div>
                <div class="text-center col-md-9 col-12">
                    <v-card class="chart stats audience">
                        <div style="width: 100%">
                            <div class="row">
                                <div class="title col-md-9">
                                    <h3>
                                        Performance
                                    </h3>
                                    <h6>
                                        See your video views, engagement, and CPM over time
                                    </h6>
                                </div>
                                <div class="col-md-3">
                                    <v-select v-model="ytChartSelected" :items="ytChartItems" @input="ytChartChanged"></v-select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="stat-data col-md-3">
                                    <h6>Views</h6>
                                    <h3>{{getYtTotalViews()}}</h3>
                                </div>
                                <div class="stat-data col-md-3">
                                    <h6>Engagement</h6>
                                    <h3>{{getYtTotalEngagement()}}%</h3>
                                </div>
                                <div class="stat-data col-md-3">
                                    <h6>CPM</h6>
                                    <h3>${{getYtTotalCPM()}}</h3>
                                </div>
                            </div>
                        </div>
                        <line-chart class="chart" id="bar-chart" :label="ytChartSelected" :data="datacollection"></line-chart>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats engagement-rate yt-column">
                        <div class="stat-symbol">
                            <v-icon>mdi-heart-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Engagement Rate</h6>
                            <h3>{{getYtEngagementRate()}}%</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of likes, comments, shares the video received compared to video views.</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_engagement_rate.png" alt />
                        </div>
                    </v-card>
                    <v-card class="stats comments yt-column">
                        <div class="stat-symbol">
                            <v-icon>mdi-thumb-up-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Likes</h6>
                            <h3>{{getYtLikes()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of likes your video received</span>
                            </v-tooltip>
                            <img src="@/assets/images/frequncy_green.png" alt />
                        </div>
                    </v-card>
                    <v-card class="stats reach yt-column">
                        <div class="stat-symbol">
                            <v-icon>mdi-chat-processing-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Comments</h6>
                            <h3>{{getYtComments()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of comments your video received</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_reach.png" alt />
                        </div>
                    </v-card>
                    <v-card class="stats impression yt-column">
                        <div class="stat-symbol">
                            <v-icon>mdi-share-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Shares</h6>
                            <h3>{{getYtShares()}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/ig_awareness_imression.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of shares your video received - reaching new audiences and gaining more views, subscribers, comments, and ultimately increasing your ranking.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                    <v-card class="stats engagement-rate  yt-column">
                        <div class="stat-symbol">
                            <v-icon>mdi-heart-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Card Click</h6>
                            <h3>{{getYtCardClick()}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/ig_engagement_rate.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">The ratio of card impressions to click. Valuable for displaying links to Brand sales page.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
        <!--
        <div class="type-holder" v-bind:key="i" v-for="(video, i) in campaign.yt_videos" v-loading="dashboardLoading">
            <div class="headline">
                <span>Youtube Video #{{ (i+1) }} - {{ video.snippet.title}} </span>

                <v-img v-if="video.snippet && video.snippet.thumbnails 
        && video.snippet.thumbnails.default" :src="video.snippet.thumbnails.default.url" width="40" height="40"></v-img>
            </div>
            <div class="grid-story-chart">
                <div class="statistic">
                    <v-card v-for="(insight, i) in video.insights" v-bind:key="i" ml-6 class="text-center mb-6">
                        <h3>{{insight}}</h3>
                        <span>{{ ytLabels[i] }}</span>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">mdi-information-outline</v-icon>
                            </template>
                            <span>{{ytLabels[i]}}</span>
                        </v-tooltip>
                    </v-card>
                </div>
            </div>
        </div>
        -->
        <span class="content-label px-8">Content</span>
        <div class="row py-20 pl-8">
            <div class="col-md-4 col-12" v-bind:key="i" v-for="(video, i) in campaign.yt_videos" v-loading="dashboardLoading">
                <v-card class="instagram-content" width="90%">
                    <div>
                        <v-icon class="instagram-light">mdi-youtube</v-icon>
                    </div>
                    <div class="instagram-content-image">
                        <img v-if="video.snippet && video.snippet.thumbnails 
        && video.snippet.thumbnails.high" :src="video.snippet.thumbnails.high.url" alt />
                    </div>
                    <div class="instagram-content-caption">
                        <span>{{video.snippet.description}}</span>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-eye-outline</v-icon>
                            <span>Views</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getYtVideoViews(video)}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-thumb-up-outline</v-icon>
                            <span>Likes</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getYtVideoLikes(video)}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-share-outline</v-icon>
                            <span>Shares</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getYtVideoShares(video)}}</span>
                        </div>
                    </div>

                </v-card>
            </div>
        </div>
    </div>
    <!-- END OF YOUTUBE STATISTICS -->

    <!-- Blogs STATISTICS -->
    <div class="instagram-profile" v-if="campaignBlogDetail">
        <div class="instagram-info pl-8 pt-8 d-inline-flex justify-space-between align-center">
            <div class="d-flex align-center">
                <v-img class="instagram-info-logo" :src="campaignBlogDetail.picture"></v-img>
                <v-img class="instagram-logo" src="@/assets/images/analytics.png" alt></v-img>

                <div style="padding-left:5px;">
                    <h5 class="instagram-name py-0 pl-2">{{campaignBlogDetail.name}}</h5>
                    <div class="instagram-followers">
                        <h2 class="py-0 pl-2">{{intToString(campaignBlogDetail['ga:pageviews'])}}</h2>
                        <span class="pl-1">Monthly Pageviews</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="campaign.blog_pages && campaign.blog_pages.length">

        <div class="instagram-title px-8">
            <img class="instagram-logo pr-2" src="@/assets/images/analytics.png" alt />
            <span>Google Analytics</span>
        </div>
        <div class="awareness px-8">
            <div class="row">
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats impression">
                        <div class="stat-symbol">
                            <v-icon>mdi-eye-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Page Views</h6>
                            <h3>{{getBlogsTotalViews()}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/ig_awareness_imression.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of views on a blog post.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats frequncy">
                        <div class="stat-symbol">
                            <v-icon>mdi-clock-time-five-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Time On Page</h6>
                            <h3>{{fancyTimeFormat(getBlogsAvgTime())}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/frequncy_green.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Time spent on blog post page.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats reach">
                        <div class="stat-symbol">
                            <v-icon>mdi-account-circle-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Monthly Unique Users</h6>
                            <h3>{{getBlogsUniqueUsers()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Number of monthly individual users visiting the blog.</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_reach.png" alt />
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats frequncy">
                        <div class="stat-symbol">
                            <v-icon>mdi-thumb-up-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Organic Searches</h6>
                            <h3>{{getBlogsOrganicSearch()}}</h3>
                        </div>
                        <div>
                            <img src="@/assets/images/frequncy_green.png" alt />
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Traffic volume from organic Google search.</span>
                            </v-tooltip>
                        </div>
                    </v-card>
                </div>
                <div class="text-center col-md-9 col-12">
                    <v-card class="chart stats audience">
                        <div style="width: 100%">
                            <div class="row">
                                <div class="title col-md-9">
                                    <h3>
                                        Performance
                                    </h3>
                                    <h6>
                                        See your projected pageviews over time
                                    </h6>
                                </div>
                                <div class="col-md-3">
                                    <v-select v-model="ytChartSelectedBlog" :items="ytChartBlogsItems" @input="ytChartBlogChanged"></v-select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="stat-data col-md-3">
                                    <h6>Page Views</h6>
                                    <h3>{{getBlogsTotalViews()}}</h3>
                                </div>
                                <div class="stat-data col-md-3">
                                    <h6>Organic Searches</h6>
                                    <h3>{{getBlogsOrganicSearch()}}</h3>
                                </div>
                            </div>
                        </div>
                        <line-chart class="chart" id="bar-chart-blog" :label="ytChartSelectedBlog" :data="datacollectionBlog"></line-chart>
                    </v-card>
                </div>
                <div class="text-center col-md-3 col-12">
                    <v-card class="stats reach yt-column">
                        <div class="stat-symbol">
                            <v-icon>mdi-chat-processing-outline</v-icon>
                        </div>
                        <div class="stat-data">
                            <h6>Pages/Session</h6>
                            <h3>{{getBlogsPagesPerSession()}}</h3>
                        </div>
                        <div>
                            <v-tooltip class="my-tooltip" right>
                                <template v-slot:activator="{ on }">
                                    <v-icon class="data-tooltip" v-on="on">mdi-chat-processing-outline</v-icon>
                                </template>
                                <span class="tooltip-span">Total number of likes, comments, shares the video received compared to video views.</span>
                            </v-tooltip>
                            <img src="@/assets/images/ig_awareness_reach.png" alt />
                        </div>
                    </v-card>
                </div>
            </div>
        </div>
        <!--
        <div class="type-holder" v-bind:key="i" v-for="(video, i) in campaign.yt_videos" v-loading="dashboardLoading">
            <div class="headline">
                <span>Youtube Video #{{ (i+1) }} - {{ video.snippet.title}} </span>

                <v-img v-if="video.snippet && video.snippet.thumbnails 
        && video.snippet.thumbnails.default" :src="video.snippet.thumbnails.default.url" width="40" height="40"></v-img>
            </div>
            <div class="grid-story-chart">
                <div class="statistic">
                    <v-card v-for="(insight, i) in video.insights" v-bind:key="i" ml-6 class="text-center mb-6">
                        <h3>{{insight}}</h3>
                        <span>{{ ytLabels[i] }}</span>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">mdi-information-outline</v-icon>
                            </template>
                            <span>{{ytLabels[i]}}</span>
                        </v-tooltip>
                    </v-card>
                </div>
            </div>
        </div>
        -->

        <span class="content-label px-8">Content</span>
        <div class="row py-20 pl-8">
            <div class="col-md-4 col-12" v-bind:key="i" v-for="(blog, i) in campaign.blog_pages" v-loading="dashboardLoading">
                <v-card class="instagram-content" width="90%">
                    <div>
                        <v-icon class="instagram-light">mdi-pencil-outline</v-icon>
                    </div>
                    <div class="instagram-content-image">
                        <img v-if="blog.ogImage && blog.ogImage.url" :src="blog.ogImage.url" alt />
                    </div>
                    <div class="instagram-content-caption">
                        <span>{{blog.insights['ga:pageTitle']}}</span>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-eye-outline</v-icon>
                            <span>Pageviews</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getBlogsPageViews(blog)}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-thumb-up-outline</v-icon>
                            <span>Time On Page</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getBlogsTimeOnPage(blog)}}</span>
                        </div>
                    </div>
                    <div class="instagram-content-stats">
                        <div class="my-col-6">
                            <v-icon>mdi-share-outline</v-icon>
                            <span>Organic Searches</span>
                        </div>
                        <div class="my-col-6">
                            <span class="pull-right">{{getBlogsOrganicSearchByBlog(blog)}}</span>
                        </div>
                    </div>

                </v-card>
            </div>
        </div>
    </div>
    <!--
    <div v-if="campaign && campaign.blog_pages">
        <div class="type-holder" v-bind:key="i" v-for="(blog, i) in campaign.blog_pages" v-loading="dashboardLoading">
            <div class="headline">
                <span>Blog Page #{{ (i+1) }} - {{ blog["insights"]["ga:pageTitle"]}} </span>
            </div>
            <div class="grid-story-chart">
                <div class="statistic">
                    <v-card v-for="(insight, i) in blog.insights" v-bind:key="i" ml-6 height="60" class="text-center mb-6">
                        <h3>{{insight}}</h3>
                        <span>{{ gaLabels[i] }}</span>
                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-icon v-on="on">mdi-information-outline</v-icon>
                            </template>
                            <span>{{ gaLabels[i] }}</span>
                        </v-tooltip>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
    -->
</div>
</template>

<script>
import Logo from "@/assets/images/logo.png";
import LineChart from '@/views/dashboard/widgets/LineChart';

export default {
    name: 'DetailDashboard',
    components: {
        LineChart
    },
    created() {
        //this.getCampaigns();
        if (this.$route.params.id) {
            this.getCampaign(this.$route.params.id)
        }
    },
    methods: {
        isVideo(filename) {
            return /\.mp4/.test(filename)
        },
        intToString(value) {
            var newValue = value;
            if (value >= 1000) {
                var suffixes = ["", "K", "M", "B", "T"];
                var suffixNum = Math.floor(("" + value).length / 3);
                var shortValue = '';
                for (var precision = 2; precision >= 1; precision--) {
                    shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
                    var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                    if (dotLessShortValue.length <= 2) {
                        break;
                    }
                }
                if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
                newValue = shortValue + suffixes[suffixNum];
            }
            return newValue;
        },
        getOverAllPerformance(isIcon = false) {
            let constMul = 2.7;
            let percent = 0;

            if (this.isOnlyBlogs()) {
                let views = this.getBlogsTotalViews();
                let cpm = ((this.campaign.amount / views) * 1000);
                let monthly = this.campaignBlogDetail['ga:pageviews'];
                //(CPM of Overall Website)(budget/monthly account page views) * 1000 ) / 25

                percent = (((this.campaign.amount / monthly) * 1000) / 25);

            } else {
                let isNotOnlyYouTube = this.isIgAndYt();
                if (isNotOnlyYouTube) {
                    if (this.campaignIgDetail) {
                        let campaignYtDetail = this.campaignYtDetail;
                        let followers_count = this.campaignIgDetail.followers_count;

                        let me = this;
                        let likes = this.getIgFeedLikes();
                        let comments = this.getIgFeedEngagementComments();
                        let saves = this.getIgFeedSaves();
                        let replies = 0;
                        let tapbacks = 0;

                        if (this.campaign && this.campaign.stories) {
                            this.campaign.stories.forEach(story => {
                                replies += me.getIgStoryReplies(story);
                                tapbacks += me.getIgStoryTapBacks(story);
                            });
                        }

                        let totalImpression = this.getOverallImpressions();
                        let er = 0;
                        let wer = 0;
                        let cpm = 0;

                        er = (likes + comments + replies + tapbacks + saves) / totalImpression;
                        wer = ((likes * .5) + (comments * 3) + (tapbacks * 3) + +(replies * 5) + (saves * 5)) / totalImpression;

                        if (totalImpression) {
                            cpm = (this.campaign.amount / totalImpression) * 1000;

                            // If only IG feeds are there

                            if (!campaignYtDetail) {
                                if (followers_count < 9999) {
                                    //"er= engagement rate = (likes + comments + replies + taps back + post saves) / total campaign impressions
                                    //wer = weighted engagement rate =  ((Likes*.3) + (Taps back *2) + (comments *1) + (replies *2.5) + (post saves *3) / total campaign impressions
                                    //cpm = cpm"

                                    //return (.33 * (ER/4)) + (.33 * (WER/7)) + (.33 * 24/CPM)

                                    percent = ((0.33 * (((likes + comments + replies + tapbacks + saves) / followers_count) / 0.02)) + (0.33 * (wer / 0.04)) + (0.33 * (48 / cpm))) * 100;

                                } else if (followers_count > 10000 && followers_count < 50001) {
                                    // "er= engagement rate = (likes + comments + replies + taps back + post saves) / total campaign impressions
                                    //wer = weighted engagement rate =  ((Likes*.3) + (Taps back *2) + (comments *1) + (replies *2.5) + (post saves *3) / total campaign impressions
                                    //cpm = cpm"

                                    //(.33 * (ER/2)) + (.33 * (WER/8)) + (.33 * 33/CPM)

                                    percent = ((0.33 * (((likes + comments + replies + tapbacks + saves) / followers_count) / 0.01)) + (0.33 * (wer / 0.02)) + (0.33 * (48 / cpm))) * 100;

                                } else {
                                    //  "er= engagement rate = (likes + comments + replies + taps back + post saves) / total campaign impressions
                                    // wer = weighted engagement rate =  ((Likes*.3) + (Taps back *2) + (comments *1) + (replies *2.5) + (post saves *3) / total campaign impressions
                                    // cpm = cpm"

                                    // (.33 * (ER/1)) + (.33 * (WER/4)) + (.33 * 38/CPM)

                                    percent = ((0.33 * (((likes + comments + replies + tapbacks + saves) / followers_count) / 0.005)) + (0.33 * (wer / 0.02)) + (0.33 * (48 / cpm))) * 100;

                                }
                            } else {
                                // If both IG and YouTube are there
                                let likesYT = this.getYtLikes();
                                let commentsYT = this.getYtComments();
                                let sharesYT = this.getYtShares();
                                let viewsYT = this.getYtTotalViews();

                                let followers_countYT = this.campaignYtDetail.subscriberCount;
                                let avgViewPercentageYT = this.getYtAvgCompletion() / 100;
                                let cpmYT = this.getYtTotalCPM();
                                //"er = engagement rate = (likes + comments + shares) / video views * 100 
                                //avp = average_view_duration_percentage from YouTube API / 100
                                //cpm = cpm"
                                let erYT = 0;
                                let avpYT = 0;

                                erYT = ((likesYT + commentsYT + sharesYT) / viewsYT) * 100;
                                avpYT = parseFloat(avgViewPercentageYT);

                                // "{(.33 * (ER/2)) + (.33 * (WER/8)) + (.33 * 33/CPM)} + {(.33 * (ER/5)) + (.33 * (AVP/.6)) + (.33 * 35/CPM)} / 2
                                // ={((0.5*((B150*1+B151*3+B152*5)/B153)/0.03)+(0.5*(B154/0.6)))*100}+{(0.33 * (((B114 + B115 + B118 + B116 + B117)/B126)/0.02) + (0.33 * (((B114 * 0.5 + B115 * 3 + B118 * 5 + B116 * 5 + B117 * 3)/B119)/0.04) + (0.33 * (48/((B124/B119) * 1000)))))*100} /2
                                percent = (((0.5 * ((likesYT * 1 + commentsYT * 3 + sharesYT * 5) / viewsYT) / 0.03) + (0.5 * (avpYT / 0.6)))) +
                                    ((0.33 * (((likes + comments + replies + tapbacks + saves) / followers_count) / 0.02) + (0.33 * (((likes * 0.5 + comments * 3 + saves * 5 + replies * 5 + tapbacks * 3) / totalImpression) / 0.04) + (0.33 * (48 / ((this.campaign.amount / totalImpression) * 1000))))) * 100) / 2

                                // percent = ((.33 * (er / 2)) + (.33 * (wer / 8)) + (.33 * 33 / cpm) + (.33 * (erYT / 5)) + (.33 * (avpYT / .6)) + (.33 * 35 / cpmYT)) / 2;
                            }
                        }
                    }
                } else {
                    if (this.campaignYtDetail) {
                        let likes = this.getYtLikes();
                        let comments = this.getYtComments();
                        let shares = this.getYtShares();
                        let views = this.getYtTotalViews();

                        let followers_count = this.campaignYtDetail.subscriberCount;
                        let avgViewPercentage = parseFloat(this.getYtAvgCompletion());
                        let cpm = this.getYtTotalCPM();
                        //"er = engagement rate = (likes + comments + shares) / video views * 100 
                        //avp = average_view_duration_percentage from YouTube API / 100
                        //cpm = cpm"
                        let er = 0;
                        let avp = 0;

                        er = ((likes + comments + shares) / views) * 100;
                        avp = avgViewPercentage;
                        if (followers_count < 9999) {
                            //(.33 * (ER/7)) + (.33 * (AVP/.6)) + (.33 * 35/CPM)
                            //percent = ((.33 * (er / 7)) + (.33 * (avp / .6)) + (.33 * 35 / cpm));
                            percent = ((0.5 * ((likes * 1 + comments * 3 + shares * 5) / views) / 0.04) + (0.5 * (avgViewPercentage / 100 * 0.6)));
                        } else if (followers_count >= 10000 && followers_count < 50000) {
                            //(.33 * (ER/5)) + (.33 * (AVP/.6)) + (.33 * 35/CPM)
                            //percent = ((.33 * (er / 5)) + (.33 * (avp / .6)) + (.33 * 35 / cpm));
                            percent = ((0.5 * ((likes * 1 + comments * 3 + shares * 5) / views) / 0.03) + (0.5 * (avgViewPercentage / 100 * 0.6)));
                        } else {
                            //(.33 * (ER/4)) + (.33 * (AVP/.6)) + (.33 * 35/CPM)
                            //percent = ((.33 * (er / 4)) + (.33 * (avp / .6)) + (.33 * 35 / cpm));
                            percent = ((0.5 * ((likes * 1 + comments * 3 + shares * 5) / views) / 0.02) + (0.5 * (avgViewPercentage /100 * 0.6)));
                        }

                    }
                }
            }

            if (isIcon) {
                if (percent > 100) {
                    percent = 100;
                }
                if (percent < 0) {
                    percent = 0;
                }
                return `rotate(${-135 + (constMul * percent)}deg)`;
            } else {
                return percent.toFixed(2);
            }
        },
        isIgAndYt() {
            if (this.campaign) {
                if ((this.campaign.posts && this.campaign.posts.length == 0) && (this.campaign.stories && this.campaign.stories.length == 0) && (this.campaign.yt_videos && this.campaign.yt_videos.length > 0)) {
                    return false;
                }
            }
            return true;
        },
        isOnlyBlogs() {
            if (this.campaign) {
                if ((this.campaign.posts && this.campaign.posts.length == 0) && (this.campaign.stories && this.campaign.stories.length == 0) && (this.campaign.yt_videos && this.campaign.yt_videos.length == 0)) {
                    if (this.campaign.blog_pages && this.campaign.blog_pages.length > 0) {
                        return true;
                    }
                }
            }
            return false;
        },
        getOverallPageViews() {
            return this.getBlogsTotalViews();
        },
        getOverallImpressions() {
            return this.getIgFeedImpression() + this.getIgStoryImpression();
        },
        getOverallEngagement() {
            let me = this;
            let isNotOnlyYouTube = this.isIgAndYt();
            if (isNotOnlyYouTube) {

                if (this.campaign && this.campaignIgDetail) {
                    let likes = this.getIgFeedLikes();
                    let comments = this.getIgFeedEngagementComments();
                    let saves = this.getIgFeedSaves();
                    let replies = 0;
                    let tapbacks = 0;

                    if (this.campaign && this.campaign.stories) {
                        this.campaign.stories.forEach(story => {
                            replies += me.getIgStoryReplies(story);
                            tapbacks += me.getIgStoryTapBacks(story);
                        });
                    }

                    let totalImpression = this.getOverallImpressions();

                    if (totalImpression) {
                        return (((likes + comments + saves + replies + tapbacks) / totalImpression) * 100).toFixed(2);
                    }
                }
            } else {
                let likes = this.getYtLikes();
                let comments = this.getYtComments();
                let shares = this.getYtShares();
                let views = this.getYtTotalViews();
                if (views) {
                    return (((likes + comments + shares) / views) * 100).toFixed(2);
                }

            }
            return 0;
        },
        getOverallEarnedMediaValue() {
            if (this.campaign) {
                if (this.isOnlyBlogs()) {
                    let views = this.getBlogsTotalViews();
                    return (views * 35 * 0.01).toFixed(2);
                } else {
                    let isNotOnlyYouTube = this.isIgAndYt();
                    if (isNotOnlyYouTube) {
                        let postEarnMV = this.getIgFeedReach();
                        let storyEarnMV = this.getIgStoryReach();

                        return ((postEarnMV + storyEarnMV) * 33 * 0.01).toFixed(2);
                    } else {
                        let views = this.getYtTotalViews();
                        return (views * 35 * 0.01).toFixed(2);
                    }
                }

            }
            return 0;
        },
        getOverallCPM() {
            if (this.campaign) {
                if (this.isOnlyBlogs()) {
                    let views = this.getBlogsTotalViews();
                    return ((this.campaign.amount / views) * 1000).toFixed(2);
                } else {
                    let isNotOnlyYouTube = this.isIgAndYt();
                    if (isNotOnlyYouTube) {
                        let impressions = this.getOverallImpressions();
                        if (impressions) {
                            return ((this.campaign.amount / impressions) * 1000).toFixed(2);
                        }
                    } else {
                        return this.getYtTotalCPM();
                    }
                }
            }
            return 0;
        },
        getOverallPayPerImpression() {
            if (this.campaign) {
                let isNotOnlyYouTube = this.isIgAndYt();
                if (isNotOnlyYouTube) {
                    let impressions = this.getOverallImpressions();
                    if (impressions) {
                        return ((this.campaign.amount / impressions)).toFixed(2);
                    }
                } else {
                    let views = this.getYtTotalViews();
                    return ((this.campaign.amount / views)).toFixed(2);
                }
            }
            return 0;
        },
        getOverallPayPerEngagement() {
            let isNotOnlyYouTube = this.isIgAndYt();
            if (isNotOnlyYouTube) {
                if (this.campaign && this.campaignIgDetail) {
                    let me = this;
                    let likes = this.getIgFeedLikes();
                    let comments = this.getIgFeedEngagementComments();
                    let saves = this.getIgFeedSaves();
                    let replies = 0;
                    let tapbacks = 0;

                    if (this.campaign && this.campaign.stories) {
                        this.campaign.stories.forEach(story => {
                            replies += me.getIgStoryReplies(story);
                            tapbacks += me.getIgStoryTapBacks(story);
                        });
                    }
                    let total = likes + comments + saves + replies + tapbacks;
                    if (total) {
                        return (this.campaign.amount / total).toFixed(2);
                    }
                }
            } else {
                if (this.campaign && this.campaignYtDetail) {
                    let likes = this.getYtLikes();
                    let comments = this.getYtComments();
                    let shares = this.getYtShares();
                    let total = likes + comments + shares;
                    if (total) {
                        return (this.campaign.amount / total).toFixed(2);
                    }
                }
            }
            return 0;
        },
        getOverallPayPerPageview() {
            if (this.isOnlyBlogs()) {
                let views = this.getBlogsTotalViews();
                return ((this.campaign.amount / views)).toFixed(2);
            }
        },
        getIgPostSaves(post) {
            if (post.insights && post.insights.length) {
                let saved = post.insights.find(x => x.name == "saved");
                if (saved && saved.values && saved.values, length) {
                    return saved.values[0].value;
                }
            }
            return 0;
        },
        getIgStoryImpressions(story) {
            if (story && story.insights) {
                return story.insights.impressions || 0;
            }
            return 0;
        },
        getIgStoryReplies(story) {
            if (story && story.insights) {
                return story.insights.replies || 0;
            }
            return 0;
        },
        getIgStoryTapBacks(story) {
            if (story && story.insights) {
                return story.insights.taps_back || 0;
            }
            return 0;
        },
        getIgFeedImpression() {
            if (this.campaign && this.campaign.posts && this.campaign.posts.length) {
                let impression = 0;
                this.campaign.posts.forEach(post => {
                    let impressPost = post.insights.find(x => x.name == "impressions");
                    if (impressPost && impressPost.values && impressPost.values.length) {
                        impression += impressPost.values[0].value;
                    }
                });
                return impression;
            }
            return 0;
        },
        getIgFeedReach() {
            if (this.campaign && this.campaign.posts && this.campaign.posts.length) {
                let reach = 0;
                this.campaign.posts.forEach(post => {
                    let reachPost = post.insights.find(x => x.name == "reach");
                    if (reachPost && reachPost.values && reachPost.values.length) {
                        reach += reachPost.values[0].value;
                    }
                });
                return reach;
            }
            return 0;
        },
        getIgFeedFrequency() {
            let impression = this.getIgFeedImpression();
            let reach = this.getIgFeedReach();
            if (impression && reach) {
                return (impression / reach).toFixed(2);
            }
            return 0;
        },
        getIgFeedAudience() {
            let reach = this.getIgFeedReach();
            if (this.campaignIgDetail) {
                let followers_count = this.campaignIgDetail.followers_count;
                if (reach && followers_count) {
                    return ((reach / followers_count) * 100).toFixed(2);
                }
            }
            return 0;
        },
        getIgFeedEngagementRate() {
            let me = this;
            let engagement_rate = 0;

            this.campaign.posts.forEach(post => {
                if (post.post_detail) {
                    engagement_rate += post.post_detail.like_count;
                    engagement_rate += post.post_detail.comments_count;
                }
                engagement_rate += me.getIgPostSaves(post);
            });

            if (this.campaignIgDetail) {
                let followers_count = this.campaignIgDetail.followers_count;
                return ((engagement_rate / followers_count) * 100).toFixed(2);
            }

            return 0;
        },
        getIgFeedPostEngagementRate() {
            let me = this;
            let engagement_rate = 0;

            this.campaign.posts.forEach(post => {
                if (post.post_detail) {
                    engagement_rate += post.post_detail.like_count;
                    engagement_rate += post.post_detail.comments_count;
                }
                engagement_rate += me.getIgPostSaves(post);
            });

            let reach = this.getIgFeedReach();
            if (reach) {
                return ((engagement_rate / reach) * 100).toFixed(2);
            }

            return 0;
        },
        getIgFeedLikes() {
            let total = 0;
            this.campaign.posts.forEach(post => {
                if (post.post_detail) {
                    total += post.post_detail.like_count;
                }
            });
            return total;
        },
        getIgFeedSaves() {
            let saves = 0;
            let me = this;
            this.campaign.posts.forEach(post => {
                saves += me.getIgPostSaves(post);
            });

            return saves;
        },
        getIgFeedEngagementComments() {
            let comments = 0;
            this.campaign.posts.forEach(post => {
                if (post.post_detail) {
                    comments += post.post_detail.comments_count;
                }
            });

            return comments;
        },
        getIgFeedEngagementSaves() {
            let me = this;

            let save_rate = 0;
            let saves = 0;

            this.campaign.posts.forEach(post => {
                saves += me.getIgPostSaves(post);
            });
            let reach = this.getIgFeedReach();

            if (saves && reach) {
                return ((saves / reach) * 100).toFixed(2);
            }

            return 0;
        },
        getIgStoryImpression() {
            if (this.campaign && this.campaign.stories && this.campaign.stories.length) {
                let impression = 0;
                this.campaign.stories.forEach(story => {
                    if (story.insights) {
                        impression += story.insights.impressions;
                    }
                });
                return impression;
            }
            return 0;
        },
        getIgStoryReach() {
            if (this.campaign && this.campaign.stories && this.campaign.stories.length) {
                let reach = 0;
                this.campaign.stories.forEach(story => {
                    if (story.insights) {
                        reach += story.insights.reach;
                    }
                });
                return reach;
            }
            return 0;
        },
        getIgStoryFrequency() {
            let impression = this.getIgStoryImpression();
            let reach = this.getIgStoryReach();
            if (impression && reach) {
                return (impression / reach).toFixed(2);
            }
            return 0;
        },
        getIgStoryAudience() {
            let reach = this.getIgStoryReach();
            if (this.campaignIgDetail) {
                let followers_count = this.campaignIgDetail.followers_count;
                if (reach && followers_count) {
                    return ((reach / followers_count) * 100).toFixed(2);
                }
            }
            return 0;
        },
        getIgStoryEngagementRate() {
            let me = this;

            let impressions = 0;
            let replies = 0;
            let tapbacks = 0;

            this.campaign.stories.forEach(story => {
                if (story.insights) {
                    impressions += story.insights.impressions || 0;
                }
                replies += me.getIgStoryReplies(story);
                tapbacks += me.getIgStoryTapBacks(story);
            });

            if (impressions) {
                return (((replies + tapbacks) / impressions) * 100).toFixed(2);
            }

            return 0;
        },
        getIgStoryEngagementReplies() {
            let me = this;

            let replies = 0;
            this.campaign.stories.forEach(story => {
                replies += me.getIgStoryReplies(story);
            });

            return replies;
        },
        getIgStoryEngagementTapBacks() {
            let me = this;

            let taps = 0;
            this.campaign.stories.forEach(story => {
                taps += me.getIgStoryTapBacks(story);
            });

            return taps;
        },
        getIgStoryRetention() {
            if (this.campaign.stories && this.campaign.stories.length) {
                let total = this.campaign.stories.length;
                let last = this.campaign.stories[total - 1];
                let first = this.campaign.stories[0];
                if (first.insights && last.insights) {
                    return ((last.insights.impressions / first.insights.impressions) * 100).toFixed(2);
                }
            }
            return 0;
        },
        getYtVideoViews(video) {
            if (video && video.insights) {
                return parseInt(video.insights.viewCount);
            }
            return 0;
        },
        getYtVideoLikes(video) {
            if (video && video.insights) {
                return parseInt(video.insights.likeCount);
            }
            return 0;
        },
        getYtVideoShares(video) {
            let totalShares = 0;
            if (video.analytics && video.analytics.columnHeaders) {
                let avgAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "shares");
                if (avgAtIndex != -1) {
                    video.analytics.rows.forEach(row => {
                        totalShares += parseInt(row[avgAtIndex]);
                    });
                }
            }
            return totalShares;
        },

        getYtTotalViews() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let viewCnt = 0;
                this.campaign.yt_videos.forEach((video) => {
                    viewCnt += parseInt(video.insights.viewCount);
                });
                return viewCnt;
            }
            return 0;
        },
        getYtTotalEngagement() {
            return this.getYtEngagementRate()
        },
        getYtTotalCPM() {
            let views = this.getYtTotalViews();
            if (views) {
                return ((this.campaign.amount / views) * 1000).toFixed(2);
            }

            return 0;
        },
        getYtAvgDuration() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let avgTimeTotal = 0;
                this.campaign.yt_videos.forEach((video) => {
                    let found = 0;
                    let avgTime = 0;
                    if (video.analytics && video.analytics.columnHeaders) {
                        let avgAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "averageViewDuration");
                        if (avgAtIndex != -1) {
                            video.analytics.rows.forEach(row => {
                                if (parseInt(row[avgAtIndex])) {
                                    found++;
                                    avgTime += parseInt(row[avgAtIndex]);
                                }
                            });
                        }
                    }
                    avgTime = avgTime / found;
                    avgTimeTotal = avgTime;
                });
                return this.fancyTimeFormat(avgTimeTotal);
            }

            return 0;
        },
        getYtAudience() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length && this.campaign.yt_videos[0].account_detail) {
                let totalViews = this.getYtTotalViews();
                let subscriber = parseInt(this.campaign.yt_videos[0].account_detail.subscriberCount);
                return ((totalViews / subscriber) * 100).toFixed(2);
            }

            return 0;
        },
        getYtAvgCompletion() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let avgViewPer = 0;

                this.campaign.yt_videos.forEach((video) => {
                    if (video.analytics && video.analytics.columnHeaders) {
                        let avgAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "averageViewPercentage");
                        let viewAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "views");

                        if (avgAtIndex != -1) {
                            video.analytics.rows.forEach(row => {
                                avgViewPer += row[avgAtIndex];
                            });
                            avgViewPer = avgViewPer / video.analytics.rows.length;
                        }
                    }
                });
                return avgViewPer.toFixed(2);
            }
            return 0;

        },
        getYtCompletion() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let view = this.getYtTotalViews() || 1;
                let almostView = 0;

                this.campaign.yt_videos.forEach((video) => {
                    if (video.analytics && video.analytics.columnHeaders) {
                        let avgAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "averageViewPercentage");
                        let viewAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "views");

                        if (avgAtIndex != -1 && viewAtIndex != -1) {
                            video.analytics.rows.forEach(row => {
                                if (parseInt(row[avgAtIndex]) >= 98) {
                                    almostView += parseInt(row[viewAtIndex]);
                                }
                            });
                        }
                    }
                });
                return ((almostView / view) * 100).toFixed(2);
            }
            return 0;
        },
        getYtEngagementRate() {
            let likes = this.getYtLikes();
            let comments = this.getYtComments();
            let shares = this.getYtShares();
            let views = this.getYtTotalViews();

            if (views) {
                return (((likes + comments + shares) / views) * 100).toFixed(2);
            }
            return 0;
        },
        getYtLikes() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let cnt = 0;
                this.campaign.yt_videos.forEach((video) => {
                    cnt += parseInt(video.insights.likeCount);
                });
                return cnt;
            }
            return 0;
        },
        getYtComments() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let cnt = 0;
                this.campaign.yt_videos.forEach((video) => {
                    cnt += parseInt(video.insights.commentCount);
                });
                return cnt;
            }
            return 0;
        },
        getYtShares() {
            let me = this;

            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let totalShares = 0;
                this.campaign.yt_videos.forEach((video) => {
                    totalShares += me.getYtVideoShares(video);
                });
                return totalShares;
            }
            return 0;
        },
        getYtCardClick() {
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let cardClick = 0;
                this.campaign.yt_videos.forEach((video) => {
                    if (video.analytics && video.analytics.columnHeaders) {
                        let cardAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "cardClickRate");
                        if (cardAtIndex != -1) {
                            video.analytics.rows.forEach(row => {
                                if (parseInt(row[cardAtIndex])) {
                                    cardClick += parseInt(row[cardAtIndex]);
                                }
                            });
                        }
                    }
                });
                return cardClick;
            }
            return 0;
        },
        getYtProjectedViews() {
            let me = this;
            if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                let views = 0;
                this.campaign.yt_videos.forEach((video) => {
                    if (video.analytics && video.analytics.columnHeaders) {
                        let dateAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "day");
                        let viewAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "views");
                        if (viewAtIndex != -1) {
                            let length = video.analytics.rows.length;
                            let startIndex = 0;
                            let endIndex = length - 1;
                            if (length > 90) {
                                startIndex = endIndex - 90;
                                length = 90;
                            }
                            let start = video.analytics.rows[startIndex][dateAtIndex];
                            let end = video.analytics.rows[endIndex][dateAtIndex];
                            let projectedRecords = me.findProjection(length, start, end, dateAtIndex, video.analytics.rows);
                            projectedRecords.forEach(row => {
                                if (parseInt(row[viewAtIndex])) {
                                    views += parseInt(row[viewAtIndex]);
                                }
                            });
                        }
                    }
                });
                return views;
            }
            return 0;
        },
        findProjection(length, start, end, dateAtIndex, rows) {
            let total = length;
            let coeff = 1;
            while (total < 90) {
                let dataAt = total % length;
                coeff = parseInt(total / length);
                let date = new Date(rows[dataAt][dateAtIndex]);
                date.setDate(date.getDate() + (length * coeff));
                date = date.toISOString().substring(0, 10);
                let record = [...rows[dataAt]];
                record[dateAtIndex] = date;
                rows.push(record);
                total++;
            }
            return rows;
        },
        findProjectionBlog(length, start, end, dateAtIndex, rows) {
            if (start.length == 8) {
                start = start.slice(0, 4) + "-" + start.slice(4, 6) + "-" + start.slice(6, 8);
            }
            if (end.length == 8) {
                end = end.slice(0, 4) + "-" + end.slice(4, 6) + "-" + end.slice(6, 8);
            }
            let total = length;
            let coeff = 1;
            while (total < 90) {
                let dataAt = total % length;
                coeff = parseInt(total / length);
                let rowDate = rows[dataAt][dateAtIndex];
                if (rowDate.length == 8) {
                    rowDate = rowDate.slice(0, 4) + "-" + rowDate.slice(4, 6) + "-" + rowDate.slice(6, 8);
                }
                let date = new Date(rowDate);
                date.setDate(date.getDate() + (length * coeff));
                date = date.toISOString().substring(0, 10);
                let record = [...rows[dataAt]];
                record[dateAtIndex] = date;
                rows.push(record);
                total++;
            }
            return rows;
        },
        async ytChartChanged() {
            this.campaignYtChart();
        },
        async ytChartBlogChanged() {
            this.campaignYtChartBlogs();
        },
        getBlogsTotalViews() {
            if (this.campaign.blog_pages && this.campaign.blog_pages.length) {
                let views = 0;
                this.campaign.blog_pages.forEach((blog) => {
                    if (blog.insight_detail && blog.insight_detail.columnHeaders) {
                        views += parseInt(blog.insight_detail.totalsForAllResults['ga:pageviews'])
                        // let viewAtIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:pageviews");
                        // if (viewAtIndex != -1) {
                        //     blog.insight_detail.rows.forEach(row => {
                        //         if (parseInt(row[viewAtIndex])) {
                        //             views += parseInt(row[viewAtIndex]);
                        //         }
                        //     });
                        // }
                    }
                });
                return views;
            }
            return 0;
        },
        getBlogsAvgTime() {
            if (this.campaign.blog_pages && this.campaign.blog_pages.length) {
                let time = 0;
                this.campaign.blog_pages.forEach((blog) => {
                    if (blog.insight_detail && blog.insight_detail.columnHeaders) {
                        time += parseInt(blog.insight_detail.totalsForAllResults['ga:avgTimeOnPage']);
                        // let viewAtIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:avgTimeOnPage");
                        // if (viewAtIndex != -1) {
                        //     blog.insight_detail.rows.forEach(row => {
                        //         if (parseInt(row[viewAtIndex])) {
                        //             time += parseInt(row[viewAtIndex]);
                        //         }
                        //     });
                        // }
                    }
                });
                return time;
            }
            return 0;
        },
        getBlogsUniqueUsers() {
            if (this.campaign.blog_pages && this.campaign.blog_pages.length) {
                let users = 0;
                this.campaign.blog_pages.forEach((blog) => {
                    if (blog.insight_detail && blog.insight_detail.columnHeaders) {
                        users += parseInt(blog.insight_detail.totalsForAllResults['ga:newUsers']);

                        // let viewAtIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:newUsers");
                        // if (viewAtIndex != -1) {
                        //     blog.insight_detail.rows.forEach(row => {
                        //         if (parseInt(row[viewAtIndex])) {
                        //             users += parseInt(row[viewAtIndex]);
                        //         }
                        //     });
                        // }
                    }
                });
                return users;
            }
            return 0;
        },
        getBlogsOrganicSearch() {
            if (this.campaign.blog_pages && this.campaign.blog_pages.length) {
                let users = 0;
                this.campaign.blog_pages.forEach((blog) => {
                    if (blog.insight_detail && blog.insight_detail.columnHeaders) {
                        users += parseInt(blog.insight_detail.totalsForAllResults['ga:organicSearches']);

                        // let viewAtIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:organicSearches");
                        // if (viewAtIndex != -1) {
                        //     blog.insight_detail.rows.forEach(row => {
                        //         if (parseInt(row[viewAtIndex])) {
                        //             users += parseInt(row[viewAtIndex]);
                        //         }
                        //     });
                        // }
                    }
                });
                return users;
            }
            return 0;
        },
        getBlogsPagesPerSession() {
            if (this.campaign.blog_pages && this.campaign.blog_pages.length) {
                let users = 0;
                this.campaign.blog_pages.forEach((blog) => {
                    if (blog.insight_detail && blog.insight_detail.columnHeaders) {
                        let viewAtIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:ga:sessions");
                        if (viewAtIndex != -1) {
                            blog.insight_detail.rows.forEach(row => {
                                if (parseInt(row[viewAtIndex])) {
                                    users += parseInt(row[viewAtIndex]);
                                }
                            });
                        }
                    }
                });
                return users;
            }
            return 0;
        },
        getBlogsPageViews(blog) {
            if (blog && blog.insight_detail) {
                return blog.insight_detail.totalsForAllResults['ga:pageviews'];
            }
            return 0;
        },
        getBlogsTimeOnPage(blog) {
            if (blog && blog.insight_detail) {
                return this.fancyTimeFormat(blog.insight_detail.totalsForAllResults['ga:timeOnPage']);
            }
            return 0;

        },
        getBlogsOrganicSearchByBlog(blog) {
            if (blog && blog.insight_detail) {
                return blog.insight_detail.totalsForAllResults['ga:organicSearches'];
            }
            return 0;

        },

        fancyTimeFormat(duration) {
            // Hours, minutes and seconds
            var hrs = ~~(duration / 3600);
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },
        async getVideosWithStatistics() {
            if (
                this.campaign &&
                this.campaign.yt_videos &&
                this.campaign.yt_videos.length
            ) {
                this.campaign.yt_videos.forEach(async (item) => {
                    try {
                        console.log(item);
                        let response = await this.$http.get(
                            `/auth/get-ytvideodetail/${this.user._id}/${item.contentDetails.videoId}`
                        );
                        if (response.data && response.data.data)
                            this.videoStatistics.push(response.data.data.items[0]);
                    } catch (error) {
                        console.log(error);
                        alert("Error Fetching YouTube Statistics");
                    }
                });
            }
        },

        async gapiAuthInit() {
            await this.$store.dispatch("youtubeModule/gapiAuthInit");
        },

        async getCampaign(id) {
            let vm = this;

            try {
                await this.$store.dispatch("campaignsModule/fetchCampaign", id);
            } catch (e) {
                this.dashboardLoading = false;
                console.log(e);
            }
            this.dashboardLoading = false;
        },
        campaignYtChart() {
            let me = this;
            me.datacollection = {
                labels: [],
                datasets: [{
                    backgroundColor: 'rgba(54, 154, 254,0.5)',
                    data: []
                }]
            };
            if (this.campaign.yt_videos.length) {
                this.campaign.yt_videos.forEach((video, index) => {
                    if (video && video.analytics) {
                        let dayIndex = video.analytics.columnHeaders.findIndex(x => x.name == "day");
                        let viewIndex = video.analytics.columnHeaders.findIndex(x => x.name == "views");
                        let dateAtIndex = video.analytics.columnHeaders.findIndex(x => x.name == "day");

                        if (dayIndex != -1) {
                            let length = video.analytics.rows.length;
                            let startIndex = 0;
                            let endIndex = length - 1;
                            if (length > 90) {
                                startIndex = endIndex - 90;
                                length = 90;
                            }
                            let start = video.analytics.rows[startIndex][dateAtIndex];
                            let end = video.analytics.rows[endIndex][dateAtIndex];
                            let projectedRecords = me.findProjection(length, start, end, dateAtIndex, video.analytics.rows);

                            video.analytics.rows.forEach(row => {
                                if (!me.datacollection.datasets[index])
                                    me.datacollection.datasets[index] = {
                                        data: []
                                    };
                                let lbl = me.getChartDateShort(row[dayIndex]);
                                if (me.datacollection.labels.findIndex(x => x == lbl) == -1) {
                                    me.datacollection.labels.push(lbl);
                                }
                                me.datacollection.datasets[index].data.push(me.getChartYAxesData(video.analytics.columnHeaders, row));
                                me.datacollection.datasets[index].label = video.snippet.title;
                            });
                        }
                    }
                });
            }

            return 0;
        },
        getChartYAxesData(headers, row) {
            if (this.ytChartSelected == "CPM") {
                let viewIndex = headers.findIndex(x => x.name == "views");
                if (row[viewIndex]) {
                    return ((this.campaign.amount / row[viewIndex]) * 1000).toFixed(2);
                }
                return 0;
            } else if (this.ytChartSelected == "Engagement") {

                let likeIndex = headers.findIndex(x => x.name == "likes");
                let commentIndex = headers.findIndex(x => x.name == "comments");
                let shareIndex = headers.findIndex(x => x.name == "shares");
                let viewIndex = headers.findIndex(x => x.name == "views");

                if (row[viewIndex]) {
                    return (((row[likeIndex] + row[commentIndex] + row[shareIndex]) / row[viewIndex]) * 100).toFixed(2);
                }
                return 0;
            } else {
                let viewIndex = headers.findIndex(x => x.name == "views");
                return row[viewIndex];
            }
        },
        campaignYtChartBlogs() {
            let me = this;
            me.datacollectionBlog = {
                labels: [],
                datasets: [{
                    backgroundColor: 'rgba(54, 154, 254,0.5)',
                    data: []
                }]
            };
            if (this.campaign.blog_pages.length) {
                this.campaign.blog_pages.forEach((blog, index) => {
                    if (blog && blog.insight_detail) {
                        let dayIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:date");
                        let viewIndex = blog.insight_detail.columnHeaders.findIndex(x => x.name == "ga:pageviews");

                        if (dayIndex != -1) {
                            let length = blog.insight_detail.rows.length;
                            let startIndex = 0;
                            let endIndex = length - 1;
                            if (length > 90) {
                                startIndex = endIndex - 90;
                                length = 90;
                            }
                            let start = blog.insight_detail.rows[startIndex][dayIndex];
                            let end = blog.insight_detail.rows[endIndex][dayIndex];
                            let projectedRecords = me.findProjectionBlog(length, start, end, dayIndex, blog.insight_detail.rows);

                            blog.insight_detail.rows.forEach(row => {
                                if (!me.datacollectionBlog.datasets[index])
                                    me.datacollectionBlog.datasets[index] = {
                                        data: []
                                    };
                                let lbl = me.getChartDateShort(row[dayIndex]);
                                if (me.datacollectionBlog.labels.findIndex(x => x == lbl) == -1) {
                                    me.datacollectionBlog.labels.push(lbl);
                                }
                                me.datacollectionBlog.datasets[index].data.push(me.getChartYAxesDataBlog(blog.insight_detail.columnHeaders, row));
                                me.datacollectionBlog.datasets[index].label = blog.insights["ga:pageTitle"];
                            });
                        }
                    }
                });
            }

            return 0;
        },
        getChartYAxesDataBlog(headers, row) {
            if (this.ytChartSelectedBlog == 'Page Views') {
                let viewIndex = headers.findIndex(x => x.name == "ga:pageviews");
                if (row[viewIndex]) {
                    return row[viewIndex];
                }
                return 0;
            } else {
                let viewIndex = headers.findIndex(x => x.name == "ga:organicSearches");
                return row[viewIndex];
            }
        },
        getChartDateShort(dateStr) {
            if (dateStr.length == 8) {
                dateStr = dateStr.slice(0, 4) + "-" + dateStr.slice(4, 6) + "-" + dateStr.slice(6, 8);
            }
            let month = new Date(dateStr).toLocaleString('default', {
                month: 'short'
            });
            let date = new Date(dateStr).getDate();

            return month + " " + date;

        },

    },
    computed: {
        campaigns() {
            return this.$store.getters["campaignsModule/getCampaigns"];
        },
        campaign() {
            return this.$store.getters["campaignsModule/getCampaign"];
        },
        campaignIgDetail() {
            if (this.campaign) {
                if (this.campaign.posts && this.campaign.posts.length) {
                    return this.campaign.posts[0].account_detail;
                }
                if (this.campaign.stories && this.campaign.stories.length) {
                    return this.campaign.stories[0].account_detail;
                }
            }
            return null;
        },
        campaignYtDetail() {
            if (this.campaign) {
                if (this.campaign.yt_videos && this.campaign.yt_videos.length) {
                    return this.campaign.yt_videos[0].account_detail;
                }
            }
            return null;
        },
        campaignBlogDetail() {
            if (this.campaign) {
                if (this.campaign.blog_pages && this.campaign.blog_pages.length) {
                    return this.campaign.blog_pages[0].account_detail;
                }
            }
            return null;
        },
        response() {
            return this.$store.getters["campaignsModule/getResponse"];
        },
        videoIds() {
            return this.campaign.yt_videos.filter((video) => video.id);
        }
    },
    watch: {
        'campaign': function () {
            this.campaignYtChart();
            this.campaignYtChartBlogs();
        }
    },
    data: () => ({
        dashboard: false,
        user: null,
        logo: Logo,
        blogPages: [],
        ytLabels: {
            viewCount: "Views",
            likeCount: "Likes",
            dislikeCount: "Dislikes",
            favoriteCount: "Favorites",
            commentCount: "Comments",
        },
        gaLabels: {
            "ga:newUsers": "New Users",
            "ga:bounceRate": "Bounce Rate",
            "ga:pageTitle": "Title",
            "ga:pageviews": "Page Views",
            "ga:percentNewSessions": "% of new sessions",
            "ga:sessions": "Sessions",
        },
        storyLables: {
            impressions: "Impressions",
            reach: "Reach",
            taps_forward: "Taps Forward",
            taps_back: "Taps Back",
            exits: "Exits",
            replies: "Replies",
        },
        dashboardLoading: false,
        selectedCampaignId: null,
        videoStatistics: [],
        datacollection: {
            labels: [],
            datasets: [{
                backgroundColor: 'rgba(54, 154, 254,0.5)',
                data: []
            }]
        },
        ytChartItems: ['Views', 'Engagement', 'CPM'],
        ytChartSelected: 'Views',
        ytChartBlogsItems: ['Page Views', 'Organic Searches'],
        ytChartSelectedBlog: 'Page Views'
    })
}
</script>

<style lang="scss">
.overall-detail {
    h2 {
        font-size: 28px;
    }

    span {
        padding-left: 8px;
    }
}

.overall-gauge {
    position: absolute !important;
    top: 50px !important;
    right: 50% !important;
    color: #7756E5 !important;
    font-size: 50px !important;
    width: 0px !important;
    height: 72px !important;
    -moz-transition: transform 1s !important;
    -webkit-transition: transform 1s !important;
    -o-transition: transform 1s !important;
    transition: transform 1s !important;
}

.performance {
    .stat-symbol {
        span {
            font-size: 10px;
            top: -10px;
            position: relative;
        }
    }
}

.overall {
    height: 150px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    padding: 15px 20px;
    border-radius: 8px !important;
    display: flex;
    flex-direction: column;

    .stat-detail {
        display: flex;
        width: 100%;
        align-items: center;
        flex-grow: 1;

        .stat-data {
            flex-grow: 1;
            text-align: left;
        }

        div:last-child {
            overflow: hidden;
        }

    }

    .stat-title {
        text-align: left;
        width: 100%;
    }

    h1 {
        color: #242F57 !important;
    }

}

.instagram-info {

    h5 {
        color: #242F57;
    }

    .instagram-info-logo {
        height: 96px;
        width: 96px;
        border-radius: 50%;
        border: 2px solid #7756E5;
    }

    .instagram-followers {
        display: flex;

        h2 {
            color: #242F57;
        }

        span {
            font-size: 14px;
            line-height: 36px;
        }
    }

    .instagram-logo {
        position: relative;
        bottom: 0px;
        margin-left: -24px;
        margin-bottom: -72px;
        width: 24px;
    }
}

.instagram-content {
    padding: 20px;

    .instagram-content-caption {
        font-size: 14px;
        padding-bottom: 10px;
        color: #7E7E82;
    }
}

.instagram-light {
    width: 24px;
    height: 24px;
    margin-bottom: 20px;
}

.instagram-content-image {
    height: 250px;
    padding: 10px 0px;

    img,
    video {
        height: 100%;
        display: flex;
        margin: auto;
        object-fit: cover;
        width: 100%;
    }
}

.grey-label {
    color: #242F57;
}

.content-label {
    padding: 40px;
    font-size: 18px;
    font-weight: bold;
}

.instagram-title {
    display: flex;
    margin: 30px 0px;

    img {
        height: 24px;
    }

    span {
        line-height: 24px;
        font-size: 18px;
        font-weight: bold;
        color: #242F57;
    }
}

.instagram-profile {
    margin-bottom: 30px;
}

.instagram-content-stats {
    display: flex;
    color: #97A0C3 !important;

    .my-col-6 {
        width: 50%;
    }

    span {
        font-size: 12px;
        line-height: 24px;
    }

    i {
        font-size: 16px !important;
        padding-right: 3px;
    }
}

.awareness,
.engagement {
    >span {
        font-size: 14px;
        font-weight: 500;
    }

    .stats {
        margin-right: 20px;
        height: 80px;
        display: flex;
        align-items: center;
        padding: 15px 20px;
    }

    .impression .stat-symbol {
        background: #EAE9FE;
    }

    .reach .stat-symbol {
        background: #FFF5D2;
    }

    .frequncy .stat-symbol {
        background: #DAF7F0;
    }

    .engagement-rate .stat-symbol {
        background: #D5EAFF;
    }

    .comments .stat-symbol {
        background: #DAF7F0;
    }

    .saves .stat-symbol {
        background: #EAE9FE;
    }

    .replies .stat-symbol {
        background: #D5EAFF;
    }

    .tapbacks .stat-symbol {
        background: #DAF7F0;
    }

    .stat-symbol {
        width: 45px;
        height: 45px;
        align-items: center;
        display: flex;
        border-radius: 10px;
        margin: auto;

        i {
            margin: auto;
        }
    }

    .audience {
        flex-direction: column;

        .progress-bar {
            width: 100%;
            border-radius: 6px;
            background: #EAEDF7;
            height: 15px;

            .progress-bar-completed {
                background: #9390F3;
                border-radius: 6px;
                height: 15px;
                max-width: 100%;
                min-width: 1%;
            }
        }
    }

    .stat-data {
        flex-grow: 1;

        h6 {
            color: #97A0C3;
        }
    }

    .v-card {
        border-radius: 8px !important;
    }
}

.campaign-detail {
    .v-card {
        box-shadow: none;
        border: 1px solid #EAEDF7 !important;
    }
}

.chart {
    height: 600px !important;

    .title {
        text-align: left;
    }

    h3 {
        color: #242F57;
    }

    h6 {
        color: #636E95;
    }
}

.yt-column {
    margin-bottom: 20px;
}

.data-tooltip {
    float: right;
    position: absolute !important;
    right: 0;
    margin-right: 3px;
    font-size: 16px !important;
    color: #D8D8D8 !important;
    top: 3px;
}

.overall .data-tooltip {
    top: 18px;
}

.tooltip-span {
    color: #636E95 !important;
    font-size: 13px !important;
    background: white !important;
}
</style>
