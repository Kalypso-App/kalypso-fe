import Vue from "vue";

export const authModule = {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user_id") || false,
    isGoogleAuthorized: localStorage.getItem("is_google_authorized") || false,
    paymentEndDate:  localStorage.getItem("paymentEndDate") || null,
    user_email:  localStorage.getItem("user_email") || null,
    user_name:  localStorage.getItem("user_name") || null,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    isGoogleAuthorized: (state) => state.isGoogleAuthorized,
    userId: (state) => state.user,
    paymentEndDate: (state) => state.paymentEndDate,
    user_email: (state) => state.user_email,
    user_name: (state) => state.user_name
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },

    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },

    set_user(state, user) {
      state.user = user._id;
    },

    auth_error(state) {
      state.status = "error";
    },

    set_paymentEndDate(state, date){
      state.paymentEndDate = date;
    },

    set_user_email(state, data){
      state.user_email = data;
    },

    set_user_name(state, data){
      state.user_name = data;
    },

    logout(state) {
      state.status = "";
      state.token = "";
    },
  },

  actions: {
    setPaymentEndDate({commit}, date){
      commit("set_paymentEndDate", date);
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Vue.prototype.$http
          .post("/login", user)
          .then((resp) => {
            if(resp){
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            commit("set_user", user._id);
            commit("set_paymentEndDate",user.paymentEndDate);
            commit("set_user_email",user.email);
            commit("set_user_name",user.name);

            if (user.google_tokens && user.google_tokens[0]) {
              localStorage.setItem("is_google_authorized", true);
            } else {
              localStorage.removeItem("is_google_authorized");
            }

            console.log(" ================ /LOGIN ===================")
            localStorage.setItem("user_id", user._id);
            localStorage.setItem("paymentEndDate", user.paymentEndDate);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("user_name", user.name);

            Vue.prototype.$http.defaults.headers.common[
              "Authorization"
            ] = token;
           
              commit("auth_success", token, user);
              resolve(resp);
            }

            resolve();
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    fbLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Vue.prototype.$http
          .post("/facebook-login", payload)
          .then((resp) => {
            console.log("FROM auth.module.js ->>>> ", resp);
            const token = resp.data.token;
            const user = resp.data.user;
            console.log(resp.headers, token);
            localStorage.setItem("token", token);
            localStorage.setItem("image", user.image);
            commit("set_user", user._id);
            localStorage.setItem("user_id", user._id);
            localStorage.setItem("user_email", user.email);
            localStorage.setItem("paymentEndDate", user.paymentEndDate);
            localStorage.setItem("user_name", user.name);
           
            commit("set_paymentEndDate",user.paymentEndDate);
            commit("set_user_email",user.email);
            commit("set_user_name",user.name);


            Vue.prototype.$http.defaults.headers.common[
              "Authorization"
            ] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    signup({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Vue.prototype.$http
          .post("register", user)
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            Vue.prototype.$http.defaults.headers.common[
              "Authorization"
            ] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },

    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("paymentEndDate");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_email");
        localStorage.removeItem("image");
        window.Intercom('update')

        delete Vue.prototype.$http.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
};
