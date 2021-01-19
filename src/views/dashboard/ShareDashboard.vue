<template>
<div>
    <div class="top-bar py-2 px-8">
       <img :src="imgLogo" alt />
    </div>
    <detail-dashboard  v-on:campaignReceive="campaignReceive" :isShare="true"/>
    <div class="footer-bar py-2 px-8">
       <img src='@/assets/images/logo.png' alt />
       Powered by <a style="padding:0 5px;" target="_blank" href="https://www.kalypsoapp.co/"> Kalypso</a> - Brand Deal Reporting for Influencers
    </div>
</div>
</template>

<script>
import DetailDashboard from "./DetailDashboard";

export default {
    name: 'ShareDashboard',
    components: {
        DetailDashboard
    },
    data: () => ({
        imgLogo: require('@/assets/images/logo.png')
    }),
    created: async function () {
        // Hide Intercom on Share page
        window.Intercom('update', {
            "hide_default_launcher": true
        });
    },
    methods:{
        async campaignReceive(campaign) {
            if(campaign && campaign.isProCampaign && campaign.account_logo){
                this.imgLogo = campaign.account_logo;
            }
        }
    }
}
</script>

<style lang="scss">
    .top-bar{
        display: flex;
        position: sticky;
        background: white !important;
        top: 0;
        z-index: 10;
        align-items: center;

        img{
            height: 40px;
            padding-right: 10px;
        }
    }

    .footer-bar{
        display: flex;
        position: sticky;
        background: white !important;
        z-index: 10;
        align-items: center;
        font-size: 14px;

        img{
            height: 24px;
            padding-right: 10px;
        }
    }
</style>
