<template>
  <div>
    <div class="details-page">
      <div class="top-part">
        <h2>{{ campaign.name }}</h2>
        <div>
          <div @click="$router.push(`/dashboard/${$route.params.id}`)" class="export-btn v-btn">
            <img src="@/assets/images/dashboard.png" alt />
            <span>View Analytic</span>
          </div>
          <div class="export-btn v-btn ml-4" >
            <img src="@/assets/images/download.png" alt />
            <span>Export</span>
          </div>
        </div>
      </div>
      <div class="inline">
        <img src="@/assets/images/home.svg" alt />
        <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href" class="active-link" :disabled="item.disabled">
              <v-icon v-if="item.icon">{{ item.icon}}</v-icon>
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
          <template v-slot:divider>
            <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <div class="main-content">
        <div class="content-grid">
          <div class="small-col">
            <v-card class="budget-value">
              <h2>Budget</h2>
              <div class="value">${{ campaign.amount }}</div>
            </v-card>
          </div>
          <div class="big-col mr-3">
            <v-card class="files">
              <div class="file-name d-flex justify-space-between align-center">
                <h2>Files</h2>
                <v-btn fab color="#9165F7" x-small outlined>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center links">
                <div class="d-flex align-center">
                  <img src="@/assets/images/link.png" alt />
                  <a href="#">Instagram.com/p/L_INKsw/</a>
                </div>
                <v-btn outlined flat text class="cancel" @click.stop="dialog = true">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="d-flex align-center links">
                <div class="d-flex align-center">
                  <img src="@/assets/images/link.png" alt />
                  <a href="#">Instagram.com/p/L_INKsw/</a>
                </div>
                <v-btn outlined flat text class="cancel" @click.stop="dialog = true">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
          <div class="big-col ml-3">
            <v-card class="deliverables">
              <div class="file-name d-flex justify-space-between align-center">
                <h2>Deliverables</h2>
                <v-btn fab color="#9165F7" x-small outlined>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center links">
                <div class="d-flex align-center">
                  <img src="@/assets/images/file.png" alt />
                  <a href="#">Kopari_Contract_2020</a>
                </div>
                <v-btn outlined flat text class="cancel" @click.stop="dialog = true">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="d-flex align-center links">
                <div class="d-flex align-center">
                  <img src="@/assets/images/file.png" alt />
                  <a href="#">Kopari_Contract_2020</a>
                </div>
                <v-btn outlined flat text class="cancel" @click.stop="dialog = true">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
        </div>
        <div class="content-grid">
          <div class="small-col">
            <v-card class="notes" height="312px">
              <div class="file-name d-flex justify-space-between align-center">
                <h2>Notes</h2>
                <v-btn fab color="#9165F7" x-small outlined>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <v-divider></v-divider>
              <div class="txt">
                Original offer was $500 for 1 Instagram post. Countered
                with $600 for 1 Instagram Feed post. Sent over case studies with counter effort email.
                Photo Vibe: light, airy, centred around product, no heavy filters
                Messaging Focus: alumininum free, no parabens, clean beauty, reduces sweat while keeping you smelling great.
              </div>
            </v-card>
          </div>
          <div class="big-col mr-3">
            <v-card class="pending" height="312">
              <div class="border-b file-name d-flex align-center">
                <h2>Pending</h2>
              </div>
              <div v-for="(campaign, index) in campaign" v-bind:key="index" class="d-flex align-center links pending-link">
                <div class="d-flex align-center">
                  <div class="pending-img">
                    <v-img :src="campaign.post.media_url" alt />
                  </div>
                  <div class="post-type">
                    <span>Instagram Post</span>
                    <div class="time">Mar 1, 4:30 EST</div>
                  </div>
                </div>
                <v-btn outlined class="done">Mark Done</v-btn>
              </div>
        
            </v-card>
          </div>
          <div class="big-col ml-3">
            <v-card height="312" class="report">
              <div class="file-name d-flex justify-space-between align-center">
                <h2>Wrap Up Report</h2>

                <v-btn @click.stop="dialogReport = true" outlined class="newReport">New Report</v-btn>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center links report-item">
                <div class="d-flex align-center">
                  <h2>Deodorant Lounch Report</h2>
                </div>
                <div>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        fab
                        color="#9165F7"
                        x-small
                        outlined
                        class="report-icon mr-2"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </template>
                    <span>Submit for Review</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        fab
                        color="#9165F7"
                        x-small
                        outlined
                        class="report-icon"
                        @click.stop="dialog = true"
                      >
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialogReport" max-width="592" height="504">
      <v-card class="new-campaign-modal">
        <v-card-title class="new-title px-0 py-0">Report Creation</v-card-title>
        <div class="data-section">
          <div class="main-info">
            <h2>Main Info</h2>
            <v-row>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="title"
                  label="Title"
                  filled
                  class="input-style amount-input"
                  background="#F8F8FF"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="overview"
                  label="Overview"
                  filled
                  class="input-style amount-input"
                  background="#F8F8FF"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="picker">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  class="date-picker"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Published Date"
                      class="input-style"
                      append-icon="mdi-calendar-blank-outline"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker scrollable v-model="date" no-title>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="amount"
                  label="Amount"
                  filled
                  class="input-style amount-input"
                  background="#F8F8FF"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <div class="radio-section">
            <h2>Mark report ready for admin review?</h2>

            <v-radio-group class="ml-2" v-model="radios">
              <v-radio color="#9165F7" value="Google">
                <template v-slot:label>
                  <div class="radio-label">Yes</div>
                </template>
              </v-radio>
              <v-radio color="#9165F7" value="Duckduckgo">
                <template v-slot:label>
                  <div class="radio-label">Not Yeat, I’ll submit for review later</div>
                </template>
              </v-radio>
            </v-radio-group>
          </div>
        </div>
        <div class="text-center mt-3">
          <v-btn class="cancel-gray" text @click="dialogReport = false">Cancel</v-btn>
          <v-btn class="confirm-purple" text @click="dialogReport = false">Create Report</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="416" height="296">
      <v-card class="delete-modal-title">
        <v-icon>mdi-close</v-icon>
        <h2>Are you sure?</h2>

        <div
          class="txt-delete"
        >Do you really want to delete these records? This process cannot be undone.</div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn class="cancel-gray" @click="dialog = false">Cancel</v-btn>

          <v-btn class="confirm-purple" @click="dialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data: () => ({
    title: "",
    overview: "",
    date: "",
    menu: "",
    amount: "",
    items: [
      {
        text: "Campaigns"
      },
      {
        text: "Kopari"
      }
    ],
    dialog: false,
    dialogm1: "",
    dialogReport: false,
    radios: "Duckduckgo",
    campaign: {}
  }),
  methods: {
    async fetchCampaign() {
      try {
        let response = await this.$http.get(
          `/campaigns/${this.$route.params.id}`
        );

        this.campaign = response.data;
      } catch (error) {
        this.$store.dispatch("alertsModule/turnOnAlert", {
          type: "error",
          message: error.message
        });
      }
    }
  },
  created() {
    this.fetchCampaign();
  }
};
</script>
<style lang="scss">
.details-page {
  padding: 36px 36px 32px 32px;
  .inline {
    display: flex;
    align-items: center;
  }
  .active-link {
    color: #7982a3;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
  }
  .v-breadcrumbs {
    padding: 8px 5px !important;
  }
  .v-breadcrumbs li:nth-child(even){
    padding: 0 5px;
  }
  .inline i {
    font-size: 16px !important;
  }
  .inline img {
    padding-right: 5px;
  }
  .top-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h2 {
      font-family: "Fira Sans", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 32px;
      color: #30364d;
    }

    & .export-btn {
      background: linear-gradient(336.53deg, #6a4ee1 0%, #b87df9 100%);
      border-radius: 114px;
      padding: 6px 24px;
      color: white;
      text-transform: capitalize;
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;

      & span {
        margin-left: 8px;
      }
    }
  }
  .main-content {
    .content-grid {
      padding-top: 28px;
      display: grid;
      grid-template-columns: 0.6fr 1fr 1fr;
      width: 100%;

      & .small-col {
        padding-right: 24px;
        .budget-value {
          padding: 32px 24px 36px 24px;
          font-family: "Fira Sans", sans-serif;
          font-style: normal;
          box-shadow: none;
          border: 1px solid #e6e8f0;
          & h2 {
            font-weight: normal;
            font-size: 18px;
            line-height: 32px;
            color: #7982a3;
          }
          .value {
            font-weight: 500;
            font-size: 32px;
            line-height: 44px;
            color: #30364d;
          }
        }
      }

      .files,
      .deliverables,
      .notes,
      .pending,
      .report {
        box-shadow: none;
        border: 1px solid #e6e8f0;
        overflow: scroll;

        & .file-name {
          padding: 12px 24px;
          & button {
            background: #ededff;
            border-color: #ededff;

            & i {
              font-size: 18px;
            }
          }
          & h2 {
            font-family: "Fira Sans", sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 24px;
            color: #7982a3;
          }
        }
        & .post-type {
          & span {
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #7982a3;
          }
          & .time {
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #7982a3;
          }
        }
        .pending-img {
          margin-right: 12px;
          width: 32px;
          height: 32px;
          background-color: #ededff;
          border-radius: 24px;
          padding: 8px;
        }
        & .border-b {
          border-bottom: 1px solid #e6e8f0;
        }
        .done {
          font-family: "Open Sans", sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #9165f7;
          padding: 6px 24px;
          background: #ededff;
          border-radius: 114px;
          border-color: transparent;
          text-transform: capitalize;
          opacity: 0;
        }
        .newReport {
          font-family: "Open Sans", sans-serif;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #9165f7;
          padding: 6px 24px;
          background: #ededff !important;
          border-radius: 114px;
          border-color: transparent !important;
          text-transform: capitalize;
        }
        & hr {
          border-color: #f8f8ff;
        }
        .pending-link {
          transition: all 1s linear;
          border-bottom: 1px solid #f8f8ff;

          &:hover {
            background-color: #ededff;
            & .pending-img {
              background: linear-gradient(336.53deg, #6a4ee1 0%, #b87df9 100%);
            }
            & .done {
              opacity: 1;
            }
            & .post-type span,
            .post-type .time {
              color: #30364d;
            }
          }
        }
        .report-item {
          & button {
            background: #ededff;
            border-color: #ededff;

            & i {
              font-size: 18px;
            }
          }
        }
        .links,
        .report-item {
          padding: 12px 24px;
          justify-content: space-between;
          transition: all 1s linear;

          &:hover .cancel {
            opacity: 1;
          }
          & .cancel {
            opacity: 0;
            border-color: transparent;
            background: transparent;
            padding: 0;
            height: auto;
            min-width: auto;
            width: auto;

            & i {
              font-size: 18px;
            }
          }
          & h2 {
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #7982a3;
          }
          & a {
            color: #9165f7;
            text-decoration: none;
            font-family: "Open Sans", sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            margin-left: 12px;
          }
        }
        .txt {
          padding: 20px 24px;
          font-family: "Open Sans", sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: #30364d;
        }
      }
    }
  }
}
.delete-modal-title {
  padding: 32px 60px;
  text-align: center;
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
  & i {
    font-style: normal;
    font-weight: 300;
    font-size: 64px !important;
    line-height: 64px !important;
    color: #9165f7 !important;
    margin-bottom: 12px;
  }
  & h2 {
    font-family: "Fira Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
    color: #30364d;
    margin-bottom: 12px;
  }
  & .txt-delete {
    text-align:left;
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #7982a3;
    margin-bottom: 32px;
  }
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
  .main-info {
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
  .radio-section {
    & i {
      color: #e6e8f0;
    }
    & h2 {
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #30364d;
    }
    .radio-label {
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #30364d;
    }
  }
}
  @media only screen and (max-width: 768px){
    .details-page .main-content .content-grid{
      grid-template-columns: 1fr;
      padding-top: 0;

      & .small-col,
      & .big-col{
        margin-bottom: 20px;
        padding-right: 0;
        margin-right: 0!important;
        margin-left: 0!important;
      }
    }
    .details-page .top-part{
      display: block;
      & h2{
        margin-bottom: 15px;
      }
      & > div{
        display: flex;
      }
    }
    .main-content{
      margin-top: 20px;
    }
  }

</style>