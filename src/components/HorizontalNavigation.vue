<template>
<div>
    <v-toolbar color="transparent" flat>
        <v-icon style="padding-right:15px;" @click.stop="onDrawerChange()">mdi-menu</v-icon>
        <v-spacer></v-spacer>
        <v-divider class="vertical-line" vertical></v-divider>
        <v-avatar size="32">
            <img v-if="userImage" :src="userImage">

            <img v-else src="@/assets/images/user-logo.png" />
        </v-avatar>
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn append-icon="mdi-chevron-down" v-on="on" class="my-2 drop-btn">
                    <v-icon color="#7982A3">mdi-chevron-down</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item class="my-4 px-6" @click="manageAccount()">
                    <v-list-item-icon class=" mr-2">
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="py-0">
                        <v-list-item-title class="font-list">Manage Account</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="my-4 px-6" @click="logout()">
                    <v-list-item-icon class=" mr-2">
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="py-0">
                        <v-list-item-title class="font-list">Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
        <!--<v-overflow-btn-->
        <!--borderless-->
        <!--class="my-2 drop-btn"-->
        <!--v-for="(item, i) in items"-->
        <!--:to="item.link"-->
        <!--:key="i"-->
        <!--target="#dropdown-example"-->
        <!--append-icon="mdi-chevron-down"-->
        <!--&gt;</v-overflow-btn>-->
    </v-toolbar>
    <ManageAccount ref="manageAccount" />
</div>
</template>

<script>
import Vuetify from 'vuetify';
import ManageAccount from "@/views/accounts/manageAccount";

export default {
    name: 'HorizontalNavigation',
    props: {
        icon: {
            type: String,
            default: 'bell-outline',
        }
    },
    created() {
        this.userImage = localStorage.getItem('image')
    },
    data: () => ({
        userImage: null,
        searchText: ""
    }),
    components: {
        ManageAccount
    },
    methods: {
        onDrawerChange() {
            this.$emit('onDrawerChange');
        },
        manageAccount() {
            this.$refs.manageAccount.openManage();
        },
        logout() {
            let me = this;
            window.FB.logout(function (response) {});

            me.$store.dispatch('authModule/logout').then(() => {
                me.$router.push('/login')
            });

        },
    }
}
</script>

<style lang="scss">
.navigation-search {
    background: #FFFFFF;
    border-radius: 32px;
}

.navigation-search .input-search {
    padding: 8px 16px;
    padding-top: 8px !important;
}

.navigation-search .v-input__slot::before {
    border-color: transparent !important;
}

.v-toolbar__content {
    padding: 16px 32px !important;
    height: auto !important;
}

.vertical-line {
    margin: 0 16px;
}

.drop-btn.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    width: 16px !important;
    margin: 0;
    height: 16px !important;
    box-shadow: none;
    max-width: 16px !important;
    background: transparent !important;
}

.v-overflow-btn .v-select__slot {
    height: 16px !important;
}

.v-overflow-btn .v-input__append-inner {
    width: auto !important;
    height: auto !important;
}

.v-overflow-btn .v-input__append-inner .v-input__icon {
    height: 16px;
    min-width: 16px;
    width: 16px;
}

.drop-btn.v-text-field .v-input__append-inner {
    margin-top: 0 !important;
}

.v-overflow-btn .v-input__slot {
    border-width: 0 !important;
}

.v-overflow-btn.v-input--is-focused .v-input__slot,
.v-overflow-btn.v-select--is-menu-active .v-input__slot {
    box-shadow: none !important;
}
</style>
