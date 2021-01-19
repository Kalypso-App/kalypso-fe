import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Campaigns from "../views/campaigns/Campaigns.vue";
import DetailsCampaign from "../views/campaigns/DetailsCampaign";
import Accounts from "../views/accounts/InstagramAccounts.vue";
import NewCampaign from "../views/campaigns/NewCampaign";
import EditCampaign from "../views/campaigns/EditCampaign";
import PreviewCampaign from "../views/campaigns/PreviewCampaign";
import Login from "../components/Login.vue";
import Forget from "../components/Forget.vue";
import Reset from "../components/Reset.vue";
import Signup from "../components/Signup.vue";
import Error from "../components/Error.vue";
import store from "../store";
import DetailDashboard from "../views/dashboard/DetailDashboard.vue";
import ShareDashboard from "../views/dashboard/ShareDashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reset/:email",
    name: "Reset",
    component: Reset,
  },
  {
    path: "/share/:id",
    name: "share-campaign",
    component: ShareDashboard,
  },
  {
    path: "/",
    name: "Home",
    component: Campaigns,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/campaigns",
    name: "Campaigns",
    component: Campaigns,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/details-campaign/:id",
    name: "DetailsCampaign",
    component: DetailsCampaign,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/calendar",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/new-campaign",
    name: "NewCampaign",
    component: NewCampaign,
  },
  {
    path: "/edit-campaign/:id",
    name: "EditCampaign",
    component: EditCampaign,
  },
  {
    path: "/preview-campaign/:id",
    name: "PreviewCampaign",
    component: PreviewCampaign,
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
  },
  {
    path: "/blog",
    name: "Blog",
    component: Dashboard,
  },
  {
    path: "/support",
    name: "Support",
    component: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forget",
    name: "Forget",
    component: Forget,
  },

  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("alertsModule/turnOffAlert");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["authModule/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});
export default router;
