<template>
<div v-loading="isLoading">
    <h3 class="page-name"></h3>
    <div class="inline">
        <img class="homeicon" @click="$router.push('/campaigns')" src="@/assets/images/home.svg" alt />
        <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
        <v-breadcrumbs :items="items">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :href="item.href" class="active-link" :disabled="item.disabled">
                    <v-icon v-if="item.icon">{{ item.icon}}</v-icon>
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
            <template v-slot:divider>
                <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
    </div>

    <no-campaign v-if="!campaigns.length" />
    <create-modal v-if="campaigns.length"></create-modal>
    <v-row class="px-5 mx-0">
        <!-- <v-col cols="6" md="3" id="create-modal-holder">
        <router-link to="/new-campaign">
          <create-modal v-if="campaigns.length"></create-modal>
        </router-link>
      </v-col> -->
        <single-campaign v-on:campaignDelete="campaignDelete" v-on:campaignSelected="campaignSelected" :campaign="campaign" v-for="(campaign, i) in campaigns" v-bind:key="i" />
    </v-row>
    <img class="leaf-img" src="@/assets/images/leafs.png" alt />
</div>
</template>

<script>
import NoCampaign from "./NoCampaigns";
import SingleCampaign from "./SingleCampaign";
import CreateModal from "./CreateModal.vue";
export default {
    name: "Campaigns",
    components: {
        SingleCampaign,
        CreateModal,
        NoCampaign
    },

    data: () => ({
        isLoading: false,
        items: [{
            text: "Campaigns"
        }]
    }),
    created() {
        this.getCampaigns();
    },
    computed: {
        campaigns() {
            return this.$store.getters["campaignsModule/getCampaigns"];
        }
    },
    methods: {
        async getCampaigns() {
            try {
                await this.$store.dispatch("campaignsModule/fetchCampaigns");
            } catch (e) {
                console.log(e)
            }
        },
        campaignSelected(campaign) {
            this.campaigns.forEach(element => {
                element.is_selected = false;
            });
            campaign.is_selected = true;
        },
        async campaignDelete(campaign) {
            let response = await this.$http.get(`/campaigns/delete/${campaign._id}`, {});
            if (response) {
                let index = this.campaigns.findIndex(x => x._id == campaign._id);
                this.campaigns.splice(index, 1);
            }
        }
    }
};
</script>

<style lang="scss">
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
    padding-left: 5px !important;
}

.inline i {
    font-size: 16px !important;
}

.inline img {
    padding-right: 5px;
}

.create-new {
    cursor: pointer;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #7982a3;

    &:hover {
        border-color: #30364d;
        color: #30364d !important;
    }

    & .centered {
        & p {
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            color: inherit;
            margin-top: 16px;
        }

        & i {
            font-size: 32px;
        }
    }
}

.leaf-img {
    position: absolute;
    bottom: 0;
    right: 0;
}

@media only screen and (max-width: 768px) {
    #create-modal-holder .modal-btn.v-btn:not(.v-btn--round).v-size--default {
        width: 100%;
        height: 100%;
    }

    .single-campaign .campaign-info {
        display: block;
    }
}
</style>
