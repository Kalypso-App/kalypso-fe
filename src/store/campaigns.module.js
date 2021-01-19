import Vue from "vue";
import {
  app_URL
} from "../config";

export const campaignsModule = {
  namespaced: true,
  state: {
    campaigns: [],
    campaign: {},
    response: {},
  },
  getters: {
    getCampaigns: (state) => state.campaigns,
    getCampaign: (state) => state.campaign,
    getResponse: (state) => state.response,
  },
  mutations: {
    setCampaigns(state, campaigns) {
      campaigns.forEach(element => {
        element.is_selected = false;
      });
      state.campaigns = campaigns;
    },
    setCampaign(state, campaign) {
      state.response = campaign;
      state.campaign = campaign.campaign;
    }
  },

  actions: {
    fetchCampaigns({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http
          .get("/campaigns", user)
          .then((response) => {
            commit("setCampaigns", response.data);

            if (response && response.data) {
              // Update Intercom
              window.Intercom('update', {
                "Campaigns Created": response.data.length
              });

              // update list of campaigns url
              // Campaigns List
              let list = [];
              response.data.forEach(campaign => {
                list.push(app_URL + campaign._id);
              });

              window.Intercom('update', {
                "Campaigns List": list.join(` \n `)
              });
            }

            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchCampaign({
      commit
    }, id) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http
          .get(`/campaigns/${id}`)
          .then((response) => {
            console.log(response.data.campaign);
            commit("setCampaign", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    searchCampaign({
      commit
    }, searchText) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http
          .get(`/campaigns/search/${searchText}`)
          .then((response) => {
            commit("setCampaigns", response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
};