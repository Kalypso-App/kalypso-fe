<template>
  <create-campaign :isEdit="false"></create-campaign>
</template>

<script>
import CreateCampaign from "./CreateCampaign";


export default {
    name: "NewCampaign",
    components: {
      CreateCampaign
    },
    data: () => ({}),
};
</script>

<style lang="scss" scoped>

</style>
