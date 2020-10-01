<template>
    <div>
        <div class="inline">
            <img src="@/assets/images/home.svg" alt="">
            <v-breadcrumbs :items="items">
                <template v-slot:item="{ item }">
                        <v-breadcrumbs-item
                                class="active-link"
                            :href="item.href"
                            :disabled="item.disabled">
                            {{ item.text }}
                        </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </div>
        <v-col
                sm="12"
                class="center"
                md="12">
            <v-img class="mx-auto" max-width="636" max-height="274"  :src="EmptyDashboard"/>
            <h3 class="create-campaign-txt">Create a <router-link to="/new-campaign">new campaign</router-link> to get started.</h3>
        </v-col>

    </div>
</template>

<script>
    import EmptyDashboard from '@/assets/images/empty-dashboard.svg';
export default {
  name: 'NoDashboard',
  data: () => ({
    items:[
        {
            icon: 'mdi-home-outline',
            text: 'Dashboard'
        },
    ],
      EmptyDashboard: EmptyDashboard,
    
  }),
}
</script>
<style lang="scss" scoped>
    .inline{
        display: flex;
        align-items: center;
        padding-left: 32px;
    }
    .active-link{
        color: #7982A3;
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
    }
    .v-breadcrumbs{
        padding: 8px 5px;
    }
    .create-campaign-txt{
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #30364D;
    }
    .create-campaign-txt a{
        color: #9165F7;
        text-decoration: none;
    }
    .center{
        text-align: center;
    }
</style>