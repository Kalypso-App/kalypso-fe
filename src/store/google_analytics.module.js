import Vue from "vue";

export const googleAnalyticsModule = {
  namespaced: true,
  state: {
    status: "",
    isAuthorizing: false,
    response: [],
  },
  getters: {
    // isYTLoggedIn: (state) => !!state.yt_token,
  },
  mutations: {
    auth_success(state, token, user) {
      state.status = "success";
      state.yt_token = token;
    },
    update_video(state, val) {
      console.log("updating a video ", val);
      state.videos[val].is_selected = !state.videos[val].is_selected;
    },
    toggle_authorizing(state, isAuthorizing) {
      state.isAuthorizing = isAuthorizing;
    },

    set_channel(state, channelId) {
      state.channelId = channelId;
    },

    set_video_statistics(state, statistics) {
      state.videoStatistics = statistics;
    },

    set_videos(state, videos) {
      videos.forEach((item) => {
        item.is_selected = false;
      });
      state.videos = videos;
    },
  },

  actions: {
    gapiAuthInit({ commit }) {
      return window.gapi.load("client:auth2", function() {
        gapi.auth2
          .init({
            client_id:
              "677644717203-or4u9rslvpm4indglh64edkfoj63hra6.apps.googleusercontent.com",
          })
          .then((response) => {
            console.info("GAPI AUTH INIT ", response);
          });
      });
    },

    gapiAuthenticate({ commit }) {
      window.gapi.auth2.getAuthInstance().disconnect();
      console.warn("GAPI AUTHENTICATING");
      return window.gapi.auth2
        .getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/analytics.readonly" })
        .then(
          function(response) {
            console.log("Sign-in successful", response);
          },
          function(err) {
            console.error("Error signing in", err);
          }
        );
    },

    googleAnalyticAuthorize({ commit }) {
      console.warn("GAPI AUTHENTICATING");

      // Replace with your client ID from the developer console.
      let CLIENT_ID =
        "677644717203-or4u9rslvpm4indglh64edkfoj63hra6.apps.googleusercontent.com";

      // Set authorized scope.
      let SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

      // Handles the authorization flow.
      // `immediate` should be false when invoked from the button click.
      let useImmdiate = fa;
      let authData = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: useImmdiate,
      };

      return gapi.auth.authorize(authData, function(response) {
        console.warn("GOOGLE ANALYTICS AUTHORIZING", response);
      });
    },

    gapiLoadClient({ commit }) {
      console.log("GAPI LOADING CLIENT");
      window.gapi.client.setApiKey("AIzaSyCSykXH3ZYNsfKClPlFyKuzWCLUqCVkh7I");
      return window.gapi.client
        .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
          function() {
            console.log("GAPI client loaded for API");
          },
          function(err) {
            console.error("Error loading GAPI client for API", err);
          }
        );
    },

    gapiExecute({ commit }) {
      commit("toggle_authorizing", true);

      return gapi.client.youtube.channels
        .list({
          part: "snippet,contentDetails,statistics",
          mine: true,
        })
        .then(
          (response) => {
            // Handle the results here (response.result has the parsed body).
            commit("toggle_authorizing", false);
            console.log("Response", response.result);
            let channelId =
              response.result.items[0].contentDetails.relatedPlaylists.uploads;
            commit("set_channel", channelId);
          },
          (err) => {
            commit("toggle_authorizing", false);
            console.error("Execute error", err);
          }
        );
    },

    getUploadedVideos({ commit, state }) {
      console.log(state);

      return window.gapi.client.youtube.playlistItems
        .list({
          part: "snippet,contentDetails,status",
          playlistId: state.channelId,
          maxResults: 20,
        })
        .then(
          (response) => {
            // Handle the results here (response.result has the parsed body).
            commit("toggle_authorizing", false);
            commit("set_videos", response.result.items);
            console.log("Response", response.result);
          },
          (err) => {
            commit("toggle_authorizing", false);
            console.error("Execute error", err);
          }
        );
    },
    getVideoStatistics({ commit, state }, ids) {
      return gapi.client.youtube.videos
        .list({
          part: "snippet,contentDetails,statistics",
          id: [ids.join(",")],
          playlistId: state.channelId,
        })
        .then(
          (response) => {
            console.log(response.result);
            commit("set_video_statistics", response.result.items);
          },
          (err) => {
            commit("toggle_authorizing", false);
            console.error("Execute error", err);
          }
        );
    },
  },
};
