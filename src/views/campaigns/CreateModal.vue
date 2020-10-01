<template>
  <div class="px-8">
    <!--<v-dialog v-model="dialog" scrollable max-width="592px">-->
    <!--<template v-slot:activator="{ on }">-->
    <v-btn @click="$router.push('/new-campaign')" class="modal-btn">
      <!--@click="dialogm1 = true"-->
      <!--v-on="on"-->
      <!--&gt;-->
      <div class="d-grid">
        <p>
          Create New
          Campaign
        </p>
      </div>
    </v-btn>
  </div>
  <!--</template>-->
  <!--<v-card class="new-campaign-modal">-->
  <!--<v-card-title class="new-title px-0 py-0">Create Campaign</v-card-title>-->
  <!--<div class="data-section">-->
  <!--<div class="main-info">-->
  <!--<h2>Main Info</h2>-->
  <!--<v-row>-->
  <!--<v-col cols="12" sm="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="campaign_name"-->
  <!--label="Campaign Name"-->
  <!--filled-->
  <!--class="input-style amount-input"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--<v-col cols="12" sm="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="brand"-->
  <!--label="Brand name"-->
  <!--filled-->
  <!--class="input-style amount-input"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--<v-col cols="12" sm="6" class="picker">-->
  <!--<v-menu-->
  <!--ref="menu"-->
  <!--v-model="menu"-->
  <!--:close-on-content-click="false"-->
  <!--:return-value.sync="date"-->
  <!--transition="scale-transition"-->
  <!--offset-y-->
  <!--min-width="290px"-->
  <!--class="date-picker"-->
  <!--&gt;-->
  <!--<template v-slot:activator="{ on }">-->
  <!--<v-text-field-->
  <!--v-model="date"-->
  <!--label="Due Date"-->
  <!--class="input-style"-->
  <!--append-icon="mdi-calendar-blank-outline"-->
  <!--readonly-->
  <!--v-on="on"-->
  <!--&gt;-->
  <!--</v-text-field>-->
  <!--</template>-->
  <!--<v-date-picker scrollable v-model="date" no-title>-->
  <!--<v-spacer></v-spacer>-->
  <!--<v-btn text color="primary" @click="menu = false">Cancel</v-btn>-->
  <!--<v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>-->
  <!--</v-date-picker>-->
  <!--</v-menu>-->
  <!--</v-col>-->
  <!--<v-col cols="12" sm="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="amount"-->
  <!--label="Amount"-->
  <!--filled-->
  <!--class="input-style amount-input"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--</v-row>-->
  <!--</div>-->
  <!--<div class="deliverables">-->
  <!--<h2>Deliverables</h2>-->
  <!--<v-row>-->
  <!--<v-col cols="3" md="3" class="py-0 pr-0">-->
  <!--<v-select-->
  <!--:items="items"-->
  <!--append-icon="mdi-chevron-down"-->
  <!--filled-->
  <!--label="Select type"-->
  <!--class="input-style select"-->
  <!--&gt;</v-select>-->
  <!--</v-col>-->
  <!--<v-col cols="6" md="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="deliverable_name"-->
  <!--label="Deliverable Name"-->
  <!--filled-->
  <!--class="input-style"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--</v-row>-->
  <!--<v-row>-->
  <!--<v-col cols="3" md="3" class="py-0 pr-0">-->
  <!--<v-select-->
  <!--:items="items"-->
  <!--append-icon="mdi-chevron-down"-->
  <!--filled-->
  <!--label="Select type"-->
  <!--class="input-style select"-->
  <!--&gt;</v-select>-->
  <!--</v-col>-->
  <!--<v-col cols="6" md="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="deliverable_name"-->
  <!--label="Deliverable Name"-->
  <!--filled-->
  <!--class="input-style"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--</v-row>-->
  <!--<div class="add-line">-->
  <!--<v-icon color="#9165F7">mdi-plus</v-icon>-->
  <!--<span>Add Line</span>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="documents">-->
  <!--<h2>Documents</h2>-->
  <!--<v-row>-->
  <!--<v-col cols="3" md="3" class="py-0 pr-0">-->
  <!--<v-select-->
  <!--:items="items"-->
  <!--append-icon="mdi-chevron-down"-->
  <!--filled-->
  <!--label="Select type"-->
  <!--class="input-style select"-->
  <!--&gt;</v-select>-->
  <!--</v-col>-->
  <!--<v-col cols="6" md="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="deliverable_name"-->
  <!--label="Deliverable Name"-->
  <!--filled-->
  <!--class="input-style"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--</v-row>-->
  <!--<v-row>-->
  <!--<v-col cols="3" md="3" class="py-0 pr-0">-->
  <!--<v-select-->
  <!--:items="items"-->
  <!--append-icon="mdi-chevron-down"-->
  <!--filled-->
  <!--label="Select type"-->
  <!--class="input-style select"-->
  <!--&gt;</v-select>-->
  <!--</v-col>-->
  <!--<v-col cols="6" md="6" class="py-0">-->
  <!--<v-text-field-->
  <!--v-model="deliverable_name"-->
  <!--label="Deliverable Name"-->
  <!--filled-->
  <!--class="input-style"-->
  <!--background="#F8F8FF"-->
  <!--&gt;-->

  <!--</v-text-field>-->
  <!--</v-col>-->
  <!--</v-row>-->
  <!--<div class="add-line">-->
  <!--<v-icon color="#9165F7">mdi-plus</v-icon>-->
  <!--<span >Add Line</span>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="pull-right">-->
  <!--<v-btn class="cancel-gray"  text @click="dialog = false">Cancel</v-btn>-->
  <!--<v-btn class="confirm-purple"  text @click="dialog = false">Create Campaign</v-btn>-->
  <!--</div>-->
  <!--</v-card>-->
  <!--</v-dialog>-->
</template>
<script>
export default {
  name: "CreateModal",
  components: {},
  data: () => ({
    dialogm1: "",
    campaign_name: "",
    brand: "",
    amount: "",
    deliverable_name: "",
    dialog: false,
    e1: 1,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    items: [
      {
        text: "Campaigns",
      },
      {
        text: "New Campaign",
      },
    ],
  }),
};
</script>
<style lang="scss">
.modal-btn.v-btn:not(.v-btn--round).v-size--default {
  border: 1px solid #e6e8f0;
  box-sizing: border-box;
  border-radius: 5px !important;
  width: 196px;
  height: 60px!important;
  margin: auto;
  background: transparent !important;
  box-shadow: none;
  color: #7982a3 !important;
  & p {
    color: inherit;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-transform: capitalize;
    display: inline-grid;
    justify-items: center;
    margin: 0px !important;
  }
  & i {
    font-size: 32px;
    margin-bottom: 16px;
  }
  &:hover {
    border: 1px solid #30364d;
    color: #30364d !important;
    &::before {
      opacity: 0;
    }
  }
}
.d-grid {
  display: grid;
  text-transform: capitalize;
}
.new-campaign-modal {
  padding: 32px;
  &.v-card {
    height: 100% !important;
  }
  & .pull-right {
    display: flex;
    justify-content: flex-end;
  }
  & .add-line {
    color: #9165f7;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    position: relative;
    top: -35px;
  }
  & .cancel-gray {
    background: #ededff;
    border-radius: 32px;
    color: #9165f7;
    text-transform: capitalize;
    font-family: " Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    padding: 10px 24px !important;
    margin-right: 8px;
  }
  & .confirm-purple {
    padding: 10px 24px !important;
    background: linear-gradient(338.3deg, #6a4ee1 0%, #b87df9 100%);
    border-radius: 32px;
    color: white;
    font-family: " Open Sans", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-transform: capitalize;
  }
  & .new-title {
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #30364d;
    margin-bottom: 32px;
  }
  .main-info,
  .deliverables,
  .documents {
    & h2 {
      font-family: "Fira Sans", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 24px;
      color: #30364d;
      margin-bottom: 12px;
    }
  }
  .input-style {
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px !important;
    margin-top: 0;

    &.select {
      & .v-input__slot {
        min-height: 40px;
        height: 40px;
      }
    }

    &:focus {
      outline: none;
    }
    & .v-select__slot {
      & label {
        position: unset !important;
      }
      & .v-input__icon {
        & i {
          color: #7982a3;
          font-weight: 300;
          font-size: 16px;
        }
      }
      & .v-input__append-inner {
        margin-top: 9px !important;
      }
    }
    & .v-input__slot {
      border-radius: 4px !important;
      box-shadow: inset 0px -1px 0px #7982a3;
      background: #f8f8ff !important;
      padding-left: 15px;

      &:before {
        border-color: transparent !important;
      }
      &:after {
        border-color: transparent !important;
      }
      & .primary--text {
        color: #bcc0cc !important;
      }
      & label {
        color: #7982a3;
        font-size: 14px !important;
      }
      & input {
        color: #30364d;
      }
    }
  }
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
    > .v-input__control
    > .v-input__slot,
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    border-radius: 4px;
  }
  ::-webkit-input-placeholder {
    /* Edge */
    color: #7982a3;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #7982a3;
  }

  ::placeholder {
    color: #7982a3;
  }
  .picker {
    & .v-input__slot {
      height: 56px;

      & .v-text-field__slot {
        top: 10px;
      }
      & .theme--light.v-icon {
        color: #7982a3;
      }
      .v-input__icon {
        margin: 13px 8px;
      }
    }

    & .v-input {
      margin-top: -24px;
    }
  }
  .date-picker {
    & .v-picker__title {
      display: none;
    }
  }
}
</style>