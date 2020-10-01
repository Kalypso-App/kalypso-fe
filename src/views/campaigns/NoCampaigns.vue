<template>
  <!--<new-campaign></new-campaign>-->
  <v-col sm="12" class="center" md="12">
    <img :src="EmptyDashboard" />
    <h3 class="create-campaign-txt">
      Create
      <router-link to="/new-campaign">
        a new campaign
        <span></span>
      </router-link>to get started.
    </h3>
    <!-- <h3 class="create-campaign-txt">Create a <a href="http://localhost:3000/auth/gareport">new analytics</a> to get started.</h3> -->
  </v-col>
</template>

<script>
import EmptyDashboard from "@/assets/images/empty-dashboard.png";

export default {
  name: "NoCampaigns",
  components: {},
  data: () => ({
    items: [
      {
        icon: "mdi-home-outline",
        text: "Link 2",
      },
      {
        text: "Campaign",
      },
    ],
    EmptyDashboard: EmptyDashboard,
  }),
};
</script>
<style lang="scss" scoped>
.inline {
  display: flex;
  align-items: center;
  padding-left: 32px;
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
.create-campaign-txt {
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #30364d;
}
.create-campaign-txt a {
  color: #9165f7;
  text-decoration: none;
}
.center {
  text-align: center;
}
</style>