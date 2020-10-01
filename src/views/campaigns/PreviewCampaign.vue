<template>
    <div class="edit-page">
        <div class="top-part">
            <h2>New Aluminum Free Deborah Launch</h2>
            <div @click="$router.push(`/dashboard/${campaign.id}`)" class="export-btn v-btn">
                <img src="@/assets/images/dashboard.png" alt="">
                <span>View Analytic</span>
            </div>
        </div>
        <div class="inline">
            <img src="@/assets/images/home.svg" alt="">
            <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
            <v-breadcrumbs :items="items">
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                            :href="item.href"
                            class="active-link"
                            :disabled="item.disabled">
                        <v-icon v-if="item.icon">{{ item.icon}}</v-icon>
                        {{ item.text }}
                    </v-breadcrumbs-item>
                </template>
                <template v-slot:divider>
                    <v-icon color="#BCC0CC">mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        </div>
        <v-row>
            <v-col cols="12"
            md="8">
                <v-card
                        class="mb-12"
                        color="white"
                        height="350px"
                >
                    <div class="card-name">Main Info</div>
                    <v-divider class="divider-color"></v-divider>
                    <v-row class="px-6 pt-8">
                        <v-col cols="12" sm="6" class="py-0">
                            <v-text-field
                                    v-model="campaign.name"
                                    label="Campaign name"
                                    filled
                                    class="input-style"
                                    background="#F8F8FF"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="py-0">
                            <v-text-field
                                    v-model="campaign.brand_name"
                                    label="Brand name"
                                    filled
                                    class="input-style"
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
                                            v-model="campaign.due_date"
                                            label="Published Date"
                                            class="input-style"
                                            append-icon="mdi-calendar-blank-outline"
                                            readonly
                                            v-on="on"
                                    >
                                    </v-text-field>
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
                                    v-model="campaign.amount"
                                    label="Amount"
                                    filled
                                    class="input-style amount-input"
                                    background="#F8F8FF"
                            >

                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
                <v-row>
                    <v-col cols="12" xs="12" md="4">
                        <v-row>
                            <v-col
                                    v-for="n in 3"
                                    :key="n"
                                    class="d-flex child-flex"
                                    cols="6"
                                    md="6"

                            >
                                <v-img width="90" height="90" src="https://assets.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"></v-img>
                            </v-col>
                            <v-col  cols="6"
                                    class="d-flex justify-center align-center"
                                    md="6"
                                    >
                                <v-btn width="90" height="90" class="add-btn"  outlined>
                                    <v-icon color="#9165F7">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" xs="12" md="4">
                        <v-row>
                            <v-col
                                    v-for="n in 1"
                                    :key="n"
                                    class="d-flex child-flex"
                                    cols="6"
                                    md="6"

                            >
                                <v-img width="90" height="164" src="https://assets.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"></v-img>
                            </v-col>
                            <v-col  cols="6"
                                    class="d-flex justify-center align-center"
                                    md="6">
                                <v-btn width="90" style=" height: 164px!important;" class="add-btn"  outlined>
                                    <v-icon color="#9165F7">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" xs="12" md="4">
                        <v-row>
                            <v-col
                                    v-for="n in 1"
                                    :key="n"
                                    class="d-flex child-flex"
                                    cols="6"
                                    md="12"
                            >
                                <v-img width="164" height="90" src="https://assets.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"></v-img>
                            </v-col>
                            <v-col  cols="6"
                                    class="d-flex justify-center align-center"
                                    md="12">
                                <v-btn  style="width: 100%;" class="add-btn"  outlined>
                                    <v-icon color="#9165F7">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>

                </v-row>
            </v-col>

            <v-col cols="12"
                   md="4">

            </v-col>

        </v-row>


    </div>
</template>
<script>
    export default {
        name: 'PreviewCampaign',
        components: {
        },
        data: () => ({
            items:[
                {
                    text: 'Campaigns'
                },
                {
                    text: 'Kopari'
                },
            ],
            campaign: {},
            date: new Date().toISOString().substr(0, 10),
            menu: false,
        }),
        created() {
            this.fetchCampaign()
        },
        methods: {
            async fetchCampaign () {
                try {
                    let response = await this.$http.get(`/campaigns/${this.$route.params.id}`)

                    this.campaign = response.data
                } catch (error) {

                    this.$store.dispatch('alertsModule/turnOnAlert', {type: 'error', message: error.message})
                }


            }
        },
    }
</script>
<style lang="scss">
    .edit-page {
        padding: 36px 36px 32px 32px;
        .inline {
            display: flex;
            align-items: center;
        }
        .active-link {
            color: #7982A3;
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
        }
        .v-breadcrumbs {
            padding: 8px 5px !important;
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
                font-family: 'Fira Sans', sans-serif;
                font-style: normal;
                font-weight: normal;
                font-size: 24px;
                line-height: 32px;
                color: #30364D;
            }

            & .export-btn {
                background: linear-gradient(336.53deg, #6A4EE1 0%, #B87DF9 100%);
                border-radius: 114px;
                padding: 6px 24px;
                color: white;
                text-transform: capitalize;
                font-family: 'Open Sans', sans-serif;
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;

                & span {
                    margin-left: 8px;
                }
            }
        }
        .v-divider.divider-color {
            border-color: #F8F8FF;
        }
        .card-name{
            padding: 18px 24px;
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #30364D;
        }
        .input-style{
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            margin-top: 0;

            &:focus{
                outline: none;
            }
            & .v-input__slot{
                border-radius: 4px!important;
                box-shadow: inset 0px -1px 0px #7982A3;
                background: #F8F8FF!important;
                padding-left: 15px;

                &:before{
                    border-color: transparent!important;
                }
                &:after{
                    border-color: transparent!important;
                }
                & .primary--text{
                    color: #BCC0CC!important;
                }
                & label{
                    color: #7982A3;
                }
                & input{
                    color: #30364D;
                }
            }
        }
        .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details{
            border-radius: 4px;
        }
        ::-webkit-input-placeholder { /* Edge */
            color:  #7982A3;;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #7982A3;;
        }

        ::placeholder {
            color:  #7982A3;;
        }
        .picker {
            & .v-input__slot{
                height: 56px;

                & .v-text-field__slot{
                    top: 10px;
                }
                & .theme--light.v-icon{
                    color: #7982A3;
                }
                .v-input__icon{
                    margin: 13px 8px;
                }

            }

            & .v-input{
                margin-top: -24px;
            }
        }
        .date-picker{
            & .v-picker__title{
                display: none;
            }
        }
        .add-btn.v-btn:not(.v-btn--round).v-size--default{
            height: 90px!important;
            border-radius: 0;
            background: transparent;
            border-color: #E6E8F0;
            margin-right: 0;
        }
    }

@media only screen and (max-width: 768px){
    .edit-page .top-part{
        display: block;
        & h2,
        & .export-btn{
            margin-bottom: 20px;
        }
    }
    .add-btn{
        width: 100%!important;
        height: 100%;
    }
}
</style>