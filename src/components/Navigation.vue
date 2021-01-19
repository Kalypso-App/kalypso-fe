<template>
<v-navigation-drawer class="custom-navigation" mobile-break-point="768" mini-variant-width="71"
 v-model="drawer" app color="white">
    <v-list shaped>
        <v-list-item style="color:white !important" @click="$router.push('/campaigns')" class="padding-logo">
            <v-list-item-avatar>
                <img :src="logo">
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="font-weight-bold project-name">Kalypso</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="divider-color"></v-divider>

        <v-list-item-group class="side-menu" v-model="item" color="primary">
            <v-list-item class="my-4 px-6" v-for="(item, i) in items" :to="item.link" :key="i">
                <v-list-item-icon class="my-1 mr-2">
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="py-0">
                    <v-list-item-title class="font-list" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item href="http://www.kalypsoapp.co/blog" target="_blank" class="my-4 px-6">
                <v-list-item-icon class="my-1 mr-2">
                    <img src="@/assets/images/blog-default.png">
                </v-list-item-icon>
                <v-list-item-content class="py-0">
                    <v-list-item-title class="font-list" v-text="'Blog'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item href="https://intercom.help/kalypsoapp/en" target="_blank" class="my-4 px-6">
                <v-list-item-icon class="my-1 mr-2">
                    <img src="@/assets/images/support-default.png">
                </v-list-item-icon>
                <v-list-item-content class="py-0">
                    <v-list-item-title class="font-list" v-text="'Support'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list-item-group>
    </v-list>
</v-navigation-drawer>
</template>

<script>
//    import DashboardDefault from '@/assets/images/dashboard-default.png';
import Logo from '@/assets/images/logo.png';
import CampaignDefault from '@/assets/images/campaign-default.png';
//    import CalendarDefault from '@/assets/images/calendar-default.png';
import BlogDefault from '@/assets/images/blog-default.png';
import SupportDefault from '@/assets/images/support-default.png';
import ClickOutside from 'vue-click-outside';

export default {
    name: 'Navigation',
    props: {
        drawer: Boolean,
    },
    watch: {
        'drawer' : function(){
            this.handleClickOutside();
        }
    },
    data: () => ({
        item: 0,
        logo: Logo,
        items: [
            //                {text: 'Dashboard', icon: DashboardDefault, link: '/'},
            {
                text: 'New Campaign',
                icon: 'mdi-plus-box-outline',
                link: '/new-campaign'
            },
            {
                text: 'Campaigns',
                icon: 'mdi-rhombus-split',
                link: '/campaigns'
            },
            //                {text: 'Calendar', icon: CalendarDefault},
            {
                text: 'Social Accounts',
                icon: 'mdi-account-box-multiple-outline',
                link: '/accounts'
            }
        ],
    }),
    computed: {
        loggingIn() {
            // return this.$store.state.auth.status.loggingIn;
            return false
        }
    },
    created() {},
    methods: {
        handleClickOutside(){
            if(!this.drawer){
                this.$emit('onDrawerChange', false);
            }
        }
    }

};
</script>

<style lang="scss">
.project-name {
    font-size: 20px;
    line-height: 17px;
    color: #30364D;
    font-family: 'Fira Sans', sans-serif;
}

.padding-logo {
    padding: 16px 24px;
    cursor: pointer;
    color: white !important;
}

.padding-logo .project-name {
    color: rgba(0, 0, 0, 0.87);
}

.padding-logo:hover {
    color: white !important;
}

.v-list-item:hover {}

.v-list-item-group .v-list-item--active .v-list-item__title {
    color: #7756E5 !important;
    padding-left: 8px;
}

.v-list-item-group .v-list-item--active .v-list-item__icon {
    color: white;
}

.v-list-item__icon {
    align-items: center;
    align-self: center !important;
    overflow: hidden;
}

.theme--light.v-list-item--active::before {
    background: #7756E5;
    opacity: 1 !important;
    width: 4px;
}

.font-list {
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #7982A3;
}

.theme--light.v-navigation-drawer .v-divider.divider-color {
    border-color: #F8F8FF;
}

.v-list-item-group .v-list-item--active .v-list-item__icon img {
    z-index: 9;
    padding: 6px;
}

.v-application--is-ltr .v-list--shaped .v-list-item,
.side-menu a {
    border-bottom-right-radius: 0px !important;
    border-top-right-radius: 0px !important;
}

.v-item--active {
    background: #E6EEFD;
}

.v-item--active i {
    color: #7756E5 !important;
}

.side-menu a:nth-child(2) i {
    transform: rotate(45deg);
}
</style>
