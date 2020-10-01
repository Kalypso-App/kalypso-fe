<template>
  <div class="dashboardArea" ref="dashboardArea">
    <div class="dashboard-header d-sm-flex justify-space-between align-center">
      <h3 class="page-name"></h3>
      <div class="d-sm-flex justify-end align-center">
        <v-select
          :items="campaigns"
          label="Choose Campaign"
          dense
          rounded
          v-model="selectedCampaignId"
          item-value="_id"
          append-icon="mdi-chevron-down"
          outlined
        >
          <template v-slot:selection="data">{{ data.item.brand_name }} - {{ data.item.name }}</template>
          <template v-slot:item="data">{{ data.item.brand_name }} - {{ data.item.name }}</template>
        </v-select>

        <v-btn @click="shareCampaign()">
          <v-icon>mdi-share-variant-outline</v-icon>
          <span>Share Campaign</span>
        </v-btn>
      </div>
    </div>
    <div class="inline">
      <img class="homeicon" @click="$router.push('/campaigns')" src="@/assets/images/home.svg" alt />
      <v-breadcrumbs class="pl-0" :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            class="active-link"
            :href="item.href"
            :disabled="item.disabled"
          >{{ item.text }}</v-breadcrumbs-item>
        </template>
        <template v-slot:divider>
          <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <v-dialog v-model="shareDialog" max-width="616" height="296">
      <v-card class="delete-modal-title">
        <h2>Share Campaign link</h2>
        <div
          class="txt-delete"
        >{{this.shareLink}}
          <v-icon  v-clipboard:copy="shareLink" @click="copytoclipboard">mdi-content-copy</v-icon>
        </div>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cancel-gray" @click="shareDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <detail-dashboard />
    <no-dashboard v-if="dashboard" />
  </div>
</template>

<script>
import NoDashboard from "./NoDashboard";
import DetailDashboard from "./DetailDashboard";
import BarChart from "./widgets/BarChart.vue";
import DoughnutChart from "./widgets/DoughnutChart.vue";
import { app_URL } from "../../config";

export default {
  components: {
    NoDashboard,
    DetailDashboard
  },
  created() {
    this.getCampaigns();
    this.getUser();
    if (this.$route.params.id) {
      this.campaignId = this.$route.params.id;
    }
  },
  methods: {
    async getUser() {
      try {
        let response = await this.$http.get(`get-user`);
        this.user = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async shareCampaign(){
      this.shareDialog = true;
      this.shareLink = app_URL + this.campaignId;
    },
     async getCampaigns() {
      this.dashboardLoading = true;
      await this.$store.dispatch("campaignsModule/fetchCampaigns");
      if (!this.campaigns.length) {
        this.$router.push("/campaigns");
      }
      this.dashboardLoading = false;
    },
    async getCampaign(id) {
      let vm = this;
      this.campaignId = id;
      try {
        await this.$store.dispatch("campaignsModule/fetchCampaign", id);
      } catch (e) {
        this.dashboardLoading = false;
        console.log(e);
      }
      this.dashboardLoading = false;
    },
    copytoclipboard(){
      let vm = this;
      this.$copyText(this.shareLink).then(function (e) {
          vm.$store.dispatch("alertsModule/turnOnAlert", {
          type: "success",
          message: "Share link copied!"
        });
        }, function (e) {
          vm.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: e.message,
        });
        })
    }
  },
  computed: {
    campaigns() {
      return this.$store.getters["campaignsModule/getCampaigns"];
    }
  },
  watch: {
    selectedCampaignId(id) {
      this.dashboardLoading = true;
      this.getCampaign(id);
      this.campaignId = id;
    },
  },
  data: () => ({
    dashboard: false,
    user: null,
    campaignId: "",
    dashboardLoading: false,
    selectedCampaignId: null,
    shareDialog: false,
    shareLink:"",
    items: [
      {
        text: "Dashboard",
      },
    ],
  }),
};
</script>
<style lang="scss" >
.inline {
  display: flex;
  align-items: center;
  padding-left: 32px;
}

.dashboard-header {
  padding: 36px 36px 0 32px;
  .page-name {
    padding: 0;
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #30364d;
  }
  button {
    text-transform: capitalize;
    margin-left: 16px;
    & span {
      margin-left: 8px;
    }
  }
  .v-select {
    position: relative;
    top: 14px;
  }
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

.type-holder {
  padding: 28px 36px 0 32px;
  & h2 {
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #30364d;
    margin-bottom: 16px;
  }
  .v-card {
    padding: 12px 15px;
    border: 1px solid #e6e8f0;
    box-shadow: none;

    h2 {
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #7982a3;
    }
  }
  .grid-chart {
    display: grid;
    grid-template-columns: 1fr 0.35fr 0.35fr;
    width: 100%;

    .statistic {
      width: auto !important;

      & h3 {
        font-family: "Fira Sans", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #30364d;
      }
      & span {
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #7982a3;
      }
    }
  }
  .grid-story-chart {
    & .statistic {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 24px;

      & h3 {
        font-family: "Fira Sans", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #30364d;
      }
      & span {
        font-family: "Open Sans", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: #7982a3;
      }
      .v-card {
        position: relative;

        & i {
          position: absolute;
          top: 5px;
          right: 5px;
        }
      }
    }
    & .charts {
      display: grid;
      grid-template-columns: 1fr 0.7fr;
    }
  }
}
@media only screen and (max-width: 768px) {
  .type-holder .grid-chart {
    grid-template-columns: 1fr;

    & > div {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
    & .v-card {
      margin-bottom: 20px;
    }
  }
  .type-holder .grid-story-chart .statistic {
    grid-template-columns: 1fr;

    & > div {
      margin-right: 0 !important;
      margin-left: 0 !important;
      margin-bottom: 0 !important;
    }
  }
  .type-holder .grid-story-chart .charts {
    grid-template-columns: 1fr;
    & > div {
      margin-top: 24px;
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
  }
  .dashboard-header {
    & .v-btn {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
  }
  .navigation-search {
    margin-right: 10px;
  }
}
.brand-info {
  width: 100%;
}

.brand-info-logo{
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.brand-name{
  font-weight: bold;
}

.headline{
  display: flex;
  align-items: center;
  span{
    font-size: 20px;
    margin: 10px 10px 10px 0;
  }
  .v-image{
    flex: unset;
  }
}

.homeicon, .txt-delete i{
  cursor: pointer;
}

.txt-delete div, .txt-delete i:before{
  font-size: 16px;
}

</style>