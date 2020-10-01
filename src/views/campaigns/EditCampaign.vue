<template>
  <create-campaign :isEdit="true"></create-campaign>
</template>

<script>
import CreateCampaign from "./CreateCampaign";


export default {
    name: "EditCampaign",
    components: {
      CreateCampaign
    },
    data: () => ({}),
};
</script>

<style lang="scss" scoped>

</style>
