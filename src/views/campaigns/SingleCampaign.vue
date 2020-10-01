<template>
<v-col cols="6" md="3">
    <div>
        <!--:to="`/details-campaign/${campaign._id}`"-->

        <v-card class="single-campaign-card" width="300px" height="350px" outlined :class="campaign.is_selected ? 'campaign-selected' : ''">
            <div v-loading="loading" class="single-campaign">
                <div class="text-center pull-right">
                    <v-menu offset-y class="campaign-menu">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon @click="onSelectCampaign()" v-bind="attrs" v-on="on" class="grey-color">mdi-gamepad-circle-outline</v-icon>
                        </template>
                        <v-list class="campaign-menu-list">
                            <v-list-item :key="0" @click="$router.push(`/edit-campaign/${campaign._id}`)">
                                <v-icon>mdi-file-edit-outline</v-icon>
                                <v-list-item-title>Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click.stop="onDeleteCampaign(campaign._id)" :key="1" class="delete">
                                <v-icon class="delete">mdi-delete-forever-outline</v-icon>
                                <v-list-item-title>
                                    <span>Delete</span>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item @click.stop="syncCampaign(campaign._id)" :key="2">
                                <v-icon>mdi-sync</v-icon>
                                <v-list-item-title>
                                    <span>Sync</span>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div class="poster">
                    <img :src="campaign.brand_logo ? campaign.brand_logo : logo" alt />
                </div>

                <h2 class="black-color">{{campaign.name}}</h2>
                <div class="due-date grey-color">{{ new Date(campaign.due_date).toDateString().substring(4) }}</div>
                <div class="due-date">
                </div>
                <v-btn @click="$router.push(`/dashboard/${campaign._id}`)" class="ma-2 view-campaign" outlined>View Campaign</v-btn>
            </div>
        </v-card>
    </div>
    <v-dialog v-model="deleteCampaign" max-width="550" height="250">
        <v-card class="delete-modal-title">
            <h3>Are you sure?</h3>
            <div class="txt-delete">Do you really want to delete Campaign '{{campaign.name}}'?<br /> This process cannot be undone.</div>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="width: auto" class="cancel-gray" @click="deleteCampaign = false">Cancel</v-btn>
                <v-btn style="width: auto" class="confirm-purple" @click="onDeleteConfrim()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-col>
</template>

<script>
import Logo from "@/assets/images/logo.png";

export default {
    name: "SingleCampaign",
    components: {},
    methods: {
        async syncCampaign(campaignId) {
            this.loading = true;
            let syncData = await this.$http.get(`/campaigns/sync/${campaignId}`);
            this.loading = false;
        },
        onSelectCampaign() {
            this.$emit("campaignSelected", this.campaign);
        },
        onDeleteCampaign() {
            this.deleteCampaign = true;
        },
        onDeleteConfrim() {
            this.deleteCampaign = false;
            this.$emit("campaignDelete", this.campaign);
        }
    },
    props: {
        campaign: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        loading: false,
        logo: Logo,
        deleteCampaign: false,
        menuItems: [{
            title: "Edit"
        }, {
            title: "Delete"
        }],
    }),
};
</script>

<style lang="scss">
a {
    text-decoration: none;
}

.delete,
.delete span {
    color: #ff543e !important;
}

.grey-color {
    color: RGB(198, 198, 206) !important;
}

.black-color {
    color: RGB(46, 46, 48);
}

.single-campaign-card {
    //background: linear-gradient(360deg, RGB(121,88,231) 0%, RGB(175,119,246) 100%);
    padding: 15px;

    .single-campaign {
        display: flex;
        flex-direction: column;

        .poster {
            padding: 7px 18px;
            height: 140px;

            & img {
                max-width: 100%;
                margin: auto;
                display: block;
                max-height: 100%;
            }
        }

        .text-center {
            width: 100%;

            & button {
                transform: rotate(45deg);
                float: right;
                padding: 15px 0px;
            }
        }

        .view-campaign {
            color: RGB(121, 88, 231) !important;
            //background-color:RGB(121,88,231) !important;
            background-color: white !important;
            text-transform: capitalize;
            border-radius: 10px !important;
        }

        .text-center .theme--light.v-icon:focus::after {
            opacity: 0;
        }

        & hr {
            margin: 0 4px;
        }

        .campaign-info {
            align-items: center;
            padding: 40px;
            display: flex;

            .type {
                align-items: center;
                display: flex;

                & .insta-story {
                    margin-right: 9px;
                }

                & span {
                    color: #30364d;
                    font-family: "Open Sans", sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 16px;
                    margin-left: 5px;
                }
            }
        }

        & h2 {
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-weight: 600;
            text-align: center;
        }

        .due-date {
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-size: 12px;
            //line-height: 12px;
            color: white;
            text-align: center;
        }
    }

    &.campaign-selected {
        background: linear-gradient(360deg,
                RGB(121, 88, 231) 0%,
                RGB(175, 119, 246) 100%);
        -webkit-transition: all 5s ease-out;
        -moz-transition: all 5s ease-out;
        -o-transition: all 5s ease-out;
        transition: all 5s ease-out;

        & h2 {
            color: white;
        }

        .text-center {

            & button {
                color: white !important;
            }
        }

        .view-campaign {
            color: white !important;
            background-color: RGB(121, 88, 231) !important;
        }
    }
}

.campaign-menu-list {
    .v-list-item {
        cursor: pointer;
    }
}
</style>
