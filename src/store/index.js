import Vue from 'vue'
import Vuex from 'vuex'
import {authModule} from './auth.module'
import {alertsModule} from './alerts.module'
import {campaignsModule} from './campaigns.module'
import {youtubeModule} from './youtube.module'
import {googleAnalyticsModule} from './google_analytics.module'
import {loadingModule} from './loading.module'
import {checkoutModule} from './checkout.module';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    modules: {
        authModule,
        alertsModule,
        campaignsModule,
        youtubeModule,
        googleAnalyticsModule,
        loadingModule,
        checkoutModule
    }
})
