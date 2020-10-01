import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import Axios from "axios";
import { apiUrl } from "@/config";
import GSignInButton from "vue-google-signin-button";
import Directives from "./directives";
import * as VeeValidate from "vee-validate";
import VueClipboard from 'vue-clipboard2'
import Notifications from 'vue-notification'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);
Vue.use(VeeValidate);
Vue.use(Notifications);

Object.keys(Directives).forEach((name) =>
  Vue.directive(name, Directives[name])
);

Vue.use(GSignInButton);

const FBGraphHttp = Axios.create({
  baseURL: "https://graph.facebook.com/v7.0/",
});

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = apiUrl;
Vue.prototype.$fbGraphAuth = FBGraphHttp;
const token = localStorage.getItem("token");

if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

window.appVue = new Vue({
  vuetify,
  router,
  store,
  $_veeValidate: {
    validator: "new",
  },
  created(){
    Axios.interceptors.request.use(async config => {
      this.$store.dispatch("loadingModule/setLoading", true);
      return config;
    });
    Axios.interceptors.response.use(async res => {
      this.$store.dispatch("loadingModule/setLoading", false);
      return res;
    },(async res => {
      if(res.response && res.response.status != 200){
        let err = res.response.data;
        if(typeof err === 'object' ){
          if(err.message)
          err = err.message;
          if(err.error && typeof err.error === "string")
            err = err.error;
          if(err.error && err.error.message)
          err =  err.error.message;
        }
        Vue.notify({
          group: 'app',
          type: "error",
          title: 'Error',
          text: err
        })
      }
      }))
  },
  render: (h) => h(App),
}).$mount("#app");
