<template>
  <div>
    <v-alert class="alert" :type="alertType" v-if="alertMessage" dismissible>{{ alertMessage }}</v-alert>
  </div>
</template>

<script>
export default {
  name: "Alerts",
  props: {},
  computed: {
    alertType() {
      return this.$store.getters["alertsModule/alertType"];
    },
    alertMessage() {
      return this.$store.getters["alertsModule/alertMessage"];
    },
  },
  data: () => ({}),
  components: {},
};
</script>
<style lang="scss">
.alert{
  z-index:1000000;
}
</style>
