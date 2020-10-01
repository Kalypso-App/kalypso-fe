<template>
<div>
    <div class="top-bar py-4 px-8">
       <img src='@/assets/images/logo.png' alt />
       <h3>Kalypso</h3>
    </div>
    <detail-dashboard />
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

    }),
}
</script>

<style lang="scss">
    .top-bar{
        display: flex;
        position: sticky;
        background: #F4F7FC !important;
        top: 0;
        z-index: 10;
        align-items: center;

        img{
            width: 50px;
            padding-right: 10px;
        }
    }
</style>
